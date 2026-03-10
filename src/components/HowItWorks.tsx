const ITEMS = [
  { code:"01", title:"ADQUIRA O TOKEN", desc:"Conecte sua carteira Web3 (MetaMask, Trust Wallet) e adquira TUPAN durante a pré-venda. Cada 1 TUPAN = 1 m² de floresta amazônica certificada." },
  { code:"02", title:"ATIVO LASTREADO", desc:"Seu token é vinculado a um ID único dMRV na blockchain. Satélites verificam que o ativo biológico existe e cresce conforme projetado." },
  { code:"03", title:"CARBONO GERADO", desc:"A floresta absorve CO₂ e gera Créditos de Carbono certificados pelo padrão VCS/Verra e Gold Standard, os maiores do mundo." },
  { code:"04", title:"VENDA GLOBAL", desc:"Os créditos são negociados no mercado voluntário de carbono com empresas Fortune 500, fundos ESG e governos em busca de compensação." },
  { code:"05", title:"DIVIDENDOS EM USDC", desc:"A receita da venda dos créditos é distribuída aos detentores de TUPAN na forma de dividendos anuais em USDC — stablecoin lastreada no Dólar." },
  { code:"06", title:"VALORIZAÇÃO", desc:"Com a demanda crescente por créditos de carbono e expansão do lastro florestal, o token TUPAN aprecia em valor ao longo do tempo." },
];

const HowItWorks = () => (
  <section id="how" style={{ background:"var(--t-bg)", padding:"90px 0" }}>
    <div className="tupan-container">
      <div className="reveal" style={{ marginBottom:40 }}>
        <span className="s-label">// INVESTMENT FLOW</span>
        <h2 className="s-title">Como o Protocolo <span style={{ color:"var(--t-green)" }}>TUPAN</span> Funciona</h2>
        <p className="s-sub">Do investimento ao rendimento em USDC — um ciclo sustentável e verificável on-chain.</p>
      </div>

      <div className="reveal how-grid">
        {ITEMS.map(item => (
          <div key={item.code} className="how-item">
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(0,255,157,0.4)", flexShrink:0, marginTop:2, letterSpacing:1 }}>{item.code}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal how-cta-strip">
        <div>
          <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700, color:"var(--t-green)", fontSize:17, marginBottom:5 }}>
            Retornos Expressivos com Ativo Real.
          </h3>
          <p style={{ color:"var(--t-muted)", fontSize:13, margin:0 }}>Leia o Whitepaper completo com todos os detalhes técnicos e financeiros.</p>
        </div>
        <a href="https://tupan.io/whitepaper/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          Ler Whitepaper →
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;
