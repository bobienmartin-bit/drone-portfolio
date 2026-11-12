# 🛸 AeroScope — Portofolio Drone Fotografi & CMS Supabase

Website portofolio modern dan profesional khusus untuk karya fotografi dan videografi drone (aerial visuals), terintegrasi dengan **Supabase CMS (PostgreSQL Database & Cloud Storage)** dan siap dideploy ke **Vercel**.

---

## ✨ Fitur Utama

1. **Cinematic Hero & Telemetry HUD**: Desain cockpit & sensor telemetry drone dengan status satelit GPS, resolusi 5.1K/4K, dan indikator status database.
2. **Featured Video Player 4K**: Pemutar video sinematik langsung di website dengan kontrol responsif, audio, dan spesifikasi kamera drone.
3. **Interactive Photo & Video Gallery**:
   - Filter kategori: *Semua Karya, Foto Udara, Video Sinematik, Alam & Lanskap, Perkotaan (Urban), Upload Pribadi*.
   - **Video Modal Player**: Putar video drone dengan kontrol lancar.
   - **Photo Lightbox**: Tampilkan foto udara resolusi penuh dengan zoom, data telemetry (drone, ketinggian, shutter/aperture), dan tombol unduh.
4. **🔥 Panel Admin CMS Supabase (`admin.html`)**:
   - Mengelola seluruh data galeri foto dan video secara online tanpa menyentuh kode.
   - Upload file foto & video resolusi tinggi langsung ke **Supabase Storage bucket `drone-media`**.
   - Input metadata drone lengkap (model drone, ketinggian/altitude, FPS/resolusi, lokasi, deskripsi).
   - Fitur toggle **Featured Showcase** untuk menentukan video/foto utama di halaman depan.
   - Fitur Edit dan Hapus data realtime.
5. **Formulir Inquiry & Booking WhatsApp Langsung**: Pengunjung dapat memesan jadwal terbang pilot langsung terhubung ke WhatsApp.
6. **Zero-Config Vercel Support**: Sudah dilengkapi file `vercel.json` dengan caching & header optimasi.

---

## 📁 Struktur Direktori

```
drone-portfolio/
│
├── index.html            # Halaman utama portofolio publik
├── admin.html            # Panel Admin CMS Studio (Supabase Manager)
├── admin.js              # Logika dashboard CMS (upload storage, CRUD table)
├── supabase.js           # Client helper koneksi database & storage Supabase
├── supabase_schema.sql   # Skrip SQL tabel portfolio_media & storage bucket
├── styles.css            # Desain kustom, animasi pulse radar, glassmorphism
├── app.js                # Logika galeri publik & sinkronisasi Supabase
├── vercel.json           # Konfigurasi caching dan deployment Vercel
├── README.md             # Panduan lengkap
│
└── assets/
    ├── images/           # Tempat menyimpan foto lokal
    └── videos/           # Tempat menyimpan video lokal
```

---

## 🛠️ Panduan Menghubungkan ke Supabase (Database & Storage)

CMS ini menggunakan **Supabase** (layanan PostgreSQL & Cloud Storage gratis dan cepat):

### Langkah 1: Buat Proyek di Supabase
1. Buka [https://supabase.com](https://supabase.com) dan buat akun (bisa login dengan akun GitHub Anda).
2. Klik **"New Project"**, beri nama proyek (contoh: `drone-portfolio`), pilih lokasi server terdekat (contoh: *Singapore*), dan buat database password.
3. Tunggu ~1 menit hingga proyek selesai dibuat.

### Langkah 2: Jalankan Skrip SQL
1. Di dashboard Supabase Anda, buka menu **SQL Editor** (ikon terminal di menu kiri).
2. Klik **"New Query"**.
3. Buka file `supabase_schema.sql` di proyek ini, salin seluruh isinya, dan tempelkan ke SQL Editor Supabase.
4. Klik tombol **"Run"**.
   - Skrip ini akan otomatis membuat tabel `portfolio_media`, mengaktifkan Row Level Security (RLS), dan membuat Storage Bucket bernama `drone-media`.

### Langkah 3: Hubungkan ke CMS Admin
1. Di Supabase, buka menu **Project Settings** (ikon gerigi) &rarr; **API**.
2. Salin:
   - **Project URL** (contoh: `https://xxxx.supabase.co`)
   - **Project API Keys (`anon` / `public`)**
3. Buka halaman **`admin.html`** di browser Anda:
   - Klik tombol **"Konfigurasi Supabase"**.
   - Masukkan Project URL dan Anon Key tadi.
   - Klik **"Tes Koneksi"**, lalu klik **"Simpan Konfigurasi"**.
4. Selesai! Sekarang Anda dapat mengunggah foto dan video langsung melalui panel CMS `admin.html`, dan hasilnya otomatis langsung muncul di website publik (`index.html`) Anda di Vercel!

---

## 🚀 Cara Menjalankan Secara Lokal

1. Buka folder proyek:
   ```
   C:\Users\Bobien Martien\.gemini\antigravity\scratch\drone-portfolio
   ```
2. Klik dua kali **`index.html`** untuk melihat website portofolio publik.
3. Klik dua kali **`admin.html`** untuk mengelola data via CMS Admin.

---

## 🌐 Deploy ke Vercel

Repository GitHub Anda:
👉 **[https://github.com/bobienmartin-bit/drone-portfolio](https://github.com/bobienmartin-bit/drone-portfolio)**

Karena semua file sudah tersinkronisasi ke GitHub, setiap kali Anda melakukan `git push`, Vercel akan otomatis meng-update website Anda secara live!
