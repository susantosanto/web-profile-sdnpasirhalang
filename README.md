# SD Negeri Pasirhalang — Situs Resmi

**Situs resmi SD Negeri Pasirhalang, Kecamatan Cikalongwetan, Kabupaten Bandung Barat**

## Tentang

Situs ini merupakan dokumentasi resmi untuk SD Negeri Pasirhalang yang menyajikan profil sekolah, arsip PKKS (Peningkatan Mutu Sekolah Berbasis Sekolah) 2026/2027, serta dokumentasi foto kegiatan sekolah secara berbasis materi PKKS.

## Fitur Utama

### Navigasi Multi-Halaman
- **Beranda** – Informasi umum dan ringkasan sekolah
- **Profil** – Detail profil sekolah, visi, misi, dan sejarah
- **PKKS 2026/2027** – Arsip lengkap Program Peningkatan Mutu Sekolah Berbasis Sekolah
- **Foto Kegiatan** – Galeri dokumentasi foto kegiatan sekolah
- **Kontak** – Informasi kontak dan lokasi sekolah

### Panel Interaktif
- **Panel Dokumentasi PKKS** – Membuka dokumen PDF PKKS yang tersimpan
- **Panel Galeri Foto** – Melihat foto lengkap dengan informasi detail

### Navigasi Praktis
- **Rute Hash-based** – Navigasi halaman tanpa reload, menggunakan URL hash
- **Navigasi Panel** – Panel slide-in yang dapat ditutup untuk melihat konten lengkap
- **Tombol Kembali ke Atas** – Navigasi cepat ke bagian atas halaman

### Desain Modern & Responsif
- **Framer Motion** – Animasi transisi halaman yang halus
- **Vite** – Build tool yang cepat dan efisien
- **Komponen UI yang Dapat Direset** – Sistem komponen yang dapat digunakan kembali
- **Desain yang Ramah Mobile** – Tampilan optimal di semua perangkat

## Teknologi yang Digunakan

### Front-End
- **React** – Library antarmuka pengguna
- **Vite** – Build tool dan server pengembangan
- **Framer Motion** – Animasi dan interaksi
- **Lucide React** – Ikon

### Desain & Font
- **Fontsource Playfair Display** – Font judul
- **Fontsource Plus Jakarta Sans** – Font teks

### Fitur Khusus
- **Sistem Dokumentasi PKKS** – Mendukung arsip lengkap PKKS 2026/2027
- **Galeri Foto dengan Filter** – Mengatur foto berdasarkan kategori
- **Mode Aksesibilitas** – Navigasi keyboard dan fokus yang tepat

## Struktur Proyek

```
src/
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Panel.jsx
│   └── Ui.jsx
├── views/               # Halaman-halaman
│   ├── Beranda.jsx     # Beranda
│   ├── Profil.jsx      # Halaman profil
│   ├── Pkks.jsx        # Halaman PKKS
│   ├── Foto.jsx        # Halaman galeri foto
│   └── Kontak.jsx      # Halaman kontak
├── lib/                 # Library dan utilitas
│   └── site.js         # Utilitas parsing hash URL
├── data/               # Data situs statis
│   └── siteData.json   # Data konten yang dikelola
├── styles.css          # Gaya global
└── main.jsx           # Titik masuk aplikasi

public/
├── images/             # Aset gambar
└── index.html         # Template HTML

tools/                 # Alat bantu pembangunan
└── sync-data.mjs      # Sinkronisasi data PKKS dari sumber eksternal
```

## Persyaratan Pengembangan

```bash
# Clone repositori

# Install dependensi
npm install

# Jalankan dalam mode pengembangan
npm run dev

# Bangun untuk produksi
npm run build

# Pratinjau build
npm run preview

# Sinkronkan data PKKS (untuk admin)
npm run sync:data
```

## Fitur yang Dikembangkan Pengguna

### Memulai dengan Panel PKKS
1. Navigasi ke halaman **PKKS 2026/2027**
2. Klik pada judul dokumen PKKS mana pun
3. Panel slide-in akan muncul dengan dokumen yang dapat diunduh
4. Klik **Tutup Panel** atau di luar panel untuk kembali ke daftar

### Menjelajahi Galeri Foto
1. Navigasi ke halaman **Foto Kegiatan**
2. Gunakan filter di header untuk melihat kategori:
   - Ringkasan PKKS
   - Mutu PKKS
   - Indeks PKKS
   - Dokumentasi PKKS
   - Map PKKS
   - Kategori foto
   - Galeri foto
   - Kelengkapan foto
3. Klik pada gambar apa pun untuk melihat detailnya
4. Gunakan tombol navigasi untuk berpindah antar foto

### Mode Aksesibilitas
- **Navigasi Keyboard**: Semua interaksi dapat diakses dengan keyboard
- **Skip Links**: Lewati ke konten utama dengan `Tab`
- **Fokus yang Jelas**: Status fokus yang terlihat untuk semua elemen yang dapat diinteraksi

## Cara Kerja Sistem PKKS

Sistem PKKS (Peningkatan Mutu Sekolah Berbasis Sekolah) mengorganisir dokumen dan data dalam struktur hierarkis:

- **Level 1**: Ringkasan PKKS – Dokumen tingkat tinggi
- **Level 2**: Mutu PKKS – Kriteria dan standar mutu
- **Level 3**: Indeks PKKS – Indeks terstruktur
- **Level 4**: Dokumentasi PKKS – Dokumentasi lengkap

Setiap dokumen memiliki metadata termasuk tanggal, kategori, dan status, yang memungkinkan pencarian dan filter yang efisien.

## Pembangunan dan Sinkronisasi Data

### Sinkronisasi Data PKKS
Proyek ini dilengkapi dengan sistem untuk menyinkronkan data PKKS dari sumber eksternal:

```bash
npm run sync:data
```

Skrip ini mengunduh data terbaru dan memperbarui `src/data/siteData.json`, mempertahankan semua metadata dan struktur.

### Membangun untuk Produksi
```bash
npm run build
```

Ini membuat build yang dioptimalkan dan siap produksi dengan:
- Bundle JavaScript yang di-minify
- File CSS yang di-ekstrak
- Optimasi aset gambar
- HTML yang dimodifikasi dengan benar

## Kontribusi

Kontribusi sangat disambut! Berikut adalah beberapa cara Anda dapat membantu:

### Perubahan Konten
- Perbarui data di `src/data/siteData.json`
- Tambahkan atau edit dokumen PKKS
- Tambahkan foto ke galeri

### Perbaikan Kode
- Perbaiki bug atau masalah
- Tambahkan fitur baru
- Tingkatkan dokumentasi kode
- Optimalkan performa

### Perbaikan UI/UX
- Tambahkan tema baru atau modifikasi tema yang ada
- Tingkatkan animasi atau transisi
- Optimalkan mobile atau aksesibilitas

### Dokumentasi
- Perbaiki README
- Tambahkan dokumentasi fitur baru
- Buat panduan pengembangan

### Kontribusi Tugas
1. Fork repositori
2. Buat branch untuk perubahan Anda: `git checkout -b fitur/ perbaikan-bug`
3. Commit perubahan Anda: `git add . && git commit -m 'deskripsi fitur'`
4. Push ke branch: `git push origin fitur/ perbaikan-bug`
5. Buat Pull Request

## Kontributor Terdahulu

Proyek ini dibuat oleh:
- Komunitas SD Negeri Pasirhalang
- Tim pengembangan PKKS 2026/2027

Terima kasih kepada semua guru, siswa, dan staf yang telah berkontribusi pada dokumentasi ini.

## Lisensi

Proyek ini adalah proyek sumber terbuka dan tersedia di bawah [Lisensi MIT](LICENSE).

## Hubungi Kami

Jika Anda memiliki pertanyaan, saran, atau ingin berkontribusi, silakan:

- Kunjungi halaman kontak di situs ini
- Kirim email ke [silakan isi dengan email kontak yang sesuai]
- Ikuti pembaruan di repositori GitHub ini

## Peta Situs

- [Beranda](https://github.com/susantosanto/web-profile-sdnpasirhalang/tree/master#beranda)
- [Profil](https://github.com/susantosanto/web-profile-sdnpasirhalang/tree/master#profil)
- [PKKS 2026/2027](https://github.com/susantosanto/web-profile-sdnpasirhalang/tree/master#pkks-202627)
- [Foto Kegiatan](https://github.com/susantosanto/web-profile-sdnpasirhalang/tree/master#foto-kegiatan)
- [Kontak](https://github.com/susantosanto/web-profile-sdnpasirhalang/tree/master#kontak)

## ID GitHub

Proyek ini menggunakan [GitHub ID](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-default-rate-limits-for-api-requests#using-githubs-default-rate-limits-for-api-requests) untuk autentikasi.

---

*Diperbarui terakhir: 9 November 2026*
*Versi: 1.0.0*