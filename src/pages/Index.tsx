import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PressSection from "@/components/PressSection";
import CalculadoraSection from "@/components/CalculadoraSection";
import MapaLastroSection from "@/components/MapaLastroSection";
import LogosSection from "@/components/LogosSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 60);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Sticky nav shadow
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        nav.style.boxShadow =
          window.scrollY > 10 ? "0 4px 24px rgba(0,0,0,0.4)" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)" }}>
      <HeroSection />
      <PressSection />
      <hr className="hr" />
      <CalculadoraSection />
      <hr className="hr" />
      <MapaLastroSection />
      <hr className="hr" />
      <LogosSection />
      <hr className="hr" />
      <HowItWorks />
      <hr className="hr" />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
