"use client";

import { useSyncExternalStore } from "react";

const PAIRS = {
  orange: { name: "Medium Blue + Orange", ink: "#3255A4", pop: "#FF6C2F", note: "6.4:1. Default." },
  pink: { name: "Blue + Fluorescent Pink", ink: "#0078BF", pop: "#FF48B0", note: "4.3:1, AA for large text only." },
  green: { name: "Hunter Green + Sunflower", ink: "#407060", pop: "#FFB511", note: "5.2:1." },
  burgundy: { name: "Burgundy + Yellow", ink: "#914E72", pop: "#FFE800", note: "5.4:1." },
  black: { name: "Black + Fluorescent Red", ink: "#000000", pop: "#FF4C65", note: "19:1." },
};
type Ink = keyof typeof PAIRS;
const KEYS = Object.keys(PAIRS) as Ink[];

// The data-ink attribute on <html> is the single source of truth; every switcher watches it.
function read(): Ink {
  const k = document.documentElement.dataset.ink;
  return k && k in PAIRS ? (k as Ink) : "orange";
}
function subscribe(cb: () => void) {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ink"] });
  return () => o.disconnect();
}
const useInk = () => useSyncExternalStore(subscribe, read, () => "orange" as Ink);

function setInk(k: Ink) {
  document.documentElement.dataset.ink = k;
  try {
    localStorage.setItem("ink", k);
  } catch {}
}

export function Switcher() {
  const ink = useInk();
  return (
    <div className="flex gap-1" role="group" aria-label="Ink pair">
      {KEYS.map((k) => (
        <button key={k} data-ink={k} title={PAIRS[k].name} aria-label={PAIRS[k].name} aria-pressed={ink === k} onClick={() => setInk(k)} className="flex cursor-pointer rounded-full p-1 ring-ink aria-pressed:ring-2">
          <i className="size-3.5 rounded-full bg-ink" />
          <i className="size-3.5 rounded-full bg-pop" />
        </button>
      ))}
    </div>
  );
}

export function PairList() {
  const ink = useInk();
  return (
    <ul>
      {KEYS.map((k) => (
        <li key={k}>
          <button data-ink={k} aria-pressed={ink === k} onClick={() => setInk(k)} className="grid w-full cursor-pointer grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 border-b-2 border-pop py-4 text-left">
            <span className="flex pt-1.5">
              <i className="size-5 rounded-full bg-ink" />
              <i className="size-5 rounded-full bg-pop" />
            </span>
            <b className="display text-2xl leading-tight font-extrabold [font-stretch:80%]">{PAIRS[k].name}</b>
            <span className="col-start-2 text-sm">
              {PAIRS[k].ink} and {PAIRS[k].pop}. Text on paper {PAIRS[k].note} {ink === k && <b>In use.</b>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Hex({ of }: { of: "ink" | "pop" }) {
  return <>{PAIRS[useInk()][of]}</>;
}
