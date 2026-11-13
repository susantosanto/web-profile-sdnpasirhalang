import { useSite } from '../App';
import { asset } from '../config';
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

export default function Profil() {
  const { data } = useSite();
  const p = data.profil;
  const m = data.meta;
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

      <section className="section" id="profil-guru">
        <div className="wrap">
          <SectionHead kode="03 / Pendidik" title="Dewan guru & tendik" desc="10 pendidik dan tenaga kependidikan SDN Pasirhalang — data pokok Dapodik 27 Oktober 2026. NUPTK, NIP, NIK dan tanggal lahir tidak ditampilkan." />
          <Stagger className="guru-grid">
            {GURU.map((g) => (
              <Item key={g.nama} className="guru-card">
                {g.foto ? (
                  <span className="guru-card__foto"><img src={asset(`images/${g.foto}`)} alt={`Foto ${g.nama}`} loading="lazy" /></span>
                ) : (
                  <span className="guru-card__avatar guru-card__avatar--lengkap">{inisial(g.nama)}</span>
                )}
                <div className="guru-card__badan">
                <span className={`tag ${g.jenis.includes('Kependidikan') ? 'tag--emas' : 'tag--merah'}`}>{g.jenis}</span>
                <b>{g.nama}</b>
                <small className="guru-card__peran">{g.peran}</small>
                <dl>
                  <div><dt>Status</dt><dd>{g.status}</dd></div>
                  <div><dt>Pendidikan</dt><dd>{g.pend}</dd></div>
                  <div><dt>TMT</dt><dd>{g.tmt}</dd></div>
                  <div><dt>Ampuan</dt><dd>{g.mapel}</dd></div>
                  {g.jjm > 0 && <div><dt>JJM</dt><dd>{g.jjm} JP</dd></div>}
                </dl>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--paper" id="profil-rombongan">
        <div className="wrap">
          <SectionHead kode="04 / Rombongan" title="Rombongan belajar" desc="7 rombongan belajar pada 6 ruang kelas — kelas 4 memakai Ruang Guru, kelas 5a memakai Ruang Kelas 4, dan kelas 5b memakai Ruang Kelas 5." />
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
          <SectionHead kode="05 / Kepegawaian" title="Pendidik dan tenaga kependidikan" />
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
          <SectionHead kode="08 / Prasarana" title="Prasarana" desc="16 ruang dan fasilitas yang tercatat pada unduhan Dapodik." />
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
