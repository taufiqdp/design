import { CopySpec } from "./copy";
import { Hex, PairList, Switcher } from "./ink";

const SPEC_URL = "https://taufiqdp.com/design.md";

// Shared class strings, matching the ones on taufiqdp.com
const SECTION = "mt-12 scroll-mt-6 border-t-2 border-pop pt-9 first:mt-0 first:border-0 first:pt-0";
const H2 = "display mb-6 text-[length:clamp(40px,4.6vw,64px)]";
const H3 = "display block text-2xl leading-tight font-extrabold [font-stretch:80%]";
const NAME = "display text-[21vw] leading-[0.84] [font-stretch:70%] md:text-[length:clamp(56px,min(10.4vw,15vh),176px)]";
const LEDE = "max-w-[32ch] text-[length:clamp(20px,2vw,26px)] leading-snug";
const PROSE = "max-w-[68ch] leading-relaxed";
const ROW = "grid gap-x-6 gap-y-1 sm:grid-cols-[150px_minmax(0,1fr)]";
const NOTE = "mt-3 text-sm";

const TYPE: [string, string, string, React.ReactNode][] = [
  ["headline-display", "Fluid up to 176px, 900, 70% width, line height 0.84. The name.", NAME, "Display"],
  ["headline-xl", "80px, 900, 75% width, line height 0.9", "display text-[80px]", "Headline"],
  ["headline-lg", "Fluid 40 to 64px, 900, 75% width. Section headings.", "display text-[length:clamp(40px,4.6vw,64px)]", "Section title"],
  ["headline-md", "32px, 800, 80% width, line height 1. Post titles.", "display text-[32px] leading-none font-extrabold [font-stretch:80%]", "Post title goes here"],
  ["headline-sm", "24px, 800, 80% width, line height 1.25. Job and song titles.", H3, "Job title"],
  ["body-lg", "Fluid 20 to 26px, 400, line height 1.375. The lede.", LEDE, "A short lede introduces the page in a line or two."],
  ["body-md", "17px, 400, line height 1.5", "", "Body text runs at normal width and weight, in sentence case."],
  ["body-prose", "17px, 400, line height 1.625, 68 characters max", PROSE, "Blog prose gets a little more air between lines and stops at 68 characters, so long posts stay easy to follow from one line to the next."],
  ["body-sm", "14px, 400, line height 1.4", "text-sm", "Photo caption goes here"],
  ["label-md", "14px, 700. Navigation.", "text-sm font-bold", "Navigation"],
  ["label-sm", "13px, 400. Dates, captions, fact labels.", "text-[13px] tabular-nums", "January 1, 2026"],
  ["code", "Roboto Mono 14px, 500. Blog code only.", "", <code key="c">--ink: #3255a4;</code>],
];

const SPACING: [string, string, number[], string][] = [
  ["page-max-width", "1440px", [], "Content stops growing past this width."],
  ["page-margin", "16, 24, 40px", [16, 24, 40], "Side margins on phones, tablets and desktop."],
  ["column-gap", "72px max", [72], "Between the masthead and the sections."],
  ["section-gap", "48px", [48], "Above each pop rule."],
  ["section-padding-top", "36px", [36], "Below each pop rule."],
  ["heading-gap", "24px", [24], "Below a section heading."],
  ["item-gap", "16px", [16], "Between items in a list."],
  ["gallery-gap", "8px", [8], "Between masonry photos, which keep their real aspect ratios."],
];

// Layout diagram: right-column lines, with "rule" for the pop dividers
const WIRE = ["w-full", "w-3/5", "rule", "w-full", "w-full", "w-3/5", "rule", "w-full", "w-3/5"];

const DO = [
  "Use only the ink, pop and paper tokens, so every pair works.",
  "Show photographs in their original colours.",
  "Set headlines uppercase, condensed and heavy.",
  "Keep body text at 4.5:1 contrast or better, and check new pairs before adding them.",
  "Give every photo real alt text and keep keyboard focus visible.",
  "Stop the equalizer and loading pulses when reduced motion is on.",
  "Credit outside data where it's shown, like “via Last.fm”.",
];
const DONT = [
  "Add a third colour or a grey.",
  "Set text in pop, on paper or on ink.",
  "Duotone or tint photographs.",
  "Use uppercase for body text or labels.",
  "Add drop shadows, rounded cards or gradient washes.",
  "Round photos or blocks. Only the avatar, swatches and pills are round.",
  "Centre content blocks. Keep the left edge strong.",
];

const TOKENS = `:root, [data-ink=orange] { --ink: #3255a4; --pop: #ff6c2f; }
[data-ink=pink]     { --ink: #0078bf; --pop: #ff48b0; }
[data-ink=green]    { --ink: #407060; --pop: #ffb511; }
[data-ink=burgundy] { --ink: #914e72; --pop: #ffe800; }
[data-ink=black]    { --ink: #000;    --pop: #ff4c65; }
:root { --paper: #f4f4f1; }`;

export default async function Page() {
  // Fetched at build, refreshed hourly, so taufiqdp.com/design.md stays the single source
  const res = await fetch(SPEC_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`design.md fetch failed: ${res.status}`);
  const md = await res.text();

  return (
    <>
      <header className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-sm font-bold">
        <nav aria-label="Sections" className="flex flex-wrap gap-x-5 gap-y-2">
          <a className="hover:ink-link" href="https://taufiqdp.com">taufiqdp.com</a>
          <a className="hover:ink-link" href="#colour">Colour</a>
          <a className="hover:ink-link" href="#type">Type</a>
          <a className="hover:ink-link" href="#layout">Layout</a>
          <a className="hover:ink-link" href="#shape">Shape</a>
          <a className="hover:ink-link" href="#components">Components</a>
          <a className="hover:ink-link" href="#rules">Rules</a>
        </nav>
        <Switcher />
      </header>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-[clamp(24px,5vw,72px)]">
        <div className="md:sticky md:top-5 md:self-start">
          <div className="halftone aspect-[3/2] overflow-hidden md:max-h-[50vh]" role="img" aria-label="Halftone placeholder where the header photo goes" />
          <h1 className={`${NAME} relative -mt-[0.6em] mix-blend-multiply`}>Dua<br />Tinta</h1>
          <p className="mt-4 text-[15px] font-bold">The design system of taufiqdp.com</p>
          <CopySpec md={md} />
        </div>

        <main className="min-w-0">
          <section id="overview" className={SECTION}>
            <h2 className={H2}>Two inks</h2>
            <p className={LEDE}>Every screen is two inks on paper: one dark ink for all type, one bright ink for accents.</p>
            <p className={`${PROSE} mt-4`}>Dua Tinta is Indonesian for two inks. The site reads like a risograph zine printed on newsprint, personal and a little loud, but the layout underneath stays plain and calm so the writing, photos and music carry it. Photographs are the one exception to the two-ink rule: they always show in their original colours, as shot.</p>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
              {[["Ink pairs", "Five, switchable in the header"], ["Typeface", "Archivo, one family"], ["Corners", "Square, except a round few"], ["Shadows", "None, it's print"]].map(([dt, dd]) => (
                <div key={dt}><dt className="text-[13px]">{dt}</dt><dd className="mt-0.5 font-bold">{dd}</dd></div>
              ))}
            </dl>
          </section>

          <section id="colour" className={SECTION}>
            <h2 className={H2}>Colour</h2>
            <p className={PROSE}>Three tokens do all the work: <code>--ink</code>, <code>--pop</code> and <code>--paper</code>. Never hard-code a hex value in a component, or the ink switcher stops working.</p>
            <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="mb-3 aspect-[3/2] bg-ink" />
                <h3 className={H3}>Ink</h3>
                <p><Hex of="ink" />. All text, headings, outlines, the now-playing bar and halftone dots.</p>
              </div>
              <div>
                <div className="mb-3 aspect-[3/2] bg-pop" />
                <h3 className={H3}>Pop</h3>
                <p><Hex of="pop" />. Accents only: divider rules, link underlines, the halftone ground, equalizer bars.</p>
              </div>
              <div>
                <div className="mb-3 aspect-[3/2] bg-paper ring-2 ring-ink ring-inset" />
                <h3 className={H3}>Paper</h3>
                <p>#F4F4F1. The page ground, and the text colour on ink surfaces.</p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className={`${H3} mb-3`}>Ink pairs</h3>
              <p className={PROSE}>Each pair is a type ink and an accent ink, set with <code>data-ink</code> on <code>{"<html>"}</code>. Pick one to repaint this page. Shared link previews always use the default pair.</p>
              <PairList />
            </div>
            <p className={`${PROSE} mt-10`}>Two fixed colours sit outside the pairs: a black scrim at 85% behind an opened photo, and the white ground of the round avatar.</p>
          </section>

          <section id="type" className={SECTION}>
            <h2 className={H2}>Type</h2>
            <p className={PROSE}>One family, Archivo, loaded with its width axis. The personality comes from width and weight extremes, not a second typeface. Headlines are always uppercase, condensed and heavy. Everything else is sentence case.</p>
            <div className="mt-10 grid gap-7">
              {TYPE.map(([name, spec, cls, sample]) => (
                <div className={ROW} key={name}>
                  <div className="sm:pt-1.5"><b className="block text-sm">{name}</b><span className="block text-[13px]">{spec}</span></div>
                  <p className={cls}>{sample}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="layout" className={SECTION}>
            <h2 className={H2}>Layout</h2>
            <figure>
              <div className="grid grid-cols-2 gap-[8%] p-[6%] ring-2 ring-ink ring-inset" aria-hidden="true">
                <div>
                  <div className="halftone aspect-[3/2]" />
                  <div className="relative -mt-[10%] mix-blend-multiply">
                    {["w-[70%]", "w-[45%]", "w-[95%]"].map((w) => <i key={w} className={`mb-[4%] block h-2.5 bg-ink ${w}`} />)}
                  </div>
                </div>
                <div>
                  {WIRE.map((w, i) => <i key={i} className={w === "rule" ? "mb-[8%] block h-0.5 bg-pop" : `mb-[8%] block h-1.5 bg-ink ${w}`} />)}
                </div>
              </div>
              <figcaption className={`${PROSE} mt-3`}>From 768px up the home page is two columns. On the left, a sticky masthead: a 3:2 header photo with the name overlapping its bottom edge. On the right, sections scroll by, split by pop rules. Below 768px it all stacks into one column. Other pages are a single left-aligned column. Nothing is centred except an opened photo.</figcaption>
            </figure>
            <div className="mt-10 grid gap-7">
              {SPACING.map(([name, value, bars, use]) => (
                <div className={ROW} key={name}>
                  <div className="sm:pt-1.5"><b className="block text-sm">{name}</b><span className="block text-[13px] tabular-nums">{value}</span></div>
                  <div>
                    {bars.map((w) => <span key={w} className="mt-1.5 mb-2 block h-2 bg-ink" style={{ width: w }} />)}
                    {use}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="shape" className={SECTION}>
            <h2 className={H2}>Shape and depth</h2>
            <p className={PROSE}>Print has square corners and no shadows. Hierarchy comes from type size and weight, the pop rules, and overlap: the name in the masthead sits on its photo with <code>mix-blend-mode: multiply</code>, so where it crosses the photo it darkens like overprinted ink.</p>
            <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-7 [&_figcaption]:mt-2.5 [&_figcaption]:text-[13px]">
              <figure><div className="halftone aspect-[3/2] w-30" /><figcaption>Photos and blocks, 0</figcaption></figure>
              <figure><span className="block size-21 rounded-full bg-white ring-2 ring-ink" role="img" aria-label="Avatar placeholder" /><figcaption>Avatar, round</figcaption></figure>
              <figure>
                <span className="flex w-max rounded-full p-1" aria-hidden="true"><i className="size-3.5 rounded-full bg-ink" /><i className="size-3.5 rounded-full bg-pop" /></span>
                <figcaption>Swatch, round</figcaption>
              </figure>
              <figure><span className="inline-block rounded-full border-2 border-ink px-3.5 py-1 text-sm font-bold">Pill</span><figcaption>Pill, round</figcaption></figure>
              <figure><code>--pop</code><figcaption>Inline code, 4px</figcaption></figure>
              <figure><pre><code>ink + pop</code></pre><figcaption>Code block, 8px</figcaption></figure>
            </div>
          </section>

          <section id="components" className={SECTION}>
            <h2 className={H2}>Components</h2>

            <div>
              <h3 className={`${H3} mb-3`}>Links</h3>
              <a className="ink-link font-bold" href="#components">Read the post</a>
              <p className={NOTE}>Ink text with a 2px pop underline, offset 4px. Navigation links show the underline on hover only.</p>
            </div>

            <div className="mt-10">
              <h3 className={`${H3} mb-3`}>List row</h3>
              <div className={ROW}>
                <span className="text-sm whitespace-nowrap tabular-nums sm:pt-1.5">Jan 2026 – now</span>
                <div><b className={H3}>Job title</b><span className="font-bold">Company name</span></div>
              </div>
              <p className={NOTE}>Experience, songs and posts: a display-type title, a regular line under it, tabular figures for dates and counts.</p>
            </div>

            <div className="mt-10">
              <h3 className={`${H3} mb-3`}>Halftone placeholder</h3>
              <div className="halftone aspect-[3/2] w-[min(100%,240px)] animate-pulse motion-reduce:animate-none" role="img" aria-label="Loading placeholder" />
              <p className={NOTE}>Ink dots on a 14px grid over pop, fading out diagonally. Stands in for any photo or cover that is loading or missing, and pulses gently unless reduced motion is on.</p>
            </div>

            <div className="mt-10">
              <h3 className={`${H3} mb-3`}>Now-playing bar</h3>
              <div className="flex h-12 items-center gap-2.5 bg-ink p-2.5 text-sm whitespace-nowrap text-paper">
                <span className="eq playing text-pop" aria-hidden="true"><i /><i /><i /></span>
                <span>Now playing</span>
                <span className="halftone size-7 flex-none" aria-hidden="true" />
                <span className="min-w-0 truncate"><b>Song title</b> <span className="hidden min-[480px]:inline">Artist name</span></span>
                <span className="ml-auto font-bold">Listen on Spotify</span>
              </div>
              <p className={NOTE}>Fixed to the bottom of every page. Solid ink with paper text; the three pop bars bounce only while a song is playing. The whole bar is one link.</p>
            </div>

            <div className="mt-10">
              <h3 className={`${H3} mb-3`}>Ink switcher</h3>
              <Switcher />
              <p className={NOTE}>Five two-dot swatches in the header. The selected one gets a 2px ink ring. The choice is saved per visitor and applied before first paint.</p>
            </div>
          </section>

          <section id="rules" className={SECTION}>
            <h2 className={H2}>Do and don&apos;t</h2>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-6">
              {([["Do", DO], ["Don't", DONT]] as const).map(([title, list]) => (
                <div key={title}>
                  <h3 className={`${H3} mb-3`}>{title}</h3>
                  <ul className="space-y-2.5">{list.map((r) => <li key={r}>{r}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>

          <section id="source" className={SECTION}>
            <h2 className={H2}>Source</h2>
            <p className={PROSE}>This page is drawn from <a className="ink-link font-bold" href={SPEC_URL}>design.md</a>. In code, the source of truth is <code>app/global.css</code>. Drop these tokens into any page to print in Dua Tinta:</p>
            <pre className="mt-10"><code>{TOKENS}</code></pre>
          </section>
        </main>
      </div>

      <footer className="mt-24 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
        <p>© 2026 Taufiq Dwi Purnomo</p>
        <a className="ink-link font-bold" href="https://taufiqdp.com">taufiqdp.com</a>
      </footer>
    </>
  );
}
