/* Logo premium SDN Pasirhalang — menyatu dengan tema situs (marun + emas + krem)
   Konsep: 3 pilar visi hero → bintang (berbudi luhur), buku terbuka (prima prestasi),
   obor (santun & berkarakter). Warna tidak lagi merah flat, melainkan gradien
   marun-espresso + emas sampanye + krem gading + aksen hijau daun (tumbuh). */
export default function LogoSekolah({ size = 56, title = 'Logo SD Negeri Pasirhalang' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      role="img"
      aria-label={title}
      className="logo-sekolah"
    >
      <defs>
        <linearGradient id="ls-gold" x1="0" y1="0" x2="96" y2="96">
          <stop offset="0" stopColor="#F3DFA8" />
          <stop offset=".45" stopColor="#C8A24A" />
          <stop offset="1" stopColor="#8A6716" />
        </linearGradient>
        <linearGradient id="ls-marun" x1="20" y1="8" x2="80" y2="90">
          <stop offset="0" stopColor="#3A0C10" />
          <stop offset=".52" stopColor="#7A0F14" />
          <stop offset="1" stopColor="#4A090E" />
        </linearGradient>
        <linearGradient id="ls-cream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFDF8" />
          <stop offset="1" stopColor="#F0E4CD" />
        </linearGradient>
        <radialGradient id="ls-glow" cx=".5" cy=".32" r=".75">
          <stop offset="0" stopColor="#E9D5A7" stopOpacity=".34" />
          <stop offset=".6" stopColor="#E9D5A7" stopOpacity="0" />
        </radialGradient>
        <path id="ls-arc" d="M 48 12 a 36 36 0 1 1 -0.01 0" fill="none" />
      </defs>

      {/* cakram dasar */}
      <circle cx="48" cy="48" r="46" fill="url(#ls-marun)" />
      <circle cx="48" cy="48" r="46" fill="url(#ls-glow)" />
      <circle cx="48" cy="48" r="46" stroke="url(#ls-gold)" strokeWidth="3" />
      <circle cx="48" cy="48" r="40.5" stroke="#E9D5A7" strokeOpacity=".55" strokeWidth="1" />
      <circle cx="48" cy="48" r="31.5" stroke="url(#ls-gold)" strokeOpacity=".5" strokeWidth="1" strokeDasharray="2 3" />

      {/* teks melingkar = visi hero */}
      <text fontSize="7" fontWeight="800" letterSpacing="1.6" fill="#E9D5A7" fontFamily="Plus Jakarta Sans, system-ui, sans-serif">
        <textPath href="#ls-arc" startOffset="6">
          BERBUDI LUHUR • PRESTASI • BERKARAKTER •
        </textPath>
      </text>

      {/* bintang = cita & budi luhur */}
      <path
        d="M48 24.5l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6-4.5-4.2 6.1-.8z"
        fill="url(#ls-gold)"
        stroke="#FFF6DF"
        strokeWidth=".8"
      />

      {/* obor kanan = penerang karakter */}
      <g>
        <path
          d="M66 30c3.5 4.5 4.8 8.6 3.4 12.4-1 2.6-3.1 4.3-5.6 4.9 1.6-1.6 2.2-3.5 1.8-5.6-.9 1.2-2 2-3.3 2.4 1.5-3.3 2.7-8 3.7-14z"
          fill="url(#ls-gold)"
        />
        <rect x="60.6" y="48.5" width="9" height="3" rx="1.5" fill="#2A1215" />
        <rect x="62" y="51.5" width="6.2" height="7" rx="1.4" fill="url(#ls-gold)" />
      </g>

      {/* pensil kiri = ikhtiar belajar */}
      <g transform="rotate(-24 30 44)">
        <rect x="27.4" y="34" width="5.2" height="18" rx="1" fill="url(#ls-gold)" />
        <path d="M27.4 52l2.6 5 2.6-5z" fill="#2A1215" />
        <rect x="27.4" y="34" width="5.2" height="3.4" fill="#2A1215" opacity=".85" />
      </g>

      {/* buku terbuka = prima prestasi */}
      <g>
        <path
          d="M26 55.5Q37 51 48 57.5 59 51 70 55.5L69.4 66Q59.5 61.8 48 68.2 36.5 61.8 26.6 66z"
          fill="url(#ls-cream)"
          stroke="url(#ls-gold)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M48 57.5L48 68.2" stroke="#C8A24A" strokeWidth="1.4" />
        <path d="M30 58.6Q38.5 55.4 45 60M51 60Q58.5 55.4 66 58.6" stroke="#8A6716" strokeWidth=".9" strokeLinecap="round" opacity=".7" />
        <rect x="44.6" y="66.4" width="6.8" height="6" rx="1.6" fill="url(#ls-gold)" stroke="#FFF6DF" strokeWidth=".8" />
      </g>

      {/* daun = tumbuh santun */}
      <g fill="#1E5B4F" opacity=".92">
        <path d="M30 70.5Q24 68 21.5 61.5q6.5 1 8.5 9z" />
        <path d="M66 70.5q6-2.5 8.5-9-6.5 1-8.5 9z" />
        <path d="M38 75.5q-4.5-.6-6.8-4.6 4.8-.4 6.8 4.6zM58 75.5q4.5-.6 6.8-4.6-4.8-.4-6.8 4.6z" />
      </g>

      {/* pita tahun */}
      <g>
        <rect x="36" y="78" width="24" height="9" rx="4.5" fill="url(#ls-gold)" />
        <text x="48" y="84.6" textAnchor="middle" fontSize="6.4" fontWeight="800" letterSpacing="1.2" fill="#2A0A0D" fontFamily="Plus Jakarta Sans, system-ui, sans-serif">
          1982
        </text>
      </g>

      {/* kilau atas */}
      <ellipse cx="48" cy="16" rx="26" ry="7" fill="#fff" opacity=".07" />
    </svg>
  );
}
