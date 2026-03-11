import React from "react";
import heroBg from "@/assets/13360655_3840_2160_60fps.mp4";
import logo from "@/assets/LOGO-SITEE.png";

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
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src={heroBg} type="video/mp4" />
      </video>
      {/* Dark overlay over video */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(10,17,13,0.55) 0%, rgba(10,17,13,0.45) 50%, rgba(10,17,13,0.80) 100%)",
      }} />
      {/* Logo top-left */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 28,
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <img src={logo} alt="TUPAN" style={{ width: 156, height: 156, objectFit: "contain", display: "block" }} />
      </div>

      {/* Vignette */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
        background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(9,11,16,0.75) 100%)",
      }}/>

      <div className="tupan-container" style={{ position:"relative", zIndex:2 }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", maxWidth:820, margin:"0 auto" }}>

          <h1 style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(36px,6vw,76px)",
            fontWeight:800,
            lineHeight:1.0,
            marginBottom:28,
            letterSpacing:"-2px",
            textShadow:"0 4px 40px rgba(0,0,0,0.6)",
          }}>
            <span style={{ color:"#fff", display:"block" }}>Renda Passiva</span>
            <span style={{ display:"block" }}>
              <span style={{ color:"#00ff9d", textShadow:"0 0 60px rgba(0,255,157,0.5), 0 4px 40px rgba(0,0,0,0.5)" }}>Lastreada</span>
              <span style={{ color:"#fff" }}> na</span>
            </span>
            <span style={{ color:"#fff", display:"block" }}>
              Floresta{" "}
              <span style={{ color:"#f5a623", textShadow:"0 0 40px rgba(245,166,35,0.4)" }}>Amazônica.</span>
            </span>
          </h1>

          <p style={{
            fontSize:"clamp(15px,1.5vw,18px)",
            color:"rgba(255,255,255,0.75)",
            lineHeight:1.8,
            marginBottom:44,
            maxWidth:580,
            textShadow:"0 2px 16px rgba(0,0,0,0.6)",
          }}>
            Adquira o Token{" "}
            <strong style={{ color:"#00ff9d", fontFamily:"'IBM Plex Mono',monospace" }}>TUPAN (RWA)</strong> e receba dividendos anuais em{" "}
            <strong style={{ color:"#f5a623" }}>Dólar (USDC)</strong> provenientes da venda de Créditos de Carbono no mercado global.
          </p>

          <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", marginBottom:56 }}>
            <a href="/transacao" className="btn btn-solid btn-outline-lg" style={{ backdropFilter:"blur(8px)" }}>
              COMPRAR TUPAN AGORA
            </a>
            <a href="/#calculadora" className="btn btn-outline btn-outline-lg" style={{ backdropFilter:"blur(8px)" }}>
              CALCULAR LUCROS
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display:"flex",
            gap:0,
            border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:12,
            overflow:"hidden",
            backdropFilter:"blur(16px)",
            background:"rgba(10,17,13,0.45)",
            width:"100%",
            maxWidth:560,
          }}>
            {[
              { label:"PREÇO TOKEN", value:"$10.00", color:"#00ff9d" },
              { label:"APY ESTIMADO", value:"15%", color:"#f5a623" },
              { label:"CARBONO OFFSET", value:"840 tCO₂", color:"#00d4ff" },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex:1,
                padding:"18px 12px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                textAlign:"center",
              }}>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2, color:"rgba(200,220,210,0.6)", marginBottom:6, textTransform:"uppercase" }}>{s.label}</p>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:20, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
