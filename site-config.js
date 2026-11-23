// ========================================================
// AEROSCOPE SITE CONFIGURATION & CONTENT MANAGEMENT ENGINE
// ========================================================

const SITE_CONFIG_STORAGE_KEY = "AEROSCOPE_SITE_CONFIG";

const DEFAULT_SITE_CONFIG = {
  hero: {
    badge: "AERIAL CINEMATOGRAPHY & DRONE PHOTOGRAPHY",
    title: "Visual Udara Sinematik dari Perspektif Terbaik.",
    subtitle: "Jasa aerial cinematography dan fotografi drone beresolusi tinggi hingga 5.1K. Didukung pilot bersertifikat resmi dan armada lengkap untuk produksi komersial, properti, hingga dokumentasi acara.",
    btnShowreel: "Tonton Showreel 4K",
    btnGallery: "Jelajahi Galeri",
    credentials: [
      { text: "Pilot Tersertifikasi SIDOPI GO & DKPPU" },
      { text: "450+ Jam Terbang Operasional" },
      { text: "Siap Penugasan Seluruh Indonesia" }
    ],
    stats: [
      {
        id: "stat_legal",
        label: "LEGALITAS",
        value: "RESMI",
        sub: "SIDOPI GO & DKPPU",
        icon: "award"
      },
      {
        id: "stat_res",
        label: "RESOLUSI",
        value: "5.1K / 4K",
        sub: "ProRes & D-Log M",
        icon: "video"
      },
      {
        id: "stat_range",
        label: "JANGKAUAN",
        value: "NASIONAL",
        sub: "Siap Tugas Luar Kota",
        icon: "map-pin"
      },
      {
        id: "stat_turnaround",
        label: "WAKTU PROSES",
        value: "24 JAM",
        sub: "File Mentah & Edit",
        icon: "clock"
      },
      {
        id: "stat_signal",
        label: "JARAK KONTROL",
        value: "15 KM",
        sub: "Transmisi Stabil HD",
        icon: "radio"
      },
      {
        id: "stat_1795085211926",
        label: "PRESTASI / SERTIFIKASI",
        value: "JUARA",
        sub: "Konten Kreatif & Aerial",
        icon: "zap"
      }
    ]
  },
  featuredReel: [
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
      altitude: "ALTITUDE: 100m AGL",
      lens: "24MM F/1.7",
      telemetryFormat: "4K D-LOG M",
      quickTitle: "Wonderful 12th",
      quickSub: "Karawang Central Plaza"
    },
    {
      id: "sample-vid-stan",
      badge_id: "FEATURED AERIAL CINEMA",
      badge_en: "FEATURED AERIAL CINEMA",
      title_id: "Campus Skies: PKN STAN Aerials",
      title_en: "Campus Skies: PKN STAN Aerials",
      subtitle_id: "Kompilasi sinematografi drone megah yang menampilkan arsitektur dan lanskap kampus PKN STAN Bintaro berlatar lagu resmi kampus.",
      subtitle_en: "A compiled drone cinematography showcase capturing the architecture and atmosphere of PKN STAN, scored with the official campus anthem.",
      format: "Format: 5.1K UHD 60FPS",
      videoUrl: "assets/videos/campus-skies-pkn-stan.mp4",
      drone: "DJI MAVIC 3 PRO",
      altitude: "ALTITUDE: 110m AGL",
      lens: "HASSELBLAD 24MM",
      telemetryFormat: "5.1K D-LOG M",
      quickTitle: "Campus Skies",
      quickSub: "PKN STAN Aerials"
    },
    {
      id: "sample-vid-groove",
      badge_id: "1ST PLACE WINNER AERIAL",
      badge_en: "1ST PLACE WINNER AERIAL",
      title_id: "New Cluster Groove at Fortune — 1st Place Winner",
      title_en: "New Cluster Groove at Fortune — 1st Place Winner",
      subtitle_id: "Karya pemenang juara pertama kategori vertical aerial showcase 2025, mendokumentasikan kemewahan arsitektur kawasan New Cluster Groove at Fortune.",
      subtitle_en: "1st Place Winner visual aerial showcase 2025 documenting the modern residential architecture of New Cluster Groove at Fortune.",
      format: "Format: 4K VERTICAL 60FPS",
      videoUrl: "assets/videos/new-cluster-groove-fortune.mp4",
      drone: "DJI MINI 4 PRO",
      altitude: "ALTITUDE: 40m AGL",
      lens: "24MM F/1.7",
      telemetryFormat: "4K D-LOG M",
      quickTitle: "New Cluster Groove",
      quickSub: "1st Place Winner • Fortune"
    }
  ],
  gear: [
    {
      id: "drone-1",
      tag: "NEXT-GEN FLAGSHIP",
      title: "DJI Mavic 4 Pro",
      desc: "Drone sinema generasi terdepan dengan sistem multi-lensa Hasselblad canggih, sensor rintangan 360° omnidirectional, dan transmisi sinyal O4 Pro jarak jauh.",
      imageUrl: "assets/images/drone-mavic-4-pro.jpg?v=2",
      specs: [
        "Video 8K/60fps & 4K/120fps HDR",
        "Sistem Multi-Kamera Hasselblad",
        "10-Bit D-Log M & D-Log Cinema",
        "Waktu Terbang s/d 45 Menit"
      ],
      ideal: "Ideal untuk: Film Layar Lebar, Produksi Komersial Skala Besar, Dokumentasi Sinematik",
      ctaText: "Booking dengan Mavic 4 Pro →",
      ctaUnit: "DJI Mavic 4 Pro"
    },
    {
      id: "drone-2",
      tag: "TRIPLE CAMERA CINEMA",
      title: "DJI Mavic 3 Pro",
      desc: "Sistem 3 Kamera optik independen dengan sensor utama Hasselblad 4/3 CMOS untuk hasil sinematik kaliber layar lebar.",
      imageUrl: "assets/images/drone-mavic-3-pro.jpg?v=2",
      specs: [
        "Video 5.1K / 50fps Apple ProRes",
        "Lensa 24mm + 70mm + 166mm Tele",
        "10-Bit D-Log M & HLG Color",
        "Waktu Terbang s/d 43 Menit"
      ],
      ideal: "Ideal untuk: Iklan Komersial, Video Profil Perusahaan, Fotografi Lanskap Presisi",
      ctaText: "Booking dengan Mavic 3 Pro →",
      ctaUnit: "DJI Mavic 3 Pro"
    },
    {
      id: "drone-3",
      tag: "DUAL CAMERA & NIGHTSCAPE",
      title: "DJI Air 3S",
      desc: "Drone kamera ganda canggih dengan sensor utama 1-inci CMOS 50MP dan kamera medium tele 70mm, dilengkapi sensor LiDAR malam hari untuk keamanan terbang maksimal.",
      imageUrl: "assets/images/drone-air-3s.jpg?v=2",
      specs: [
        "Sensor 1\" CMOS 50MP + 70mm Medium Tele",
        "Video 4K/60fps HDR & 4K/120fps Slow-mo",
        "LiDAR Malam Hari & Sensor Omnidirectional",
        "10-Bit D-Log M & Waktu Terbang 45 Menit"
      ],
      ideal: "Ideal untuk: Fotografi Lanskap Malam Hari, Dokumentasi Travel & Wisata, Komersial Kreatif",
      ctaText: "Booking dengan Air 3S →",
      ctaUnit: "DJI Air 3S"
    },
    {
      id: "drone-4",
      tag: "IMMERSIVE FPV CINEMA",
      title: "DJI Avata 2",
      desc: "Drone FPV lincah dengan sensor 1/1.3\" CMOS, sudut pandang 155° Ultra-Wide, pelindung baling-baling terintegrasi, dan manuver One-Push ACRO akrobatik.",
      imageUrl: "assets/images/drone-avata-2.jpg?v=2",
      specs: [
        "Video 4K / 60fps HDR & RockSteady 3.0+",
        "Lensa 155° Ultra-Wide Angle FOV",
        "Stabilisasi Gyroflow & HorizonSteady",
        "One-Push ACRO (Flip, Roll, 180° Drift)"
      ],
      ideal: "Ideal untuk: Diving Tebing, Aksi Otomotif / Drift, Fly-through Indoor & Olahraga Ekstrem",
      ctaText: "Booking dengan Avata 2 →",
      ctaUnit: "DJI Avata 2"
    },
    {
      id: "drone-5",
      tag: "AGILE & SUB-249G",
      title: "DJI Mini 4 Pro",
      desc: "Drone lincah sub-249 gram dengan fitur True Vertical Shooting untuk konten media sosial format portrait TikTok & Reels.",
      imageUrl: "assets/images/drone-mini-4-pro.jpg?v=2",
      specs: [
        "4K / 60fps HDR & 4K / 100fps Slow-mo",
        "True Vertical Gimbal Rotation",
        "Omnidirectional Obstacle Sensing",
        "48MP RAW Photo High Details"
      ],
      ideal: "Ideal untuk: Wisata, Real Estate, Konten Instagram Reels & TikTok",
      ctaText: "Booking dengan Mini 4 Pro →",
      ctaUnit: "DJI Mini 4 Pro"
    },
    {
      id: "drone-6",
      tag: "PALM TAKEOFF & AI TRACKING",
      title: "DJI Neo 2",
      desc: "Drone ultra-ringan 135g dengan lepas landas langsung dari telapak tangan, pelacakan AI subjek otomatis cerdas, dan stabilisasi RockSteady untuk sudut pandang unik yang dekat.",
      imageUrl: "assets/images/drone-neo-2.jpg?v=2",
      specs: [
        "Video 4K Ultra-Stabilized & QuickShots",
        "Palm Takeoff & Landing Tanpa Remote",
        "Pelacakan Subjek Berbasis AI Cerdas",
        "Full Propeller Guard (Sangat Aman)"
      ],
      ideal: "Ideal untuk: Vlog Personal, Acara Intimate, Syuting Dalam Ruangan (Indoor Fly)",
      ctaText: "Booking dengan Neo 2 →",
      ctaUnit: "DJI Neo 2"
    }
  ],
  services: [
    {
      id: "service-1",
      title: "Aerial Cinematography",
      desc: "Perekaman video udara resolusi 4K/5K untuk film komersial, pariwisata, dan produksi kreatif.",
      deliverables: [
        "File Mentah (D-Log M) + Color Graded 4K",
        "Waktu Terbang 2–4 Baterai Operasional",
        "Izin Terbang Resmi & Prosedur Aman"
      ]
    },
    {
      id: "service-2",
      title: "Real Estate & Arsitektur",
      desc: "Pengambilan foto & video properti dari sudut pandang luas memperlihatkan lanskap lingkungan sekitar.",
      deliverables: [
        "Foto Udara 48MP RAW High-Resolution",
        "Video Showcase 4K + Format Vertikal Reels",
        "Highlight Fasilitas & Aksesibilitas Kawasan"
      ]
    },
    {
      id: "service-3",
      title: "Dokumentasi Acara",
      desc: "Liputan udara untuk festival, konser outdoor, acara olahraga, resepsi pernikahan, dan gathering.",
      deliverables: [
        "Dokumentasi Sudut Pandang Crowd Dinamis",
        "Highlight Video 60s Siap Publikasi",
        "Penerbangan Aman di Atas Area Publik"
      ]
    },
    {
      id: "service-4",
      title: "Company Profile",
      desc: "Produksi video profil perusahaan, fasilitas industri, dan kantor korporat dengan visual udara sinematik berstandar profesional.",
      deliverables: [
        "Master Video 4K Siap Presentasi & Web",
        "Seluruh File Rekaman Mentah (Unedited)",
        "Sertifikasi Remote Pilot Berlisensi Resmi"
      ]
    }
  ],
  about: {
    pilotName: "Bobien Martien",
    pilotRole: "Aerial Cinematographer & Remote Pilot",
    badge: "CERTIFIED DRONE PILOT",
    regTitle: "REGISTRASI RESMI",
    regBody: "SIDOPI GO & DGCA DKPPU",
    regSub: "Kementerian Perhubungan RI",
    avatarUrl: "assets/images/pilot-bobien-martien.jpg?v=2",
    title: "Melihat Perspektif yang Tidak Pernah Terjangkau dari Daratan.",
    p1: "Saya adalah seorang <strong class=\"text-white\">Remote Pilot Bersertifikasi Resmi Kementerian Perhubungan (DKPPU & SIDOPI GO)</strong> yang berdedikasi pada sinematografi udara dan pengambilan visual udara presisi tinggi.",
    p2: "Dengan pengalaman terbang lebih dari <strong class=\"text-white\">450 jam terbang operasional</strong>di berbagai wilayah Indonesia, saya terbiasa menghadapi tantangan medan nyata mulai dari dinamika angin pesisir, lanskap alam terbuka, hingga penerbangan presisi di kawasan urban padat.\n\nFokus utama di lapangan diarahkan pada  <strong class=\"text-white\"> pergerakan kamera yang halus dan terukur, akurasi profil warna 10-Bit D-Log M untuk kemudahan color grading, serta standar ketat keselamatan terbang</strong>\n\nSetiap penerbangan didukung prosedur standar keselamatan pra-terbang, manajemen baterai terukur, dan kepatuhan izin wilayah udara untuk memastikan kelancaran produksi tim kreatif Anda.",
    p3: "Saya menggabungkan keterampilan pilot, ketelitian dalam pengambilan gambar, serta pemahaman teknis penerbangan untuk menghasilkan karya visual yang memiliki nilai estetika, komposisi kuat, dan standar produksi berkualitas.",
    p4: "Dalam setiap proyek, saya mengutamakan <strong class=\"text-white\">keselamatan penerbangan, kepatuhan terhadap regulasi, dan kualitas hasil visual</strong> sebagai bagian dari komitmen profesional."
  },
  contact: {
    whatsapp: "+62 813-8145-3598",
    whatsappClean: "6281381453598",
    whatsappText: "Halo saya tertarik dengan jasa drone Anda",
    email: "bobienfly@gmail.com",
    instagram: "@bobienmartien",
    instagramUrl: "https://instagram.com/bobienmartien",
    address: "Jakarta & Karawang, Indonesia"
  }
};

/**
 * Get active site configuration
 */
function getSiteConfig() {
  try {
    const saved = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-migrate legacy default hero title & subtitle if unchanged by user
      if (parsed && parsed.hero) {
        if (parsed.hero.title && (parsed.hero.title.includes("Menangkap Keindahan Dunia") || parsed.hero.title.includes("bg-gradient-to-r") || parsed.hero.title.includes("bg-clip-text"))) {
          parsed.hero.title = DEFAULT_SITE_CONFIG.hero.title;
        }
        if (parsed.hero.subtitle && parsed.hero.subtitle.includes("Koleksi visual lanskap alam")) {
          parsed.hero.subtitle = DEFAULT_SITE_CONFIG.hero.subtitle;
        }
      }
      // Auto-migrate hero stats if missing or outdated count
      if (parsed && parsed.hero) {
        if (!Array.isArray(parsed.hero.stats) || parsed.hero.stats.length < 6) {
          parsed.hero.stats = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG.hero.stats));
        }
      }
      // Auto-migrate avatar to official Bobien Martien photo
      if (parsed && parsed.about) {
        if (!parsed.about.avatarUrl || parsed.about.avatarUrl.includes("photo-1516035069371") || parsed.about.avatarUrl === "assets/images/pilot-profile.jpg") {
          parsed.about.avatarUrl = DEFAULT_SITE_CONFIG.about.avatarUrl;
        }
        if (parsed.about.p1 && parsed.about.p1.includes("Certified Remote Pilot dan Aerial Visual Creator")) {
          parsed.about.p1 = DEFAULT_SITE_CONFIG.about.p1;
          parsed.about.p2 = DEFAULT_SITE_CONFIG.about.p2;
        }
      }
      // Auto-migrate drone fleet images & tags to official local assets if using legacy or unsplash URLs
      if (parsed && Array.isArray(parsed.gear)) {
        parsed.gear.forEach((g, idx) => {
          if (!g.imageUrl || g.imageUrl.includes("unsplash.com") || g.imageUrl === DEFAULT_SITE_CONFIG.gear[idx]?.imageUrl?.replace("?v=2", "")) {
            if (DEFAULT_SITE_CONFIG.gear[idx]) {
              g.imageUrl = DEFAULT_SITE_CONFIG.gear[idx].imageUrl;
            }
          }
          if (g.tag && g.tag.includes("CINEMA CLASS • NEXT-GEN 8K") && DEFAULT_SITE_CONFIG.gear[idx]) {
            g.tag = DEFAULT_SITE_CONFIG.gear[idx].tag;
          }
        });
      }
      return deepMergeConfig(DEFAULT_SITE_CONFIG, parsed);
    }
  } catch (err) {
    console.warn("Could not parse site config from storage:", err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
}

/**
 * Save site configuration to localStorage
 */
function saveSiteConfig(newConfig) {
  try {
    localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    return true;
  } catch (err) {
    console.error("Could not save site config:", err);
    return false;
  }
}

/**
 * Reset site configuration to factory default
 */
function resetSiteConfig() {
  try {
    localStorage.removeItem(SITE_CONFIG_STORAGE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Export configuration as formatted JSON string
 */
function exportSiteConfigJSON() {
  const current = getSiteConfig();
  return JSON.stringify(current, null, 2);
}

/**
 * Import configuration from JSON string
 */
function importSiteConfigJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === "object") {
      const merged = deepMergeConfig(DEFAULT_SITE_CONFIG, parsed);
      saveSiteConfig(merged);
      return { success: true };
    }
    return { success: false, message: "Format JSON tidak valid" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

/**
 * Deep merge helper for configuration objects
 */
function deepMergeConfig(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key]) && !Array.isArray(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMergeConfig(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === "object" && !Array.isArray(item));
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Apply site configuration dynamically to the DOM on index.html
 */
function applySiteConfigToDOM(config) {
  if (!config) config = getSiteConfig();

  // 1. Hero Section
  if (config.hero) {
    const heroTitle = document.querySelector("#beranda h1");
    if (heroTitle && config.hero.title) {
      heroTitle.innerHTML = config.hero.title;
    }
    const heroSubtitle = document.querySelector("#beranda p");
    if (heroSubtitle && config.hero.subtitle) {
      heroSubtitle.textContent = config.hero.subtitle;
    }

    // Dynamic Hero Stats (HUD Telemetry)
    const statsContainer = document.getElementById("hero-stats-container");
    if (statsContainer && Array.isArray(config.hero.stats) && config.hero.stats.length > 0) {
      const count = config.hero.stats.length;
      let gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
      if (count === 1) gridCols = "grid-cols-1 max-w-sm";
      else if (count === 2) gridCols = "grid-cols-2 max-w-xl";
      else if (count === 3) gridCols = "grid-cols-2 sm:grid-cols-3 max-w-3xl";
      else if (count === 4) gridCols = "grid-cols-2 sm:grid-cols-4 max-w-4xl";
      else if (count === 5) gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl";
      else if (count >= 6) gridCols = `grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(count, 6)} max-w-6xl`;

      statsContainer.className = `mt-16 grid ${gridCols} gap-3.5 mx-auto`;

      const defaultIcons = ["award", "video", "map-pin", "clock", "radio", "zap", "shield", "activity"];
      statsContainer.innerHTML = config.hero.stats.map((stat, idx) => {
        const isOddLast = (idx === count - 1 && count % 2 !== 0 && count > 1);
        const iconName = stat.icon || defaultIcons[idx % defaultIcons.length] || "bar-chart-2";
        return `
          <div class="glass-panel p-4 rounded-xl border border-[#262629] bg-[#141416]/90 crosshair-corner text-left ${isOddLast ? 'col-span-2 sm:col-span-1' : ''}">
            <div class="text-xs font-mono text-[#EAB308] flex items-center gap-1.5 mb-1">
              <i data-lucide="${iconName}" class="w-3.5 h-3.5 text-[#EAB308]"></i>
              <span>${escapeHtml(stat.label || 'STAT')}</span>
            </div>
            <div class="text-xl sm:text-2xl font-bold font-mono text-[#F5F5F7]">${escapeHtml(stat.value || '')}</div>
            <p class="text-[11px] text-[#9CA3AF] truncate">${escapeHtml(stat.sub || '')}</p>
          </div>
        `;
      }).join("");

      if (window.lucide) window.lucide.createIcons();
    }
  }

  // 2. Featured Reel Playlist
  if (Array.isArray(config.featuredReel) && config.featuredReel.length > 0) {
    if (typeof window.FEATURED_VIDEOS_PLAYLIST !== "undefined") {
      window.FEATURED_VIDEOS_PLAYLIST = config.featuredReel;
    }
    // Update quick selector labels
    config.featuredReel.forEach((item, idx) => {
      const quickCard = document.getElementById(`reel-quick-${idx}`);
      if (quickCard) {
        const titleEl = quickCard.querySelector("h4");
        const subEl = quickCard.querySelector("p");
        if (titleEl && item.quickTitle) titleEl.textContent = item.quickTitle;
        if (subEl && item.quickSub) subEl.textContent = item.quickSub;
      }
    });

    if (typeof window.applyFeaturedVideo === "function") {
      window.applyFeaturedVideo(window.currentFeaturedVideoIndex || 0);
    }
  }

  // 3. Contact Info (WhatsApp, Email, Instagram)
  if (config.contact) {
    const cleanWa = config.contact.whatsappClean || (config.contact.whatsapp || "").replace(/[^0-9]/g, "");
    const waText = encodeURIComponent(config.contact.whatsappText || "Halo saya tertarik dengan jasa drone Anda");
    const waUrl = `https://wa.me/${cleanWa}?text=${waText}`;

    // Update general WhatsApp links (excluding drone-specific booking CTAs)
    document.querySelectorAll('a[href*="wa.me"]:not([data-drone-unit])').forEach(link => {
      link.href = waUrl;
    });

    // Drone-specific booking CTA links redirect smoothly to #kontak inquiry form
    document.querySelectorAll('a[data-drone-unit]').forEach(link => {
      const unit = link.getAttribute('data-drone-unit') || '';
      link.href = '#kontak';
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.onclick = function(e) {
        if (e && e.preventDefault) e.preventDefault();
        if (typeof window.selectDroneForBooking === 'function') {
          window.selectDroneForBooking(unit);
        } else {
          const el = document.getElementById('kontak');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        return false;
      };
    });

    // Update WhatsApp display text
    const waSubElem = document.querySelector('[data-i18n="contact.wa_sub"]');
    if (waSubElem && config.contact.whatsapp) {
      waSubElem.textContent = `${config.contact.whatsapp} (Respon Cepat)`;
    }

    // Update Email links & display
    if (config.contact.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${config.contact.email}`;
      });
      const emailElem = document.querySelector('#kontak a[href^="mailto:"] p');
      if (emailElem) emailElem.textContent = config.contact.email;
    }

    // Update Instagram link & handle
    if (config.contact.instagram) {
      const igHandle = config.contact.instagram.startsWith("@") ? config.contact.instagram : `@${config.contact.instagram}`;
      const igClean = igHandle.replace("@", "");
      document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
        link.href = config.contact.instagramUrl || `https://instagram.com/${igClean}`;
      });
      const igTextElem = document.querySelector("#kontak .text-pink-400 ~ div p");
      if (igTextElem) igTextElem.textContent = igHandle;
    }
  }

  // 4. Pilot Profile
  if (config.about) {
    const pilotName = document.querySelector("#tentang h3");
    if (pilotName && config.about.pilotName) pilotName.textContent = config.about.pilotName;

    const pilotRole = document.querySelector('#tentang [data-i18n="about.pilot_role"]');
    if (pilotRole && config.about.pilotRole) pilotRole.textContent = config.about.pilotRole;

    const pilotImg = document.getElementById("pilot-profile-img") || document.querySelector("#tentang img");
    if (pilotImg && config.about.avatarUrl) {
      pilotImg.src = config.about.avatarUrl;
    }

    const pilotTitle = document.querySelector("#tentang h2");
    if (pilotTitle && config.about.title) pilotTitle.textContent = config.about.title;
  }

  // 5. Gear / Armada Drone Fleet Cards
  if (Array.isArray(config.gear)) {
    config.gear.forEach((g, idx) => {
      const imgEl = document.getElementById(`fleet-drone-img-${idx}`);
      if (imgEl && g.imageUrl) {
        imgEl.src = g.imageUrl;
      }
    });
  }
}

// Load live server configuration from site-config.json
async function loadLiveServerConfig() {
  try {
    const res = await fetch("site-config.json?v=" + Date.now());
    if (res.ok) {
      const serverConfig = await res.json();
      if (serverConfig && typeof serverConfig === "object") {
        return serverConfig;
      }
    }
  } catch (e) {
    console.debug("Could not fetch remote site-config.json:", e);
  }
  return null;
}

// Expose globally
window.AeroSiteConfig = {
  DEFAULT_SITE_CONFIG,
  getSiteConfig,
  saveSiteConfig,
  resetSiteConfig,
  exportSiteConfigJSON,
  importSiteConfigJSON,
  applySiteConfigToDOM,
  loadLiveServerConfig,
  deepMergeConfig
};
