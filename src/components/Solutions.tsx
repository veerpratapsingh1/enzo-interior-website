import { useEffect, useRef } from "react";
import kitchen1 from "@/assets/kitchen1.jpg";
import kitchen2 from "@/assets/kitchen2.jpg";
import bedroom1 from "@/assets/bedroom1.jpg";

const solutions = [
  {
    title: "1 BHK Homes",
    img: kitchen2,
    items: ["Modular Kitchen", "1 Wardrobe", "Storage Units", "TV Unit"],
  },
  {
    title: "2 BHK Homes",
    img: kitchen1,
    items: ["Modular Kitchen", "2 Wardrobes", "Crockery Unit", "TV Unit", "Foyer Storage"],
  },
  {
    title: "3 BHK Homes",
    img: bedroom1,
    items: ["Modular Kitchen", "3 Wardrobes", "Dressing Unit", "Multiple Storage", "Full Home Design"],
    highlight: true,
  },
];

export default function Solutions() {
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
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: "hsl(var(--cream))" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Interior Solutions</p>
          <h2 className="section-title">Complete Packages for Every Home</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-2xl mx-auto">
            End-to-end interior solutions including modular kitchen, wardrobes, beds and storage units designed with premium materials and modern finishes. Each project is fully customized based on space and design requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 rounded-2xl overflow-hidden group"
              style={{
                boxShadow: s.highlight ? "var(--shadow-luxury)" : "var(--shadow-card)",
                border: s.highlight ? "2px solid hsl(var(--gold) / 0.4)" : "2px solid transparent",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {s.highlight && (
                  <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-poppins font-semibold tracking-wider" style={{ background: "hsl(var(--gold))", color: "white" }}>
                    POPULAR
                  </div>
                )}
              </div>
              <div className="p-6" style={{ background: "hsl(var(--background))" }}>
                <h3 className="font-montserrat font-bold text-xl mb-4" style={{ color: "hsl(var(--brown))" }}>
                  {s.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 font-poppins text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--gold))", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-gold w-full text-center block py-3 text-sm">
                  Get Free Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
