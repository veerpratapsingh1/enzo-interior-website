import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {

        // form reset
        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        // 2 sec delay popup
        setTimeout(() => {
          setSent(true);
        }, 2000);

        // auto close popup
        setTimeout(() => {
          setSent(false);
        }, 6000);

      } else {
        alert("Mail failed");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-xl mx-auto">
            Schedule a free home visit or reach out to discuss your dream interior project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Info */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 space-y-6">
            <div
              className="rounded-2xl p-8"
              style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="font-montserrat font-bold text-xl mb-1" style={{ color: "hsl(var(--brown))" }}>
                Mamta Singh
              </h3>
              <p className="font-poppins text-sm text-muted-foreground mb-6">Principal Designer</p>

              <div className="space-y-4">
                <a href="tel:7066280920" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--gold) / 0.12)" }}>
                    <Phone size={18} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-muted-foreground">Call / WhatsApp</p>
                    <p className="font-poppins text-sm font-medium" style={{ color: "hsl(var(--brown))" }}>
                      +91 7066280920 / 8850644199
                    </p>
                  </div>
                </a>

                <a href="mailto:enzomodularinteriors@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--gold) / 0.12)" }}>
                    <Mail size={18} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-muted-foreground">Email</p>
                    <p className="font-poppins text-sm font-medium" style={{ color: "hsl(var(--brown))" }}>
                      enzomodularinteriors@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--gold) / 0.12)" }}>
                    <MapPin size={18} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-muted-foreground">Address</p>
                    <p className="font-poppins text-sm font-medium leading-relaxed" style={{ color: "hsl(var(--brown))" }}>
                      Shop No. 3, Indumati Building, Ambadi Road,<br />
                      Near Jain Mandir, Vasai (W), Maharashtra
                    </p>
                  </div>
                </div>

                <a
                  href="https://instagram.com/enzo_modular_interiors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--gold) / 0.12)" }}>
                    <Instagram size={18} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-muted-foreground">Instagram</p>
                    <p className="font-poppins text-sm font-medium" style={{ color: "hsl(var(--brown))" }}>
                      @enzo_modular_interiors
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)", height: "240px" }}>
              <iframe
                title="Enzo Modular Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.1!2d72.8286!3d19.3606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a8b4a12cd345%3A0x1!2sAmbadi+Road%2C+Vasai+West%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-5"
              style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="font-montserrat font-bold text-xl mb-6" style={{ color: "hsl(var(--brown))" }}>
                Schedule a Free Home Visit
              </h3>

              <div>
                <label className="font-poppins text-xs text-muted-foreground mb-1.5 block">Your Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm font-poppins border border-border focus:outline-none focus:border-gold/60 bg-background transition-colors"
                />
              </div>

              <div>
                <label className="font-poppins text-xs text-muted-foreground mb-1.5 block">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm font-poppins border border-border focus:outline-none focus:border-gold/60 bg-background transition-colors"
                />
              </div>

              <div>
                <label className="font-poppins text-xs text-muted-foreground mb-1.5 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm font-poppins border border-border focus:outline-none focus:border-gold/60 bg-background transition-colors"
                />
              </div>

              <div>
                <label className="font-poppins text-xs text-muted-foreground mb-1.5 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm font-poppins border border-border focus:outline-none focus:border-gold/60 bg-background transition-colors resize-none"
                />
              </div>

              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 py-4">
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* THANKS POPUP */}
      {sent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl px-10 py-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-sm text-gray-600">
              Your message has been sent successfully.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}