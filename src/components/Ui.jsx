import { ArrowUpRight } from 'lucide-react';
import { CountUp, GoldRule, Reveal } from './motion';

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHead({ kode, title, desc, id }) {
  return (
    <Reveal className="sec-head" id={id}>
      <div>
        <Eyebrow>{kode}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <GoldRule className="sec-head__rule" />
      {desc ? <p className="sec-desc">{desc}</p> : null}
    </Reveal>
  );
}

export function PageFolio({ kode, title, lede, meta }) {
  return (
    <div className="folio">
      <Eyebrow>{kode}</Eyebrow>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      <GoldRule className="folio__rule" />
      {meta ? <p className="meta-line">{meta}</p> : null}
    </div>
  );
}

export function Tag({ tone = 'netral', children }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

export function StatTile({ label, value, note, count = false, delay = 0 }) {
  return (
    <Reveal className="stat" delay={delay}>
      <div className="stat__label">{label}</div>
      <div className="stat__value">
        {count ? <CountUp value={value} /> : value}
      </div>
      {note ? <div className="stat__note">{note}</div> : null}
    </Reveal>
  );
}

export function DataTable({ head, rows, className = '' }) {
  return (
    <div className={`table-wrap ${className}`}>
      <table className="tbl">
        {head ? <thead><tr>{head.map((x, i) => <th key={i}>{x}</th>)}</tr></thead> : null}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={j === 0 && !head ? 'lbl' : ''}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KeyValue({ rows }) {
  return (
    <table className="tbl tbl--kv">
      <tbody>
        {rows.map(([k, v], i) => (
          <tr key={i}><td className="lbl">{k}</td><td className="val">{v}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty-state">
      {Icon ? <span className="empty-state__icon"><Icon size={26} strokeWidth={1.4} /></span> : null}
      <strong>{title}</strong>
      <p>{text}</p>
      {action || null}
    </div>
  );
}

export function ActionLink({ href, children, tone = 'merah' }) {
  return (
    <a className={`action-link action-link--${tone}`} href={href}>
      {children}<ArrowUpRight size={15} strokeWidth={1.8} />
    </a>
  );
}
