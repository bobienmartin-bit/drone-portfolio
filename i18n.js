// ========================================================
// AEROSCOPE: MULTI-LANGUAGE ENGINE (INDONESIAN & ENGLISH)
// ========================================================

const translations = {
  id: {
    // HUD Bar
    "hud.gps": "GPS LOCK • 18 SATELIT",
    "hud.resolution": "MAKS 4K/60FPS UHD",
    "hud.color": "WARNA: 10-BIT D-LOG M",
    "hud.vercel": "VERCEL READY",

    // Nav
    "nav.home": "Beranda",
    "nav.reel": "Video Reel",
    "nav.gallery": "Galeri Karya",
    "nav.gear": "Gear & Layanan",
    "nav.about": "Tentang Saya",
    "nav.contact": "Kontak",
    "nav.booking": "Booking Pilot",

    // Hero
    "hero.badge": "AERIAL CINEMATOGRAPHY & DRONE PHOTOGRAPHY",
    "hero.title": "Menangkap Keindahan Dunia dari <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500\">Sudut Pandang Langit</span>.",
    "hero.subtitle": "Koleksi visual lanskap alam, perkotaan, dan aksi FPV beresolusi tinggi hingga 5.1K. Siap untuk produksi komersial, dokumentasi acara, dan estetika visual sinematik.",
    "hero.btn_showreel": "Tonton Showreel 4K",
    "hero.btn_gallery": "Jelajahi Galeri",
    "hero.stat_res": "RESOLUSI",
    "hero.stat_res_sub": "ProRes & D-Log M",
    "hero.stat_safety": "KESELAMATAN",
    "hero.stat_safety_sub": "Rekor Bebas Insiden",
    "hero.stat_flight": "JAM TERBANG",
    "hero.stat_flight_sub": "Pengalaman Pilot",
    "hero.stat_total": "TOTAL KARYA",
    "hero.stat_total_sub": "Foto & Video Aktif",

    // Showreel
    "reel.badge": "Featured Aerial Cinema",
    "reel.title": "Cinematic Video Showcase",
    "reel.subtitle": "Tonton kompilasi video rekaman drone dengan sinematografi mulus, pergerakan dinamis, dan grading warna profesional.",
    "reel.quick1_title": "Lanskap Tropis",
    "reel.quick1_sub": "Pegunungan Bromo & Semeru",
    "reel.quick2_title": "Metropolis Glow",
    "reel.quick2_sub": "City Hyperlapse SCBD",
    "reel.quick3_title": "FPV Diving Canyon",
    "reel.quick3_sub": "High-Speed Cliff Action",

    // Gallery
    "gallery.badge": "Galeri & Portofolio",
    "gallery.title": "Koleksi Foto & Video Udara",
    "gallery.subtitle": "Koleksi rekaman visual lanskap alam, perkotaan, dan aksi FPV sinematik beresolusi tinggi yang terhubung langsung ke database Supabase.",
    "gallery.filter_all": "Semua Karya",
    "gallery.filter_photo": "Foto Udara",
    "gallery.filter_video": "Video Sinematik",
    "gallery.filter_landscape": "Alam & Lanskap",
    "gallery.filter_urban": "Perkotaan & Arsitektur",
    "gallery.empty_title": "Belum ada karya pada kategori ini",
    "gallery.empty_desc": "Karya foto dan video dapat ditambahkan melalui database Supabase SQL.",
    "gallery.btn_watch": "Tonton",
    "gallery.btn_view": "Lihat",

    // Gear & Services
    "gear.badge": "Armada & Peralatan",
    "gear.title": "Spesifikasi Drone & Layanan",
    "gear.subtitle": "Didukung teknologi drone kelas industri dengan kemampuan rekam resolusi ultra tinggi dan manuver presisi.",
    "gear.d1_tag": "NEXT-GEN FLAGSHIP",
    "gear.d1_desc": "Drone sinema generasi terdepan dengan sistem multi-lensa Hasselblad canggih, sensor rintangan 360° omnidirectional, dan transmisi sinyal O4 Pro jarak jauh.",
    "gear.d1_ideal": "Ideal untuk: Film Layar Lebar, Produksi Komersial Skala Besar, Dokumentasi Sinematik",
    "gear.d2_tag": "TRIPLE CAMERA CINEMA",
    "gear.d2_desc": "Sistem 3 Kamera optik independen dengan sensor utama Hasselblad 4/3 CMOS untuk hasil sinematik kaliber layar lebar.",
    "gear.d2_ideal": "Ideal untuk: Iklan Komersial, Video Profil Perusahaan, Fotografi Lanskap Presisi",
    "gear.d3_tag": "IMMERSIVE FPV CINEMA",
    "gear.d3_desc": "Drone FPV lincah dengan sensor 1/1.3\" CMOS, sudut pandang 155° Ultra-Wide, pelindung baling-baling terintegrasi, dan manuver One-Push ACRO akrobatik.",
    "gear.d3_ideal": "Ideal untuk: Diving Tebing, Aksi Otomotif / Drift, Fly-through Indoor & Olahraga Ekstrem",
    "gear.d4_tag": "AGILE & SUB-249G",
    "gear.d4_desc": "Drone lincah sub-249 gram dengan fitur True Vertical Shooting untuk konten media sosial format portrait TikTok & Reels.",
    "gear.d4_ideal": "Ideal untuk: Wisata, Real Estate, Konten Instagram Reels & TikTok",
    "gear.d5_tag": "PALM TAKEOFF & AI TRACKING",
    "gear.d5_desc": "Drone ultra-ringan 135g dengan lepas landas langsung dari telapak tangan, pelacakan AI subjek otomatis cerdas, dan stabilisasi RockSteady untuk sudut pandang unik yang dekat.",
    "gear.d5_ideal": "Ideal untuk: Vlog Personal, Acara Intimate, Syuting Dalam Ruangan (Indoor Fly)",
    "gear.d6_tag": "DUAL CAMERA & NIGHTSCAPE",
    "gear.d6_desc": "Drone kamera ganda canggih dengan sensor utama 1-inci CMOS 50MP dan kamera medium tele 70mm, dilengkapi sensor LiDAR malam hari untuk keamanan terbang maksimal.",
    "gear.d6_ideal": "Ideal untuk: Fotografi Lanskap Malam Hari, Dokumentasi Travel & Wisata, Komersial Kreatif",
    
    // Services
    "service.s1_title": "Aerial Cinematography",
    "service.s1_desc": "Perekaman video udara resolusi 4K/5K untuk film komersial, pariwisata, dan profil perusahaan.",
    "service.s2_title": "Real Estate & Arsitektur",
    "service.s2_desc": "Pengambilan foto & video properti dari sudut pandang luas memperlihatkan lanskap lingkungan sekitar.",
    "service.s3_title": "Dokumentasi Acara",
    "service.s3_desc": "Liputan udara untuk festival, konser outdoor, acara olahraga, resepsi pernikahan, dan gathering.",
    "service.s4_title": "Pemetaan & Inspeksi",
    "service.s4_desc": "Foto udara ortomosaik 2D/3D untuk inspeksi proyek konstruksi, lahan perkebunan, dan infrastruktur.",

    // About Me
    "about.badge": "Profil Pilot",
    "about.pilot_badge": "CERTIFIED DRONE PILOT",
    "about.pilot_role": "Aerial Cinematographer & Remote Pilot",
    "about.reg_title": "REGISTRASI RESMI",
    "about.reg_desc": "Kementerian Perhubungan RI",
    "about.title": "Melihat Perspektif yang Tidak Pernah Terjangkau dari Daratan.",
    "about.p1": "Saya adalah seorang <strong class=\"text-white\">Certified Remote Pilot dan Aerial Visual Creator</strong> yang berfokus pada fotografi udara, videografi sinematik, serta produksi visual berbasis drone.",
    "about.p2": "Dengan pengalaman terbang lebih dari <strong class=\"text-white\">450 jam di berbagai wilayah Indonesia</strong>, saya telah mengabadikan beragam perspektif visual, mulai dari lanskap alam, kawasan pesisir, hingga arsitektur dan kawasan metropolitan.",
    "about.p3": "Saya menggabungkan keterampilan pilot, ketelitian dalam pengambilan gambar, serta pemahaman teknis penerbangan untuk menghasilkan karya visual yang memiliki nilai estetika, komposisi kuat, dan standar produksi berkualitas.",
    "about.p4": "Dalam setiap proyek, saya mengutamakan <strong class=\"text-white\">keselamatan penerbangan, kepatuhan terhadap regulasi, dan kualitas hasil visual</strong> sebagai bagian dari komitmen profesional.",

    // Contact
    "contact.badge": "Kolaborasi",
    "contact.title": "Mari Wujudkan Proyek Visual Anda",
    "contact.desc": "Punya rencana syuting film, promosi properti, dokumentasi event, atau kebutuhan visual udara khusus? Hubungi saya untuk diskusi penawaran dan jadwal terbang.",
    "contact.wa_label": "WhatsApp Langsung",
    "contact.wa_sub": "+62 813-8145-3598 (Respon Cepat)",
    "contact.email_label": "Email Resmi",
    "contact.ig_follow": "Ikuti →",
    "contact.form_title": "Kirim Pesan Inquiry",
    "contact.name_label": "NAMA LENGKAP",
    "contact.email_label_field": "EMAIL ATAU NO HP",
    "contact.service_label": "JENIS KEBUTUHAN LAYANAN",
    "contact.msg_label": "DETAIL PROYEK & LOKASI",
    "contact.submit_btn": "Kirim Pesan ke WhatsApp",

    // Modals
    "modal.photo_download": "Unduh Foto",
    "modal.video_badge": "AERIAL VIDEO PLAYER",
    "modal.photo_badge": "AERIAL PHOTO VIEWER",

    // Footer
    "footer.copyright": "Copyright &copy; 2026 <strong>AeroScope</strong> All Right Reserved Powered By <a href=\"https://www.instagram.com/bobienmartien/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition-colors\">Bobien Martien</a>",
    "footer.top": "Kembali ke Atas ↑"
  },

  en: {
    // HUD Bar
    "hud.gps": "GPS LOCK • 18 SATELLITES",
    "hud.resolution": "MAX 4K/60FPS UHD",
    "hud.color": "COLOR: 10-BIT D-LOG M",
    "hud.vercel": "VERCEL READY",

    // Nav
    "nav.home": "Home",
    "nav.reel": "Video Reel",
    "nav.gallery": "Portfolio",
    "nav.gear": "Gear & Services",
    "nav.about": "About Me",
    "nav.contact": "Contact",
    "nav.booking": "Book Pilot",

    // Hero
    "hero.badge": "AERIAL CINEMATOGRAPHY & DRONE PHOTOGRAPHY",
    "hero.title": "Capturing the World's Wonders from a <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500\">Sky View Perspective</span>.",
    "hero.subtitle": "High-resolution aerial landscapes, urban cityscapes, and dynamic FPV action up to 5.1K. Tailored for commercial productions, event coverage, and cinematic storytelling.",
    "hero.btn_showreel": "Watch 4K Showreel",
    "hero.btn_gallery": "Explore Portfolio",
    "hero.stat_res": "RESOLUTION",
    "hero.stat_res_sub": "ProRes & D-Log M",
    "hero.stat_safety": "SAFETY",
    "hero.stat_safety_sub": "Zero Incident Record",
    "hero.stat_flight": "FLIGHT HOURS",
    "hero.stat_flight_sub": "Pilot Experience",
    "hero.stat_total": "TOTAL WORKS",
    "hero.stat_total_sub": "Active Media",

    // Showreel
    "reel.badge": "Featured Aerial Cinema",
    "reel.title": "Cinematic Video Showcase",
    "reel.subtitle": "Watch a curated compilation of drone captures with smooth cinematography, dynamic motion, and professional color grading.",
    "reel.quick1_title": "Tropical Peaks",
    "reel.quick1_sub": "Bromo & Semeru Mountains",
    "reel.quick2_title": "Metropolis Glow",
    "reel.quick2_sub": "SCBD City Hyperlapse",
    "reel.quick3_title": "FPV Diving Canyon",
    "reel.quick3_sub": "High-Speed Cliff Action",

    // Gallery
    "gallery.badge": "Portfolio & Gallery",
    "gallery.title": "Aerial Photo & Video Showcase",
    "gallery.subtitle": "A collection of high-resolution aerial landscapes, urban cityscapes, and dynamic FPV cinematic shots synced directly with Supabase database.",
    "gallery.filter_all": "All Media",
    "gallery.filter_photo": "Aerial Photos",
    "gallery.filter_video": "Cinematic Videos",
    "gallery.filter_landscape": "Nature & Landscape",
    "gallery.filter_urban": "Urban & Architecture",
    "gallery.empty_title": "No media found in this category",
    "gallery.empty_desc": "New photos and videos can be added directly via Supabase SQL.",
    "gallery.btn_watch": "Watch",
    "gallery.btn_view": "View",

    // Gear & Services
    "gear.badge": "Fleet & Equipment",
    "gear.title": "Drone Fleet & Services",
    "gear.subtitle": "Powered by industry-grade drone technology featuring ultra-high resolution recording and precision flight maneuvers.",
    "gear.d1_tag": "NEXT-GEN FLAGSHIP",
    "gear.d1_desc": "Next-generation cinema flagship drone with advanced Hasselblad multi-lens system, 360° omnidirectional obstacle sensing, and long-range O4 Pro transmission.",
    "gear.d1_ideal": "Ideal for: Feature Films, High-End Commercials, Cinematic Aerial Storytelling",
    "gear.d2_tag": "TRIPLE CAMERA CINEMA",
    "gear.d2_desc": "Independent 3-camera optical system with Hasselblad 4/3 CMOS primary sensor delivering large-screen cinematic calibre.",
    "gear.d2_ideal": "Ideal for: Commercial Ads, Corporate Profiles, High-Resolution Landscapes",
    "gear.d3_tag": "IMMERSIVE FPV CINEMA",
    "gear.d3_desc": "Agile cinematic FPV drone featuring 1/1.3\" CMOS sensor, 155° ultra-wide FOV, integrated propeller guards, and intuitive One-Push ACRO maneuvers.",
    "gear.d3_ideal": "Ideal for: Cliff Dives, Automotive & Drift, Indoor Fly-throughs, Action Sports",
    "gear.d4_tag": "AGILE & SUB-249G",
    "gear.d4_desc": "Ultra-lightweight sub-249g drone with True Vertical Shooting optimized for portrait social media content on TikTok & Instagram Reels.",
    "gear.d4_ideal": "Ideal for: Tourism, Real Estate, Instagram Reels & TikTok",
    "gear.d5_tag": "PALM TAKEOFF & AI TRACKING",
    "gear.d5_desc": "Ultra-compact 135g palm-takeoff drone featuring smart AI subject tracking, RockSteady stabilization, and dynamic close-proximity shots.",
    "gear.d5_ideal": "Ideal for: Personal Vlogs, Intimate Events, Safe Indoor Fly-throughs",
    "gear.d6_tag": "DUAL CAMERA & NIGHTSCAPE",
    "gear.d6_desc": "Advanced dual-camera drone featuring a 1-inch CMOS 50MP primary sensor and 70mm medium telephoto lens, equipped with forward LiDAR nightscape sensing.",
    "gear.d6_ideal": "Ideal for: Nightscape Photography, Travel & Tourism Content, Creative Commercials",

    // Services
    "service.s1_title": "Aerial Cinematography",
    "service.s1_desc": "4K/5K aerial video production for commercial film, tourism promotions, and brand storytelling.",
    "service.s2_title": "Real Estate & Architecture",
    "service.s2_desc": "Wide-angle aerial photography and cinematic fly-throughs showcasing architectural lines and surroundings.",
    "service.s3_title": "Event Documentation",
    "service.s3_desc": "Aerial coverage for festivals, outdoor concerts, sports events, weddings, and grand gatherings.",
    "service.s4_title": "Mapping & Inspection",
    "service.s4_desc": "2D/3D orthomosaic aerial imaging for construction monitoring, plantation land, and infrastructure inspection.",

    // About Me
    "about.badge": "Pilot Profile",
    "about.pilot_badge": "CERTIFIED DRONE PILOT",
    "about.pilot_role": "Aerial Cinematographer & Remote Pilot",
    "about.reg_title": "OFFICIAL CERTIFICATION",
    "about.reg_desc": "Ministry of Transportation RI",
    "about.title": "Discovering Perspectives Never Reached from the Ground.",
    "about.p1": "I am a <strong class=\"text-white\">Certified Remote Pilot and Aerial Visual Creator</strong> focused on aerial photography, cinematic videography, and drone-based visual production.",
    "about.p2": "With over <strong class=\"text-white\">450 flight hours across various regions of Indonesia</strong>, I have captured diverse visual perspectives, from natural landscapes and coastal areas to architecture and metropolitan areas.",
    "about.p3": "I combine piloting skills, precision framing, and aeronautical technical expertise to produce visual works with high aesthetic value, compelling composition, and professional production standards.",
    "about.p4": "In every project, I prioritize <strong class=\"text-white\">flight safety, regulatory compliance, and visual excellence</strong> as part of my professional commitment.",

    // Contact
    "contact.badge": "Collaboration",
    "contact.title": "Let's Bring Your Aerial Vision to Life",
    "contact.desc": "Planning a film shoot, property showcase, event coverage, or bespoke aerial project? Contact me to discuss rates and flight scheduling.",
    "contact.wa_label": "Direct WhatsApp",
    "contact.wa_sub": "+62 813-8145-3598 (Fast Response)",
    "contact.email_label": "Official Email",
    "contact.ig_follow": "Follow →",
    "contact.form_title": "Send Project Inquiry",
    "contact.name_label": "FULL NAME",
    "contact.email_label_field": "EMAIL OR PHONE",
    "contact.service_label": "SERVICE REQUIRED",
    "contact.msg_label": "PROJECT DETAILS & LOCATION",
    "contact.submit_btn": "Send Message via WhatsApp",

    // Modals
    "modal.photo_download": "Download Photo",
    "modal.video_badge": "AERIAL VIDEO PLAYER",
    "modal.photo_badge": "AERIAL PHOTO VIEWER",

    // Footer
    "footer.copyright": "Copyright &copy; 2026 <strong>AeroScope</strong> All Right Reserved Powered By <a href=\"https://www.instagram.com/bobienmartien/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 transition-colors\">Bobien Martien</a>",
    "footer.top": "Back to Top ↑"
  }
};

const LANG_STORAGE_KEY = "aeroscope_preferred_lang";

function getCurrentLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && (saved === "id" || saved === "en")) {
    return saved;
  }
  return "id"; // Default Indonesian
}

function setLanguage(lang) {
  if (lang !== "id" && lang !== "en") lang = "id";
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.lang = lang;

  const dict = translations[lang];
  if (!dict) return;

  // 1. Translate elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // 2. Translate placeholders with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // 3. Update switcher buttons UI
  updateLangToggleUI(lang);

  // 4. Re-render gallery if loaded
  if (typeof window.renderGallery === "function") {
    window.renderGallery();
  }
}

function toggleLanguage() {
  const current = getCurrentLanguage();
  const next = current === "id" ? "en" : "id";
  setLanguage(next);
}

function updateLangToggleUI(activeLang) {
  const idBtn = document.getElementById("lang-btn-id");
  const enBtn = document.getElementById("lang-btn-en");
  const mobileIdBtn = document.getElementById("mobile-lang-btn-id");
  const mobileEnBtn = document.getElementById("mobile-lang-btn-en");

  const activeClasses = ["bg-cyan-500", "text-slate-950", "font-bold"];
  const inactiveClasses = ["text-slate-400", "hover:text-white"];

  [ { id: idBtn, lang: "id" }, { id: enBtn, lang: "en" }, { id: mobileIdBtn, lang: "id" }, { id: mobileEnBtn, lang: "en" } ].forEach(item => {
    if (!item.id) return;
    if (item.lang === activeLang) {
      item.id.classList.add(...activeClasses);
      item.id.classList.remove(...inactiveClasses);
    } else {
      item.id.classList.remove(...activeClasses);
      item.id.classList.add(...inactiveClasses);
    }
  });
}

// Auto init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const lang = getCurrentLanguage();
  setLanguage(lang);
});

// Expose globally
window.AeroI18n = {
  getCurrentLanguage,
  setLanguage,
  toggleLanguage,
  translations
};
