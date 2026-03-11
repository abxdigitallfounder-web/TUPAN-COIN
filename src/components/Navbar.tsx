import { useState, useEffect } from "react";

const navLinks = [
  { label: "Início",      href: "#hero" },
  { label: "Métricas",    href: "#dashboard" },
  { label: "Calculadora", href: "#calculadora" },
  { label: "Lastro",      href: "#mapa" },
  { label: "F.A.Q.",      href: "#faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    background: scrolled ? "rgba(10,17,13,0.97)" : "rgba(10,17,13,0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    transition: "background .3s",
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Top ticker bar */}
        <div style={{
          background: "rgba(0,255,157,0.04)",
          borderBottom: "1px solid rgba(0,255,157,0.08)",
          padding: "4px 0",
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex",
            gap: 0,
            animation: "ticker 40s linear infinite",
            width: "max-content",
          }}>
            {Array(3).fill(null).map((_, ri) => (
              <div key={ri} style={{ display: "flex", gap: 0 }}>
                {[
                  ["TUPAN/USDC","$10.00","+2.4%",true],
                  ["Carbon Credit Index","$142.80","+1.1%",true],
                  ["BNB/USD","$612.50","-0.3%",false],
                  ["BTC/USD","$97,420","+0.8%",true],
                  ["USDC/USD","$1.00","0.0%",true],
                  ["TVL Lastreado","$2.4M","+5.2%",true],
                ].map(([name,price,chg,up]) => (
                  <span key={String(name)} style={{
                    fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: 10,
                    padding: "0 24px",
                    color: "#8898aa",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                    whiteSpace: "nowrap",
                  }}>
                    <span style={{ color: "#c8d6e5", marginRight: 6 }}>{String(name)}</span>
                    <span style={{ marginRight: 4 }}>{String(price)}</span>
                    <span style={{ color: Boolean(up) ? "var(--t-green)" : "#ff4d6d" }}>{String(chg)}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main nav */}
          <div className="tupan-container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
          <a href="#hero" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          </a>

          <ul style={{ display:"flex", alignItems:"center", gap:28, listStyle:"none", margin:0, padding:0 }} className="hidden lg:flex">
            {navLinks.map(l => (
              <li key={l.label}>
                <a href={l.href} style={{
                  color:"#8898aa", fontFamily:"Inter,sans-serif", fontSize:13, fontWeight:500,
                  textDecoration:"none", transition:"color .2s, text-shadow .2s",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={e => { e.currentTarget.style.color="var(--t-green)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#8898aa"; }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display:"flex", alignItems:"center", gap:10 }} className="hidden lg:flex">
            <a href="https://x-paysmart.com/dec_tct" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              Whitepaper
            </a>
            <a href="/transacao" className="btn btn-solid btn-sm">
              ⬡ COMPRAR TUPAN
            </a>
          </div>

          <button className="lg:hidden" onClick={() => setMobileOpen(true)}
            style={{ background:"none", border:"1px solid rgba(163,224,0,0.3)", borderRadius:4, padding:"6px 10px", cursor:"pointer", display:"flex", flexDirection:"column", gap:4 }}>
            <span style={{ width:18, height:1.5, background:"var(--t-green)", display:"block" }}/>
            <span style={{ width:14, height:1.5, background:"var(--t-green)", display:"block" }}/>
            <span style={{ width:18, height:1.5, background:"var(--t-green)", display:"block" }}/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:99, background:"rgba(10,17,13,0.98)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position:"absolute", top:20, right:20, background:"none", border:"1px solid rgba(163,224,0,0.3)", borderRadius:4, color:"var(--t-green)", fontSize:18, width:36, height:36, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ color:"#c8d6e5", fontSize:22, fontFamily:"Space Grotesk,sans-serif", fontWeight:700, textDecoration:"none", textTransform:"uppercase", letterSpacing:2 }}
              onMouseEnter={e => (e.currentTarget.style.color="#00ff9d")}
              onMouseLeave={e => (e.currentTarget.style.color="#c8d6e5")}>
              {l.label}
            </a>
          ))}
          <a href="/transacao" className="btn btn-solid" style={{ marginTop:12 }}>⬡ COMPRAR TUPAN</a>
        </div>
      )}
    </>
  );
};

export default Navbar;
