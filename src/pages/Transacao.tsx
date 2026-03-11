import { useState, useCallback } from "react";
import CalculadoraSection from "../components/CalculadoraSection";

// ── PIX key (chave aleatória de demonstração) ──
const PIX_CHAVE = "00020126580014BR.GOV.BCB.PIX0136tupan@tupan.io5204000053039865802BR5913TUPAN PROTOCOL6009SAO PAULO62070503***6304";
const PIX_KEY   = "tupan@tupan.io";

// ── QR Code SVG (gerado para chave tupan@tupan.io) ──
const PixQrCode = ({ size = 220 }: { size?: number }) => {
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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display:"block" }}>
      <rect width={size} height={size} fill="#fff"/>
      {cells.map((row, r) =>
        row.split("").map((v, c) =>
          v === "1" ? <rect key={`${r}_${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill="#111"/> : null
        )
      )}
    </svg>
  );
};

// ── PIX Modal ──
interface PixModalProps { amount: string; onClose: () => void; }
const PixModal = ({ amount, onClose }: PixModalProps) => {
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const amtNum = parseFloat(amount) || 0;
  const amtFmt = "R$ " + amtNum.toLocaleString("pt-BR", { minimumFractionDigits:2, maximumFractionDigits:2 });

  const copy = (text: string, setter: (v:boolean)=>void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:"fixed", inset:0, zIndex:200,
        background:"rgba(0,0,0,0.82)",
        backdropFilter:"blur(10px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"16px",
        animation:"swapFadeIn .2s ease",
      }}
    >
      <div style={{
        background:"#0c1a09",
        border:"1px solid rgba(163,224,0,0.3)",
        borderRadius:20,
        width:"100%", maxWidth:400,
        overflow:"hidden",
        boxShadow:"0 0 80px rgba(163,224,0,0.12), 0 32px 64px rgba(0,0,0,0.7)",
        animation:"swapSlideUp .22s ease",
      }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid rgba(163,224,0,0.12)" }}>
          <div>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(163,224,0,0.55)", letterSpacing:2, marginBottom:3 }}>// PAGAMENTO PIX</p>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:800, color:"#fff", margin:0 }}>Pague com PIX</h3>
          </div>
          <button onClick={onClose} style={{ background:"rgba(163,224,0,0.1)", border:"1px solid rgba(163,224,0,0.2)", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#acd242", fontSize:16 }}>✕</button>
        </div>

        {/* Amount banner */}
        <div style={{ background:"rgba(163,224,0,0.06)", borderBottom:"1px solid rgba(163,224,0,0.1)", padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.55)", letterSpacing:1.5, marginBottom:3 }}>VALOR A PAGAR</p>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:26, fontWeight:700, color:"#A3E000", lineHeight:1 }}>{amtFmt}</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.55)", letterSpacing:1.5, marginBottom:3 }}>VOCÊ RECEBE</p>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:14, fontWeight:700, color:"#fff" }}>
              {(amtNum).toLocaleString("pt-BR", { maximumFractionDigits:2 })} TUPAN
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 20px 16px" }}>
          <div style={{ background:"#fff", borderRadius:12, padding:12, marginBottom:14, boxShadow:"0 0 32px rgba(163,224,0,0.15)" }}>
            <PixQrCode size={200}/>
          </div>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.5)", marginBottom:0 }}>Escaneie o QR Code com o app do seu banco</p>
        </div>

        {/* Divider */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 20px", marginBottom:16 }}>
          <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.4)", letterSpacing:2 }}>OU</span>
          <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
        </div>

        {/* Chave PIX */}
        <div style={{ padding:"0 20px", marginBottom:10 }}>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(163,224,0,0.5)", letterSpacing:1.5, marginBottom:6 }}>CHAVE PIX (E-MAIL)</p>
          <div style={{ display:"flex", gap:8, alignItems:"center", background:"rgba(0,0,0,0.3)", border:"1px solid rgba(163,224,0,0.18)", borderRadius:10, padding:"10px 14px" }}>
            <span style={{ flex:1, fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color:"#A3E000", wordBreak:"break-all" }}>{PIX_KEY}</span>
            <button onClick={() => copy(PIX_KEY, setCopiedKey)} style={{ background: copiedKey ? "rgba(163,224,0,0.15)" : "rgba(163,224,0,0.12)", border:"1px solid rgba(163,224,0,0.28)", borderRadius:6, padding:"6px 12px", fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:"#A3E000", cursor:"pointer", whiteSpace:"nowrap", transition:"all .2s" }}>
              {copiedKey ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        {/* Copia e Cola completo */}
        <div style={{ padding:"0 20px", marginBottom:20 }}>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(163,224,0,0.5)", letterSpacing:1.5, marginBottom:6 }}>PIX COPIA E COLA</p>
          <div style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"10px 14px", marginBottom:8 }}>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.55)", wordBreak:"break-all", lineHeight:1.6, margin:0 }}>{PIX_CHAVE}</p>
          </div>
          <button
            onClick={() => copy(PIX_CHAVE, setCopied)}
            style={{
              width:"100%", background: copied ? "rgba(163,224,0,0.15)" : "linear-gradient(135deg,#A3E000,#7ab800)",
              border: copied ? "1px solid rgba(163,224,0,0.4)" : "none",
              borderRadius:12, padding:"14px",
              fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:800,
              color: copied ? "#A3E000" : "#050a07",
              cursor:"pointer", letterSpacing:.5, textTransform:"uppercase" as const,
              transition:"all .2s",
              boxShadow: copied ? "none" : "0 0 28px rgba(163,224,0,0.35)",
            }}
          >
            {copied ? "✓ Código Copiado!" : "📋 Copiar Código PIX"}
          </button>
        </div>

        {/* Footer */}
        <div style={{ padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,0.05)", background:"rgba(0,0,0,0.2)", textAlign:"center" }}>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.35)", lineHeight:1.7 }}>
            Após o pagamento, os tokens TUPAN serão enviados em até 24h.<br/>
            Dúvidas? Entre em contato via Telegram.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Types ──
interface Token {
  sym: string;
  name: string;
  colorClass: string;
  emoji: string;
  price: number;
}

const TOKENS: Token[] = [
  { sym: "BRL",  name: "Real Brasileiro",   colorClass: "t-brl",  emoji: "R$", price: 0.2 },
  { sym: "TUPAN", name: "Tupan Token",      colorClass: "t-tupan", emoji: "⬡", price: 0.2 },
  { sym: "ETH",  name: "Ethereum",         colorClass: "t-eth",  emoji: "Ξ",  price: 3420 },
  { sym: "USDC", name: "USD Coin",          colorClass: "t-usdc", emoji: "$",  price: 1 },
  { sym: "USDT", name: "Tether",            colorClass: "t-usdt", emoji: "₮",  price: 1 },
  { sym: "BNB",  name: "BNB",               colorClass: "t-bnb",  emoji: "⬡",  price: 580 },
  { sym: "BTC",  name: "Bitcoin (wrapped)", colorClass: "t-btc",  emoji: "₿",  price: 67500 },
  { sym: "UNI",  name: "Uniswap",           colorClass: "t-uni",  emoji: "🦄", price: 8.4 },
];

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ETH diamond SVG
const EthDiamond = () => (
  <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
    <path d="M16 4 L9 17.5 L16 21 L23 17.5 Z" fill="rgba(255,255,255,.9)" />
    <path d="M9 17.5 L16 28 L23 17.5 L16 21 Z" fill="rgba(255,255,255,.6)" />
    <path d="M16 4 L16 21 L23 17.5 Z" fill="rgba(255,255,255,.4)" />
    <path d="M16 4 L16 21 L9 17.5 Z" fill="rgba(255,255,255,.7)" />
  </svg>
);

interface TokenIconProps { token: Token; size?: number }
const TokenIcon = ({ token, size = 26 }: TokenIconProps) => (
  <div
    className={`token-icon-swap ${token.colorClass}`}
    style={{ width: size, height: size, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}
  >
    {token.sym === "ETH" ? <EthDiamond /> : (
      <span style={{ fontSize: size * 0.55, fontWeight: 700, color: "#fff" }}>{token.emoji}</span>
    )}
  </div>
);

export default function Transacao() {
  const [sellToken, setSellToken] = useState<Token>(TOKENS[0]); // BRL
  const [buyToken, setBuyToken]   = useState<Token | null>(TOKENS[1]); // TUPAN
  const [sellAmt, setSellAmt]     = useState("");
  const [buyAmt, setBuyAmt]       = useState("");
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [pixOpen, setPixOpen]     = useState(false);
  const pixAmount = sellToken.sym === "BRL" ? sellAmt : buyAmt;

  // ── Fiat label ──
  const fiatLabel = (token: Token | null, val: string) => {
    if (!token || !val || isNaN(parseFloat(val))) return "R$ 0,00";
    return "R$ " + formatBRL(parseFloat(val) * token.price);
  };

  // ── Sell input ──
  const onSellChange = useCallback((val: string) => {
    setSellAmt(val);
    if (buyToken && val && !isNaN(parseFloat(val))) {
      setBuyAmt((parseFloat(val) * sellToken.price / buyToken.price).toFixed(6));
    } else {
      setBuyAmt("");
    }
  }, [buyToken, sellToken]);

  // ── Buy input ──
  const onBuyChange = useCallback((val: string) => {
    setBuyAmt(val);
    if (buyToken && val && !isNaN(parseFloat(val))) {
      setSellAmt((parseFloat(val) * buyToken.price / sellToken.price).toFixed(6));
    }
  }, [buyToken, sellToken]);

  // ── Swap arrow (disabled — fixed pair) ──
  const swapTokens = () => {
    const prevSell = sellToken;
    const prevBuy  = buyToken!;
    setSellToken(prevBuy);
    setBuyToken(prevSell);
    setSellAmt(buyAmt);
    setBuyAmt(sellAmt);
  };

  // ── Action button ──
  const actionState = (!sellAmt || parseFloat(sellAmt) <= 0) ? "enter" : "ready";
  const actionLabel = actionState === "enter" ? "Digite um valor" : "Comprar TUPAN";

  const handleAction = () => {
    if (actionState === "enter") { return; }
    setPixOpen(true);
  };

  // ── Wallet ──
  const connectWallet = () => {
    const eth = (window as any).ethereum;
    if (eth) {
      eth.request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          const addr = accounts[0];
          alert(`Conectado: ${addr.slice(0,6)}...${addr.slice(-4)}`);
        })
        .catch(() => alert("Conexão recusada"));
    } else {
      alert("Nenhuma carteira Web3 detectada.\nInstale a MetaMask para continuar.");
    }
  };

  return (
    <>
      {pixOpen && <PixModal amount={pixAmount} onClose={() => setPixOpen(false)} />}
      <style>{`
        .swap-page { font-family: 'Space Grotesk', 'DM Sans', sans-serif; background: #061004; color: #fff; min-height: 100vh; display: flex; flex-direction: column; }
        .swap-topbar { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:#061004; border-bottom: 1px solid rgba(172,210,66,0.14); }
        .swap-topbar-left { display:flex; align-items:center; gap:14px; }
        .swap-logo { width:36px; height:36px; display:flex; align-items:center; justify-content:center; }
        .swap-hamburger { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; gap:5px; padding:4px; }
        .swap-hamburger span { display:block; width:20px; height:2px; background:#acd242; border-radius:2px; }
        .swap-topbar-center { display:flex; align-items:center; gap:18px; }
        .swap-icon-btn { background:none; border:none; cursor:pointer; color:#acd242; font-size:18px; opacity:.8; display:flex; align-items:center; justify-content:center; }
        .swap-icon-btn:hover { opacity:1; }
        .swap-connect-btn { background:#acd242; border:none; border-radius:20px; color:#061004; font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700; padding:9px 20px; cursor:pointer; transition:background .18s; }
        .swap-connect-btn:hover { background:#c8e855; }
        .swap-main { flex:1; display:flex; flex-direction:column; align-items:center; padding:32px 16px 40px; }
        .swap-main h1 { font-size:32px; font-weight:800; line-height:1.2; text-align:center; margin-bottom:28px; max-width:340px; color:#acd242; font-family:'Space Grotesk',sans-serif; text-transform:uppercase; }
        .swap-card { width:100%; max-width:420px; display:flex; flex-direction:column; gap:0; }
        .swap-panel { background:#0c1a09; border-radius:20px; padding:16px 18px 14px; position:relative; border: 1px solid rgba(172,210,66,0.14); }
        .swap-panel-label { font-size:15px; font-weight:500; color:#9aaa8e; margin-bottom:10px; }
        .swap-panel-row { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .swap-amount-input { background:none; border:none; outline:none; font-family:'Space Grotesk',sans-serif; font-size:36px; font-weight:400; color:#fff; width:0; flex:1; min-width:0; }
        .swap-amount-input::placeholder { color:#9aaa8e; }
        .swap-amount-input::-webkit-inner-spin-button,.swap-amount-input::-webkit-outer-spin-button { -webkit-appearance:none; }
        .swap-fiat { font-size:14px; color:#9aaa8e; margin-top:6px; }
        .swap-token-sel { display:flex; align-items:center; gap:8px; background:rgba(172,210,66,0.1); border:1px solid rgba(172,210,66,0.3); border-radius:999px; color:#acd242; font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:700; padding:8px 14px 8px 8px; cursor:pointer; transition:background .18s; white-space:nowrap; flex-shrink:0; }
        .swap-token-sel:hover { background:rgba(172,210,66,0.18); }
        .swap-chevron { font-size:12px; opacity:.7; margin-left:2px; }
        .swap-select-btn { display:flex; align-items:center; gap:8px; background:#acd242; border:none; border-radius:999px; color:#061004; font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700; padding:10px 18px; cursor:pointer; transition:background .18s; white-space:nowrap; flex-shrink:0; }
        .swap-select-btn:hover { background:#c8e855; }
        .swap-divider { display:flex; align-items:center; justify-content:center; height:0; position:relative; z-index:2; margin:-1px 0; }
        .swap-arrow-btn { width:40px; height:40px; background:#091507; border:3px solid #061004; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s,transform .18s; color:#acd242; }
        .swap-arrow-btn:hover { background:#0c1a09; transform:rotate(180deg); }
        .swap-action-btn { width:100%; background:rgba(172,210,66,0.08); border:1px solid rgba(172,210,66,0.2); border-radius:20px; color:#acd242; font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:700; padding:18px; cursor:pointer; margin-top:6px; transition:background .18s,color .18s; letter-spacing:.01em; text-transform:uppercase; }
        .swap-action-btn:hover { background:rgba(172,210,66,0.14); }
        .swap-action-btn.ready { background:#acd242; color:#061004; border-color:#acd242; }
        .swap-action-btn.ready:hover { background:#c8e855; }
        .swap-footer-text { margin-top:24px; font-size:14px; color:#9aaa8e; text-align:center; line-height:1.6; max-width:340px; }
        .swap-footer-text a { color:#acd242; text-decoration:none; font-weight:600; }
        .swap-footer-text a:hover { text-decoration:underline; }
        .swap-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:50; align-items:flex-end; justify-content:center; }
        .swap-modal-overlay.open { display:flex; animation:swapFadeIn .18s ease; }
        @keyframes swapFadeIn { from{opacity:0} to{opacity:1} }
        .swap-modal { background:#0c1a09; border:1px solid rgba(172,210,66,0.2); border-radius:24px 24px 0 0; width:100%; max-width:420px; padding:24px 20px 32px; animation:swapSlideUp .22s ease; }
        @keyframes swapSlideUp { from{transform:translateY(60px);opacity:0} to{transform:translateY(0);opacity:1} }
        .swap-modal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
        .swap-modal-header h3 { font-size:18px; font-weight:700; color:#acd242; font-family:'Space Grotesk',sans-serif; }
        .swap-modal-close { background:rgba(172,210,66,0.1); border:1px solid rgba(172,210,66,0.2); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#acd242; font-size:16px; }
        .swap-modal-close:hover { background:rgba(172,210,66,0.2); }
        .swap-token-search { width:100%; background:#091507; border:1px solid rgba(172,210,66,0.2); border-radius:14px; color:#fff; font-family:'Space Grotesk',sans-serif; font-size:15px; padding:12px 16px; outline:none; margin-bottom:16px; }
        .swap-token-search::placeholder { color:#9aaa8e; }
        .swap-token-list { display:flex; flex-direction:column; gap:2px; max-height:320px; overflow-y:auto; }
        .swap-token-list::-webkit-scrollbar { width:4px; }
        .swap-token-list::-webkit-scrollbar-track { background:transparent; }
        .swap-token-list::-webkit-scrollbar-thumb { background:rgba(172,210,66,0.3); border-radius:4px; }
        .swap-token-item { display:flex; align-items:center; gap:12px; padding:12px 10px; border-radius:14px; cursor:pointer; transition:background .14s; }
        .swap-token-item:hover { background:rgba(172,210,66,0.07); }
        .swap-token-item-icon { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
        .swap-token-item-info { flex:1; }
        .swap-token-item-name { font-size:15px; font-weight:700; color:#acd242; }
        .swap-token-item-full { font-size:13px; color:#9aaa8e; }
        .swap-token-item-bal { font-size:14px; color:#9aaa8e; }
        .t-eth  { background:radial-gradient(circle at 40% 35%,#8da8ff,#435cc8); }
        .t-usdc { background:radial-gradient(circle at 40% 35%,#6ab3f3,#2776ca); }
        .t-usdt { background:radial-gradient(circle at 40% 35%,#53ae94,#1a7a62); }
        .t-bnb  { background:radial-gradient(circle at 40% 35%,#f3ba2f,#c9960e); }
        .t-btc  { background:radial-gradient(circle at 40% 35%,#f7931a,#c96a00); }
        .t-uni   { background:radial-gradient(circle at 40% 35%,#acd242,#0e6600); }
        .t-brl   { background:radial-gradient(circle at 40% 35%,#00a859,#004d2c); }
        .t-tupan { background:radial-gradient(circle at 40% 35%,#A3E000,#1F591E); }
      `}</style>

      <div className="swap-page">

        {/* ── TOP BAR ── */}
        <header className="swap-topbar">
          <div className="swap-topbar-left">
            <button className="swap-hamburger">
              <span /><span /><span />
            </button>
          </div>

          <button className="swap-connect-btn" onClick={connectWallet}>Conectar</button>
        </header>

        {/* ── CALCULADORA ── */}
        <CalculadoraSection />

      </div>
    </>
  );
}
