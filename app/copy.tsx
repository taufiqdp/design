"use client";

import { useState } from "react";

const PROMPT = "Use the Dua Tinta design system for this UI. Follow its tokens, type scale, layout rules and do's and don'ts exactly. Source: https://taufiqdp.com/design.md\n\n";

export function CopySpec({ md }: { md: string }) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        <CopyButton label="Copy design.md" text={md} />
        <CopyButton label="Copy as agent prompt" text={PROMPT + md} />
      </div>
      <p className="mt-2 text-[13px]">Paste it into your AI agent, or save it as DESIGN.md in a repo.</p>
    </div>
  );
}

function CopyButton({ label, text }: { label: string; text: string }) {
  const [shown, setShown] = useState(label);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setShown("Copied");
    } catch {
      setShown("Couldn't copy, try again");
    }
    setTimeout(() => setShown(label), 2000);
  }
  return (
    <button onClick={copy} className="cursor-pointer rounded-full border-2 border-ink px-3.5 py-1 text-sm font-bold hover:bg-ink hover:text-paper">
      <span aria-live="polite">{shown}</span>
    </button>
  );
}
