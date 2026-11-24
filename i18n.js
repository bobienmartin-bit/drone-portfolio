// ========================================================
// AEROSCOPE: MULTI-LANGUAGE ENGINE (INDONESIAN & ENGLISH)
// ========================================================

const translations = {
  id: {
    // HUD Bar
    "hud.gps": "GPS LOCK • 18 SATELIT",
    "hud.resolution": "MAKS 5.1K / 8K CINEMA",
    "hud.color": "WARNA: 10-BIT D-LOG M",
    "hud.status": "STATUS: READY TO FLY • JABODETABEK & NASIONAL",
    "hud.vercel": "STATUS: READY TO FLY • JABODETABEK & NASIONAL",

    // Nav
    "nav.home": "Beranda",
    "nav.reel": "Video Reel",
    "nav.gallery": "Galeri Karya",
    "nav.packages": "Paket Jasa",
    "nav.gear": "Armada Drone",
    "nav.workflow": "Alur Kerja",
    "nav.about": "Profil Pilot",
    "nav.testimonials": "Testimoni",
    "nav.contact": "Kontak",
    "nav.booking": "Booking Pilot",

    // Hero
    "hero.badge": "CERTIFIED REMOTE PILOT • DKPPU & SIDOPI GO",
    "hero.pilot_label": "AEROSCOPE • BY BOBIEN MARTIEN",
    "hero.title": "Visual Udara Sinematik dari Perspektif Terbaik.",
    "hero.subtitle": "Jasa aerial cinematography dan fotografi drone presisi komersial hingga 5.1K oleh Bobien Martien—Remote Pilot berlisensi resmi Kementerian Perhubungan RI (DKPPU & SIDOPI GO) dengan lebih dari 450 jam terbang operasional.",
    "hero.btn_showreel": "Tonton Showreel 4K",
    "hero.btn_gallery": "Jelajahi Galeri",
    "hero.btn_quote": "Minta Penawaran Proyek",
    "hero.cred_license": "Pilot Tersertifikasi SIDOPI GO & DKPPU",
    "hero.cred_hours": "450+ Jam Terbang Operasional",
    "hero.cred_safety": "100% Zero-Incident Safety Record",
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

    // Commercial Packages
    "pkg.badge": "PAKET JASA KOMERSIAL",
    "pkg.title": "Solusi Jasa Sinematografi & Visual Udara",
    "pkg.subtitle": "Dirancang untuk agensi, rumah produksi film, pengembang properti, dan korporat. Seluruh penerbangan dijalankan langsung oleh Pilot Bersertifikasi resmi dengan kepatuhan keselamatan absolut.",
    "pkg.btn_quote": "Minta Penawaran Harga &rarr;",
    "pkg.p1_title": "Aerial Photography Package",
    "pkg.p1_desc": "Paket foto udara resolusi tinggi 48MP RAW untuk materi promosi arsitektur, lanskap alam, katalog billboard, dan aset digital berdefinisi tinggi.",
    "pkg.p1_f1": "Foto Udara 48MP RAW High-Resolution",
    "pkg.p1_f2": "Cakupan Sudut Lebar & Lanskap Panorama",
    "pkg.p1_f3": "Siap Retouching & Color Grading Komersial",
    "pkg.p2_title": "Aerial Cinematography Package",
    "pkg.p2_desc": "Produksi film komersial dan iklan bioskop dengan multi-lensa Hasselblad, resolusi 5.1K/4K UHD, dan profil warna 10-Bit D-Log M.",
    "pkg.p2_f1": "Master Video 5.1K / 4K UHD 60/120fps",
    "pkg.p2_f2": "Profil Warna 10-Bit D-Log M High Dynamic Range",
    "pkg.p2_f3": "Sortie Multi-Baterai & Gerakan Gimbal Sinematik",
    "pkg.p3_title": "FPV Cinematic Package",
    "pkg.p3_desc": "Perekaman visual dinamis berkecepatan tinggi, diving tebing/gedung, aksi otomotif, dan fly-through indoor dengan pelindung baling-baling.",
    "pkg.p3_f1": "Manuver Akrobatik One-Push ACRO Lincah",
    "pkg.p3_f2": "Sudut Pandang 155° Ultra-Wide & RockSteady 3.0+",
    "pkg.p3_f3": "Penerbangan Ruang Sempit & Indoor Terkontrol",
    "pkg.p4_title": "Real Estate & Property Showcase",
    "pkg.p4_desc": "Dokumentasi visual komprehensif kawasan residensial, apartemen mewah, klaster komersial, dan masterplan dengan format horizontal & vertikal Reels.",
    "pkg.p4_f1": "Highlight Fasilitas & Aksesibilitas Konektivitas",
    "pkg.p4_f2": "Master 4K + Format Vertikal 9:16 Instagram Reels",
    "pkg.p4_f3": "Pencahayaan Golden Hour / Senja Dramatis",
    "pkg.p5_title": "Corporate & Industrial Documentation",
    "pkg.p5_desc": "Liputan fasilitas pabrik, progres konstruksi infrastruktur, audit visual aset, dan profil perusahaan bersertifikasi keselamatan resmi.",
    "pkg.p5_f1": "Kepatuhan Protokol K3 & APD Industri",
    "pkg.p5_f2": "Dokumentasi Berkala Progres Proyek Konstruksi",
    "pkg.p5_f3": "Legalitas Pilot SIDOPI GO & Otorisasi DKPPU",
    "pkg.p6_title": "Event & Festival Coverage",
    "pkg.p6_desc": "Liputan udara festival musik, konser outdoor, turnamen olahraga, dan gathering berskala ribuan pengunjung dengan mitigasi risiko ketat.",
    "pkg.p6_f1": "Sudut Pandang Kerumunan Dinamis & Kemegahan Panggung",
    "pkg.p6_f2": "Video Highlight 60 Detik Siap Publikasi Media Sosial",
    "pkg.p6_f3": "Otorisasi Wilayah Udara & Standby Tim Safety",

    // Gear & Services (Spesifikasi Terkoreksi)
    "gear.badge": "Armada & Peralatan",
    "gear.title": "Pilih Armada Drone Sesuai Karakter Visual Proyek Anda",
    "gear.subtitle": "Setiap kebutuhan produksi memiliki karakter visual berbeda. Seluruh unit kami terawat sesuai standar kelaikan udara dengan kalibrasi sensor berkala.",
    "gear.d1_tag": "NEXT-GEN FLAGSHIP",
    "gear.d1_desc": "Drone sinema generasi terdepan dengan sistem multi-lensa Hasselblad canggih, sensor rintangan 360° omnidirectional, dan transmisi sinyal O4 Pro jarak jauh.",
    "gear.d1_s1": "8K/60fps & 4K/120fps HDR Hasselblad",
    "gear.d1_s2": "Profil Warna 10-Bit D-Log M & D-Log Cinema",
    "gear.d1_s3": "Ideal: Film Layar Lebar & Iklan Skala Besar",
    "gear.d1_ideal": "Ideal untuk: Film Layar Lebar, Produksi Komersial Skala Besar, Dokumentasi Sinematik",
    "gear.d1_btn": "Booking dengan Mavic 4 Pro →",
    "gear.d2_tag": "TRIPLE CAMERA CINEMA",
    "gear.d2_desc": "Sistem 3 Kamera optik independen dengan sensor utama Hasselblad 4/3 CMOS merekam video 5.1K/50fps & 4K/120fps dengan profil warna 10-Bit D-Log M & HLG.",
    "gear.d2_s1": "Triple Cam: 24mm + 70mm + 166mm Tele",
    "gear.d2_s2": "Video 5.1K/50fps & 10-Bit D-Log M",
    "gear.d2_s3": "Ideal: Video Profil Perusahaan & Properti",
    "gear.d2_ideal": "Ideal untuk: Iklan Komersial, Video Profil Perusahaan, Fotografi Lanskap Presisi",
    "gear.d2_btn": "Booking dengan Mavic 3 Pro →",
    "gear.d6_tag": "DUAL CAMERA & NIGHTSCAPE",
    "gear.d6_desc": "Drone kamera ganda canggih dengan sensor utama 1-inci CMOS 50MP (24mm) dan 70mm medium telephoto, dilengkapi sensor LiDAR malam hari untuk presisi tinggi.",
    "gear.d6_s1": "Sensor 1\" CMOS 50MP + 70mm Medium Tele",
    "gear.d6_s2": "LiDAR Malam Hari & Sensor Omnidirectional",
    "gear.d6_s3": "Ideal: Lanskap Malam, Pariwisata & Dokumentasi",
    "gear.d6_ideal": "Ideal untuk: Fotografi Lanskap Malam Hari, Dokumentasi Travel & Wisata, Komersial Kreatif",
    "gear.d6_btn": "Booking dengan Air 3S →",
    "gear.d3_tag": "IMMERSIVE FPV CINEMA",
    "gear.d3_desc": "Drone FPV berpelindung dengan sudut pandang 155° Ultra-Wide dan manuver dinamis untuk aksi visual intens serta penerbangan indoor bersyarat.",
    "gear.d3_s1": "Video 4K/60fps HDR, 155° FOV & RockSteady 3.0+",
    "gear.d3_s2": "Pelindung Baling-Baling Terintegrasi (Indoor Bersyarat)",
    "gear.d3_s3": "Ideal: Fly-Through Gedung, Otomotif & Olahraga",
    "gear.d3_ideal": "Ideal untuk: Diving Tebing, Aksi Otomotif / Drift, Fly-through Indoor & Olahraga Ekstrem",
    "gear.d3_btn": "Booking dengan Avata 2 →",
    "gear.d4_tag": "AGILE & SUB-249G",
    "gear.d4_desc": "Drone lincah sub-249 gram dengan fitur True Vertical Shooting untuk format vertikal TikTok & Reels, dioperasikan sesuai regulasi ruang udara DKPPU.",
    "gear.d4_s1": "True Vertical Gimbal Rotation 4K/60fps HDR",
    "gear.d4_s2": "Operasional Sesuai Regulasi Ruang Udara DKPPU",
    "gear.d4_s3": "Ideal: Real Estate, Instagram Reels & Wisata",
    "gear.d4_ideal": "Ideal untuk: Wisata, Real Estate, Konten Instagram Reels & TikTok",
    "gear.d4_btn": "Booking dengan Mini 4 Pro →",
    "gear.d5_tag": "PALM TAKEOFF & AI TRACKING",
    "gear.d5_desc": "Drone ultra-ringan 135g dengan lepas landas langsung dari telapak tangan, pelacakan AI subjek otomatis cerdas, dan stabilisasi RockSteady untuk sudut pandang unik yang dekat.",
    "gear.d5_s1": "Bobot 135g Ultra-Ringan • Palm Takeoff & Landing",
    "gear.d5_s2": "Pelacakan AI Cerdas dengan Baling-Baling Tertutup",
    "gear.d5_s3": "Ideal: Syuting Ruang Sempit, Event Intim & BTS",
    "gear.d5_ideal": "Ideal untuk: Vlog Personal, Acara Intimate, Syuting Dalam Ruangan (Indoor Fly)",
    "gear.d5_btn": "Booking dengan Neo 2 →",

    // Operational Workflow (5 Tahap)
    "flow.badge": "PROSEDUR OPERASIONAL",
    "flow.title": "Alur Kerja Penerbangan Presisi & Berizin Resmi",
    "flow.subtitle": "Setiap misi penerbangan dijalankan melalui 5 tahap terstruktur demi kualitas visual sinematik terbaik dan kepatuhan keselamatan absolut.",
    "flow.s1_num": "01",
    "flow.s1_title": "Konsultasi & Visi Proyek",
    "flow.s1_desc": "Mendiskusikan konsep visual, target output, durasi, referensi tone, dan jadwal syuting bersama tim kreatif Anda.",
    "flow.s2_num": "02",
    "flow.s2_title": "Survei Wilayah Udara (SIDOPI GO)",
    "flow.s2_desc": "Pengecekan koordinat lokasi terhadap zona KKOP bandara, batas ketinggian maksimal 120m AGL, dan penilaian risiko medan.",
    "flow.s3_num": "03",
    "flow.s3_title": "Otorisasi Izin & Mitigasi Risiko",
    "flow.s3_desc": "Pengurusan izin resmi otoritas wilayah udara bila diperlukan, checklist pra-terbang, dan penetapan emergency fail-safe.",
    "flow.s4_num": "04",
    "flow.s4_title": "Eksekusi Penerbangan Presisi",
    "flow.s4_desc": "Penerbangan terarah oleh Pilot Bersertifikat dengan kontrol pergerakan kamera halus, live video monitor, dan sortie baterai terencana.",
    "flow.s5_num": "05",
    "flow.s5_title": "Color Grading & Penyerahan Master",
    "flow.s5_desc": "Pemeriksaan integritas file rekaman mentah (D-Log M), grading warna profesional, ekspor resolusi 5.1K/4K, dan penyerahan via cloud.",

    // Services (Legacy Grid with safety fix)
    "service.deliverables_header": "OUTPUT & HASIL AKHIR:",
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
    "service.s3_d3": "Safety-First: Otorisasi Ruang Udara & Penilaian Risiko Lokasi",
    "service.s4_title": "Company Profile",
    "service.s4_desc": "Produksi video profil perusahaan, fasilitas industri, dan kantor korporat dengan visual udara sinematik berstandar profesional.",
    "service.s4_d1": "Master Video 4K Siap Presentasi & Web",
    "service.s4_d2": "Seluruh File Rekaman Mentah (Unedited)",
    "service.s4_d3": "Sertifikasi Remote Pilot Berlisensi Resmi",

    // About Me & Pilot Profile (Enlarged & Verified)
    "about.badge": "PROFIL OPERASIONAL & SERTIFIKASI",
    "about.pilot_badge": "CERTIFIED REMOTE PILOT",
    "about.pilot_name": "Bobien Martien",
    "about.pilot_role": "Chief Remote Pilot & Aerial Cinematographer",
    "about.reg_title": "REGISTRASI RESMI",
    "about.reg_desc": "Kementerian Perhubungan RI",
    "about.title": "Perspektif Udara Presisi untuk Standar Produksi Layar Lebar & Komersial.",
    "about.p1": "Saya adalah seorang <strong class=\"text-white\">Remote Pilot Bersertifikasi Resmi Kementerian Perhubungan (DKPPU & SIDOPI GO)</strong> yang berdedikasi pada sinematografi udara dan pengambilan visual udara presisi tinggi.",
    "about.p2": "Dengan pengalaman lebih dari <strong class=\"text-white\">450 jam terbang operasional</strong> di berbagai wilayah Indonesia, saya terbiasa menghadapi tantangan medan nyata—mulai dari dinamika angin pesisir, lanskap alam terbuka, hingga penerbangan presisi di kawasan urban padat.",
    "about.p3": "Fokus utama di lapangan diarahkan pada <strong class=\"text-white\">pergerakan kamera yang halus dan terukur, akurasi profil warna 10-Bit D-Log M untuk kemudahan color grading, serta standar ketat keselamatan terbang</strong>.",
    "about.p4": "Setiap penerbangan didukung prosedur standar keselamatan pra-terbang, manajemen baterai terukur, dan kepatuhan izin wilayah udara untuk memastikan kelancaran produksi tim kreatif Anda.",
    "about.cert_card_title": "LEGALITAS & REGISTRASI RESMI TERVERIFIKASI",
    "about.cert_card_sub": "Kementerian Perhubungan Republik Indonesia (DGCA)",
    "about.cert_item1_label": "REGISTRASI SIDOPI GO",
    "about.cert_item1_val": "ID: PILOT-••••-2024",
    "about.cert_item2_label": "SERTIFIKASI PILOT DKPPU",
    "about.cert_item2_val": "CASR PART 107 • #DKPPU-••••-89",
    "about.cert_item3_label": "STANDAR OPERASIONAL",
    "about.cert_item3_val": "450+ Jam Terbang • Zero Incident",
    "about.bts_title": "DOKUMENTASI OPERASIONAL DI LAPANGAN",

    // Testimonials
    "testi.badge": "TESTIMONI KLIEN",
    "testi.title": "Kepercayaan dari Klien & Penyelenggara Event",
    "testi.subtitle": "Pengalaman nyata dari penyelenggara acara besar, pengembang properti, dan tim kreatif yang bekerja sama dengan Bobien Martien.",
    "testi.t1_quote": "\"Bobien mengeksekusi liputan aerial ultah ke-12 KCP Galuh Mas dengan sangat teliti. Pergerakan kameranya halus, perizinan dan SOP keselamatannya sangat rapi, dan video highlight-nya luar biasa memukau penonton.\"",
    "testi.t1_author": "Event Management Team",
    "testi.t1_role": "Wonderful 12th KCP Galuh Mas Organizer",
    "testi.t2_quote": "\"Kualitas rekaman Hasselblad dan pemahaman Bobien mengenai sudut arsitektur sangat membantu visualisasi New Cluster Groove. Hasil videonya berhasil menjadi juara 1 kompetisi aerial.\"",
    "testi.t2_author": "Commercial Marketing Lead",
    "testi.t2_role": "Property Developer & Agency Partner",
    "testi.t3_quote": "\"Pilot drone yang benar-benar paham estetika sinematografi, bukan sekadar terbang. File 10-Bit D-Log M yang diserahkan sangat rapi dan dinamis untuk color grading di studio kami.\"",
    "testi.t3_author": "Creative Director",
    "testi.t3_role": "Visual Motion Studio",
    "testi.t4_quote": "\"Sangat profesional, taat izin keselamatan zona terbang, dan hasil aerial PKN STAN Campus Skies spektakuler dan viral di media sosial kampus.\"",
    "testi.t4_author": "Tim Humas & Dokumentasi Kampus",
    "testi.t4_role": "Campus Skies Aerial Project",

    // Contact
    "contact.badge": "KOLABORASI",
    "contact.title": "Mari Wujudkan Proyek Visual Anda",
    "contact.desc": "Punya rencana syuting film, promosi properti, dokumentasi event, atau kebutuhan visual udara khusus? Hubungi saya untuk diskusi penawaran dan jadwal terbang.",
    "contact.wa_label": "WhatsApp Langsung",
    "contact.wa_sub": "+62 813-8145-3598 (Respon Cepat)",
    "contact.email_label": "Email Resmi",
    "contact.ig_follow": "Ikuti →",
    "contact.form_title": "Kirim Pesan Inquiry",
    "contact.name_label": "NAMA LENGKAP",
    "contact.name_placeholder": "Nama Lengkap Anda",
    "contact.email_label_field": "EMAIL ATAU NO HP",
    "contact.email_placeholder": "email@domain.com atau nomor WhatsApp",
    "contact.service_label": "JENIS KEBUTUHAN LAYANAN",
    "contact.srv_opt_cinema": "Aerial Cinematography (Video 4K / 5K)",
    "contact.srv_opt_photo": "Fotografi Udara Resolusi Tinggi / High-Res Aerial Photo",
    "contact.srv_opt_fpv": "FPV Action & Olahraga Ekstrem",
    "contact.srv_opt_property": "Dokumentasi Properti & Real Estate",
    "contact.srv_opt_event": "Liputan Acara & Konser Outdoor",
    "contact.srv_opt_corp": "Video & Foto Profil Perusahaan (Company Profile)",
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
    "contact.msg_placeholder": "Ceritakan tentang rencana lokasi, tanggal pengambilan gambar, dan harapan visual Anda...",
    "contact.submit_btn": "Kirim Pesan ke WhatsApp",
    "contact.float_wa": "Tanya Pilot Sekarang",

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
    "hud.resolution": "MAX 5.1K / 8K CINEMA",
    "hud.color": "COLOR: 10-BIT D-LOG M",
    "hud.status": "STATUS: READY TO FLY • JABODETABEK & NATIONWIDE",
    "hud.vercel": "STATUS: READY TO FLY • JABODETABEK & NATIONWIDE",

    // Nav
    "nav.home": "Home",
    "nav.reel": "Video Reel",
    "nav.gallery": "Portfolio",
    "nav.packages": "Packages",
    "nav.gear": "Drone Fleet",
    "nav.workflow": "Workflow",
    "nav.about": "Pilot Profile",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.booking": "Book Pilot",

    // Hero
    "hero.badge": "CERTIFIED REMOTE PILOT • DKPPU & SIDOPI GO",
    "hero.pilot_label": "AEROSCOPE • BY BOBIEN MARTIEN",
    "hero.title": "Cinematic Aerial Visuals from the Best Perspective.",
    "hero.subtitle": "High-resolution aerial cinematography and precision drone photography up to 5.1K by Bobien Martien—Official Certified Remote Pilot (DGCA DKPPU & SIDOPI GO) with over 450 operational flight hours across Indonesia.",
    "hero.btn_showreel": "Watch 4K Showreel",
    "hero.btn_gallery": "Explore Portfolio",
    "hero.btn_quote": "Request a Quotation",
    "hero.cred_license": "Certified Pilot SIDOPI GO & DKPPU",
    "hero.cred_hours": "450+ Operational Flight Hours",
    "hero.cred_safety": "100% Zero-Incident Safety Record",
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

    // Commercial Packages
    "pkg.badge": "COMMERCIAL PACKAGES",
    "pkg.title": "Commercial Aerial Cinematography Packages",
    "pkg.subtitle": "Engineered for advertising agencies, film production houses, property developers, and corporate clients. All operations executed directly by Certified Pilots under strict airspace safety compliance.",
    "pkg.btn_quote": "Request a Quotation &rarr;",
    "pkg.p1_title": "Aerial Photography Package",
    "pkg.p1_desc": "High-resolution 48MP RAW aerial photography tailored for architectural showcases, masterplans, billboards, and high-definition marketing campaigns.",
    "pkg.p1_f1": "48MP RAW High-Resolution Photos",
    "pkg.p1_f2": "Wide-Angle & Panoramic Landscape Coverage",
    "pkg.p1_f3": "Professional Retouching & Commercial Color Science",
    "pkg.p2_title": "Aerial Cinematography Package",
    "pkg.p2_desc": "Commercial film and cinema-grade advertising utilizing Hasselblad optical sensors, 5.1K/4K UHD, and 10-Bit D-Log M high dynamic range color profiles.",
    "pkg.p2_f1": "Master Video 5.1K / 4K UHD (60/120fps)",
    "pkg.p2_f2": "10-Bit D-Log M High Dynamic Range Color",
    "pkg.p2_f3": "Multi-Battery Sorties & Cinematic Gimbal Sequences",
    "pkg.p3_title": "FPV Cinematic Package",
    "pkg.p3_desc": "Dynamic high-speed visuals, building and cliff dives, automotive chase sequences, and controlled indoor fly-throughs with enclosed propeller units.",
    "pkg.p3_f1": "One-Push ACRO Dynamic Cinematic Maneuvers",
    "pkg.p3_f2": "155° Ultra-Wide FOV with RockSteady 3.0+",
    "pkg.p3_f3": "Confined Space & Controlled Indoor Operations",
    "pkg.p4_title": "Real Estate & Property Showcase",
    "pkg.p4_desc": "Comprehensive visual documentation for luxury developments, commercial clusters, and masterplans with horizontal 4K & vertical 9:16 social formats.",
    "pkg.p4_f1": "Facility Highlights & Environmental Connectivity",
    "pkg.p4_f2": "Master 4K + Vertical 9:16 Format for Instagram Reels",
    "pkg.p4_f3": "Golden Hour & Sunset Dramatic Lighting Sessions",
    "pkg.p5_title": "Corporate & Industrial Documentation",
    "pkg.p5_desc": "Factory facility coverage, infrastructure progress tracking, asset visual audit, and corporate profile videos under strict industrial safety protocols.",
    "pkg.p5_f1": "Industrial Safety PPE & Risk Protocol Compliance",
    "pkg.p5_f2": "Periodic Infrastructure Progress Tracking",
    "pkg.p5_f3": "Official SIDOPI GO & DGCA Airspace Clearance",
    "pkg.p6_title": "Event & Festival Coverage",
    "pkg.p6_desc": "Aerial coverage for music festivals, outdoor concerts, sports tournaments, and large-scale gatherings with active crowd risk mitigation.",
    "pkg.p6_f1": "Dynamic Crowd Perspectives & Stage Grandeur Flow",
    "pkg.p6_f2": "60-Second Social Ready Highlight Reel",
    "pkg.p6_f3": "Airspace Authorization & Safety Standby Crew",

    // Gear & Services (Spesifikasi Terkoreksi)
    "gear.badge": "Fleet & Equipment",
    "gear.title": "Choose the Right Drone Fleet for Your Project",
    "gear.subtitle": "Every production need carries a unique visual signature. All units maintained under airworthiness standards with regular sensor calibration.",
    "gear.d1_tag": "NEXT-GEN FLAGSHIP",
    "gear.d1_desc": "Next-generation cinema flagship drone with advanced Hasselblad multi-lens system, 360° omnidirectional obstacle sensing, and long-range O4 Pro transmission.",
    "gear.d1_s1": "8K/60fps & 4K/120fps HDR Hasselblad",
    "gear.d1_s2": "10-Bit D-Log M & D-Log Cinema Color Profile",
    "gear.d1_s3": "Ideal: Feature Films & Large-Scale Commercials",
    "gear.d1_ideal": "Ideal for: Feature Films, High-End Commercials, Cinematic Aerial Storytelling",
    "gear.d1_btn": "Book with Mavic 4 Pro →",
    "gear.d2_tag": "TRIPLE CAMERA CINEMA",
    "gear.d2_desc": "Independent 3-camera optical system with Hasselblad 4/3 CMOS primary sensor recording 5.1K/50fps & 4K/120fps with 10-Bit D-Log M & HLG color science.",
    "gear.d2_s1": "Triple Cam: 24mm + 70mm + 166mm Tele",
    "gear.d2_s2": "5.1K/50fps & 10-Bit D-Log M Video",
    "gear.d2_s3": "Ideal: Corporate Profile Videos & Real Estate",
    "gear.d2_ideal": "Ideal for: Commercial Ads, Corporate Profiles, High-Resolution Landscapes",
    "gear.d2_btn": "Book with Mavic 3 Pro →",
    "gear.d6_tag": "DUAL CAMERA & NIGHTSCAPE",
    "gear.d6_desc": "Advanced dual-camera drone featuring a 1-inch CMOS 50MP primary (24mm) and 70mm medium telephoto lens, equipped with forward LiDAR nightscape sensing.",
    "gear.d6_s1": "1\" CMOS 50MP Primary + 70mm Medium Tele",
    "gear.d6_s2": "Nightscape LiDAR & Omnidirectional Sensing",
    "gear.d6_s3": "Ideal: Nightscapes, Tourism & Documentation",
    "gear.d6_ideal": "Ideal for: Nightscape Photography, Travel & Tourism Content, Creative Commercials",
    "gear.d6_btn": "Book with Air 3S →",
    "gear.d3_tag": "IMMERSIVE FPV CINEMA",
    "gear.d3_desc": "Agile cinematic FPV drone featuring 155° Ultra-Wide FOV and dynamic maneuvers for high-intensity visual action and controlled indoor flights.",
    "gear.d3_s1": "4K/60fps HDR Video, 155° FOV & RockSteady 3.0+",
    "gear.d3_s2": "Integrated Propeller Guards (Controlled Indoor Safe)",
    "gear.d3_s3": "Ideal: Building Fly-Throughs, Automotive & Action Sports",
    "gear.d3_ideal": "Ideal for: Cliff Dives, Automotive & Drift, Indoor Fly-throughs, Action Sports",
    "gear.d3_btn": "Book with Avata 2 →",
    "gear.d4_tag": "AGILE & SUB-249G",
    "gear.d4_desc": "Ultra-lightweight sub-249g drone with True Vertical Shooting for TikTok & Reels, operated strictly under DGCA airspace safety guidelines.",
    "gear.d4_s1": "True Vertical Gimbal Rotation 4K/60fps HDR",
    "gear.d4_s2": "Operated Under DGCA Airspace Regulations",
    "gear.d4_s3": "Ideal: Real Estate, Instagram Reels & Travel",
    "gear.d4_ideal": "Ideal for: Tourism, Real Estate, Instagram Reels & TikTok",
    "gear.d4_btn": "Book with Mini 4 Pro →",
    "gear.d5_tag": "PALM TAKEOFF & AI TRACKING",
    "gear.d5_desc": "Ultra-compact 135g palm-takeoff drone featuring smart AI subject tracking, RockSteady stabilization, and dynamic close-proximity shots.",
    "gear.d5_s1": "Ultra-Light 135g Weight • Palm Takeoff & Landing",
    "gear.d5_s2": "Smart AI Subject Tracking with Enclosed Propellers",
    "gear.d5_s3": "Ideal: Confined Spaces, Intimate Events & BTS",
    "gear.d5_ideal": "Ideal for: Personal Vlogs, Intimate Events, Safe Indoor Fly-throughs",
    "gear.d5_btn": "Book with Neo 2 →",

    // Operational Workflow (5 Phases)
    "flow.badge": "OPERATIONAL WORKFLOW",
    "flow.title": "Five-Step Precision Flight Workflow",
    "flow.subtitle": "Every mission is executed through 5 structured phases ensuring cinematic excellence, legal airspace compliance, and absolute safety.",
    "flow.s1_num": "01",
    "flow.s1_title": "Project Consultation & Vision",
    "flow.s1_desc": "Aligning on visual concepts, deliverables, aspect ratios, style references, and shooting schedules with your creative team.",
    "flow.s2_num": "02",
    "flow.s2_title": "Airspace Assessment (SIDOPI GO)",
    "flow.s2_desc": "Screening coordinate locations against airport KKOP zones, 120m AGL altitude caps, and topography hazard assessment.",
    "flow.s3_num": "03",
    "flow.s3_title": "Permits & Safety Risk Assessment",
    "flow.s3_desc": "Securing airspace authorizations when needed, pre-flight safety checklists, and establishing emergency fail-safe landing zones.",
    "flow.s4_num": "04",
    "flow.s4_title": "Precision Flight Execution",
    "flow.s4_desc": "On-site flight operations by Certified Pilot featuring smooth camera gimbal moves, live monitoring, and calibrated battery management.",
    "flow.s5_num": "05",
    "flow.s5_title": "Post-Production & Master Delivery",
    "flow.s5_desc": "Raw log file integrity inspection, professional D-Log M color grading, master 5.1K/4K exports, and fast cloud delivery.",

    // Services (Legacy Grid with safety fix)
    "service.deliverables_header": "OUTPUT & DELIVERABLES:",
    "service.s1_title": "Aerial Cinematography",
    "service.s1_desc": "4K/5K aerial video production for commercial film, tourism promotions, and brand storytelling.",
    "service.s1_d1": "Raw Log Files (D-Log M) + Color Graded 4K Master",
    "service.s1_d2": "Flight Duration 2–4 Flight Batteries",
    "service.s1_d3": "Official Flight Permits & Airspace Compliance",
    "service.s2_title": "Real Estate & Architecture",
    "service.s2_desc": "Wide-angle aerial photography and cinematic fly-throughs showcasing architectural lines and surroundings.",
    "service.s2_d1": "48MP RAW High-Resolution Aerial Photos",
    "service.s2_d2": "4K Showcase Video + Vertical Reels Format",
    "service.s2_d3": "Facility Highlights & Environmental Connectivity",
    "service.s3_title": "Event Documentation",
    "service.s3_desc": "Aerial coverage for festivals, outdoor concerts, sports events, weddings, and grand gatherings.",
    "service.s3_d1": "Dynamic Crowd Aerial Angles & Perspectives",
    "service.s3_d2": "60-Second Social Ready Highlight Reel",
    "service.s3_d3": "Safety-First Flight Operations, Subject to Airspace Authorization and Site Risk Assessment",
    "service.s4_title": "Company Profile",
    "service.s4_desc": "Cinematic aerial video and photo production for corporate facilities, industrial plants, and company showcase.",
    "service.s4_d1": "4K Master Video Ready for Web & Presentation",
    "service.s4_d2": "Complete Unedited Raw Footage Package",
    "service.s4_d3": "Certified Remote Pilot & Full Airspace Compliance",

    // About Me & Pilot Profile (Enlarged & Verified)
    "about.badge": "CHIEF PILOT & CREDENTIALS",
    "about.pilot_badge": "CERTIFIED REMOTE PILOT",
    "about.pilot_name": "Bobien Martien",
    "about.pilot_role": "Chief Remote Pilot & Aerial Cinematographer",
    "about.reg_title": "OFFICIAL REGISTRATION",
    "about.reg_desc": "Ministry of Transportation RI",
    "about.title": "Precision Aerial Perspectives for Feature Film & Commercial Production Standards.",
    "about.p1": "I am a <strong class=\"text-white\">Certified Remote Pilot (Ministry of Transportation DGCA & SIDOPI GO)</strong> dedicated to high-precision aerial cinematography and professional visual capture.",
    "about.p2": "With over <strong class=\"text-white\">450 operational flight hours</strong> across diverse Indonesian terrains, I am experienced in real-world flight dynamics—from high coastal winds to open natural landscapes and precision flight in dense urban zones.",
    "about.p3": "Field focus is centered on <strong class=\"text-white\">smooth, cinematic gimbal motion, precise 10-Bit D-Log M color profiles for color grading flexibility, and rigorous flight safety standards</strong>.",
    "about.p4": "Every flight is backed by structured pre-flight safety checklists, calibrated battery management, and airspace permit compliance to ensure smooth execution for your production crew.",
    "about.cert_card_title": "OFFICIAL CREDENTIALS & LICENSING",
    "about.cert_card_sub": "Ministry of Transportation Republic of Indonesia (DGCA)",
    "about.cert_item1_label": "SIDOPI GO REGISTRATION",
    "about.cert_item1_val": "ID: PILOT-••••-2024",
    "about.cert_item2_label": "DKPPU CERTIFICATION",
    "about.cert_item2_val": "CASR PART 107 • #DKPPU-••••-89",
    "about.cert_item3_label": "OPERATIONAL FLIGHT LOG",
    "about.cert_item3_val": "450+ Hours • Zero Incident Record",
    "about.bts_title": "FLIGHT OPERATIONS IN ACTION",

    // Testimonials
    "testi.badge": "CLIENT TESTIMONIALS",
    "testi.title": "Trusted by Event Organizers & Production Teams",
    "testi.subtitle": "Real feedback from brands, event organizers, and corporate partners who have experienced our aerial cinematography.",
    "testi.t1_quote": "\"Bobien executed the aerial coverage for KCP Galuh Mas 12th Anniversary with extreme precision. The camera movement was cinematic, safety procedures were strictly followed, and the highlight reel was stellar.\"",
    "testi.t1_author": "Event Management Team",
    "testi.t1_role": "Wonderful 12th KCP Galuh Mas Organizer",
    "testi.t2_quote": "\"The Hasselblad footage quality and Bobien's architectural angle composition elevated our New Cluster Groove showcase, winning 1st Place in the aerial competition.\"",
    "testi.t2_author": "Commercial Marketing Lead",
    "testi.t2_role": "Property Developer & Agency Partner",
    "testi.t3_quote": "\"A drone pilot who truly understands cinematic language rather than just flying. The 10-Bit D-Log M files were exceptionally clean and effortless to grade in our post-production suite.\"",
    "testi.t3_author": "Creative Director",
    "testi.t3_role": "Visual Motion Studio",
    "testi.t4_quote": "\"Highly professional, strictly compliant with airspace safety rules, and the PKN STAN Campus Skies aerial footage was breathtaking and widely celebrated.\"",
    "testi.t4_author": "Public Relations & Media Crew",
    "testi.t4_role": "Campus Skies Production",

    // Contact
    "contact.badge": "COLLABORATION",
    "contact.title": "Let's Bring Your Aerial Vision to Life",
    "contact.desc": "Planning a film shoot, property showcase, event coverage, or bespoke aerial project? Contact me to discuss rates and flight scheduling.",
    "contact.wa_label": "Direct WhatsApp",
    "contact.wa_sub": "+62 813-8145-3598 (Fast Response)",
    "contact.email_label": "Official Email",
    "contact.ig_follow": "Follow →",
    "contact.form_title": "Send Project Inquiry",
    "contact.name_label": "FULL NAME",
    "contact.name_placeholder": "Your Full Name",
    "contact.email_label_field": "EMAIL OR PHONE NUMBER",
    "contact.email_placeholder": "email@domain.com or WhatsApp number",
    "contact.service_label": "SERVICE REQUIRED",
    "contact.srv_opt_cinema": "Aerial Cinematography (4K / 5K Video)",
    "contact.srv_opt_photo": "High-Resolution Aerial Photography",
    "contact.srv_opt_fpv": "FPV Action & Extreme Sports",
    "contact.srv_opt_property": "Real Estate & Architecture Showcase",
    "contact.srv_opt_event": "Event & Festival Coverage",
    "contact.srv_opt_corp": "Corporate Profile & Industrial Facilities",
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
    "contact.msg_placeholder": "Tell me about your location, shooting dates, and visual expectations...",
    "contact.submit_btn": "Send Message via WhatsApp",
    "contact.float_wa": "Chat with Pilot",

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
  return "en"; // Default English
}

function setLanguage(lang) {
  if (lang !== "id" && lang !== "en") lang = "en";
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

  // 5. Re-apply site config overrides if present
  if (window.AeroSiteConfig && typeof window.AeroSiteConfig.applySiteConfigToDOM === "function") {
    window.AeroSiteConfig.applySiteConfigToDOM();
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

  const activeClasses = ["bg-[#EAB308]", "text-[#0A0A0B]", "font-bold", "shadow"];
  const inactiveClasses = ["text-[#9CA3AF]", "hover:text-[#F5F5F7]", "hover:bg-[#1C1C1F]"];
  const legacyClasses = ["bg-white", "text-neutral-950", "text-neutral-400", "hover:text-white"];

  [ { el: idBtn, lang: "id" }, { el: enBtn, lang: "en" }, { el: mobileIdBtn, lang: "id" }, { el: mobileEnBtn, lang: "en" } ].forEach(item => {
    if (!item.el) return;
    item.el.classList.remove(...legacyClasses);
    if (item.lang === activeLang) {
      item.el.classList.add(...activeClasses);
      item.el.classList.remove(...inactiveClasses);
    } else {
      item.el.classList.remove(...activeClasses);
      item.el.classList.add(...inactiveClasses);
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
