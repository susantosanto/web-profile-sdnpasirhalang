export const VIEWS = ['beranda', 'profil', 'tatib', 'foto', 'kontak'];

export const NAV = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'profil', label: 'Profil sekolah' },
  { id: 'tatib', label: 'Tata tertib' },
  {
    id: 'foto', label: 'Foto kegiatan',
    sub: [
      ['kategori', 'Kategori kegiatan'],
      ['galeri', 'Galeri foto']
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

export function fmtBilangan(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
