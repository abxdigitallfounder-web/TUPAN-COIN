const CommunitySection = () => (
  <section style={{ background: "var(--bg-canopy)", padding: "90px 0" }} id="community">
    <div className="tupan-container">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "60px", alignItems: "center" }}>
        {/* Left: green card */}
        <div className="reveal" style={{
          background: "#0a5200",
          border: "1px solid rgba(172,210,66,0.3)",
          borderRadius: "20px",
          padding: "48px 40px",
          textAlign: "center"
        }}>
          {/* Plant + coins SVG */}
          <svg viewBox="0 0 280 240" width="100%" fill="none">
            {/* Stem */}
            <line x1="140" y1="220" x2="140" y2="80" stroke="#acd242" strokeWidth="3" strokeLinecap="round"/>
            {/* Leaves */}
            <path d="M140 140 C120 120 100 130 105 150 C108 162 130 158 140 140 Z" fill="rgba(172,210,66,0.4)" stroke="#acd242" strokeWidth="1.5"/>
            <path d="M140 120 C160 100 180 110 175 130 C172 142 150 138 140 120 Z" fill="rgba(172,210,66,0.35)" stroke="#acd242" strokeWidth="1.5"/>
            <path d="M140 100 C125 80 108 88 112 105 C115 116 132 112 140 100 Z" fill="rgba(172,210,66,0.5)" stroke="#acd242" strokeWidth="1.5"/>
            {/* Top bloom */}
            <circle cx="140" cy="72" r="18" fill="rgba(172,210,66,0.25)" stroke="#acd242" strokeWidth="1.5"/>
            <circle cx="140" cy="72" r="8" fill="rgba(172,210,66,0.5)"/>
            {/* Coins falling */}
            <circle cx="90"  cy="55" r="16" fill="rgba(172,210,66,0.15)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
            <text x="90"  y="60" textAnchor="middle" fill="#acd242" fontSize="9" fontWeight="700" fontFamily="Space Grotesk">$TCT</text>
            <circle cx="192" cy="70" r="16" fill="rgba(172,210,66,0.15)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
            <text x="192" y="75" textAnchor="middle" fill="#acd242" fontSize="9" fontWeight="700" fontFamily="Space Grotesk">$TCT</text>
            <circle cx="70"  cy="90" r="11" fill="rgba(172,210,66,0.1)" stroke="rgba(172,210,66,0.4)" strokeWidth="1"/>
            {/* Ground */}
            <ellipse cx="140" cy="220" rx="45" ry="10" fill="rgba(172,210,66,0.15)" stroke="rgba(172,210,66,0.3)" strokeWidth="1"/>
          </svg>
        </div>

        {/* Right: text */}
        <div className="reveal">
          <p className="s-label">Junte-se a nós</p>
          <h2 className="s-title">Não Estamos Sozinhos!</h2>
          <p className="s-sub">
            Entre no nosso grupo do Telegram e contribua para o desenvolvimento de um mundo sustentável. Vamos trabalhar juntos para tornar o planeta um lugar melhor.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="https://t.me/TupanGlobal" target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              <i className="fab fa-telegram" style={{ marginRight: "8px" }}></i>Telegram
            </a>
            <a href="https://discord.gg/AKmdvqKkMz" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fab fa-discord" style={{ marginRight: "8px" }}></i>Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommunitySection;
