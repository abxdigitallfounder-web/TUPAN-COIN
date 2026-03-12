import { ExternalLink } from "lucide-react";

const pressArticles = [
  {
    name: "Forbes",
    label: "REPORTAGEM",
    title: "Como ESG e blockchain podem estar na costura de um agro mais sustentável",
    url: "https://forbes.com.br/forbes-agro/2023/04/como-esg-e-blockchain-podem-estar-na-costura-de-um-agro-mais-sustentavel/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Forbes_logo.svg/1200px-Forbes_logo.svg.png",
    image: "https://forbes.com.br/wp-content/uploads/2023/04/agro_floresta_12abr23_LeoFFreitas_Guettyimages-768x512.jpg",
  },
  {
    name: "InfoMoney",
    label: "MERCADOS",
    title: "Criptomoeda brasileira com estratégia ESG é listada em uma das maiores corretoras",
    url: "https://www.infomoney.com.br/mercados/criptomoeda-brasileira-com-estrategia-esg-mco2-e-listada-em-uma-das-maiores-corretoras-do-mundo/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Infomoney_logo_2020.png",
    image: "https://www.infomoney.com.br/wp-content/uploads/2020/10/GettyImages-943875208.jpg?w=1536&quality=70&strip=all",
  },
  {
    name: "Brazil Economy",
    label: "ESG",
    title: "ESG na Amazônia: Polo de Manaus transforma sustentabilidade em vantagem competitiva",
    url: "https://brazileconomy.com.br/esg/2025/08/esg-na-amazonia-polo-de-manaus-transforma-sustentabilidade-em-vantagem-competitiva/",
    logo: "https://brazileconomy.com.br/wp-content/uploads/2025/02/Logo-Site_BrazilEconomy_Final-5-e1739506692881.png",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
  },
  {
    name: "Ambipar",
    label: "SUSTENTABILIDADE",
    title: "Como as criptos podem ajudar projetos ambientais no Brasil",
    url: "https://ambipar.com/noticias/como-as-criptos-podem-ajudar-projetos-ambientais-no-brasil/",
    logo: "https://ambipar.com/wp-content/uploads/2023/08/Logo-Ambipar-Verde.svg",
    image: "https://ambipar.com/site2020/wp-content/uploads/2024/01/Como-as-Criptos-Podem-Ajudar-Projetos-Ambientais-no-Brasil.jpg",
  },
];

const PressSection = () => {
  return (
    <section className="py-2 relative overflow-hidden" id="press">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f1a11]/20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:px-0 md:mx-0 md:gap-6 hide-scrollbar">
          {pressArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel flex flex-col transition-all duration-300 hover:border-[var(--t-green)] group hover:-translate-y-1 flex-shrink-0 w-[72vw] md:w-auto snap-center md:snap-align-none overflow-hidden"
            >
              {/* Article image with logo overlay */}
              <div className="h-36 w-full relative overflow-hidden border-b border-white/5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Logo badge */}
                <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                  <img
                    src={article.logo}
                    alt={`${article.name} logo`}
                    className="h-4 max-w-[80px] object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <span className="hidden text-xs font-bold text-white uppercase font-mono">{article.name}</span>
                </div>
              </div>

              {/* Text area */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--t-green)] mb-3">
                  {article.label}
                </span>
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-4 flex-grow">
                  {article.title}
                </h3>
                <div className="flex items-center text-[#a1a1aa] text-xs mt-4 group-hover:text-[var(--t-green)] transition-colors">
                  <span>Ler matéria</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;