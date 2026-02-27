import { useEffect, useRef } from "react";
import {
  Palette, Users, Shield, Settings, Award, Clock, HeartHandshake,
} from "lucide-react";

const reasons = [
  { icon: Palette, title: "Customized Designs", desc: "Every project is uniquely designed to match your space, taste and lifestyle." },
  { icon: Users, title: "Expert Designers", desc: "Experienced design professionals with a keen eye for detail and aesthetics." },
  { icon: Shield, title: "Premium Quality Materials", desc: "BWR Marine Ply and top-grade hardware for lasting durability." },
  { icon: Settings, title: "Modern Accessories & Hardware", desc: "Imported hardware with soft-close mechanisms and smooth functionality." },
  { icon: Award, title: "10-Year Kitchen Warranty", desc: "Industry-leading warranty on all modular kitchen installations." },
  { icon: Clock, title: "5-Year Wardrobe Warranty", desc: "Backed by our commitment to quality with comprehensive support." },
  { icon: HeartHandshake, title: "On-Site Support", desc: "Dedicated support team available for post-installation assistance." },
];

export default function WhyUs() {
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
    <section ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Our Promise</p>
          <h2 className="section-title">Why Choose Enzo?</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 flex gap-4 items-start p-6 rounded-2xl border border-border group hover:border-gold/40"
              style={{
                background: "hsl(var(--card))",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: "hsl(var(--gold) / 0.12)" }}
              >
                <r.icon size={20} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-sm mb-1" style={{ color: "hsl(var(--brown))" }}>
                  {r.title}
                </h3>
                <p className="font-poppins text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
