
const SOCIALS = [
  { icon:"fab fa-x-twitter",  href:"https://twitter.com/tupan_io",                          title:"Twitter/X" },
  { icon:"fab fa-telegram",   href:"https://t.me/TupanGlobal",                              title:"Telegram" },
  { icon:"fab fa-discord",    href:"https://discord.gg/AKmdvqKkMz",                         title:"Discord" },
  { icon:"fab fa-linkedin-in",href:"https://www.linkedin.com/company/tupan-token",          title:"LinkedIn" },
  { icon:"fab fa-youtube",    href:"https://www.youtube.com/channel/UCbnFmHUfwe038nv3WFJyOxQ",title:"YouTube" },
];

const LINKS = [
  { label:"Whitepaper",    href:"https://tupan.io/whitepaper/" },
  { label:"Tokenomics",    href:"#dashboard" },
  { label:"F.A.Q.",        href:"#faq" },
  { label:"Auditoria",     href:"https://tupan.io/whitepaper/" },
  { label:"Contato",       href:"https://tupan.io" },
];

const Footer = () => (
  <footer style={{ background:"var(--t-surface)", borderTop:"1px solid var(--t-border)", padding:"36px 0" }}>
    <div className="tupan-container">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:24, marginBottom:28 }}>
        {/* Brand */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          </div>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.4)", lineHeight:1.7, maxWidth:220 }}>
            Real World Asset lastreado em floresta amazônica. Dividendos anuais em USDC.
          </p>
        </div>

        {/* Links */}
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"rgba(136,152,170,0.5)", textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color="var(--t-green)")}
              onMouseLeave={e => (e.currentTarget.style.color="rgba(136,152,170,0.5)")}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div style={{ display:"flex", gap:8 }}>
          {SOCIALS.map(s => (
            <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
              style={{ width:32, height:32, borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid var(--t-border)", color:"rgba(136,152,170,0.5)", textDecoration:"none", fontSize:12, transition:"all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--t-green)"; e.currentTarget.style.color="var(--t-green)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--t-border)"; e.currentTarget.style.color="rgba(136,152,170,0.5)"; }}>
              <i className={s.icon}/>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:"1px solid var(--t-border)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.3)", letterSpacing:0.5 }}>
          © 2026 TUPAN PROTOCOL — TODOS OS DIREITOS RESERVADOS
        </p>
        <div style={{ display:"flex", gap:16 }}>
          {["Termos de Uso","Política de Privacidade","Aviso de Risco"].map(t => (
            <span key={t} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.25)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
