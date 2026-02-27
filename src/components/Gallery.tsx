import { useEffect, useRef } from "react";
import kitchen1 from "@/assets/kitchen1.jpg";
import kitchen2 from "@/assets/kitchen2.jpg";
import living1 from "@/assets/living1.jpg";
import wardrobe1 from "@/assets/wardrobe1.jpg";
import bedroom1 from "@/assets/bedroom1.jpg";

const items = [
  { img: kitchen1, label: "Modular Kitchen", category: "Kitchen" },
  { img: wardrobe1, label: "Walk-in Wardrobe", category: "Wardrobe" },
  { img: living1, label: "Living Room", category: "Living" },
  { img: bedroom1, label: "Bedroom Interiors", category: "Bedroom" },
  { img: kitchen2, label: "Contemporary Kitchen", category: "Kitchen" },
  { img: wardrobe1, label: "Premium Wardrobe", category: "Wardrobe" },
];

export default function Gallery() {
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
    <section id="gallery" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Our Portfolio</p>
          <h2 className="section-title">Design Gallery</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-xl mx-auto">
            A glimpse into the spaces we've transformed with premium craftsmanship and elegant design.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transitionDelay: `${i * 80}ms`,
                boxShadow: "var(--shadow-card)",
                aspectRatio: i === 0 || i === 3 ? "1/1.2" : "1/1",
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="font-montserrat font-semibold text-base">{item.label}</p>
                <p className="font-poppins text-xs" style={{ color: "hsl(var(--gold-light))" }}>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
