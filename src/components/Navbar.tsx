import { useState } from "react";
import logoSite from "../assets/logo-site.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "#0a110a",
        borderBottom: "1px solid rgba(163,224,0,0.1)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", height: 62,
        }}>

          {/* Logo esquerda */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src={logoSite} alt="TUPAN" style={{ height: 36, width: "auto", display: "block" }} />
          </a>

          {/* Botão Entrar — direita */}
          <a
            href="/login"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, fontWeight: 700,
              color: "#A3E000",
              background: "rgba(163,224,0,0.08)",
              border: "1px solid rgba(163,224,0,0.3)",
              borderRadius: 10,
              padding: "9px 24px",
              textDecoration: "none",
              letterSpacing: 0.4,
              transition: "background .18s, border-color .18s, box-shadow .18s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(163,224,0,0.16)";
              el.style.borderColor = "rgba(163,224,0,0.55)";
              el.style.boxShadow = "0 0 20px rgba(163,224,0,0.2)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(163,224,0,0.08)";
              el.style.borderColor = "rgba(163,224,0,0.3)";
              el.style.boxShadow = "none";
            }}
          >
            Entrar
          </a>

        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(8,14,8,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "none", border: "1px solid rgba(163,224,0,0.3)",
              borderRadius: 8, color: "#A3E000", fontSize: 20,
              width: 38, height: 38, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
          <a href="/login" onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22,
              color: "#A3E000", textDecoration: "none",
            }}>
            Entrar
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;

