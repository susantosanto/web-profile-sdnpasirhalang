import { useState } from 'react';
import { ArrowUpRight, Building2, Clock3, Copy, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { useSite } from '../App';
import { GoldRule, Reveal, Stagger, Item } from '../components/motion';
import { KeyValue, SectionHead } from '../components/Ui';

export default function Kontak() {
  const { data } = useSite();
  const m = data.meta;
  const [tersalin, setTersalin] = useState(false);

  const kontak = [
    ['Nama satuan pendidikan', m.nama],
    ['NPSN', m.npsn],
    ['Email institusi', m.email],
    ['Telepon', m.telepon],
    ['Kepala Sekolah', m.kepalaSekolah],
    ['Tahun ajaran', m.tahunAjaran]
  ];

  // Penanda lokasi memakai URI API penyedia peta yang diizinkan.
  // Tidak ada peta yang disematkan dan tidak ada kunci API di sisi klien.
  const marker = `coord:${m.koordinat};title:SD Negeri Pasirhalang;addr:${m.alamat}`;
  const petaHref = `https://apis.map.qq.com/uri/v1/marker?marker=${encodeURI(marker)}&referer=sdn-pasirhalang-resmi&coord_type=1`;

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(m.koordinat);
    } catch {
      const t = document.createElement('textarea');
      t.value = m.koordinat;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setTersalin(true);
    window.setTimeout(() => setTersalin(false), 1800);
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero__mesh" aria-hidden="true" />
        <div className="wrap page-hero__inner">
          <Reveal>
            <p className="eyebrow page-hero__eyebrow">Menu · Kontak</p>
            <h1>Kontak dan lokasi</h1>
            <p className="page-hero__lede">Alamat resmi, koordinat geografis, dan kanal komunikasi SD Negeri Pasirhalang, Kecamatan Cikalongwetan, Kabupaten Bandung Barat.</p>
            <div className="page-hero__rule" aria-hidden="true" />
            <div className="page-hero__meta">
              <span>NPSN {m.npsn}</span>
              <span>Diperbarui {m.diperbarui}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" id="kontak-kanal">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">01 / Kanal komunikasi</p>
              <h2>Hubungi kami</h2>
            </div>
            <GoldRule />
          </Reveal>
          <Stagger className="kontak-cards">
            <Item><div className="kontak-card"><span><MapPin size={20} strokeWidth={1.5} /></span><b>Alamat</b><p>Kp. Pasirhalang RT.03 RW.14<br />Desa Mandalamukti, Cikalongwetan<br />Kabupaten Bandung Barat, Jawa Barat 40556</p></div></Item>
            <Item><div className="kontak-card"><span><Mail size={20} strokeWidth={1.5} /></span><b>Email</b><p>{m.email}</p><a href={`mailto:${m.email}`}>Kirim surel <ArrowUpRight size={13} /></a></div></Item>
            <Item><div className="kontak-card"><span><Phone size={20} strokeWidth={1.5} /></span><b>Telepon</b><p>{m.telepon}</p><a href={`tel:${m.telepon.replace(/\s/g, '')}`}>Hubungi <ArrowUpRight size={13} /></a></div></Item>
          </Stagger>
        </div>
      </section>

      <section className="section section--paper" id="kontak-peta">
        <div className="wrap">
          <SectionHead kode="02 / Lokasi" title="Peta lokasi sekolah" desc="Geser dan perbesar peta — atau buka langsung di Google Maps untuk navigasi." />
          <Reveal>
            <div className="kontak-peta kontak-peta--besar">
              <div className="kontak-peta__frame">
                <iframe
                  title="Peta SDN Pasirhalang"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(m.lintang + ',' + m.bujur)}&z=17&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="kontak-peta__bar">
                <span><MapPin size={14} /> {m.alamat} · {m.koordinat}</span>
                <a className="btn btn--merah" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.lintang + ',' + m.bujur)}`} target="_blank" rel="noopener noreferrer">
                  Buka di Google Maps <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="kontak-detail">
        <div className="wrap">
          <SectionHead kode="03 / Detail" title="Alamat dan informasi kontak" />
          <div className="dua-kolom">
            <Reveal>
              <div className="editorial">
                <p className="eyebrow">Desa Mandalamukti</p>
                <h3>Kecamatan Cikalongwetan, Bandung Barat</h3>
                <p>SD Negeri Pasirhalang berstatus milik Pemerintah Daerah dengan SK Pendirian 750/E-27/1982. Penyelenggaraan pembelajaran dilaksanakan pada pagi hari, lima hari dalam seminggu.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <KeyValue rows={kontak} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper" id="kontak-koordinat">
        <div className="wrap">
          <SectionHead kode="04 / Koordinat" title="Titik lokasi sekolah" desc="Koordinat geografis resmi dalam sistem WGS-84 (GPS), sesuai data yang diberikan sekolah." />
          <div className="dua-kolom">
            <Reveal>
              <KeyValue rows={[
                ['Lintang', m.lintang],
                ['Bujur', m.bujur],
                ['Format pasangan', m.koordinat],
                ['Sistem koordinat', 'WGS-84 / GPS']
              ]} />
            </Reveal>
            <Reveal delay={0.1} variant="right">
              <div className="koordinat-aksi">
                <span className="koordinat-aksi__ikon"><Navigation size={22} strokeWidth={1.5} /></span>
                <b>Akses titik lokasi</b>
                <p>Salin pasangan koordinat untuk dipakai pada sistem administrasi, atau buka penanda lokasi pada layanan peta resmi.</p>
                <div className="koordinat-aksi__tombol">
                  <button className="btn btn--ghost" type="button" onClick={salin}>
                    <Copy size={15} strokeWidth={1.8} /> {tersalin ? 'Koordinat tersalin' : 'Salin koordinat'}
                  </button>
                  <a className="btn btn--merah" href={petaHref} target="_blank" rel="noopener noreferrer">
                    Buka penanda peta <ArrowUpRight size={15} />
                  </a>
                </div>
                <p className="catatan">Tidak ada kunci API yang disimpan di berkas situs. Tautan penanda menggunakan URI API penyedia peta resmi.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="kontak-naungan">
        <div className="wrap">
          <SectionHead kode="05 / Naungan" title="Di bawah pemerintah daerah" />
          <Reveal>
            <div className="naungan">
              <span><Building2 size={22} strokeWidth={1.5} /></span>
              <div>
                <b>Pemerintah Kabupaten Bandung Barat · Dinas Pendidikan</b>
                <p>Status kepemilikan: Pemerintah Daerah. SK Pendirian Sekolah 750/E-27/1982 tanggal 27 Januari 1982.</p>
              </div>
              <span className="naungan__jam"><Clock3 size={15} /> Pagi · 5 hari</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
