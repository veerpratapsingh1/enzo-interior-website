import kitchen1 from "@/assets/kitchen1.jpg";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: "500+", label: "Projects Completed" },
    { num: "10+", label: "Years Experience" },
    { num: "10yr", label: "Kitchen Warranty" },
    { num: "100%", label: "Customized" },
  ];

  return (
    <section id="about" ref={ref} className="py-20 md:py-28" style={{ background: "hsl(var(--cream))" }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-luxury)" }}>
              <img src={kitchen1} alt="Enzo Modular Kitchen" className="w-full h-[450px] object-cover" />
              <div
                className="absolute bottom-6 right-6 rounded-xl px-6 py-4 text-center"
                style={{ background: "hsl(var(--gold))", color: "white" }}
              >
                <div className="font-montserrat font-bold text-2xl">10+</div>
                <div className="text-xs tracking-wider font-poppins">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <p className="section-subtitle">About Us</p>
            <h2 className="section-title mb-6">
              Crafting Spaces That<br />
              <span className="gold-shimmer">Inspire & Delight</span>
            </h2>
            <p className="font-poppins text-muted-foreground leading-relaxed mb-6">
              Enzo Modular & Interiors brings together creative designs, expert craftsmanship and modern technology to deliver stylish and functional interiors. We specialize in modular kitchens, wardrobes and complete home interior solutions customized according to space, lifestyle and preferences.
            </p>
            <p className="font-poppins text-muted-foreground leading-relaxed mb-8">
              Every project we undertake is a testament to our commitment to quality, using only the finest materials like BWR Marine Ply and premium hardware for lasting beauty and durability.
            </p>
            <a href="#contact" className="btn-gold">Schedule Free Home Visit</a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center py-8 rounded-2xl"
              style={{
                background: "hsl(var(--background))",
                boxShadow: "var(--shadow-card)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="font-montserrat font-bold text-3xl mb-1" style={{ color: "hsl(var(--gold))" }}>
                {s.num}
              </div>
              <div className="font-poppins text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
