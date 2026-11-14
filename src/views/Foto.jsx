import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Camera, Images, Sparkles, X } from 'lucide-react';
import { useSite } from '../App';
import { GALERI_KEGIATAN, KATEGORI_FOTO, asset } from '../config';
import { Item, Reveal, Stagger } from '../components/motion';
import { EmptyState, SectionHead } from '../components/Ui';

export default function Foto() {
  const { data } = useSite();
  const m = data.meta;
  const [kategori, setKategori] = useState('semua');
  const [terbuka, setTerbuka] = useState(-1);

  const jumlahKat = useMemo(() => {
    const hitung = {};
    GALERI_KEGIATAN.forEach((g) => { hitung[g.kategori] = (hitung[g.kategori] || 0) + 1; });
    return hitung;
  }, []);

  const tampil = kategori === 'semua'
    ? GALERI_KEGIATAN
    : GALERI_KEGIATAN.filter((g) => g.kategori === kategori);

  const namaKat = (id) => (KATEGORI_FOTO.find((k) => k.id === id) || {}).nama || id;

  const pilih = (id) => {
    setKategori((k) => (k === id ? 'semua' : id));
    setTerbuka(-1);
    window.setTimeout(() => {
      const el = document.getElementById('foto-galeri');
      if (el && id !== kategori) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero__mesh" aria-hidden="true" />
        <div className="wrap page-hero__inner">
          <Reveal>
            <p className="eyebrow page-hero__eyebrow">Menu · Foto kegiatan</p>
            <h1>Galeri kegiatan sekolah</h1>
            <p className="page-hero__lede">Dokumentasi G7 KAIH, pembiasaan, lomba, dan geliat keseharian warga SD Negeri Pasirhalang — dari upacara pagi hingga prestasi murid.</p>
            <div className="page-hero__rule" aria-hidden="true" />
            <div className="page-hero__meta">
              <span>{GALERI_KEGIATAN.length} foto</span>
              <span>Diperbarui {m.diperbarui}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" id="foto-kategori">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">01 / Kategori</p>
              <h2>Telusuri per kegiatan</h2>
            </div>
          </Reveal>
          <Stagger className="kat-grid">
            {KATEGORI_FOTO.map((k) => (
              <Item key={k.id}>
                <motion.button
                  type="button"
                  className={`kat-card${kategori === k.id ? ' is-aktif' : ''}`}
                  onClick={() => pilih(k.id)}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <span className="kat-card__icon">{k.id === 'g7-kaih' ? <Sparkles size={18} strokeWidth={1.6} /> : k.id === 'lomba' ? <Images size={18} strokeWidth={1.6} /> : <Camera size={18} strokeWidth={1.6} />}</span>
                  <strong>{k.nama}</strong>
                  <p>{k.ringkas}</p>
                  <span className="kat-card__meta">{jumlahKat[k.id] || 0} foto</span>
                  {kategori === k.id ? <motion.i layoutId="kat-aktif" className="kat-card__garis" /> : null}
                </motion.button>
              </Item>
            ))}
          </Stagger>
          {kategori !== 'semua' ? (
            <p className="catatan">Penyaringan aktif: <b>{namaKat(kategori)}</b>. <button className="link-button" type="button" onClick={() => setKategori('semua')}>Hapus penyaringan</button></p>
          ) : (
            <p className="catatan">Pilih kartu kategori untuk menyaring galeri di bawah.</p>
          )}
        </div>
      </section>

      <section className="section section--paper" id="foto-galeri">
        <div className="wrap">
          <SectionHead kode="02 / Galeri" title={kategori === 'semua' ? 'Semua foto' : `Foto ${namaKat(kategori)}`} />
          <div className="chip-row" role="tablist" aria-label="Saring kategori">
            <button type="button" role="tab" aria-selected={kategori === 'semua'} className={`chip${kategori === 'semua' ? ' is-aktif' : ''}`} onClick={() => setKategori('semua')}>Semua</button>
            {KATEGORI_FOTO.map((k) => (
              <button type="button" role="tab" key={k.id} aria-selected={kategori === k.id} className={`chip${kategori === k.id ? ' is-aktif' : ''}`} onClick={() => setKategori(k.id)}>{k.nama}</button>
            ))}
          </div>
          {tampil.length > 0 ? (
            <div className="foto-grid">
              {tampil.map((g, i) => (
                <motion.figure
                  className="foto-card foto-card--klik"
                  key={`${g.kategori}-${i}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Perbesar ${g.judul}`}
                  onClick={() => setTerbuka(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setTerbuka(i); }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  whileHover={{ y: -4 }}
                >
                  <img src={asset(g.src)} alt={g.judul} loading="lazy" />
                  <figcaption><b>{g.judul}</b><small>{g.tanggal} · {namaKat(g.kategori)}</small></figcaption>
                </motion.figure>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Images}
              title={kategori === 'semua' ? 'Dokumentasi segera hadir' : `Belum ada foto ${namaKat(kategori)}`}
              text="Foto kegiatan masih dalam tahap pengumpulan. Simpan berkas di public/foto/ lalu daftarkan pada GALERI_KEGIATAN di src/config.js."
            />
          )}
        </div>
      </section>

      <AnimatePresence>
        {terbuka >= 0 && tampil[terbuka] ? (
          <>
            <motion.div
              className="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTerbuka(-1)}
            />
            <motion.figure
              className="foto-modal"
              role="dialog"
              aria-label={tampil[terbuka].judul}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={asset(tampil[terbuka].src)} alt={tampil[terbuka].judul} />
              <figcaption>
                <span><b>{tampil[terbuka].judul}</b><small>{tampil[terbuka].tanggal} · {namaKat(tampil[terbuka].kategori)}</small></span>
                <span className="foto-modal__tombol">
                  {terbuka > 0 && <button className="btn btn--icon" type="button" aria-label="Foto sebelumnya" onClick={() => setTerbuka(terbuka - 1)}>‹</button>}
                  {terbuka < tampil.length - 1 && <button className="btn btn--icon" type="button" aria-label="Foto berikutnya" onClick={() => setTerbuka(terbuka + 1)}>›</button>}
                  <button className="btn btn--icon" type="button" aria-label="Tutup foto" onClick={() => setTerbuka(-1)}><X size={18} /></button>
                </span>
              </figcaption>
              <a className="foto-modal__taut" href="#foto-galeri" onClick={() => setTerbuka(-1)}>Kembali ke galeri <ArrowUpRight size={13} /></a>
            </motion.figure>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
