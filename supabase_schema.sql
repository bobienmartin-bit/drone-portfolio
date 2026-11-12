-- ========================================================
-- AEROSCOPE DRONE PORTFOLIO: SUPABASE DATABASE & STORAGE SCHEMA
-- ========================================================
-- Jalankan skrip SQL ini di Supabase Dashboard -> SQL Editor -> New Query -> Run.

-- 1. Buat Tabel portfolio_media
create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null check (type in ('photo', 'video')),
  title text not null,
  category text not null default 'landscape',
  media_url text not null,
  thumbnail_url text,
  drone text default 'DJI Mavic 3 Pro',
  altitude text default '120m AGL',
  specs text default '4K UHD 60fps',
  location text default 'Indonesia',
  description text,
  is_featured boolean default false,
  display_order integer default 0
);

-- 2. Aktifkan Row Level Security (RLS)
alter table public.portfolio_media enable row level security;

-- 3. Kebijakan Keamanan (RLS Policies)
-- a. Semua pengunjung website dapat membaca data galeri (Public Read)
create policy "Allow public read access for all"
  on public.portfolio_media
  for select
  using (true);

-- b. Hanya admin/pengguna terautentikasi yang dapat menambah, mengubah, atau menghapus data
create policy "Allow authenticated insert"
  on public.portfolio_media
  for insert
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated update"
  on public.portfolio_media
  for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated delete"
  on public.portfolio_media
  for delete
  using (auth.role() = 'authenticated');

-- 4. Konfigurasi Storage Bucket untuk File Foto & Video Drone
-- Membuat bucket 'drone-media' dengan akses publik
insert into storage.buckets (id, name, public)
values ('drone-media', 'drone-media', true)
on conflict (id) do update set public = true;

-- 5. Kebijakan Storage (Supabase Storage RLS)
-- a. Pengunjung publik dapat melihat dan memutar media
create policy "Public Access to Drone Media"
  on storage.objects
  for select
  using (bucket_id = 'drone-media');

-- b. Hanya admin terautentikasi yang dapat mengunggah file media
create policy "Authenticated Users can Upload to Drone Media"
  on storage.objects
  for insert
  with check (bucket_id = 'drone-media' and auth.role() = 'authenticated');

-- c. Hanya admin terautentikasi yang dapat mengupdate file media
create policy "Authenticated Users can Update Drone Media"
  on storage.objects
  for update
  using (bucket_id = 'drone-media' and auth.role() = 'authenticated');

-- d. Hanya admin terautentikasi yang dapat menghapus file media
create policy "Authenticated Users can Delete Drone Media"
  on storage.objects
  for delete
  using (bucket_id = 'drone-media' and auth.role() = 'authenticated');

-- 6. Contoh Data Awal (Opsional)
insert into public.portfolio_media (type, title, category, media_url, thumbnail_url, drone, altitude, specs, location, description, is_featured)
values
  (
    'video',
    'Cinematic Reel: Lanskap Pegunungan Tropis',
    'landscape',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-landscape-during-sunset-41481-large.mp4',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'DJI Mavic 3 Pro',
    '340m AGL',
    '5.1K 50fps • D-Log M • ND16 Filter',
    'Gunung Bromo & Semeru, Jawa Timur',
    'Perekaman sinematik kabut pagi yang menyelimuti lembah pegunungan saat matahari terbit.',
    true
  ),
  (
    'photo',
    'Garis Pantai Karang & Gulungan Ombak',
    'coastal',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'DJI Mavic 3 Pro',
    '120m AGL',
    '48MP RAW • f/2.8 • 1/500s • ISO 100',
    'Nusa Penida, Bali',
    'Pengambilan top-down (90 derajat) memperlihatkan gradasi warna toska air laut dan buih ombak samudra.',
    false
  );
