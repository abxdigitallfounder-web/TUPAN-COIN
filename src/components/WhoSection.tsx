const row1 = [
  { icon: "fa-user",           title: "Pessoas Físicas",          desc: "Seja um membro ativo e ajude a moldar a Comunidade Tupan participando do seu crescimento acelerado.",         href: "https://x-paysmart.com/dec_tct", external: true,  link: "Participar" },
  { icon: "fa-building",       title: "Empresas",                 desc: "Para organizações genuinamente comprometidas em fazer a diferença positiva na sustentabilidade.",                href: "#contact",               external: false, link: "Engajar empresa" },
  { icon: "fa-paint-brush",    title: "Projetos",                 desc: "Você tem uma startup ou ONG planejando algo para construir um futuro melhor?",                                href: "#contact",               external: false, link: "Engajar projeto" },
];
const row2 = [
  { icon: "fa-handshake",      title: "Programa de Afiliados",    desc: "Aprenda a expandir seu projeto pelo mundo e ganhe conosco!",                                                  href: "#contact",               external: false, link: "Juntar-se" },
  { icon: "fa-flag-checkered", title: "Investidores Estratégicos", desc: "Invista no Tupan Token e faça parte da mudança!",                                                            href: "https://x-paysmart.com/dec_tct", external: true,  link: "Participar" },
];

const Card = ({ icon, title, desc, href, external, link }: typeof row1[0]) => (
  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
     className="who-card" style={{ textDecoration: "none", display: "block" }}>
    <div className="who-icon"><i className={`fas ${icon}`}></i></div>
    <h4>{title}</h4>
    <p>{desc}</p>
    <span className="btn btn-outline btn-sm">{link} »</span>
  </a>
);

const WhoSection = () => (
  <section style={{ background: "var(--bg-deep)", padding: "90px 0" }} id="who">
    <div className="tupan-container">
      <div className="reveal" style={{ marginBottom: "8px" }}>
        <p className="s-label">Participe</p>
        <h2 className="s-title">Venha fazer parte do Ecossistema $TCT!</h2>
      </div>
      <div className="reveal who-grid">
        {row1.map(c => <Card key={c.title} {...c} />)}
      </div>
      <div className="reveal who-row2">
        {row2.map(c => <Card key={c.title} {...c} />)}
      </div>
    </div>
  </section>
);

export default WhoSection;
