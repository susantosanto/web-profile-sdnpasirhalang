import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { GAMBAR } from '../config';
import LogoSekolah from './LogoSekolah';
import { NAV } from '../lib/site';

export default function Footer({ data }) {
  const m = data.meta;
  return (
    <footer className="footer">
      <div className="footer__top-rule" aria-hidden="true" />
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-head">
            <span className="footer__emblem footer__emblem--baru"><LogoSekolah size={58} /></span>
            <div>
              <p className="footer__eyebrow">Situs resmi · NPSN {m.npsn}</p>
              <h3>SD Negeri Pasirhalang</h3>
              <small>Kecamatan {m.kecamatan}, {m.kabupaten}, Jawa Barat 40556</small>
            </div>
          </div>
          <p className="footer__desc">
            Dokumen dan foto kegiatan Penilaian Kinerja Kepala Sekolah Tahun Ajaran {m.tahunAjaran}.
            Seluruh data bersumber dari berkas resmi sekolah dan unduhan Dapodik 27 Oktober 2026.
          </p>
        </div>

        <div className="footer__col">
          <h4>Jelajahi</h4>
          {NAV.filter((n) => n.id !== 'beranda').map((n) => (
            <a key={n.id} href={`#${n.id}`}>{n.label}<ArrowUpRight size={12} /></a>
          ))}
        </div>

        <div className="footer__col">
          <h4>Kontak</h4>
          <a href={`mailto:${m.email}`}><Mail size={14} /> {m.email}</a>
          <a href={`tel:${m.telepon.replace(/\s/g, '')}`}><Phone size={14} /> {m.telepon}</a>
          <span className="footer__alamat"><MapPin size={14} /> Kp. Pasirhalang RT.03 RW.14, Desa Mandalamukti</span>
        </div>

        <div className="footer__pemerintah">
          <img src={GAMBAR.logoKbb} alt="Logo Pemerintah Kabupaten Bandung Barat" />
          <span>Pemerintah Kabupaten Bandung Barat<br />Dinas Pendidikan</span>
          <div className="footer__ttd">
            <small>Kepala Sekolah</small>
            <b>{m.kepalaSekolah}</b>
          </div>
        </div>
      </div>

      <div className="wrap footer__bottom">
        <span>© 2026 SD Negeri Pasirhalang · Diperbarui {m.diperbarui}</span>
        <span>Dokumentasi kegiatan {m.tahunAjaran}</span>
      </div>
    </footer>
  );
}
