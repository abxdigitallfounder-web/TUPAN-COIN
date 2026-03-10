const PINGS = [
  { x:"26%", y:"44%", delay:"0s" },
  { x:"43%", y:"28%", delay:"0.7s" },
  { x:"61%", y:"52%", delay:"1.2s" },
  { x:"34%", y:"67%", delay:"0.4s" },
  { x:"71%", y:"35%", delay:"0.9s" },
  { x:"50%", y:"73%", delay:"1.6s" },
];

const FEATURES = [
  { code:"01", label:"dMRV ON-CHAIN",       desc:"Cada token carrega um ID único ligado a um m² real. Geolocalização imutável registrada na blockchain BNB Chain." },
  { code:"02", label:"SATÉLITE DE ALTA RES",desc:"Imagens SAR e multiespectrais verificam continuamente a biomassa florestal, captura de CO e integridade do lastro." },
  { code:"03", label:"CHAINLINK ORÁCULOS",  desc:"Dados ambientais em tempo real alimentam o smart contract via oráculos Chainlink  nenhum dado off-chain sem verificação." },
  { code:"04", label:"VERRA & GOLD STANDARD",desc:"Créditos certificados pelos maiores registros globais. Aceitos por empresas Fortune 500 no cumprimento de metas ESG." },
];

const MapaLastroSection = () => (
  <section id="mapa" style={{ background:"var(--t-bg)", padding:"90px 0", overflow:"hidden" }}>
    <div className="tupan-container">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }} className="mapa-grid">

        {/* Satellite map */}
        <div style={{
          position:"relative", aspectRatio:"4/3", borderRadius:6, overflow:"hidden",
          border:"1px solid var(--t-border)", background:"#030509",
        }}>
          {/* Forest */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 40% 55%, #081408 0%, #020408 100%)" }}/>
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(163,224,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(163,224,0,0.05) 1px, transparent 1px)", backgroundSize:"32px 32px" }}/>

          {/* Forest blobs */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="140" cy="130" rx="88" ry="58" fill="rgba(0,60,20,0.6)"/>
            <ellipse cx="240" cy="165" rx="68" ry="48" fill="rgba(0,50,16,0.5)"/>
            <ellipse cx="308" cy="108" rx="54" ry="38" fill="rgba(0,55,18,0.45)"/>
            <ellipse cx="80" cy="218" rx="62" ry="40" fill="rgba(0,52,17,0.5)"/>
            <ellipse cx="198" cy="76" rx="48" ry="30" fill="rgba(0,48,15,0.4)"/>
            <path d="M0 158C50 150 100 172 155 163C210 154 265 178 335 168L400 166V180L335 182C265 192 210 168 155 177C100 186 50 164 0 172Z" fill="rgba(0,60,140,0.4)"/>
          </svg>

          {/* Scan line */}
          <div style={{ position:"absolute", left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(163,224,0,0.8) 40%, rgba(163,224,0,0.8) 60%, transparent)", animation:"mapScan 4s ease-in-out infinite", zIndex:3 }}/>

          {/* Pings */}
          {PINGS.map((p, i) => (
            <div key={i} style={{ position:"absolute", left:p.x, top:p.y, transform:"translate(-50%,-50%)", zIndex:4 }}>
              <div style={{ position:"absolute", width:24, height:24, borderRadius:"50%", border:"1px solid rgba(0,255,157,0.5)", top:"50%", left:"50%", animation:`pingRing 2s ${p.delay} ease-out infinite` }}/>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#A3E000", boxShadow:"0 0 10px #A3E000" }}/>
            </div>
          ))}

          {/* HUD */}
          <div style={{ position:"absolute", top:10, left:10, fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(163,224,0,0.65)", lineHeight:1.8, zIndex:5 }}>
            <div>▶ SAT-LIVE FEED</div>
            <div>ZOOM 14.2x • S2-L2A</div>
          </div>
          <div style={{ position:"absolute", bottom:10, left:10, fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(0,255,157,0.45)", zIndex:5 }}>
            -3.4653° S, -62.2159° W
          </div>
          <div style={{ position:"absolute", bottom:10, right:10, fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(0,212,255,0.6)", zIndex:5 }}>
            dMRV v2.1 ✓
          </div>
          <div style={{ position:"absolute", top:10, right:10, background:"rgba(0,255,157,0.08)", border:"1px solid rgba(0,255,157,0.25)", borderRadius:3, padding:"3px 8px", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"var(--t-green)", zIndex:5 }}>
            ON-CHAIN ⬡
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="s-label">// PROOF OF RESERVE</span>
          <h2 className="s-title">
            Cada Token, Um <span style={{ color:"var(--t-green)" }}>Metro Quadrado</span> Real
          </h2>
          <p style={{ fontSize:15, color:"var(--t-muted)", lineHeight:1.8, marginBottom:32 }}>
            O Token TUPAN é lastreado 1:1 em área florestal verificada. Oráculos on-chain e satélites garantem que o ativo biológico está crescendo e gerando carbono — tudo rastreável e imutável.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:0, border:"1px solid var(--t-border)", borderRadius:6, overflow:"hidden" }}>
            {FEATURES.map((f, i) => (
              <div key={f.code} style={{
                display:"flex", gap:16, padding:"20px 20px",
                borderBottom: i < FEATURES.length - 1 ? "1px solid var(--t-border)" : "none",
                transition:"background .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--t-green-dim)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(0,255,157,0.4)", flexShrink:0, marginTop:2, letterSpacing:1 }}>{f.code}</span>
                <div>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1.5, color:"var(--t-green)", marginBottom:5, textTransform:"uppercase" }}>{f.label}</p>
                  <p style={{ fontSize:13, color:"var(--t-muted)", lineHeight:1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MapaLastroSection;
