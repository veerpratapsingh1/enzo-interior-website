import { useEffect, useRef } from "react";
import { CalendarCheck, PenLine, Layers, Factory, Hammer } from "lucide-react";

const steps = [
  { icon: CalendarCheck, step: "01", title: "Book Consultation", desc: "Schedule a free home visit or office consultation with our design team." },
  { icon: PenLine, step: "02", title: "Design Planning", desc: "Our designers create a customized 3D plan based on your space and preferences." },
  { icon: Layers, step: "03", title: "Material Selection", desc: "Choose from our curated collection of finishes, hardware and accessories." },
  { icon: Factory, step: "04", title: "Production", desc: "Your modules are precision-crafted in our factory with quality control at every step." },
  { icon: Hammer, step: "05", title: "Installation", desc: "Professional installation by our skilled team with timely, clean delivery." },
];

export default function Process() {
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
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden" style={{ background: "hsl(var(--brown))" }}>
      {/* Decorative */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--gold)) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">How It Works</p>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-3 text-white">
            Our Work Process
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "hsl(var(--gold) / 0.15)", border: "1px solid hsl(var(--gold) / 0.3)" }}
              >
                <s.icon size={30} style={{ color: "hsl(var(--gold))" }} />
                <span
                  className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-montserrat font-bold"
                  style={{ background: "hsl(var(--gold))", color: "white" }}
                >
                  {s.step}
                </span>
              </div>
              <h3 className="font-montserrat font-semibold text-base mb-2 text-white">{s.title}</h3>
              <p className="font-poppins text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
