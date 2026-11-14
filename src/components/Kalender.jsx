import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Item, Stagger } from './motion';
import { SectionHead } from './Ui';

const BULAN = [
  { bulan: 'Juli 2026', items: [
    { tgl: '13', nama: 'Hari pertama masuk sekolah semester 1', tipe: 'kegiatan' },
    { tgl: '13–21', nama: 'MPLS — Masa Perkenalan Lingkungan Sekolah', tipe: 'kegiatan' },
  ]},
  { bulan: 'Agustus 2026', items: [
    { tgl: '3–31', nama: 'Survei Lingkungan Belajar (Sulingjar) KS & Guru', tipe: 'kegiatan' },
    { tgl: '1–31', nama: 'Imunisasi SD/MI kelas 1, 2, 5, 6', tipe: 'kegiatan' },
    { tgl: '14', nama: 'Hari Pramuka Nasional', tipe: 'kegiatan' },
    { tgl: '17', nama: 'Libur Proklamasi Kemerdekaan RI', tipe: 'libur' },
    { tgl: '17–23', nama: 'O2SN tingkat nasional (luring)', tipe: 'kegiatan' },
    { tgl: '25', nama: 'Libur Maulid Nabi Muhammad SAW', tipe: 'libur' },
    { tgl: '25–31', nama: 'OSN tingkat nasional (luring)', tipe: 'kegiatan' },
  ]},
  { bulan: 'September 2026', items: [
    { tgl: '28–3 Okt', nama: 'FLS3N tingkat nasional (daring)', tipe: 'kegiatan' },
  ]},
  { bulan: 'November 2026', items: [
    { tgl: '1–30', nama: 'Imunisasi SD/MI kelas 1, 2, 5, 6', tipe: 'kegiatan' },
    { tgl: '21', nama: 'Gelar Aksi Karakter Siswa Indonesia tk. provinsi', tipe: 'kegiatan' },
    { tgl: '25', nama: 'Hari Guru Nasional', tipe: 'kegiatan' },
    { tgl: '30–11 Des', nama: 'Asesmen Sumatif Akhir Semester 1', tipe: 'asesmen' },
  ]},
  { bulan: 'Desember 2026', items: [
    { tgl: '3', nama: 'Hari Disabilitas Internasional', tipe: 'kegiatan' },
    { tgl: '23', nama: 'Penetapan & pembagian rapor semester 1', tipe: 'rapor' },
    { tgl: '24', nama: 'Cuti bersama Hari Natal', tipe: 'libur' },
    { tgl: '25', nama: 'Libur Hari Natal', tipe: 'libur' },
    { tgl: '28–8 Jan', nama: 'Libur semester 1', tipe: 'libur' },
  ]},
  { bulan: 'Januari 2027', items: [
    { tgl: '11', nama: 'Hari pertama masuk sekolah semester 2', tipe: 'kegiatan' },
  ]},
  { bulan: 'Februari 2027', items: [
    { tgl: '8–12', nama: 'Perkiraan libur awal Ramadan 1448 H', tipe: 'libur' },
    { tgl: '15–5 Mar', nama: 'SmartTren / Penumbuhan Budi Pekerti', tipe: 'kegiatan' },
  ]},
  { bulan: 'Maret 2027', items: [
    { tgl: '8–19', nama: 'Perkiraan libur Idul Fitri 1448 H', tipe: 'libur' },
    { tgl: 'Mar–Jun', nama: 'Lomba bakat minat kreativitas siswa tk. kabupaten', tipe: 'kegiatan' },
  ]},
  { bulan: 'April 2027', items: [
    { tgl: '19–30', nama: 'Tes Kemampuan Akademik (TKA) SD/MI', tipe: 'asesmen' },
    { tgl: '26', nama: 'Libur Wafat Isa Almasih', tipe: 'libur' },
  ]},
  { bulan: 'Mei 2027', items: [
    { tgl: '1', nama: 'Libur Hari Buruh', tipe: 'libur' },
    { tgl: '2', nama: 'Hari Pendidikan Nasional', tipe: 'kegiatan' },
    { tgl: '6', nama: 'Libur Kenaikan Isa Almasih', tipe: 'libur' },
    { tgl: '11–21', nama: 'Sumatif Akhir Jenjang SD', tipe: 'asesmen' },
    { tgl: '16', nama: 'Libur Waisak 2571', tipe: 'libur' },
    { tgl: '17', nama: 'Perkiraan Idul Adha 1448 H', tipe: 'libur' },
    { tgl: '28', nama: 'Perkiraan pembagian rapor kelas VI', tipe: 'rapor' },
  ]},
  { bulan: 'Juni 2027', items: [
    { tgl: '1', nama: 'Libur Hari Lahir Pancasila', tipe: 'libur' },
    { tgl: '2', nama: 'Penetapan kelulusan SD/SDLB', tipe: 'rapor' },
    { tgl: '6', nama: 'Libur Tahun Baru Islam', tipe: 'libur' },
    { tgl: '7–18', nama: 'Sumatif Akhir Tahun / Akhir Fase', tipe: 'asesmen' },
    { tgl: '25', nama: 'Penetapan & pembagian rapor semester 2', tipe: 'rapor' },
    { tgl: '28–9 Jul', nama: 'Libur akhir tahun pelajaran', tipe: 'libur' },
  ]},
  { bulan: 'Juli 2027', items: [
    { tgl: 'Jun–Jul', nama: 'Masa SPMB tahun pelajaran 2027/2028', tipe: 'kegiatan' },
  ]},
];

const SEMS = ['Semua', 'Semester 1', 'Semester 2'];
const S1 = ['Juli 2026', 'Agustus 2026', 'September 2026', 'November 2026', 'Desember 2026', 'Januari 2027'];

export default function Kalender() {
  const [sem, setSem] = useState('Semua');
  const daftar = BULAN.filter((b) => sem === 'Semua' || (sem === 'Semester 1' ? S1.includes(b.bulan) : !S1.includes(b.bulan)));
  return (
    <section className="section section--merah" id="profil-kaldik">
      <div className="wrap">
        <SectionHead kode="07 / Kalender" title="Kalender pendidikan 2026/2027" desc="Edaran Disdik Kab. Bandung Barat No. 400.3.1/1074-disdik/2026 — diselaraskan untuk SDN Pasirhalang." />
        <div className="chip-row" role="tablist" aria-label="Filter semester">
          {SEMS.map((s) => (
            <button key={s} type="button" role="tab" aria-selected={sem === s} className={`chip${sem === s ? ' is-aktif' : ''}`} onClick={() => setSem(s)}>{s}</button>
          ))}
        </div>
        <Stagger className="kaldik-grid">
          {daftar.map((b) => (
            <Item key={b.bulan} className="kaldik-card">
              <div className="kaldik-card__head"><CalendarDays size={16} /><b>{b.bulan}</b></div>
              <ul>
                {b.items.map((e, i) => (
                  <li key={i}><span className={`kaldik-tgl kaldik-tgl--${e.tipe}`}>{e.tgl}</span><span>{e.nama}</span></li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>
        <p className="catatan">Kepastian libur keagamaan menyesuaikan penetapan pemerintah. Rapor kelas akhir ditetapkan pada rapat kelulusan.</p>
      </div>
    </section>
  );
}
