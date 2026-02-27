import finishLaminate from "@/assets/finish-laminate.jpg";
import finishAcrylic from "@/assets/finish-acrylic.jpg";
import finishPu from "@/assets/finish-pu.jpg";
import finishMembrane from "@/assets/finish-membrane.jpg";
import finishGlass from "@/assets/finish-glass.jpg";
import { useEffect, useRef } from "react";

const finishes = [
  {
    name: "Laminate Finish",
    desc: "Durable & scratch-resistant with wood-grain and solid color options.",
    img: finishLaminate,
  },
  {
    name: "Acrylic Finish",
    desc: "High-gloss mirror-like surface for a sleek modern look.",
    img: finishAcrylic,
  },
  {
    name: "PU Finish",
    desc: "Polyurethane painted finish for ultra-smooth matte or gloss surfaces.",
    img: finishPu,
  },
  {
    name: "Membrane Finish",
    desc: "Soft-touch wrapping with curved edge profiles for a seamless look.",
    img: finishMembrane,
  },
  {
    name: "Glass Finish",
    desc: "Backlit or frosted glass panels for a premium contemporary feel.",
    img: finishGlass,
  },
];

export default function Finishes() {
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
          <p className="section-subtitle">Material Options</p>
          <h2 className="section-title">Kitchen Finishes</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-xl mx-auto">
            Choose from our curated range of premium finish options for your modular kitchen.
          </p>
        </div>

        {/* Mobile: horizontal scroll | Desktop: 5-column grid */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:overflow-x-visible md:grid md:grid-cols-5 snap-x snap-mandatory md:snap-none">
          {finishes.map((f, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 snap-start flex-shrink-0 w-56 md:w-auto group rounded-2xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: "var(--shadow-card)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Fixed-height image container */}
              <div className="relative overflow-hidden" style={{ height: "180px" }}>
                <img
                  src={f.img}
                  alt={f.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Card content */}
              <div className="p-5" style={{ background: "hsl(var(--background))" }}>
                <h3
                  className="font-montserrat font-semibold text-sm mb-1"
                  style={{ color: "hsl(var(--brown))" }}
                >
                  {f.name}
                </h3>
                <p className="font-poppins text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
