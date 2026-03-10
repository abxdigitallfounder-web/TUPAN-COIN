import { useEffect, useRef } from "react";

const STATS = [
  { id:"price",  label:"TUPAN PRICE",         value:"$10.00",  sub:"BSC MAINNET  PRÉ-VENDA", color:"#00ff9d", live:true  },
  { id:"apy",    label:"APY ESTIMADO",         value:"15%",     sub:"Rendimento anual em USDC", color:"#f5a623", live:false },
  { id:"tvl",    label:"ÁREA LASTREADA (TVL)", value:"5.000 m²",sub:"Amazônia  dMRV On-Chain", color:"#00d4ff", live:false },
  { id:"status", label:"STATUS DO CONTRATO",   value:"SEGURO",  sub:"Smart Contract Verificado", color:"#00ff9d", live:true, dot:true },
];

const DashboardSection = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    let x = 0;
    const animate = () => {
      x -= 0.4;
      const half = el.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      el.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <section id="dashboard" style={{ background:"var(--t-bg)", paddingBottom:70 }}>
      {/* Section label bar */}
      <div style={{ borderBottom:"1px solid var(--t-border)", padding:"10px 0", marginBottom:0 }}>
        <div className="tupan-container" style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(0,255,157,0.5)", letterSpacing:2 }}>// LIVE TERMINAL</span>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.5)", letterSpacing:1 }}>MARKET DATA</span>
        </div>
      </div>

      <div className="tupan-container" style={{ paddingTop:40 }}>
        <div style={{
          border:"1px solid var(--t-border)",
          borderRadius:6,
          overflow:"hidden",
          background:"var(--t-surface)",
        }}>
          {/* Panel header */}
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"12px 20px",
            borderBottom:"1px solid var(--t-border)",
            background:"rgba(255,255,255,0.02)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#ff4d6d", display:"inline-block" }}/>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#f5a623", display:"inline-block" }}/>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#00ff9d", display:"inline-block" }}/>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.6)", marginLeft:8, letterSpacing:1 }}>
                TUPAN.MARKET_DATA — live feed
              </span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#00ff9d", boxShadow:"0 0 6px #00ff9d", animation:"pulseDot 2s infinite", display:"inline-block" }}/>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(0,255,157,0.7)", letterSpacing:1 }}>CONNECTED</span>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }} className="dashboard-grid">
            {STATS.map((s, i) => (
              <div key={s.id} className="dashboard-stat" style={{
                padding:"28px 24px",
                borderRight: i < STATS.length - 1 ? "1px solid var(--t-border)" : "none",
                position:"relative",
              }}>
                {s.live && (
                  <span style={{
                    position:"absolute", top:12, right:12,
                    display:"inline-flex", alignItems:"center", gap:4,
                    fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
                    color:"rgba(0,255,157,0.7)", letterSpacing:1,
                  }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:"#00ff9d", animation:"pulseDot 2s infinite", display:"inline-block" }}/>
                    LIVE
                  </span>
                )}
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2, color:"rgba(136,152,170,0.6)", textTransform:"uppercase", marginBottom:10 }}>
                  {s.label}
                </p>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"clamp(20px,2.2vw,26px)", fontWeight:700, color:s.color, lineHeight:1.1, marginBottom:6 }}>
                  {s.dot && <span style={{ marginRight:6 }}>●</span>}{s.value}
                </p>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.45)", letterSpacing:0.5 }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Scrolling data bar */}
          <div style={{ borderTop:"1px solid var(--t-border)", padding:"8px 0", overflow:"hidden", position:"relative" }}>
            <div ref={barRef} style={{ display:"flex", width:"max-content" }}>
              {Array(2).fill(null).map((_,ri) => (
                <div key={ri} style={{ display:"flex" }}>
                  {[
                    ["BLOCK","#21,847,203"],["GAS","0.5 Gwei"],["TX_VOLUME","$142,804"],
                    ["HODLERS","1,244"],["CARBONO_OFFSET","840 tCO₂e"],["LAST_AUDIT","2026-02-14"],
                    ["CERTIK_SCORE","98/100"],["CHAIN","BNB CHAIN"],
                  ].map(([k,v]) => (
                    <span key={String(k)} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.5)", padding:"0 20px", borderRight:"1px solid var(--t-border)", whiteSpace:"nowrap" }}>
                      <span style={{ color:"rgba(0,255,157,0.5)", marginRight:6 }}>{String(k)}</span>{String(v)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
