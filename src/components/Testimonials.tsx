import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Vasai, Maharashtra",
    text: "Enzo Modular transformed our kitchen completely. The designs were exactly what we envisioned and the quality is outstanding. Mamta di and her team were incredibly professional throughout.",
    rating: 5,
  },
  {
    name: "Rajesh Patil",
    location: "Virar, Maharashtra",
    text: "We got our complete 3 BHK interior done from Enzo and we couldn't be happier. From wardrobe to kitchen, everything is premium quality. The 10-year warranty gives us great peace of mind.",
    rating: 5,
  },
  {
    name: "Sneha Mehta",
    location: "Nalasopara, Maharashtra",
    text: "Absolutely loved working with the Enzo team. They understood our design requirements perfectly and delivered on time. The modular kitchen looks stunning and is very functional.",
    rating: 5,
  },
  {
    name: "Amit Joshi",
    location: "Vasai East, Maharashtra",
    text: "Professional, creative and reliable. The team at Enzo gave us exactly the luxury feel we wanted within our budget. Highly recommend for anyone looking for quality interiors.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section ref={ref} className="py-20 md:py-28 relative z-10" style={{ background: "hsl(var(--cream))" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Client Stories</p>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="gold-divider" />
        </div>

        <div className="max-w-3xl mx-auto reveal opacity-0 translate-y-8 transition-all duration-700">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{ background: "hsl(var(--background))", boxShadow: "var(--shadow-luxury)" }}
          >
            {/* Quote mark */}
            <div
              className="font-montserrat text-8xl font-bold leading-none mb-2 select-none"
              style={{ color: "hsl(var(--gold) / 0.2)" }}
            >
              "
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4 justify-center">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={16} fill="hsl(var(--gold))" style={{ color: "hsl(var(--gold))" }} />
              ))}
            </div>

            {/* Testimonial text — fixed min-height to avoid layout shift */}
            <div style={{ minHeight: "100px" }}>
              <p className="font-poppins text-base md:text-lg text-muted-foreground leading-relaxed mb-6 italic transition-opacity duration-300">
                {t.text}
              </p>
            </div>

            <div>
              <p className="font-montserrat font-semibold" style={{ color: "hsl(var(--brown))" }}>
                {t.name}
              </p>
              <p className="font-poppins text-xs text-muted-foreground">{t.location}</p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-8 items-center">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-yellow-500/40 transition-colors"
              >
                <ChevronLeft size={18} style={{ color: "hsl(var(--gold))" }} />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "1.5rem" : "0.5rem",
                      height: "0.5rem",
                      background: i === current ? "hsl(var(--gold))" : "hsl(var(--border))",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-yellow-500/40 transition-colors"
              >
                <ChevronRight size={18} style={{ color: "hsl(var(--gold))" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
