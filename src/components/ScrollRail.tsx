import { useEffect, useState } from "react";

// Converts scroll percentage into a 00–100 progress value.
function frames(pct: number) {
  const total = Math.round(pct * 100);
  return String(total).padStart(2, "0");
}

export function ScrollRail() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;

      setPct(
        scrollable > 0 ? Math.min(1, Math.max(0, h.scrollTop / scrollable)) : 0,
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <span className="scroll-rail-tc">00</span>

      <div className="scroll-rail-track">
        <div className="scroll-rail-fill" style={{ height: `${pct * 100}%` }} />
      </div>

      <span className="scroll-rail-tc">{frames(pct)}</span>
    </div>
  );
}
