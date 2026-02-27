import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Why do I need an interior designer?",
    a: "An interior designer helps you plan your space efficiently with professional layouts, material selection and modern designs. This saves time, reduces mistakes and improves overall aesthetics and functionality.",
  },
  {
    q: "What services are included in home interior design?",
    a: "Our services include modular kitchen design, wardrobes, storage solutions, furniture layouts, material selection, installation and complete home interior execution.",
  },
  {
    q: "Do you provide customized modular interiors?",
    a: "Yes, all our designs are fully customized based on space, requirements and style preferences.",
  },
  {
    q: "How long does a home interior project take?",
    a: "Project timelines depend on the size and design scope, but most modular interior projects are completed within a few weeks after final design approval.",
  },
  {
    q: "What materials are used in modular interiors?",
    a: "We use premium quality materials such as BWR marine ply, branded hardware and durable finishes for long-lasting interiors.",
  },
  {
    q: "Do you provide on-site installation?",
    a: "Yes, our professional team provides complete on-site installation and finishing support.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
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
    <section ref={ref} className="py-20 md:py-28" style={{ background: "hsl(var(--background))" }}>
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Got Questions?</p>
          <h2 className="section-title">FAQs About Home Interior Design</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-xl mx-auto">
            Find answers to the most common questions about our interior design services and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 rounded-2xl overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                boxShadow: "var(--shadow-card)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="font-montserrat font-semibold text-sm md:text-base"
                  style={{ color: "hsl(var(--brown))" }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: open === i ? "hsl(var(--gold))" : "hsl(var(--secondary))",
                  }}
                >
                  <ChevronDown
                    size={15}
                    className="transition-transform duration-300"
                    style={{
                      color: open === i ? "white" : "hsl(var(--gold))",
                      transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: open === i ? "300px" : "0px",
                  opacity: open === i ? 1 : 0,
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <div className="px-6 pb-6">
                  <div
                    className="w-12 h-px mb-4"
                    style={{ background: "hsl(var(--gold) / 0.4)" }}
                  />
                  <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
