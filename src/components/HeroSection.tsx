import React from "react";

const HeroSection = () => {

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "var(--t-bg)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: 96,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage: "linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}/>
      {/* Radial glow */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 60% 70% at 60% 50%, rgba(0,255,157,0.05) 0%, transparent 65%)",
      }}/>
      {/* Noise / vignette */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(9,11,16,0.8) 100%)",
      }}/>

      <div className="tupan-container" style={{ position:"relative", zIndex:2 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }} className="hero-grid-2col">

          {/* Left */}
          <div className="animate-fade-up">
            <h1 style={{
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(30px,4.5vw,58px)",
              fontWeight:800,
              lineHeight:1.05,
              marginBottom:24,
              letterSpacing:"-1px",
            }}>
              <span style={{ color:"#fff", display:"block" }}>A Primeira Plataforma</span>
              <span style={{ color:"#fff", display:"block" }}>de{" "}
                <span style={{ color:"#00ff9d", textShadow:"0 0 40px rgba(0,255,157,0.4)" }}>Renda Passiva</span>
              </span>
              <span style={{ color:"#fff", display:"block" }}>Lastreada na{" "}
                <span style={{ color:"#f5a623" }}>Amazônia.</span>
              </span>
            </h1>

            <p style={{ fontSize:16, color:"#8898aa", lineHeight:1.8, marginBottom:36, maxWidth:500 }}>
              Adquira o Token{" "}
              <strong style={{ color:"#00ff9d", fontFamily:"'IBM Plex Mono',monospace" }}>TUPAN (RWA)</strong> e receba dividendos anuais em{" "}
              <strong style={{ color:"#f5a623" }}>Dólar (USDC)</strong> provenientes da venda de Créditos de Carbono no mercado global.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:48 }}>
              <a href="/transacao" className="btn btn-solid btn-outline-lg">
                COMPRAR TUPAN AGORA
              </a>
              <a href="/#calculadora" className="btn btn-outline btn-outline-lg">
                CALCULAR LUCROS
              </a>
            </div>

            {/* Mini stats row */}
            <div style={{ display:"flex", gap:0, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              {[
                { label:"PREÇO TOKEN", value:"$10.00", color:"#00ff9d" },
                { label:"APY ESTIMADO", value:"12–18%", color:"#f5a623" },
                { label:"ÁREA LASTREADA", value:"5.000 m²", color:"#00d4ff" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  flex:1,
                  padding:"18px 16px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2, color:"rgba(136,152,170,0.7)", marginBottom:5, textTransform:"uppercase" }}>{s.label}</p>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:20, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;
