import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Images, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
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

  const pilih = (id) => {
    setKategori((k) => (k === id ? 'semua' : id));
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
        <SectionHead kode="01 / Referensi" title="Kategori kegiatan PKKS" desc="Delapan kategori referensi aktivitas PKKS. Kategori dengan 0 butir tetap ditampilkan sebagai penanda bahwa tidak ada foto yang disyaratkan pada aktivitas tersebut." />
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
        <SectionHead kode="02 / Galeri" title="Galeri foto terunggah" />
        <div className="chip-row">
          <button type="button" className={`chip ${kategori === 'semua' ? 'is-aktif' : ''}`} onClick={() => setKategori('semua')}>Semua kategori</button>
          {f.kategori.map((k) => (
            <button type="button" key={k.id} className={`chip ${kategori === k.id ? 'is-aktif' : ''}`} onClick={() => pilih(k.id)}>{k.nama}</button>
          ))}
        </div>
        <p className="status-koneksi">
          {galeri.length === 0
            ? '0 foto terunggah — simpan berkas di public/foto/ lalu daftarkan pada DRIVE_CONFIG.photos.'
            : `${galeriTampil.length} foto ditampilkan.`}
        </p>
        {galeriTampil.length ? (
          <div className="foto-grid">
            {galeriTampil.map((g, i) => (
              <motion.figure className="foto-card" key={`${g.kode}-${i}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <img src={g.src} alt={g.judul || g.kode} loading="lazy" />
                <figcaption><b>{g.judul}</b><small>{g.tanggal} · {g.kode}</small></figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Images}
            title="Belum ada foto kegiatan"
            text="Galeri sengaja dibiarkan kosong sampai foto asli tersedia. Daftar bidikan yang dibutuhkan tetap dapat diperiksa pada tabel kelengkapan di bawah."
          />
        )}
      </section>

      <section className="section" id="foto-kelengkapan">
        <SectionHead kode="03 / Verifikasi" title="Kelengkapan foto per materi PKKS" desc="Hanya 12 materi yang relevan. Cari kode atau nama materi, lalu buka baris untuk melihat kutipan dasar klasifikasi dan daftar bidikan foto yang harus dipenuhi. Angka 0/11 berarti belum ada foto dari sebelas bidikan yang diminta dokumen 4.2.a." />

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
            <EmptyState icon={Search} title="Tidak ada materi yang cocok" text="Ubah kata kunci, kategori, map, atau tingkat kebutuhan." />
          ) : null}
        </div>
        <p className="catatan">Menampilkan {baris.length} dari {relevan.length} materi yang relevan dengan foto. {f.ringkasan.tidak} butir lainnya tidak memerlukan foto kegiatan.</p>
      </section>
    </div>
  );
}
