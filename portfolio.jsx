// portfolio.jsx — "Sketches from Sweden"
// A clickable site: Sketchbook gallery (home) → Immersive detail.
// Light/dark theme. Components exported to window for index.html.

const { useState, useEffect, useCallback } = React;

function Frame({ work, ratio, contain, className, style }) {
  const defaultRatio = '3 / 4';
  const cls = ['frame'];
  if (contain) cls.push('frame--contain');
  const hasImg = work && work.image;
  if (!hasImg) cls.push('ph');
  if (className) cls.push(className);
  const label = work
    ? ([work.medium, work.dimensions].filter(Boolean).join(' · ').toLowerCase() || 'drawing')
    : 'drawing';
  return (
    <div className={cls.join(' ')} style={{ aspectRatio: ratio || defaultRatio, ...style }}>
      {hasImg
        ? <img src={work.image} alt={work.title || ''} />
        : <span className="ph-label">{label}</span>}
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
function Home({ onOpen, onNav, page, theme, setTheme, works, about, worksError, aboutError }) {
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
      {page === 'about'
        ? <AboutBody about={about} aboutError={aboutError} portrait={works && works[0]} />
        : <WorkBody onOpen={onOpen} works={works} worksError={worksError} />}
    </div>
  );
}

function WorkBody({ onOpen, works, worksError }) {
  if (worksError) {
    return (
      <main className="body">
        <div className="ctitle">
          <span className="overline">Selected work</span>
          <span className="overline">2023 — 2025</span>
        </div>
        <div className="error-panel">
          <p>{worksError}</p>
        </div>
      </main>
    );
  }
  return (
    <main className="body">
      <div className="ctitle">
        <span className="overline">Selected work</span>
        <span className="overline">2023 — 2025</span>
      </div>
      <div className="entries">
        {(works || []).map((w, i) => (
          <article
            className="entry" key={i} tabIndex={0} role="button"
            onClick={() => onOpen(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(i); } }}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <div className="row">
              <Frame work={w} className="e-frame" />
              <div className="e-text">
                <h3 className="et">{w.title}</h3>
                <div className="em">{w.medium} · {w.dimensions} · {w.year}</div>
                <p className="en">{w.note}</p>
                <span className="e-view">View drawing →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <footer className="body-foot">
        <span className="overline">Gothenburg · Sverige</span>
        <span className="overline">{(works || []).length} drawings</span>
      </footer>
    </main>
  );
}

function AboutBody({ about, aboutError, portrait }) {
  if (aboutError) {
    return (
      <main className="body about">
        <div className="ctitle">
          <span className="overline">About</span>
          <span className="overline">Studio · Gothenburg</span>
        </div>
        <div className="error-panel">
          <p>{aboutError}</p>
        </div>
      </main>
    );
  }
  return (
    <main className="body about">
      <div className="ctitle">
        <span className="overline">About</span>
        <span className="overline">Studio · Gothenburg</span>
      </div>
      <div className="about-grid">
        <div className="about-portrait">
          <Frame work={portrait || null} ratio="3 / 4" className="ap-frame" />
          <span className="ap-cap">In the studio</span>
        </div>
        <div className="about-text">
          {about && about.lede && <p className="lede">{about.lede}</p>}
          {about && about.bio && about.bio.map((para, i) => <p key={i}>{para}</p>)}
          {about && about.facts && (
            <div className="about-facts">
              {about.facts.map((fact, i) => (
                <div className="r" key={i}>
                  <span>{fact.label}</span>
                  <span>{fact.value}</span>
                </div>
              ))}
            </div>
          )}
          <span className="about-sig">— from the studio</span>
        </div>
      </div>
    </main>
  );
}

/* ----------------------------------------------------------- DETAIL (Immersive) */
function Detail({ index, works, onBack, onPrev, onNext, theme, setTheme }) {
  const w = works[index];
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
          <h2>{w.title}</h2>
          <span className="yr">{w.year}</span>
          <p>{w.note}</p>
          <div className="spec">
            <div className="c"><span className="meta">Medium</span><span className="v">{w.medium}</span></div>
            <div className="c"><span className="meta">Size</span><span className="v">{w.dimensions}</span></div>
            <div className="c"><span className="meta">Place</span><span className="v">{w.place}</span></div>
            <div className="c"><span className="meta">Year</span><span className="v">{w.year}</span></div>
          </div>
        </div>
        <div className="pager">
          <button onClick={onPrev}>← {works[(index - 1 + works.length) % works.length].title}</button>
          <button onClick={onNext}>{works[(index + 1) % works.length].title} →</button>
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

  const [works, setWorks] = useState(null);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [worksError, setWorksError] = useState(null);
  const [aboutError, setAboutError] = useState(null);

  useEffect(() => { localStorage.setItem('sfs-theme', theme); }, [theme]);

  useEffect(() => {
    Promise.all([
      fetch('./content/works.yaml'),
      fetch('./content/about.yaml'),
    ])
      .then(([worksRes, aboutRes]) =>
        Promise.all([worksRes.text(), aboutRes.text()])
      )
      .then(([worksText, aboutText]) => {
        // Parse works
        try {
          const parsed = jsyaml.load(worksText);
          const worksArr = Array.isArray(parsed) ? parsed : [];
          const mapped = worksArr.map((entry) => ({
            ...entry,
            image: entry.image ? `./content/images/${entry.image}` : undefined,
          }));
          setWorks(mapped);
        } catch (e) {
          if (e instanceof jsyaml.YAMLException) {
            setWorksError(`Could not parse works.yaml: ${e.message}`);
          } else {
            setWorksError("Couldn't load content — check your connection and refresh.");
          }
          setWorks([]);
        }

        // Parse about
        try {
          const parsed = jsyaml.load(aboutText);
          setAbout(parsed && typeof parsed === 'object' ? parsed : {});
        } catch (e) {
          if (e instanceof jsyaml.YAMLException) {
            setAboutError(`Could not parse about.yaml: ${e.message}`);
          } else {
            setAboutError("Couldn't load content — check your connection and refresh.");
          }
          setAbout({});
        }

        setLoading(false);
      })
      .catch(() => {
        setWorksError("Couldn't load content — check your connection and refresh.");
        setAboutError("Couldn't load content — check your connection and refresh.");
        setWorks([]);
        setAbout({});
        setLoading(false);
      });
  }, []);

  const worksLen = works ? works.length : 0;

  const open = useCallback((i) => { setView({ name: 'detail', index: i }); window.scrollTo(0, 0); }, []);
  const back = useCallback(() => setView({ name: 'home', index: 0 }), []);
  const prev = useCallback(() => setView((v) => ({ name: 'detail', index: (v.index - 1 + worksLen) % worksLen })), [worksLen]);
  const next = useCallback(() => setView((v) => ({ name: 'detail', index: (v.index + 1) % worksLen })), [worksLen]);

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

  if (loading) {
    return <div className="loading-state">Loading…</div>;
  }

  return (
    <div className="site" data-theme={theme}>
      <div key={view.name + view.index + page} className="view-fade">
        {view.name === 'home'
          ? <Home
              onOpen={open} onNav={setPage} page={page}
              theme={theme} setTheme={setTheme}
              works={works} about={about}
              worksError={worksError} aboutError={aboutError}
            />
          : <Detail
              index={view.index} works={works}
              onBack={back} onPrev={prev} onNext={next}
              theme={theme} setTheme={setTheme}
            />}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
