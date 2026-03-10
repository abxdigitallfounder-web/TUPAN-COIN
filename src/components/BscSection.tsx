import { useState } from "react";

const CONTRACT = "0x5F61fC2302de5b5A7f5aDF9741317178D9Bcbc90";

const BscSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{ background: "var(--bg-canopy)", padding: "70px 0", textAlign: "center" }} id="bsc">
      <div className="tupan-container">
        <p className="s-label reveal" style={{ textAlign: "center" }}>Blockchain</p>
        <h2 className="s-title reveal" style={{ textAlign: "center" }}>Encontre o Tupan na Rede BSC!</h2>
        <p className="reveal" style={{ color: "var(--gray-text)", fontSize: "16px", maxWidth: "600px", margin: "0 auto 28px", lineHeight: 1.75 }}>
          O $TCT foi lançado na rede Binance Smart Chain, disponível para negociação na PancakeSwap e em diversas corretoras ao redor do mundo.
        </p>

        <div className="reveal" style={{
          display: "inline-flex", alignItems: "center", gap: "12px",
          background: "var(--card-bg)", border: "1px solid var(--border-green)",
          borderRadius: "12px", padding: "16px 24px", flexWrap: "wrap", justifyContent: "center"
        }}>
          <code style={{ fontSize: "13px", color: "var(--green)", wordBreak: "break-all" }}>{CONTRACT}</code>
          <button onClick={handleCopy}
            style={{ background: "var(--green)", color: "var(--dark-green)", border: "none", borderRadius: "8px", padding: "8px 16px", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        <p className="reveal" style={{ color: "var(--gray-text)", fontSize: 13, marginTop: 12 }}>
          <a href="https://bscscan.com/token/0x5f61fc2302de5b5a7f5adf9741317178d9bcbc90#balances"
             target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>Ver no BSCScan ↗</a>
        </p>
      </div>
    </section>
  );
};

export default BscSection;
