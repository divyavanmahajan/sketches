// portfolio.jsx — "Sketches from Sweden"
// A clickable site: Sketchbook gallery (home) → Immersive detail.
// Light/dark theme. Components exported to window for index.html.

const { useState, useEffect, useCallback } = React;

const HERO = 'assets/portrait-01.jpg';

const WORKS = [
  { t: 'Reverie',      y: '2025', m: 'Graphite on paper', d: '42 × 56 cm', place: 'Gothenburg', img: HERO,
    note: 'Two quiet sittings, with the morning still in the room. The hands kept finding the face — I left the searching lines where they fell.' },
  { t: 'Looking Away', y: '2025', m: 'Graphite',          d: '30 × 42 cm', place: 'Malmö', img: 'assets/figure-braid.jpg',
    note: 'She would not hold still, so I drew the turning instead of the face — the braid falling over one shoulder, the coat barely there.' },
  { t: 'Morning Wash', y: '2024', m: 'Watercolour',       d: '30 × 40 cm', place: 'Gotland',
    note: 'Loose wash, left to bleed at the edges. The paper did most of the work here.' },
  { t: 'Hands',        y: '2024', m: 'Graphite',          d: '24 × 32 cm', place: 'Gothenburg',
    note: 'Studies of the same gesture, over and over, until it felt true.' },
  { t: 'Gotland, I',   y: '2023', m: 'Watercolour',       d: '28 × 38 cm', place: 'Gotland',
    note: 'A grey coast on a still afternoon. Three colours, no more.' },
  { t: 'Stillhet',     y: '2024', m: 'Graphite',          d: '26 × 36 cm', place: 'Gothenburg',
    note: 'Quiet — the Swedish word sits better than the English one. Made late, by lamp.' },
];

const RATIOS = ['3 / 4', '3 / 4', '4 / 5', '1 / 1', '5 / 4', '4 / 5'];

function Frame({ work, ratio, contain, className, style }) {
  const cls = ['frame'];
  if (contain) cls.push('frame--contain');
  if (!work || !work.img) cls.push('ph');
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')} style={{ aspectRatio: ratio, ...style }}>
      {work && work.img
        ? <img src={work.img} alt={work.t} />
        : <span className="ph-label">{work ? (work.m.toLowerCase() + ' · ' + work.d) : 'drawing'}</span>}
    </div>
  );
}

function ThemeToggle({ theme, setTheme, variant }) {
  return (
    <div className={'theme-toggle' + (variant ? ' theme-toggle--' + variant : '')} role="group" aria-label="Theme">
      <button className={theme === 'light' ? 'is-on' : ''} onClick={() => setTheme('light')} aria-label="Light theme">Light</button>
      <span className="sep" />
      <button className={theme === 'dark' ? 'is-on' : ''} onClick={() => setTheme('dark')} aria-label="Dark theme">Dark</button>
    </div>
  );
}

/* ----------------------------------------------------------- HOME (Sketchbook) */
function Home({ onOpen, onNav, page, theme, setTheme }) {
  return (
    <div className="sketch">
      <aside className="rail">
        <span className="mono-sm">Sketchbook № 07</span>
        <h1>Sketches<br />from<br />Sweden</h1>
        <p className="desc">Graphite &amp; watercolour drawings, kept the way they were made — in order, with their notes.</p>
        <nav className="navlist">
          <a href="#" className={page === 'work' ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); onNav('work'); }}><span className="num">01</span> Work</a>
          <a href="#" className={page === 'about' ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); onNav('about'); }}><span className="num">02</span> About</a>
        </nav>
        <div className="rail-foot">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <span className="sig">— from the studio, Gothenburg</span>
        </div>
      </aside>
      {page === 'about' ? <AboutBody /> : <WorkBody onOpen={onOpen} />}
    </div>
  );
}

function WorkBody({ onOpen }) {
  return (
    <main className="body">
      <div className="ctitle">
        <span className="overline">Selected work</span>
        <span className="overline">2023 — 2025</span>
      </div>
      <div className="entries">
        {WORKS.map((w, i) => (
          <article
            className="entry" key={i} tabIndex={0} role="button"
            onClick={() => onOpen(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(i); } }}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <div className="row">
              <Frame work={w} ratio={RATIOS[i]} className="e-frame" />
              <div className="e-text">
                <h3 className="et">{w.t}</h3>
                <div className="em">{w.m} · {w.d} · {w.y}</div>
                <p className="en">{w.note}</p>
                <span className="e-view">View drawing →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <footer className="body-foot">
        <span className="overline">Gothenburg · Sverige</span>
        <span className="overline">{WORKS.length} drawings</span>
      </footer>
    </main>
  );
}

function AboutBody() {
  return (
    <main className="body about">
      <div className="ctitle">
        <span className="overline">About</span>
        <span className="overline">Studio · Gothenburg</span>
      </div>
      <div className="about-grid">
        <div className="about-portrait">
          <Frame work={WORKS[0]} ratio="3 / 4" className="ap-frame" />
          <span className="ap-cap">In the studio</span>
        </div>
        <div className="about-text">
          <p className="lede">I draw quiet people in quiet rooms — mostly in graphite, sometimes in a thin watercolour wash.</p>
          <p>The drawings here are kept the way they were made: in the order they happened, with the searching lines left in. I am less interested in a finished likeness than in the moment a face settles, or turns away.</p>
          <p>Most are made over an afternoon or two, by north light or lamp. The paper does a good deal of the work; I try to leave it room.</p>
          <div className="about-facts">
            <div className="r"><span>Based in</span><span>Gothenburg, Sweden</span></div>
            <div className="r"><span>Media</span><span>Graphite · Watercolour</span></div>
            <div className="r"><span>Working since</span><span>2019</span></div>
            <div className="r"><span>Enquiries</span><span>studio@sketchesfromsweden.se</span></div>
          </div>
          <span className="about-sig">— from the studio</span>
        </div>
      </div>
    </main>
  );
}

/* ----------------------------------------------------------- DETAIL (Immersive) */
function Detail({ index, onBack, onPrev, onNext, theme, setTheme }) {
  const w = WORKS[index];
  return (
    <div className="d-immersive">
      <div className="art-side">
        <Frame work={w} contain className="art" />
      </div>
      <div className="meta-side">
        <div className="meta-top">
          <button className="back" onClick={onBack}>← All work</button>
          <ThemeToggle theme={theme} setTheme={setTheme} variant="mini" />
        </div>
        <div className="meta-mid">
          <span className="overline">Drawing № {String(index + 1).padStart(2, '0')}</span>
          <h2>{w.t}</h2>
          <span className="yr">{w.y}</span>
          <p>{w.note}</p>
          <div className="spec">
            <div className="c"><span className="meta">Medium</span><span className="v">{w.m}</span></div>
            <div className="c"><span className="meta">Size</span><span className="v">{w.d}</span></div>
            <div className="c"><span className="meta">Place</span><span className="v">{w.place}</span></div>
            <div className="c"><span className="meta">Year</span><span className="v">{w.y}</span></div>
          </div>
        </div>
        <div className="pager">
          <button onClick={onPrev}>← {WORKS[(index - 1 + WORKS.length) % WORKS.length].t}</button>
          <button onClick={onNext}>{WORKS[(index + 1) % WORKS.length].t} →</button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- APP */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('sfs-theme') || 'light');
  const [view, setView] = useState({ name: 'home', index: 0 });
  const [page, setPage] = useState('work');

  useEffect(() => { localStorage.setItem('sfs-theme', theme); }, [theme]);

  const open = useCallback((i) => { setView({ name: 'detail', index: i }); window.scrollTo(0, 0); }, []);
  const back = useCallback(() => setView({ name: 'home', index: 0 }), []);
  const prev = useCallback(() => setView((v) => ({ name: 'detail', index: (v.index - 1 + WORKS.length) % WORKS.length })), []);
  const next = useCallback(() => setView((v) => ({ name: 'detail', index: (v.index + 1) % WORKS.length })), []);

  useEffect(() => {
    const onKey = (e) => {
      if (view.name !== 'detail') return;
      if (e.key === 'Escape') back();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view.name, back, prev, next]);

  return (
    <div className="site" data-theme={theme}>
      <div key={view.name + view.index + page} className="view-fade">
        {view.name === 'home'
          ? <Home onOpen={open} onNav={setPage} page={page} theme={theme} setTheme={setTheme} />
          : <Detail index={view.index} onBack={back} onPrev={prev} onNext={next} theme={theme} setTheme={setTheme} />}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
