import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import siteData from './data/siteData.json';
import Header from './components/Header';
import Footer from './components/Footer';
import Beranda from './views/Beranda';
import Profil from './views/Profil';
import TataTertib from './views/TataTertib';
import Foto from './views/Foto';
import Kontak from './views/Kontak';
import { parseHash } from './lib/site';
import { EASE } from './components/motion';

const SiteCtx = createContext(null);
export const useSite = () => useContext(SiteCtx);

const PETA = {
  kategori: 'foto-kategori',
  galeri: 'foto-galeri'
};

const JUDUL = {
  beranda: 'Beranda',
  profil: 'Profil sekolah',
  tatib: 'Tata tertib',
  foto: 'Foto kegiatan',
  kontak: 'Kontak'
};

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [showTop, setShowTop] = useState(false);
  const prevView = useRef(route.view);

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.title = `${JUDUL[route.view]} · SD Negeri Pasirhalang`;
    const viewChanged = prevView.current !== route.view;
    prevView.current = route.view;

    const timer = window.setTimeout(() => {
      if (!route.target) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }
      const el = document.getElementById(PETA[route.target] || route.target);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, viewChanged ? 470 : 70);

    return () => window.clearTimeout(timer);
  }, [route.view, route.target]);

  const ctx = { data: siteData, view: route.view };

  const halaman = {
    beranda: <Beranda />,
    profil: <Profil />,
    tatib: <TataTertib />,
    foto: <Foto />,
    kontak: <Kontak />
  };

  return (
    <SiteCtx.Provider value={ctx}>
      <a className="skip" href="#konten">Lewati ke konten</a>
      <Header view={route.view} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="konten"
          className="page"
          key={route.view}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.42, ease: EASE }}
        >
          {halaman[route.view]}
        </motion.main>
      </AnimatePresence>

      <Footer data={siteData} />

      <AnimatePresence>
        {showTop ? (
          <motion.button
            className="to-top"
            type="button"
            aria-label="Kembali ke atas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            whileHover={{ y: -4 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp size={18} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </SiteCtx.Provider>
  );
}
