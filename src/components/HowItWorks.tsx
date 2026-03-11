const STEPS = [
  {
    code: "01",
    icon: "🌱",
    title: "Você investe",
    desc: "A cada token TUPAN que você adquire, nós plantamos uma árvore real na Amazônia e financiamos a proteção de áreas ameaçadas pela extração ilegal.",
  },
  {
    code: "02",
    icon: "🌿",
    title: "A natureza trabalha",
    desc: "Essa floresta protegida e em crescimento contínuo limpa o ar, absorve gás carbônico e gera os valiosos créditos de carbono.",
  },
  {
    code: "03",
    icon: "💰",
    title: "Você lucra",
    desc: "Nós vendemos esses créditos para grandes corporações globais — e esse dinheiro volta para a comunidade como renda passiva.",
  },
];

const HowItWorks = () => (
  <section id="how" style={{ background: "var(--t-bg)", padding: "80px 0" }}>
    <style>{`
      @media (max-width: 767px) {
        .how-steps-grid { grid-template-columns: 1fr !important; }
        .how-steps-grid > div { padding: 32px 24px !important; }
        .how-cta-strip-new { flex-direction: column !important; align-items: flex-start !important; }
        #how { padding: 64px 0 !important; }
        .how-header { margin-bottom: 48px !important; }
      }
    `}</style>
    <div className="tupan-container">

      {/* ── Centered header ── */}
      <div className="how-header" style={{ textAlign: "center", marginBottom: 80 }}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 3,
          color: "var(--t-green)", textTransform: "uppercase", marginBottom: 20,
        }}>
          FUNCIONA EM 3 PASSOS SIMPLES
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600,
          letterSpacing: "-0.03em", lineHeight: 1.1,
          color: "var(--t-text, #fff)", marginBottom: 20,
        }}>
          Como funciona a{" "}
          <span style={{ color: "var(--t-green)" }}>TUPAN?</span>
        </h2>
        <p style={{
          fontSize: 16, color: "var(--t-muted)", lineHeight: 1.75,
          maxWidth: 520, margin: "0 auto",
        }}>
          Do seu investimento à renda passiva — um ciclo simples, real e verificável.
        </p>
      </div>

      {/* ── 3-step cards ── */}
      <div className="how-steps-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        background: "var(--t-border)",
        border: "1px solid var(--t-border)",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        {STEPS.map((step) => (
          <div
            key={step.code}
            style={{
              background: "var(--t-bg)",
              padding: "48px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              transition: "background .25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(163,224,0,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--t-bg)")}
          >
            {/* Step number */}
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
              color: "rgba(0,255,157,0.35)", letterSpacing: 2,
            }}>
              {step.code}
            </span>

            {/* Icon */}
            <span style={{ fontSize: 36, lineHeight: 1 }}>{step.icon}</span>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22, fontWeight: 600,
              letterSpacing: "-0.02em", lineHeight: 1.2,
              color: "var(--t-text, #fff)", margin: 0,
            }}>
              {step.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: 15, color: "var(--t-muted)",
              lineHeight: 1.75, margin: 0,
            }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA strip ── */}
      <div className="how-cta-strip-new" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
        marginTop: 48, padding: "32px 36px",
        border: "1px solid var(--t-border)", borderRadius: 12,
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            color: "var(--t-green)", fontSize: 18, marginBottom: 6,
          }}>
            Ativo real. Renda passiva. Impacto positivo.
          </h3>
          <p style={{ color: "var(--t-muted)", fontSize: 13, margin: 0 }}>
            Leia o Whitepaper completo com todos os detalhes técnicos e financeiros.
          </p>
        </div>
        <a
          href="https://tupan.io/whitepaper/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
            letterSpacing: 1.5, color: "var(--t-green)",
            border: "1px solid rgba(163,224,0,0.4)", borderRadius: 6,
            padding: "12px 24px", textDecoration: "none", whiteSpace: "nowrap",
            transition: "border-color .2s, background .2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--t-green)";
            e.currentTarget.style.background = "rgba(163,224,0,0.06)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(163,224,0,0.4)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          LER WHITEPAPER →
        </a>
      </div>

    </div>
  </section>
);

export default HowItWorks;
