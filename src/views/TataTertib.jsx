import { ArrowUpRight, Download, FileText, Scale } from 'lucide-react';
import { useSite } from '../App';
import { asset } from '../config';
import { DataTable, SectionHead } from '../components/Ui';
import { GoldRule, Reveal, Stagger, Item } from '../components/motion';

const PDF_PP = asset('dokumen/pp-53-2010-disiplin-pns.pdf');

const DEFINISI = [
  ['Sekolah Dasar (SD)', 'Satuan pendidikan formal yang menyelenggarakan pendidikan umum pada jenjang pendidikan dasar.'],
  ['Peserta Didik / Murid', 'Anak usia sekolah dasar (Kelas I sampai dengan Kelas VI) yang terdaftar secara resmi di sekolah ini.'],
  ['Orang Tua / Wali Murid', 'Ayah, ibu, atau pihak penanggung jawab utama peserta didik di rumah.'],
  ['Disiplin Positif', 'Pendekatan pembinaan perilaku anak yang ramah, tanpa kekerasan fisik maupun psikologis, berfokus pada pembentukan karakter dan tanggung jawab.'],
  ['TPPK (Tim Pencegahan dan Penanganan Kekerasan)', 'Tim khusus sekolah yang bertugas menjaga lingkungan belajar aman, ramah anak, dan bebas perundungan.']
];

const LANDASAN = [
  'Undang-Undang RI Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional.',
  'Undang-Undang RI Nomor 35 Tahun 2014 tentang Perlindungan Anak.',
  'Permendikbudristek Nomor 46 Tahun 2023 tentang Pencegahan dan Penanganan Kekerasan di Lingkungan Satuan Pendidikan (PPKSP).',
  'Prinsip Sekolah Ramah Anak (SRA) dan Keputusan Rapat Bersama Dewan Guru & Komite Sekolah.'
];

const HAK = [
  'Mendapatkan suasana belajar yang aman, nyaman, gembira, dan ramah anak.',
  'Mendapatkan kasih sayang, perhatian, dan perlakuan yang adil dari seluruh guru dan warga sekolah.',
  'Menggunakan fasilitas sekolah (ruang kelas, perpustakaan, lapangan olahraga, taman baca) dengan pendampingan guru.',
  'Mengikuti kegiatan ekstrakurikuler (Pramuka Siaga/Penggalang, Seni, Olahraga, Keagamaan) sesuai minat dan bakat.',
  'Mendapatkan bimbingan dan perlindungan dari segala bentuk perundungan, kekerasan verbal, maupun fisik.'
];

const KEWAJIBAN = [
  'Menerapkan Budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) kepada Guru, Staf, Teman, dan Orang Tua.',
  'Hadir di sekolah tepat waktu dan mengikuti kegiatan pembelajaran dengan tertib.',
  'Menjaga kebersihan diri, kerapian pakaian, serta kebersihan lingkungan kelas dan sekolah.',
  'Saling menyayangi, menghormati, serta membantu sesama teman tanpa membeda-bedakan.'
];

const WAKTU_ROWS = [
  ['Kelas I', 'Senin–Jumat', '06.30 (pembiasaan) / 07.00 (KBM)', '09.00–09.15', '10.45 (Jumat: 09.00)'],
  ['Kelas II', 'Senin–Jumat', '06.30 (pembiasaan) / 07.00 (KBM)', '09.20–09.50', '11.35 (Jumat: 11.00)'],
  ['Kelas III', 'Senin–Jumat', '06.30 (pembiasaan) / 07.00 (KBM)', '09.20–09.50', '11.35'],
  ['Kelas IV', 'Senin–Jumat', '06.30 (pembiasaan) / 07.00 (KBM)', '09.20–09.50', '12.45 (Senin & Kamis: 12.10; Jumat: 11.00)'],
  ['Kelas V', 'Senin–Jumat', '06.30 (pembiasaan) / 07.00 (KBM)', '09.20–09.50', '13.20 (Jumat: 11.00)'],
  ['Kelas VI', 'Senin–Jumat', '06.30 (pembiasaan) / 07.00 (KBM)', '09.20–09.50', '12.45']
];

const ANTAR_JEMPUT = [
  'Murid wajib sudah berada di sekolah paling lambat 15 menit sebelum bel masuk (pukul 06.30 WIB).',
  'Pengantar / orang tua mengantar murid sampai batas Gerbang Ramah Anak (zona aman sekolah).',
  'Penjemputan dilakukan tepat waktu saat jam kepulangan. Murid yang belum dijemput wajib menunggu di area lobi / pos penjagaan sekolah bersama Guru Piket.',
  'Jika murid dijemput pihak luar selain orang tua / wali resmi, wajib konfirmasi terlebih dahulu kepada wali kelas.'
];

const SERAGAM_ROWS = [
  ['Senin–Selasa', 'Seragam Nasional SD (kemeja putih – celana/rok merah hati)', 'Dasi merah, topi SD, sabuk hitam, kaos kaki putih, sepatu hitam'],
  ['Rabu', 'Seragam batik resmi sekolah', 'Celana/rok putih atau merah, sepatu hitam'],
  ['Kamis', 'Seragam khas daerah / pakaian adat / pakaian olahraga (sesuai jadwal)', 'Aksesoris rapi dan sopan'],
  ['Jumat', 'Seragam Pramuka Siaga (Kelas I–III) / Penggalang (Kelas IV–VI)', 'Setangan leher/kacu, ring Pramuka, kaos kaki hitam, sepatu hitam']
];

const RAPI = [
  'Rambut murid putra dipotong rapi (pendek di atas kerah, tidak menutupi telinga/mata) dan tidak diwarnai.',
  'Murid putri berambut panjang mengikat atau mengepang rapi; yang memakai jilbab menggunakan jilbab kaos/polos sesuai warna yang disyaratkan.',
  'Kuku dipotong pendek dan bersih; tidak memakai perhiasan emas/mewah dan dilarang memakai cat kuku.'
];

const BEKAL = [
  'Murid disarankan membawa bekal makanan sehat dan botol minum (tumbler) sendiri dari rumah untuk mendukung Gerakan Sekolah Sehat.',
  'Murid wajib membawa buku pelajaran, alat tulis, dan perlengkapan sesuai jadwal hari yang berlaku.'
];

const LARANGAN = [
  'Telepon genggam / smartphone / smartwatch canggih — kecuali ada instruksi tertulis dari guru untuk pembelajaran tertentu.',
  'Mainan berbahaya, kartu remi/gambaran untuk perjudian, serta benda bertajam (pisau mainan, cutter tanpa pengawasan).',
  'Uang saku berlebihan yang dapat memicu risiko kehilangan atau kecemburuan sosial.',
  'Jajanan / makanan berbahaya yang mengandung zat pengawet / pewarna pekat.'
];

const ANTI_BULLY = [
  'Sekolah menerapkan kebijakan tanpa toleransi terhadap perundungan (bullying) — baik ejekan nama orang tua, julukan buruk, pemukulan, maupun pengucilan teman.',
  'Setiap murid yang merasa disakiti atau melihat temannya disakiti wajib segera melapor kepada wali kelas, guru piket, atau Tim TPPK sekolah.',
  'Penanganan kasus dilakukan melalui konseling edukatif ramah anak dengan melibatkan orang tua kedua belah pihak secara bijaksana.'
];

const SANKSI_ROWS = [
  ['Ringan (Tahap I)', 'Terlambat masuk kelas, tidak memakai atribut topi/dasi, membuang sampah sembarangan', 'Nasihat ramah, dialog motivasi, dan tugas pembenahan ringan (misal: merapikan rak buku/taman)', 'Wali kelas & guru piket'],
  ['Sedang (Tahap II)', 'Mengejek teman berkali-kali, membawa HP/mainan terlarang, merusak fasilitas sekolah', 'Pencatatan buku bimbingan, janji perbaikan diri, dan pemberitahuan tertulis kepada orang tua', 'Wali kelas & guru BK / TPPK'],
  ['Berat (Tahap III)', 'Berkelahi fisik, perundungan berat, meninggalkan lingkungan sekolah tanpa izin (membolos)', 'Pemanggilan orang tua, penyusunan Kesepakatan Bersama Pembinaan Karakter di Rumah & Sekolah', 'Kepala sekolah, TPPK, orang tua']
];

const REWARD_ROWS = [
  ['Bintang Kedisiplinan', 'Hadir tepat waktu dan berseragam lengkap selama 1 bulan berturut-turut', 'Pin Bintang Kedisiplinan & pengumuman saat upacara'],
  ['Murid Sahabat Kebaikan', 'Rajin menolong teman, suka berbagi, dan aktif menjaga kebersihan kelas', 'Piagam Karakter Mulia dari wali kelas'],
  ['Bintang Kejujuran', 'Mengembalikan barang/uang hilang yang ditemukan di area sekolah', 'Pujian khusus saat apel pagi & Sertifikat Kejujuran']
];

function Daftar({ items }) {
  return (
    <ul className="tatib-list">
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  );
}

export default function TataTertib() {
  const { data } = useSite();
  const m = data.meta;
  return (
    <>
      <div className="page-hero">
        <div className="page-hero__mesh" aria-hidden="true" />
        <div className="wrap page-hero__inner">
          <Reveal>
            <p className="eyebrow page-hero__eyebrow">Menu · Tata tertib</p>
            <h1>Tata tertib & kode etik</h1>
            <p className="page-hero__lede">Tata tertib dan kode etik peserta didik SD Negeri Pasirhalang tahun pelajaran 2026/2027 — disusun dengan pendekatan disiplin positif yang ramah anak.</p>
            <div className="page-hero__rule" aria-hidden="true" />
            <div className="page-hero__meta">
              <span>NPSN {m.npsn}</span>
              <span>Berlaku 2026/2027</span>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" id="tatib-dasar">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">Bab I / Dasar</p>
              <h2>Ketentuan umum & landasan</h2>
            </div>
            <GoldRule />
          </Reveal>
          <div className="dua-kolom">
            <Reveal>
              <h4 className="sub-judul">Pasal 1 — Ketentuan umum</h4>
              <Daftar items={DEFINISI.map(([k, v]) => `${k}: ${v}`)} />
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <h4 className="sub-judul">Pasal 2 — Landasan hukum</h4>
              <Daftar items={LANDASAN} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper" id="tatib-hak">
        <div className="wrap">
          <SectionHead kode="Bab II / Hak & kewajiban" title="Hak dan kewajiban murid" />
          <div className="dua-kolom">
            <Reveal>
              <h4 className="sub-judul">Pasal 3 — Hak peserta didik</h4>
              <Daftar items={HAK} />
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <h4 className="sub-judul">Pasal 4 — Kewajiban peserta didik</h4>
              <Daftar items={KEWAJIBAN} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="tatib-waktu">
        <div className="wrap">
          <SectionHead kode="Bab III / Waktu" title="Waktu sekolah & antar-jemput" desc="Pasal 5 — Jam operasional pembelajaran. Jam pulang kelas I mengikuti Jadwal Pelajaran Kelas I Tahun 2026." />
          <Reveal>
            <DataTable
              head={['Tingkat kelas', 'Hari', 'Jam masuk', 'Istirahat', 'Jam kepulangan']}
              rows={WAKTU_ROWS}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <h4 className="sub-judul">Pasal 6 — Pengantaran dan penjemputan</h4>
            <Daftar items={ANTAR_JEMPUT} />
          </Reveal>
        </div>
      </section>

      <section className="section section--paper" id="tatib-seragam">
        <div className="wrap">
          <SectionHead kode="Bab IV / Seragam" title="Seragam dan kerapian" />
          <Reveal>
            <h4 className="sub-judul">Pasal 7 — Jadwal pakaian seragam</h4>
            <DataTable head={['Hari', 'Ketentuan pakaian seragam', 'Kelengkapan & atribut']} rows={SERAGAM_ROWS} />
          </Reveal>
          <Reveal delay={0.08}>
            <h4 className="sub-judul">Pasal 8 — Kebersihan dan kerapian diri</h4>
            <Daftar items={RAPI} />
          </Reveal>
        </div>
      </section>

      <section className="section" id="tatib-barang">
        <div className="wrap">
          <SectionHead kode="Bab V / Perbekalan" title="Barang bawaan & larangan" />
          <div className="dua-kolom">
            <Reveal>
              <h4 className="sub-judul">Pasal 9 — Perbekalan sehat</h4>
              <Daftar items={BEKAL} />
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <h4 className="sub-judul">Pasal 10 — Barang yang dilarang</h4>
              <Daftar items={LARANGAN} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--merah" id="tatib-bully">
        <div className="wrap">
          <SectionHead kode="Bab VI / Perlindungan" title="Sekolah bebas perundungan" desc="Pasal 11 — Komitmen zero tolerance terhadap bullying dalam bentuk apa pun." />
          <Stagger className="akses-grid">
            {ANTI_BULLY.map((t, i) => (
              <Item key={i}>
                <div className="akses-card akses-card--teks">
                  <span className="mono">0{i + 1}</span>
                  <p>{t}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" id="tatib-sanksi">
        <div className="wrap">
          <SectionHead kode="Bab VII / Pembinaan" title="Disiplin positif & sanksi edukatif" desc="Tanpa hukuman fisik — persuasif, bertahap, dan melibatkan orang tua." />
          <Reveal>
            <DataTable head={['Tingkat pelanggaran', 'Contoh perilaku', 'Tindakan / pembinaan edukatif', 'Pihak terlibat']} rows={SANKSI_ROWS} />
          </Reveal>
          <Reveal delay={0.08}>
            <h4 className="sub-judul">Bab VIII — Penghargaan karakter positif</h4>
            <DataTable head={['Kategori apresiasi', 'Kriteria penilaian', 'Bentuk penghargaan']} rows={REWARD_ROWS} />
          </Reveal>
          <p className="catatan">Ditetapkan di Cikalongwetan, 2026 — Kepala Sekolah SD Negeri Pasirhalang, Ahmad, S.Pd. (NIP. 196805251992121003).</p>
        </div>
      </section>

      <section className="section section--paper" id="tatib-lampiran">
        <div className="wrap">
          <SectionHead kode="Lampiran resmi" title="Sumber resmi dinas" desc="Dokumen peraturan perundang-undangan yang menjadi rujukan pembinaan disiplin." />
          <Stagger className="kontak-cards">
            <Item>
              <div className="kontak-card">
                <span><FileText size={20} strokeWidth={1.5} /></span>
                <b>PP Nomor 53 Tahun 2010</b>
                <p>Disiplin Pegawai Negeri Sipil — Peraturan Pemerintah Republik Indonesia sebagai rujukan resmi pembinaan disiplin aparatur.</p>
                <div className="koordinat-aksi__tombol">
                  <a className="btn btn--merah" href={PDF_PP} target="_blank" rel="noopener noreferrer">Baca dokumen <ArrowUpRight size={14} /></a>
                  <a className="btn btn--ghost" href={PDF_PP} download="PP-53-2010-Disiplin-PNS.pdf"><Download size={15} /> Unduh PDF</a>
                </div>
              </div>
            </Item>
            <Item>
              <div className="kontak-card">
                <span><Scale size={20} strokeWidth={1.5} /></span>
                <b>Dokumen sekolah</b>
                <p>Tata tertib dan kode etik peserta didik di atas mengacu pada UU Sisdiknas, UU Perlindungan Anak, dan Permendikbudristek PPKSP.</p>
                <div className="koordinat-aksi__tombol">
                  <a className="btn btn--ghost" href="#tatib-dasar">Kembali ke Bab I <ArrowUpRight size={14} /></a>
                </div>
              </div>
            </Item>
          </Stagger>
        </div>
      </section>
    </>
  );
}
