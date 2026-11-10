import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, FolderOpen, Images } from 'lucide-react';
import { useSite } from '../App';
import { GAMBAR } from '../config';
import LogoSekolah from '../components/LogoSekolah';
import { CountUp, EASE, GoldRule, Item, Reveal, Stagger } from '../components/motion';
import { KeyValue, SectionHead, StatTile } from '../components/Ui';
import Hero from '../components/Hero';
import { pad } from '../lib/site';

const MISI = [
  'Menanamkan keyakinan terhadap Tuhan Yang Maha Esa',
  'Menyiapkan generasi unggul yang memiliki potensi di bidang IMTAQ dan IPTEK',
  'Membentuk sumber daya manusia yang aktif, kreatif, inovatif sesuai dengan perkembangan zaman',
  'Meningkatkan kualitas dan efektivitas PBM melalui pendekatan pembelajaran yang berpusat pada siswa',
  'Membina dan mengembangkan budi pekerti luhur menuju bangsa yang santun',
  'Menciptakan lingkungan sekolah yang bersih, rindang, indah, nyaman dan sehat',
  'Selalu membudayakan sikap 5S (salam, senyum, sapa, sopan, dan santun)',
  'Menerapkan partisipasi dengan melibatkan warga sekolah/stakeholder untuk kemandirian sekolah/MBS',
  'Membangun citra sekolah sebagai mitra terpercaya di masyarakat',
  'Meningkatkan profesionalisme guru sesuai dengan tupoksinya melalui berbagai kegiatan pelatihan dan bimbingan pendidikan',
  'Menumbuhkan budaya baca bagi warga sekolah'
];

export default function Beranda() {
  const { data } = useSite();
  const m = data.meta;

  return (
    <>
      <Hero data={data} />

      <section className="section section--stats" id="beranda-statistik">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">01 / Data pokok</p>
              <h2>Sekolah dalam angka</h2>
            </div>
            <GoldRule />
          </Reveal>
          <Stagger className="stat-grid">
            {data.profil.statistik.map((s, i) => (
              <Item key={s.label} className="stat-card">
                <span className="stat-card__no">{pad(i + 1)}</span>
                <div className="stat-card__value"><CountUp value={s.value} /></div>
                <b>{s.label}</b>
                <small>{s.note}</small>
              </Item>
            ))}
          </Stagger>
          <Reveal className="catatan">Sumber: {m.sumberProfil}. {data.profil.catatanData}</Reveal>
        </div>
      </section>

      <section className="section section--paper" id="beranda-identitas">
        <div className="wrap">
          <SectionHead kode="02 / Identitas" title="Sekolah Dasar Negeri Pasirhalang" />
          <div className="identitas-grid">
            <Reveal className="lambang-card lambang-card--baru" variant="zoom">
              <motion.span
                className="lambang-baru"
                whileHover={{ scale: 1.045, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              >
                <LogoSekolah size={172} />
              </motion.span>
              <div className="lambang-card__ring" aria-hidden="true" />
              <p className="lambang-card__judul">Identitas sekolah</p>
              <div className="lambang-card__pemerintah">
                <img src={GAMBAR.logoKbb} alt="Logo Pemerintah Kabupaten Bandung Barat" />
                <span>Di bawah naungan<br /><b>Pemerintah Kabupaten Bandung Barat</b></span>
              </div>
            </Reveal>

            <Reveal delay={0.12} variant="right">
              <KeyValue rows={data.profil.identitas.slice(0, 9)} />
              <p className="catatan"><a href="#profil">Lihat profil lengkap, rombongan belajar, dan sarana prasarana →</a></p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper" id="beranda-prakata">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">03 / Prakata</p>
              <h2>Sambutan Plt. Kepala Sekolah</h2>
            </div>
            <GoldRule />
          </Reveal>
          <div className="prakata-grid">
            <Reveal className="prakata-foto" variant="zoom">
              <img src={GAMBAR.kepalaSekolah} alt="Foto Plt. Kepala Sekolah SD Negeri Pasirhalang, Ahmad, S.Pd." />
              <div className="prakata-foto__nama">
                <b>Ahmad, S.Pd.</b>
                <small>Plt. Kepala Sekolah</small>
              </div>
            </Reveal>
            <Reveal delay={0.12} variant="right">
              <div className="editorial prakata-teks">
                <p className="prakata-quote">“Setiap anak yang melangkahkan kaki ke sekolah ini membawa cahaya dan harapan. Tugas kamilah — dengan segenap hati — menuntun cahaya itu tumbuh menjadi pribadi yang berbudi luhur, unggul dalam prestasi, serta santun dan berkarakter, hingga kelak menerangi keluarga, masyarakat, dan bangsanya.”</p>
                <p className="prakata-drop">Assalamu’alaikum warahmatullahi wabarakatuh. Visi tersebut menjadi kompas seluruh langkah kami: menanamkan keyakinan kepada Tuhan Yang Maha Esa, menyiapkan generasi yang unggul dalam IMTAQ dan IPTEK, serta membentuk insan yang aktif, kreatif, dan inovatif mengikuti perkembangan zaman.</p>
                <p>Untuk mewujudkannya, seluruh program sekolah kami jalankan dengan sungguh-sungguh: pembelajaran yang berpusat pada siswa, pembinaan budi pekerti menuju bangsa yang santun, budaya 5S — salam, senyum, sapa, sopan, santun — yang hidup setiap hari, lingkungan yang bersih, rindang, dan nyaman, budaya baca yang terus tumbuh, serta profesionalisme guru yang senantiasa diasah. Melalui media informasi ini, profil, program, dan dokumentasi kegiatan sekolah kami sajikan secara terbuka sebagai wujud akuntabilitas sekaligus undangan untuk bertumbuh bersama.</p>
                <p>Ke depan, kami berkomitmen menjaga setiap amanah yang dititipkan: mendidik dengan keteladanan, membimbing dengan kesabaran, dan mengantar setiap anak mencapai potensi terbaiknya. Semoga setiap ikhtiar kita dimudahkan, dan dari Pasirhalang yang sederhana ini tumbuh generasi yang berilmu, berakhlak, serta bermanfaat bagi sesama.</p>
                <p className="prakata-salam">Wassalamu’alaikum warahmatullahi wabarakatuh.</p>
                <p className="prakata-ttd"><b>Ahmad, S.Pd.</b><small>Plt. Kepala Sekolah · SD Negeri Pasirhalang</small></p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="beranda-arah">
        <div className="wrap">
          <SectionHead kode="04 / Arah sekolah" title="Visi, misi & tujuan" desc="Ditetapkan dalam Kurikulum Operasional Satuan Pendidikan tahun ajaran 2026/2027 dan berlaku hingga 2029/2030." />
          <Reveal>
            <div className="note-card note-card--visi"><span className="note-card--visi__eyebrow">Visi · Tahun pelajaran 2026/2027 s.d. 2029/2030</span><b>“Mewujudkan siswa SDN Pasirhalang yang berbudi luhur, prima dalam prestasi, santun dan berkarakter.”</b><span className="note-card--visi__orn" aria-hidden="true">— ◆ —</span></div>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="langkah langkah--misi">
              {MISI.map((isi, i) => (
                <li key={isi}><span>{pad(i + 1)}</span><div><b>Misi {pad(i + 1)}.</b><p>{isi}.</p></div></li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--merah" id="beranda-akses">
        <div className="wrap">
          <Reveal className="section__intro section__intro--terang">
            <div>
              <p className="eyebrow">05 / Jelajahi</p>
              <h2>Kenali sekolah kami</h2>
            </div>
            <GoldRule />
          </Reveal>
          <Stagger className="akses-grid">
            <Item>
              <motion.a className="akses-card" href="#profil" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <span className="akses-card__icon"><FolderOpen size={22} strokeWidth={1.5} /></span>
                <span className="mono">01 / PROFIL SEKOLAH</span>
                <strong>Identitas & data pokok</strong>
                <p>NPSN, rombongan belajar, dewan guru, prasarana, dan jadwal pelajaran.</p>
                <em>Buka profil <ArrowUpRight size={15} /></em>
              </motion.a>
            </Item>
            <Item>
              <motion.a className="akses-card" href="#profil-jadwal" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <span className="akses-card__icon"><CalendarDays size={22} strokeWidth={1.5} /></span>
                <span className="mono">02 / JADWAL & KALENDER</span>
                <strong>KBM dan agenda setahun</strong>
                <p>Jadwal pelajaran kelas 1–6 serta kalender pendidikan 2026/2027.</p>
                <em>Lihat jadwal <ArrowUpRight size={15} /></em>
              </motion.a>
            </Item>
            <Item>
              <motion.a className="akses-card" href="#foto/galeri" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <span className="akses-card__icon"><Images size={22} strokeWidth={1.5} /></span>
                <span className="mono">03 / GALERI FOTO</span>
                <strong>Galeri dokumentasi</strong>
                <p>Jelajahi foto kegiatan sekolah yang telah terdokumentasi per kategori.</p>
                <em>Buka galeri <ArrowUpRight size={15} /></em>
              </motion.a>
            </Item>
          </Stagger>
        </div>
      </section>

      <section className="section" id="beranda-kunjung">
        <div className="wrap">
          <SectionHead kode="06 / Kunjungi" title="Pintu kami terbuka untuk Anda" desc="Kepercayaan terjalin dari perjumpaan. Untuk pendaftaran murid baru, mutasi, maupun keperluan administrasi, silakan datang langsung atau hubungi kami pada jam layanan." />
          <div className="dua-kolom">
            <Reveal>
              <div className="editorial">
                <p className="eyebrow">Kp. Pasirhalang · Cikalongwetan</p>
                <h3>Silaturahmi adalah awal kepercayaan</h3>
                <p>Kami mengundang Bapak/Ibu untuk datang dan melihat langsung suasana belajar di SD Negeri Pasirhalang — menyapa para guru, meninjau ruang kelas dan prasarana, serta berdialog mengenai pendidikan putra-putri Anda. Kunjungan rombongan atau keperluan resmi sebaiknya dikonfirmasi terlebih dahulu agar kami dapat menyambut dengan sebaik-baiknya.</p>
                <div className="kunjung-aksi">
                  <a className="btn btn--merah" href="#kontak">Buka halaman kontak <ArrowUpRight size={15} /></a>
                  <a className="btn btn--ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.lintang + ',' + m.bujur)}`} target="_blank" rel="noopener noreferrer">Lihat peta <ArrowUpRight size={15} /></a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <KeyValue rows={[
                ['Alamat', m.alamat],
                ['Telepon', m.telepon],
                ['Email', m.email],
                ['Jam layanan', 'Senin–Jumat · jam sekolah']
              ]} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
