// ========================================================
// DRONE PORTFOLIO & MEDIA STUDIO ENGINE
// ========================================================

// 1. Initial Sample Media (Aerial Drone Showcase)
const INITIAL_MEDIA = [
  {
    id: "sample-vid-2",
    type: "video",
    title: "Wonderful 12th: Karawang Central Plaza",
    category: "commercial",
    mediaUrl: "assets/videos/karawang-central-plaza-kcp-galuh-mas.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    drone: "DJI Mini 4 Pro",
    altitude: "150m AGL",
    specs: "4K UHD • D-Log M • 24mm f/1.7",
    location: "KCP Galuh Mas, Karawang",
    description: "Dokumentasi udara kemeriahan puncak perayaan ulang tahun ke-12 Karawang Central Plaza (KCP) di kawasan Galuh Mas, menampilkan antusiasme pengunjung dan kemegahan acara dari ketinggian.",
    isUserUpload: false
  }
];

// ========================================================
// 2. IndexedDB Manager (For persistent personal files)
// ========================================================
const DB_NAME = "DronePortfolioDB";
const DB_VERSION = 1;
const STORE_NAME = "userMedia";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveMediaToDB(mediaItem) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(mediaItem);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

async function getAllUserMediaFromDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function deleteMediaFromDB(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

// ========================================================
// 3. State Management & Variables
// ========================================================
let allMediaItems = [...INITIAL_MEDIA];
let currentFilter = "all";
let activeVideoItem = null;
let activePhotoItem = null;

// ========================================================
// 4. Initialize Application
// ========================================================
document.addEventListener("DOMContentLoaded", async () => {
  let userMedia = [];
  try {
    const stored = await getAllUserMediaFromDB();
    if (stored && stored.length > 0) {
      stored.forEach(item => {
        if (item.fileBlob) {
          item.mediaUrl = URL.createObjectURL(item.fileBlob);
          item.thumbnailUrl = item.type === "photo" ? item.mediaUrl : (item.customThumbUrl || item.mediaUrl);
        }
      });
      userMedia = stored;
    }
  } catch (err) {
    console.warn("Could not load user media from IndexedDB:", err);
  }

  // Check if Supabase is connected and fetch cloud media
  try {
    if (window.AeroSupabase && window.AeroSupabase.isSupabaseConfigured()) {
      const supabaseItems = await window.AeroSupabase.fetchMediaFromSupabase();
      if (supabaseItems && supabaseItems.length > 0) {
        allMediaItems = [...supabaseItems, ...userMedia, ...INITIAL_MEDIA];

        // Update hero featured video if available in Supabase
        const featuredVid = supabaseItems.find(i => i.type === "video" && i.isFeatured);
        if (featuredVid) {
          const heroVid = document.getElementById("hero-featured-video");
          if (heroVid) {
            heroVid.src = featuredVid.mediaUrl;
            if (featuredVid.thumbnailUrl) heroVid.poster = featuredVid.thumbnailUrl;
          }
        }
      } else {
        allMediaItems = [...userMedia, ...INITIAL_MEDIA];
      }
    } else {
      allMediaItems = [...userMedia, ...INITIAL_MEDIA];
    }
  } catch (supabaseErr) {
    console.warn("Could not fetch Supabase media:", supabaseErr);
    allMediaItems = [...userMedia, ...INITIAL_MEDIA];
  }

  renderGallery();
  setupEventListeners();
  updateMediaCounters();
  initFeaturedVideoAutoplay();
  
  // Re-run lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ========================================================
// 4b. Featured Video Autoplay on Scroll & Audio Management
// ========================================================
function initFeaturedVideoAutoplay() {
  const video = document.getElementById("hero-featured-video");
  if (!video) return;

  // Modern browsers require muted for background scroll autoplay
  video.muted = true;
  updateHeroSoundButtonState(true);

  // Sync state if user changes volume directly on video controls
  video.addEventListener("volumechange", () => {
    updateHeroSoundButtonState(video.muted || video.volume === 0);
  });

  // IntersectionObserver to detect when video enters / exits viewport
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When >= 30% visible, play automatically
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser policy fallback: enforce mute and play
              video.muted = true;
              updateHeroSoundButtonState(true);
              video.play().catch(() => {});
            });
          }
        } else if (entry.intersectionRatio < 0.15) {
          // Pause when user scrolls past or away from video
          if (!video.paused) {
            video.pause();
          }
        }
      });
    }, {
      threshold: [0, 0.15, 0.3, 0.6]
    });

    observer.observe(video);
  }
}

function updateHeroSoundButtonState(isMuted) {
  const soundIcon = document.getElementById("hero-sound-icon");
  const soundText = document.getElementById("hero-sound-text");
  const currentLang = (window.AeroI18n && typeof window.AeroI18n.getCurrentLanguage === "function") 
    ? window.AeroI18n.getCurrentLanguage() 
    : (localStorage.getItem("aero_lang") || "id");

  if (soundIcon) {
    if (isMuted) {
      soundIcon.setAttribute("data-lucide", "volume-x");
    } else {
      soundIcon.setAttribute("data-lucide", "volume-2");
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (soundText) {
    if (isMuted) {
      soundText.textContent = currentLang === "en" ? "Enable Audio" : "Aktifkan Audio";
      soundText.setAttribute("data-i18n", "reel.sound_muted");
    } else {
      soundText.textContent = currentLang === "en" ? "Audio On" : "Audio Aktif";
      soundText.setAttribute("data-i18n", "reel.sound_unmuted");
    }
  }
}

function toggleHeroVideoSound() {
  const video = document.getElementById("hero-featured-video");
  if (!video) return;

  if (video.muted || video.volume === 0) {
    video.muted = false;
    video.volume = 1.0;
    if (video.paused) {
      video.play().catch(() => {});
    }
    updateHeroSoundButtonState(false);
  } else {
    video.muted = true;
    updateHeroSoundButtonState(true);
  }
}

// ========================================================
// 4c. Featured Showcase Carousel & Next/Prev Video Engine
// ========================================================
const FEATURED_VIDEOS_PLAYLIST = [
  {
    id: "sample-vid-2",
    badge_id: "EVENT AERIAL HIGHLIGHT",
    badge_en: "EVENT AERIAL HIGHLIGHT",
    title_id: "Wonderful 12th: Karawang Central Plaza",
    title_en: "Wonderful 12th: Karawang Central Plaza",
    subtitle_id: "Dokumentasi udara kemeriahan puncak perayaan ulang tahun ke-12 Karawang Central Plaza (KCP) di kawasan Galuh Mas, menampilkan antusiasme pengunjung dan kemegahan acara dari ketinggian.",
    subtitle_en: "Aerial event highlight documenting the grand 12th Anniversary celebration of Karawang Central Plaza (KCP) Galuh Mas, capturing crowd energy and stage grandeur from the sky.",
    format: "Format: 4K UHD 60FPS",
    videoUrl: "assets/videos/karawang-central-plaza-kcp-galuh-mas.mp4",
    drone: "DJI MINI 4 PRO",
    altitude: "ALTITUDE: 150m AGL",
    lens: "24MM F/1.7",
    telemetryFormat: "4K D-LOG M"
  }
];

let currentFeaturedVideoIndex = 0;

function changeFeaturedVideo(direction) {
  const total = FEATURED_VIDEOS_PLAYLIST.length;
  currentFeaturedVideoIndex = (currentFeaturedVideoIndex + direction + total) % total;
  applyFeaturedVideo(currentFeaturedVideoIndex);
}

function selectFeaturedVideo(index) {
  if (index < 0 || index >= FEATURED_VIDEOS_PLAYLIST.length) return;
  currentFeaturedVideoIndex = index;
  applyFeaturedVideo(currentFeaturedVideoIndex);
}

function applyFeaturedVideo(index) {
  const item = FEATURED_VIDEOS_PLAYLIST[index];
  if (!item) return;

  const video = document.getElementById("hero-featured-video");
  const badgeElem = document.getElementById("reel-badge");
  const titleElem = document.getElementById("reel-title");
  const subtitleElem = document.getElementById("reel-subtitle");
  const formatElem = document.getElementById("reel-format");
  const droneElem = document.getElementById("reel-telemetry-drone");
  const altElem = document.getElementById("reel-telemetry-alt");
  const lensElem = document.getElementById("reel-telemetry-lens");
  const specElem = document.getElementById("reel-telemetry-format");

  const currentLang = (window.AeroI18n && typeof window.AeroI18n.getCurrentLanguage === "function") 
    ? window.AeroI18n.getCurrentLanguage() 
    : (localStorage.getItem("aero_lang") || "id");

  // Update Badge (Eyebrow Label)
  if (badgeElem) {
    if (index === 0) {
      badgeElem.setAttribute("data-i18n", "reel.badge");
    } else {
      badgeElem.removeAttribute("data-i18n");
    }
    badgeElem.textContent = currentLang === "en" ? (item.badge_en || item.badge_id) : item.badge_id;
  }

  // Update Section Header Title & Subtitle
  if (titleElem) {
    if (index === 0) {
      titleElem.setAttribute("data-i18n", "reel.title");
    } else {
      titleElem.removeAttribute("data-i18n");
    }
    titleElem.textContent = currentLang === "en" ? (item.title_en || item.title_id) : item.title_id;
  }
  if (subtitleElem) {
    if (index === 0) {
      subtitleElem.setAttribute("data-i18n", "reel.subtitle");
    } else {
      subtitleElem.removeAttribute("data-i18n");
    }
    subtitleElem.textContent = currentLang === "en" ? (item.subtitle_en || item.subtitle_id) : item.subtitle_id;
  }
  if (formatElem) {
    formatElem.textContent = item.format;
  }

  // Update Telemetry Overlay
  if (droneElem) droneElem.textContent = item.drone;
  if (altElem) altElem.textContent = item.altitude;
  if (lensElem) lensElem.textContent = item.lens;
  if (specElem) specElem.textContent = item.telemetryFormat;

  // Update Quick Selectors Active Indicator
  for (let i = 0; i < FEATURED_VIDEOS_PLAYLIST.length; i++) {
    const card = document.getElementById(`reel-quick-${i}`);
    if (card) {
      if (i === index) {
        card.className = "p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center gap-3 group border-cyan-400 bg-slate-800/90 ring-1 ring-cyan-400/50 cursor-pointer shadow-lg shadow-cyan-950/30";
      } else {
        card.className = "p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center gap-3 group border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-800/90 cursor-pointer";
      }
    }
  }

  // Immediate Synchronous Autoplay on Swap (preserves user gesture context)
  if (video) {
    const wasMuted = video.muted;
    video.pause();
    video.src = item.videoUrl;
    video.muted = wasMuted;
    video.autoplay = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay muted fallback:", err);
        video.muted = true;
        updateHeroSoundButtonState(true);
        video.play().catch(() => {});
      });
    }
  }
}

// ========================================================
// 5. Gallery Rendering
// ========================================================
function renderGallery() {
  const container = document.getElementById("gallery-grid");
  const emptyState = document.getElementById("gallery-empty");
  if (!container) return;

  const filtered = allMediaItems.filter(item => {
    if (currentFilter === "all") return true;
    if (currentFilter === "photo") return item.type === "photo";
    if (currentFilter === "video") return item.type === "video";
    if (currentFilter === "personal") return item.isUserUpload;
    return item.category === currentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  const lang = window.AeroI18n ? window.AeroI18n.getCurrentLanguage() : 'id';
  const isEn = lang === 'en';
  const labelWatch = isEn ? 'Watch' : 'Tonton';
  const labelView = isEn ? 'View' : 'Lihat';
  const labelPhoto = isEn ? 'AERIAL PHOTO' : 'FOTO UDARA';

  container.innerHTML = filtered.map(item => {
    const isVideo = item.type === "video";
    return `
      <div class="gallery-card group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between" data-id="${item.id}">
        <!-- Media Preview Area -->
        <div class="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer" onclick="openMediaDetail('${item.id}')">
          ${isVideo ? `
            <video src="${item.mediaUrl}" poster="${item.thumbnailUrl || ''}" preload="metadata" muted playsinline class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></video>
            <!-- Play Button Overlay -->
            <div class="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 flex items-center justify-center transition-all">
              <div class="w-14 h-14 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                <i data-lucide="play" class="w-6 h-6 fill-current translate-x-0.5"></i>
              </div>
            </div>
            <!-- Video duration / tag badge -->
            <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur text-xs font-mono text-cyan-400 flex items-center gap-1.5 border border-cyan-500/20">
              <i data-lucide="video" class="w-3.5 h-3.5"></i> 4K VIDEO
            </span>
          ` : `
            <img src="${item.thumbnailUrl || item.mediaUrl}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <!-- Zoom Icon Overlay on hover -->
            <div class="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
              <div class="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <i data-lucide="maximize-2" class="w-5 h-5"></i>
              </div>
            </div>
            <!-- Photo badge -->
            <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur text-xs font-mono text-emerald-400 flex items-center gap-1.5 border border-emerald-500/20">
              <i data-lucide="camera" class="w-3.5 h-3.5"></i> ${labelPhoto}
            </span>
          `}

          <!-- Drone Model Tag -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur text-[11px] font-medium text-slate-200 border border-slate-700/60 flex items-center gap-1">
              <i data-lucide="crosshair" class="w-3 h-3 text-cyan-400"></i> ${item.drone || 'Drone Aerial'}
            </span>
            ${item.isUserUpload ? `
              <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/40">
                Upload Anda
              </span>
            ` : ''}
          </div>

          <!-- Altitude Tag -->
          ${item.altitude ? `
            <span class="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur text-[11px] font-mono text-cyan-300 border border-cyan-500/20">
              ALT: ${item.altitude}
            </span>
          ` : ''}
        </div>

        <!-- Card Body Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span class="flex items-center gap-1.5 text-cyan-400">
                <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${item.location || 'Indonesia'}
              </span>
              <span class="capitalize text-slate-500 font-mono text-[11px]">${item.category}</span>
            </div>

            <h3 class="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer" onclick="openMediaDetail('${item.id}')">
              ${item.title}
            </h3>

            <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              ${item.description || 'Dokumentasi visual udara dengan resolusi tinggi dan detail sinematik.'}
            </p>
          </div>

          <!-- Card Footer & Actions -->
          <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div class="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <i data-lucide="sliders" class="w-3.5 h-3.5 text-slate-500"></i>
              <span class="truncate max-w-[170px]">${item.specs || '4K UHD'}</span>
            </div>

            <div class="flex items-center gap-1.5">
              ${item.isUserUpload ? `
                <button onclick="handleDeleteUserMedia('${item.id}')" title="Hapus dari Galeri" class="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              ` : ''}
              <button onclick="openMediaDetail('${item.id}')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-semibold text-slate-200 transition-all flex items-center gap-1">
                ${isVideo ? labelWatch : labelView} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ========================================================
// 6. Media Open Details (Modal Router)
// ========================================================
function openMediaDetail(id) {
  const item = allMediaItems.find(m => m.id === id);
  if (!item) return;

  if (item.type === "video") {
    openVideoModal(item);
  } else {
    openPhotoModal(item);
  }
}

// Video Player Modal
function openVideoModal(item) {
  activeVideoItem = item;
  const modal = document.getElementById("video-modal");
  const videoElem = document.getElementById("modal-video-player");
  const titleElem = document.getElementById("modal-video-title");
  const descElem = document.getElementById("modal-video-desc");
  const droneElem = document.getElementById("modal-video-drone");
  const locElem = document.getElementById("modal-video-location");
  const specsElem = document.getElementById("modal-video-specs");
  const counterElem = document.getElementById("modal-video-counter");

  if (!modal || !videoElem) return;

  // Pause featured hero video if playing
  const heroVid = document.getElementById("hero-featured-video");
  if (heroVid && !heroVid.paused) {
    heroVid.pause();
  }

  // Update counter
  const videoList = allMediaItems.filter(m => m.type === "video");
  const currentIdx = videoList.findIndex(m => m.id === item.id);
  if (counterElem && videoList.length > 0) {
    counterElem.textContent = `${(currentIdx >= 0 ? currentIdx : 0) + 1} / ${videoList.length}`;
  }

  videoElem.src = item.mediaUrl;
  titleElem.textContent = item.title;
  descElem.textContent = item.description || "";
  droneElem.textContent = item.drone || "Drone System";
  locElem.textContent = item.location || "Indonesia";
  specsElem.textContent = item.specs || "4K UHD 60FPS";

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  if (window.lucide) {
    window.lucide.createIcons();
  }

  videoElem.play().catch(e => console.log("Autoplay was prevented:", e));
}

function navigateModalVideo(direction) {
  const videoList = allMediaItems.filter(m => m.type === "video");
  if (!videoList || videoList.length === 0) return;

  let currentIdx = activeVideoItem ? videoList.findIndex(m => m.id === activeVideoItem.id) : 0;
  if (currentIdx === -1) currentIdx = 0;

  const nextIdx = (currentIdx + direction + videoList.length) % videoList.length;
  openVideoModal(videoList[nextIdx]);
}

function navigateModalPhoto(direction) {
  const photoList = allMediaItems.filter(m => m.type === "photo");
  if (!photoList || photoList.length === 0) return;

  let currentIdx = activePhotoItem ? photoList.findIndex(m => m.id === activePhotoItem.id) : 0;
  if (currentIdx === -1) currentIdx = 0;

  const nextIdx = (currentIdx + direction + photoList.length) % photoList.length;
  openPhotoModal(photoList[nextIdx]);
}

function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const videoElem = document.getElementById("modal-video-player");
  if (videoElem) {
    videoElem.pause();
    videoElem.src = "";
  }
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
  activeVideoItem = null;
}

// Photo Lightbox Modal
function openPhotoModal(item) {
  activePhotoItem = item;
  const modal = document.getElementById("photo-modal");
  const imgElem = document.getElementById("modal-photo-img");
  const titleElem = document.getElementById("modal-photo-title");
  const descElem = document.getElementById("modal-photo-desc");
  const droneElem = document.getElementById("modal-photo-drone");
  const locElem = document.getElementById("modal-photo-location");
  const specsElem = document.getElementById("modal-photo-specs");
  const downloadLink = document.getElementById("modal-photo-download");
  const counterElem = document.getElementById("modal-photo-counter");

  if (!modal || !imgElem) return;

  // Pause featured hero video if playing
  const heroVid = document.getElementById("hero-featured-video");
  if (heroVid && !heroVid.paused) {
    heroVid.pause();
  }

  // Update photo counter
  const photoList = allMediaItems.filter(m => m.type === "photo");
  const currentIdx = photoList.findIndex(m => m.id === item.id);
  if (counterElem && photoList.length > 0) {
    counterElem.textContent = `${(currentIdx >= 0 ? currentIdx : 0) + 1} / ${photoList.length}`;
  }

  imgElem.src = item.mediaUrl;
  titleElem.textContent = item.title;
  descElem.textContent = item.description || "";
  droneElem.textContent = item.drone || "Drone System";
  locElem.textContent = item.location || "Indonesia";
  specsElem.textContent = item.specs || "48MP RAW High-Res";

  if (downloadLink) {
    downloadLink.href = item.mediaUrl;
    downloadLink.setAttribute("download", `${item.title.replace(/\s+/g, "_")}.jpg`);
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closePhotoModal() {
  const modal = document.getElementById("photo-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
  activePhotoItem = null;
}

// ========================================================
// 7. Interactive Media Uploader (Personal Photos & Videos)
// ========================================================
let pendingUploadFile = null;
let pendingUploadType = "photo";

function openUploadModal() {
  const modal = document.getElementById("upload-modal");
  if (modal) {
    resetUploadForm();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeUploadModal() {
  const modal = document.getElementById("upload-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
  resetUploadForm();
}

function resetUploadForm() {
  pendingUploadFile = null;
  const fileInput = document.getElementById("upload-file-input");
  const previewBox = document.getElementById("upload-preview-container");
  const placeholderBox = document.getElementById("upload-placeholder");
  const form = document.getElementById("upload-form");

  if (fileInput) fileInput.value = "";
  if (form) form.reset();
  if (previewBox) {
    previewBox.innerHTML = "";
    previewBox.classList.add("hidden");
  }
  if (placeholderBox) placeholderBox.classList.remove("hidden");
}

function handleFileSelection(file) {
  if (!file) return;

  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");

  if (!isVideo && !isImage) {
    showToast("Format file tidak didukung! Pilih file foto (JPG, PNG, WebP) atau video (MP4, WebM, MOV).", "error");
    return;
  }

  pendingUploadFile = file;
  pendingUploadType = isVideo ? "video" : "photo";

  // Pre-fill Title with file name without extension
  const fileNameClean = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  const titleInput = document.getElementById("upload-title");
  if (titleInput && !titleInput.value) {
    titleInput.value = fileNameClean;
  }

  // Update Media Type Select
  const typeSelect = document.getElementById("upload-type-select");
  if (typeSelect) {
    typeSelect.value = pendingUploadType;
  }

  // Generate live preview
  const previewBox = document.getElementById("upload-preview-container");
  const placeholderBox = document.getElementById("upload-placeholder");
  const tempUrl = URL.createObjectURL(file);

  if (placeholderBox) placeholderBox.classList.add("hidden");
  if (previewBox) {
    previewBox.classList.remove("hidden");
    if (isVideo) {
      previewBox.innerHTML = `
        <video src="${tempUrl}" controls class="w-full h-48 md:h-56 object-contain rounded-xl bg-black"></video>
        <p class="text-[11px] text-cyan-400 mt-2 text-center font-mono">Video Terdeteksi: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)</p>
      `;
    } else {
      previewBox.innerHTML = `
        <img src="${tempUrl}" class="w-full h-48 md:h-56 object-contain rounded-xl bg-black" />
        <p class="text-[11px] text-emerald-400 mt-2 text-center font-mono">Foto Terdeteksi: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)</p>
      `;
    }
  }
}

async function handleUploadSubmit(e) {
  e.preventDefault();

  if (!pendingUploadFile) {
    showToast("Silakan pilih file foto atau video terlebih dahulu!", "warning");
    return;
  }

  const title = document.getElementById("upload-title").value.trim() || "Karya Drone Saya";
  const category = document.getElementById("upload-category").value || "landscape";
  const drone = document.getElementById("upload-drone").value.trim() || "DJI Drone";
  const location = document.getElementById("upload-location").value.trim() || "Indonesia";
  const altitude = document.getElementById("upload-altitude").value.trim() || "100m AGL";
  const specs = document.getElementById("upload-specs").value.trim() || (pendingUploadType === "video" ? "4K 60FPS" : "High-Res Aerial Photo");
  const description = document.getElementById("upload-desc").value.trim() || "Dokumentasi visual drone pribadi.";

  const newId = "user-" + Date.now();
  const mediaItem = {
    id: newId,
    type: pendingUploadType,
    title,
    category,
    drone,
    location,
    altitude,
    specs,
    description,
    fileBlob: pendingUploadFile,
    isUserUpload: true,
    createdAt: new Date().toISOString()
  };

  try {
    // Save to IndexedDB
    await saveMediaToDB(mediaItem);

    // Create object URL for current session
    mediaItem.mediaUrl = URL.createObjectURL(pendingUploadFile);
    mediaItem.thumbnailUrl = mediaItem.mediaUrl;

    // Prepend to list
    allMediaItems.unshift(mediaItem);

    // Re-render
    renderGallery();
    updateMediaCounters();
    closeUploadModal();
    showToast("Media berhasil disimpan ke galeri pribadi Anda!", "success");
  } catch (err) {
    console.error("Gagal menyimpan ke database:", err);
    showToast("Terjadi kendala saat menyimpan file. Coba file yang lebih kecil.", "error");
  }
}

async function handleDeleteUserMedia(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus media ini dari galeri?")) return;

  try {
    await deleteMediaFromDB(id);
    allMediaItems = allMediaItems.filter(item => item.id !== id);
    renderGallery();
    updateMediaCounters();
    showToast("Media berhasil dihapus.", "info");
  } catch (err) {
    console.error("Gagal menghapus:", err);
    showToast("Gagal menghapus media.", "error");
  }
}

// ========================================================
// 8. Event Listeners & Filter Handling
// ========================================================
function setupEventListeners() {
  // Filter tabs
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("bg-cyan-500", "text-slate-950", "font-bold");
        b.classList.add("bg-slate-900/80", "text-slate-300");
      });
      btn.classList.add("bg-cyan-500", "text-slate-950", "font-bold");
      btn.classList.remove("bg-slate-900/80", "text-slate-300");

      currentFilter = btn.dataset.filter || "all";
      renderGallery();
    });
  });

  // Modal close triggers
  document.querySelectorAll("[data-close-video]").forEach(el => el.addEventListener("click", closeVideoModal));
  document.querySelectorAll("[data-close-photo]").forEach(el => el.addEventListener("click", closePhotoModal));
  document.querySelectorAll("[data-close-upload]").forEach(el => el.addEventListener("click", closeUploadModal));

  // Keyboard navigation (ESC to close, Left/Right to navigate modals)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeVideoModal();
      closePhotoModal();
      closeUploadModal();
    } else if (e.key === "ArrowRight") {
      const videoModal = document.getElementById("video-modal");
      const photoModal = document.getElementById("photo-modal");
      if (videoModal && !videoModal.classList.contains("hidden")) {
        navigateModalVideo(1);
      } else if (photoModal && !photoModal.classList.contains("hidden")) {
        navigateModalPhoto(1);
      }
    } else if (e.key === "ArrowLeft") {
      const videoModal = document.getElementById("video-modal");
      const photoModal = document.getElementById("photo-modal");
      if (videoModal && !videoModal.classList.contains("hidden")) {
        navigateModalVideo(-1);
      } else if (photoModal && !photoModal.classList.contains("hidden")) {
        navigateModalPhoto(-1);
      }
    }
  });

  // Upload Drag & Drop zone
  const dropZone = document.getElementById("upload-dropzone");
  const fileInput = document.getElementById("upload-file-input");

  if (dropZone && fileInput) {
    dropZone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelection(e.target.files[0]);
      }
    });

    ["dragenter", "dragover"].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add("border-cyan-400", "bg-cyan-500/10");
      });
    });

    ["dragleave", "drop"].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-cyan-400", "bg-cyan-500/10");
      });
    });

    dropZone.addEventListener("drop", (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });
  }

  // Upload Form Submit
  const uploadForm = document.getElementById("upload-form");
  if (uploadForm) {
    uploadForm.addEventListener("submit", handleUploadSubmit);
  }

  // Contact Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Update counters
function updateMediaCounters() {
  const countTotal = document.getElementById("stat-total-media");
  const countVideos = document.getElementById("stat-total-videos");
  const countPhotos = document.getElementById("stat-total-photos");

  const total = allMediaItems.length;
  const videos = allMediaItems.filter(i => i.type === "video").length;
  const photos = allMediaItems.filter(i => i.type === "photo").length;

  if (countTotal) countTotal.textContent = total;
  if (countVideos) countVideos.textContent = videos;
  if (countPhotos) countPhotos.textContent = photos;
}

// Contact form -> Opens WhatsApp with formatted message
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const service = document.getElementById("contact-service").value;
  const message = document.getElementById("contact-message").value.trim();

  const phone = "6281381453598"; // WhatsApp pemilik
  const waText = encodeURIComponent(
    `Halo, saya ${name} (${email}). Ingin mendiskusikan proyek drone untuk: ${service}.\n\nPesan:\n${message}`
  );

  window.open(`https://wa.me/${phone}?text=${waText}`, "_blank");
  showToast("Membuka WhatsApp untuk mengirim pesan...", "success");
}

// Helper Toast Notification
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const colors = {
    success: "bg-emerald-900/90 border-emerald-500 text-emerald-200",
    error: "bg-rose-900/90 border-rose-500 text-rose-200",
    warning: "bg-amber-900/90 border-amber-500 text-amber-200",
    info: "bg-slate-900/90 border-cyan-500 text-cyan-200"
  };

  toast.className = `px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl flex items-center justify-between gap-3 text-sm transition-all duration-300 transform translate-y-4 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="opacity-70 hover:opacity-100 text-lg leading-none" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Expose openUploadModal globally
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.openMediaDetail = openMediaDetail;
window.openVideoModal = openVideoModal;
window.navigateModalVideo = navigateModalVideo;
window.closeVideoModal = closeVideoModal;
window.openPhotoModal = openPhotoModal;
window.navigateModalPhoto = navigateModalPhoto;
window.closePhotoModal = closePhotoModal;
window.handleDeleteUserMedia = handleDeleteUserMedia;
window.renderGallery = renderGallery;
window.toggleHeroVideoSound = toggleHeroVideoSound;
window.initFeaturedVideoAutoplay = initFeaturedVideoAutoplay;
window.changeFeaturedVideo = changeFeaturedVideo;
window.selectFeaturedVideo = selectFeaturedVideo;
window.applyFeaturedVideo = applyFeaturedVideo;
window.FEATURED_VIDEOS_PLAYLIST = FEATURED_VIDEOS_PLAYLIST;
Object.defineProperty(window, 'currentFeaturedVideoIndex', {
  get: () => currentFeaturedVideoIndex,
  set: (v) => { currentFeaturedVideoIndex = v; }
});
