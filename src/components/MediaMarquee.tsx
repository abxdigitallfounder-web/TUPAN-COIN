const mediaOutlets = [
  {
    name: "Bloomberg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_bloomberg_logo.svg/1024px-New_bloomberg_logo.svg.png",
  },
  {
    name: "Wall Street Journal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/1024px-WSJ_Logo.svg.png",
  },
  {
    name: "Financial Times",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Financial_Times_corporate_logo_%28no_background%29.svg/1024px-Financial_Times_corporate_logo_%28no_background%29.svg.png",
  },
  {
    name: "Reuters",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Reuters_2024.svg/1024px-Reuters_2024.svg.png",
  },
  {
    name: "Forbes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Forbes_logo.svg/1024px-Forbes_logo.svg.png",
  },
  {
    name: "CNBC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/1024px-CNBC_logo.svg.png",
  },
  {
    name: "The Economist",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Economist_Logo.svg/1024px-The_Economist_Logo.svg.png",
  },
  {
    name: "MarketWatch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/MarketWatch_Logo.svg/1024px-MarketWatch_Logo.svg.png",
  },
  {
    name: "Barron's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Barrons_logo.svg/1024px-Barrons_logo.svg.png",
  },
  {
    name: "Investopedia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Investopedia_Logo.svg/1024px-Investopedia_Logo.svg.png",
  },
];

const MediaMarquee = () => {
  // Duplicate the list for seamless infinite loop
  const items = [...mediaOutlets, ...mediaOutlets];

  return (
    <section className="py-4 relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--t-bg, #0A110D), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--t-bg, #0A110D), transparent)" }} />

      <div className="mb-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa] font-mono">
          Cobertura Internacional
        </p>
      </div>

      <div
        className="flex gap-12 items-center"
        style={{
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((outlet, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-8 min-w-[100px] opacity-40 hover:opacity-90 transition-opacity duration-300 cursor-default"
          >
            <img
              src={outlet.logo}
              alt={outlet.name}
              className="max-h-6 max-w-[100px] object-contain filter brightness-0 invert"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <span className="text-white font-bold text-xs tracking-widest uppercase font-mono hidden">
              {outlet.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default MediaMarquee;
