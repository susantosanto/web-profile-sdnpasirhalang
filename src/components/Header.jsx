import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { GAMBAR } from '../config';
import LogoSekolah from './LogoSekolah';
import { NAV } from '../lib/site';

export default function Header({ view }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openGroup, setOpenGroup] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobile(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { setMobile(false); }, [view]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <div className="govbar">
        <div className="wrap govbar__inner">
          <span className="govbar__left">
            <img src={GAMBAR.logoKbb} alt="Logo Kabupaten Bandung Barat" />
            <span>Pemerintah Kabupaten Bandung Barat · Dinas Pendidikan</span>
          </span>
          <span className="govbar__right">Situs resmi · NPSN 20205293 · Tahun ajaran 2026/2027</span>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap header__inner">
          <a className="brand" href="#beranda" aria-label="Beranda SD Negeri Pasirhalang">
            <motion.span
              className="brand__seal brand__seal--baru"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            >
              <LogoSekolah size={56} />
            </motion.span>
            <span className="brand__teks">
              <b>SD Negeri Pasirhalang</b>
              <small>Berbudi luhur · Berprestasi · Berkarakter</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navigasi utama">
            {NAV.map((n) => (
              <div className="nav-item" key={n.id}>
                <a className={`nav-link ${view === n.id ? 'is-active' : ''}`} href={`#${n.id}`}>
                  {n.label}
                  {n.sub ? <ChevronDown size={13} strokeWidth={2} /> : null}
                  {view === n.id ? <motion.i layoutId="nav-underline" className="nav-underline" /> : null}
                </a>
                {n.sub ? (
                  <div className="nav-sub">
                    <span className="nav-sub__label">{n.label}</span>
                    {n.sub.map(([key, label]) => (
                      <a key={key} href={`#${n.id}/${key}`}>{label}<ArrowUpRight size={12} /></a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="header__aksi">
            <a className="btn-kontak" href="#kontak">Hubungi kami <ArrowUpRight size={15} strokeWidth={2.2} /></a>
            <button
              className="btn btn--icon menu-toggle"
              type="button"
              aria-label={mobile ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
            >
              {mobile ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobile ? (
            <motion.nav
              className="mobile-nav"
              aria-label="Navigasi seluler"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wrap mobile-nav__inner">
                <a className="btn-kontak mobile-nav__kontak" href="#kontak">Hubungi kami <ArrowUpRight size={15} strokeWidth={2.2} /></a>
                {NAV.map((n) => (
                  <div key={n.id} className="mobile-nav__group">
                    <div className="mobile-nav__row">
                      <a href={`#${n.id}`} className={view === n.id ? 'is-active' : ''}>{n.label}</a>
                      {n.sub ? (
                        <button
                          type="button"
                          aria-label={`Buka submenu ${n.label}`}
                          onClick={() => setOpenGroup((g) => (g === n.id ? '' : n.id))}
                        >
                          <ChevronDown size={17} className={openGroup === n.id ? 'is-open' : ''} />
                        </button>
                      ) : null}
                    </div>
                    {n.sub && openGroup === n.id ? (
                      <div className="mobile-nav__sub">
                        {n.sub.map(([key, label]) => (
                          <a key={key} href={`#${n.id}/${key}`}>{label}</a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
