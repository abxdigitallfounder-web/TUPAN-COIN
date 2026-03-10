const EcosystemSection = () => {
  return (
    <section id="ecosystem" style={{ background: "var(--bg-canopy)", padding: "90px 0" }}>
      <div className="tupan-container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="s-label">Ecossistema</p>
          <h2 className="s-title" style={{ textAlign: "center" }}>O ECOSSISTEMA TUPAN</h2>
          <p className="s-sub" style={{ margin: "0 auto" }}>
            O token $TCT está no centro de um ecossistema completo que conecta tecnologia, natureza e impacto social.
          </p>
        </div>

        {/* Bubble diagram */}
        <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
          {/* position: relative wrapper so the coin image can be placed absolutely over the SVG */}
          <div style={{ position: "relative", display: "inline-block" }}>
          <svg width="620" height="420" viewBox="0 0 620 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lines from center */}
            <line x1="310" y1="210" x2="310" y2="70"  stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="310" y2="350" stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="100" y2="140" stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="520" y2="140" stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="100" y2="280" stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="520" y2="280" stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="180" y2="60"  stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>
            <line x1="310" y1="210" x2="440" y2="60"  stroke="rgba(172,210,66,0.25)" strokeWidth="1.5"/>

            {/* Center bubble */}
            <circle cx="310" cy="210" r="72" fill="rgba(172,210,66,0.12)" stroke="rgba(172,210,66,0.6)" strokeWidth="1.5"/>
            <text x="310" y="202" textAnchor="middle" fill="#acd242" fontSize="13" fontWeight="700" fontFamily="Space Grotesk">TUPAN</text>
            <text x="310" y="219" textAnchor="middle" fill="#acd242" fontSize="13" fontWeight="700" fontFamily="Space Grotesk">AUGREEN</text>
            <text x="310" y="234" textAnchor="middle" fill="#9aaa8e" fontSize="10" fontFamily="DM Sans">$TCT</text>

            {/* Satellite bubbles */}
            {/* Top */}
            <circle cx="310" cy="58" r="42" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="310" y="54" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="600" fontFamily="Space Grotesk">EDUCATION</text>
            <text x="310" y="68" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Educação</text>

            {/* Bottom */}
            <circle cx="310" cy="362" r="42" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="310" y="358" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="600" fontFamily="Space Grotesk">WATER</text>
            <text x="310" y="372" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Água</text>

            {/* Left top */}
            <circle cx="92" cy="135" r="40" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="92" y="131" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="600" fontFamily="Space Grotesk">HEALTH</text>
            <text x="92" y="145" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Saúde</text>

            {/* Right top */}
            <circle cx="528" cy="135" r="40" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="528" y="131" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="600" fontFamily="Space Grotesk">ENERGY</text>
            <text x="528" y="145" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Energia</text>

            {/* Left bottom */}
            <circle cx="92" cy="285" r="40" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="92" y="281" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="600" fontFamily="Space Grotesk">FOOD</text>
            <text x="92" y="295" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Alimento</text>

            {/* Right bottom */}
            <circle cx="528" cy="285" r="40" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="528" y="276" textAnchor="middle" fill="#acd242" fontSize="10" fontWeight="600" fontFamily="Space Grotesk">TECHNOLOGY</text>
            <text x="528" y="291" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Tecnologia</text>

            {/* Upper-left */}
            <circle cx="178" cy="55" r="36" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="178" y="51" textAnchor="middle" fill="#acd242" fontSize="10" fontWeight="600" fontFamily="Space Grotesk">M10 TOKEN</text>
            <text x="178" y="65" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">Crédito</text>

            {/* Upper-right */}
            <circle cx="442" cy="55" r="36" fill="rgba(172,210,66,0.07)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
            <text x="442" y="51" textAnchor="middle" fill="#acd242" fontSize="11" fontWeight="600" fontFamily="Space Grotesk">CARBON</text>
            <text x="442" y="65" textAnchor="middle" fill="#9aaa8e" fontSize="9" fontFamily="DM Sans">CRÉDITO</text>
          </svg>

          {/* Coin image — overlaid on the green center circle (cx=310, cy=210, r=72)
              Size: 130 px, shifted 14 px below center so it sits lower inside the circle */}
          <img
            src="https://tupan.io/wp-content/uploads/2023/10/coin-tupan-tct-1920w.webp"
            alt="Tupan $TCT coin"
            style={{
              position: "absolute",
              width: "130px",
              height: "130px",
              objectFit: "contain",
              left: "245px",   /* 310 - 130/2 */
              top: "159px",    /* 210 + 14 - 130/2 */
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          </div>
        </div>

        {/* Tech card */}
        <div className="reveal tupan-card" style={{ padding: "36px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "20px" }}>
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Drone SVG */}
              <rect x="20" y="26" width="40" height="8" rx="4" fill="rgba(172,210,66,0.15)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <circle cx="12" cy="22" r="8" fill="none" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <circle cx="68" cy="22" r="8" fill="none" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <circle cx="12" cy="38" r="8" fill="none" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <circle cx="68" cy="38" r="8" fill="none" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <line x1="20" y1="28" x2="12" y2="22" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <line x1="60" y1="28" x2="68" y2="22" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <line x1="20" y1="32" x2="12" y2="38" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <line x1="60" y1="32" x2="68" y2="38" stroke="rgba(172,210,66,0.4)" strokeWidth="1.5"/>
              <circle cx="40" cy="30" r="5" fill="rgba(172,210,66,0.3)" stroke="#acd242" strokeWidth="1.5"/>
            </svg>
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--green)", fontFamily: "Space Grotesk", textTransform: "uppercase", marginBottom: "8px" }}>
            TUPAN DRONE · TUPAN STARS
          </h3>
          <p style={{ color: "var(--gray-text)", fontSize: "14px", lineHeight: 1.7 }}>
            Tecnologia de ponta a serviço do meio ambiente. Monitoramento aéreo e georeferenciamento satelital integrados ao ecossistema $TCT para rastreamento de áreas preservadas.
          </p>
          <div style={{ marginTop: "20px" }}>
            <a href="https://tupan.io/ecosystem/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Explorar Ecossistema
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
