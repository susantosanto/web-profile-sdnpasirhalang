import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useSite } from '../App';
import { Item, ProgressBar, Reveal, Stagger } from '../components/motion';
import { EmptyState, PageFolio, SectionHead, Tag } from '../components/Ui';
import {
  labelTingkat, namaKat, pad, semuaFoto, statusFoto
} from '../lib/site';

export default function Foto() {
  const { data, bukaFoto } = useSite();
  const [kategori, setKategori] = useState('semua');
  const [cari, setCari] = useState('');
  const [mapFilter, setMapFilter] = useState('semua');
  const [tingkat, setTingkat] = useState('semua');

  const f = data.foto;
  const galeri = useMemo(() => semuaFoto(), []);

  const relevan = useMemo(() => data.docs.filter((d) => f.butir[d.kode] && f.butir[d.kode].t !== 'tidak'), [data.docs, f.butir]);

  const baris = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return relevan.filter((d) => {
      const b = f.butir[d.kode];
      const st = statusFoto(data, d.kode);
      if (q && ![d.kode, d.bukti, d.berkas, b.alasan, b.dasar].join(' ').toLowerCase().includes(q)) return false;
      if (mapFilter !== 'semua' && String(d.map) !== mapFilter) return false;
      if (tingkat === 'belum' && st.lengkap) return false;
      if ((tingkat === 'wajib' || tingkat === 'pendukung') && b.t !== tingkat) return false;
      if (kategori !== 'semua' && !b.k.includes(kategori)) return false;
      return true;
    });
  }, [relevan, f.butir, cari, mapFilter, tingkat, kategori, data]);

  const galeriTampil = kategori === 'semua'
    ? galeri
    : galeri.filter((g) => (f.butir[g.kode]?.k || []).includes(kategori));

  // Slot liputan: bidikan yang belum terpenuhi — galeri yang hidup walau foto belum ada.
  // Didasarkan pada temuan NN/g "Photos as Web Content": tampilkan foto yang membawa
  // informasi (bidikan sesuai dokumen), bukan gambar hiasan.
  const slotLiputan = useMemo(() => (
    relevan
      .map((d) => ({ d, st: statusFoto(data, d.kode) }))
      .filter(({ st }) => st.perlu > st.ada)
      .slice(0, 6)
  ), [relevan, data]);

  const pilih = (id) => {
    setKategori((k) => (k === id ? 'semua' : id));
    window.setTimeout(() => {
      const el = document.getElementById('foto-kebutuhan');
      if (el && id !== kategori) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <div className="wrap page-inner">
      <PageFolio
        kode="Menu · Dokumentasi kegiatan"
        title="Foto kegiatan sekolah"
        lede="Galeri foto kegiatan ditata mengikuti kategori aktivitas pada materi PKKS. Hanya butir yang secara eksplisit meminta foto di dalam dokumennya yang memiliki daftar bidikan dan status kelengkapan, sehingga pengawas tidak lagi menemukan tuntutan foto pada SK atau naskah administratif."
        meta="Audit ulang: parser XML pada 99 berkas .docx · 9 butir wajib foto · 3 butir pendukung · 46 butir dikoreksi"
      />

      <Stagger className="stat-grid stat-grid--empat">
        <Item className="stat-card"><div className="stat-card__value">{f.ringkasan.wajib}</div><b>Wajib foto</b><small>Ada kutipan permintaan foto di dokumen</small></Item>
        <Item className="stat-card"><div className="stat-card__value">{f.ringkasan.pendukung}</div><b>Foto pendukung</b><small>Bukti berwujud benda · opsional</small></Item>
        <Item className="stat-card"><div className="stat-card__value">{f.ringkasan.tidak}</div><b>Tidak perlu foto</b><small>Termasuk seluruh SK, notulen, dan berita acara</small></Item>
        <Item className="stat-card stat-card--kosong"><div className="stat-card__value">{galeri.length}</div><b>Foto terunggah</b><small>Belum ada berkas didaftarkan</small></Item>
      </Stagger>

      <section className="section" id="foto-kategori">
        <SectionHead kode="01 / Referensi" title="Kategori kegiatan" desc="Delapan kelompok aktivitas sekolah. Pilih kartu untuk melihat foto apa saja yang perlu disiapkan pada tabel kebutuhan di bawah." />
        <Stagger className="kat-grid">
          {f.kategori.map((k) => (
            <Item key={k.id}>
              <motion.button
                type="button"
                className={`kat-card ${kategori === k.id ? 'is-aktif' : ''}`}
                onClick={() => pilih(k.id)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <span className="kat-card__icon"><Sparkles size={18} strokeWidth={1.6} /></span>
                <strong>{k.nama}</strong>
                <p>{k.ringkas}</p>
                <span className="kat-card__meta">{k.jumlah} materi · {k.wajib} wajib foto</span>
                {kategori === k.id ? <motion.i layoutId="kat-aktif" className="kat-card__garis" /> : null}
              </motion.button>
            </Item>
          ))}
        </Stagger>
        {kategori !== 'semua' ? (
          <p className="catatan">Penyaringan aktif: <b>{namaKat(data, kategori)}</b>. <button className="link-button" type="button" onClick={() => setKategori('semua')}>Hapus penyaringan</button></p>
        ) : (
          <p className="catatan">Kategori bukan map administratif, melainkan pengelompokan aktivitas. Satu butir PKKS dapat masuk ke lebih dari satu kategori.</p>
        )}
      </section>

      <section className="section section--paper band-full" id="foto-galeri">
        <SectionHead kode="02 / Etalase" title="Etalase dokumentasi" desc="Setiap foto yang tampil adalah bukti kegiatan yang diminta dokumen — bukan hiasan. Slot berbingkai putus-putus adalah bidikan yang masih menunggu diliput; buka untuk melihat daftar bidikannya." />
        {galeriTampil.length > 0 && (
          <div className="foto-grid">
            {galeriTampil.map((g, i) => (
              <motion.figure className="foto-card" key={`${g.kode}-${i}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <img src={g.src} alt={g.judul || g.kode} loading="lazy" />
                <figcaption><b>{g.judul}</b><small>{g.tanggal} · {g.kode}</small></figcaption>
              </motion.figure>
            ))}
          </div>
        )}
        {slotLiputan.length > 0 && (
          <>
            <h3 className="sub-judul">Slot liputan terbuka</h3>
            <div className="foto-grid">
              {slotLiputan.map(({ d, st }, i) => (
                <motion.button
                  type="button"
                  className="slot-card"
                  key={d.kode}
                  onClick={() => bukaFoto(d.kode)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="slot-card__kode mono">{d.kode} · Map {pad(d.map)}</span>
                  <b>{d.bukti}</b>
                  <span className="slot-card__bar"><span className="progress"><i style={{ width: `${st.perlu ? Math.round((st.ada / st.perlu) * 100) : 0}%` }} /></span><span className="mono">{st.ada}/{st.perlu}</span></span>
                  <em>Menunggu dokumentasi <ArrowUpRight size={13} /></em>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="section" id="foto-kelengkapan">
        <SectionHead kode="03 / Kebutuhan" title="Foto apa yang perlu disiapkan" desc="Daftar bidikan foto per materi — panduan bagi guru dan operator dalam mendokumentasikan kegiatan. Pilih kategori, cari, atau saring berdasarkan tingkat kebutuhan." />

        <div className="chip-row" role="tablist" aria-label="Saring kategori">
          <button type="button" role="tab" aria-selected={kategori === 'semua'} className={`chip${kategori === 'semua' ? ' is-aktif' : ''}`} onClick={() => setKategori('semua')}>Semua kategori</button>
          {f.kategori.map((k) => (
            <button type="button" role="tab" aria-selected={kategori === k.id} key={k.id} className={`chip${kategori === k.id ? ' is-aktif' : ''}`} onClick={() => setKategori(k.id)}>{k.nama}</button>
          ))}
        </div>

        <div className="pkks-tools pkks-tools--tiga">
          <label className="field">
            <span><Search size={14} /> Cari materi PKKS</span>
            <input type="search" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Kode, bukti fisik, atau kutipan dokumen" autoComplete="off" />
          </label>
          <label className="field field--kecil">
            <span><SlidersHorizontal size={14} /> Map</span>
            <select value={mapFilter} onChange={(e) => setMapFilter(e.target.value)}>
              <option value="semua">Semua map</option>
              {data.maps.map((mp) => <option key={mp.no} value={String(mp.no)}>Map {pad(mp.no)}</option>)}
            </select>
          </label>
          <label className="field field--kecil">
            <span>Tingkat kebutuhan</span>
            <select value={tingkat} onChange={(e) => setTingkat(e.target.value)}>
              <option value="semua">Semua tingkat</option>
              <option value="wajib">Wajib foto</option>
              <option value="pendukung">Foto pendukung</option>
              <option value="belum">Belum lengkap</option>
            </select>
          </label>
        </div>

        <div className="lengkap-head">
          <span>Kode</span><span>Materi / bukti fisik</span><span>Kategori kegiatan</span><span>Foto</span><span />
        </div>
        <div className="lengkap-daftar">
          {baris.map((d, i) => {
            const st = statusFoto(data, d.kode);
            return (
              <motion.div
                className="lengkap-row"
                key={d.kode}
                data-kode={d.kode}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.32, delay: Math.min(i * 0.01, 0.12) }}
                whileHover={{ x: 3 }}
              >
                <span className="mono lengkap-row__kode">{d.kode}</span>
                <span className="lengkap-row__materi"><b>{d.bukti}</b><small>Map {pad(d.map)} · {d.berkas}</small></span>
                <span className="lengkap-row__kat">
                  {st.b.k.length ? st.b.k.map((k) => <Tag key={k} tone="netral">{namaKat(data, k)}</Tag>) : '—'}
                </span>
                <span className="lengkap-row__foto">
                  <Tag tone={st.b.t === 'wajib' ? 'merah' : 'emas'}>{labelTingkat(st.b.t)}</Tag>
                  <b className="mono">{st.ada}/{st.perlu}</b>
                  <ProgressBar value={st.ada} max={st.perlu} />
                </span>
                <button className="btn btn--kecil" type="button" onClick={() => bukaFoto(d.kode)}>
                  Lihat <ArrowUpRight size={13} />
                </button>
              </motion.div>
            );
          })}
          {baris.length === 0 ? (
            kategori !== 'semua' ? (
              <EmptyState icon={Search} title="Kategori ini tidak menuntut foto apa pun" text={`Tidak ada bidikan yang perlu disiapkan untuk ${namaKat(data, kategori)}. Coba kategori lain atau hapus penyaringan.`} />
            ) : (
              <EmptyState icon={Search} title="Tidak ada materi yang cocok" text="Ubah kata kunci, map, atau tingkat kebutuhan." />
            )
          ) : null}
        </div>
        <p className="catatan">Menampilkan {baris.length} dari {relevan.length} materi yang membutuhkan dokumentasi. {f.ringkasan.tidak} butir lainnya tidak memerlukan foto kegiatan.</p>
      </section>
    </div>
  );
}
