const PRESS = [
  { name:"CoinTelegraph",   color:"#e2e8f0" },
  { name:"Forbes",          color:"#e2e8f0" },
  { name:"Exame",           color:"#e2e8f0" },
  { name:"InfoMoney",       color:"#f5a623" },
  { name:"Valor Econômico", color:"#e2e8f0" },
  { name:"Portal do Bitcoin",color:"#f7931a"},
];

const TECH = [
  { name:"CertiK",      sub:"Blockchain Audit",  color:"#00d4ff", icon:"", score:"98/100" },
  { name:"Polygon",     sub:"Layer 2 Scaling",   color:"#8b5cf6", icon:"", score:"Partner" },
  { name:"Chainlink",   sub:"Oracle Network",    color:"#375bd2", icon:"", score:"Live"    },
  { name:"Verra VCS",   sub:"Carbon Registry",   color:"#22c55e", icon:"", score:"Certified"},
  { name:"Gold Standard",sub:"Quality Label",    color:"#f5a623", icon:"", score:"Certified"},
  { name:"BNB Chain",   sub:"Smart Contracts",   color:"#f0b90b", icon:"", score:"Deployed"},
];

const TRUST = [
  { icon:"", text:"Smart Contract Auditado" },
  { icon:"",  text:"100% On-Chain" },
  { icon:"", text:"RWA Certificado" },
  { icon:"", text:"Dividendos em USDC" },
  { icon:"", text:"CertiK Score 98/100" },
];

const LogosSection = () => (
  <section id="parceiros" style={{ background:"var(--t-surface)", padding:"70px 0", borderTop:"1px solid var(--t-border)" }}>
    <div className="tupan-container">

      {/* Press */}
      <div style={{ marginBottom:48 }}>
        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:3, color:"rgba(136,152,170,0.5)", textTransform:"uppercase", textAlign:"center", marginBottom:24 }}>
          // AS SEEN IN
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
          {PRESS.map(p => (
            <div key={p.name} className="logo-pill" style={{
              padding:"9px 22px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:3,
              fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:13,
              color:p.color, letterSpacing:"0.3px", whiteSpace:"nowrap",
              background:"rgba(255,255,255,0.02)",
            }}>{p.name}</div>
          ))}
        </div>
      </div>

      <div style={{ borderTop:"1px solid var(--t-border)", marginBottom:48 }}/>

      {/* Tech */}
      <div style={{ marginBottom:48 }}>
        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:3, color:"rgba(136,152,170,0.5)", textTransform:"uppercase", textAlign:"center", marginBottom:24 }}>
          // TECNOLOGIA & AUDITORIA
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:1, background:"var(--t-border)" }} className="tech-grid-6">
          {TECH.map(t => (
            <div key={t.name} className="tech-pill" style={{
              background:"var(--t-bg)",
              padding:"20px 12px",
              textAlign:"center",
              cursor:"default",
            }}>
              <p style={{ fontSize:20, marginBottom:6, color:t.color }}>{t.icon}</p>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:700, color:t.color, marginBottom:3 }}>{t.name}</p>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.5)", marginBottom:4 }}>{t.sub}</p>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8, color:"rgba(0,255,157,0.6)", border:"1px solid rgba(0,255,157,0.2)", borderRadius:2, padding:"2px 5px" }}>{t.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
        {TRUST.map(b => (
          <div key={b.text} style={{
            display:"flex", alignItems:"center", gap:7,
            padding:"7px 14px", borderRadius:3,
            background:"rgba(0,255,157,0.04)", border:"1px solid rgba(0,255,157,0.1)",
            fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:600,
            color:"rgba(200,214,229,0.8)", whiteSpace:"nowrap", letterSpacing:0.5,
          }}>
            <span>{b.icon}</span><span>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LogosSection;
