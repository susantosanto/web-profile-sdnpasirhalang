import { useState } from 'react';
import { useSite } from '../App';
import { asset } from '../config';
import { pad } from '../lib/site';
import { CountUp, GoldRule, Item, Reveal, Stagger } from '../components/motion';
import { DataTable, KeyValue, SectionHead } from '../components/Ui';
import Kalender from '../components/Kalender';
import Jadwal from '../components/Jadwal';

const GURU = [
  { nama: 'Ahmad, S.Pd.', foto: 'guru/ahmad.jpg', peran: 'PLT Kepala Sekolah · Wali Kelas 1', status: 'PNS', jenis: 'Guru Kelas', pend: 'S1 Guru Kelas SD/MI', tmt: '1992', mapel: 'Guru Kelas, Mulok Bahasa Daerah, PJOK', jjm: 30 },
  { nama: 'Deni Mulyani, S.Pd.', foto: null, peran: 'Wali Kelas 6', status: 'PPPK', jenis: 'Guru Kelas', pend: 'S1 FKIP', tmt: '2022', mapel: 'Guru Kelas, Mulok, PJOK', jjm: 30 },
  { nama: 'Fika Agustina, S.Pd.', foto: 'guru/fika.jpg', peran: 'Wali Kelas 2', status: 'PPPK', jenis: 'Guru Kelas', pend: 'S1 · Sertifikasi Guru Kelas SD/MI', tmt: '2022', mapel: 'Guru Kelas, Mulok, PJOK', jjm: 30 },
  { nama: 'Herman', foto: null, peran: 'Penjaga Sekolah', status: 'Honor Sekolah', jenis: 'Tenaga Kependidikan', pend: 'SD/sederajat', tmt: '2010', mapel: '—', jjm: 0 },
  { nama: 'Meyta Murthy Lasari, S.E.', foto: null, peran: 'Wali Kelas 5a', status: 'Guru Honor Sekolah', jenis: 'Guru Kelas', pend: 'S1 Manajemen', tmt: '2023', mapel: 'Guru Kelas, B. Inggris, Mulok, PJOK', jjm: 40 },
  { nama: "Nur'Asiah, S.Pd.", foto: 'guru/nurasiah.jpg', peran: 'Guru PAI', status: 'PPPK Paruh Waktu', jenis: 'Guru Agama Islam', pend: 'S1 Ilmu Pendidikan Agama Islam', tmt: '2025', mapel: 'PAI dan Budi Pekerti', jjm: 28 },
  { nama: 'Rinda Sri Agung Wahyuni, S.Pd.', foto: 'guru/rinda.jpg', peran: 'Wali Kelas 4', status: 'PPPK', jenis: 'Guru Kelas', pend: 'S1 FKIP · Sertifikasi Guru Kelas', tmt: '2022', mapel: 'Guru Kelas, Mulok, PJOK', jjm: 30 },
  { nama: 'Siti Aisah Nur Fitri, S.Pd.', foto: 'guru/siti-aisah.jpg', peran: 'Wali Kelas 5b', status: 'PPPK Paruh Waktu', jenis: 'Guru Kelas', pend: 'S1 Pendidikan Matematika', tmt: '2025', mapel: 'Guru Kelas, Mulok, PJOK', jjm: 30 },
  { nama: 'Susanto, S.Kom.', foto: 'guru/susanto.png', peran: 'Tenaga Administrasi Sekolah', status: 'PPPK Paruh Waktu', jenis: 'Tenaga Kependidikan', pend: 'S1 Sistem Informasi (Ilmu Komputer)', tmt: '2025', mapel: '—', jjm: 0 },
  { nama: 'Vani, S.Ag.', foto: 'guru/vani.jpg', peran: 'Wali Kelas 3', status: 'Guru Honor Sekolah', jenis: 'Guru Kelas', pend: 'S1 Ilmu Al-Qur’an dan Tafsir', tmt: '2023', mapel: 'Guru Kelas, Mulok, PJOK', jjm: 30 },
];

function inisial(nama) {
  return nama.replace(/,.*$/, '').split(/[\s.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

const PERSONEL_TUGAS = {
  'Ahmad, S.Pd.': 'Wali Kelas I',
  'Fika Agustina, S.Pd.': 'Wali Kelas II',
  'Vani, S.Ag.': 'Wali Kelas III',
  'Rinda Sri Agung Wahyuni, S.Pd.': 'Wali Kelas IV',
  'Meyta Murthy Lasari, S.E.': 'Wali Kelas V-A',
  'Siti Aisah Nur Fitri, S.Pd.': 'Wali Kelas V-B',
  'Deni Mulyani, S.Pd.': 'Wali Kelas VI',
  "Nur'Asiah, S.Pd.": 'Guru PAI',
  'Susanto, S.Kom.': 'Pengelola sarana prasarana',
  'Herman': 'Pengelola sarana prasarana'
};

const FILTER_GURU = [
  ['semua', 'Semua'],
  ['kelas', 'Guru kelas'],
  ['mapel', 'Guru mapel'],
  ['tendik', 'Tendik']
];

const cocokGuru = (g, f) =>
  f === 'semua' ||
  (f === 'kelas' && g.jenis === 'Guru Kelas') ||
  (f === 'mapel' && g.jenis === 'Guru Agama Islam') ||
  (f === 'tendik' && g.jenis.includes('Kependidikan'));

const fotoOf = (nama) => (GURU.find((g) => g.nama === nama) || {}).foto || null;
const imgSrc = (nama) => { const f = fotoOf(nama); return f ? asset(`images/${f}`) : null; };

const URAIAN = [
  ['Kepala Sekolah', 'Memimpin dan mengelola satuan pendidikan; menyusun perencanaan (visi, misi, RKJM, RKT, RKAS); membina dan mengawasi pendidik dan tenaga kependidikan; melaksanakan supervisi; memimpin SPMI; mengelola sarana, keuangan, dan administrasi; menjalin kemitraan dengan komite dan masyarakat.'],
  ['Koordinator Kurikulum dan Pembelajaran', 'Membantu menyusun dan mengembangkan kurikulum satuan pendidikan; mengoordinasikan jadwal, perangkat ajar, dan asesmen; mendampingi guru dalam pembelajaran; membantu pelaksanaan supervisi.'],
  ['Koordinator Kesiswaan dan Karakter', 'Mengoordinasikan penerimaan peserta didik baru, pembiasaan karakter, ekstrakurikuler, dan perlindungan murid; mendata prestasi dan kehadiran peserta didik.'],
  ['Koordinator Sarana Prasarana', 'Mengoordinasikan pendataan, pemeliharaan, dan penggunaan sarana prasarana; mengelola inventaris barang dan bangunan; mengusulkan kebutuhan perbaikan dan pengadaan.'],
  ['Koordinator Kemitraan / Humas', 'Mengoordinasikan hubungan dengan orang tua, komite, dan masyarakat; menyusun kegiatan kemitraan belajar; mengelola publikasi kegiatan sekolah.'],
  ['Wali Kelas / Guru Kelas', 'Merencanakan, melaksanakan, dan menilai pembelajaran di kelas; mengelola kelas; membimbing murid; melaporkan hasil belajar kepada orang tua; melaksanakan refleksi dan tindak lanjut.'],
  ['Guru PAI / PJOK / Muatan Lain', 'Melaksanakan pembelajaran mata pelajaran yang diampu; mengembangkan perangkat ajar dan asesmen; mendukung kegiatan pembiasaan dan ekstrakurikuler.'],
  ['Tenaga Administrasi / Operator', 'Mengelola administrasi persuratan, kepegawaian, peserta didik, dan keuangan; mengelola data Dapodik dan aplikasi pendukung; menyiapkan laporan.'],
  ['Pustakawan / Pengelola Perpustakaan', 'Mengelola koleksi, sirkulasi, dan tata tertib perpustakaan; mendukung budaya baca dan tulis; menyusun laporan tahunan perpustakaan.'],
  ['Komite Sekolah', 'Memberi pertimbangan, dukungan, pengawasan, dan mediasi dalam penyelenggaraan pendidikan; menjadi unsur dalam Tim Penjaminan Mutu.'],
  ['Tim Penjaminan Mutu', 'Mengoordinasikan pelaksanaan SPMI; melakukan pembinaan dan pendampingan; melaksanakan pemetaan mutu; melakukan pemantauan dan evaluasi; memberikan rekomendasi strategi pemenuhan mutu.']
];

const WALI = [
  ['I', 'Ahmad, S.Pd.'],
  ['II', 'Fika Agustina, S.Pd.'],
  ['III', 'Vani, S.Ag.'],
  ['IV', 'Rinda Sri Agung Wahyuni, S.Pd.'],
  ['V-A', 'Meyta Murthy Lasari, S.E.'],
  ['V-B', 'Siti Aisah Nur Fitri, S.Pd.'],
  ['VI', 'Deni Mulyani, S.Pd.']
];

function OrgFoto({ nama, ukuran = 44 }) {
  const src = imgSrc(nama);
  if (src) return (<span className="org__foto"><img src={src} alt={`Foto ${nama}`} loading="lazy" /></span>);
  return (<span className="org__foto org__foto--inisial">{inisial(nama)}</span>);
}

export default function Profil() {
  const { data } = useSite();
  const p = data.profil;
  const m = data.meta;
  const [filterGuru, setFilterGuru] = useState('semua');
  const daftarGuru = GURU.filter((g) => cocokGuru(g, filterGuru));
  const cari = (label) => (p.identitas.find(([k]) => k === label) || [])[1] || '—';

  return (
    <>
      <div className="page-hero">
        <div className="page-hero__mesh" aria-hidden="true" />
        <div className="wrap page-hero__inner">
          <Reveal>
            <p className="eyebrow page-hero__eyebrow">Menu · Profil sekolah</p>
            <h1>Profil sekolah</h1>
            <p className="page-hero__lede">Data identitas, murid, pendidik dan tenaga kependidikan, serta prasarana. Seluruh angka bersumber dari unduhan Dapodik 27 Oktober 2026 dan nilai baku yang diverifikasi pada proyek PKKS.</p>
            <div className="page-hero__rule" aria-hidden="true" />
            <div className="page-hero__meta">
              <span>NPSN {m.npsn}</span>
              <span>{m.sumberProfil}</span>
              <span>Diperbarui {m.diperbarui}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" id="profil-statistik">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">01 / Data pokok</p>
              <h2>Sekolah dalam angka</h2>
            </div>
            <GoldRule />
          </Reveal>
          <Stagger className="stat-grid stat-grid--profil">
            {p.statistik.map((s) => (
              <Item className="stat-card" key={s.label}>
                <div className="stat-card__value"><CountUp value={s.value} /></div>
                <b>{s.label}</b>
                <small>{s.note}</small>
              </Item>
            ))}
          </Stagger>
          <Reveal className="catatan">Sumber: {m.sumberProfil}. {p.catatanData}</Reveal>
        </div>
      </section>

      <section className="section section--paper" id="profil-identitas">
        <div className="wrap">
          <SectionHead kode="02 / Identitas" title="Identitas dan data periodik" />
          <div className="identitas-dossier">
            <Reveal className="identitas-ringkas" variant="zoom">
              <p className="eyebrow identitas-ringkas__eyebrow">Nomor Pokok Sekolah Nasional</p>
              <div className="identitas-ringkas__npsn">{cari('NPSN')}</div>
              <h3>{cari('Nama satuan pendidikan')}</h3>
              <div className="identitas-ringkas__chips">
                <span>{cari('Jenjang / status')}</span>
                <span>MBS · {cari('Manajemen berbasis sekolah')}</span>
                <span>{cari('Waktu penyelenggaraan')}</span>
              </div>
              <div className="identitas-ringkas__hr" aria-hidden="true" />
              <dl>
                <div><dt>Kepala sekolah</dt><dd>{cari('Kepala sekolah')}</dd></div>
                <div><dt>Tahun ajaran</dt><dd>{cari('Tahun ajaran')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={0.12} variant="right">
              <dl className="identitas-daftar">
                {p.identitas.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="profil-struktur">
        <div className="wrap">
          <SectionHead kode="03 / Struktur" title="Struktur organisasi" desc="Bagan organisasi dan pembagian tugas tahun pelajaran 2026/2027 — mengacu Permendikdasmen No. 26 Tahun 2025 tentang Standar Pengelolaan dan SK Kepala Sekolah." />
          <div className="org">
            <p className="org__label">Pimpinan dan pembina</p>
            <Stagger className="org__puncak">
              <Item className="org__node">
                <span className="org__peran">Komite sekolah</span>
                <b>Salimudin</b>
                <small>Garis koordinasi</small>
              </Item>
              <Item className="org__node org__node--kepala">
                <OrgFoto nama="Ahmad, S.Pd." />
                <span className="org__peran">Kepala sekolah</span>
                <b>Ahmad, S.Pd.</b>
                <small>Tahun pelajaran 2026/2027</small>
              </Item>
              <Item className="org__node">
                <span className="org__peran">Pengawas sekolah</span>
                <b>Dr. Atikah Sari, M.Pd.</b>
                <small>Alur pembinaan</small>
              </Item>
            </Stagger>
            <span className="org__hub" aria-hidden="true" />
            <p className="org__label">Tim sekolah</p>
            <Stagger className="org__tim">
              <Item className="org__node org__node--tim">
                <span className="org__peran">Tim penjaminan mutu (SPMI)</span>
                <b>Ketua: Ahmad, S.Pd.</b>
                <small>Sekretaris: Susanto, S.Kom.</small>
              </Item>
              <Item className="org__node org__node--tim">
                <span className="org__peran">Tim pengembang kurikulum</span>
                <b>Ketua: Deni Mulyani, S.Pd.</b>
                <small>Sekretaris: Susanto, S.Kom.</small>
              </Item>
            </Stagger>
            <span className="org__hub" aria-hidden="true" />
            <p className="org__label">Koordinator bidang</p>
            <Stagger className="org__koor">
              {[
                ['Kurikulum & pembelajaran', 'Deni Mulyani, S.Pd.'],
                ['Kesiswaan & karakter', 'Rinda Sri Agung Wahyuni, S.Pd.'],
                ['Sarana prasarana', 'Susanto, S.Kom.'],
                ['Kemitraan / humas', 'Siti Aisah Nur Fitri, S.Pd.']
              ].map(([bidang, nama]) => (
                <Item key={bidang} className="org__node org__node--koor">
                  <OrgFoto nama={nama} />
                  <span className="org__peran">{bidang}</span>
                  <b>{nama}</b>
                </Item>
              ))}
            </Stagger>
            <span className="org__hub" aria-hidden="true" />
            <p className="org__label">Pelaksana</p>
            <div className="org__dua">
              <Reveal className="org__panel">
                <p className="org__panel-judul">Pendidik — wali kelas</p>
                <ul className="org__wali">
                  {WALI.map(([kls, nama]) => (
                    <li key={kls}><OrgFoto nama={nama} /><span><b>Kelas {kls}</b><small>{nama}</small></span></li>
                  ))}
                  <li><OrgFoto nama="Nur'Asiah, S.Pd." /><span><b>Guru PAI</b><small>Nur'Asiah, S.Pd.</small></span></li>
                </ul>
                <p className="org__panel-catatan">Guru PJOK dan muatan lain (Bahasa Inggris / Bahasa Daerah) dirangkap guru kelas.</p>
              </Reveal>
              <Reveal delay={0.1} variant="right" className="org__panel">
                <p className="org__panel-judul">Tenaga kependidikan</p>
                <ul className="org__wali">
                  <li><OrgFoto nama="Susanto, S.Kom." /><span><b>Administrasi</b><small>Susanto, S.Kom.</small></span></li>
                  <li><OrgFoto nama="Herman" /><span><b>Penjaga sekolah</b><small>Herman</small></span></li>
                </ul>
                <p className="org__panel-catatan">Mengelola administrasi, data Dapodik, serta pemeliharaan sarana prasarana.</p>
              </Reveal>
            </div>
            <span className="org__hub" aria-hidden="true" />
            <Reveal className="org__dasar">
              <span className="org__peran">Penerima layanan</span>
              <b>Peserta didik dan orang tua / wali</b>
              <small>Perwakilan: Salimudin</small>
            </Reveal>
          </div>

          <details className="koreksi org__uraian">
            <summary>Uraian tugas dan tanggung jawab — 11 jabatan</summary>
            <table className="tbl">
              <thead><tr><th>Jabatan</th><th>Tugas dan tanggung jawab</th></tr></thead>
              <tbody>
                {URAIAN.map(([jabatan, tugas]) => (
                  <tr key={jabatan}><td className="lbl"><b>{jabatan}</b></td><td>{tugas}</td></tr>
                ))}
              </tbody>
            </table>
          </details>
          <p className="catatan">Sumber: dokumen 3.2 Struktur Organisasi dan Pembagian Tugas. NIP/NUPTK tidak ditampilkan pada situs publik.</p>
        </div>
      </section>

      <section className="section" id="profil-guru">
        <div className="wrap">
          <SectionHead kode="04 / Pendidik" title="Dewan guru & tendik" desc="10 pendidik dan tenaga kependidikan SDN Pasirhalang — data pokok Dapodik 27 Oktober 2026. NUPTK, NIP, NIK dan tanggal lahir tidak ditampilkan." />
          <div className="chip-row" role="tablist" aria-label="Saring dewan guru">
            {FILTER_GURU.map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={filterGuru === id} className={`chip${filterGuru === id ? ' is-aktif' : ''}`} onClick={() => setFilterGuru(id)}>{label}</button>
            ))}
          </div>
          <Stagger className="dossier-list">
            {daftarGuru.map((g, i) => (
              <Item key={g.nama} className={i % 2 ? 'dossier-balik' : ''}>
                <article className="dossier-card">
                  {g.foto ? (
                    <span className="dossier-visual"><img src={asset(`images/${g.foto}`)} alt={`Foto ${g.nama}`} loading="lazy" /></span>
                  ) : (
                    <span className="dossier-visual dossier-visual--mono" aria-hidden="true">{inisial(g.nama)}</span>
                  )}
                  <div className="dossier-badan">
                    <span className="org__peran">{g.jenis}</span>
                    <b>{g.nama}</b>
                    <small>{g.peran}</small>
                    <div className="dossier-tags">
                      <span className={`tag ${g.status.includes('Honor') ? 'tag--emas' : 'tag--merah'}`}>{g.status}</span>
                      <span className="tag">TMT {g.tmt}</span>
                      {g.jjm > 0 && <span className="tag">{g.jjm} JP / pekan</span>}
                    </div>
                    <dl>
                      <div><dt>Pendidikan</dt><dd>{g.pend}</dd></div>
                      <div><dt>Ampuan</dt><dd>{g.mapel}</dd></div>
                      <div><dt>Tugas tambahan</dt><dd>{PERSONEL_TUGAS[g.nama] || '—'}</dd></div>
                    </dl>
                  </div>
                </article>
              </Item>
            ))}
          </Stagger>
          <p className="catatan">Menampilkan {daftarGuru.length} dari 10 pendidik dan tenaga kependidikan.</p>
        </div>
      </section>

      <section className="section section--paper" id="profil-rombongan">
        <div className="wrap">
          <SectionHead kode="05 / Rombongan" title="Rombongan belajar" desc="7 rombongan belajar pada 6 ruang kelas — kelas 4 memakai Ruang Guru, kelas 5a memakai Ruang Kelas 4, dan kelas 5b memakai Ruang Kelas 5." />
          <Reveal>
            <DataTable
              head={['Kelas', 'Tingkat', 'L', 'P', 'Jumlah', 'Wali kelas', 'Kurikulum', 'Ruang']}
              rows={p.rombongan.map((r) => [r.nama, r.tingkat, r.L, r.P, r.total, r.wali, r.kurikulum, r.ruang])}
            />
          </Reveal>
        </div>
      </section>

      <section className="section" id="profil-ptk">
        <div className="wrap">
          <SectionHead kode="06 / Kepegawaian" title="Pendidik dan tenaga kependidikan" />
          <div className="dua-kolom">
            <Reveal>
              <div className="ptk-total">
                <span className="ptk-total__angka"><CountUp value={p.ptk.total} /></span>
                <span><b>orang</b><small>6 ASN · 4 non-ASN</small></span>
              </div>
              <h4 className="sub-judul">Berdasarkan status kepegawaian</h4>
              <KeyValue rows={p.ptk.status.map((s) => [s.label, `${s.jumlah} orang`])} />
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <h4 className="sub-judul">Berdasarkan jenis tugas</h4>
              <KeyValue rows={p.ptk.jenis.map((s) => [s.label, `${s.jumlah} orang`])} />
              <p className="catatan">{p.catatanPrivasi}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Kalender />
      <Jadwal />

      <section className="section section--paper" id="profil-prasarana">
        <div className="wrap">
          <SectionHead kode="09 / Prasarana" title="Prasarana" desc="16 ruang dan fasilitas yang tercatat pada unduhan Dapodik." />
          <Reveal>
            <DataTable
              head={['No', 'Nama prasarana', 'Ukuran']}
              rows={p.prasarana.map((r) => [r.no, r.nama, r.ukuran])}
            />
          </Reveal>
        </div>
      </section>

    </>
  );
}
