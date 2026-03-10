const props = [
  { icon: "fa-leaf",        title: "+ Utilidade",    desc: "Com o $TCT, você tem acesso exclusivo a produtos e serviços ecológicos que estão em conformidade com as 17 ODS da ONU." },
  { icon: "fa-coins",       title: "+ Renda Passiva", desc: "Ganhe renda passiva através do NFT Tupan. Adquira o seu e escolha seu fluxo de renda passiva alinhado às 17 ODS da ONU." },
  { icon: "fa-vote-yea",   title: "+ Voz Ativa",     desc: "Com o $TCT, você participa ativamente das decisões e contribui para a governança do ecossistema Tupan." },
];

const ValueProps = () => (
  <section style={{ background: "var(--bg-canopy)", padding: "90px 0" }} id="what-is">
    <div className="tupan-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginBottom: "48px" }}>
        {/* Left text */}
        <div className="reveal" style={{ flex: "1 1 300px" }}>
          <p className="s-label">O que você recebe</p>
          <h2 className="s-title">BOM PARA O MUNDO,<br />BOM PARA O BOLSO</h2>
          <p className="s-sub">Venha fazer parte do ecossistema do $TCT!</p>
          <a href="https://tupan.io/what-is-tct/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Saiba mais</a>
        </div>

      </div>

      {/* Bordered grid */}
      <div className="reveal props-grid" style={{ border: "1px solid var(--border-green)", borderRadius: "16px", overflow: "hidden" }}>
        {props.map((p) => (
          <div key={p.title} className="prop-card">
            <div className="prop-icon">
              <i className={`fas ${p.icon}`} style={{ fontSize: "32px", color: "var(--green)" }}></i>
            </div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
