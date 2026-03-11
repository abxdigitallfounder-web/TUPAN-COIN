import { useState } from "react";

const tiers = [
  { valor: 60,    pct: 30.00,  diario: 1.28,  final: 78    },
  { valor: 110,   pct: 31.81,  diario: 2.50,  final: 145   },
  { valor: 280,   pct: 32.14,  diario: 6.42,  final: 370   },
  { valor: 600,   pct: 40.00,  diario: 17.14, final: 840   },
  { valor: 900,   pct: 41.11,  diario: 26.42, final: 1270  },
  { valor: 1400,  pct: 42.00,  diario: 42.00, final: 1988  },
  { valor: 2100,  pct: 49.00,  diario: 73.50, final: 3129  },
];

const fmt = (n: number) =>
  "R$\u00a0" + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CalculadoraSection = () => {
  const [selected, setSelected] = useState(3);
  const tier = tiers[selected];
  const lucro = tier.final - tier.valor;

  return (
    <section
      id="calculadora"
      style={{
        background: "var(--t-bg)",
        padding: "100px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="tupan-container" style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "var(--t-green)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Simulador de Retorno
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: 0,
          }}>
            Quanto você quer investir?
          </h2>
        </div>

        {/* Tier selector */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
          marginBottom: 56,
        }} className="tier-grid">
          {tiers.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                padding: "14px 4px",
                border: "1px solid",
                borderColor: selected === i ? "var(--t-green)" : "rgba(255,255,255,0.08)",
                background: selected === i ? "rgba(0,230,118,0.06)" : "transparent",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "center",
              }}
            >
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: selected === i ? "var(--t-green)" : "rgba(255,255,255,0.5)",
                marginBottom: 2,
              }}>
                {t.valor >= 1000 ? `R$${(t.valor/1000).toLocaleString("pt-BR",{minimumFractionDigits:1})}k` : `R$${t.valor}`}
              </p>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                color: selected === i ? "rgba(0,230,118,0.6)" : "rgba(255,255,255,0.2)",
              }}>
                {t.pct.toFixed(0)}%
              </p>
            </button>
          ))}
        </div>

        {/* Result card */}
        <div style={{
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(20px)",
        }}>

          {/* Main number */}
          <div style={{
            padding: "48px 40px 40px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: 12,
            }}>
              Em 14 dias, seu retorno total será
            </p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(48px, 8vw, 80px)",
              fontWeight: 800,
              color: "var(--t-green)",
              lineHeight: 1,
              letterSpacing: "-2px",
              textShadow: "0 0 60px rgba(0,230,118,0.3)",
              marginBottom: 8,
            }}>
              {fmt(tier.final)}
            </p>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13,
              color: "rgba(0,230,118,0.6)",
            }}>
              +{fmt(lucro)} de lucro ({tier.pct.toFixed(2)}% de retorno)
            </p>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}>
            {[
              { label: "Investido", value: fmt(tier.valor), sub: "Valor de entrada" },
              { label: "Ganho diário", value: fmt(tier.diario), sub: "Por dia, durante 14 dias", highlight: true },
              { label: "Duração", value: "14 dias", sub: "Período do ciclo" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 24px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  textAlign: "center",
                }}
              >
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}>
                  {s.label}
                </p>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  fontWeight: 700,
                  color: s.highlight ? "var(--t-green)" : "#fff",
                  letterSpacing: "-0.5px",
                  marginBottom: 6,
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 9,
                  color: "rgba(255,255,255,0.2)",
                }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a
            href="/transacao"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              background: "var(--t-green)",
              color: "#000",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "1px",
              textTransform: "uppercase",
              borderRadius: 100,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            Começar agora
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .tier-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default CalculadoraSection;

