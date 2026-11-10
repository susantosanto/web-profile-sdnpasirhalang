import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Camera, FolderOpen, Images } from 'lucide-react';
import { useSite } from '../App';
import { GAMBAR } from '../config';
import LogoSekolah from '../components/LogoSekolah';
import { CountUp, EASE, GoldRule, Item, Reveal, Stagger } from '../components/motion';
import { ActionLink, KeyValue, SectionHead, StatTile } from '../components/Ui';
import Hero from '../components/Hero';
import { pad } from '../lib/site';

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
                <p className="prakata-quote">“Visi sekolah ini adalah janji kami — kepada setiap anak dan setiap orang tua — bahwa dari gerbang SD Negeri Pasirhalang, putra-putri kita diantar tumbuh menjadi pribadi yang berbudi luhur, prima dalam prestasi, santun dan berkarakter.”</p>
                <p>Assalamu’alaikum warahmatullahi wabarakatuh. Visi tersebut menjadi kompas seluruh langkah kami: menanamkan keyakinan kepada Tuhan Yang Maha Esa, menyiapkan generasi yang unggul dalam IMTAQ dan IPTEK, serta membentuk insan yang aktif, kreatif, dan inovatif mengikuti perkembangan zaman.</p>
                <p>Untuk mewujudkannya, seluruh program sekolah kami jalankan dengan sungguh-sungguh: pembelajaran yang berpusat pada siswa, pembinaan budi pekerti menuju bangsa yang santun, budaya 5S — salam, senyum, sapa, sopan, santun — yang hidup setiap hari, lingkungan yang bersih, rindang, dan nyaman, budaya baca yang terus tumbuh, serta profesionalisme guru yang senantiasa diasah. Melalui media informasi ini, profil, program, dan dokumentasi kegiatan sekolah kami sajikan secara terbuka sebagai wujud akuntabilitas sekaligus undangan untuk bertumbuh bersama.</p>
                <p>Kepada Bapak/Ibu orang tua dan seluruh masyarakat, kami menyampaikan terima kasih atas kepercayaan serta kebersamaan yang terjalin selama ini. Saran dan masukan yang membangun senantiasa kami nantikan. Mari bergandengan tangan — dari Pasirhalang yang sederhana ini, insyaallah tumbuh generasi yang membanggakan agama, bangsa, dan keluarga.</p>
                <p className="prakata-salam">Wassalamu’alaikum warahmatullahi wabarakatuh.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="beranda-pkks">
        <div className="wrap">
          <SectionHead kode="04 / Arsip akademik" title="Penilaian Kinerja Kepala Sekolah" />
          <div className="dua-kolom">
            <Reveal>
              <div className="editorial">
                <p className="eyebrow">Tahun ajaran {m.tahunAjaran}</p>
                <h3>Arsip yang tertata, mudah diverifikasi</h3>
                <p>Indeks bukti fisik PKKS 2026 disusun per 12 map kompetensi, 102 butir, dengan 99 berkas dokumen aktif dan 3 butir yang bersumber dari aplikasi eksternal. Hanya butir yang secara eksplisit meminta foto di dalam dokumennya yang tercantum pada daftar kelengkapan foto.</p>
                <ActionLink href="#pkks/indeks">Buka menu PKKS</ActionLink>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <KeyValue rows={[
                ['Tahun ajaran', m.tahunAjaran],
                ['Map kompetensi', '12 map'],
                ['Bukti fisik', '102 butir'],
                ['Berkas aktif', '99 dokumen'],
                ['Materi yang memerlukan foto', `${data.foto.ringkasan.wajib + data.foto.ringkasan.pendukung} butir`],
                ['Sumber eksternal', '3 butir · ARKAS / ATISISBADA']
              ]} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--merah" id="beranda-akses">
        <div className="wrap">
          <Reveal className="section__intro section__intro--terang">
            <div>
              <p className="eyebrow">05 / Untuk pengawas</p>
              <h2>Akses cepat verifikasi</h2>
            </div>
            <GoldRule />
          </Reveal>
          <Stagger className="akses-grid">
            <Item>
              <motion.a className="akses-card" href="#pkks/indeks" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <span className="akses-card__icon"><FolderOpen size={22} strokeWidth={1.5} /></span>
                <span className="mono">01 / ARSIP DOKUMEN</span>
                <strong>Indeks 12 map PKKS</strong>
                <p>Telusuri 102 butir bukti fisik berdasarkan kode, nama berkas, dan rujukan.</p>
                <em>Buka indeks <ArrowUpRight size={15} /></em>
              </motion.a>
            </Item>
            <Item>
              <motion.a className="akses-card" href="#foto/kelengkapan" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <span className="akses-card__icon"><Camera size={22} strokeWidth={1.5} /></span>
                <span className="mono">02 / DOKUMENTASI KEGIATAN</span>
                <strong>Foto per materi PKKS</strong>
                <p>Setiap materi tertaut ke kategori kegiatan dan daftar bidikan foto yang harus tersedia.</p>
                <em>Buka dokumentasi <ArrowUpRight size={15} /></em>
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

      <section className="section" id="beranda-map">
        <div className="wrap">
          <SectionHead kode="06 / Peta arsip" title="Dua belas map kompetensi" desc="Indeks resmi PKKS 2026/2027. Pilih map untuk menelusuri butir di dalamnya." />
          <Stagger className="map-grid">
            {data.maps.map((mp) => (
              <Item key={mp.no}>
                <motion.a
                  className="map-card"
                  href={`#pkks/indeks`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <span className="map-card__no">{pad(mp.no)}</span>
                  <span className="map-card__judul">{mp.judul}</span>
                  <span className="map-card__total">{mp.total} butir <BookOpen size={13} /></span>
                </motion.a>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
