import { useState } from "react";

const NftFallback = () => (
  <div style={{ background: "linear-gradient(135deg,#0d2a09,#061004)", borderRadius: 20, padding: 32, textAlign: "center", border: "1px solid var(--border-green)" }}>
    <svg viewBox="0 0 300 300" width="100%" fill="none">
      <rect width="300" height="300" rx="20" fill="url(#nftGrad2)"/>
      <circle cx="150" cy="110" r="55" fill="none" stroke="#acd242" strokeWidth="2"/>
      <text x="150" y="104" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="13" fill="#acd242" fontWeight="700">TUPAN</text>
      <text x="150" y="126" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="22" fill="#fff" fontWeight="800">NFT</text>
      <text x="150" y="200" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="14" fill="rgba(255,255,255,0.7)">#001 of 100</text>
      <text x="150" y="230" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="11" fill="rgba(172,210,66,0.8)">EXCLUSIVE COLLECTION</text>
      <rect x="70" y="248" width="160" height="30" rx="15" fill="#acd242" opacity="0.15" stroke="#acd242" strokeWidth="1"/>
      <text x="150" y="268" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="12" fill="#acd242" fontWeight="700">1 BNB — FIRST 10</text>
      <defs>
        <linearGradient id="nftGrad2" x1="0" y1="0" x2="300" y2="300">
          <stop offset="0%" stopColor="#0d2a09"/>
          <stop offset="100%" stopColor="#061004"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const NftSection = () => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <section style={{ background: "var(--bg-deep)", padding: "90px 0" }} id="nft">
      <div className="tupan-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "60px", alignItems: "center" }}>
          <div className="reveal" style={{ borderRadius: 20, overflow: "hidden" }}>
            {imgFailed ? <NftFallback /> : (
              <img
                src="https://tupan.io/wp-content/uploads/2024/11/Inserir-um-titulo-600-x-300-px.png"
                alt="NFT Tupan"
                onError={() => setImgFailed(true)}
                style={{ width: "100%", borderRadius: 20, display: "block" }}
              />
            )}
          </div>
          <div className="reveal">
            <p className="s-label">Coleção Exclusiva</p>
            <h2 className="s-title">Ganhe Renda Passiva com o NFT TUPAN!</h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, marginBottom: "28px", lineHeight: 1.75 }}>
              São 100 NFTs exclusivos da Tupan! Os primeiros 10 NFTs custarão 1 BNB. Não perca esta oportunidade e garanta o seu antes que acabe!
            </p>
            <div className="tupan-card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <i className="fas fa-bullseye" style={{ color: "var(--green)", fontSize: "18px", marginTop: "2px" }}></i>
                <div>
                  <h5 style={{ fontFamily: "Space Grotesk", fontWeight: 700, color: "var(--green)", marginBottom: "4px" }}>Não perca tempo!</h5>
                  <p style={{ fontSize: "14px", color: "var(--gray-text)", margin: 0, lineHeight: 1.65 }}>
                    Aproveite para adquirir seus tokens e garantir renda passiva de projetos sustentáveis ao redor do mundo.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "28px" }}>
              <a href="https://x-paysmart.com/dec_tct" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Comprar NFT Agora!</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NftSection;
