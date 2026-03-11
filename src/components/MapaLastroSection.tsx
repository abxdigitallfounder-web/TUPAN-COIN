const PINGS = [
  { x:"26%", y:"44%", delay:"0s" },
  { x:"43%", y:"28%", delay:"0.7s" },
  { x:"61%", y:"52%", delay:"1.2s" },
  { x:"34%", y:"67%", delay:"0.4s" },
  { x:"71%", y:"35%", delay:"0.9s" },
  { x:"50%", y:"73%", delay:"1.6s" },
];

const FEATURES = [
  { code:"01", label:"dMRV ON-CHAIN",        desc:"Cada token carrega um ID único ligado a um m² real. Geolocalização imutável registrada na blockchain BNB Chain." },
  { code:"02", label:"SATÉLITE DE ALTA RES", desc:"Imagens SAR e multiespectrais verificam continuamente a biomassa florestal, captura de CO₂ e integridade do lastro." },
  { code:"03", label:"CHAINLINK ORÁCULOS",   desc:"Dados ambientais em tempo real alimentam o smart contract via oráculos Chainlink — nenhum dado off-chain sem verificação." },
  { code:"04", label:"VERRA & GOLD STANDARD",desc:"Créditos certificados pelos maiores registros globais. Aceitos por empresas Fortune 500 no cumprimento de metas ESG." },
];

const MapaLastroSection = () => (
  <section id="mapa" style={{ background:"var(--t-bg)", padding:"120px 0", overflow:"hidden" }}>
    <style>{`
      @media (max-width: 768px) {
        .mapa-feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .mapa-feature-grid > div:nth-child(2) { border-right: none !important; }
        .mapa-feature-grid > div:nth-child(1),
        .mapa-feature-grid > div:nth-child(2) { border-bottom: 1px solid var(--t-border) !important; }
        .mapa-feature-grid > div:nth-child(3) { border-right: 1px solid var(--t-border) !important; }
      }
      @media (max-width: 480px) {
        .mapa-feature-grid { grid-template-columns: 1fr !important; }
        .mapa-feature-grid > div { border-right: none !important; border-bottom: 1px solid var(--t-border) !important; }
        .mapa-feature-grid > div:last-child { border-bottom: none !important; }
      }
    `}</style>

    <div className="tupan-container">

      {/* ── Centered header ── */}
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <p style={{
          fontFamily:"'IBM Plex Mono', monospace", fontSize:10, letterSpacing:3,
          color:"var(--t-green)", textTransform:"uppercase", marginBottom:20,
        }}>
          LASTRO FÍSICO VERIFICADO
        </p>
        <h2 style={{
          fontFamily:"'Space Grotesk', sans-serif",
          fontSize:"clamp(32px, 5vw, 52px)", fontWeight:600,
          letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:24,
          color:"var(--t-text, #fff)",
        }}>
          Cada Token, Um{" "}
          <span style={{ color:"var(--t-green)" }}>Metro Quadrado</span> Real
        </h2>
        <p style={{
          fontSize:16, color:"var(--t-muted)", lineHeight:1.75,
          maxWidth:560, margin:"0 auto",
        }}>
          O Token TUPAN é lastreado 1:1 em área florestal verificada. Oráculos
          on-chain e satélites garantem que o ativo biológico está crescendo e
          gerando carbono — tudo rastreável e imutável.
        </p>
      </div>

      {/* ── Full-width cinematic satellite map ── */}
      <div style={{
        position:"relative", width:"100%", aspectRatio:"21/9",
        borderRadius:12, overflow:"hidden",
        border:"1px solid var(--t-border)", background:"#030509",
      }}>
        <iframe
          src="https://maps.google.com/maps?q=-2.74475,-60.24267&z=16&t=k&output=embed"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none", opacity:0.88 }}
          loading="lazy"
          title="Amazônia — Satélite"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Scan line */}
        <div style={{
          position:"absolute", left:0, right:0, height:1,
          background:"linear-gradient(90deg, transparent, rgba(163,224,0,0.8) 40%, rgba(163,224,0,0.8) 60%, transparent)",
          animation:"mapScan 4s ease-in-out infinite", zIndex:3,
        }}/>

        {/* Pings */}
        {PINGS.map((p, i) => (
          <div key={i} style={{ position:"absolute", left:p.x, top:p.y, transform:"translate(-50%,-50%)", zIndex:4 }}>
            <div style={{
              position:"absolute", width:24, height:24, borderRadius:"50%",
              border:"1px solid rgba(0,255,157,0.5)", top:"50%", left:"50%",
              animation:`pingRing 2s ${p.delay} ease-out infinite`,
            }}/>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#A3E000", boxShadow:"0 0 10px #A3E000" }}/>
          </div>
        ))}

        {/* HUD — top-left */}
        <div style={{
          position:"absolute", top:16, left:16,
          fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
          color:"rgba(163,224,0,0.65)", lineHeight:1.8, zIndex:5,
        }}>
          <div>▶ SAT-LIVE FEED</div>
          <div>ZOOM 14.2x • S2-L2A</div>
        </div>

        {/* HUD — bottom-left: coordinates */}
        <div style={{
          position:"absolute", bottom:16, left:16,
          fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
          color:"rgba(0,255,157,0.45)", zIndex:5,
        }}>
          -2.7447° S, -60.2427° W
        </div>

        {/* HUD — bottom-right */}
        <div style={{
          position:"absolute", bottom:16, right:16,
          fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
          color:"rgba(0,212,255,0.6)", zIndex:5,
        }}>
          dMRV v2.1 ✓
        </div>

        {/* HUD — top-right badge */}
        <div style={{
          position:"absolute", top:16, right:16,
          background:"rgba(0,255,157,0.08)", border:"1px solid rgba(0,255,157,0.25)",
          borderRadius:4, padding:"4px 10px",
          fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
          color:"var(--t-green)", zIndex:5,
        }}>
          ON-CHAIN ⬡
        </div>

        {/* Bottom fade into bg */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:80,
          background:"linear-gradient(to top, var(--t-bg) 0%, transparent 100%)",
          zIndex:5, pointerEvents:"none",
        }}/>
      </div>

      {/* ── 4-column feature grid ── */}
      <div
        className="mapa-feature-grid"
        style={{
          display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:0,
          border:"1px solid var(--t-border)", borderRadius:12, overflow:"hidden",
          marginTop:2,
        }}
      >
        {FEATURES.map((f, i) => (
          <div
            key={f.code}
            style={{
              padding:"32px 28px",
              borderRight: i < FEATURES.length - 1 ? "1px solid var(--t-border)" : "none",
              transition:"background .25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(163,224,0,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{
              display:"block", fontFamily:"'IBM Plex Mono', monospace",
              fontSize:9, color:"rgba(0,255,157,0.35)", letterSpacing:1, marginBottom:20,
            }}>
              {f.code}
            </span>
            <p style={{
              fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
              letterSpacing:2, color:"var(--t-green)", marginBottom:14,
              textTransform:"uppercase",
            }}>
              {f.label}
            </p>
            <p style={{ fontSize:13, color:"var(--t-muted)", lineHeight:1.7 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default MapaLastroSection;
