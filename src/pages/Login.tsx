import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoSite from "../assets/logo-site.png";

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
    // Simulate auth — replace with real API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lg-page {
          font-family: 'Space Grotesk', sans-serif;
          background: #050e03;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Topbar ── */
        .lg-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(163,224,0,0.1);
          background: rgba(5,14,3,0.96);
          backdrop-filter: blur(14px);
        }
        .lg-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .lg-logo-mark {
          width: 34px; height: 34px;
          background: linear-gradient(135deg,#A3E000,#5a8500);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 15px; color: #050e03;
        }
        .lg-logo-name { font-weight: 800; font-size: 17px; color: #A3E000; letter-spacing: -0.5px; }
        .lg-back {
          display: flex; align-items: center; gap: 6px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px;
          color: rgba(255,255,255,.35); text-decoration: none;
          transition: color .15s;
        }
        .lg-back:hover { color: #A3E000; }

        /* ── Layout ── */
        .lg-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px 60px;
          gap: 48px;
        }

        /* ── Plan summary sidebar ── */
        .lg-plan-sidebar {
          width: 260px; flex-shrink: 0;
          border-radius: 20px;
          border: 1px solid rgba(163,224,0,.18);
          background: rgba(163,224,0,.03);
          padding: 28px 24px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .lg-plan-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 8px;
          letter-spacing: 2px; color: rgba(163,224,0,.5);
          text-transform: uppercase; margin-bottom: 6px;
        }
        .lg-plan-name {
          font-family: 'Space Grotesk', sans-serif; font-size: 22px;
          font-weight: 800; color: #A3E000;
        }
        .lg-plan-price {
          font-family: 'IBM Plex Mono', monospace; font-size: 28px;
          font-weight: 700; color: #fff; line-height: 1; margin: 4px 0 16px;
        }
        .lg-plan-divider { height: 1px; background: rgba(163,224,0,.1); margin: 8px 0; }
        .lg-plan-row {
          display: flex; justify-content: space-between; align-items: center;
          font-family: 'IBM Plex Mono', monospace; font-size: 10px;
        }
        .lg-plan-row-key { color: rgba(255,255,255,.3); }
        .lg-plan-row-val { color: #fff; font-weight: 700; }
        .lg-plan-row-val.green { color: #A3E000; }

        /* ── Card ── */
        .lg-card {
          width: 100%; max-width: 420px;
          border-radius: 24px;
          border: 1px solid rgba(163,224,0,.18);
          background: #0a1608;
          box-shadow: 0 32px 80px rgba(0,0,0,.55), 0 0 60px rgba(163,224,0,.04);
          overflow: hidden;
          animation: lgSlideUp .25s ease;
        }
        @keyframes lgSlideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }

        /* ── Tabs ── */
        .lg-tabs {
          display: grid; grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid rgba(163,224,0,.1);
        }
        .lg-tab {
          padding: 16px; text-align: center; cursor: pointer;
          font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: .3px; border: none; background: transparent;
          color: rgba(255,255,255,.3); transition: color .15s, background .15s;
        }
        .lg-tab.active {
          color: #A3E000; background: rgba(163,224,0,.06);
          border-bottom: 2px solid #A3E000;
        }
        .lg-tab:not(.active):hover { color: rgba(255,255,255,.6); background: rgba(255,255,255,.02); }

        /* ── Form ── */
        .lg-form { padding: 32px 28px 36px; display: flex; flex-direction: column; gap: 18px; }
        .lg-field { display: flex; flex-direction: column; gap: 7px; }
        .lg-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          letter-spacing: 1.8px; color: rgba(163,224,0,.55); text-transform: uppercase;
        }
        .lg-input-wrap { position: relative; }
        .lg-input {
          width: 100%; background: rgba(255,255,255,.04);
          border: 1px solid rgba(163,224,0,.2); border-radius: 12px;
          padding: 13px 16px; font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; color: #fff; outline: none;
          transition: border-color .15s, background .15s;
        }
        .lg-input:focus { border-color: rgba(163,224,0,.55); background: rgba(163,224,0,.04); }
        .lg-input::placeholder { color: rgba(255,255,255,.2); }
        .lg-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: rgba(255,255,255,.3);
          cursor: pointer; font-size: 16px; padding: 0; line-height: 1;
          transition: color .15s;
        }
        .lg-eye:hover { color: rgba(163,224,0,.7); }
        .lg-input.has-eye { padding-right: 44px; }

        .lg-error {
          background: rgba(244,67,67,.08); border: 1px solid rgba(244,67,67,.25);
          border-radius: 10px; padding: 10px 14px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px;
          color: #f87171; letter-spacing: .3px;
        }

        .lg-submit {
          width: 100%; margin-top: 4px;
          background: linear-gradient(135deg,#A3E000,#7ab800);
          border: none; border-radius: 14px; padding: 16px;
          font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 800;
          color: #050e03; cursor: pointer; text-transform: uppercase; letter-spacing: .5px;
          box-shadow: 0 0 40px rgba(163,224,0,.25);
          transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .lg-submit:hover:not(:disabled) { background: linear-gradient(135deg,#c8e855,#9acc14); transform: translateY(-2px); box-shadow: 0 0 60px rgba(163,224,0,.45); }
        .lg-submit:active:not(:disabled) { transform: translateY(0); }
        .lg-submit:disabled { opacity: .6; cursor: not-allowed; }

        .lg-spinner {
          width: 16px; height: 16px; border: 2px solid rgba(5,14,3,.3);
          border-top-color: #050e03; border-radius: 50%;
          animation: lgSpin .7s linear infinite;
        }
        @keyframes lgSpin { to { transform: rotate(360deg); } }

        .lg-footer-text {
          text-align: center; font-family: 'IBM Plex Mono', monospace;
          font-size: 9px; color: rgba(255,255,255,.2); line-height: 1.7;
          margin-top: 6px;
        }

        @media(max-width:720px) {
          .lg-plan-sidebar { display: none; }
          .lg-body { padding: 24px 16px 48px; }
          .lg-form { padding: 24px 20px 28px; }
        }
      `}</style>

      <div className="lg-page">
        {/* Topbar */}
        <header className="lg-topbar">
          <a href="/" className="lg-logo">
            <img src={logoSite} alt="TUPAN" style={{ height: 34, width: "auto", display: "block" }} />
          </a>
          <a href="/transacao" className="lg-back">
            ← Voltar
          </a>
        </header>

        <div className="lg-body">
          {/* Plan sidebar (desktop only) */}
          {plan && (
            <div className="lg-plan-sidebar">
              <p className="lg-plan-eyebrow">Seu plano</p>
              <p className="lg-plan-name">{plan.label}</p>
              <p className="lg-plan-price">{fmt(plan.valor)}</p>
              <div className="lg-plan-divider" />
              <div className="lg-plan-row">
                <span className="lg-plan-row-key">Tokens</span>
                <span className="lg-plan-row-val">{plan.tokens.toLocaleString("pt-BR")} TUPAN</span>
              </div>
              <div className="lg-plan-row">
                <span className="lg-plan-row-key">Retorno em 14d</span>
                <span className="lg-plan-row-val green">+{plan.pct.toFixed(0)}%</span>
              </div>
              <div className="lg-plan-row">
                <span className="lg-plan-row-key">Ganho diário</span>
                <span className="lg-plan-row-val green">{fmt(plan.diario)}</span>
              </div>
              <div className="lg-plan-row">
                <span className="lg-plan-row-key">Total final</span>
                <span className="lg-plan-row-val">{fmt(plan.final)}</span>
              </div>
            </div>
          )}

          {/* Auth card */}
          <div className="lg-card">
            <div className="lg-tabs">
              <button
                className={`lg-tab${tab === "register" ? " active" : ""}`}
                onClick={() => { setTab("register"); setError(""); }}
              >
                Criar conta
              </button>
              <button
                className={`lg-tab${tab === "login" ? " active" : ""}`}
                onClick={() => { setTab("login"); setError(""); }}
              >
                Já tenho conta
              </button>
            </div>

            <form className="lg-form" onSubmit={handleSubmit} noValidate>
              {tab === "register" && (
                <div className="lg-field">
                  <label className="lg-label">Nome completo</label>
                  <input
                    className="lg-input"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="lg-field">
                <label className="lg-label">Senha</label>
                <div className="lg-input-wrap">
                  <input
                    className="lg-input has-eye"
                    type={showPass ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={tab === "register" ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    className="lg-eye"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {error && <p className="lg-error">{error}</p>}

              <button className="lg-submit" type="submit" disabled={loading}>
                {loading ? (
                  <><div className="lg-spinner" /> Aguarde...</>
                ) : tab === "register" ? (
                  "Criar conta e continuar"
                ) : (
                  "Entrar e continuar"
                )}
              </button>

              <p className="lg-footer-text">
                Seus dados são protegidos com criptografia de ponta a ponta.<br />
                Ao continuar você concorda com os termos de uso da TUPAN.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
