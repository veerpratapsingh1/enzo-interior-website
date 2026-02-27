import heroVideo from "@/assets/hero-video.mp4";
import kitchen1 from "@/assets/kitchen1.jpg";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={kitchen1}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={heroVideo} type="video/mp4" />
        {/* Fallback image if video fails */}
        <img src={kitchen1} alt="Modular Kitchen Interior" className="absolute inset-0 w-full h-full object-cover" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
        <p className="text-sm font-poppins tracking-[0.4em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>
          Premium Interiors
        </p>
        <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
          Enzo Modular & Interiors
        </h1>
        <p className="font-montserrat text-2xl md:text-3xl font-light text-white/90 mb-4 italic">
          Make Space For Wow
        </p>
        <div className="w-24 h-px mx-auto mb-6" style={{ background: "hsl(var(--gold))" }} />
        <p className="font-poppins text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto">
          Premium Modular Kitchens, Wardrobes & Complete Home Interior Solutions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-gold px-8 py-4 text-sm tracking-widest uppercase">
            Book Free Consultation
          </a>
          <a
            href="#gallery"
            className="btn-outline-gold px-8 py-4 text-sm tracking-widest uppercase"
            style={{ borderColor: "white", color: "white" }}
          >
            Explore Designs
          </a>
        </div>
      </div>

      {/* Scroll down */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-xs tracking-widest uppercase font-poppins">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
