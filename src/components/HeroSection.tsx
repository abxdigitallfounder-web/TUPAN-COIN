import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-black"
      style={{ minHeight: "100dvh" }}
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://player.vimeo.com/video/1172678480?background=1&autoplay=1&loop=1&muted=1&controls=0"
          allow="autoplay; fullscreen"
          frameBorder="0"
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "177.78vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            opacity: 0.45,
          }}
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.90) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-col items-center w-full px-4"
        style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 120 }}
      >
        {/* Headline */}
        <h1
          className="text-white font-extrabold text-center leading-snug mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(22px, 5.5vw, 40px)",
            letterSpacing: "-0.5px",
            textShadow: "0 4px 24px rgba(0,0,0,0.7)",
          }}
        >
          Seu token planta uma árvore, protege a Amazônia e converte a venda de{" "}
          <span
            style={{
              color: "#00e676",
              textShadow: "0 0 40px rgba(0,230,118,0.5)",
            }}
          >
            créditos de carbono
          </span>{" "}
          em lucro no seu bolso.
        </h1>

        {/* VSL card */}
        <div
          className="w-full rounded-xl overflow-hidden mb-7"
          style={{
            aspectRatio: "16/9",
            position: "relative",
            background: "#000",
            border: "1px solid rgba(0,230,118,0.5)",
            boxShadow: "0 0 20px rgba(0,230,118,0.2), 0 8px 40px rgba(0,0,0,0.8)",
          }}
        >
          {/* top glow line */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, #00e676, transparent)",
            }}
          />
          <iframe
            src="https://player.vimeo.com/video/1172678480?autoplay=1&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0"
            allow="autoplay; fullscreen; picture-in-picture"
            frameBorder="0"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* CTA buttons */}
        <a
          href="/transacao"
          className="w-full text-center font-bold uppercase py-4 rounded-md mb-4 transition-colors"
          style={{
            background: "#9acc14",
            color: "#000",
            letterSpacing: "1.5px",
            fontSize: 15,
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#86b311")}
          onMouseOut={e => (e.currentTarget.style.background = "#9acc14")}
        >
          COMPRAR TUPAN AGORA
        </a>

        <a
          href="/#calculadora"
          className="w-full text-center font-bold uppercase py-4 rounded-md backdrop-blur-md transition-colors"
          style={{
            background: "rgba(0,0,0,0.30)",
            border: "1px solid rgba(154,204,20,0.5)",
            color: "#9acc14",
            letterSpacing: "1.5px",
            fontSize: 15,
          }}
        >
          CALCULAR LUCROS
        </a>
      </div>

      {/* ── Authority footer ── */}
      <div className="absolute bottom-6 w-full flex flex-col items-center z-10">
        <p
          className="uppercase text-center mb-3"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9,
            letterSpacing: "3px",
            color: "rgba(200,220,210,0.55)",
          }}
        >
          COBERTURA INTERNACIONAL
        </p>
        {/* Marquee wrapper */}
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div
            className="flex items-center gap-12"
            style={{
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}
          >
            {[
              { name: "Bloomberg",           src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_bloomberg_logo.svg/1200px-New_bloomberg_logo.svg.png" },
              { name: "Wall Street Journal", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/1200px-WSJ_Logo.svg.png" },
              { name: "Financial Times",     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Financial_Times_corporate_logo_%28no_background%29.svg/1200px-Financial_Times_corporate_logo_%28no_background%29.svg.png" },
              { name: "Reuters",             src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Reuters_logo.svg/1200px-Reuters_logo.svg.png" },
              { name: "Forbes",              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Forbes_logo.svg/1200px-Forbes_logo.svg.png" },
              { name: "CNBC",                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/1200px-CNBC_logo.svg.png" },
              { name: "The Economist",       src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Economist_Logo.svg/1200px-The_Economist_Logo.svg.png" },
              { name: "MarketWatch",         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/MarketWatch_Logo.svg/1200px-MarketWatch_Logo.svg.png" },
              { name: "Barron's",            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Barrons_logo.svg/1200px-Barrons_logo.svg.png" },
              { name: "Investopedia",        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Investopedia_Logo.svg/1200px-Investopedia_Logo.svg.png" },
              // duplicate for seamless loop
              { name: "Bloomberg",           src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_bloomberg_logo.svg/1200px-New_bloomberg_logo.svg.png" },
              { name: "Wall Street Journal", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/1200px-WSJ_Logo.svg.png" },
              { name: "Financial Times",     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Financial_Times_corporate_logo_%28no_background%29.svg/1200px-Financial_Times_corporate_logo_%28no_background%29.svg.png" },
              { name: "Reuters",             src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Reuters_logo.svg/1200px-Reuters_logo.svg.png" },
              { name: "Forbes",              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Forbes_logo.svg/1200px-Forbes_logo.svg.png" },
              { name: "CNBC",                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/1200px-CNBC_logo.svg.png" },
              { name: "The Economist",       src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Economist_Logo.svg/1200px-The_Economist_Logo.svg.png" },
              { name: "MarketWatch",         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/MarketWatch_Logo.svg/1200px-MarketWatch_Logo.svg.png" },
              { name: "Barron's",            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Barrons_logo.svg/1200px-Barrons_logo.svg.png" },
              { name: "Investopedia",        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Investopedia_Logo.svg/1200px-Investopedia_Logo.svg.png" },
            ].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-8 min-w-[100px]"
                style={{ opacity: 0.4 }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-6 max-w-[110px] object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fb = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "block";
                  }}
                />
                <span
                  className="text-white font-bold uppercase text-xs tracking-widest font-mono"
                  style={{ display: "none" }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

