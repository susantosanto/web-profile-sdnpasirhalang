import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import LogoSekolah from './LogoSekolah';
import { GAMBAR } from '../config';
import { EASE } from './motion';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } };
const up = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

const VISI = ['berbudi luhur,', 'prima dalam prestasi,', 'santun & berkarakter.'];

export default function Hero() {
  return (
    <section className="hero--imm">
      <motion.div
        className="hi__bg"
        initial={{ scale: 1.07, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <img src={GAMBAR.guru} alt="Foto resmi 10 pendidik dan tendik SDN Pasirhalang" />
      </motion.div>
      <div className="hi__shade" aria-hidden="true" />
      <span className="hi__frame" aria-hidden="true" />

      <motion.div
        className="hi__top"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      >
        <a className="hi__brand" href="#profil-identitas">
          <span className="hi__emblemling hi__emblemling--baru"><LogoSekolah size={30} /></span>
          <span className="hi__brandtext">
            SD Negeri Pasirhalang
            <small>Situs resmi · Kec. Cikalongwetan</small>
          </span>
        </a>
        <nav className="hi__toplinks" aria-label="Tautan atas">
          <a href="#profil-identitas">Profil sekolah</a>
          <a href="#kontak">Kontak</a>
        </nav>
      </motion.div>

      <motion.div className="hi__center" initial="hidden" animate="show" variants={stagger}>
        <motion.p className="hi__kicker" variants={up}>
          <span className="hi__kicktick" aria-hidden="true" />
          Visi SD Negeri Pasirhalang · TA 2026/2027 s.d. 2029/2030
          <span className="hi__kicktick" aria-hidden="true" />
        </motion.p>
        <motion.p className="hi__lead" variants={up}>Mewujudkan siswa SDN Pasirhalang yang</motion.p>
        <h1 className="hi__title">
          {VISI.map((baris, i) => (
            <motion.em
              key={baris}
              className={i === 1 ? 'hi__gold' : undefined}
              variants={up}
            >{baris}</motion.em>
          ))}
        </h1>
      </motion.div>

      <motion.span
        className="hi__motto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        aria-hidden="true"
      >
        Est · 1982 — Cikalongwetan
      </motion.span>

      <motion.a
        className="hi__scroll"
        href="#beranda-statistik"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
      >
        Gulir ke bawah <ArrowDown size={12} strokeWidth={2.2} />
      </motion.a>
    </section>
  );
}
