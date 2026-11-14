import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, File, FileImage, FileSpreadsheet, FileText, FileVideo, Folder, FolderOpen, Loader2, RefreshCw, Search, X } from 'lucide-react';
import { useSite } from '../App';
import { DRIVE_API_KEY, GURU_FOLDERS, asset } from '../config';
import { Item, Reveal, Stagger } from '../components/motion';
import { SectionHead } from '../components/Ui';

function idFolder(dari) {
  const t = (dari || '').trim();
  if (!t) return '';
  const m = t.match(/\/folders\/([A-Za-z0-9_-]+)/) || t.match(/[?&]id=([A-Za-z0-9_-]+)/);
  return m ? m[1] : t;
}

function ikonBerkas(mime, nama) {
  const m = (mime || '').toLowerCase();
  const n = (nama || '').toLowerCase();
  if (m.includes('folder')) return { Ikon: Folder, warna: 'dok--folder' };
  if (m.includes('pdf') || n.endsWith('.pdf')) return { Ikon: FileText, warna: 'dok--pdf' };
  if (m.includes('spreadsheet') || m.includes('excel') || /\.(xls|xlsx|csv)$/.test(n)) return { Ikon: FileSpreadsheet, warna: 'dok--sheet' };
  if (m.includes('presentation') || m.includes('powerpoint') || /\.(ppt|pptx)$/.test(n)) return { Ikon: FileText, warna: 'dok--slide' };
  if (m.includes('image') || /\.(png|jpe?g|webp|gif|bmp)$/.test(n)) return { Ikon: FileImage, warna: 'dok--gambar' };
  if (m.includes('video') || /\.(mp4|mov|avi|mkv|webm)$/.test(n)) return { Ikon: FileVideo, warna: 'dok--video' };
  if (m.includes('document') || m.includes('word') || /\.(doc|docx|txt|rtf)$/.test(n)) return { Ikon: FileText, warna: 'dok--dok' };
  return { Ikon: File, warna: 'dok--lain' };
}

function ukuranLayak(byte) {
  const n = Number(byte);
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1048576).toFixed(1)} MB`;
}

function tanggalLayak(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

export default function Administrasi() {
  const { data } = useSite();
  const m = data.meta;
  const [terbuka, setTerbuka] = useState(null);
  const [daftar, setDaftar] = useState([]);
  const [status, setStatus] = useState('siap');
  const [galat, setGalat] = useState('');
  const [cari, setCari] = useState('');
  const [pratinjau, setPratinjau] = useState(null);

  const kunciSiap = DRIVE_API_KEY.trim().length > 0;

  async function muat(guru) {
    const id = idFolder(guru.folder);
    if (!id) { setStatus('kosong'); setDaftar([]); return; }
    if (!kunciSiap) { setStatus('tanpa-kunci'); setDaftar([]); return; }
    setStatus('memuat'); setGalat(''); setPratinjau(null);
    try {
      const q = encodeURIComponent(`'${id}' in parents and trashed = false`);
      const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,mimeType,modifiedTime,size,webViewLink)&orderBy=name_natural&pageSize=100&key=${encodeURIComponent(DRIVE_API_KEY.trim())}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) {
        const alasan = (json && json.error && json.error.message) || `HTTP ${res.status}`;
        throw new Error(alasan);
      }
      setDaftar(json.files || []);
      setStatus('ok');
    } catch (e) {
      setStatus('gagal');
      setGalat(e.message || 'Gagal membaca folder.');
    }
  }

  useEffect(() => {
    if (terbuka) { setCari(''); muat(terbuka); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terbuka && terbuka.nama]);

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    if (!q) return daftar;
    return daftar.filter((f) => (f.name || '').toLowerCase().includes(q));
  }, [daftar, cari]);

  const buka = (guru) => setTerbuka(guru);
  const tutup = () => { setTerbuka(null); setPratinjau(null); };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero__mesh" aria-hidden="true" />
        <div className="wrap page-hero__inner">
          <Reveal>
            <p className="eyebrow page-hero__eyebrow">Menu · Administrasi</p>
            <h1>Administrasi dokumen guru</h1>
            <p className="page-hero__lede">Arsip administrasi setiap wali kelas dan guru mapel, langsung dari folder Google Drive masing-masing — dibuka dan dibaca tanpa meninggalkan situs ini.</p>
            <div className="page-hero__rule" aria-hidden="true" />
            <div className="page-hero__meta">
              <span>{GURU_FOLDERS.length} guru</span>
              <span>Diperbarui {m.diperbarui}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" id="admin-daftar">
        <div className="wrap">
          <Reveal className="section__intro">
            <div>
              <p className="eyebrow">01 / Folder guru</p>
              <h2>Pilih guru, buka dokumennya</h2>
            </div>
          </Reveal>
          <Stagger className="admin-grid">
            {GURU_FOLDERS.map((g) => (
              <Item key={g.nama}>
                <div className="admin-card">
                  <span className="admin-foto">{g.foto ? <img src={asset(`images/${g.foto}`)} alt={`Foto ${g.nama}`} loading="lazy" /> : g.nama.slice(0, 2).toUpperCase()}</span>
                  <b>{g.nama}</b>
                  <small>{g.peran}</small>
                  <button className="btn btn--merah" type="button" onClick={() => buka(g)} disabled={!idFolder(g.folder)}>
                    <FolderOpen size={15} /> {idFolder(g.folder) ? 'Buka dokumen' : 'Belum ditautkan'}
                  </button>
                </div>
              </Item>
            ))}
          </Stagger>
          <p className="catatan">Folder dibagikan sebagai “siapa saja yang memiliki link dapat melihat”. Operator menautkan folder di <span className="mono">src/config.js</span> (GURU_FOLDERS + DRIVE_API_KEY).</p>

          <details className="koreksi admin-panduan">
            <summary>Panduan penyiapan untuk operator (4 langkah)</summary>
            <ol className="tatib-list">
              <li><b>Buat kunci API gratis</b> di Google Cloud Console → aktifkan <i>Google Drive API</i> → buat <i>API key</i> → batasi ke Drive API + situs web ini (HTTP referrer).</li>
              <li><b>Bagikan folder tiap guru</b> sebagai “Siapa saja yang memiliki link — Melihat”. Guru cukup mengunggah berkas ke foldernya seperti biasa.</li>
              <li><b>Tempel kunci + tautan folder</b> ke <span className="mono">DRIVE_API_KEY</span> dan <span className="mono">GURU_FOLDERS</span> di <span className="mono">src/config.js</span>, lalu jalankan <span className="mono">npm run build</span>.</li>
              <li><b>Uji satu folder</b> dari halaman ini. Jika gagal, pesan kesalahannya akan menyebut penyebabnya (kunci salah, folder belum dibagikan, atau kuota).</li>
            </ol>
          </details>
        </div>
      </section>

      <AnimatePresence>
        {terbuka && (
          <>
            <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={tutup} />
            <motion.div
              className="pdf-modal admin-modal"
              role="dialog"
              aria-label={`Dokumen administrasi ${terbuka.nama}`}
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pdf-modal__top admin-modal__top">
                <span className="admin-modal__ident">
                  <span className="admin-foto admin-foto--kecil">{terbuka.foto ? <img src={asset(`images/${terbuka.foto}`)} alt="" /> : terbuka.nama.slice(0, 2).toUpperCase()}</span>
                  <span><b>{terbuka.nama}</b><small>{terbuka.peran} · {status === 'ok' ? `${daftar.length} berkas` : 'Google Drive'}</small></span>
                </span>
                <span className="pdf-modal__tombol">
                  <label className="admin-cari"><Search size={14} /><input type="search" placeholder="Cari berkas…" value={cari} onChange={(e) => setCari(e.target.value)} aria-label="Cari berkas" /></label>
                  <button className="btn btn--icon" type="button" onClick={() => muat(terbuka)} aria-label="Muat ulang"><RefreshCw size={15} /></button>
                  <button className="btn btn--icon" type="button" onClick={tutup} aria-label="Tutup"><X size={16} /></button>
                </span>
              </div>

              <div className="admin-modal__badan">
                {status === 'memuat' && (
                  <div className="admin-status"><Loader2 size={22} className="putar" /> Membaca folder Google Drive…</div>
                )}
                {status === 'tanpa-kunci' && (
                  <div className="admin-status">Kunci API belum diisi. Operator: isi <span className="mono">DRIVE_API_KEY</span> di <span className="mono">src/config.js</span>.</div>
                )}
                {status === 'kosong' && (
                  <div className="admin-status">Folder guru ini belum ditautkan.</div>
                )}
                {status === 'gagal' && (
                  <div className="admin-status admin-status--gagal">
                    <b>Tidak dapat membaca folder.</b>
                    <small>{galat}</small>
                    <small>Umumnya karena: folder belum dibagikan sebagai “siapa saja yang memiliki link”, kunci API salah/dibatasi, atau kuota harian habis.</small>
                    <button className="btn btn--kecil" type="button" onClick={() => muat(terbuka)}>Coba lagi</button>
                  </div>
                )}
                {status === 'ok' && tampil.length === 0 && (
                  <div className="admin-status">Folder kosong{daftar.length > 0 ? ' — tidak ada yang cocok dengan pencarian.' : '.'}</div>
                )}
                {status === 'ok' && tampil.length > 0 && (
                  <div className="dok-grid">
                    {tampil.map((f) => {
                      const { Ikon, warna } = ikonBerkas(f.mimeType, f.name);
                      const isFolder = (f.mimeType || '').includes('folder');
                      return (
                        <button
                          key={f.id}
                          type="button"
                          className={`dok-card ${warna}`}
                          onClick={() => (isFolder ? window.open(f.webViewLink, '_blank', 'noopener') : setPratinjau(f))}
                          title={isFolder ? 'Buka folder di tab baru' : 'Pratinjau di sini'}
                        >
                          <span className="dok-ikon"><Ikon size={22} strokeWidth={1.6} /></span>
                          <b>{f.name}</b>
                          <small>{tanggalLayak(f.modifiedTime)}{f.size ? ` · ${ukuranLayak(f.size)}` : ''}</small>
                          <em>{isFolder ? <span>Folder <ExternalLink size={12} /></span> : <span>Pratinjau ›</span>}</em>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <AnimatePresence>
                {pratinjau && (
                  <motion.div
                    className="admin-pratinjau"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="admin-pratinjau__bar">
                      <b>{pratinjau.name}</b>
                      <span>
                        <a className="btn btn--kecil" href={pratinjau.webViewLink} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} /> Drive</a>
                        <button className="btn btn--kecil" type="button" onClick={() => setPratinjau(null)}>‹ Kembali ke daftar</button>
                      </span>
                    </div>
                    <iframe title={pratinjau.name} src={`https://drive.google.com/file/d/${pratinjau.id}/preview`} allow="autoplay" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
