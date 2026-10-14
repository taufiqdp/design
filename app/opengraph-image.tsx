import { ImageResponse } from "next/og";

export const alt = "Dua Tinta, the design system of taufiqdp.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default pair: shared previews can't know a visitor's ink choice
const INK = "#3255A4";
const POP = "#FF6C2F";
const PAPER = "#F4F4F1";

// The OG renderer can't use variable fonts, so ask Google Fonts for a static instance subset to the text
async function archivo(axes: string, text: string) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Archivo:${axes}&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`Archivo ${axes} not found`);
  return (await fetch(url)).arrayBuffer();
}

export default async function Image() {
  const name = "Dua Tinta";
  const left = "Design system";
  const right = "design.taufiqdp.com";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 60, background: PAPER, color: INK, fontFamily: "Archivo" }}>
        <div style={{ position: "relative", display: "flex", height: 220, background: POP }}>
          <div
            style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `radial-gradient(circle, ${INK} 38%, transparent 40%)`,
              backgroundSize: "18px 18px",
              maskImage: "linear-gradient(155deg, #000 10%, transparent 80%)",
            }}
          />
        </div>
        {/* Stacked like the page masthead, overlapping the block by 0.6em */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: -126, fontSize: 210, fontWeight: 900, lineHeight: 0.84, textTransform: "uppercase" }}>
          {name.split(" ").map((w) => <span key={w}>{w}</span>)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", fontSize: 30, fontWeight: 700 }}>
          <span>{left}</span>
          <span>{right}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: await archivo("wdth,wght@70,900", name.toUpperCase()), weight: 900 },
        { name: "Archivo", data: await archivo("wght@700", left + right), weight: 700 },
      ],
    },
  );
}
