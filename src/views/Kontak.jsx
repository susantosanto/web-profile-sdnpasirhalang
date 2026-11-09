import { useState } from 'react';
import { ArrowUpRight, Building2, Clock3, Copy, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { useSite } from '../App';
import { Reveal, Stagger, Item } from '../components/motion';
import { KeyValue, PageFolio, SectionHead } from '../components/Ui';

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
    <div className="wrap page-inner">
      <PageFolio
        kode="Menu · Kontak"
        title="Kontak dan lokasi"
        lede="Alamat resmi, koordinat geografis, dan kanal komunikasi SD Negeri Pasirhalang, Kecamatan Cikalongwetan, Kabupaten Bandung Barat."
        meta={`NPSN ${m.npsn} · Diperbarui ${m.diperbarui}`}
      />

      <div className="kontak-peta kontak-peta--hero">
        <div className="kontak-peta__frame">
          <iframe
            title="Peta SDN Pasirhalang — hero"
            src={`https://www.google.com/maps?q=${encodeURIComponent(m.lintang + ',' + m.bujur)}&z=17&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="kontak-peta__bar">
          <span><MapPin size={14} /> {m.alamat} · {m.koordinat}</span>
          <a className="btn btn--merah" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.lintang + ',' + m.bujur)}`} target="_blank" rel="noopener noreferrer">
            Navigasi <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <Stagger className="kontak-cards">
        <Item><div className="kontak-card"><span><MapPin size={20} strokeWidth={1.5} /></span><b>Alamat</b><p>Kp. Pasirhalang RT.03 RW.14<br />Desa Mandalamukti, Cikalongwetan<br />Kabupaten Bandung Barat, Jawa Barat 40556</p></div></Item>
        <Item><div className="kontak-card"><span><Mail size={20} strokeWidth={1.5} /></span><b>Email</b><p>{m.email}</p><a href={`mailto:${m.email}`}>Kirim surel <ArrowUpRight size={13} /></a></div></Item>
        <Item><div className="kontak-card"><span><Phone size={20} strokeWidth={1.5} /></span><b>Telepon</b><p>{m.telepon}</p><a href={`tel:${m.telepon.replace(/\s/g, '')}`}>Hubungi <ArrowUpRight size={13} /></a></div></Item>
      </Stagger>

      <section className="section" id="kontak-informasi">
        <SectionHead kode="Tabel 05" title="Informasi kontak" />
        <Reveal><KeyValue rows={kontak} /></Reveal>
      </section>

      <section className="section section--paper band-full" id="kontak-alamat">
        <SectionHead kode="Alamat" title="Alamat surat-menyurat" />
        <div className="dua-kolom">
          <Reveal>
            <div className="editorial">
              <p className="eyebrow">Lokasi</p>
              <h3>Desa Mandalamukti, Kecamatan Cikalongwetan</h3>
              <p>SD Negeri Pasirhalang berada di wilayah Kabupaten Bandung Barat, Provinsi Jawa Barat, dengan kode pos 40556. Penyelenggaraan pembelajaran dilaksanakan pada pagi hari, lima hari dalam seminggu.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <KeyValue rows={[
              ['Waktu penyelenggaraan', 'Pagi / 5 hari'],
              ['Posisi geografis', m.koordinat],
              ['Sumber listrik', 'PLN · 450 watt'],
              ['Akses internet', 'BembyNet'],
              ['Tahun ajaran', m.tahunAjaran]
            ]} />
            <p className="catatan">Koordinat ditampilkan sebagai data administratif; peta tidak disematkan pada halaman ini.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="kontak-koordinat">
        <SectionHead kode="Koordinat" title="Titik lokasi sekolah" desc="Koordinat geografis resmi dalam sistem WGS-84 (GPS), sesuai data yang diberikan sekolah." />
        <div className="dua-kolom">
          <Reveal>
            <KeyValue rows={[
              ['Lintang', m.lintang],
              ['Bujur', m.bujur],
              ['Format pasangan', m.koordinat],
              ['Sistem koordinat', 'WGS-84 / GPS']
            ]} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="koordinat-aksi">
              <span className="koordinat-aksi__ikon"><Navigation size={22} strokeWidth={1.5} /></span>
              <b>Akses titik lokasi</b>
              <p>Salin pasangan koordinat untuk dipakai pada sistem administrasi, atau buka penanda lokasi pada layanan peta yang diizinkan.</p>
              <div className="koordinat-aksi__tombol">
                <button className="btn btn--ghost" type="button" onClick={salin}>
                  <Copy size={15} strokeWidth={1.8} /> {tersalin ? 'Koordinat tersalin' : 'Salin koordinat'}
                </button>
                <a className="btn btn--merah" href={petaHref} target="_blank" rel="noopener noreferrer">
                  Buka penanda peta <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="catatan">Peta tidak disematkan dan tidak ada kunci API yang disimpan di berkas situs. Tautan penanda menggunakan URI API penyedia peta resmi.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="kontak-peta" style={{ paddingTop: 0 }}>
        <SectionHead kode="Peta · Lokasi" title="Peta lokasi sekolah" desc="Geser & zoom peta — atau buka langsung di Google Maps untuk navigasi." />
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
      </section>

      <section className="section section--paper" id="kontak-naungan">
        <SectionHead kode="Naungan" title="Di bawah pemerintah daerah" />
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
      </section>
    </div>
  );
}
