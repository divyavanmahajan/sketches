// portfolio.jsx — "Sketches from Sweden"
// A clickable site: Sketchbook gallery (home) → Immersive detail.
// Light/dark theme. Components exported to window for index.html.

const { useState, useEffect, useCallback } = React;

function Frame({ work, ratio, contain, className, style }) {
  const [imgError, setImgError] = useState(false);
  const defaultRatio = '3 / 4';
  const cls = ['frame'];
  if (contain) cls.push('frame--contain');
  const hasImg = work && work.image && !imgError;
  if (!hasImg) cls.push('ph');
  if (className) cls.push(className);
  const label = work
    ? ([work.medium, work.dimensions].filter(Boolean).join(' · ').toLowerCase() || 'drawing')
    : 'drawing';
  return (
    <div className={cls.join(' ')} style={{ aspectRatio: ratio || defaultRatio, ...style }}>
      {hasImg
        ? <img src={work.image} alt={work.title || ''} onError={() => setImgError(true)} />
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

function yearRange(works) {
  const years = (works || []).map(w => parseInt(w.year)).filter(n => !isNaN(n));
  if (years.length === 0) return '';
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min} \u2014 ${max}`;
}

/* ----------------------------------------------------------- HOME (Sketchbook) */
function Home({ onOpen, onNav, page, theme, setTheme, works, about, site, worksError, aboutError }) {
  const title = site?.title || 'Sketches from Sweden';
  const blurb = site?.blurb || '';
  const sketchbook = site?.sketchbook || '';
  const signature = site?.signature || '';
  const titleParts = title.split(' from ');
  return (
    <div className="sketch">
      <aside className="rail">
        {sketchbook && <span className="mono-sm">{sketchbook}</span>}
        <h1>{titleParts.length === 2
          ? <>{titleParts[0]}<br />from<br />{titleParts[1]}</>
          : title}
        </h1>
        {blurb && <p className="desc">{blurb}</p>}
        <nav className="navlist">
          <a href="#" className={page === 'work' ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); onNav('work'); }}><span className="num">01</span> Work</a>
          <a href="#" className={page === 'about' ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); onNav('about'); }}><span className="num">02</span> About</a>
          <a href="#" className={page === 'help' ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); onNav('help'); }}><span className="num">03</span> Help</a>
        </nav>
        <div className="rail-foot">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          {signature && <span className="sig">— {signature}</span>}
        </div>
      </aside>
      {page === 'about'
        ? <AboutBody about={about} aboutError={aboutError} portrait={works && works[0]} signature={signature} />
        : page === 'help'
        ? <HelpBody />
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
          {yearRange(works) && <span className="overline">{yearRange(works)}</span>}
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
        {yearRange(works) && <span className="overline">{yearRange(works)}</span>}
      </div>
      {(!works || works.length === 0)
        ? <p className="empty-state">No works yet — check back soon.</p>
        : <div className="entries">
            {works.map((w, i) => {
              const meta = [w.medium, w.dimensions, w.year != null ? String(w.year) : null].filter(Boolean).join(' · ');
              return (
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
                      {meta && <div className="em">{meta}</div>}
                      {w.note && <p className="en">{w.note}</p>}
                      <span className="e-view">View drawing →</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
      }
      <footer className="body-foot">
        <span className="overline">Gothenburg · Sverige</span>
        <span className="overline">{(works || []).length} drawings</span>
      </footer>
    </main>
  );
}

function AboutBody({ about, aboutError, portrait, signature }) {
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
          {signature && <span className="about-sig">— {signature}</span>}
        </div>
      </div>
    </main>
  );
}

/* ----------------------------------------------------------- HELP */
function HelpBody() {
  const [errorFiles, setErrorFiles] = useState(null);
  const [errorLoading, setErrorLoading] = useState(true);
  const [errorFetchFailed, setErrorFetchFailed] = useState(false);

  function fetchErrors() {
    setErrorLoading(true);
    setErrorFetchFailed(false);
    Promise.all([
      fetch('./content/works-error.txt'),
      fetch('./content/about-error.txt'),
      fetch('./content/site-error.txt'),
    ])
      .then(([wr, ar, sr]) => Promise.all([
        wr.ok ? wr.text() : Promise.resolve(''),
        ar.ok ? ar.text() : Promise.resolve(''),
        sr.ok ? sr.text() : Promise.resolve(''),
      ]))
      .then(([worksErr, aboutErr, siteErr]) => {
        setErrorFiles({ works: worksErr.trim(), about: aboutErr.trim(), site: siteErr.trim() });
        setErrorLoading(false);
      })
      .catch(() => {
        setErrorFetchFailed(true);
        setErrorLoading(false);
      });
  }

  useEffect(() => { fetchErrors(); }, []);

  return (
    <main className="body help">
      <div className="ctitle">
        <span className="overline">Help</span>
        <span className="overline">Using this site</span>
      </div>

      <section className="help-section">
        <h3>How this site works</h3>
        <p>Three files control all the content on this site: <code>works-new.yaml</code> for the drawings, <code>about-new.yaml</code> for the About page, and <code>site-new.yaml</code> for the site title, description, and signature. When you save a change to any of these files, an automated check runs — if your edit is valid, the site updates within about 30 seconds.</p>
        <p><strong>If your change does not appear after a minute, go to the Troubleshooting section below</strong> — that is the only place errors are reported. You will not receive an email or notification.</p>
      </section>

      <section className="help-section">
        <h3>Add a new sketch</h3>
        <ol>
          <li>Go to the repository on GitHub.</li>
          <li>Navigate to <code>content/images/</code>, click <strong>Add file → Upload files</strong>, and upload your scan.</li>
          <li>Navigate to <code>content/works-new.yaml</code>, click the pencil icon (<strong>Edit this file</strong>).</li>
          <li>Add a new entry at the position you want. Each entry looks like this:
            <pre className="yaml-eg">{`- title: Your Title\n  year: "2025"\n  medium: Graphite on paper\n  dimensions: 30 × 42 cm\n  place: Gothenburg\n  image: your-filename.jpg\n  note: A short note about this drawing.`}</pre>
          </li>
          <li>Click <strong>Commit changes</strong>.</li>
          <li>Wait about 30 seconds. The site updates automatically if the entry is valid.</li>
        </ol>
      </section>

      <section className="help-section">
        <h3>Change a sketch</h3>
        <p>Open <code>content/works-new.yaml</code> in GitHub, find the entry by title, update the field you want to change, and commit.</p>
      </section>

      <section className="help-section">
        <h3>Remove a sketch</h3>
        <p>Open <code>content/works-new.yaml</code>, delete the entire entry block — from the <code>- title:</code> line to the last field of that entry — and commit. You can also delete the image file from <code>content/images/</code> if you no longer need it.</p>
      </section>

      <section className="help-section">
        <h3>Change the order</h3>
        <p>Open <code>content/works-new.yaml</code>, cut an entry block and paste it in the new position, then commit. The drawings appear on the site in the same order as they appear in the file.</p>
      </section>

      <section className="help-section">
        <h3>Update site details</h3>
        <p>Open <code>content/site-new.yaml</code>. The fields are:</p>
        <ul>
          <li><code>title</code> — the site title shown in the browser tab and the rail heading</li>
          <li><code>blurb</code> — the short description below the title in the left rail</li>
          <li><code>signature</code> — the closing line shown in the rail footer and on the About page</li>
          <li><code>sketchbook</code> — the small label above the title (e.g. "Sketchbook № 07")</li>
        </ul>
        <p>Edit the fields you want to change and commit.</p>
      </section>

      <section className="help-section">
        <h3>Update the About page</h3>
        <p>Open <code>content/about-new.yaml</code>. The fields are:</p>
        <ul>
          <li><code>lede</code> — the large italic opening line</li>
          <li><code>bio</code> — a list of paragraphs (each starts with two spaces and a dash)</li>
          <li><code>facts</code> — the table rows (each has a <code>label</code> and a <code>value</code>)</li>
        </ul>
        <p>Edit the fields you want to change and commit.</p>
      </section>

      <section className="help-section">
        <h3>YAML quick reference</h3>
        <pre className="yaml-eg">{`Each drawing is a block starting with:   - title: Name\nFields are indented two spaces:            year: "2025"\nText with colons or apostrophes:           note: "It's here: done."\nA line starting with # is a comment and is ignored.\n\nCommon mistakes:\n  Missing space after colon:  title:Name  ✗   title: Name  ✓\n  Wrong indentation:          use 2 spaces, not 4 or a tab\n  Unquoted special characters: use quotes if your text contains : or '`}</pre>
      </section>

      <section className="help-section" id="troubleshooting">
        <h3>Troubleshooting <button className="refresh-btn" onClick={fetchErrors}>Refresh</button></h3>
        <p>If an update did not go live, the reason will appear here. Check this section if your change has not appeared after about a minute.</p>
        {errorFetchFailed && <p className="err-fetch">Couldn't check for errors — make sure you're connected and refresh.</p>}
        {errorLoading && !errorFetchFailed && <p className="err-loading">Checking for errors…</p>}
        {!errorLoading && !errorFetchFailed && (
          (!errorFiles?.works && !errorFiles?.about && !errorFiles?.site)
            ? <p className="no-errors">No errors — your last update was successful.</p>
            : <>
                {errorFiles?.works && <div className="err-block">
                  <span className="err-label">Works update error</span>
                  <pre className="err-pre">{errorFiles.works}</pre>
                  <p className="err-action">To fix this: open <code>content/works-new.yaml</code> in GitHub, correct the issue described above, and commit again.</p>
                </div>}
                {errorFiles?.about && <div className="err-block">
                  <span className="err-label">About update error</span>
                  <pre className="err-pre">{errorFiles.about}</pre>
                  <p className="err-action">To fix this: open <code>content/about-new.yaml</code> in GitHub, correct the issue described above, and commit again.</p>
                </div>}
                {errorFiles?.site && <div className="err-block">
                  <span className="err-label">Site details update error</span>
                  <pre className="err-pre">{errorFiles.site}</pre>
                  <p className="err-action">To fix this: open <code>content/site-new.yaml</code> in GitHub, correct the issue described above, and commit again.</p>
                </div>}
              </>
        )}
      </section>
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
          {w.year != null && <span className="yr">{String(w.year)}</span>}
          {w.note && <p>{w.note}</p>}
          <div className="spec">
            {w.medium && <div className="c"><span className="meta">Medium</span><span className="v">{w.medium}</span></div>}
            {w.dimensions && <div className="c"><span className="meta">Size</span><span className="v">{w.dimensions}</span></div>}
            {w.place && <div className="c"><span className="meta">Place</span><span className="v">{w.place}</span></div>}
            {w.year != null && <div className="c"><span className="meta">Year</span><span className="v">{String(w.year)}</span></div>}
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
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [worksError, setWorksError] = useState(null);
  const [aboutError, setAboutError] = useState(null);

  useEffect(() => { localStorage.setItem('sfs-theme', theme); }, [theme]);

  useEffect(() => {
    Promise.all([
      fetch('./content/works.yaml'),
      fetch('./content/about.yaml'),
      fetch('./content/site.yaml'),
    ])
      .then(([worksRes, aboutRes, siteRes]) =>
        Promise.all([worksRes.text(), aboutRes.text(), siteRes.text()])
      )
      .then(([worksText, aboutText, siteText]) => {
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

        // Parse site
        try {
          const parsed = jsyaml.load(siteText);
          setSite(parsed && typeof parsed === 'object' ? parsed : {});
        } catch (e) {
          setSite({});
        }

        setLoading(false);
      })
      .catch(() => {
        setWorksError("Couldn't load content — check your connection and refresh.");
        setAboutError("Couldn't load content — check your connection and refresh.");
        setWorks([]);
        setAbout({});
        setSite({});
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

  useEffect(() => {
    if (site?.title) document.title = site.title;
  }, [site]);

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
              works={works} about={about} site={site}
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
