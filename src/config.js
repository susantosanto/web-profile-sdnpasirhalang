/* ===========================================================================
   KONFIGURASI SITUS RESMI SD NEGERI PASIRHALANG  ·  versi React
   ---------------------------------------------------------------------------
   Daftarkan foto kegiatan sekolah di bawah ini. Simpan berkas di
   public/foto/ lalu tambah satu baris per foto:

     { src: "foto/g7-kaih-01.jpg",
       judul: "Judul foto",
       tanggal: "2026-08-17",
       kategori: "g7-kaih" },

   Nilai kategori harus salah satu dari KATEGORI_FOTO di bawah.
   Setelah mengubah berkas ini jalankan: npm run build
   =========================================================================== */
export const KATEGORI_FOTO = [
  { id: 'g7-kaih', nama: 'G7 KAIH', ringkas: 'Gerakan 7 Kebiasaan Anak Indonesia Hebat dalam keseharian murid.' },
  { id: 'pembiasaan', nama: 'Pembiasaan', ringkas: 'Apel pagi, literasi, ibadah, dan budaya 5S setiap hari.' },
  { id: 'lomba', nama: 'Lomba', ringkas: 'Ajang prestasi murid tingkat gugus hingga kabupaten.' }
];

export const GALERI_KEGIATAN = [
];

const BASE = import.meta.env.BASE_URL || './';
export const asset = (p) => `${BASE}${p}`;

export const GAMBAR = {
  lambang: asset('images/emblem-sekolah.png'),
  logoKbb: asset('images/logo-kbb.png'),
  guru: asset('images/foto-guru.png'),
  kepalaSekolah: asset('images/foto-kepala-sekolah.png')
};
