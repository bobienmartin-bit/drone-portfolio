// ========================================================
// AEROSCOPE: MULTI-LANGUAGE ENGINE (INDONESIAN & ENGLISH)
// ========================================================

const translations = {
  id: {
    // HUD Bar
    "hud.gps": "GPS LOCK • 18 SATELIT",
    "hud.resolution": "MAKS 4K/60FPS UHD",
    "hud.color": "WARNA: 10-BIT D-LOG M",
    "hud.status": "STATUS: READY TO FLY • JABODETABEK & NASIONAL",
    "hud.vercel": "STATUS: READY TO FLY • JABODETABEK & NASIONAL",

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
    "hero.title": "Visual Udara Sinematik dari Perspektif Terbaik.",
    "hero.subtitle": "Jasa aerial cinematography dan fotografi drone beresolusi tinggi hingga 5.1K. Didukung pilot bersertifikat resmi dan armada lengkap untuk produksi komersial, properti, hingga dokumentasi acara.",
    "hero.btn_showreel": "Tonton Showreel 4K",
    "hero.btn_gallery": "Jelajahi Galeri",
    "hero.cred_license": "Pilot Tersertifikasi SIDOPI GO & DKPPU",
    "hero.cred_hours": "450+ Jam Terbang Operasional",
    "hero.cred_nationwide": "Siap Penugasan Seluruh Indonesia",

    // Showreel
    "reel.badge": "EVENT AERIAL HIGHLIGHT",
    "reel.title": "Wonderful 12th: Karawang Central Plaza",
    "reel.subtitle": "Dokumentasi udara kemeriahan puncak perayaan ulang tahun ke-12 Karawang Central Plaza (KCP) di kawasan Galuh Mas, menampilkan antusiasme pengunjung dan kemegahan acara dari ketinggian.",
    "reel.sound_muted": "Aktifkan Audio",
    "reel.sound_unmuted": "Audio Aktif",
    "reel.quick1_title": "Wonderful 12th",
    "reel.quick1_sub": "Karawang Central Plaza",
    "reel.quick2_title": "Campus Skies",
    "reel.quick2_sub": "PKN STAN Aerials",
    "reel.quick3_title": "New Cluster Groove",
    "reel.quick3_sub": "1st Place Winner • Fortune",

    // Gallery
    "gallery.badge": "PORTOFOLIO",
    "gallery.title": "Koleksi Foto & Video Udara",
    "gallery.subtitle": "Koleksi dokumentasi udara terpilih untuk produksi komersial, lanskap alam, arsitektur, dan sinematografi FPV.",
    "gallery.filter_all": "Semua Karya",
    "gallery.filter_photo": "Foto Udara",
    "gallery.filter_video": "Video Sinematik",
    "gallery.filter_landscape": "Alam & Lanskap",
    "gallery.filter_urban": "Perkotaan & Arsitektur",
    "gallery.empty_title": "Belum ada karya pada kategori ini",
    "gallery.empty_desc": "Karya untuk kategori ini sedang dalam proses kurasi.",
    "gallery.btn_watch": "Tonton",
    "gallery.btn_view": "Lihat",

    // Gear & Services
    "gear.badge": "Armada & Peralatan",
    "gear.title": "Pilih Armada Drone Sesuai Proyek Anda",
    "gear.subtitle": "Setiap kebutuhan produksi memiliki karakter visual berbeda. Pilih unit yang paling sesuai dengan konsep syuting Anda, atau konsultasikan untuk rekomendasi terbaik.",
    "gear.d1_tag": "CINEMA CLASS • NEXT-GEN 8K",
    "gear.d1_desc": "Drone sinema generasi terdepan dengan sistem multi-lensa Hasselblad canggih, sensor rintangan 360° omnidirectional, dan transmisi sinyal O4 Pro jarak jauh.",
    "gear.d1_ideal": "Ideal untuk: Film Layar Lebar, Produksi Komersial Skala Besar, Dokumentasi Sinematik",
    "gear.d1_btn": "Booking dengan Mavic 4 Pro →",
    "gear.d2_tag": "COMMERCIAL CINEMA • TRIPLE CAM",
    "gear.d2_desc": "Sistem 3 Kamera optik independen dengan sensor utama Hasselblad 4/3 CMOS untuk hasil sinematik kaliber layar lebar.",
    "gear.d2_ideal": "Ideal untuk: Iklan Komersial, Video Profil Perusahaan, Fotografi Lanskap Presisi",
    "gear.d2_btn": "Booking dengan Mavic 3 Pro →",
    "gear.d6_tag": "ALL-ROUNDER • NIGHTSCAPE LIDAR",
    "gear.d6_desc": "Drone kamera ganda canggih dengan sensor utama 1-inci CMOS 50MP dan kamera medium tele 70mm, dilengkapi sensor LiDAR malam hari untuk keamanan terbang maksimal.",
    "gear.d6_ideal": "Ideal untuk: Fotografi Lanskap Malam Hari, Dokumentasi Travel & Wisata, Komersial Kreatif",
    "gear.d6_btn": "Booking dengan Air 3S →",
    "gear.d3_tag": "IMMERSIVE FPV CINEMA",
    "gear.d3_desc": "Drone FPV lincah dengan sensor 1/1.3\" CMOS, sudut pandang 155° Ultra-Wide, pelindung baling-baling terintegrasi, dan manuver One-Push ACRO akrobatik.",
    "gear.d3_ideal": "Ideal untuk: Diving Tebing, Aksi Otomotif / Drift, Fly-through Indoor & Olahraga Ekstrem",
    "gear.d3_btn": "Booking dengan Avata 2 →",
    "gear.d4_tag": "SOCIAL REELS • SUB-249G VERTICAL",
    "gear.d4_desc": "Drone lincah sub-249 gram dengan fitur True Vertical Shooting untuk konten media sosial format portrait TikTok & Reels.",
    "gear.d4_ideal": "Ideal untuk: Wisata, Real Estate, Konten Instagram Reels & TikTok",
    "gear.d4_btn": "Booking dengan Mini 4 Pro →",
    "gear.d5_tag": "INDOOR & VLOG • AI PALM TAKEOFF",
    "gear.d5_desc": "Drone ultra-ringan 135g dengan lepas landas langsung dari telapak tangan, pelacakan AI subjek otomatis cerdas, dan stabilisasi RockSteady untuk sudut pandang unik yang dekat.",
    "gear.d5_ideal": "Ideal untuk: Vlog Personal, Acara Intimate, Syuting Dalam Ruangan (Indoor Fly)",
    "gear.d5_btn": "Booking dengan Neo 2 →",
    
    // Services
    "service.s1_title": "Aerial Cinematography",
    "service.s1_desc": "Perekaman video udara resolusi 4K/5K untuk film komersial, pariwisata, dan produksi kreatif.",
    "service.s1_d1": "File Mentah (D-Log M) + Color Graded 4K",
    "service.s1_d2": "Waktu Terbang 2–4 Baterai Operasional",
    "service.s1_d3": "Izin Terbang Resmi & Prosedur Aman",
    "service.s2_title": "Real Estate & Arsitektur",
    "service.s2_desc": "Pengambilan foto & video properti dari sudut pandang luas memperlihatkan lanskap lingkungan sekitar.",
    "service.s2_d1": "Foto Udara 48MP RAW High-Resolution",
    "service.s2_d2": "Video Showcase 4K + Format Vertikal Reels",
    "service.s2_d3": "Highlight Fasilitas & Aksesibilitas Kawasan",
    "service.s3_title": "Dokumentasi Acara",
    "service.s3_desc": "Liputan udara untuk festival, konser outdoor, acara olahraga, resepsi pernikahan, dan gathering.",
    "service.s3_d1": "Dokumentasi Sudut Pandang Crowd Dinamis",
    "service.s3_d2": "Highlight Video 60s Siap Publikasi",
    "service.s3_d3": "Penerbangan Aman di Atas Area Publik",
    "service.s4_title": "Company Profile",
    "service.s4_desc": "Produksi video profil perusahaan, fasilitas industri, dan kantor korporat dengan visual udara sinematik berstandar profesional.",
    "service.s4_d1": "Master Video 4K Siap Presentasi & Web",
    "service.s4_d2": "Seluruh File Rekaman Mentah (Unedited)",
    "service.s4_d3": "Sertifikasi Remote Pilot Berlisensi Resmi",

    // About Me
    "about.badge": "PROFIL OPERASIONAL",
    "about.pilot_badge": "CERTIFIED REMOTE PILOT",
    "about.pilot_role": "Aerial Cinematographer & Remote Pilot",
    "about.reg_title": "REGISTRASI RESMI",
    "about.reg_desc": "Kementerian Perhubungan RI",
    "about.title": "Perspektif Udara Presisi untuk Standar Produksi Layar Lebar & Komersial.",
    "about.p1": "Saya adalah seorang <strong class=\"text-white\">Remote Pilot Bersertifikasi Resmi Kementerian Perhubungan (DKPPU & SIDOPI GO)</strong> yang berdedikasi pada sinematografi udara dan pengambilan visual udara presisi tinggi.",
    "about.p2": "Dengan pengalaman lebih dari <strong class=\"text-white\">450 jam terbang operasional</strong> di berbagai wilayah Indonesia, saya terbiasa menghadapi tantangan medan nyata—mulai dari dinamika angin pesisir, lanskap alam terbuka, hingga penerbangan presisi di kawasan urban padat.",
    "about.p3": "Fokus utama di lapangan diarahkan pada <strong class=\"text-white\">pergerakan kamera yang halus dan terukur, akurasi profil warna 10-Bit D-Log M untuk kemudahan color grading, serta standar ketat keselamatan terbang</strong>.",
    "about.p4": "Setiap penerbangan didukung prosedur standar keselamatan pra-terbang, manajemen baterai terukur, dan kepatuhan izin wilayah udara untuk memastikan kelancaran produksi tim kreatif Anda.",

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
    "contact.drone_label": "PILIH ARMADA DRONE SESUAI PROYEK ANDA",
    "contact.drone_badge": "Rekomendasi Pilot",
    "contact.drone_opt_default": "-- Konsultasikan Rekomendasi Armada Pilot --",
    "contact.drone_opt_mavic4": "DJI Mavic 4 Pro (Cinema Class • 8K/4K HDR)",
    "contact.drone_opt_mavic3": "DJI Mavic 3 Pro (Commercial Cinema • Triple Cam)",
    "contact.drone_opt_air3s": "DJI Air 3S (All-Rounder • Nightscape LiDAR)",
    "contact.drone_opt_avata2": "DJI Avata 2 (Immersive FPV Cinema)",
    "contact.drone_opt_mini4": "DJI Mini 4 Pro (Social Reels • Sub-249g Vertical)",
    "contact.drone_opt_neo2": "DJI Neo 2 (Indoor & Vlog • AI Palm Takeoff)",
    "contact.msg_label": "DETAIL PROYEK & LOKASI",
    "contact.submit_btn": "Kirim Pesan ke WhatsApp",

    // Modals
    "modal.photo_download": "Unduh Foto",
    "modal.video_badge": "AERIAL VIDEO PLAYER",
    "modal.photo_badge": "AERIAL PHOTO VIEWER",

    // Footer
    "footer.copyright": "Copyright &copy; 2026 <strong>AeroScope</strong> All Rights Reserved Powered By <a href=\"https://www.instagram.com/bobienmartien/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white hover:underline underline-offset-2 transition-colors\">Bobien Martien</a>",
    "footer.top": "Kembali ke Atas ↑"
  },

  en: {
    // HUD Bar
    "hud.gps": "GPS LOCK • 18 SATELLITES",
    "hud.resolution": "MAX 4K/60FPS UHD",
    "hud.color": "COLOR: 10-BIT D-LOG M",
    "hud.status": "STATUS: READY TO FLY • JABODETABEK & NATIONWIDE",
    "hud.vercel": "STATUS: READY TO FLY • JABODETABEK & NATIONWIDE",

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
    "hero.title": "Cinematic Aerial Visuals from the Best Perspective.",
    "hero.subtitle": "High-resolution aerial cinematography and drone photography up to 5.1K. Backed by certified drone pilots and an advanced fleet for commercial productions, real estate, and event coverage.",
    "hero.btn_showreel": "Watch 4K Showreel",
    "hero.btn_gallery": "Explore Portfolio",
    "hero.cred_license": "Certified Pilot SIDOPI GO & DKPPU",
    "hero.cred_hours": "450+ Operational Flight Hours",
    "hero.cred_nationwide": "Nationwide Mission Ready",

    // Showreel
    "reel.badge": "EVENT AERIAL HIGHLIGHT",
    "reel.title": "Wonderful 12th: Karawang Central Plaza",
    "reel.subtitle": "Aerial event highlight documenting the grand 12th Anniversary celebration of Karawang Central Plaza (KCP) Galuh Mas, capturing crowd energy and stage grandeur from the sky.",
    "reel.sound_muted": "Enable Audio",
    "reel.sound_unmuted": "Audio On",
    "reel.quick1_title": "Wonderful 12th",
    "reel.quick1_sub": "Karawang Central Plaza",
    "reel.quick2_title": "Campus Skies",
    "reel.quick2_sub": "PKN STAN Aerials",
    "reel.quick3_title": "New Cluster Groove",
    "reel.quick3_sub": "1st Place Winner • Fortune",

    // Gallery
    "gallery.badge": "PORTFOLIO",
    "gallery.title": "Aerial Photo & Video Showcase",
    "gallery.subtitle": "Selected aerial documentation collection for commercial production, natural landscapes, architecture, and FPV cinematography.",
    "gallery.filter_all": "All Media",
    "gallery.filter_photo": "Aerial Photos",
    "gallery.filter_video": "Cinematic Videos",
    "gallery.filter_landscape": "Nature & Landscape",
    "gallery.filter_urban": "Urban & Architecture",
    "gallery.empty_title": "No media found in this category",
    "gallery.empty_desc": "Works for this category are currently being curated.",
    "gallery.btn_watch": "Watch",
    "gallery.btn_view": "View",

    // Gear & Services
    "gear.badge": "Fleet & Equipment",
    "gear.title": "Choose the Right Drone Fleet for Your Project",
    "gear.subtitle": "Every production need carries a unique visual signature. Select the ideal drone unit for your shoot concept, or consult with us for the best recommendation.",
    "gear.d1_tag": "CINEMA CLASS • NEXT-GEN 8K",
    "gear.d1_desc": "Next-generation cinema flagship drone with advanced Hasselblad multi-lens system, 360° omnidirectional obstacle sensing, and long-range O4 Pro transmission.",
    "gear.d1_ideal": "Ideal for: Feature Films, High-End Commercials, Cinematic Aerial Storytelling",
    "gear.d1_btn": "Book with Mavic 4 Pro →",
    "gear.d2_tag": "COMMERCIAL CINEMA • TRIPLE CAM",
    "gear.d2_desc": "Independent 3-camera optical system with Hasselblad 4/3 CMOS primary sensor delivering large-screen cinematic calibre.",
    "gear.d2_ideal": "Ideal for: Commercial Ads, Corporate Profiles, High-Resolution Landscapes",
    "gear.d2_btn": "Book with Mavic 3 Pro →",
    "gear.d6_tag": "ALL-ROUNDER • NIGHTSCAPE LIDAR",
    "gear.d6_desc": "Advanced dual-camera drone featuring a 1-inch CMOS 50MP primary sensor and 70mm medium telephoto lens, equipped with forward LiDAR nightscape sensing.",
    "gear.d6_ideal": "Ideal for: Nightscape Photography, Travel & Tourism Content, Creative Commercials",
    "gear.d6_btn": "Book with Air 3S →",
    "gear.d3_tag": "IMMERSIVE FPV CINEMA",
    "gear.d3_desc": "Agile cinematic FPV drone featuring 1/1.3\" CMOS sensor, 155° ultra-wide FOV, integrated propeller guards, and intuitive One-Push ACRO maneuvers.",
    "gear.d3_ideal": "Ideal for: Cliff Dives, Automotive & Drift, Indoor Fly-throughs, Action Sports",
    "gear.d3_btn": "Book with Avata 2 →",
    "gear.d4_tag": "SOCIAL REELS • SUB-249G VERTICAL",
    "gear.d4_desc": "Ultra-lightweight sub-249g drone with True Vertical Shooting optimized for portrait social media content on TikTok & Instagram Reels.",
    "gear.d4_ideal": "Ideal for: Tourism, Real Estate, Instagram Reels & TikTok",
    "gear.d4_btn": "Book with Mini 4 Pro →",
    "gear.d5_tag": "INDOOR & VLOG • AI PALM TAKEOFF",
    "gear.d5_desc": "Ultra-compact 135g palm-takeoff drone featuring smart AI subject tracking, RockSteady stabilization, and dynamic close-proximity shots.",
    "gear.d5_ideal": "Ideal for: Personal Vlogs, Intimate Events, Safe Indoor Fly-throughs",
    "gear.d5_btn": "Book with Neo 2 →",

    // Services
    "service.s1_title": "Aerial Cinematography",
    "service.s1_desc": "4K/5K aerial video production for commercial film, tourism promotions, and brand storytelling.",
    "service.s1_d1": "Raw Footage (D-Log M) + Color Graded 4K",
    "service.s1_d2": "Flight Duration 2–4 Flight Batteries",
    "service.s1_d3": "Official Flight Permits & Safety Compliance",
    "service.s2_title": "Real Estate & Architecture",
    "service.s2_desc": "Wide-angle aerial photography and cinematic fly-throughs showcasing architectural lines and surroundings.",
    "service.s2_d1": "48MP RAW High-Resolution Aerial Photos",
    "service.s2_d2": "4K Showcase Video + Vertical Reels Format",
    "service.s2_d3": "Facility Highlights & Environmental Views",
    "service.s3_title": "Event Documentation",
    "service.s3_desc": "Aerial coverage for festivals, outdoor concerts, sports events, weddings, and grand gatherings.",
    "service.s3_d1": "Dynamic Crowd Aerial Angles & Flow",
    "service.s3_d2": "60-Second Social Ready Highlight Reel",
    "service.s3_d3": "Multi-Battery Standby & Safe Protocols",
    "service.s4_title": "Company Profile",
    "service.s4_desc": "Cinematic aerial video and photo production for corporate facilities, industrial plants, and company showcase.",
    "service.s4_d1": "4K Master Video Ready for Web & Presentation",
    "service.s4_d2": "Complete Unedited Raw Footage Package",
    "service.s4_d3": "Certified Remote Pilot & Full Compliance",

    // About Me
    "about.badge": "OPERATIONAL PROFILE",
    "about.pilot_badge": "CERTIFIED REMOTE PILOT",
    "about.pilot_role": "Aerial Cinematographer & Remote Pilot",
    "about.reg_title": "OFFICIAL CERTIFICATION",
    "about.reg_desc": "Ministry of Transportation RI",
    "about.title": "Precision Aerial Perspectives for Feature Film & Commercial Production Standards.",
    "about.p1": "I am a <strong class=\"text-white\">Certified Remote Pilot (Ministry of Transportation DGCA & SIDOPI GO)</strong> dedicated to high-precision aerial cinematography and professional visual capture.",
    "about.p2": "With over <strong class=\"text-white\">450 operational flight hours</strong> across diverse Indonesian terrains, I am experienced in real-world flight dynamics—from high coastal winds to extreme natural landscapes and precision flight in dense urban zones.",
    "about.p3": "Field focus is centered on <strong class=\"text-white\">smooth, cinematic gimbal motion, precise 10-Bit D-Log M color profiles for color grading flexibility, and rigorous airspace safety compliance</strong>.",
    "about.p4": "Every flight is backed by structured pre-flight safety checklists, calibrated battery management, and operational readiness to ensure smooth execution for your production crew.",

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
    "contact.drone_label": "CHOOSE DRONE FLEET FOR YOUR PROJECT",
    "contact.drone_badge": "Pilot Recommendation",
    "contact.drone_opt_default": "-- Consult for Pilot Recommendation --",
    "contact.drone_opt_mavic4": "DJI Mavic 4 Pro (Cinema Class • 8K/4K HDR)",
    "contact.drone_opt_mavic3": "DJI Mavic 3 Pro (Commercial Cinema • Triple Cam)",
    "contact.drone_opt_air3s": "DJI Air 3S (All-Rounder • Nightscape LiDAR)",
    "contact.drone_opt_avata2": "DJI Avata 2 (Immersive FPV Cinema)",
    "contact.drone_opt_mini4": "DJI Mini 4 Pro (Social Reels • Sub-249g Vertical)",
    "contact.drone_opt_neo2": "DJI Neo 2 (Indoor & Vlog • AI Palm Takeoff)",
    "contact.msg_label": "PROJECT DETAILS & LOCATION",
    "contact.submit_btn": "Send Message via WhatsApp",

    // Modals
    "modal.photo_download": "Download Photo",
    "modal.video_badge": "AERIAL VIDEO PLAYER",
    "modal.photo_badge": "AERIAL PHOTO VIEWER",

    // Footer
    "footer.copyright": "Copyright &copy; 2026 <strong>AeroScope</strong> All Rights Reserved Powered By <a href=\"https://www.instagram.com/bobienmartien/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-white hover:underline underline-offset-2 transition-colors\">Bobien Martien</a>",
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

  const activeClasses = ["bg-white", "text-neutral-950", "font-bold"];
  const inactiveClasses = ["text-neutral-400", "hover:text-white"];

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

  if (typeof window.updateFleetLabel === "function") {
    window.updateFleetLabel();
  }

  if (typeof window.applyFeaturedVideo === "function" && typeof window.currentFeaturedVideoIndex !== "undefined") {
    window.applyFeaturedVideo(window.currentFeaturedVideoIndex);
  }
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
