import { useState, useEffect, useRef } from "react";

// ── DATA ─────────────────────────────────────────────────
const USER = { name: "Lucas Ferreira", wallet: "0x71C7...976F", tokens: 12, joinDate: "Jan 2025" };

const TREES = [
  { id: 1, name: "Itaúba",   code: "#001", species: "Mezilaurus itauba",  lat: -3.4168, lng: -62.2159, planted: "15 Jan 2025", age: 55, height: 0.87, co2: 1.24, status: "Saudável",  nft: "TPN-0091" },
  { id: 2, name: "Cedro",    code: "#002", species: "Cedrela odorata",    lat: -3.4201, lng: -62.2134, planted: "15 Jan 2025", age: 55, height: 0.72, co2: 0.98, status: "Saudável",  nft: "TPN-0092" },
  { id: 3, name: "Andiroba", code: "#003", species: "Carapa guianensis",  lat: -3.4155, lng: -62.2178, planted: "16 Jan 2025", age: 54, height: 0.65, co2: 0.87, status: "Crescendo", nft: "TPN-0093" },
];

const PROPOSALS = [
  { id: 1, company: "Volkswagen AG",  country: "DE", price: 42.50, volume: 120, total: 5100, deadline: "30 Jun 2025", status: "new",      urgency: "high"     },
  { id: 2, company: "Microsoft Corp", country: "US", price: 38.00, volume:  85, total: 3230, deadline: "15 Jul 2025", status: "new",      urgency: "medium"   },
  { id: 3, company: "Petrobras S.A.", country: "BR", price: 31.00, volume: 200, total: 6200, deadline: "20 Ago 2025", status: "review",   urgency: "low"      },
  { id: 4, company: "TotalEnergies",  country: "FR", price: 45.00, volume:  60, total: 2700, deadline: "10 Jun 2025", status: "expiring", urgency: "critical" },
];

// ── TYPES ────────────────────────────────────────────────
type Tree = typeof TREES[number];
type Proposal = typeof PROPOSALS[number];

// ── SATELLITE MAP ─────────────────────────────────────────
function SatelliteMap({ trees, selected, onSelect }: { trees: Tree[]; selected: Tree | null; onSelect: (t: Tree) => void }) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const drag = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const c = cvs.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const draw = (ts: number) => {
      const W = c.offsetWidth, H = c.offsetHeight;
      c.width = W * devicePixelRatio; c.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const t = ts * 0.001;

      ctx.fillStyle = "#0a1a0a"; ctx.fillRect(0, 0, W, H);

      ([
        [0.15, 0.25, 0.22, "#0f2a0f"], [0.55, 0.35, 0.28, "#112b11"], [0.8, 0.6, 0.18, "#0e280e"],
        [0.35, 0.65, 0.2,  "#102a10"], [0.7,  0.2,  0.15, "#0d260d"], [0.45, 0.5, 0.3, "#122c12"],
        [0.1,  0.7,  0.12, "#0f280f"], [0.9,  0.4,  0.14, "#112a11"],
      ] as [number, number, number, string][]).forEach(([x, y, r, col]) => {
        const g = ctx.createRadialGradient(x*W+pan.x*.4, y*H+pan.y*.4, 0, x*W, y*H, r*W*zoom);
        g.addColorStop(0, col + "ee"); g.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(x*W+pan.x*.4, y*H+pan.y*.4, r*W*zoom, 0, Math.PI*2);
        ctx.fillStyle = g; ctx.fill();
      });

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, H*.42+pan.y*.25);
      ctx.bezierCurveTo(W*.28, H*.37, W*.5, H*.52, W*.72, H*.43);
      ctx.bezierCurveTo(W*.88, H*.36, W*.96, H*.48, W, H*.42);
      ctx.strokeStyle = "rgba(30,60,100,0.6)"; ctx.lineWidth = 8*zoom; ctx.stroke();
      ctx.strokeStyle = "rgba(40,80,140,0.25)"; ctx.lineWidth = 14*zoom; ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = "rgba(255,255,255,0.018)"; ctx.lineWidth = .5;
      for (let i = 0; i < W; i += 48) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
      for (let i = 0; i < H; i += 48) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

      const pos: [number, number][] = [[.42, .37], [.46, .43], [.43, .34]];
      trees.forEach((tree, i) => {
        const px = pos[i][0]*W + pan.x*.18;
        const py = pos[i][1]*H + pan.y*.18;
        const isSel = selected?.id === tree.id;
        const p = .5 + Math.sin(t*2.2+i)*0.5;

        if (isSel) {
          [32, 22].forEach((r, ri) => {
            ctx.beginPath(); ctx.arc(px, py, r+Math.sin(t*3)*2, 0, Math.PI*2);
            ctx.strokeStyle = `rgba(52,211,153,${(1-ri*.4)*p*.35})`; ctx.lineWidth = 1; ctx.stroke();
          });
        }
        ctx.beginPath(); ctx.arc(px, py, isSel ? 7 : 5, 0, Math.PI*2);
        ctx.fillStyle = isSel ? "#34D399" : "#16A34A";
        ctx.shadowColor = "#34D399"; ctx.shadowBlur = isSel ? 16 : 6; ctx.fill();
        ctx.shadowBlur = 0;

        if (isSel) {
          const lbl = `${tree.name} ${tree.code}`;
          ctx.font = "500 11px -apple-system,sans-serif";
          const tw = ctx.measureText(lbl).width;
          ctx.fillStyle = "rgba(0,0,0,0.75)";
          ctx.beginPath();
          (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void })
            .roundRect(px-tw/2-10, py-38, tw+20, 22, 4);
          ctx.fill();
          ctx.fillStyle = "#34D399"; ctx.textAlign = "center";
          ctx.fillText(lbl, px, py-23);
        }
      });

      ctx.font = "10px 'SF Mono',monospace"; ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.textAlign = "left";
      ctx.fillText(`${(-3.4168).toFixed(4)}°S  ${(-62.2159).toFixed(4)}°W`, 14, H-14);

      ctx.save(); ctx.translate(W-36, 36);
      ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(12, 0); ctx.stroke();
      ctx.font = "9px -apple-system,sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.textAlign = "center"; ctx.fillText("N", 0, -16); ctx.restore();

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [zoom, pan, selected, trees]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", borderRadius: 16, overflow: "hidden", cursor: "grab" }}
      onMouseDown={e => { drag.current = true; last.current = { x: e.clientX, y: e.clientY }; }}
      onMouseMove={e => {
        if (!drag.current) return;
        setPan(p => ({ x: p.x+(e.clientX-last.current.x), y: p.y+(e.clientY-last.current.y) }));
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseUp={() => { drag.current = false; }}
      onMouseLeave={() => { drag.current = false; }}
    >
      <canvas ref={cvs} style={{ width: "100%", height: "100%", display: "block" }} />

      {/* Live badge */}
      <div style={{
        position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 7,
        padding: "6px 12px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100,
        fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "-apple-system,sans-serif", letterSpacing: ".06em",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399", animation: "blink 1.6s ease infinite", display: "inline-block" }} />
        SATÉLITE AO VIVO
      </div>

      {/* Tree selector pills */}
      <div style={{ position: "absolute", top: 14, right: 14, display: "flex", flexDirection: "column", gap: 6 }}>
        {trees.map(tree => (
          <button key={tree.id} onClick={() => onSelect(tree)} style={{
            padding: "7px 14px",
            background: selected?.id === tree.id ? "rgba(52,211,153,0.15)" : "rgba(0,0,0,0.55)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${selected?.id === tree.id ? "rgba(52,211,153,0.35)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 100, fontSize: 12,
            color: selected?.id === tree.id ? "#34D399" : "rgba(255,255,255,0.5)",
            cursor: "pointer", transition: "all .2s", fontFamily: "-apple-system,sans-serif", whiteSpace: "nowrap",
          }}>{tree.name} {tree.code}</button>
        ))}
      </div>

      {/* Zoom */}
      <div style={{
        position: "absolute", bottom: 14, right: 14, display: "flex", flexDirection: "column",
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10, overflow: "hidden",
      }}>
        {(["+", "−"] as const).map((l, i) => (
          <button key={i} onClick={() => setZoom(z => Math.max(.5, Math.min(3, z+(i===0 ? .35 : -.35))))} style={{
            width: 34, height: 34, background: "transparent", border: "none", color: "rgba(255,255,255,0.5)",
            fontSize: 18, cursor: "pointer", borderBottom: i===0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "color .15s",
            fontFamily: "-apple-system,sans-serif",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >{l}</button>
        ))}
      </div>
    </div>
  );
}

// ── COUNTER ───────────────────────────────────────────────
function Count({ to, dec = 0, prefix = "", suffix = "", dur = 2000 }: {
  to: number; dec?: number; prefix?: string; suffix?: string; dur?: number;
}) {
  const [v, setV] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: .5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!go) return;
    const s = performance.now();
    const u = (n: number) => {
      const p = Math.min((n-s)/dur, 1), ease = 1-Math.pow(1-p, 4);
      setV(+(ease*to).toFixed(dec));
      if (p < 1) requestAnimationFrame(u);
    };
    requestAnimationFrame(u);
  }, [go, to, dec, dur]);

  return <span ref={ref}>{prefix}{dec > 0 ? v.toFixed(dec) : v.toLocaleString("pt-BR")}{suffix}</span>;
}

// ── PROPOSAL ROW ──────────────────────────────────────────
function ProposalRow({ p, accepted, onAccept, expanded, onExpand }: {
  p: Proposal; accepted: boolean; onAccept: (p: Proposal) => void; expanded: boolean; onExpand: () => void;
}) {
  const statusLabel: Record<string, string> = { new: "Nova", review: "Em análise", expiring: "Expirando" };

  return (
    <div
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", transition: "border-color .2s" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
    >
      <div style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        {/* Company initial */}
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.5)",
        }}>
          {p.company[0]}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-.015em" }}>{p.company}</span>
            <span style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 100, fontWeight: 500,
              background: accepted ? "rgba(52,211,153,0.1)" : p.status==="expiring" ? "rgba(248,113,113,0.1)" : p.status==="new" ? "rgba(52,211,153,0.07)" : "rgba(255,255,255,0.05)",
              color: accepted ? "#34D399" : p.status==="expiring" ? "#F87171" : p.status==="new" ? "#34D399" : "rgba(255,255,255,0.4)",
              border: `1px solid ${accepted ? "rgba(52,211,153,0.2)" : p.status==="expiring" ? "rgba(248,113,113,0.2)" : "rgba(255,255,255,0.08)"}`,
            }}>
              {accepted ? "Aceita" : statusLabel[p.status] || p.status}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
            {p.country} · {p.volume}t CO₂ · Prazo {p.deadline}
          </div>
        </div>

        {/* Price */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-.025em", color: accepted ? "rgba(255,255,255,0.35)" : "#F5F5F7", fontVariantNumeric: "tabular-nums" }}>
            R${p.price.toFixed(2)}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>por tonelada</div>
        </div>

        {/* Total */}
        <div style={{ textAlign: "right", flexShrink: 0, minWidth: 110 }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-.02em", color: accepted ? "rgba(52,211,153,0.4)" : "#34D399", fontVariantNumeric: "tabular-nums" }}>
            R$ {p.total.toLocaleString("pt-BR")}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>total</div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {!accepted && (
            <button onClick={() => onAccept(p)} style={{
              padding: "9px 20px", borderRadius: 980, border: "none",
              background: "#34D399", color: "#000", fontSize: 13, fontWeight: 600,
              cursor: "pointer", letterSpacing: "-.01em", transition: "opacity .15s", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Aceitar
            </button>
          )}
          <button onClick={onExpand} style={{
            width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)",
            fontSize: 13, cursor: "pointer", transition: "all .15s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            {expanded ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{
          padding: "16px 22px 20px", borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.2)", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
        }}>
          A <strong style={{ color: "rgba(255,255,255,0.6)" }}>{p.company}</strong> busca compensar {p.volume} toneladas de CO₂{" "}
          em suas operações deste trimestre. Créditos verificados pelo protocolo{" "}
          <span style={{ color: "#34D399" }}>Verra VCS</span>, registrados no Gold Standard Registry.
          Liquidação automática via smart contract em 72h após confirmação.
        </div>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const [tree, setTree] = useState<Tree>(TREES[0]);
  const [toast, setToast] = useState<string | null>(null);
  const [acceptedIds, setAcceptedIds] = useState<number[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const accept = (p: Proposal) => {
    setAcceptedIds(a => [...a, p.id]);
    setToast(`Proposta da ${p.company} aceita com sucesso.`);
    setTimeout(() => setToast(null), 4000);
  };

  const totalCO2 = TREES.reduce((a, t) => a + t.co2, 0).toFixed(2);
  const newProposals = PROPOSALS.filter(p => p.status === "new").length;

  const NAV = [
    { id: "overview",   label: "Visão Geral" },
    { id: "trees",      label: "Minhas Árvores" },
    { id: "proposals",  label: "Propostas", badge: newProposals },
    { id: "income",     label: "Rendimentos" },
  ];

  return (
    <div style={{ background: "#000", color: "#F5F5F7", minHeight: "100vh", fontFamily: "-apple-system,'SF Pro Display','Helvetica Neue',sans-serif" }}>
      <style>{`
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes in      { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes toastIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
        .dash * { box-sizing: border-box; }
        .dash ::-webkit-scrollbar { width: 0; }
        .dash button { font-family: inherit; }
        @media (max-width: 768px) {
          .dash-kpi-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .dash-map-grid   { grid-template-columns: 1fr !important; height: auto !important; }
          .dash-map-panel  { height: 300px; }
          .dash-tree-grid  { grid-template-columns: 1fr !important; }
          .dash-main       { padding: 24px 16px !important; }
          .dash-nav        { overflow-x: auto; padding: 0 16px !important; }
          .dash-header     { padding: 0 16px !important; }
          .dash-proposals-header { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 999,
          padding: "13px 24px", background: "rgba(30,30,30,0.95)", backdropFilter: "blur(20px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, fontSize: 14, color: "#F5F5F7",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "toastIn .3s ease", whiteSpace: "nowrap",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ color: "#34D399", fontSize: 16 }}>✓</span> {toast}
        </div>
      )}

      {/* NAVBAR */}
      <header className="dash-header" style={{
        height: 52, borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(20px) saturate(180%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-.025em", color: "#F5F5F7" }}>Tupan</span>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <nav className="dash-nav" style={{ display: "flex", gap: 4 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 500, letterSpacing: "-.01em", transition: "all .15s",
                background: tab === n.id ? "rgba(255,255,255,0.1)" : "transparent",
                color: tab === n.id ? "#F5F5F7" : "rgba(255,255,255,0.45)",
                display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
              }}>
                {n.label}
                {(n.badge ?? 0) > 0 && (
                  <span style={{
                    background: "#34D399", color: "#000", borderRadius: 100,
                    fontSize: 10, fontWeight: 700, padding: "1px 6px", minWidth: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{n.badge}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: ".04em" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399", animation: "blink 2s ease infinite", display: "inline-block" }} />
            AO VIVO
          </div>
          <div style={{
            padding: "5px 14px", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
            fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: ".01em",
          }}>
            {USER.wallet}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="dash dash-main" style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 32px", animation: "in .4s ease" }}>

        {/* ═══ OVERVIEW ═══ */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-.03em", marginBottom: 6 }}>
                Olá, {USER.name.split(" ")[0]}.
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
                {TREES.length} árvores ativas · Amazônia, AM
              </p>
            </div>

            {/* KPI strip */}
            <div className="dash-kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { label: "CO₂ Capturado",    value: <Count to={+totalCO2} dec={2} suffix=" kg" />, sub: "Este mês +12%",       accent: "#34D399" },
                { label: "Rendimentos",       value: <Count to={847.32}    dec={2} prefix="R$ " />, sub: "Desde Jan 2025",      accent: "#34D399" },
                { label: "Propostas Ativas",  value: PROPOSALS.length,                              sub: `${newProposals} novas`, accent: "#F5F5F7" },
                { label: "Tokens",            value: `${USER.tokens} TUPAN`,                        sub: `${TREES.length} árvores`, accent: "#F5F5F7" },
              ].map((k, i) => (
                <div key={i} style={{
                  padding: "22px 24px", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16,
                }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: ".03em", marginBottom: 10 }}>{k.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-.03em", color: k.accent, fontVariantNumeric: "tabular-nums" }}>{k.value}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Map + tree detail */}
            <div className="dash-map-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 12, height: 400 }}>
              <div className="dash-map-panel" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                <SatelliteMap trees={TREES} selected={tree} onSelect={setTree} />
              </div>

              {/* Tree detail panel */}
              <div style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20,
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Selecionada</div>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-.02em" }}>
                    {tree.name} <span style={{ color: "rgba(255,255,255,0.3)" }}>{tree.code}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 2 }}>{tree.species}</div>
                </div>

                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "6px 12px", borderRadius: 100, width: "fit-content",
                  background: tree.status === "Saudável" ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)",
                  border: `1px solid ${tree.status === "Saudável" ? "rgba(52,211,153,0.25)" : "rgba(251,191,36,0.25)"}`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", display: "inline-block", background: tree.status === "Saudável" ? "#34D399" : "#FBBF24" }} />
                  <span style={{ fontSize: 12, color: tree.status === "Saudável" ? "#34D399" : "#FBBF24", fontWeight: 500 }}>{tree.status}</span>
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { l: "Altura",          v: `${tree.height} m`,  pct: tree.height/30,  c: "#34D399" },
                    { l: "CO₂ Sequestrado", v: `${tree.co2} kg`,    pct: tree.co2/5,      c: "#60A5FA" },
                    { l: "Dias de vida",    v: `${tree.age}d`,       pct: tree.age/365,    c: "rgba(255,255,255,0.6)" },
                  ].map(m => (
                    <div key={m.l}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{m.l}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", fontVariantNumeric: "tabular-nums" }}>{m.v}</span>
                      </div>
                      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }}>
                        <div style={{ height: "100%", width: `${Math.min(m.pct*100, 100)}%`, background: m.c, borderRadius: 1, transition: "width 1.2s cubic-bezier(.16,1,.3,1)" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: "10px 14px", background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: ".04em" }}>NFT CERTIFICADO</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: "'SF Mono',monospace" }}>{tree.nft}</span>
                </div>
              </div>
            </div>

            {/* Top proposals preview */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-.02em" }}>Propostas Recentes</h2>
                <button onClick={() => setTab("proposals")} style={{
                  fontSize: 13, color: "rgba(255,255,255,0.35)", background: "none", border: "none",
                  cursor: "pointer", letterSpacing: "-.01em", transition: "color .15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  Ver todas →
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PROPOSALS.slice(0, 2).map(p => (
                  <ProposalRow key={p.id} p={p} accepted={acceptedIds.includes(p.id)}
                    onAccept={accept} expanded={expandedId === p.id}
                    onExpand={() => setExpandedId(expandedId === p.id ? null : p.id)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ TREES ═══ */}
        {tab === "trees" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-.03em", marginBottom: 6 }}>Minhas Árvores</h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>Amazônia · {TREES.length} árvores registradas on-chain</p>
            </div>
            <div style={{ height: 380, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
              <SatelliteMap trees={TREES} selected={tree} onSelect={setTree} />
            </div>
            <div className="dash-tree-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {TREES.map(t => (
                <button key={t.id} onClick={() => setTree(t)} style={{
                  padding: 24,
                  background: tree.id === t.id ? "rgba(52,211,153,0.07)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${tree.id === t.id ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 16, cursor: "pointer", transition: "all .2s", textAlign: "left",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-.015em", color: "#F5F5F7", marginBottom: 3 }}>
                        {t.name} <span style={{ color: "rgba(255,255,255,0.3)" }}>{t.code}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>{t.species}</div>
                    </div>
                    <span style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: 100,
                      background: t.status === "Saudável" ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)",
                      color: t.status === "Saudável" ? "#34D399" : "#FBBF24",
                      border: `1px solid ${t.status === "Saudável" ? "rgba(52,211,153,0.2)" : "rgba(251,191,36,0.2)"}`,
                    }}>{t.status}</span>
                  </div>
                  {[
                    { l: "Altura", v: `${t.height}m`, pct: t.height/30, c: "#34D399" },
                    { l: "CO₂",    v: `${t.co2}kg`,   pct: t.co2/5,     c: "#60A5FA" },
                  ].map(m => (
                    <div key={m.l} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{m.l}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{m.v}</span>
                      </div>
                      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }}>
                        <div style={{ height: "100%", width: `${m.pct*100}%`, background: m.c, borderRadius: 1 }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'SF Mono',monospace" }}>{t.nft}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PROPOSALS ═══ */}
        {tab === "proposals" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="dash-proposals-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-.03em", marginBottom: 6 }}>Propostas</h1>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>Empresas comprando seus créditos de carbono</p>
              </div>
              <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: ".04em", marginBottom: 6 }}>RECEITA POTENCIAL</div>
                <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-.025em", color: "#34D399" }}>
                  R$ {PROPOSALS.reduce((a, p) => a + p.total, 0).toLocaleString("pt-BR")}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PROPOSALS.map(p => (
                <ProposalRow key={p.id} p={p} accepted={acceptedIds.includes(p.id)}
                  onAccept={accept} expanded={expandedId === p.id}
                  onExpand={() => setExpandedId(expandedId === p.id ? null : p.id)} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ INCOME ═══ */}
        {tab === "income" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-.03em", marginBottom: 6 }}>Rendimentos</h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>Distribuições automáticas via smart contract</p>
            </div>

            {/* Balance card */}
            <div style={{
              padding: "48px 40px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
            }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: ".08em", textTransform: "uppercase" }}>Saldo Acumulado</div>
              <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-.04em", color: "#F5F5F7", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                R$ <Count to={847.32} dec={2} dur={1800} />
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                Próxima distribuição: <span style={{ color: "rgba(255,255,255,0.6)" }}>30 Jun 2025</span>
              </div>
              <button style={{
                marginTop: 20, padding: "13px 32px", borderRadius: 980,
                background: "#34D399", border: "none", color: "#000",
                fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: "-.01em", transition: "opacity .2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Sacar para carteira
              </button>
            </div>

            {/* History */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-.01em" }}>Histórico</span>
              </div>
              {[
                { date: "31 Mai 2025", amount: "R$ 312,40", from: "Microsoft Corp",  tx: "0xabc...123" },
                { date: "30 Abr 2025", amount: "R$ 289,80", from: "TotalEnergies",   tx: "0xdef...456" },
                { date: "31 Mar 2025", amount: "R$ 245,12", from: "Volkswagen AG",   tx: "0xghi...789" },
              ].map((h, i) => (
                <div key={i} style={{
                  padding: "18px 24px",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background .15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 4, fontWeight: 500 }}>{h.from}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
                      {h.date} · <span style={{ fontFamily: "'SF Mono',monospace" }}>{h.tx}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "#34D399", letterSpacing: "-.015em", fontVariantNumeric: "tabular-nums" }}>
                    +{h.amount}
                  </span>
                </div>
              ))}
            </div>

            {/* Projection bar chart */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, letterSpacing: "-.01em" }}>Projeção Anual</div>
              <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
                {[22, 35, 41, 48, 55, 63, 72, 80, 89, 97, 106, 116].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: "100%", borderRadius: "2px 2px 0 0",
                      height: `${(v/116)*100}%`,
                      background: i < 5 ? "rgba(52,211,153,0.7)" : "rgba(255,255,255,0.1)",
                      boxShadow: i < 5 ? "0 0 8px rgba(52,211,153,0.3)" : "none",
                    }} />
                    {i % 3 === 0 && (
                      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                        {(["Jan", "Abr", "Jul", "Out"] as const)[Math.floor(i/3)]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
