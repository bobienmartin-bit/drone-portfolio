# 🛸 AeroScope — Portofolio Drone Fotografi & Aerial Cinematography

Website portofolio modern dan profesional khusus untuk karya fotografi dan videografi drone (aerial visuals). Dibangun dengan teknologi **HTML5, Tailwind CSS, Lucide Icons, dan JavaScript murni**, siap langsung jalan tanpa instal tools tambahan, dan **100% siap disambungkan ke Vercel**.

---

## ✨ Fitur Utama

1. **Cinematic Hero & Telemetry HUD**: Desain bertema cockpit & sensor telemetry drone futuristik dengan status GPS, resolusi rekaman, dan jam terbang pilot.
2. **Featured Video Player 4K**: Pemutar video sinematik langsung di website dengan kontrol lengkap, audio, dan spesifikasi kamera drone.
3. **Interactive Photo & Video Gallery**:
   - Filter kategori: *Semua Karya, Foto Udara, Video Sinematik, Alam & Lanskap, Perkotaan (Urban), Upload Pribadi*.
   - **Video Modal Player**: Putar video drone dengan kontrol lancar & responsif.
   - **Photo Lightbox**: Tampilkan foto udara resolusi penuh dengan zoom, data telemetry (drone, ketinggian, shutter/aperture), dan tombol unduh.
4. **Studio Uploader Mandiri (Upload Foto & Video Pribadi)**:
   - Anda dapat mengunggah file foto (`.jpg`, `.png`, `.webp`) dan video (`.mp4`, `.webm`, `.mov`) langsung dari komputer Anda.
   - Menggunakan teknologi browser **IndexedDB**, sehingga foto & video yang Anda upload akan tetap tersimpan di browser Anda meskipun halaman direfresh!
5. **Gear & Services Fleet**: Menampilkan spesifikasi armada drone (DJI Mavic 3 Pro, DJI Mini 4 Pro, Custom 5" FPV Cinewhoop) dan jenis layanan komersial.
6. **Formulir Inquiry & Integrasi WhatsApp Langsung**: Pengunjung dapat memesan jadwal terbang pilot langsung terhubung ke WhatsApp.
7. **Zero-Config Vercel Support**: Sudah dilengkapi file `vercel.json` dengan caching & header optimasi.

---

## 📁 Struktur Direktori

```
drone-portfolio/
│
├── index.html            # Halaman utama portofolio
├── styles.css            # Desain kustom, animasi pulse radar, glassmorphism
├── app.js                # Logika galeri, pemutar video, lightbox, dan IndexedDB uploader
├── vercel.json           # Konfigurasi caching dan deployment Vercel
├── README.md             # Panduan lengkap
│
└── assets/
    ├── images/           # Tempat menyimpan foto drone permanen Anda
    └── videos/           # Tempat menyimpan video drone permanen Anda
```

---

## 🚀 Cara Menjalankan Secara Lokal di Komputer Anda

Anda **tidak memerlukan Node.js atau server khusus**:
1. Buka folder:
   ```
   C:\Users\Bobien Martien\.gemini\antigravity\scratch\drone-portfolio
   ```
2. Klik dua kali file `index.html` untuk langsung membukanya di browser (Google Chrome, Microsoft Edge, dll).
3. Anda bisa langsung mencoba fitur tombol **"+ Upload Karya"** untuk memasukkan foto atau video drone pribadi dari laptop Anda.

---

## 🌐 Cara Menyambungkan dan Mendeploy ke Vercel

Ada **2 cara mudah** untuk menghubungkan website ini ke Vercel:

### Cara 1: Menggunakan GitHub (Sangat Disarankan & Otomatis)
1. Buat akun di [GitHub.com](https://github.com) jika belum punya.
2. Buat repository baru, misalnya bernama `drone-portfolio`.
3. Unggah seluruh file dari folder ini (`index.html`, `styles.css`, `app.js`, `vercel.json`, dan folder `assets`) ke repository GitHub tersebut.
4. Buka [Vercel.com](https://vercel.com) dan masuk menggunakan akun GitHub Anda.
5. Pada dashboard Vercel, klik tombol **"Add New..."** lalu pilih **"Project"**.
6. Pilih repository `drone-portfolio` yang baru saja Anda buat.
7. Klik **"Deploy"**.
8. Dalam hitungan detik, Vercel akan memberikan link website aktif Anda (misalnya: `https://drone-portfolio-anda.vercel.app`) secara gratis! Setiap kali Anda memperbarui file di GitHub, Vercel akan otomatis meng-update website Anda.

### Cara 2: Menambahkan Foto & Video Permanen untuk Pengunjung Publik di Vercel
Jika Anda ingin foto dan video pribadi Anda selalu muncul untuk semua orang yang membuka website Anda di Vercel:
1. Taruh file foto drone Anda ke dalam folder `assets/images/` (contoh: `pantai-bali.jpg`).
2. Taruh file video drone Anda ke dalam folder `assets/videos/` (contoh: `showreel-bromo.mp4`).
3. Buka file `app.js` dan tambahkan entri media ke dalam array `INITIAL_MEDIA`:
   ```javascript
   {
     id: "karya-pribadi-1",
     type: "video", // atau "photo"
     title: "Penerbangan Sunset Gunung Bromo",
     category: "landscape",
     mediaUrl: "assets/videos/showreel-bromo.mp4",
     thumbnailUrl: "assets/images/pantai-bali.jpg",
     drone: "DJI Mavic 3 Pro",
     altitude: "150m AGL",
     specs: "4K 60fps • D-Log M",
     location: "Gunung Bromo, Jawa Timur",
     description: "Dokumentasi pribadi penerbangan senja.",
     isUserUpload: false
   }
   ```
4. Simpan file `app.js` dan upload kembali ke GitHub/Vercel.

---

## 📞 Kustomisasi Kontak & WhatsApp Anda
Buka `index.html` dan `app.js`, lalu cari nomor `6281234567890`. Ganti dengan nomor WhatsApp asli Anda agar pesan pengunjung langsung masuk ke WhatsApp Anda!
