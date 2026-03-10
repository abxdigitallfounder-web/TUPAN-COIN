const JoinSection = () => {
  const items = [
    { icon: "fa-globe",        title: "Comunidade Global",  desc: "Faça parte de uma rede global de investidores comprometidos com o futuro sustentável do planeta." },
    { icon: "fa-hands-helping",title: "Impacto Social",     desc: "Cada token comprado contribui diretamente para projetos sociais e de preservação ambiental." },
    { icon: "fa-seedling",     title: "Meio Ambiente",      desc: "Apoie a reflorestação e a preservação de biomas brasileiros com a tecnologia blockchain." },
    { icon: "fa-microchip",    title: "Tecnologia Verde",   desc: "Inovação tecnológica a serviço da natureza: drones, satélites e tokens cripto trabalhando juntos." },
  ];

  return (
    <section id="join" style={{ background: "var(--bg-canopy)", padding: "90px 0" }}>
      <div className="tupan-container">
        <div style={{ display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" }}>
          {/* Left: text + icons */}
          <div style={{ flex: "1 1 300px" }}>
            <div className="reveal">
              <p className="s-label">Por que participar?</p>
              <h2 className="s-title">JUNTE-SE À REVOLUÇÃO VERDE</h2>
              <p className="s-sub">
                O $TCT não é apenas um investimento — é um compromisso com o futuro do planeta e das próximas gerações.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {items.map(({ icon, title, desc }) => (
                <div key={title} className="reveal tupan-card" style={{ padding: "22px 18px" }}>
                  <i className={`fas ${icon}`} style={{ fontSize: "26px", color: "var(--green)", marginBottom: "12px", display: "block" }}></i>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--green)", fontFamily: "Space Grotesk", textTransform: "uppercase", marginBottom: "8px" }}>
                    {title}
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--gray-text)", lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: community SVG */}
          <div className="reveal" style={{ flex: "0 0 auto" }}>
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer circle */}
              <circle cx="140" cy="140" r="130" fill="rgba(172,210,66,0.04)" stroke="rgba(172,210,66,0.2)" strokeWidth="1" strokeDasharray="5 5"/>
              {/* Inner circles (people) */}
              <circle cx="140" cy="60"  r="22" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <circle cx="220" cy="110" r="22" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <circle cx="200" cy="200" r="22" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <circle cx="80"  cy="200" r="22" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <circle cx="60"  cy="110" r="22" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              {/* Person icons */}
              {[
                [140,52],[220,102],[200,192],[80,192],[60,102]
              ].map(([cx,cy],i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy-4} r="6" fill="rgba(172,210,66,0.6)"/>
                  <path d={`M${cx-9} ${cy+12} Q${cx} ${cy+5} ${cx+9} ${cy+12}`} stroke="rgba(172,210,66,0.6)" strokeWidth="2" fill="none"/>
                </g>
              ))}
              {/* Lines connecting them */}
              <line x1="140" y1="60"  x2="220" y2="110" stroke="rgba(172,210,66,0.2)" strokeWidth="1"/>
              <line x1="220" y1="110" x2="200" y2="200" stroke="rgba(172,210,66,0.2)" strokeWidth="1"/>
              <line x1="200" y1="200" x2="80"  y2="200" stroke="rgba(172,210,66,0.2)" strokeWidth="1"/>
              <line x1="80"  y1="200" x2="60"  y2="110" stroke="rgba(172,210,66,0.2)" strokeWidth="1"/>
              <line x1="60"  y1="110" x2="140" y2="60"  stroke="rgba(172,210,66,0.2)" strokeWidth="1"/>
              {/* Center logo */}
              <circle cx="140" cy="140" r="38" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <text x="140" y="136" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="700" fontFamily="Space Grotesk">TUPAN</text>
              <text x="140" y="150" textAnchor="middle" fill="#9aaa8e" fontSize="9"  fontFamily="DM Sans">Community</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
