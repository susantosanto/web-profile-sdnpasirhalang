/**
 * Sinkronisasi data situs.
 *
 * Sumber kebenaran tetap Web_Resmi_SDN_Pasirhalang/assets/data.js yang
 * dihasilkan build_data.py dari workbook resmi dan berkas .docx nyata.
 * Skrip ini hanya mengubah pembungkus `window.SITE_DATA = ...;` menjadi
 * berkas JSON murni yang bisa di-import React.
 *
 * Alur pembaruan:
 *   1. python tools/build_data.py        (menghasilkan assets/data.js di situs lama)
 *   2. salin berkas itu ke tools/data.js
 *   3. npm run sync:data
 *   4. npm run build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const source = path.join(root, 'tools', 'data.js');
const target = path.join(root, 'src', 'data', 'siteData.json');

const raw = fs.readFileSync(source, 'utf8').trim();
const marker = 'window.SITE_DATA = ';
if (!raw.startsWith(marker) || !raw.endsWith(';')) {
  throw new Error('Format tools/data.js tidak dikenali. Jalankan ulang build_data.py.');
}

const parsed = JSON.parse(raw.slice(marker.length, -1));
if (!parsed.docs || parsed.docs.length !== 102 || !parsed.foto) {
  throw new Error('Data tidak lengkap: docs harus 102 butir dan objek foto harus ada.');
}

fs.writeFileSync(target, JSON.stringify(parsed, null, 2) + '\n', 'utf8');
console.log(
  `OK -> ${target} | ${parsed.maps.length} map, ${parsed.docs.length} butir, ` +
  `${Object.keys(parsed.foto.butir).length} klasifikasi foto`
);
