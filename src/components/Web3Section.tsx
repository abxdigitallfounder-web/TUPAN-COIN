const Web3Section = () => {
  return (
    <section id="tokenomics" style={{ background: "var(--bg-deep)", padding: "90px 0" }}>
      <div className="tupan-container">
        <div style={{ display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" }}>
          {/* Globe SVG */}
          <div className="reveal" style={{ flex: "0 0 auto" }}>
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Globe circle */}
              <circle cx="150" cy="150" r="120" fill="rgba(172,210,66,0.04)" stroke="rgba(172,210,66,0.3)" strokeWidth="1.5"/>
              {/* Latitude lines */}
              <ellipse cx="150" cy="150" rx="120" ry="40" fill="none" stroke="rgba(172,210,66,0.15)" strokeWidth="1"/>
              <ellipse cx="150" cy="150" rx="120" ry="80" fill="none" stroke="rgba(172,210,66,0.15)" strokeWidth="1"/>
              <ellipse cx="150" cy="150" rx="90"  ry="120" fill="none" stroke="rgba(172,210,66,0.15)" strokeWidth="1"/>
              <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(172,210,66,0.15)" strokeWidth="1"/>
              {/* Continents placeholder */}
              <path d="M120 120 Q130 110 150 115 Q165 108 175 120 Q180 130 170 140 Q160 148 148 145 Q135 142 125 135 Z"
                fill="rgba(172,210,66,0.18)" stroke="rgba(172,210,66,0.4)" strokeWidth="1"/>
              <path d="M155 155 Q165 148 175 155 Q182 163 176 170 Q168 176 158 172 Q150 165 155 155 Z"
                fill="rgba(172,210,66,0.18)" stroke="rgba(172,210,66,0.4)" strokeWidth="1"/>
              <path d="M100 165 Q112 158 122 165 Q128 175 120 182 Q110 186 102 178 Z"
                fill="rgba(172,210,66,0.18)" stroke="rgba(172,210,66,0.4)" strokeWidth="1"/>
              {/* Coins floating */}
              <circle cx="215" cy="100" r="18" fill="rgba(172,210,66,0.12)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <text x="215" y="105" textAnchor="middle" fill="#acd242" fontSize="10" fontWeight="700" fontFamily="Space Grotesk">$TCT</text>
              <circle cx="75"  cy="180" r="14" fill="rgba(172,210,66,0.12)" stroke="rgba(172,210,66,0.5)" strokeWidth="1.5"/>
              <text x="75"  y="185" textAnchor="middle" fill="#acd242" fontSize="8"  fontWeight="700" fontFamily="Space Grotesk">BSC</text>
              {/* Outer ring dashes */}
              <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(172,210,66,0.1)" strokeWidth="1" strokeDasharray="6 6"/>
            </svg>
          </div>

          {/* Content */}
          <div className="reveal" style={{ flex: "1 1 300px" }}>
            <p className="s-label">Web3 · Blockchain</p>
            <h2 className="s-title">TUPAN WEB 3</h2>
            <p className="s-sub">
              O token $TCT é emitido na Binance Smart Chain (BSC) e negociado na PancakeSwap, garantindo transparência, segurança e acessibilidade global para investidores que acreditam no futuro verde.
            </p>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "32px" }}>
              {[
                { icon: "fa-link",        text: "Binance Smart Chain — rede rápida e de baixo custo" },
                { icon: "fa-exchange-alt",text: "PancakeSwap — liquidez descentralizada" },
                { icon: "fa-shield-alt",  text: "Contrato auditado e verificado na BSCScan" },
                { icon: "fa-leaf",        text: "Cada token representa impacto ambiental real" },
              ].map(({ icon, text }) => (
                <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px", color: "var(--gray-text)", fontSize: "14px" }}>
                  <i className={`fas ${icon}`} style={{ color: "var(--green)", marginTop: "2px", width: "16px", flexShrink: 0 }}></i>
                  {text}
                </li>
              ))}
            </ul>
            <a href="https://pancakeswap.finance/swap?outputCurrency=0xb987D48Ed8f2C468D52D6405624EADBa855f841e"
               target="_blank" rel="noopener noreferrer"
               className="btn btn-outline btn-full" style={{ display: "block", textAlign: "center" }}>
              PRÉ-VENDA
            </a>
          </div>
        </div>

        {/* CTA box */}
        <div className="reveal" style={{
          marginTop: "48px",
          background: "rgba(172,210,66,0.06)",
          border: "1px solid rgba(172,210,66,0.2)",
          borderRadius: "14px",
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          <div>
            <p style={{ color: "var(--green)", fontWeight: 700, fontFamily: "Space Grotesk", fontSize: "17px", marginBottom: "4px" }}>
              Não perca tempo!
            </p>
            <p style={{ color: "var(--gray-text)", fontSize: "14px" }}>
              Os compradores antecipados terão acesso a benefícios exclusivos. Adquira seu $TCT agora.
            </p>
          </div>
          <a href="https://pancakeswap.finance/swap?outputCurrency=0xb987D48Ed8f2C468D52D6405624EADBa855f841e"
             target="_blank" rel="noopener noreferrer"
             className="btn btn-solid">
            COMPRAR AGORA
          </a>
        </div>
      </div>
    </section>
  );
};

export default Web3Section;
