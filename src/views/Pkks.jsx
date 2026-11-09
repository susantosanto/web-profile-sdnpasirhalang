import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FolderOpen, Images, Search, SlidersHorizontal } from 'lucide-react';
import { useSite } from '../App';
import { Item, ProgressBar, Reveal, Stagger } from '../components/motion';
import { ActionLink, PageFolio, SectionHead, Tag } from '../components/Ui';
import {
  driveFile, hrefFoto, jumlahTautan, labelTingkat, mapJudul, pad, statusFoto
} from '../lib/site';

export default function Pkks() {
  const { data, bukaDokumen } = useSite();
  const [cari, setCari] = useState('');
  const [saring, setSaring] = useState('semua');

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return data.docs.filter((d) => {
      if (q && ![d.kode, d.bukti, d.berkas, d.indikator].join(' ').toLowerCase().includes(q)) return false;
      if (saring === 'lokal' && d.eksternal) return false;
      if (saring === 'eksternal' && !d.eksternal) return false;
      if (saring === 'butuh-foto' && statusFoto(data, d.kode).b.t === 'tidak') return false;
      return true;
    });
  }, [cari, saring, data]);

  const perMap = useMemo(() => {
    const map = new Map();
    hasil.forEach((d) => {
      if (!map.has(d.map)) map.set(d.map, []);
      map.get(d.map).push(d);
    });
    return map;
  }, [hasil]);

  const f = data.foto.ringkasan;
  const totalTautan = jumlahTautan();

  return (
    <div className="wrap page-inner">
      <PageFolio
        kode="Menu · PKKS 2026/2027"
        title="Penilaian Kinerja Kepala Sekolah"
        lede="Indeks 12 map kompetensi dan 102 butir bukti fisik. Hanya butir yang meminta foto secara eksplisit di dalam dokumennya yang tertaut ke daftar bidikan foto, sehingga pengawas dapat menelusuri bukti dari satu materi yang sama."
        meta={`Sumber: ${data.meta.sumberPkks}`}
      />

      <Stagger className="stat-grid stat-grid--empat">
        <Item className="stat-card"><div className="stat-card__value">12</div><b>Map kompetensi</b><small>Standar PKKS 2026</small></Item>
        <Item className="stat-card"><div className="stat-card__value">102</div><b>Butir bukti fisik</b><small>Master Checklist</small></Item>
        <Item className="stat-card"><div className="stat-card__value">99</div><b>Berkas dokumen</b><small>.docx aktif di Dokumen_Terisi</small></Item>
        <Item className="stat-card"><div className="stat-card__value">3</div><b>Sumber eksternal</b><small>ARKAS / ATISISBADA</small></Item>
      </Stagger>

      <section className="section" id="pkks-ringkasan">
        <SectionHead kode="01 / Ringkasan arsip" title="Arsip yang siap diverifikasi" />
        <div className="dua-kolom">
          <Reveal>
            <div className="editorial">
              <p className="eyebrow">Status penyusunan</p>
              <h3>99 dari 102 bukti fisik selesai</h3>
              <p>Tiga butir sengaja dikosongkan karena buktinya berada pada aplikasi eksternal: 1.1.c (ARKAS), 2.3.b dan 2.3.c (ATISISBADA). Butir tersebut diberi label sumber eksternal, bukan "belum selesai".</p>
              <p className="catatan">Tautan <span className="mono">Link Template Asal</span> pada Master Checklist adalah templat, bukan berkas final. Situs hanya menampilkan tautan berkas yang benar-benar didaftarkan.</p>
              <ActionLink href="#pkks/indeks">Telusuri indeks dokumen</ActionLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ringkas-box">
              <span className="mono">KONFIGURASI GOOGLE DRIVE</span>
              <h4>{totalTautan === 0 ? 'Menunggu tautan Drive' : `${totalTautan} tautan terdaftar`}</h4>
              <p>12 URL folder Map dan tautan berkas final per kode belum diisi. Antarmuka sengaja tidak membuat tautan palsu; isi <span className="mono">src/config.js</span> lalu build ulang.</p>
              <div className="ringkas-box__bar"><ProgressBar value={totalTautan} max={102} /></div>
              <small>{totalTautan} / 102 tautan berkas final</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper band-full" id="pkks-mutu">
        <SectionHead kode="02 / Capaian mutu" title="Rapor Pendidikan 2025" desc={data.indikatorPbd} />
        <Stagger className="capaian-grid">
          {data.capaian.map((c) => (
            <Item className="capaian-card" key={c.label}>
              <span className="capaian-card__label">{c.label}</span>
              <strong>{c.nilai}</strong>
              <small>{c.note}</small>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="section" id="pkks-dokumentasi">
        <SectionHead kode="03 / Kelengkapan foto" title="Dokumentasi kegiatan per materi" desc="Klasifikasi ditetapkan setelah memindai teks 99 berkas dokumen dan mengaudit seluruh gambar tertanam." />
        <div className="foto-ringkas">
          <Reveal className="foto-ringkas__item">
            <span className="foto-ringkas__angka">{f.wajib}</span>
            <b>Wajib foto</b>
            <small>Dokumennya sendiri menuliskan permintaan foto secara eksplisit.</small>
          </Reveal>
          <Reveal className="foto-ringkas__item" delay={0.08}>
            <span className="foto-ringkas__angka">{f.pendukung}</span>
            <b>Foto pendukung</b>
            <small>Bukti fisik berwujud benda; foto opsional, bukan syarat.</small>
          </Reveal>
          <Reveal className="foto-ringkas__item" delay={0.16}>
            <span className="foto-ringkas__angka">{f.tidak}</span>
            <b>Tidak perlu foto</b>
            <small>SK, rencana, data, instrumen, daftar hadir, notulen, dan berita acara.</small>
          </Reveal>
          <Reveal className="foto-ringkas__item" delay={0.24}>
            <span className="foto-ringkas__angka">{f.bidikan}</span>
            <b>Bidikan foto</b>
            <small>Total bidikan pada {f.wajib + f.pendukung} materi yang relevan.</small>
          </Reveal>
        </div>
        <ActionLink href="#foto/kelengkapan">Buka kelengkapan foto per materi PKKS</ActionLink>
      </section>

      <section className="section" id="pkks-indeks">
        <SectionHead kode="04 / Indeks 12 map" title="Indeks dokumen" />

        <div className="pkks-tools">
          <label className="field">
            <span><Search size={14} /> Cari dokumen</span>
            <input
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Kode, bukti fisik, indikator, atau nama berkas"
              autoComplete="off"
            />
          </label>
          <label className="field field--kecil">
            <span><SlidersHorizontal size={14} /> Saring</span>
            <select value={saring} onChange={(e) => setSaring(e.target.value)}>
              <option value="semua">Semua butir</option>
              <option value="lokal">Berkas lokal</option>
              <option value="eksternal">Sumber eksternal</option>
              <option value="butuh-foto">Membutuhkan foto</option>
            </select>
          </label>
        </div>

        <p className="status-koneksi">
          {totalTautan === 0
            ? 'Menunggu tautan Drive — 12 folder Map dan tautan berkas final belum dikonfigurasi.'
            : `${totalTautan} tautan berkas final terdaftar.`}
        </p>

        <div className="pkks-layout">
          <aside className="map-nav">
            <p className="map-nav__judul">Daftar map</p>
            {data.maps.map((mp) => (
              <button
                type="button"
                key={mp.no}
                onClick={() => {
                  const el = document.getElementById(`map-${pad(mp.no)}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>{pad(mp.no)}</span> {mp.judul}
              </button>
            ))}
          </aside>

          <div className="pkks-daftar">
            {data.maps.map((mp) => {
              const baris = perMap.get(mp.no) || [];
              if (!baris.length) return null;
              return (
                <section className="map-blok" id={`map-${pad(mp.no)}`} key={mp.no}>
                  <div className="map-blok__head">
                    <span className="map-blok__no">MAP {pad(mp.no)}</span>
                    <h3>{mp.judul}</h3>
                    <span className="map-blok__total">{baris.length} butir</span>
                  </div>
                  <div className="doc-head">
                    <span>Kode</span><span>Bukti fisik / berkas</span><span>Foto kegiatan</span><span />
                  </div>
                  {baris.map((d, i) => {
                    const st = statusFoto(data, d.kode);
                    return (
                      <motion.div
                        className="doc-row"
                        key={d.kode}
                        role="button"
                        tabIndex={0}
                        onClick={() => bukaDokumen(d.kode)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') bukaDokumen(d.kode); }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, delay: Math.min(i * 0.012, 0.15) }}
                        whileHover={{ x: 3 }}
                      >
                        <span className="doc-row__kode mono">{d.kode}</span>
                        <span className="doc-row__bukti">
                          <b>{d.bukti}</b>
                          <small>{d.berkas || (d.eksternal ? 'Sumber eksternal' : '—')}</small>
                          {d.eksternal ? <Tag tone="emas">Sumber eksternal</Tag> : null}
                        </span>
                        <span className="doc-row__foto">
                          {st.b.t === 'tidak' ? <span className="foto-tidak">—</span> : (
                            <a
                              className={`foto-link ${st.lengkap ? 'is-lengkap' : ''}`}
                              href={hrefFoto(d.kode)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {st.b.t === 'wajib' ? 'Wajib' : 'Pendukung'} · {st.ada}/{st.perlu}
                            </a>
                          )}
                        </span>
                        <span className="doc-row__aksi">
                          {driveFile(d.kode) ? <FolderOpen size={15} /> : <FileText size={15} />}
                        </span>
                      </motion.div>
                    );
                  })}
                </section>
              );
            })}
            {hasil.length === 0 ? (
              <div className="empty-state">
                <Images size={26} strokeWidth={1.4} />
                <strong>Tidak ada dokumen yang cocok</strong>
                <p>Ubah kata kunci atau penyaringan untuk melihat butir lainnya.</p>
              </div>
            ) : null}
            <p className="catatan">Menampilkan {hasil.length} dari {data.docs.length} butir. Klik baris untuk membuka detail dokumen.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
