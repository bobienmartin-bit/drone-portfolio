// ========================================================
// AEROSCOPE SITE CONFIGURATION & CONTENT MANAGEMENT ENGINE
// ========================================================

const SITE_CONFIG_STORAGE_KEY = "AEROSCOPE_SITE_CONFIG";

const DEFAULT_SITE_CONFIG = {
  hero: {
    badge: "AERIAL CINEMATOGRAPHY & DRONE PHOTOGRAPHY",
    title: "Visual Udara Sinematik dari Perspektif Terbaik.",
    subtitle: "Jasa aerial cinematography dan fotografi drone beresolusi tinggi hingga 5.1K. Didukung pilot bersertifikat resmi dan armada lengkap untuk produksi komersial, properti, hingga dokumentasi acara.",
    btnShowreel: "Watch 4K Showreel",
    btnGallery: "Explore Portfolio",
    credentials: [
      { text: "Certified Pilot SIDOPI GO & DKPPU" },
      { text: "450+ Operational Flight Hours" },
      { text: "Nationwide Mission Ready" }
    ],
    bgImageUrl: "assets/images/hero-bg-balloons.jpg?v=2"
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
    title: "Perspektif Udara Presisi untuk Standar Produksi Layar Lebar & Komersial.",
    p1: 'Saya adalah seorang <strong class="text-white">Remote Pilot Bersertifikasi Resmi Kementerian Perhubungan (DKPPU & SIDOPI GO)</strong> yang berdedikasi pada sinematografi udara dan pengambilan visual udara presisi tinggi.',
    p2: 'Dengan pengalaman lebih dari <strong class="text-white">450 jam terbang operasional</strong> di berbagai wilayah Indonesia, saya terbiasa menghadapi tantangan medan nyata—mulai dari dinamika angin pesisir, lanskap alam terbuka, hingga penerbangan presisi di kawasan urban padat.',
    p3: 'Fokus utama di lapangan diarahkan pada <strong class="text-white">pergerakan kamera yang halus dan terukur, akurasi profil warna 10-Bit D-Log M untuk kemudahan color grading, serta standar ketat keselamatan terbang</strong>.',
    p4: 'Setiap penerbangan didukung prosedur standar keselamatan pra-terbang, manajemen baterai terukur, dan kepatuhan izin wilayah udara untuk memastikan kelancaran produksi tim kreatif Anda.',
    credentials: {
      cardTitle: "LEGALITAS & REGISTRASI RESMI TERVERIFIKASI",
      cardSub: "Kementerian Perhubungan Republik Indonesia (DGCA)",
      sidopiLabel: "REGISTRASI SIDOPI GO",
      sidopiVal: "ID: PILOT-••••-2024",
      dkppuLabel: "SERTIFIKASI PILOT DKPPU",
      dkppuVal: "CASR PART 107 • #DKPPU-••••-89",
      logLabel: "STANDAR OPERASIONAL",
      logVal: "450+ Jam Terbang • Zero Incident"
    },
    stats: {
      hours: "450+",
      hoursLabel: "Flight Hours",
      safety: "100%",
      safetyLabel: "Zero Incident",
      fleet: "6+",
      fleetLabel: "Fleet Units",
      cities: "18+",
      citiesLabel: "Cities Flown"
    }
  },
  testimonials: [
    {
      id: "t1",
      badge: "EVENT COVERAGE",
      quote: "Bobien mengeksekusi liputan aerial ultah ke-12 KCP Galuh Mas dengan sangat teliti. Pergerakan kameranya halus, perizinan dan SOP keselamatannya sangat rapi, dan video highlight-nya luar biasa memukau penonton.",
      author: "Event Management Team",
      role: "Wonderful 12th KCP Galuh Mas Organizer",
      initials: "KC"
    },
    {
      id: "t2",
      badge: "1ST PLACE WINNER",
      quote: "Kualitas rekaman Hasselblad dan pemahaman Bobien mengenai sudut arsitektur sangat membantu visualisasi New Cluster Groove. Hasil videonya berhasil menjadi juara 1 kompetisi aerial.",
      author: "Commercial Marketing Lead",
      role: "Property Developer & Agency Partner",
      initials: "ML"
    },
    {
      id: "t3",
      badge: "COMMERCIAL FILM",
      quote: "Pilot drone yang benar-benar paham estetika sinematografi, bukan sekadar terbang. File 10-Bit D-Log M yang diserahkan sangat rapi dan dinamis untuk color grading di studio kami.",
      author: "Creative Director",
      role: "Visual Motion Studio",
      initials: "CD"
    },
    {
      id: "t4",
      badge: "CAMPUS & INSTITUTIONAL",
      quote: "Sangat profesional, taat izin keselamatan zona terbang, dan hasil aerial PKN STAN Campus Skies spektakuler dan viral di media sosial kampus.",
      author: "Public Relations & Media Crew",
      role: "Campus Skies Production",
      initials: "PR"
    }
  ],
  packages: [
    {
      id: "pkg-1",
      badge: "HIGH-RES STILLS",
      title: "Aerial Photography Package",
      desc: "High-resolution 48MP RAW aerial photography tailored for architectural showcases, masterplans, billboards, and high-definition marketing campaigns.",
      deliverables: [
        "48MP RAW High-Resolution Photos",
        "Wide-Angle & Panoramic Landscape Coverage",
        "Professional Retouching & Commercial Color Science"
      ]
    },
    {
      id: "pkg-2",
      badge: "5.1K / 4K MASTER",
      title: "Aerial Cinematography Package",
      desc: "Commercial film and cinema-grade advertising utilizing Hasselblad optical sensors, 5.1K/4K UHD, and 10-Bit D-Log M high dynamic range color profiles.",
      deliverables: [
        "Master Video 5.1K / 4K UHD (60/120fps)",
        "10-Bit D-Log M High Dynamic Range Color",
        "Multi-Battery Sorties & Cinematic Gimbal Sequences"
      ]
    },
    {
      id: "pkg-3",
      badge: "ONE-PUSH ACRO",
      title: "FPV Cinematic Package",
      desc: "Dynamic high-speed visuals, building and cliff dives, automotive chase sequences, and controlled indoor fly-throughs with enclosed propeller units.",
      deliverables: [
        "4K/60fps HDR 155° Ultra-Wide FOV",
        "One-Push ACRO Maneuvers & RockSteady 3.0+",
        "Confined Space & Indoor Safety Protocol"
      ]
    },
    {
      id: "pkg-4",
      badge: "ARCHITECTURE & REELS",
      title: "Real Estate & Property Showcase",
      desc: "Comprehensive property showcases combining 4K landscape master footage and 9:16 vertical reels to maximize buyer engagement and viral social reach.",
      deliverables: [
        "Master 4K + Vertical 9:16 Reels Format",
        "Surrounding Facility & Access Highlights",
        "Golden Hour & Sunset Lighting Sessions"
      ]
    },
    {
      id: "pkg-5",
      badge: "ENTERPRISE & K3",
      title: "Corporate & Industrial Documentation",
      desc: "High-elevation industrial monitoring, corporate company profiles, factory inspections, and periodic construction tracking conducted under strict PPE/K3 standards.",
      deliverables: [
        "High-Elevation Facility & Factory Monitoring",
        "Periodic Infrastructure Progress Tracking",
        "Full SIDOPI GO & DGCA Airspace Clearance"
      ]
    },
    {
      id: "pkg-6",
      badge: "CROWD PERSPECTIVE",
      title: "Event & Festival Coverage",
      desc: "Breathtaking aerial views capturing the full magnitude of outdoor festivals, music concerts, sporting events, and cultural celebrations with certified crowd safety.",
      deliverables: [
        "Dynamic High-Altitude Crowd Perspectives",
        "60s Social Media Highlight Reel within 24h",
        "Safety-First Operations & Standby Crew"
      ]
    }
  ],
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
      // Auto-migrate hero CTA buttons & credentials if missing
      if (parsed && parsed.hero) {
        if (!parsed.hero.btnShowreel) {
          parsed.hero.btnShowreel = DEFAULT_SITE_CONFIG.hero.btnShowreel;
        }
        if (!parsed.hero.btnGallery) {
          parsed.hero.btnGallery = DEFAULT_SITE_CONFIG.hero.btnGallery;
        }
        if (!Array.isArray(parsed.hero.credentials) || parsed.hero.credentials.length < 3) {
          parsed.hero.credentials = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG.hero.credentials));
        }
        if (!parsed.hero.bgImageUrl || parsed.hero.bgImageUrl.includes("unsplash.com")) {
          parsed.hero.bgImageUrl = DEFAULT_SITE_CONFIG.hero.bgImageUrl;
        }
      }
      // Auto-migrate avatar & text to official Bobien Martien frontpage info
      if (parsed && parsed.about) {
        if (!parsed.about.avatarUrl || parsed.about.avatarUrl.includes("photo-1516035069371") || parsed.about.avatarUrl === "assets/images/pilot-profile.jpg") {
          parsed.about.avatarUrl = DEFAULT_SITE_CONFIG.about.avatarUrl;
        }
        if (!parsed.about.title || parsed.about.title.includes("Melihat Perspektif yang Tidak Pernah Terjangkau")) {
          parsed.about.title = DEFAULT_SITE_CONFIG.about.title;
        }
        if (!parsed.about.p1 || parsed.about.p1.includes("Certified Remote Pilot dan Aerial Visual Creator")) {
          parsed.about.p1 = DEFAULT_SITE_CONFIG.about.p1;
        }
        if (!parsed.about.p2 || parsed.about.p2.includes("\n\nFokus utama")) {
          parsed.about.p2 = DEFAULT_SITE_CONFIG.about.p2;
        }
        if (!parsed.about.p3 || parsed.about.p3.includes("Saya menggabungkan keterampilan")) {
          parsed.about.p3 = DEFAULT_SITE_CONFIG.about.p3;
        }
        if (!parsed.about.p4 || parsed.about.p4.includes("Dalam setiap proyek")) {
          parsed.about.p4 = DEFAULT_SITE_CONFIG.about.p4;
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
    const isEn = window.AeroI18n ? (window.AeroI18n.getCurrentLanguage() === 'en') : false;
    const isDefaultIdTitle = !config.hero.title || config.hero.title === "Visual Udara Sinematik dari Perspektif Terbaik.";
    const isDefaultIdSubtitle = !config.hero.subtitle || config.hero.subtitle.startsWith("Jasa aerial cinematography");

    const heroTitle = document.querySelector("#beranda h1");
    if (heroTitle) {
      if (isEn && isDefaultIdTitle && window.AeroI18n && window.AeroI18n.translations && window.AeroI18n.translations.en) {
        heroTitle.innerHTML = window.AeroI18n.translations.en["hero.title"] || "Cinematic Aerial Visuals from the Best Perspective.";
      } else if (config.hero.title) {
        heroTitle.innerHTML = config.hero.title;
      }
    }
    const heroSubtitle = document.querySelector("#beranda p");
    if (heroSubtitle) {
      if (isEn && isDefaultIdSubtitle && window.AeroI18n && window.AeroI18n.translations && window.AeroI18n.translations.en) {
        heroSubtitle.textContent = window.AeroI18n.translations.en["hero.subtitle"] || "High-resolution aerial cinematography and drone photography up to 5.1K. Backed by certified drone pilots and an advanced fleet for commercial productions, real estate, and event coverage.";
      } else if (config.hero.subtitle) {
        heroSubtitle.textContent = config.hero.subtitle;
      }
    }

    // Dynamic Hero CTA Buttons
    if (config.hero.btnShowreel) {
      const isDefaultShowreel = config.hero.btnShowreel === "Watch 4K Showreel" || config.hero.btnShowreel === "Tonton Showreel 4K";
      const btnShowreelEl = document.querySelector("#beranda [data-i18n='hero.btn_showreel']");
      if (btnShowreelEl) {
        if (isEn && isDefaultShowreel && window.AeroI18n?.translations?.en) {
          btnShowreelEl.textContent = window.AeroI18n.translations.en["hero.btn_showreel"];
        } else if (!isEn && isDefaultShowreel && window.AeroI18n?.translations?.id) {
          btnShowreelEl.textContent = window.AeroI18n.translations.id["hero.btn_showreel"];
        } else {
          btnShowreelEl.textContent = config.hero.btnShowreel;
        }
      }
    }
    if (config.hero.btnGallery) {
      const isDefaultGallery = config.hero.btnGallery === "Explore Portfolio" || config.hero.btnGallery === "Jelajahi Galeri";
      const btnGalleryEl = document.querySelector("#beranda [data-i18n='hero.btn_gallery']");
      if (btnGalleryEl) {
        if (isEn && isDefaultGallery && window.AeroI18n?.translations?.en) {
          btnGalleryEl.textContent = window.AeroI18n.translations.en["hero.btn_gallery"];
        } else if (!isEn && isDefaultGallery && window.AeroI18n?.translations?.id) {
          btnGalleryEl.textContent = window.AeroI18n.translations.id["hero.btn_gallery"];
        } else {
          btnGalleryEl.textContent = config.hero.btnGallery;
        }
      }
    }

    // Dynamic Practitioner Credentials (3 items)
    if (Array.isArray(config.hero.credentials)) {
      const credKeys = ["hero.cred_license", "hero.cred_hours", "hero.cred_nationwide"];
      const credSelectors = [
        "#beranda [data-i18n='hero.cred_license']",
        "#beranda [data-i18n='hero.cred_hours']",
        "#beranda [data-i18n='hero.cred_nationwide']"
      ];
      config.hero.credentials.forEach((cred, idx) => {
        if (cred && cred.text && credSelectors[idx]) {
          const el = document.querySelector(credSelectors[idx]);
          if (el) {
            const key = credKeys[idx];
            const isDefault = cred.text === window.AeroI18n?.translations?.id?.[key] || cred.text === window.AeroI18n?.translations?.en?.[key];
            if (isDefault && window.AeroI18n?.translations?.[isEn ? 'en' : 'id']?.[key]) {
              el.textContent = window.AeroI18n.translations[isEn ? 'en' : 'id'][key];
            } else {
              el.textContent = cred.text;
            }
          }
        }
      });
    }

    // Dynamic Hero Background Image
    if (config.hero.bgImageUrl) {
      const heroBgImg = document.querySelector("#beranda img");
      if (heroBgImg) heroBgImg.src = config.hero.bgImageUrl;
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
    const isEn = window.AeroI18n ? (window.AeroI18n.getCurrentLanguage() === 'en') : false;
    const isDefaultTitle = !config.about.title || 
      config.about.title.includes("Perspektif Udara Presisi") ||
      config.about.title.includes("Melihat Perspektif") ||
      config.about.title.includes("Precision Aerial Perspectives");

    const pilotName = document.querySelector("#tentang h3");
    if (pilotName && config.about.pilotName) pilotName.textContent = config.about.pilotName;

    const pilotRole = document.querySelector('#tentang [data-i18n="about.pilot_role"]');
    if (pilotRole && config.about.pilotRole) pilotRole.textContent = config.about.pilotRole;

    const pilotImg = document.getElementById("pilot-profile-img") || document.querySelector("#tentang img");
    if (pilotImg && config.about.avatarUrl) {
      pilotImg.src = config.about.avatarUrl;
    }

    const pilotTitle = document.querySelector("#tentang h2");
    if (pilotTitle) {
      if (isEn && isDefaultTitle && window.AeroI18n?.translations?.en?.["about.title"]) {
        pilotTitle.textContent = window.AeroI18n.translations.en["about.title"];
      } else if (!isEn && isDefaultTitle && window.AeroI18n?.translations?.id?.["about.title"]) {
        pilotTitle.textContent = window.AeroI18n.translations.id["about.title"];
      } else if (config.about.title) {
        pilotTitle.textContent = config.about.title;
      }
    }

    // Helper detectors for default bio paragraphs
    const isDefaultBio1 = (txt) => !txt || txt.includes("Remote Pilot") || txt.includes("SIDOPI GO") || txt.includes("Saya adalah") || txt.includes("I am a");
    const isDefaultBio2 = (txt) => !txt || txt.includes("450") || txt.includes("jam terbang") || txt.includes("flight hours");
    const isDefaultBio3 = (txt) => !txt || txt.includes("Fokus utama") || txt.includes("pergerakan kamera") || txt.includes("gimbal motion");
    const isDefaultBio4 = (txt) => !txt || txt.includes("Setiap penerbangan") || txt.includes("standar keselamatan") || txt.includes("safety checklists");

    // Dynamic Bio Paragraphs (p1, p2, p3, p4)
    const p1El = document.querySelector('#tentang [data-i18n="about.p1"]');
    if (p1El) {
      if (isEn && isDefaultBio1(config.about.p1) && window.AeroI18n?.translations?.en?.["about.p1"]) {
        p1El.innerHTML = window.AeroI18n.translations.en["about.p1"];
      } else if (!isEn && isDefaultBio1(config.about.p1) && window.AeroI18n?.translations?.id?.["about.p1"]) {
        p1El.innerHTML = window.AeroI18n.translations.id["about.p1"];
      } else if (config.about.p1) {
        p1El.innerHTML = config.about.p1;
      }
    }

    const p2El = document.querySelector('#tentang [data-i18n="about.p2"]');
    if (p2El) {
      if (isEn && isDefaultBio2(config.about.p2) && window.AeroI18n?.translations?.en?.["about.p2"]) {
        p2El.innerHTML = window.AeroI18n.translations.en["about.p2"];
      } else if (!isEn && isDefaultBio2(config.about.p2) && window.AeroI18n?.translations?.id?.["about.p2"]) {
        p2El.innerHTML = window.AeroI18n.translations.id["about.p2"];
      } else if (config.about.p2) {
        p2El.innerHTML = config.about.p2;
      }
    }

    const p3El = document.querySelector('#tentang [data-i18n="about.p3"]');
    if (p3El) {
      if (isEn && isDefaultBio3(config.about.p3) && window.AeroI18n?.translations?.en?.["about.p3"]) {
        p3El.innerHTML = window.AeroI18n.translations.en["about.p3"];
      } else if (!isEn && isDefaultBio3(config.about.p3) && window.AeroI18n?.translations?.id?.["about.p3"]) {
        p3El.innerHTML = window.AeroI18n.translations.id["about.p3"];
      } else if (config.about.p3) {
        p3El.innerHTML = config.about.p3;
      }
    }

    const p4El = document.querySelector('#tentang [data-i18n="about.p4"]');
    if (p4El) {
      if (isEn && isDefaultBio4(config.about.p4) && window.AeroI18n?.translations?.en?.["about.p4"]) {
        p4El.innerHTML = window.AeroI18n.translations.en["about.p4"];
      } else if (!isEn && isDefaultBio4(config.about.p4) && window.AeroI18n?.translations?.id?.["about.p4"]) {
        p4El.innerHTML = window.AeroI18n.translations.id["about.p4"];
      } else if (config.about.p4) {
        p4El.innerHTML = config.about.p4;
      }
    }

    // Credentials & Legalities (SIDOPI GO & DKPPU)
    if (config.about.credentials) {
      const cr = config.about.credentials;
      const cTitle = document.getElementById("about-cert-card-title");
      if (cTitle && cr.cardTitle) cTitle.textContent = cr.cardTitle;
      const cSub = document.getElementById("about-cert-card-sub");
      if (cSub && cr.cardSub) cSub.textContent = cr.cardSub;
      const sidopiLbl = document.getElementById("about-cert-item1-lbl");
      if (sidopiLbl && cr.sidopiLabel) sidopiLbl.textContent = cr.sidopiLabel;
      const sidopiVal = document.getElementById("about-cert-item1-val");
      if (sidopiVal && cr.sidopiVal) sidopiVal.textContent = cr.sidopiVal;
      const dkppuLbl = document.getElementById("about-cert-item2-lbl");
      if (dkppuLbl && cr.dkppuLabel) dkppuLbl.textContent = cr.dkppuLabel;
      const dkppuVal = document.getElementById("about-cert-item2-val");
      if (dkppuVal && cr.dkppuVal) dkppuVal.textContent = cr.dkppuVal;
      const logLbl = document.getElementById("about-cert-item3-lbl");
      if (logLbl && cr.logLabel) logLbl.textContent = cr.logLabel;
      const logVal = document.getElementById("about-cert-item3-val");
      if (logVal && cr.logVal) logVal.textContent = cr.logVal;
    }

    // Telemetry Stats
    if (config.about.stats) {
      const st = config.about.stats;
      const hVal = document.getElementById("about-stat-hours-val");
      if (hVal && st.hours) hVal.textContent = st.hours;
      const hLbl = document.getElementById("about-stat-hours-lbl");
      if (hLbl && st.hoursLabel) hLbl.textContent = st.hoursLabel;

      const sVal = document.getElementById("about-stat-safety-val");
      if (sVal && st.safety) sVal.textContent = st.safety;
      const sLbl = document.getElementById("about-stat-safety-lbl");
      if (sLbl && st.safetyLabel) sLbl.textContent = st.safetyLabel;

      const fVal = document.getElementById("about-stat-fleet-val");
      if (fVal && st.fleet) fVal.textContent = st.fleet;
      const fLbl = document.getElementById("about-stat-fleet-lbl");
      if (fLbl && st.fleetLabel) fLbl.textContent = st.fleetLabel;

      const cVal = document.getElementById("about-stat-cities-val");
      if (cVal && st.cities) cVal.textContent = st.cities;
      const cLbl = document.getElementById("about-stat-cities-lbl");
      if (cLbl && st.citiesLabel) cLbl.textContent = st.citiesLabel;
    }
  }

  // 5. Testimonials
  if (Array.isArray(config.testimonials)) {
    config.testimonials.forEach((t, idx) => {
      const badgeEl = document.getElementById(`testi-badge-${idx}`);
      if (badgeEl && t.badge) badgeEl.textContent = t.badge;
      const quoteEl = document.getElementById(`testi-quote-${idx}`);
      if (quoteEl && t.quote) quoteEl.textContent = `"${t.quote.replace(/^"|"$/g, '')}"`;
      const authorEl = document.getElementById(`testi-author-${idx}`);
      if (authorEl && t.author) authorEl.textContent = t.author;
      const roleEl = document.getElementById(`testi-role-${idx}`);
      if (roleEl && t.role) roleEl.textContent = t.role;
      const initEl = document.getElementById(`testi-initials-${idx}`);
      if (initEl && t.initials) initEl.textContent = t.initials;
    });
  }

  // 6. Commercial Packages
  if (Array.isArray(config.packages)) {
    config.packages.forEach((p, idx) => {
      const badgeEl = document.getElementById(`pkg-badge-${idx}`);
      if (badgeEl && p.badge) badgeEl.textContent = p.badge;
      const titleEl = document.getElementById(`pkg-title-${idx}`);
      if (titleEl && p.title) titleEl.textContent = p.title;
      const descEl = document.getElementById(`pkg-desc-${idx}`);
      if (descEl && p.desc) descEl.textContent = p.desc;
      if (Array.isArray(p.deliverables)) {
        p.deliverables.forEach((del, dIdx) => {
          const delEl = document.getElementById(`pkg-d${dIdx + 1}-${idx}`);
          if (delEl && del) delEl.textContent = del;
        });
      }
    });
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
