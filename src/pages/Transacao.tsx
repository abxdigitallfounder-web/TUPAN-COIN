import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Constants ────────────────────────────────────────────────────────────────
const PIX_CHAVE =
  "00020126580014BR.GOV.BCB.PIX0136tupan@tupan.io5204000053039865802BR5913TUPAN PROTOCOL6009SAO PAULO62070503***6304";
const PIX_KEY = "tupan@tupan.io";

// ── Plans ────────────────────────────────────────────────────────────────────
const PLANS = [
  { id: 0, valor: 60,   pct: 30.00, diario: 1.28,  final: 78,   tokens: 300,   label: "Starter",  badge: null as string | null,            accent: "#6ee7b7" },
  { id: 1, valor: 110,  pct: 31.81, diario: 2.50,  final: 145,  tokens: 550,   label: "Bronze",   badge: null as string | null,            accent: "#9acc14" },
  { id: 2, valor: 280,  pct: 32.14, diario: 6.42,  final: 370,  tokens: 1400,  label: "Prata",    badge: null as string | null,            accent: "#9acc14" },
  { id: 3, valor: 600,  pct: 40.00, diario: 17.14, final: 840,  tokens: 3000,  label: "Ouro",     badge: "MAIS POPULAR" as string | null,  accent: "#A3E000" },
  { id: 4, valor: 900,  pct: 41.11, diario: 26.42, final: 1270, tokens: 4500,  label: "Platina",  badge: "RECOMENDADO" as string | null,   accent: "#fbbf24" },
  { id: 5, valor: 1400, pct: 42.00, diario: 42.00, final: 1988, tokens: 7000,  label: "Diamante", badge: null as string | null,            accent: "#60a5fa" },
  { id: 6, valor: 2100, pct: 49.00, diario: 73.50, final: 3129, tokens: 10500, label: "Elite",    badge: "MAIOR RETORNO" as string | null, accent: "#f472b6" },
];

const SOCIAL_PROOF = [
  "🌿 João (SP) adquiriu 3.000 TUPAN há 2 min",
  "🌿 Maria (RJ) adquiriu 550 TUPAN há 5 min",
  "🌿 Carlos (MG) adquiriu 10.500 TUPAN há 8 min",
  "🌿 Ana (PR) adquiriu 1.400 TUPAN há 11 min",
  "🌿 Pedro (BA) adquiriu 4.500 TUPAN há 15 min",
  "🌿 Luiza (RS) adquiriu 7.000 TUPAN há 19 min",
];

const fmt = (n: number) =>
  "R$\u00a0" + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── QR Code SVG ──────────────────────────────────────────────────────────────
const PixQrCode = ({ size = 200 }: { size?: number }) => {
  const cells = [
    "111111101001011011101111111","100000100110100000101000001","101110101000011010101011101",
    "101110100100001110101011101","101110101001101001101011101","100000100011010011001000001",
    "111111101010101010101111111","000000001101010100100000000","110101110010100101011010110",
    "001011011001011010100110011","101110100101110010001001010","010100010010001101000101100",
    "011111110100101001100101001","001100001010100110111001100","110011111000110101011100111",
    "001010001001000010001010010","100001110110101010111000101","000000001011010101010000000",
    "111111101100110110001111111","100000100101001000101000001","101110101001010011001011101",
    "101110100110100100101011101","101110101010011010001011101","100000100101100110001000001",
    "111111101011001001001111111",
  ];
  const n = cells[0].length;
  const cell = Math.floor(size / n);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="#fff" />
      {cells.map((row, r) =>
        row.split("").map((v, c) =>
          v === "1" ? (
            <rect key={`${r}_${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111" />
          ) : null
        )
      )}
    </svg>
  );
};

// ── PIX Modal ────────────────────────────────────────────────────────────────
const PixModal = ({ plan, onClose }: { plan: typeof PLANS[0]; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "txFadeIn .2s ease" }}
    >
      <div style={{ background: "#0c1a09", border: "1px solid rgba(163,224,0,0.3)", borderRadius: 20, width: "100%", maxWidth: 400, overflow: "hidden", boxShadow: "0 0 80px rgba(163,224,0,0.12), 0 32px 64px rgba(0,0,0,0.7)", animation: "txSlideUp .22s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(163,224,0,0.12)" }}>
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(163,224,0,0.55)", letterSpacing: 2, marginBottom: 3 }}>// PAGAMENTO PIX</p>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>Pague com PIX</h3>
          </div>
          <button onClick={onClose} style={{ background: "rgba(163,224,0,0.1)", border: "1px solid rgba(163,224,0,0.2)", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#acd242", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ background: "rgba(163,224,0,0.06)", borderBottom: "1px solid rgba(163,224,0,0.1)", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(136,152,170,0.55)", letterSpacing: 1.5, marginBottom: 3 }}>PLANO {plan.label.toUpperCase()}</p>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 26, fontWeight: 700, color: "#A3E000", lineHeight: 1 }}>{fmt(plan.valor)}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(136,152,170,0.55)", letterSpacing: 1.5, marginBottom: 3 }}>VOCÊ RECEBE</p>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 700, color: "#fff" }}>{plan.tokens.toLocaleString("pt-BR")} TUPAN</p>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(163,224,0,0.6)", marginTop: 2 }}>Retorno: {fmt(plan.final)} em 14d</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px 16px" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 14, boxShadow: "0 0 32px rgba(163,224,0,0.15)" }}>
            <PixQrCode size={200} />
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "rgba(136,152,170,0.5)" }}>Escaneie o QR Code com o app do seu banco</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px", marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(136,152,170,0.4)", letterSpacing: 2 }}>OU</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ padding: "0 20px", marginBottom: 10 }}>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(163,224,0,0.5)", letterSpacing: 1.5, marginBottom: 6 }}>CHAVE PIX (E-MAIL)</p>
          <div style={{ display: "flex", gap: 8, alignItems: "center", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(163,224,0,0.18)", borderRadius: 10, padding: "10px 14px" }}>
            <span style={{ flex: 1, fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "#A3E000", wordBreak: "break-all" }}>{PIX_KEY}</span>
            <button onClick={() => copy(PIX_KEY, setCopiedKey)} style={{ background: copiedKey ? "rgba(163,224,0,0.15)" : "rgba(163,224,0,0.12)", border: "1px solid rgba(163,224,0,0.28)", borderRadius: 6, padding: "6px 12px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: "#A3E000", cursor: "pointer", whiteSpace: "nowrap" }}>
              {copiedKey ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
        </div>
        <div style={{ padding: "0 20px", marginBottom: 20 }}>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(163,224,0,0.5)", letterSpacing: 1.5, marginBottom: 6 }}>PIX COPIA E COLA</p>
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "rgba(136,152,170,0.55)", wordBreak: "break-all", lineHeight: 1.6, margin: 0 }}>{PIX_CHAVE}</p>
          </div>
          <button
            onClick={() => copy(PIX_CHAVE, setCopied)}
            style={{ width: "100%", background: copied ? "rgba(163,224,0,0.15)" : "linear-gradient(135deg,#A3E000,#7ab800)", border: copied ? "1px solid rgba(163,224,0,0.4)" : "none", borderRadius: 12, padding: 14, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 800, color: copied ? "#A3E000" : "#050a07", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase" as const, transition: "all .2s", boxShadow: copied ? "none" : "0 0 28px rgba(163,224,0,0.35)" }}
          >
            {copied ? "✓ Código Copiado!" : "📋 Copiar Código PIX"}
          </button>
        </div>
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)", textAlign: "center" }}>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, color: "rgba(136,152,170,0.35)", lineHeight: 1.7 }}>
            Após o pagamento, os tokens TUPAN serão enviados em até 24h.<br />
            Dúvidas?{" "}
            <a href="https://t.me/TupanGlobal" target="_blank" rel="noopener noreferrer" style={{ color: "#A3E000" }}>
              Entre em contato via Telegram.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(minutes: number) {
  const end = useRef(Date.now() + minutes * 60 * 1000);
  const [left, setLeft] = useState(minutes * 60);
  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.max(0, Math.floor((end.current - Date.now()) / 1000));
      setLeft(diff);
      if (diff === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Transacao() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(3);
  const [pixOpen, setPixOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [proofIdx, setProofIdx] = useState(0);
  const [proofVisible, setProofVisible] = useState(true);
  const selectRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(18);
  const plan = PLANS[selected];
  const lucro = plan.final - plan.valor;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setProofVisible(false);
      setTimeout(() => {
        setProofIdx((i) => (i + 1) % SOCIAL_PROOF.length);
        setProofVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {pixOpen && <PixModal plan={plan} onClose={() => setPixOpen(false)} />}

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .tx-page { font-family: 'Space Grotesk', sans-serif; background: #050e03; color: #fff; min-height: 100vh; }

        .tx-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px;
          background: rgba(5,14,3,0.96);
          border-bottom: 1px solid rgba(163,224,0,0.12);
          position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(14px);
        }
        .tx-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .tx-logo-mark {
          width: 34px; height: 34px;
          background: linear-gradient(135deg,#A3E000,#5a8500);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 15px; color: #050e03;
        }
        .tx-logo-name { font-weight: 800; font-size: 17px; color: #A3E000; letter-spacing: -0.5px; }
        .tx-countdown {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,80,0,0.1);
          border: 1px solid rgba(255,100,0,0.28);
          border-radius: 999px; padding: 6px 16px;
        }
        .tx-countdown-fire { font-size: 14px; animation: txBlink 1.2s step-end infinite; }
        @keyframes txBlink { 0%,100%{opacity:1} 50%{opacity:.4} }
        .tx-countdown-label { font-family:'IBM Plex Mono',monospace; font-size:9px; color:rgba(255,160,100,.75); letter-spacing:1.5px; }
        .tx-countdown-time { font-family:'IBM Plex Mono',monospace; font-size:15px; font-weight:700; color:#ff9a60; letter-spacing:1px; }

        .tx-steps {
          display: flex; align-items: center; justify-content: center;
          gap: 0; padding: 18px 20px;
          background: rgba(163,224,0,0.025);
          border-bottom: 1px solid rgba(163,224,0,0.07);
        }
        .tx-step { display: flex; align-items: center; gap: 8px; }
        .tx-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; flex-shrink: 0;
        }
        .tx-step.active .tx-step-num { background: #A3E000; color: #050e03; }
        .tx-step.idle .tx-step-num { background: rgba(255,255,255,0.05); color: rgba(255,255,255,.25); border: 1px solid rgba(255,255,255,.1); }
        .tx-step-label { font-size: 12px; font-weight: 600; white-space: nowrap; }
        .tx-step.active .tx-step-label { color: #A3E000; }
        .tx-step.idle .tx-step-label { color: rgba(255,255,255,.25); }
        .tx-step-line { width: 48px; height: 1px; background: rgba(255,255,255,.08); margin: 0 6px; flex-shrink: 0; }

        .tx-proof {
          background: rgba(163,224,0,0.03);
          border-bottom: 1px solid rgba(163,224,0,0.07);
          padding: 9px 20px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .tx-proof-live {
          display: flex; align-items: center; gap: 5px;
          background: rgba(163,224,0,0.1);
          border: 1px solid rgba(163,224,0,0.2);
          border-radius: 999px; padding: 3px 9px; flex-shrink: 0;
        }
        .tx-proof-dot { width: 5px; height: 5px; border-radius: 50%; background: #A3E000; animation: txPulse 1.4s ease-in-out infinite; }
        @keyframes txPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.75)} }
        .tx-proof-live-text { font-family:'IBM Plex Mono',monospace; font-size:8px; font-weight:700; color:#A3E000; letter-spacing:1.5px; }
        .tx-proof-msg { font-family:'IBM Plex Mono',monospace; font-size:11px; color:rgba(255,255,255,.5); transition:opacity .4s; }

        .tx-hero { text-align: center; padding: 52px 20px 36px; max-width: 700px; margin: 0 auto; }
        .tx-hero-eyebrow { font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:3px; color:rgba(163,224,0,.55); text-transform:uppercase; margin-bottom:18px; }
        .tx-hero-title { font-family:'Space Grotesk',sans-serif; font-size:clamp(28px,5vw,52px); font-weight:800; line-height:1.1; letter-spacing:-1.5px; margin-bottom:18px; }
        .tx-hero-sub { font-size:15px; color:rgba(255,255,255,.4); line-height:1.65; max-width:480px; margin:0 auto; }

        .tx-badges { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; padding:16px 20px 0; max-width:700px; margin:0 auto; }
        .tx-badge { display:flex; align-items:center; gap:5px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-radius:999px; padding:5px 12px; font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:.8px; color:rgba(255,255,255,.4); }
        .tx-badge-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

        .tx-plans-wrap { max-width:920px; margin:0 auto; padding:52px 20px 0; }
        .tx-plans-label { font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:3px; color:rgba(163,224,0,.45); text-transform:uppercase; margin-bottom:20px; text-align:center; }
        .tx-plans-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:10px; }
        .tx-plan-card {
          position:relative; border-radius:16px; padding:20px 18px 18px;
          cursor:pointer; transition:all .18s; overflow:hidden;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.02);
        }
        .tx-plan-card:hover { transform:translateY(-2px); }
        .tx-plan-shine { position:absolute; inset:0; pointer-events:none; background:linear-gradient(135deg,rgba(255,255,255,.04) 0%,transparent 60%); border-radius:16px; }
        .tx-plan-badge-pill { position:absolute; top:10px; right:10px; border-radius:999px; padding:3px 8px; font-family:'IBM Plex Mono',monospace; font-size:7px; letter-spacing:1.5px; font-weight:700; }
        .tx-plan-badge-pill.green { background:rgba(163,224,0,.13); border:1px solid rgba(163,224,0,.3); color:#A3E000; }
        .tx-plan-badge-pill.gold  { background:rgba(251,191,36,.12); border:1px solid rgba(251,191,36,.3); color:#fbbf24; }
        .tx-plan-badge-pill.pink  { background:rgba(244,114,182,.12); border:1px solid rgba(244,114,182,.3); color:#f472b6; }
        .tx-plan-tier { font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:2px; text-transform:uppercase; margin-bottom:10px; }
        .tx-plan-price { font-family:'Space Grotesk',sans-serif; font-size:28px; font-weight:800; line-height:1; margin-bottom:4px; }
        .tx-plan-sub { font-family:'IBM Plex Mono',monospace; font-size:10px; margin-bottom:14px; color:rgba(255,255,255,.25); }
        .tx-plan-roi-row { display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,.04); border-radius:6px; padding:5px 10px; }
        .tx-plan-roi-pct { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:800; }
        .tx-plan-roi-label { font-family:'IBM Plex Mono',monospace; font-size:8px; color:rgba(255,255,255,.25); }

        .tx-roi-wrap { max-width:920px; margin:0 auto; padding:28px 20px 0; }
        .tx-roi-card { border-radius:20px; overflow:hidden; border: 1px solid rgba(163,224,0,.14); background: rgba(163,224,0,.025); }
        .tx-roi-top { padding:36px 44px; display:flex; align-items:center; justify-content:space-between; gap:24px; border-bottom:1px solid rgba(163,224,0,.07); flex-wrap:wrap; }
        .tx-roi-eyebrow { font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:2px; color:rgba(163,224,0,.5); text-transform:uppercase; margin-bottom:10px; }
        .tx-roi-amount { font-family:'Space Grotesk',sans-serif; font-size:clamp(40px,6vw,68px); font-weight:800; line-height:1; letter-spacing:-2px; color:#A3E000; text-shadow:0 0 60px rgba(163,224,0,.3); }
        .tx-roi-note { font-family:'IBM Plex Mono',monospace; font-size:11px; color:rgba(163,224,0,.5); margin-top:8px; }
        .tx-roi-plan-block { text-align:right; }
        .tx-roi-plan-name { font-family:'Space Grotesk',sans-serif; font-size:24px; font-weight:800; color:#fff; }
        .tx-roi-plan-tokens { font-family:'IBM Plex Mono',monospace; font-size:10px; color:rgba(255,255,255,.3); margin-top:4px; }
        .tx-roi-stats { display:grid; grid-template-columns:1fr 1fr 1fr; }
        .tx-roi-stat { padding:26px; text-align:center; }
        .tx-roi-stat:not(:last-child) { border-right:1px solid rgba(163,224,0,.06); }
        .tx-roi-stat-val { font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; margin-bottom:5px; }
        .tx-roi-stat-key { font-family:'IBM Plex Mono',monospace; font-size:8px; letter-spacing:1.5px; color:rgba(255,255,255,.2); text-transform:uppercase; }

        .tx-cta-wrap { max-width:920px; margin:0 auto; padding:28px 20px 72px; }
        .tx-cta-card { border-radius:20px; padding:32px 36px; background: rgba(163,224,0,.04); border: 1px solid rgba(163,224,0,.18); display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .tx-cta-title { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:800; margin-bottom:5px; }
        .tx-cta-sub { font-size:13px; color:rgba(255,255,255,.4); }
        .tx-buy-btn {
          background: linear-gradient(135deg,#A3E000,#7ab800);
          border: none; border-radius:14px; padding:17px 44px;
          font-family:'Space Grotesk',sans-serif; font-size:17px; font-weight:800;
          color:#050e03; cursor:pointer; letter-spacing:.5px; text-transform:uppercase;
          box-shadow:0 0 44px rgba(163,224,0,.28);
          transition:all .2s; white-space:nowrap; flex-shrink:0;
        }
        .tx-buy-btn:hover { background:linear-gradient(135deg,#c8e855,#9acc14); transform:translateY(-2px); box-shadow:0 0 60px rgba(163,224,0,.45); }
        .tx-buy-btn:active { transform:translateY(0); }

        .tx-trust-row { display:flex; align-items:center; justify-content:center; gap:20px; flex-wrap:wrap; max-width:920px; margin:0 auto; padding:0 20px 64px; }
        .tx-trust-item { display:flex; align-items:center; gap:6px; font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:1px; color:rgba(255,255,255,.28); }
        .tx-trust-icon { font-size:14px; }
        .tx-trust-sep { width:1px; height:16px; background:rgba(255,255,255,.08); }

        @keyframes txFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes txSlideUp { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }

        @media(max-width:640px) {
          .tx-step-label { display:none; }
          .tx-step-line { width:28px; }
          .tx-plans-grid { grid-template-columns:1fr 1fr; gap:8px; }
          .tx-roi-top { padding:24px 20px; flex-direction:column; align-items:flex-start; gap:16px; }
          .tx-roi-plan-block { text-align:left; }
          .tx-roi-stats { grid-template-columns:1fr; }
          .tx-roi-stat:not(:last-child) { border-right:none; border-bottom:1px solid rgba(163,224,0,.06); }
          .tx-cta-card { flex-direction:column; align-items:stretch; text-align:center; padding:24px 20px; }
          .tx-buy-btn { width:100%; text-align:center; }
          .tx-trust-sep { display:none; }
          .tx-hero { padding-top: 36px; }
          .tx-countdown-label { display:none; }
          .tx-select-wrap { margin: 0 20px; }
        }

        .tx-select-wrap { position:relative; max-width:920px; margin:0 auto; padding:32px 20px 0; }
        .tx-select-input {
          display:flex; align-items:center; justify-content:space-between;
          background:rgba(255,255,255,.03); border:1px solid rgba(163,224,0,.22);
          border-radius:14px; padding:14px 18px; cursor:pointer;
          transition:border-color .18s, background .18s;
        }
        .tx-select-input:hover { border-color:rgba(163,224,0,.45); background:rgba(163,224,0,.04); }
        .tx-select-left { display:flex; flex-direction:column; gap:3px; }
        .tx-select-label { font-family:'IBM Plex Mono',monospace; font-size:8px; letter-spacing:2px; color:rgba(163,224,0,.5); text-transform:uppercase; }
        .tx-select-value { font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:700; color:#fff; }
        .tx-select-arrow { font-size:18px; color:rgba(163,224,0,.7); transition:transform .18s; user-select:none; }
        .tx-select-dropdown {
          position:absolute; top:calc(100% + 6px); left:20px; right:20px; z-index:50;
          background:#0c1a09; border:1px solid rgba(163,224,0,.22);
          border-radius:16px; overflow:hidden;
          box-shadow:0 16px 48px rgba(0,0,0,.6), 0 0 40px rgba(163,224,0,.06);
          animation:txFadeIn .15s ease;
        }
        .tx-select-option {
          display:flex; align-items:center; justify-content:space-between; gap:12px;
          padding:13px 18px; cursor:pointer; transition:background .14s;
          border-bottom:1px solid rgba(255,255,255,.04);
        }
        .tx-select-option:last-child { border-bottom:none; }
        .tx-select-option:hover { background:rgba(163,224,0,.06); }
        .tx-select-option.active { background:rgba(163,224,0,.08); }
        .tx-select-opt-left { display:flex; flex-direction:column; gap:2px; flex:1; }
        .tx-select-opt-name { font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700; color:#fff; }
        .tx-select-opt-tokens { font-family:'IBM Plex Mono',monospace; font-size:9px; color:rgba(255,255,255,.3); }
        .tx-select-opt-right { display:flex; flex-direction:column; align-items:flex-end; gap:2px; }
        .tx-select-opt-price { font-family:'IBM Plex Mono',monospace; font-size:14px; font-weight:700; color:#fff; }
        .tx-select-opt-roi { font-family:'IBM Plex Mono',monospace; font-size:9px; color:rgba(163,224,0,.6); }
        .tx-select-check { font-size:14px; color:#A3E000; margin-left:4px; }
      `}</style>

      <div className="tx-page">

        {/* ── Topbar ── */}
        <header className="tx-topbar">
          <a href="/" className="tx-logo">
            <div className="tx-logo-mark">T</div>
            <span className="tx-logo-name">TUPAN</span>
          </a>
          <div className="tx-countdown">
            <span className="tx-countdown-fire">🔥</span>
            <span className="tx-countdown-label">OFERTA EXPIRA EM</span>
            <span className="tx-countdown-time">{countdown}</span>
          </div>
        </header>



        {/* ── Social proof ticker ── */}
        <div className="tx-proof">
          <div className="tx-proof-live">
            <div className="tx-proof-dot" />
            <span className="tx-proof-live-text">AO VIVO</span>
          </div>
          <p className="tx-proof-msg" style={{ opacity: proofVisible ? 1 : 0 }}>
            {SOCIAL_PROOF[proofIdx]}
          </p>
        </div>

        {/* ── Hero ── */}
        <div className="tx-hero">
          <h1 className="tx-hero-title">
            Escolha seu plano e<br />
            <span style={{ color: "#A3E000" }}>comece a lucrar</span> com a Amazônia
          </h1>
          <p className="tx-hero-sub">
            Token lastreado em créditos de carbono reais. Retorno em 14 dias, distribuído diariamente em USDC.
          </p>
        </div>

        {/* ── Plan selector input ── */}
        <div className="tx-select-wrap" ref={selectRef}>
          <div className="tx-select-input" onClick={() => setDropOpen(v => !v)}>
            <div className="tx-select-left">
              <span className="tx-select-label">Plano selecionado</span>
              <span className="tx-select-value">
                {plan.label} &mdash; {fmt(plan.valor)}
              </span>
            </div>
            <span className="tx-select-arrow" style={{ transform: dropOpen ? "rotate(180deg)" : undefined }}>▾</span>
          </div>
          {dropOpen && (
            <div className="tx-select-dropdown">
              {PLANS.map((p, i) => (
                <div
                  key={p.id}
                  className={`tx-select-option${selected === i ? " active" : ""}`}
                  onClick={() => { setSelected(i); setDropOpen(false); }}
                >
                  <div className="tx-select-opt-left">
                    <span className="tx-select-opt-name" style={{ color: selected === i ? p.accent : undefined }}>{p.label}</span>
                    <span className="tx-select-opt-tokens">{p.tokens.toLocaleString("pt-BR")} TUPAN</span>
                  </div>
                  <div className="tx-select-opt-right">
                    <span className="tx-select-opt-price">{fmt(p.valor)}</span>
                    <span className="tx-select-opt-roi">+{p.pct.toFixed(0)}% em 14d</span>
                  </div>
                  {selected === i && <span className="tx-select-check">✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── ROI summary card ── */}
        <div className="tx-roi-wrap">
          <div className="tx-roi-card">
            <div className="tx-roi-top">
              <div>
                <p className="tx-roi-eyebrow">Retorno total em 14 dias</p>
                <p className="tx-roi-amount">{fmt(plan.final)}</p>
                <p className="tx-roi-note">+{fmt(lucro)} de lucro · {plan.pct.toFixed(2)}% de retorno</p>
              </div>
              <div className="tx-roi-plan-block">
                <p className="tx-roi-eyebrow">Plano selecionado</p>
                <p className="tx-roi-plan-name">{plan.label}</p>
                <p className="tx-roi-plan-tokens">{plan.tokens.toLocaleString("pt-BR")} TUPAN</p>
              </div>
            </div>
            <div className="tx-roi-stats">
              {[
                { key: "Investimento",  val: fmt(plan.valor),  highlight: false },
                { key: "Ganho diário",  val: fmt(plan.diario), highlight: true  },
                { key: "Duração",       val: "14 dias",        highlight: false },
              ].map((s, i) => (
                <div key={i} className="tx-roi-stat">
                  <p className="tx-roi-stat-val" style={s.highlight ? { color: "#A3E000" } : {}}>{s.val}</p>
                  <p className="tx-roi-stat-key">{s.key}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA block ── */}
        <div className="tx-cta-wrap">
          <div className="tx-cta-card">
            <div>
              <p className="tx-cta-title">
                Plano <span style={{ color: "#A3E000" }}>{plan.label}</span> — {fmt(plan.valor)}
              </p>
              <p className="tx-cta-sub">
                Você receberá {plan.tokens.toLocaleString("pt-BR")} TUPAN após confirmação do pagamento.
              </p>
            </div>
            <button className="tx-buy-btn" onClick={() => navigate("/login", { state: { plan } })}>
              REALIZAR INVESTIMENTO
            </button>
          </div>
        </div>

        {/* ── Trust row ── */}
        <div className="tx-trust-row">
          {[
            { icon: "🔒", text: "Pagamento seguro" },
            { icon: "⚡", text: "Tokens em até 24h" },
            { icon: "🛡", text: "Auditado pelo CertiK" },
            { icon: "🌿", text: "Token RWA lastreado" },
            { icon: "💬", text: "Suporte via Telegram" },
          ].map((t, i) => (
            <span key={`t-${i}`} style={{ display:"contents" }}>
              {i > 0 && <div className="tx-trust-sep" />}
              <div className="tx-trust-item">
                <span className="tx-trust-icon">{t.icon}</span>
                {t.text}
              </div>
            </span>
          ))}
        </div>

      </div>
    </>
  );
}
