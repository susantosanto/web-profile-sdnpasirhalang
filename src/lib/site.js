import { DRIVE_CONFIG as CFG } from '../config';

export const VIEWS = ['beranda', 'profil', 'tatib', 'pkks', 'foto', 'kontak'];

export const NAV = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'profil', label: 'Profil sekolah' },
  { id: 'tatib', label: 'Tata tertib' },
  {
    id: 'pkks', label: 'PKKS',
    sub: [
      ['ringkasan', 'Ringkasan arsip'],
      ['mutu', 'Capaian mutu'],
      ['indeks', 'Indeks 12 map'],
      ['dokumentasi', 'Kelengkapan foto'],
      ['map-07', 'Map 07 · Kurikulum']
    ]
  },
  {
    id: 'foto', label: 'Foto kegiatan',
    sub: [
      ['kategori', 'Kategori kegiatan PKKS'],
      ['galeri', 'Galeri foto'],
      ['kelengkapan', 'Kelengkapan per materi']
    ]
  },
  { id: 'kontak', label: 'Kontak' }
];

export function parseHash(hash) {
  const raw = (hash || '').replace(/^#/, '').replace(/^\/+/, '');
  const [head, ...rest] = raw.split('/');
  const view = VIEWS.includes(head) ? head : 'beranda';
  return { view, target: rest.join('/') || '' };
}

export function pad(n) {
  return String(n).padStart(2, '0');
}

export function mapJudul(maps, no) {
  const m = maps.find((x) => x.no === Number(no));
  return m ? m.judul : `Map ${pad(no)}`;
}

export function fotoUntuk(kode) {
  return (CFG.photos && CFG.photos[kode]) || [];
}

export function semuaFoto() {
  const out = [];
  Object.keys(CFG.photos || {}).forEach((kode) => {
    (CFG.photos[kode] || []).forEach((f) => out.push({ ...f, kode }));
  });
  return out;
}

export function statusFoto(data, kode) {
  const b = data.foto.butir[kode] || { t: 'tidak', k: [], alasan: '', bidikan: [] };
  const ada = fotoUntuk(kode).length;
  const perlu = b.bidikan.length;
  return { b, ada, perlu, lengkap: perlu > 0 && ada >= perlu };
}

export function labelTingkat(t) {
  return t === 'wajib' ? 'Wajib foto' : t === 'pendukung' ? 'Foto pendukung' : 'Tidak perlu foto';
}

export function namaKat(data, id) {
  const k = data.foto.kategori.find((x) => x.id === id);
  return k ? k.nama : id;
}

export function katUntuk(data, kode) {
  const b = data.foto.butir[kode];
  return b ? b.k : [];
}

export function driveFile(kode) {
  return (CFG.files && CFG.files[kode]) || null;
}

export function driveFolder(no) {
  return (CFG.folders && CFG.folders[String(no)]) || null;
}

export function jumlahTautan() {
  return Object.keys(CFG.files || {}).length;
}

export function hrefFoto(kode) {
  return `#foto/kode-${kode}`;
}

export function fmtBilangan(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
