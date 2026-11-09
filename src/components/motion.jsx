import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

/* Jendela pandang bersama: picu sedikit sebelum elemen penuh terlihat
   agar animasi terasa mengalir, dan hanya sekali (ringan). */
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -10% 0px' };

export const VARIANTS = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } }
  },
  item: {
    hidden: { opacity: 0, y: 28, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } }
  }
};

/* Arah gerak Reveal — semuanya hanya transform + opacity (murah GPU). */
const ARAH = {
  up: (y) => ({ x: 0, y, scale: 1 }),
  left: () => ({ x: -36, y: 0, scale: 1 }),
  right: () => ({ x: 36, y: 0, scale: 1 }),
  zoom: () => ({ x: 0, y: 14, scale: 0.93 })
};

export function Reveal({ children, delay = 0, y = 26, variant = 'up', className = '', duration = 0.75, ...rest }) {
  const reduce = useReducedMotion();
  const awal = (ARAH[variant] || ARAH.up)(y);
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...awal }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = '', once = true, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={VARIANTS.container}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once, amount: 0.12, margin: '0px 0px -10% 0px' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className = '', ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : VARIANTS.item} {...rest}>
      {children}
    </motion.div>
  );
}

export function GoldRule({ className = '', delay = 0.2 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`gold-rule ${className}`}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      aria-hidden="true"
    />
  );
}

/**
 * Premium count-up. Uses a plain timer rather than an rAF-driven animation
 * loop so that the final value is always reached even in headless browsers,
 * print rendering, or when the tab is backgrounded.
 */
export function CountUp({ value, duration = 1.5, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const raw = String(value).trim();
  // Only animate plain integers; values such as "6 / 4" are rendered verbatim.
  const murni = /^\d+$/.test(raw);
  const numeric = murni ? Number(raw) : 0;
  const [n, setN] = useState(reduce || !murni || numeric === 0 ? raw : 0);

  useEffect(() => {
    if (reduce || !murni || numeric === 0) {
      setN(raw);
      return undefined;
    }
    const langkah = 26;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      const p = Math.min(1, i / langkah);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(numeric * eased));
      if (p >= 1) {
        window.clearInterval(id);
        setN(numeric);
      }
    }, Math.max(18, Math.round((duration * 1000) / langkah)));
    return () => window.clearInterval(id);
  }, [reduce, murni, numeric, duration, raw]);

  return (
    <span ref={ref} className={className}>
      {typeof n === 'number' ? n.toLocaleString('id-ID') : n}
    </span>
  );
}

export function ProgressBar({ value, max, tone = 'merah' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <span className={`progress progress--${tone}`} role="img" aria-label={`${value} dari ${max}`}>
      <motion.i
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </span>
  );
}
