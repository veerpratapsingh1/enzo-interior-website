import { useEffect, useRef } from "react";
import { ChefHat, ShoppingBag, Home, Armchair, MessageSquare, Wrench } from "lucide-react";

const services = [
  {
    icon: ChefHat,
    title: "Modular Kitchen Design",
    desc: "Custom-crafted modular kitchens with premium materials, smart storage solutions and elegant finishes.",
  },
  {
    icon: ShoppingBag,
    title: "Modular Wardrobes",
    desc: "Space-optimized wardrobe solutions with sliding doors, internal lighting and organized compartments.",
  },
  {
    icon: Home,
    title: "Complete Home Interiors",
    desc: "End-to-end interior solutions from concept to installation for every room in your home.",
  },
  {
    icon: Armchair,
    title: "Custom Furniture",
    desc: "Bespoke furniture crafted to your exact space requirements and aesthetic preferences.",
  },
  {
    icon: MessageSquare,
    title: "Interior Consultation",
    desc: "Expert design consultation to understand your vision, lifestyle and create the perfect plan.",
  },
  {
    icon: Wrench,
    title: "On-Site Installation",
    desc: "Professional installation by trained technicians with strict quality checks and timely delivery.",
  },
];

export default function Services() {
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
    <section id="services" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">What We Offer</p>
          <h2 className="section-title">Our Services</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-xl mx-auto">
            Comprehensive interior solutions tailored to your lifestyle, space and design aspirations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 group p-8 rounded-2xl border border-border hover:border-gold/40 cursor-default"
              style={{
                background: "hsl(var(--card))",
                boxShadow: "var(--shadow-card)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "hsl(var(--gold) / 0.15)" }}
              >
                <s.icon size={26} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <h3 className="font-montserrat font-semibold text-lg mb-3" style={{ color: "hsl(var(--brown))" }}>
                {s.title}
              </h3>
              <p className="font-poppins text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
