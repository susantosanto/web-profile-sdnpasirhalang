/* ===========================================================================
   KONFIGURASI SITUS RESMI SD NEGERI PASIRHALANG  ·  versi React
   ---------------------------------------------------------------------------
   Isi tiga bagian di bawah ini. Biarkan kosong bila belum tersedia —
   antarmuka akan menampilkan status jujur, bukan tautan atau foto palsu.

   1. folders : 12 URL folder Map PKKS di Google Drive.
                Format https://drive.google.com/drive/folders/<id>
   2. files   : tautan berkas FINAL per kode butir, BUKAN tautan templat asal.
                Format https://drive.google.com/file/d/<id>/view?usp=sharing
   3. photos  : foto dokumentasi kegiatan, dikelompokkan per kode butir PKKS.
                Simpan berkas di public/foto/ lalu daftarkan di sini.
                Contoh:
                  "4.2.a": [
                    { src: "foto/4.2.a-01-fasad.jpg",
                      judul: "Fasad sekolah dan plang ruangan",
                      tanggal: "2026-08-14" },
                    { src: "foto/4.2.a-02-toga.jpg",
                      judul: "Taman dan TOGA", tanggal: "2026-08-14" }
                  ],
                Daftar bidikan wajib ada di menu Foto kegiatan → Kelengkapan.

   Setelah mengubah berkas ini jalankan: npm run build
   =========================================================================== */
export const DRIVE_CONFIG = {
  folders: {
    "1": null, "2": null, "3": null, "4": null, "5": null, "6": null,
    "7": null, "8": null, "9": null, "10": null, "11": null, "12": null
  },
  files: {},
  photos: {}
};

const BASE = import.meta.env.BASE_URL || './';
export const asset = (p) => `${BASE}${p}`;

export const GAMBAR = {
  lambang: asset('images/emblem-sekolah.png'),
  logoKbb: asset('images/logo-kbb.png'),
  guru: asset('images/foto-guru.png')
};
