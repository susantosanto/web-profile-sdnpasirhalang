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

/* ===========================================================================
   ADMINISTRASI DOKUMEN GURU — dibaca langsung dari Google Drive
   ---------------------------------------------------------------------------
   1. Buat API key di Google Cloud Console → aktifkan "Google Drive API" →
      batasi ke Drive API + situs ini (HTTP referrer), lalu tempel di bawah.
   2. Bagikan tiap folder sebagai "Siapa saja yang memiliki link — Melihat".
   3. Tempel tautan folder (URL lengkap atau ID saja) pada entri gurunya.
   4. Jalankan: npm run build
   =========================================================================== */
export const DRIVE_API_KEY = '';

export const GURU_FOLDERS = [
  { nama: 'Ahmad, S.Pd.', peran: 'PLT Kepala Sekolah · Wali Kelas I', foto: 'guru/ahmad.jpg', folder: '' },
  { nama: 'Fika Agustina, S.Pd.', peran: 'Wali Kelas II', foto: 'guru/fika.jpg', folder: '' },
  { nama: 'Vani, S.Ag.', peran: 'Wali Kelas III', foto: 'guru/vani.jpg', folder: '' },
  { nama: 'Rinda Sri Agung Wahyuni, S.Pd.', peran: 'Wali Kelas IV', foto: 'guru/rinda.jpg', folder: '' },
  { nama: 'Meyta Murthy Lasari, S.E.', peran: 'Wali Kelas V-A', foto: null, folder: '' },
  { nama: 'Siti Aisah Nur Fitri, S.Pd.', peran: 'Wali Kelas V-B', foto: 'guru/siti-aisah.jpg', folder: '' },
  { nama: 'Deni Mulyani, S.Pd.', peran: 'Wali Kelas VI', foto: null, folder: '' },
  { nama: "Nur'Asiah, S.Pd.", peran: 'Guru PAI', foto: 'guru/nurasiah.jpg', folder: '' }
];

export const GAMBAR = {
  lambang: asset('images/emblem-sekolah.png'),
  logoKbb: asset('images/logo-kbb.png'),
  guru: asset('images/foto-guru.png'),
  kepalaSekolah: asset('images/foto-kepala-sekolah.png')
};
