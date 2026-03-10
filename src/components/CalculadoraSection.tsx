import { useState } from "react";

// 60.000% ROI over 36 months = 600x multiplier
const ROI_36M = 600;
const MIN = 1;
const MAX = 1000000;

const fmtBRL = (n: number) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CalculadoraSection = () => {
  const [inv, setInv] = useState(100);
  const [inputStr, setInputStr] = useState("100");
  const [period, setPeriod] = useState(24);

  const handleInput = (val: string) => {
    setInputStr(val);
    const n = parseFloat(val.replace(/[^0-9.]/g, ""));
    if (!isNaN(n) && n >= MIN) setInv(n);
  };

  const ratio     = period / 36;
  const roiPct    = ROI_36M * ratio;
  const total     = Math.round(inv * roiPct);
  const dividends = Math.round(total * 0.25);
  const tokenGain = total - dividends;
  const pct       = Math.min(100, ((Math.min(inv, MAX) - MIN) / (MAX - MIN)) * 100).toFixed(1) + "%";

  return (
    <section id="calculadora" style={{ background:"var(--t-surface)", padding:"90px 0", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, right:0, width:300, height:300, background:"radial-gradient(circle, rgba(163,224,0,0.04) 0%, transparent 70%)", pointerEvents:"none" }}/>

      <div className="tupan-container">
        <div style={{ marginBottom:48 }}>
          <span className="s-label">// YIELD CALCULATOR</span>
          <h2 className="s-title">
            Simule Seu <span style={{ color:"var(--t-green)" }}>Retorno</span> em Tempo Real
          </h2>
          <p className="s-sub">Execute projeções baseadas em dados históricos do mercado de créditos de carbono. Arraste o slider ou digite o valor e veja seu portfólio crescer.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:"var(--t-border)" }} className="calc-grid">
          {/* Input panel */}
          <div style={{ background:"var(--t-bg)", padding:"36px 32px" }}>
            <div style={{
              display:"flex", alignItems:"center", gap:8, marginBottom:28,
              fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.5)", letterSpacing:2,
              borderBottom:"1px solid var(--t-border)", paddingBottom:12,
            }}>
              INPUT_PARAMS.json
            </div>

            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"rgba(136,152,170,0.7)", letterSpacing:1, marginBottom:8, textTransform:"uppercase" }}>
              Valor do Investimento
            </p>

            {/* Manual input */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:22, fontWeight:700, color:"var(--t-green)" }}>R$</span>
              <input
                type="number" min={MIN} value={inputStr}
                onChange={e => handleInput(e.target.value)}
                style={{
                  background:"transparent", border:"none", borderBottom:"1px solid rgba(163,224,0,0.3)",
                  color:"var(--t-green)", fontFamily:"'IBM Plex Mono',monospace", fontSize:36, fontWeight:700,
                  width:"100%", outline:"none", paddingBottom:4,
                } as React.CSSProperties}
              />
            </div>

            <input type="range" min={MIN} max={MAX} step={100} value={Math.min(inv, MAX)}
              onChange={e => { const n = Number(e.target.value); setInv(n); setInputStr(String(n)); }}
              className="calc-slider"
              style={{ width:"100%", marginBottom:8, "--pct": pct } as React.CSSProperties}
            />
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.4)", marginBottom:32 }}>
              <span>R$ 1</span><span>R$ 1.000.000</span>
            </div>

            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"rgba(136,152,170,0.7)", letterSpacing:1, marginBottom:12, textTransform:"uppercase" }}>
              Período de Holding
            </p>
            <div style={{ display:"flex", gap:8 }}>
              {[6,12,24,36].map(m => (
                <button key={m} onClick={() => setPeriod(m)}
                  style={{
                    flex:1, padding:"8px 4px", border:"1px solid",
                    borderColor: period === m ? "var(--t-green)" : "var(--t-border)",
                    background: period === m ? "rgba(163,224,0,0.08)" : "transparent",
                    color: period === m ? "var(--t-green)" : "rgba(136,152,170,0.6)",
                    fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer",
                    borderRadius:3, transition:"all .2s",
                  }}>
                  {m}m
                </button>
              ))}
            </div>

            <div style={{ marginTop:32, padding:"16px 0", borderTop:"1px solid var(--t-border)" }}>
              {[
                ["ROI_PROJETADO",    `${(roiPct * 100).toLocaleString("pt-BR", { maximumFractionDigits:0 })}% em ${period}m`],
                ["ROI_36M_BASE",     "60.000% (600x)"],
                ["MOEDA_DIVIDENDO",  "USDC (Dólar digital)"],
              ].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.4)" }}>{k}</span>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(200,214,229,0.8)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output panel */}
          <div style={{ background:"var(--t-bg)", padding:"36px 32px" }}>
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              marginBottom:28,
              fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.5)", letterSpacing:2,
              borderBottom:"1px solid var(--t-border)", paddingBottom:12,
            }}>
              <span>OUTPUT_PROJECTION.json</span>
              <span style={{ color:"var(--t-green)" }}>▶ RUNNING</span>
            </div>

            {/* ROI badge */}
            <div style={{
              background:"rgba(163,224,0,0.04)", border:"1px solid rgba(163,224,0,0.2)",
              borderRadius:6, padding:"24px", textAlign:"center", marginBottom:20,
            }}>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2, color:"rgba(136,152,170,0.6)", marginBottom:6, textTransform:"uppercase" }}>
                RETORNO TOTAL EM {period} MESES
              </p>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:56, fontWeight:700, color:"var(--t-green)", lineHeight:1, textShadow:"0 0 40px rgba(163,224,0,0.4)" }}>
                +{(roiPct * 100).toLocaleString("pt-BR", { maximumFractionDigits:0 })}%
              </p>
            </div>

            {/* Breakdown */}
            {[
              { label:"DIVIDENDOS", sub:"Recebíveis em USDC", val:fmtBRL(dividends), color:"#f5a623" },
              { label:"VALORIZAÇÃO TOKEN", sub:"Apreciação do ativo TUPAN", val:fmtBRL(tokenGain), color:"var(--t-green)" },
              { label:"RETORNO TOTAL", sub:"Dividendos + apreciação", val:fmtBRL(total), color:"#fff", highlight:true },
            ].map(c => (
              <div key={c.label} style={{
                padding:"18px 20px", marginBottom:8, borderRadius:4,
                background: c.highlight ? "rgba(163,224,0,0.05)" : "rgba(255,255,255,0.02)",
                border:`1px solid ${c.highlight ? "rgba(163,224,0,0.2)" : "var(--t-border)"}`,
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1, color:c.color, fontWeight:c.highlight ? 700 : 400, marginBottom:2 }}>{c.label}</p>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.5)" }}>{c.sub}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:c.highlight ? 20 : 17, fontWeight:700, color:c.color }}>{c.val}</p>
                </div>
              </div>
            ))}

            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.3)", marginTop:16, lineHeight:1.7 }}>
              * Projeção baseada em APY histórico do mercado VCS/Gold Standard.<br/>
              Rendimentos passados não garantem resultados futuros.
            </p>
          </div>
        </div>

        <div style={{ marginTop:20, display:"flex", justifyContent:"center" }}>
          <a href="/transacao" className="btn btn-solid btn-outline-lg">
            ⬡ EXECUTAR INVESTIMENTO
          </a>
        </div>
      </div>
    </section>
  );
};

export default CalculadoraSection;
