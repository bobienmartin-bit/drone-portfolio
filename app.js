// ========================================================
// DRONE PORTFOLIO & MEDIA STUDIO ENGINE
// ========================================================

// 1. Initial Sample Media (Aerial Drone Showcase)
const INITIAL_MEDIA = [
  {
    id: "sample-vid-1",
    type: "video",
    title: "Cinematic Reel: Lanskap Pegunungan Tropis",
    category: "landscape",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-landscape-during-sunset-41481-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    drone: "DJI Mavic 3 Pro",
    altitude: "340m AGL",
    specs: "5.1K 50fps • D-Log M • ND16 Filter",
    location: "Gunung Bromo & Semeru, Jawa Timur",
    description: "Perekaman sinematik kabut pagi yang menyelimuti lembah pegunungan saat matahari terbit dengan grading natural warm.",
    isUserUpload: false
  },
  {
    id: "sample-photo-1",
    type: "photo",
    title: "Garis Pantai Karang & Gulungan Ombak",
    category: "coastal",
    mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    drone: "DJI Mavic 3 Pro",
    altitude: "120m AGL",
    specs: "48MP RAW • f/2.8 • 1/500s • ISO 100",
    location: "Nusa Penida, Bali",
    description: "Pengambilan gambar top-down (90 derajat) memperlihatkan gradasi warna toska air laut dan tekstur buih ombak samudra.",
    isUserUpload: false
  },
  {
    id: "sample-vid-2",
    type: "video",
    title: "Metropolis Glow: Cakrawala Kota Malam Hari",
    category: "urban",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-hyperlapse-of-city-traffic-at-night-42284-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    drone: "DJI Inspire 2",
    altitude: "210m AGL",
    specs: "4K 60fps • ProRes 422HQ • Night Mode",
    location: "Sudirman Central Business District, Jakarta",
    description: "Hyperlapse udara pergerakan arus lalu lintas dan gemerlap lampu gedung pencakar langit ibu kota.",
    isUserUpload: false
  },
  {
    id: "sample-photo-2",
    type: "photo",
    title: "Simetri Arsitektur Jembatan Ikonik",
    category: "urban",
    mediaUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80",
    drone: "DJI Mini 4 Pro",
    altitude: "95m AGL",
    specs: "48MP RAW • f/1.7 • 1/120s • ISO 100",
    location: "Jembatan Suramadu, Jawa Timur",
    description: "Komposisi garis pandang simetris jembatan bentang panjang saat senja menghubungkan dua daratan.",
    isUserUpload: false
  },
  {
    id: "sample-vid-3",
    type: "video",
    title: "FPV Dive: Menyusuri Tebing Karang & Air Terjun",
    category: "landscape",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-canyon-with-a-river-in-the-bottom-42878-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    drone: "Custom 5\" FPV Quadcopter",
    altitude: "10m - 180m AGL",
    specs: "4K 120fps • GoPro 12 Bones • ReelSteady",
    location: "Lembah Harau, Sumatera Barat",
    description: "Penerbangan akrobatik FPV menukik dari puncak tebing granit vertikal menuju aliran sungai berarus jernih.",
    isUserUpload: false
  },
  {
    id: "sample-photo-3",
    type: "photo",
    title: "Hutan Hujan Zamrud & Aliran Sungai Liar",
    category: "landscape",
    mediaUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    drone: "DJI Air 3",
    altitude: "160m AGL",
    specs: "48MP RAW • 70mm Tele Lens • ISO 100",
    location: "Taman Nasional Gunung Leuser, Aceh",
    description: "Detail kanopi pepohonan purba dari ketinggian dengan lensa telefoto medium mempertegas tekstur dedaunan tropis.",
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
  
  // Re-run lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

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
              <i data-lucide="camera" class="w-3.5 h-3.5"></i> FOTO UDARA
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
                ${isVideo ? 'Tonton' : 'Lihat'} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
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

  if (!modal || !videoElem) return;

  videoElem.src = item.mediaUrl;
  titleElem.textContent = item.title;
  descElem.textContent = item.description || "";
  droneElem.textContent = item.drone || "Drone System";
  locElem.textContent = item.location || "Indonesia";
  specsElem.textContent = item.specs || "4K UHD 60FPS";

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  videoElem.play().catch(e => console.log("Autoplay was prevented:", e));
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

  if (!modal || !imgElem) return;

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

  // Keyboard navigation (ESC to close modals)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeVideoModal();
      closePhotoModal();
      closeUploadModal();
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

  const phone = "6281234567890"; // Ganti dengan nomor WhatsApp pemilik
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
window.closeVideoModal = closeVideoModal;
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.handleDeleteUserMedia = handleDeleteUserMedia;
