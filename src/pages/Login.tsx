import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoSite from "../assets/logo-site.png";
import foto1 from "../assets/FOTO1.jpg";

type Plan = {
  id: number; valor: number; pct: number; diario: number; final: number;
  tokens: number; label: string; badge: string | null; accent: string;
};

const fmt = (n: number) =>
  "R$\u00a0" + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan: Plan | undefined = (location.state as { plan?: Plan })?.plan;

  const [tab, setTab] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Preencha todos os campos."); return; }
    if (tab === "register" && !name.trim()) { setError("Informe seu nome."); return; }
    if (password.length < 6) { setError("A senha deve ter pelo menos 6 caracteres."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1200);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-root {
          font-family: 'Space Grotesk', sans-serif;
          min-height: 100dvh;
          display: flex;
          background: #080808;
          color: #fff;
        }

        /* ── Left panel ── */
        .lg-left {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 48px 48px;
          overflow: hidden;
        }
        .lg-left-bg {
          position: absolute; inset: 0;
          background-image: url(${foto1});
          background-size: cover; background-position: center;
          z-index: 0;
        }
        .lg-left-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(5,14,3,0.88) 100%);
        }
        .lg-left > * { position: relative; z-index: 2; }

        .lg-left-headline {
          margin-top: auto;
          padding-bottom: 0;
        }
        .lg-left-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; letter-spacing: 3px;
          color: rgba(163,224,0,0.6); text-transform: uppercase;
          margin-bottom: 16px; display: block;
        }
        .lg-left-title {
          font-size: clamp(28px, 3vw, 46px);
          font-weight: 800; letter-spacing: -1.5px;
          line-height: 1.1; color: #fff;
          margin-bottom: 16px;
        }
        .lg-left-title span { color: #A3E000; }
        .lg-left-sub {
          font-size: 14px; color: rgba(255,255,255,0.45);
          line-height: 1.65; max-width: 340px;
        }

        /* Plan pill */
        .lg-plan-pill {
          margin-top: 32px;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px;
          background: rgba(163,224,0,0.07);
          border: 1px solid rgba(163,224,0,0.2);
          border-radius: 999px;
        }
        .lg-plan-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #A3E000; flex-shrink: 0;
          box-shadow: 0 0 8px rgba(163,224,0,0.8);
        }
        .lg-plan-pill-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; color: rgba(163,224,0,0.8);
          letter-spacing: .5px;
        }
        .lg-plan-pill-val {
          font-size: 13px; font-weight: 700; color: #A3E000;
        }

        /* ── Right panel ── */
        .lg-right {
          width: 460px; flex-shrink: 0;
          display: flex; flex-direction: column;
          background: #0d0d0d;
          border-left: 1px solid rgba(255,255,255,0.06);
        }

        /* Top bar inside right panel */
        .lg-right-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }
        .lg-back-btn {
          display: flex; align-items: center; gap: 6px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px;
          color: rgba(255,255,255,0.3); text-decoration: none;
          transition: color .15s;
        }
        .lg-back-btn:hover { color: rgba(163,224,0,0.8); }

        /* Form area */
        .lg-form-area {
          flex: 1; display: flex; flex-direction: column;
          justify-content: center;
          padding: 48px 40px 40px;
          overflow-y: auto;
        }

        /* Title */
        .lg-form-title {
          font-size: 26px; font-weight: 700; letter-spacing: -.03em;
          color: #fff; margin-bottom: 6px;
        }
        .lg-form-sub {
          font-size: 13px; color: rgba(255,255,255,0.35);
          margin-bottom: 36px; line-height: 1.5;
        }

        /* Tab switcher pill */
        .lg-switcher {
          display: flex; background: rgba(255,255,255,0.05);
          border-radius: 12px; padding: 4px; gap: 2px; margin-bottom: 32px;
        }
        .lg-sw-btn {
          flex: 1; padding: 9px; border-radius: 9px; border: none; cursor: pointer;
          font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600;
          transition: all .2s; color: rgba(255,255,255,0.4); background: transparent;
          letter-spacing: -.01em;
        }
        .lg-sw-btn.active {
          background: #A3E000; color: #050e03;
          box-shadow: 0 2px 12px rgba(163,224,0,0.25);
        }

        /* Fields */
        .lg-fields { display: flex; flex-direction: column; gap: 16px; }
        .lg-field { display: flex; flex-direction: column; gap: 6px; }
        .lg-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .lg-input-wrap { position: relative; }
        .lg-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 18px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; color: #fff; outline: none;
          transition: border-color .2s, background .2s;
          -webkit-appearance: none;
        }
        .lg-input:focus {
          border-color: rgba(163,224,0,0.5);
          background: rgba(163,224,0,0.03);
        }
        .lg-input::placeholder { color: rgba(255,255,255,0.18); }
        .lg-input.has-icon { padding-right: 50px; }
        .lg-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; padding: 4px;
          color: rgba(255,255,255,0.25); transition: color .15s; line-height: 1;
          font-size: 15px;
        }
        .lg-eye:hover { color: rgba(163,224,0,0.7); }

        /* Error */
        .lg-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(244,67,67,0.07);
          border: 1px solid rgba(244,67,67,0.2);
          border-radius: 10px; padding: 11px 14px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; color: #f87171;
        }

        /* Submit */
        .lg-cta {
          margin-top: 8px; width: 100%;
          background: #A3E000; color: #050e03;
          border: none; border-radius: 14px;
          padding: 16px; cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 800;
          letter-spacing: -.01em;
          transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 0 0 0 rgba(163,224,0,0);
        }
        .lg-cta:hover:not(:disabled) {
          background: #bef03a;
          box-shadow: 0 0 40px rgba(163,224,0,0.3);
          transform: translateY(-1px);
        }
        .lg-cta:active:not(:disabled) { transform: translateY(0); }
        .lg-cta:disabled { opacity: .55; cursor: not-allowed; }

        .lg-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(5,14,3,0.3);
          border-top-color: #050e03; border-radius: 50%;
          animation: lgSpin .65s linear infinite;
          flex-shrink: 0;
        }
        @keyframes lgSpin { to { transform: rotate(360deg); } }

        /* Footer note */
        .lg-note {
          text-align: center;
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          color: rgba(255,255,255,0.18); line-height: 1.8; margin-top: 20px;
        }

        .lg-divider {
          display: flex; align-items: center; gap: 12px; margin: 4px 0;
        }
        .lg-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .lg-divider-text {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          color: rgba(255,255,255,0.2); letter-spacing: 1px; text-transform: uppercase;
        }

        /* Responsive */
        @media(max-width: 860px) {
          .lg-left { display: none; }
          .lg-right { width: 100%; border-left: none; }
          .lg-form-area { padding: 36px 28px 36px; justify-content: flex-start; padding-top: 24px; }
          .lg-right-header { padding: 20px 28px; }
        }
      `}</style>

      <div className="lg-root">

        {/* ── LEFT: Brand panel ── */}
        <div className="lg-left">
          <div className="lg-left-bg" />
          <div className="lg-left-overlay" />

          {/* Logo top-left */}
          <a href="/" style={{ textDecoration: "none" }}>
            <img src={logoSite} alt="TUPAN" style={{ height: 32, width: "auto", display: "block" }} />
          </a>

          {/* Headline bottom-left */}
          <div className="lg-left-headline">
            <span className="lg-left-eyebrow">Amazônia · Créditos de Carbono · RWA</span>
            <h1 className="lg-left-title">
              Seu dinheiro plantando<br />
              <span>árvores reais.</span>
            </h1>
            <p className="lg-left-sub">
              Cada token TUPAN tem lastro em uma árvore certificada da floresta Amazônica, gerando créditos de carbono e retorno financeiro.
            </p>

            {plan && (
              <div className="lg-plan-pill">
                <div className="lg-plan-pill-dot" />
                <span className="lg-plan-pill-text">Plano selecionado</span>
                <span className="lg-plan-pill-val">{plan.label} · {fmt(plan.valor)}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Auth panel ── */}
        <div className="lg-right">
          {/* Top bar */}
          <div className="lg-right-header">
            <img src={logoSite} alt="TUPAN" style={{ height: 28, display: "block" }} className="lg-mobile-logo" />
            <a href="/transacao" className="lg-back-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar
            </a>
          </div>

          {/* Form */}
          <div className="lg-form-area">
            <h2 className="lg-form-title">
              {tab === "register" ? "Criar sua conta" : "Bem-vindo de volta"}
            </h2>
            <p className="lg-form-sub">
              {tab === "register"
                ? "Crie sua conta gratuita e comece a investir agora."
                : "Entre na sua conta para acessar seu painel."}
            </p>

            {/* Tab switcher */}
            <div className="lg-switcher">
              <button
                className={`lg-sw-btn${tab === "register" ? " active" : ""}`}
                onClick={() => { setTab("register"); setError(""); }}
              >
                Criar conta
              </button>
              <button
                className={`lg-sw-btn${tab === "login" ? " active" : ""}`}
                onClick={() => { setTab("login"); setError(""); }}
              >
                Já tenho conta
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="lg-fields">
                {tab === "register" && (
                  <div className="lg-field">
                    <label className="lg-label">Nome completo</label>
                    <input
                      className="lg-input"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                )}

                <div className="lg-field">
                  <label className="lg-label">E-mail</label>
                  <input
                    className="lg-input"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className="lg-field">
                  <label className="lg-label">Senha</label>
                  <div className="lg-input-wrap">
                    <input
                      className="lg-input has-icon"
                      type={showPass ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete={tab === "register" ? "new-password" : "current-password"}
                    />
                    <button type="button" className="lg-eye" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                      {showPass ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="lg-error">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="7" cy="7" r="6" stroke="#f87171" strokeWidth="1.2"/>
                      <path d="M7 4v3.5" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
                      <circle cx="7" cy="10" r=".6" fill="#f87171"/>
                    </svg>
                    {error}
                  </div>
                )}

                <button className="lg-cta" type="submit" disabled={loading} style={{ marginTop: 8 }}>
                  {loading ? (
                    <><div className="lg-spinner" /> Aguarde...</>
                  ) : tab === "register" ? "Criar conta" : "Entrar"}
                </button>
              </div>

              <p className="lg-note">
                Protegido com criptografia de ponta a ponta.<br />
                Ao continuar você concorda com os <u>Termos de Uso</u> da TUPAN.
              </p>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}
