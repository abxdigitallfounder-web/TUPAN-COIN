const FAQS = [
  { code:"01", title:"O que é o Token TUPAN?", desc:"TUPAN é um Real World Asset (RWA) — um token digital lastreado 1:1 em floresta amazônica. Cada token representa 1 m² verificado por satélite e registrado on-chain via dMRV.", href:"https://tupan.io/whitepaper/" },
  { code:"02", title:"Como recebo os dividendos?", desc:"Os dividendos são distribuídos anualmente em USDC (Dólar digital) diretamente na sua carteira Web3. O pagamento é automatizado por smart contract, sem intermediários.", href:"https://tupan.io/f-a-q/" },
  { code:"03", title:"O contrato foi auditado?", desc:"Sim. O smart contract TUPAN foi auditado pela CertiK com score 98/100. Todos os relatórios de auditoria são públicos e rastreáveis on-chain na BNB Chain.", href:"https://tupan.io/whitepaper/" },
];

const FaqSection = () => (
  <section id="faq" style={{ background:"var(--t-surface)", padding:"90px 0" }}>
    <div className="tupan-container">
      <div className="reveal" style={{ marginBottom:40 }}>
        <span className="s-label">// DOCUMENTAÇÃO</span>
        <h2 className="s-title">Perguntas <span style={{ color:"var(--t-green)" }}>Frequentes</span></h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:1, background:"var(--t-border)", borderRadius:6, overflow:"hidden" }}>
        {FAQS.map(f => (
          <div key={f.code} className="reveal" style={{ background:"var(--t-bg)", padding:"28px 24px", transition:"background .2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--t-surface)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--t-bg)")}>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(0,255,157,0.4)", letterSpacing:2, marginBottom:10 }}>{f.code} ▶</p>
            <h5 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:14, color:"#fff", marginBottom:12, lineHeight:1.4 }}>{f.title}</h5>
            <div style={{ height:1, background:"var(--t-border)", marginBottom:12 }}/>
            <p style={{ fontSize:13, color:"var(--t-muted)", marginBottom:20, lineHeight:1.7 }}>{f.desc}</p>
            <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              VER DOCS →
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
