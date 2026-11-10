import { useState } from 'react';
import { Clock3 } from 'lucide-react';
import { SectionHead } from './Ui';

const WAKTU = { 0: '06.30–07.00', 1: '07.00–07.35', 2: '07.35–08.10', 3: '08.10–08.45', 4: '08.45–09.20', IST: '09.20–09.50', 5: '09.50–10.25', 6: '10.25–11.00', 7: '11.00–11.35', 8: '11.35–12.10', 9: '12.10–12.45', 10: '12.45–13.20' };
const KELAS = ['I', 'II', 'III', 'IV', 'VA', 'VB', 'VI'];
// Jadwal khusus kelas 1 — sumber: Jadwal Pelajaran Kelas I (Satu) Tahun 2026.
// [jam, waktu, Senin..Jumat] — '' = pulang, IST = istirahat
const KELAS1_ROWS = [
  ['1', '07.00–07.30', ['PAIBP', 'Matematika', 'B. Indonesia', 'Matematika', 'Mulok']],
  ['2', '07.30–08.00', ['PAIBP', 'Matematika', 'B. Indonesia', 'Matematika', 'Mulok']],
  ['3', '08.00–08.30', ['PAIBP', 'Matematika (KO)', 'B. Indonesia (KO)', 'B. Indonesia', 'Seni']],
  ['4', '08.30–09.00', ['PAIBP (KO)', 'PJOK', 'Pend. Pancasila', 'B. Indonesia', 'Seni (KO)']],
  ['IST', '09.00–09.15', ['ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT']],
  ['5', '09.15–09.45', ['B. Indonesia', 'PJOK', 'Pend. Pancasila', 'Pend. Pancasila', '']],
  ['6', '09.45–10.15', ['B. Indonesia', 'PJOK', 'Seni', 'Pend. Pancasila', '']],
  ['7', '10.15–10.45', ['B. Indonesia', 'PJOK (KO)', 'Seni', 'Pend. Pancasila (KO)', '']],
];
// [jam, K1..K6] — '' = tidak ada KBM, IST = istirahat
const HARI = [
  { hari: 'Senin', buka: 'Upacara', rows: [
    [1, '', 'PJOK', 'Pend. Pancasila', 'Pend. Pancasila', 'Pend. Pancasila', 'Upacara', 'Pend. Pancasila'],
    [2, '', 'PJOK', 'Pend. Pancasila', 'Pend. Pancasila', 'Pend. Pancasila', 'Matematika', 'Pend. Pancasila'],
    [3, '', 'PJOK', 'Pend. Pancasila', 'Pend. Pancasila', 'Pend. Pancasila', 'Matematika', 'Pend. Pancasila'],
    [4, '', 'PJOK', 'Matematika', 'Matematika', 'B. Indonesia', 'Matematika', 'Pend. Pancasila'],
    ['IST', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT'],
    [5, '', 'Pend. Pancasila', 'B. Indonesia', 'Matematika', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia'],
    [6, '', 'Pend. Pancasila', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia'],
    [7, '', 'Pend. Pancasila', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia', 'B. Indonesia'],
    [8, '', '', '', 'B. Indonesia', 'B. Inggris', 'Pend. Pancasila', 'B. Inggris'],
    [9, '', '', '', '', 'B. Inggris', 'Pend. Pancasila', 'B. Inggris'],
    [10, '', '', '', '', 'B. Inggris', 'Pend. Pancasila', ''],
  ]},
  { hari: 'Selasa', buka: 'Serasi', rows: [
    [1, '', 'Seni Budaya', 'PAIBP', 'Matematika', 'IPAS', 'Matematika', 'Matematika'],
    [2, '', 'Seni Budaya', 'PAIBP', 'Matematika', 'IPAS', 'Matematika', 'Matematika'],
    [3, '', 'B. Indonesia', 'PAIBP', 'Matematika', 'IPAS', 'Matematika', 'Matematika'],
    [4, '', 'B. Indonesia', 'PAIBP', 'Matematika', 'IPAS', 'Matematika', 'Matematika'],
    ['IST', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT'],
    [5, '', 'B. Indonesia', 'B. Inggris', 'B. Inggris', 'PAIBP', 'Pend. Pancasila', 'IPAS'],
    [6, '', 'B. Indonesia', 'B. Inggris', 'B. Inggris', 'PAIBP', 'Pend. Pancasila', 'IPAS'],
    [7, '', 'B. Indonesia', 'IPAS', 'IPAS', 'PAIBP', 'PJOK', 'IPAS'],
    [8, '', '', '', 'IPAS', 'Seni Rupa', 'PJOK', 'Seni'],
    [9, '', '', '', 'IPAS', 'Seni Rupa', 'PJOK', 'Seni'],
    [10, '', '', '', '', 'Seni Rupa', 'PJOK', ''],
  ]},
  { hari: 'Rabu', buka: 'Reresik', rows: [
    [1, '', 'PAIBP', 'Matematika', 'PJOK', 'Matematika', 'B. Indonesia', 'IPAS'],
    [2, '', 'PAIBP', 'Matematika', 'PJOK', 'Matematika', 'B. Indonesia', 'IPAS'],
    [3, '', 'PAIBP', 'Matematika', 'PJOK', 'Matematika', 'B. Indonesia', 'IPAS'],
    [4, '', 'PAIBP', 'Pend. Pancasila', 'PJOK', 'Matematika', 'B. Indonesia', 'Pend. Pancasila'],
    ['IST', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT'],
    [5, '', 'B. Indonesia', 'IPAS', 'Pend. Pancasila', 'PJOK', 'Seni Rupa', 'Seni'],
    [6, '', 'B. Indonesia', 'IPAS', 'Pend. Pancasila', 'PJOK', 'Seni Rupa', 'B. Indonesia'],
    [7, '', 'B. Indonesia', 'IPAS', 'IPAS', 'PJOK', 'PAIBP', 'B. Indonesia'],
    [8, '', '', '', 'IPAS', 'B. Sunda', 'PAIBP', 'B. Indonesia'],
    [9, '', '', '', 'IPAS', 'B. Sunda', 'PAIBP', 'B. Indonesia'],
    [10, '', '', '', '', 'B. Sunda', 'PAIBP', ''],
  ]},
  { hari: 'Kamis', buka: 'Sekar', rows: [
    [1, '', 'B. Indonesia', 'PJOK', 'B. Indonesia', 'IPAS', 'IPAS', 'PAIBP'],
    [2, '', 'Matematika', 'PJOK', 'B. Indonesia', 'IPAS', 'IPAS', 'PAIBP'],
    [3, '', 'Matematika', 'PJOK', 'B. Indonesia', 'IPAS', 'IPAS', 'PAIBP'],
    [4, '', 'Matematika', 'B. Indonesia', 'B. Indonesia', 'Pend. Pancasila', 'IPAS', 'PAIBP'],
    ['IST', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT'],
    [5, '', 'Matematika', 'B. Sunda', 'B. Sunda', 'Pend. Pancasila', 'B. Sunda', 'Seni'],
    [6, '', 'B. Sunda', 'B. Sunda', 'B. Sunda', 'Pend. Pancasila', 'B. Sunda', 'PJOK'],
    [7, '', 'B. Sunda', 'B. Indonesia', 'Seni Budaya', 'Matematika', 'B. Inggris', 'PJOK'],
    [8, '', '', '', 'Seni Budaya', 'Matematika', 'B. Inggris', 'PJOK'],
    [9, '', '', '', '', 'Matematika', 'Seni Rupa', 'PJOK'],
    [10, '', '', '', '', 'Matematika', 'Seni Rupa', ''],
  ]},
  { hari: "Jumat", buka: 'Sejadah', rows: [
    [1, '', 'Matematika', 'Matematika', 'PAIBP', 'B. Indonesia', 'Pembiasaan', 'Matematika'],
    [2, '', 'Matematika', 'Matematika', 'PAIBP', 'B. Indonesia', 'IPAS', 'Matematika'],
    [3, '', 'Pend. Pancasila', 'SBdP', 'PAIBP', 'B. Indonesia', 'IPAS', 'B. Sunda'],
    [4, '', 'Pend. Pancasila', 'SBdP', 'PAIBP', 'Matematika', 'IPAS', 'B. Sunda'],
    ['IST', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT', 'ISTIRAHAT'],
    [5, '', 'Seni Budaya', 'IPAS', 'Seni Budaya', 'Matematika', 'Pend. Pancasila', ''],
    [6, '', 'Seni Budaya', 'B. Indonesia', 'Seni Budaya', 'Matematika', 'Pend. Pancasila', ''],
    [7, '', '', 'IPAS', '', '', 'Pend. Pancasila', ''],
    [8, '', '', '', '', '', 'Pend. Pancasila', ''],
    [9, '', '', '', '', '', 'Pend. Pancasila', ''],
    [10, '', '', '', '', '', 'Pend. Pancasila', ''],
  ]},
];

export default function Jadwal() {
  const [kelas, setKelas] = useState('I');
  const HARI_NAMA = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  // Susun baris tabel untuk kelas terpilih: [jam, waktu, nilaiSenin..Jumat, isBuka, isIstirahat]
  const baris = kelas === 'I'
    ? KELAS1_ROWS.map((r) => ({ jam: r[0] === 'IST' ? '—' : r[0], waktu: r[1], vals: r[2], buka: false, ist: r[0] === 'IST' }))
    : (() => {
        const ci = KELAS.indexOf(kelas);
        const rows = [{ jam: '0', waktu: WAKTU[0], vals: HARI.map((h) => h.buka), buka: true, ist: false }];
        const slotPertama = HARI[0].rows;
        slotPertama.forEach((contoh, i) => {
          const jam = contoh[0];
          rows.push({
            jam: jam === 'IST' ? '—' : jam,
            waktu: WAKTU[jam],
            vals: HARI.map((h) => h.rows[i][1 + ci]),
            buka: false,
            ist: jam === 'IST'
          });
        });
        return rows;
      })();

  return (
    <section className="section" id="profil-jadwal">
      <div className="wrap">
      <SectionHead kode="07 / Jadwal" title="Jadwal pelajaran 2026/2027" desc="Semester ganjil · 5 hari sekolah · disahkan Cikalongwetan, 15 Juli 2026 oleh Ahmad, S.Pd. Jadwal kelas 1 ditetapkan 20 Juli 2026." />
      <div className="chip-row" role="tablist" aria-label="Pilih kelas">
        {KELAS.map((k) => (
          <button key={k} type="button" role="tab" aria-selected={kelas === k} className={`chip${kelas === k ? ' is-aktif' : ''}`} onClick={() => setKelas(k)}>{k === 'VA' ? 'Kelas 5A' : k === 'VB' ? 'Kelas 5B' : `Kelas ${k}`}</button>
        ))}
      </div>
      <div className="table-wrap jadwal-wrap">
        <table className="tbl jadwal-tbl">
          <thead><tr><th>Jam</th><th><Clock3 size={12} /> Waktu</th>{HARI_NAMA.map((d) => <th key={d}>{d}</th>)}</tr></thead>
          <tbody>
            {baris.map((r, i) => (
              <tr key={i} className={r.buka ? 'jadwal-buka' : r.ist ? 'jadwal-ist' : ''}>
                <td>{r.jam}</td>
                <td className="mono">{r.waktu}</td>
                {r.vals.map((mapel, j) => <td key={j}>{mapel || '·'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="catatan">Kelas 1 mengikuti pembiasaan pagi dan istirahat bersama; KBM kelas 1 berakhir 10.45 (Jumat 10.15). Kelas 5b siang memakai Ruang Kelas 5, kelas 4 memakai Ruang Guru.</p>
      </div>
    </section>
  );
}
