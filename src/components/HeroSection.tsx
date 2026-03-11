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
      {/* Video background */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}>
        <iframe
          src="https://player.vimeo.com/video/1172678480?background=1&autoplay=1&loop=1&muted=1&controls=0"
          allow="autoplay; fullscreen"
          frameBorder="0"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "177.78vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      </div>
      {/* Dark overlay over video */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(10,17,13,0.55) 0%, rgba(10,17,13,0.45) 50%, rgba(10,17,13,0.80) 100%)",
      }} />
      {/* Vignette */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
        background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(9,11,16,0.75) 100%)",
      }}/>

      <div className="tupan-container" style={{ position:"relative", zIndex:2 }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", maxWidth:820, margin:"0 auto" }}>

          <h1 style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:"clamp(22px,3.2vw,46px)",
            fontWeight:800,
            lineHeight:1.3,
            marginBottom:28,
            letterSpacing:"-1px",
            textShadow:"0 4px 40px rgba(0,0,0,0.6)",
            color:"#fff",
          }}>
            Seu token planta uma árvore, protege a Amazônia e converte a venda de{" "}
            <span style={{ color:"#00ff9d", textShadow:"0 0 60px rgba(0,255,157,0.5)" }}>créditos de carbono</span>{" "}
            em lucro no seu bolso.
          </h1>

          {/* VSL Video */}
          <div style={{
            width:"100%",
            maxWidth:680,
            marginBottom:44,
            borderRadius:16,
            overflow:"hidden",
            boxShadow:"0 0 0 1px rgba(0,255,157,0.18), 0 8px 60px rgba(0,0,0,0.7), 0 0 80px rgba(0,255,157,0.08)",
            position:"relative",
            background:"#000",
            aspectRatio:"16/9",
          }}>
            {/* Glow border top */}
            <div style={{
              position:"absolute",
              top:0, left:0, right:0,
              height:2,
              background:"linear-gradient(90deg, transparent, #00ff9d, transparent)",
              zIndex:2,
            }} />
            <iframe
              src="https://player.vimeo.com/video/1172678480?autoplay=1&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0"
              allow="autoplay; fullscreen; picture-in-picture"
              frameBorder="0"
              style={{
                position:"absolute",
                inset:0,
                width:"100%",
                height:"100%",
              }}
            />
          </div>

          <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", marginBottom:56 }}>
            <a href="/transacao" className="btn btn-solid btn-outline-lg" style={{ backdropFilter:"blur(8px)" }}>
              COMPRAR TUPAN AGORA
            </a>
            <a href="/#calculadora" className="btn btn-outline btn-outline-lg" style={{ backdropFilter:"blur(8px)" }}>
              CALCULAR LUCROS
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
