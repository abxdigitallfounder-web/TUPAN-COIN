import { useState, useEffect, useRef } from "react";
import foto0 from "../assets/FOTO0.png";
import foto1 from "../assets/FOTO1.jpg";
import foto2 from "../assets/FOTO2.jpg";
import foto3 from "../assets/FOTO3.jpg";
import foto4 from "../assets/FOTO4.png";

const SLIDES = [
  { src: foto0, caption: "Vista aérea da área de reflorestamento" },
  { src: foto1, caption: "Plantio ativo na floresta Amazônica" },
  { src: foto2, caption: "Equipe de campo monitorando as árvores" },
  { src: foto3, caption: "Área de preservação certificada TUPAN" },
  { src: foto4, caption: "Monitoramento e certificação ambiental" },
];

const ProjetoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleDragStart = (x: number) => { setDragging(true); setStartX(x); };
  const handleDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const diff = startX - x;
    if (Math.abs(diff) > 40) { go(diff > 0 ? current + 1 : current - 1); resetTimer(); }
  };

  return (
    <section style={{ background: "#050e03", padding: "80px 0", overflow: "hidden" }}>
      <style>{`
        .pc-img { transition: opacity .45s ease, transform .45s ease; }
        .pc-dot { transition: all .25s; }
        .pc-arrow { transition: background .15s, transform .15s; }
        .pc-arrow:hover { background: rgba(163,224,0,0.15) !important; transform: scale(1.08); }
        @keyframes pcFade { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: scale(1); } }
        .pc-slide-active { animation: pcFade .5s ease; }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 40px" }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(26px, 3vw, 42px)",
          fontWeight: 800, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.15,
          maxWidth: 480,
        }}>
          Veja o projeto com seus próprios olhos
        </h2>
        <p style={{
          marginTop: 12, fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 420, lineHeight: 1.6,
        }}>
          Cada token TUPAN tem lastro em uma árvore plantada e monitorada em tempo real na floresta Amazônica.
        </p>
      </div>

      {/* Carousel */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div
          style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(163,224,0,0.15)",
            boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 30px rgba(163,224,0,0.05)",
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onMouseDown={e => handleDragStart(e.clientX)}
          onMouseUp={e => handleDragEnd(e.clientX)}
          onMouseLeave={e => { if (dragging) handleDragEnd(e.clientX); }}
          onTouchStart={e => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
        >
          {/* Top glow */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 10,
            background: "linear-gradient(90deg, transparent, #A3E000, transparent)",
            pointerEvents: "none",
          }} />

          {/* Image */}
          <img
            key={current}
            src={SLIDES[current].src}
            alt={SLIDES[current].caption}
            className="pc-slide-active"
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Caption overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
            padding: "40px 28px 24px",
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 15,
              fontWeight: 500, color: "rgba(255,255,255,0.85)", margin: 0,
            }}>
              {SLIDES[current].caption}
            </p>
          </div>

          {/* Arrow prev */}
          <button
            className="pc-arrow"
            onClick={() => { go(current - 1); resetTimer(); }}
            style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(163,224,0,0.25)",
              background: "rgba(0,0,0,0.55)", color: "#A3E000", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, zIndex: 10,
            }}
          >‹</button>

          {/* Arrow next */}
          <button
            className="pc-arrow"
            onClick={() => { go(current + 1); resetTimer(); }}
            style={{
              position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
              width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(163,224,0,0.25)",
              background: "rgba(0,0,0,0.55)", color: "#A3E000", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, zIndex: 10,
            }}
          >›</button>

          {/* Counter badge */}
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(163,224,0,0.2)", borderRadius: 999,
            padding: "4px 12px",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            color: "rgba(255,255,255,0.6)", zIndex: 10,
          }}>
            {current + 1} / {SLIDES.length}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className="pc-dot"
              onClick={() => { go(i); resetTimer(); }}
              style={{
                width: i === current ? 24 : 8, height: 8,
                borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                background: i === current ? "#A3E000" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjetoCarousel;
