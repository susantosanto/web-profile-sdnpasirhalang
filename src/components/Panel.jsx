import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Copy, ExternalLink, Images, X } from 'lucide-react';
import { driveFile, driveFolder, fotoUntuk, labelTingkat, mapJudul, namaKat, pad, statusFoto } from '../lib/site';
import { EASE, ProgressBar } from './motion';
import { Tag } from './Ui';

export default function Panel({ mode, kode, data, onClose, onOpenFoto }) {
  const [tersalin, setTersalin] = useState(false);
  const doc = data.docs.find((d) => d.kode === kode);
  const st = statusFoto(data, kode);

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(kode);
    } catch {
      const t = document.createElement('textarea');
      t.value = kode;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setTersalin(true);
    window.setTimeout(() => setTersalin(false), 1800);
  };

  const tautan = driveFile(kode);
  const folder = doc ? driveFolder(doc.map) : null;

  return (
    <>
      <AnimatePresence>
        {mode ? (
          <motion.div
            className="scrim"
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {mode ? (
          <motion.aside
            className="panel"
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={mode === 'foto' ? 'Detail foto kegiatan' : 'Detail dokumen PKKS'}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
          >
            <div className="panel__top">
              <span className="mono">PKKS · {kode}</span>
              <button className="btn btn--icon" type="button" onClick={onClose} aria-label="Tutup panel">
                <X size={18} />
              </button>
            </div>

            <div className="panel__body">
              <h3>{doc ? doc.bukti : kode}</h3>
              <p className="panel__indikator">{doc ? doc.indikator : ''}</p>

              {mode === 'dok' && doc ? (
                <>
                  <dl className="panel__meta">
                    <div><dt>Map</dt><dd>{pad(doc.map)} · {mapJudul(data.maps, doc.map)}</dd></div>
                    <div><dt>Bidang</dt><dd>{doc.bidang}</dd></div>
                    <div><dt>Berkas</dt><dd className="mono">{doc.berkas || '—'}</dd></div>
                    <div><dt>Kelompok sumber</dt><dd>{doc.sumber}</dd></div>
                    <div><dt>Rujukan 2026</dt><dd>{doc.rujukan}</dd></div>
                    <div><dt>Status berkas</dt><dd>{doc.eksternal ? 'Sumber eksternal (ARKAS / ATISISBADA)' : 'Berkas dokumen lokal tersedia'}</dd></div>
                  </dl>

                  <div className="panel__foto">
                    <div className="panel__foto-head">
                      <Camera size={16} />
                      <b>Foto kegiatan</b>
                      <Tag tone={st.b.t === 'wajib' ? 'merah' : st.b.t === 'pendukung' ? 'emas' : 'netral'}>
                        {labelTingkat(st.b.t)}
                      </Tag>
                    </div>
                    {st.b.t === 'tidak' ? (
                      <p className="panel__catatan">{st.b.alasan}</p>
                    ) : (
                      <>
                        <div className="panel__progress-row">
                          <span>{st.ada} / {st.perlu} bidikan terunggah</span>
                          <ProgressBar value={st.ada} max={st.perlu} />
                        </div>
                        <button className="action-link action-link--merah" type="button" onClick={() => onOpenFoto(kode)}>
                          Lihat daftar bidikan &amp; foto <ExternalLink size={14} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="panel__aksi">
                    <button className="btn btn--ghost" type="button" onClick={salin}>
                      <Copy size={15} /> {tersalin ? 'Kode tersalin' : 'Salin kode'}
                    </button>
                    {tautan ? (
                      <a className="btn btn--merah" href={tautan} target="_blank" rel="noopener noreferrer">
                        Buka di Drive <ExternalLink size={15} />
                      </a>
                    ) : (
                      <span className="panel__tunggu">Menunggu tautan Drive</span>
                    )}
                  </div>
                  <p className="panel__catatan">
                    {folder ? `Folder Map ${pad(doc.map)} telah dikonfigurasi.` : 'Tautan folder Map dan berkas final belum dikonfigurasi.'}{' '}
                    Tautan templat asal pada Master Checklist sengaja tidak dipakai sebagai tautan berkas final.
                  </p>
                </>
              ) : (
                <>
                  <p className="panel__alasan">{st.b.alasan}</p>
                  {st.b.dasar ? <p className="panel__dasar"><b>Dasar klasifikasi.</b> {st.b.dasar}</p> : null}
                  <dl className="panel__meta">
                    <div><dt>Tingkat kebutuhan</dt><dd>{labelTingkat(st.b.t)}</dd></div>
                    <div><dt>Kategori kegiatan</dt><dd>{st.b.k.length ? st.b.k.map((k) => namaKat(data, k)).join(' · ') : '—'}</dd></div>
                    <div><dt>Kelengkapan</dt><dd>{st.ada} dari {st.perlu} bidikan</dd></div>
                  </dl>

                  <div className="panel__section-head"><h4>Foto terunggah</h4><span className="mono">{st.ada} FOTO</span></div>
                  {fotoUntuk(kode).length ? (
                    <div className="foto-grid">
                      {fotoUntuk(kode).map((f, i) => (
                        <motion.figure
                          className="foto-card"
                          key={i}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                        >
                          <img src={f.src} alt={f.judul || `Foto ${kode}`} loading="lazy" />
                          <figcaption><b>{f.judul}</b><small>{f.tanggal}</small></figcaption>
                        </motion.figure>
                      ))}
                    </div>
                  ) : (
                    <div className="panel__kosong">
                      <Images size={22} strokeWidth={1.4} />
                      <b>0 foto terunggah</b>
                      <p>Belum ada berkas foto yang didaftarkan untuk butir ini. Unggah foto ke <span className="mono">public/foto/</span>, lalu daftarkan pada <span className="mono">DRIVE_CONFIG.photos["{kode}"]</span>.</p>
                    </div>
                  )}

                  <div className="panel__section-head"><h4>Bidikan yang harus tersedia</h4><span className="mono">{st.perlu} ITEM</span></div>
                  <ol className="shot-list">
                    {st.b.bidikan.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: EASE }}
                      >
                        <span>{String(i + 1).padStart(2, '0')}</span>{s}
                      </motion.li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
