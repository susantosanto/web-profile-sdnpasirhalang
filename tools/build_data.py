# -*- coding: utf-8 -*-
"""Bangun tools/data.js dari sumber resmi proyek PKKS. Read-only terhadap semua sumber.

Hasil: window.SITE_DATA = {...};  ->  diproses lanjut oleh tools/sync-data.mjs
menjadi src/data/siteData.json untuk aplikasi React.

Sumber kebenaran:
  - profil-SD NEGERI PASIRHALANG-2026-10-27 12-32-16.xlsx
  - Master_Checklist_PKKS_2026_SDN_Pasirhalang.xlsx (sheet Checklist & Ringkasan)
  - Dokumen_Terisi/*.docx (teks word/document.xml + media tertanam)
  - STATE.md / AGENTS.md / Daftar_Tautan_Dokumen.md (identitas & terminologi)
"""
import collections
import hashlib
import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

import openpyxl

APP = Path(__file__).resolve().parents[1]          # Web_Resmi_SDN_Pasirhalang_React
BASE = Path(__file__).resolve().parents[2]          # root PKKS (tempat workbook & Dokumen_Terisi)
OUT = Path(__file__).resolve().parent / "data.js"   # tools/data.js

PROFIL_XLSX = BASE / "profil-SD NEGERI PASIRHALANG-2026-10-27 12-32-16.xlsx"
CHECKLIST_XLSX = BASE / "Master_Checklist_PKKS_2026_SDN_Pasirhalang.xlsx"
DOKUMEN_DIR = BASE / "Dokumen_Terisi"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

# Koordinat resmi yang diberikan pengguna (WGS-84 / GPS).
LINTANG = "-6.751900536454254"
BUJUR = "107.45836266334244"
KOORDINAT = f"{LINTANG}, {BUJUR}"


def squash(value):
    return re.sub(r"\s+", " ", "" if value is None else str(value)).strip()


def sentence(value):
    s = squash(value).lower()
    return s[:1].upper() + s[1:] if s else s


def bersih(value):
    s = squash(value)
    pasangan = [
        (r"Profil Pelajar Pancasila", "Profil Lulusan"),
        (r"PPDB", "SPMB"),
        (r"[Pp]enerimaan [Pp]eserta [Dd]idik [Bb]aru", "penerimaan murid baru"),
        (r"Ujian [Ss]ekolah", "TKA"),
        (r"Uji [Kk]esetaraan", "TKA"),
        (r"\bKSP\b", "KOSP"),
        (r"Bernalar [Kk]ritis", "Penalaran Kritis"),
        (r"Berkebinekaan [Gg]lobal", "Kewargaan"),
        (r"\bSiswa\b", "Murid"),
        (r"\bsiswa\b", "murid"),
    ]
    for pola, ganti in pasangan:
        s = re.sub(pola, ganti, s)
    return s


def nama(value):
    s = squash(value)
    if s == "Ahmad, S.PD":
        return "Ahmad, S.Pd."
    if s.isupper():
        return s.title()
    return s


def angka(value):
    if value is None or value == "":
        return ""
    if isinstance(value, (int, float)):
        return str(int(value)) if float(value).is_integer() else str(value)
    return squash(value)


def docx_teks(path):
    """Teks bersih: gabungan seluruh simpul <w:t> sesuai urutan dokumen.

    Tidak memakai regex <w:t[^>]*> karena pola itu juga cocok dengan <w:tcPr>,
    sehingga kutipan sebelumnya tercemar markup XML.
    """
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    return re.sub(r"\s+", " ", " ".join((n.text or "") for n in root.iter(W + "t"))).strip()


wb = openpyxl.load_workbook(PROFIL_XLSX, data_only=True)
profil = wb[[s for s in wb.sheetnames if s.startswith("Profil")][0]]
ptk = wb["PTK"]
rombel = wb["Rombongan Belajar"]
prasarana = wb["Prasarana"]

identitas = [
    ["Nama satuan pendidikan", "SD NEGERI PASIRHALANG"],
    ["NPSN", "20205293"],
    ["Jenjang / status", "SD · Negeri"],
    ["Alamat", "Kp. Pasirhalang RT.03 RW.14, Desa Mandalamukti, Kecamatan Cikalongwetan"],
    ["Kabupaten / provinsi", "Kabupaten Bandung Barat · Jawa Barat 40556"],
    ["SK pendirian", squash(profil["D19"].value)],
    ["Tanggal SK pendirian", squash(profil["D20"].value)],
    ["Status kepemilikan", squash(profil["D21"].value)],
    ["SK izin operasional", squash(profil["D22"].value)],
    ["Manajemen berbasis sekolah", squash(profil["D29"].value)],
    ["Waktu penyelenggaraan", squash(profil["D40"].value)],
    ["Sumber listrik", squash(profil["D43"].value) + " · " + angka(profil["D44"].value) + " watt"],
    ["Akses internet", squash(profil["D45"].value)],
    ["Sumber air", squash(profil["D49"].value)],
    ["Posisi geografis", KOORDINAT],
    ["Kepala sekolah", "Ahmad, S.Pd."],
    ["Tahun ajaran", "2026/2027"],
]

statistik = [
    {"label": "Murid", "value": "204", "note": "98 L / 106 P · sheet Rombongan Belajar"},
    {"label": "Rombongan belajar", "value": "7", "note": "Kelas 1–6, termasuk 5a dan 5b"},
    {"label": "PTK", "value": "10", "note": "8 pendidik · 2 tenaga kependidikan"},
    {"label": "Komposisi", "value": "6 / 4", "note": "ASN / Non-ASN"},
    {"label": "Ruang kelas", "value": "6", "note": "1 rombel siang"},
    {"label": "Jumlah JP", "value": "225", "note": "Struktur kurikulum kelas I–VI"},
]

rombongan = []
for r in range(8, 15):
    if not rombel.cell(r, 2).value:
        continue
    rombongan.append({
        "nama": squash(rombel.cell(r, 2).value),
        "tingkat": angka(rombel.cell(r, 3).value),
        "L": int(rombel.cell(r, 4).value or 0),
        "P": int(rombel.cell(r, 5).value or 0),
        "total": int(rombel.cell(r, 6).value or 0),
        "wali": nama(rombel.cell(r, 7).value),
        "kurikulum": squash(rombel.cell(r, 8).value),
        "ruang": squash(rombel.cell(r, 9).value),
    })

status_counter = {}
jenis_counter = {}
for r in range(7, 17):
    if not ptk.cell(r, 2).value:
        continue
    st = squash(ptk.cell(r, 8).value) or "Tidak tercantum"
    jn = squash(ptk.cell(r, 9).value) or "Tidak tercantum"
    status_counter[st] = status_counter.get(st, 0) + 1
    jenis_counter[jn] = jenis_counter.get(jn, 0) + 1
ptk_summary = {
    "total": sum(status_counter.values()),
    "status": [{"label": k, "jumlah": v} for k, v in sorted(status_counter.items(), key=lambda x: -x[1])],
    "jenis": [{"label": k, "jumlah": v} for k, v in sorted(jenis_counter.items(), key=lambda x: -x[1])],
}

prasarana_rows = []
for r in range(8, 24):
    if not prasarana.cell(r, 2).value:
        continue
    p, l = prasarana.cell(r, 4).value, prasarana.cell(r, 5).value
    ukuran = "" if not p and not l else f"{angka(p)} × {angka(l)} m"
    prasarana_rows.append({
        "no": angka(prasarana.cell(r, 1).value),
        "nama": bersih(prasarana.cell(r, 2).value),
        "ukuran": ukuran,
    })

wc = openpyxl.load_workbook(CHECKLIST_XLSX, data_only=True)
ringkasan = wc["Ringkasan"]
checklist = wc["Checklist"]

maps = []
for r in range(4, 16):
    maps.append({
        "no": int(ringkasan.cell(r, 1).value),
        "judul": bersih(sentence(ringkasan.cell(r, 2).value)),
        "total": int(ringkasan.cell(r, 3).value or 0),
    })

berkas = {}
for f in DOKUMEN_DIR.glob("*.docx"):
    m = re.match(r"^(\d+\.\d+\.[a-z])\b", f.name)
    if m:
        berkas[m.group(1)] = f.name

docs = []
for r in range(2, 104):
    kode = squash(checklist.cell(r, 4).value)
    if not kode:
        continue
    file_name = berkas.get(kode)
    docs.append({
        "kode": kode,
        "map": int(checklist.cell(r, 1).value),
        "bidang": bersih(checklist.cell(r, 2).value),
        "indikator": bersih(checklist.cell(r, 3).value),
        "bukti": bersih(checklist.cell(r, 5).value),
        "sumber": bersih(checklist.cell(r, 6).value),
        "rujukan": bersih(checklist.cell(r, 8).value),
        "berkas": file_name,
        "eksternal": file_name is None,
    })

capaian = [
    {"label": "Literasi", "nilai": "56,08", "note": "66,67% · Rapor Pendidikan 2025"},
    {"label": "Numerasi", "nilai": "46,38", "note": "56,25% · Rapor Pendidikan 2025"},
    {"label": "Karakter", "nilai": "52,31", "note": "Rapor Pendidikan 2025"},
]
indikator_pbd = "D.1 53,09 · D.4 66,34 · D.8 60,94 · E.2 17,44 (Rapor PBD 2025)"

# ---------------------------------------------------------------------------
# AUDIT ULANG KEBUTUHAN FOTO DOKUMENTASI (KLASIFIKASI KETAT)
#
# Aturan yang dipakai SEKARANG — tidak ada lagi inferensi dari frekuensi kata
# "rapat", "supervisi", "observasi", "pembinaan", atau "kegiatan":
#
#   WAJIB      = teks word/document.xml pada berkas butir itu sendiri
#                menuliskan permintaan foto secara eksplisit
#                ("foto", "foto dokumentasi", "foto bersama", "foto kegiatan",
#                 "cetak foto", "foto media ajar"). Kutipan disimpan apa adanya.
#   PENDUKUNG  = bukti fisik pada Master Checklist berwujud benda/ sarana
#                fisik (piagam, piala, tropi, alat peraga, papan publikasi),
#                namun dokumen tidak meminta foto. Bersifat opsional.
#   TIDAK      = seluruh butir lain, termasuk semua SK, surat keputusan,
#                daftar hadir, notulen, berita acara, rencana, data, dan
#                instrumen tertulis. "Tangkapan layar" sistem juga TIDAK
#                dihitung sebagai foto kegiatan.
#
# False positive yang dibuang: "fotokopi" (6.1.a, 6.1.b, 8.1.a),
# "terdokumentasi" pada naskah perencanaan, dan "dokumentasi & bukti dukung PMM".
# ---------------------------------------------------------------------------

KATEGORI_FOTO = [
    {"id": "rapat", "nama": "Rapat, musyawarah & penetapan",
     "ringkas": "Rapat evaluasi program dan pertemuan penetapan yang dokumennya meminta foto."},
    {"id": "supervisi", "nama": "Supervisi, observasi & pembinaan guru",
     "ringkas": "Kategori referensi PKKS. Tidak ada butir yang meminta foto observasi kelas: buktinya berupa catatan dan instrumen tertulis."},
    {"id": "profesi", "nama": "Pelatihan, KKG & pengembangan profesi",
     "ringkas": "Pembinaan guru, PTK, diseminasi, dan gelar karya best practice."},
    {"id": "pembelajaran", "nama": "Pembelajaran, asesmen & remedial",
     "ringkas": "Media ajar, alat peraga, dan bukti pembelajaran berwujud visual."},
    {"id": "murid", "nama": "Kegiatan murid & karakter",
     "ringkas": "Peringatan hari besar nasional, lomba, dan kegiatan kesiswaan."},
    {"id": "prestasi", "nama": "Lomba, prestasi & gelar karya",
     "ringkas": "Kompetisi, piagam, piala, tropi, dan pameran karya murid."},
    {"id": "lingkungan", "nama": "Lingkungan, sarana & literasi",
     "ringkas": "Kondisi riil lingkungan asri, sanitasi, taman, pojok baca, dan papan display."},
    {"id": "administrasi", "nama": "Bukti digital & administrasi",
     "ringkas": "Kategori referensi. Bukti berupa tangkapan layar ARKAS/PMM, bukan foto kegiatan, sehingga tidak dihitung wajib foto."},
]

# (tingkat, kategori, alasan, daftar bidikan, dasar/kutipan)
POLICY_FOTO = {
    "1.4.a": (
        "wajib", ["rapat"],
        "Berkas 1.4.a menyebut foto sebagai salah satu bukti proses evaluasi program.",
        ["Foto dokumentasi pelaksanaan program"],
        "Teks dokumen: “Daftar hadir, jurnal kegiatan, foto dokumentasi, notulen.”"),
    "4.2.a": (
        "wajib", ["lingkungan"],
        "Bukti fisiknya adalah kondisi riil saat PKKS dan berkas 4.2.a memuat 11 instruksi foto yang dirinci per aspek.",
        [
            "Foto taman & pot kelas",
            "Foto fasad sekolah & plang ruangan",
            "Foto sanitasi",
            "Foto sarana sampah pilah",
            "Foto wastafel CTPS & poster edukasi cuci tangan",
            "Foto area teduh",
            "Foto APAR & titik kumpul",
            "Foto Gazebo Baca & Pojok Baca Kelas",
            "Foto Mural Edukasi & Papan Display Karya",
            "Foto penyambutan pagi",
            "Foto Lapangan",
        ],
        "Teks dokumen: “Foto taman & pot kelas, Denah Green Zone. … Foto fasad sekolah & plang ruangan. … Jadwal pembersihan toilet, Foto sanitasi.” (11 sebutan foto)."),
    "4.2.b": (
        "wajib", ["lingkungan", "prestasi"],
        "Bukti fisiknya adalah sarana pameran karya; berkas 4.2.b memuat 7 instruksi foto yang dirinci per sudut.",
        [
            "Foto Pojok Baca Kelas",
            "Foto Gazebo Literasi Outdoor",
            "Foto Papan Display Dalam Kelas",
            "Foto Galeri P5",
            "Foto Mading Utama",
            "Foto Poster Kampanye Edukatif di Dinding/Selasar",
            "Foto Papan Informasi Utama Kantor/Selasar Utama",
        ],
        "Teks dokumen: “Foto Pojok Baca Kelas, Jurnal Pembiasaan Membaca. … Foto Gazebo Literasi Outdoor, Daftar Buku Taman.” (7 sebutan foto)."),
    "4.3.b": (
        "pendukung", ["prestasi", "lingkungan"],
        "Bukti fisik pada Checklist berwujud sarana publikasi (mading/papan karya). Dokumen tidak meminta foto; foto benda ini bersifat pelengkap.",
        ["Foto papan publikasi karya tulis / mading sekolah"],
        "Bukti fisik Checklist: “Sarana publikasi karya tulis dan kompetisi karya tulis tingkat sekolah”. Teks dokumen menyebut “piala, piagam & dimuat di mading/web”, tanpa kata foto."),
    "4.4.b": (
        "pendukung", ["prestasi"],
        "Bukti fisik pada Checklist adalah benda (piagam, piala, tropi), bukan naskah. Dokumen hanya meminta rekapitulasi tertulis, sehingga foto etalase opsional.",
        ["Foto etalase piagam, piala, dan tropi"],
        "Bukti fisik Checklist: “Piagam, piala, dan tropi lomba bidang akademik dan non akademik”. Teks dokumen memuat “dokumen rekapitulasi perolehan piagam, piala, dan tropi”, tanpa kata foto."),
    "5.2.a": (
        "wajib", ["profesi", "rapat"],
        "Agenda pembinaan guru pada berkas 5.2.a ditutup dengan foto bersama; ini permintaan foto eksplisit.",
        ["Foto bersama peserta pembinaan guru"],
        "Teks dokumen: “Perumusan Kesepakatan & Rencana Tindak Lanjut (RTL) Penutup & Foto Bersama”."),
    "5.3.b": (
        "wajib", ["profesi"],
        "Berkas 5.3.b mencantumkan posisi anggaran untuk cetak foto dan mensyaratkan laporan PTK dengan bukti siklus serta dokumentasi.",
        ["Dokumentasi foto siklus PTK di kelas untuk laporan"],
        "Teks dokumen: “3 Dokumentasi Cetak foto dan penjilidan laporan 5 laporan” dan “Empat laporan PTK dengan bukti siklus, instrumen, dan dokumentasi”."),
    "6.4.a": (
        "wajib", ["murid"],
        "Berkas 6.4.a secara eksplisit mewajibkan LPJ PHBN dilengkapi foto dokumentasi kegiatan.",
        ["Foto dokumentasi kegiatan PHBN untuk LPJ"],
        "Teks dokumen: “LPJ tertulis dilengkapi foto dokumentasi kegiatan untuk dilaporkan kepada Kepala Sekolah dan Dinas Pendidikan”."),
    "7.4.a": (
        "pendukung", ["pembelajaran", "lingkungan"],
        "Bukti fisiknya adalah dokumen inventaris alat peraga, bukan foto. Foto media ajar justru diminta secara eksplisit pada butir 11.3.b, sehingga di sini hanya pelengkap.",
        ["Foto alat peraga / media pembelajaran"],
        "Bukti fisik Checklist: “Dokumen alat peraga / media pembelajaran”. Permintaan foto media ajar ada pada 11.3.b: “Modul Ajar & Foto Media Ajar”."),
    "7.4.c": (
        "wajib", ["profesi"],
        "Tabel publikasi ilmiah pada berkas 7.4.c mencantumkan Foto sebagai salah satu lampiran gelar karya.",
        ["Foto gelar karya / publikasi ilmiah guru"],
        "Teks dokumen: “Undangan, Berita Acara, Daftar Hadir, Foto”."),
    "7.5.a": (
        "wajib", ["prestasi"],
        "Tabel arsip lomba pada berkas 7.5.a mencantumkan “Foto kegiatan” sebagai berkas bukti.",
        ["Foto kegiatan lomba"],
        "Teks dokumen: “Surat Tugas, Undangan, LPJ Biaya, Foto kegiatan”."),
    "11.3.b": (
        "wajib", ["pembelajaran"],
        "Matriks refleksi hasil supervisi pada berkas 11.3.b menyebut foto media ajar sebagai bukti tindak lanjut.",
        ["Foto media ajar yang digunakan"],
        "Teks dokumen: “Modul Ajar & Foto Media Ajar”."),
}

ALASAN_TIDAK = (
    "Teks berkas .docx pada butir ini tidak memuat kata “foto”, “foto dokumentasi”, "
    "“foto bersama”, “foto kegiatan”, “cetak foto”, maupun “foto media ajar”. "
    "Bukti fisiknya berupa naskah tertulis (SK, rencana, data, instrumen, daftar hadir, "
    "notulen, atau berita acara) yang keabsahannya dibuktikan oleh dokumen itu sendiri, "
    "bukan oleh foto kegiatan."
)

# Catatan khusus untuk butir yang sebelumnya salah diklasifikasikan atau yang
# buktinya berupa tangkapan layar (bukan foto kegiatan).
PENGECUALIAN = {
    "1.2.c": "Surat keputusan tim penyusun visi-misi. Teks berkas hanya memuat SK, rapat, daftar hadir, notulen, dan berita acara; tidak ada kata “foto” maupun “tangkapan layar”. Foto rapat BUKAN syarat butir ini.",
    "1.2.d": "Daftar hadir dan berita acara penetapan visi-misi. Pembuktiannya adalah naskah tertulis dan tanda tangan peserta, bukan foto kegiatan.",
    "2.4.b": "Dokumen supervisi. Sebutan “observasi” dan “kunjungan kelas” di dalam naskah bukan permintaan foto; buktinya berupa instrumen dan catatan supervisi.",
    "2.4.c": "Dokumen tindak lanjut supervisi. Tidak ada permintaan foto di dalam berkas; buktinya berupa catatan perbaikan tertulis.",
    "3.4.a": "Dokumen prestasi sekolah berbentuk rekapitulasi dan draf piagam internal. Foto fisik bukan bukti yang diminta pada butir ini.",
    "3.4.b": "Dokumen prestasi guru berbentuk rekapitulasi dan draf piagam internal. Tidak ada permintaan foto.",
    "3.4.c": "Dokumen prestasi murid berbentuk rekapitulasi dan draf piagam internal. Tidak ada permintaan foto.",
    "4.3.a": "Data kunjungan, peminjaman, dan pembaruan buku perpustakaan. Bukti berupa data dan jurnal tertulis; kondisi ruang dibuktikan terpisah lewat butir 4.2.b.",
    "5.3.a": "Bukti yang diminta adalah “Sertifikat, tangkapan layar” sistem, bukan foto kegiatan.",
    "6.1.c": "Data hasil analisis bekal ajar awal dan inventaris buku sumber. Bukti berupa data tertulis; kata “gambar” di dalamnya bukan permintaan foto.",
    "6.4.b": "Dokumen kegiatan lomba PHBN berupa program, berita acara, dan hasil lomba. Foto kegiatan diminta secara eksplisit pada butir 6.4.a, bukan pada butir ini.",
    "7.1.a": "Dokumen hasil pengembangan kurikulum beserta dokumen kendali kegiatan. Meski memuat rapat, undangan, daftar hadir, notulen, dan berita acara, tidak ada satu pun permintaan foto; seluruh bukti berupa naskah tertulis.",
    "7.3.a": "Dokumen kegiatan KKG/gugus. Pertemuan profesi dibuktikan dengan daftar hadir dan notulen, bukan foto.",
    "8.2.a": "Administrasi sarana prasarana (ATISISBADA) berupa data pengadaan, pemeliharaan, dan inventarisasi, bukan foto kondisi.",
    "8.4.a": "Lampiran bukti yang diminta adalah notulen, berita acara, dan “tangkapan layar ARKAS”, bukan foto kegiatan.",
    "11.1.a": "Hasil pertemuan awal supervisi berupa kesepakatan tertulis. Tidak ada permintaan foto.",
    "11.2.a": "Catatan hasil observasi pembelajaran yang objektif dan selektif adalah naskah tertulis; tidak ada permintaan foto observasi kelas.",
    "12.1.a": "“Dokumentasi & Bukti Dukung PMM” berupa unggahan sistem, bukan foto kegiatan.",
    "12.1.c": "Dokumen kegiatan remedial dan pengayaan berupa jurnal dan catatan pelaksanaan; tidak ada permintaan foto.",
}

KUTIPAN_EKSPLISIT = [
    {"kode": "1.4.a", "jenis": "foto", "teks": "Daftar hadir, jurnal kegiatan, foto dokumentasi, notulen."},
    {"kode": "4.2.a", "jenis": "foto", "teks": "Foto taman & pot kelas, Denah Green Zone. Foto fasad sekolah & plang ruangan. Jadwal pembersihan toilet, Foto sanitasi. Foto sarana sampah pilah. Foto wastafel CTPS & poster edukasi."},
    {"kode": "4.2.b", "jenis": "foto", "teks": "Foto Pojok Baca Kelas, Jurnal Pembiasaan Membaca. Foto Gazebo Literasi Outdoor, Daftar Buku Taman. Foto Papan Display Dalam Kelas. Foto Galeri P5."},
    {"kode": "5.2.a", "jenis": "foto", "teks": "Perumusan Kesepakatan & Rencana Tindak Lanjut (RTL) Penutup & Foto Bersama."},
    {"kode": "5.3.b", "jenis": "foto", "teks": "3 Dokumentasi Cetak foto dan penjilidan laporan 5 laporan. Empat laporan PTK dengan bukti siklus, instrumen, dan dokumentasi."},
    {"kode": "6.4.a", "jenis": "foto", "teks": "LPJ tertulis dilengkapi foto dokumentasi kegiatan untuk dilaporkan kepada Kepala Sekolah dan Dinas Pendidikan."},
    {"kode": "7.4.c", "jenis": "foto", "teks": "Undangan, Berita Acara, Daftar Hadir, Foto."},
    {"kode": "7.5.a", "jenis": "foto", "teks": "Surat Tugas, Undangan, LPJ Biaya, Foto kegiatan."},
    {"kode": "11.3.b", "jenis": "foto", "teks": "Modul Ajar & Foto Media Ajar."},
    {"kode": "5.3.a", "jenis": "bukan foto", "teks": "Sertifikat, tangkapan layar."},
    {"kode": "8.4.a", "jenis": "bukan foto", "teks": "Lampiran bukti: (1) notulen rapat penyusunan RKAS, (2) berita acara penetapan, (3) tangkapan layar ARKAS, (4) laporan realisasi triwulan."},
]

# 58 kode yang pada klasifikasi lama (berbasis inferensi kata kunci) ditandai
# memerlukan foto. Dipakai untuk menghasilkan daftar koreksi yang dapat diaudit.
KLASIFIKASI_LAMA = {
    "1.2.c", "1.2.d", "1.4.a", "1.4.b", "2.1.b", "2.3.a", "2.4.a", "2.4.b", "2.4.c",
    "3.2.c", "3.3.c", "3.4.a", "3.4.b", "3.4.c", "4.2.a", "4.2.b", "4.3.a", "4.3.b",
    "4.4.a", "4.4.b", "5.1.b", "5.1.c", "5.2.a", "5.2.b", "5.2.c", "5.2.d", "5.3.a",
    "5.3.b", "5.4.b", "6.1.c", "6.2.a", "6.3.a", "6.4.a", "6.4.b", "6.4.c", "7.1.a",
    "7.3.a", "7.4.a", "7.4.b", "7.4.c", "7.5.a", "8.2.a", "8.4.a", "8.6.a", "8.7.a",
    "9.1.a", "9.2.a", "9.3.a", "11.1.a", "11.2.a", "11.3.a", "11.3.b", "11.3.c",
    "11.4.c", "12.1.a", "12.1.c", "12.2.a", "12.3.a",
}

# Audit terhadap berkas .docx dan berkas gambar di proyek.
docx_files = sorted(DOKUMEN_DIR.glob("*.docx"))
media_count = 0
media_hashes = set()
keyword_counter = collections.Counter()
KATA_KUNCI = ["foto", "dokumentasi", "gambar", "kegiatan", "lomba", "observasi",
              "supervisi", "pembinaan", "pelatihan", "rapat", "kkg"]
teks_per_kode = {}
for f in docx_files:
    with zipfile.ZipFile(f) as z:
        for n in z.namelist():
            if n.startswith("word/media/"):
                media_count += 1
                media_hashes.add(hashlib.md5(z.read(n)).hexdigest())
    teks = docx_teks(f).lower()
    m = re.match(r"^(\d+\.\d+\.[a-z])\b", f.name)
    if m:
        teks_per_kode[m.group(1)] = teks
    for k in KATA_KUNCI:
        keyword_counter[k] += len(re.findall(r"\b" + k + r"\b", teks))

EKSTENSI_GAMBAR = ("*.jpg", "*.jpeg", "*.png", "*.webp", "*.gif", "*.JPG", "*.JPEG", "*.PNG")
gambar_lokal = sorted({
    p for ext in EKSTENSI_GAMBAR for p in BASE.rglob(ext)
    if "node_modules" not in p.parts and "dist" not in p.parts
})

# Validasi: setiap butir "wajib" harus benar-benar memuat kata foto di dokumennya.
FOTO_RE = re.compile(r"\bfoto(?!kopi)\b", re.I)
for kode, p in POLICY_FOTO.items():
    if p[0] == "wajib":
        t = teks_per_kode.get(kode, "")
        if not FOTO_RE.search(t):
            raise AssertionError(f"{kode} ditandai wajib tetapi teks .docx tidak memuat kata 'foto'")

butir_foto = {}
for d in docs:
    p = POLICY_FOTO.get(d["kode"])
    if p:
        butir_foto[d["kode"]] = {
            "t": p[0], "k": p[1],
            "alasan": bersih(p[2]),
            "bidikan": [bersih(x) for x in p[3]],
            "dasar": bersih(p[4]),
        }
    else:
        butir_foto[d["kode"]] = {
            "t": "tidak", "k": [],
            "alasan": PENGECUALIAN.get(d["kode"], ALASAN_TIDAK),
            "bidikan": [],
            "dasar": "Tidak ditemukan permintaan foto pada teks word/document.xml berkas ini.",
        }

kategori_foto = []
for kat in KATEGORI_FOTO:
    terkait = [v for v in butir_foto.values() if kat["id"] in v["k"]]
    kategori_foto.append({
        "id": kat["id"],
        "nama": kat["nama"],
        "ringkas": kat["ringkas"],
        "jumlah": len(terkait),
        "wajib": sum(1 for v in terkait if v["t"] == "wajib"),
    })

dibatalkan = sorted(KLASIFIKASI_LAMA - set(POLICY_FOTO))
bukti_per_kode = {d["kode"]: d["bukti"] for d in docs}

foto = {
    "kategori": kategori_foto,
    "butir": butir_foto,
    "ringkasan": {
        "wajib": sum(1 for v in butir_foto.values() if v["t"] == "wajib"),
        "pendukung": sum(1 for v in butir_foto.values() if v["t"] == "pendukung"),
        "tidak": sum(1 for v in butir_foto.values() if v["t"] == "tidak"),
        "bidikan": sum(len(v["bidikan"]) for v in butir_foto.values()),
    },
    "audit": {
        "dokumenDipindai": len(docx_files),
        "dokumenBukti": len(docs) - sum(1 for d in docs if d["eksternal"]),
        "gambarTertanam": media_count,
        "hashGambarUnik": len(media_hashes),
        "gambarLokal": len(gambar_lokal),
        "fotoKegiatanTersedia": 0,
        "kataKunci": dict(keyword_counter.most_common()),
        "kutipan": KUTIPAN_EKSPLISIT,
        "dibatalkan": [{"kode": k, "bukti": bukti_per_kode.get(k, "")} for k in dibatalkan],
        "jumlahDibatalkan": len(dibatalkan),
        "metode": (
            "Klasifikasi ketat berbasis bukti tekstual. Teks setiap berkas diekstrak dari "
            "simpul <w:t> pada word/document.xml memakai parser XML (bukan regex), lalu "
            "dicari permintaan foto eksplisit. Frekuensi kata 'rapat', 'observasi', "
            "'supervisi', 'pembinaan', atau 'kegiatan' TIDAK lagi dijadikan dasar."
        ),
        "catatan": (
            "Seluruh berkas .docx memuat tepat satu gambar tertanam yang identik "
            "(logo resmi kop surat, GIF 21.335 byte); tidak ada satu pun foto kegiatan. "
            "Kata 'fotokopi' pada 6.1.a, 6.1.b, dan 8.1.a, 'terdokumentasi' pada naskah "
            "perencanaan, serta 'tangkapan layar ARKAS/PMM' bukanlah permintaan foto kegiatan. "
            "Hasil audit ulang: 9 butir wajib foto (semuanya memiliki kutipan eksplisit), "
            "3 butir foto pendukung untuk bukti berwujud benda, dan 90 butir tidak memerlukan foto."
        ),
    },
}

data = {
    "meta": {
        "nama": "SD NEGERI PASIRHALANG",
        "npsn": "20205293",
        "kecamatan": "Cikalongwetan",
        "kabupaten": "Kabupaten Bandung Barat",
        "tahunAjaran": "2026/2027",
        "kepalaSekolah": "Ahmad, S.Pd.",
        "email": "sdnpasirhalang123@gmail.com",
        "telepon": "081809517491",
        "alamat": "Kp. Pasirhalang RT.03 RW.14, Desa Mandalamukti, Kecamatan Cikalongwetan, Kabupaten Bandung Barat, Jawa Barat 40556",
        "lintang": LINTANG,
        "bujur": BUJUR,
        "koordinat": KOORDINAT,
        "diperbarui": "7 November 2026",
        "sumberProfil": "Unduhan Dapodik 27 Oktober 2026",
        "sumberPkks": "Master_Checklist_PKKS_2026_SDN_Pasirhalang.xlsx, STATE.md, Daftar_Tautan_Dokumen.md",
    },
    "profil": {
        "identitas": identitas,
        "statistik": statistik,
        "rombongan": rombongan,
        "ptk": ptk_summary,
        "prasarana": prasarana_rows,
        "catatanPrivasi": "Nomor rekening, NPWP, NIK, NUPTK, NIP, dan tanggal lahir PTK sengaja tidak ditampilkan pada situs publik.",
        "catatanData": "Sheet Rombongan Belajar mencatat 204 murid (98 L / 106 P); sheet Peserta Didik mencatat 200 murid (94 L / 106 P). Angka 204 dipakai mengikuti STATE.md dan AGENTS.md.",
    },
    "capaian": capaian,
    "indikatorPbd": indikator_pbd,
    "maps": maps,
    "docs": docs,
    "foto": foto,
}

OUT.write_text(
    "window.SITE_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)
print("maps", len(maps), "docs", len(docs), "berkas", len(berkas),
      "eksternal", sum(1 for d in docs if d["eksternal"]), "->", OUT)
print("foto:", foto["ringkasan"], "| dibatalkan", len(dibatalkan))
