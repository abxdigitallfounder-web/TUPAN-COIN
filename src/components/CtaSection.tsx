const CtaSection = () => (
  <section id="contact" style={{
    padding:"80px 0",
    background:"var(--t-bg)",
    borderTop:"1px solid var(--t-border)",
    position:"relative",
    overflow:"hidden",
  }}>
    {/* bg accent */}
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,255,157,0.04) 0%, transparent 70%)", pointerEvents:"none" }}/>

    <div className="tupan-container" style={{ position:"relative", zIndex:1 }}>
      {/* Terminal header */}
      <div style={{ border:"1px solid var(--t-border)", borderRadius:6, overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderBottom:"1px solid var(--t-border)", background:"rgba(255,255,255,0.02)" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#ff4d6d", display:"inline-block" }}/>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#f5a623", display:"inline-block" }}/>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#00ff9d", display:"inline-block" }}/>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(136,152,170,0.5)", marginLeft:8, letterSpacing:1 }}>TUPAN.PRESALE  ATIVO</span>
        </div>

        <div style={{ padding:"52px 48px", textAlign:"center" }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(0,255,157,0.6)", letterSpacing:3, display:"block", marginBottom:16 }}>
            // PRÉ-VENDA AO VIVO
          </span>

          <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800, fontSize:"clamp(24px,3.5vw,46px)", color:"#fff", marginBottom:12, lineHeight:1.1, letterSpacing:"-0.5px" }}>
            Sua Floresta.<br/>
            <span style={{ color:"var(--t-green)" }}>Seu Rendimento.</span>{" "}
            <span style={{ color:"#f5a623" }}>Em Dólar.</span>
          </h2>

          <p style={{ color:"var(--t-muted)", marginBottom:36, fontSize:15, maxWidth:520, margin:"0 auto 36px" }}>
            Invista no único ativo real que preserva a Amazônia e paga dividendos anuais em USDC. Vagas limitadas na pré-venda.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginBottom:32 }}>
            <a href="https://x-paysmart.com/dec_tct" target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-outline-lg">
              ⬡ COMPRAR TUPAN AGORA
            </a>
            <a href="https://t.me/TupanGlobal" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-outline-lg">
              <i className="fab fa-telegram" style={{ marginRight:6 }}></i> Telegram
            </a>
          </div>

          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              ["Preço","$10.00","var(--t-green)"],
              ["Supply em Pré-Venda","10.000 TUPAN","#fff"],
              ["Dividendo","USDC Anual","#f5a623"],
              ["Auditoria","CertiK 98/100","var(--t-cyan)"],
            ].map(([k,v,c]) => (
              <div key={String(k)} style={{ textAlign:"center" }}>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"rgba(136,152,170,0.5)", letterSpacing:1, marginBottom:3, textTransform:"uppercase" }}>{String(k)}</p>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:14, fontWeight:700, color:c as string }}>{String(v)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaSection;
