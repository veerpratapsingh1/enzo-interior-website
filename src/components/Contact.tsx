import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Instagram, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type UIState = "idle" | "waking" | "sending" | "success" | "fallback";

// ─── Constants ─────────────────────────────────────────────────────────────────

const BASE_URL  = "https://backend-enzo-modular.onrender.com";
const API_URL   = `${BASE_URL}/api/contact`;
const PING_URL  = `${BASE_URL}/api/health`; // ✅ Fixed: this route now exists on backend
const WHATSAPP  = "917066280920";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function whatsAppLink(f: FormState) {
  const text = encodeURIComponent(
    `Hi! I'd like a free home visit.\n\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\nMessage: ${f.message}`
  );
  return `https://wa.me/${WHATSAPP}?text=${text}`;
}

/**
 * Ping the backend so Render wakes up from sleep.
 * Render free tier cold-starts in ~30–50 s.
 */
async function pingServer(): Promise<boolean> {
  try {
    const res = await fetch(PING_URL, {
      method: "GET",
      signal: AbortSignal.timeout(50_000), // ✅ Increased to 50s for Render cold start
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** POST the contact form once the server is awake. */
async function postContact(form: FormState): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error("API returned success: false");
}

// ─── Button labels by state ────────────────────────────────────────────────────

const btnLabel: Record<UIState, string> = {
  idle:     "Send Message",
  waking:   "Connecting…",
  sending:  "Sending…",
  success:  "Message Sent!",
  fallback: "Send Message",
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [ui, setUi]     = useState<UIState>("idle");
  const [waLink, setWaLink] = useState("");

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-8");
          }
        }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-reset success state after 5 s
  useEffect(() => {
    if (ui !== "success") return;
    const t = setTimeout(() => setUi("idle"), 5000);
    return () => clearTimeout(t);
  }, [ui]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Wake up Render server
    setUi("waking");
    const alive = await pingServer();

    if (!alive) {
      setWaLink(whatsAppLink(form));
      setUi("fallback");
      return;
    }

    // Step 2: Submit form
    setUi("sending");
    try {
      await postContact(form);
      setForm({ name: "", phone: "", email: "", message: "" });
      setUi("success");
    } catch (err) {
      console.error("Contact form error:", err);
      setWaLink(whatsAppLink(form));
      setUi("fallback");
    }
  };

  const isLoading = ui === "waking" || ui === "sending";

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
          <div className="gold-divider" />
          <p className="font-poppins text-muted-foreground max-w-xl mx-auto">
            Schedule a free home visit or reach out to discuss your dream interior project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Info column ── */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 space-y-6">
            <div
              className="rounded-2xl p-8"
              style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-card)" }}
            >
              <h3
                className="font-montserrat font-bold text-xl mb-1"
                style={{ color: "hsl(var(--brown))" }}
              >
                Mamta Singh
              </h3>
              <p className="font-poppins text-sm text-muted-foreground mb-6">Principal Designer</p>

              <div className="space-y-4">
                <ContactRow icon={<Phone size={18} />} label="Call / WhatsApp" href="tel:7066280920">
                  +91 7066280920 / 8850644199
                </ContactRow>
                <ContactRow
                  icon={<Mail size={18} />}
                  label="Email"
                  href="mailto:enzomodularinteriors@gmail.com"
                >
                  enzomodularinteriors@gmail.com
                </ContactRow>
                <ContactRow icon={<MapPin size={18} />} label="Address">
                  {"Shop No. 3, Indumati Building, Ambadi Road,\nNear Jain Mandir, Vasai (W), Maharashtra"}
                </ContactRow>
                <ContactRow
                  icon={<Instagram size={18} />}
                  label="Instagram"
                  href="https://instagram.com/enzo_modular_interiors"
                  external
                >
                  @enzo_modular_interiors
                </ContactRow>
              </div>
            </div>

            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)", height: "240px" }}
            >
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

          {/* ── Form column ── */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-5"
              style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-card)" }}
            >
              <h3
                className="font-montserrat font-bold text-xl mb-6"
                style={{ color: "hsl(var(--brown))" }}
              >
                Schedule a Free Home Visit
              </h3>

              {/* Server wake-up notice */}
              {ui === "waking" && (
                <div
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-poppins"
                  style={{ background: "hsl(var(--gold) / 0.1)", color: "hsl(var(--brown))" }}
                >
                  <Loader2 size={14} className="animate-spin flex-shrink-0" />
                  Starting server, please wait up to 50 seconds…
                </div>
              )}

              <input
                required
                disabled={isLoading}
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none disabled:opacity-50"
              />
              <input
                required
                disabled={isLoading}
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none disabled:opacity-50"
              />
              <input
                required
                disabled={isLoading}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none disabled:opacity-50"
              />
              <textarea
                required
                disabled={isLoading}
                rows={4}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border resize-none focus:outline-none disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isLoading || ui === "success"}
                className="btn-gold w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : ui === "success" ? (
                  <CheckCircle size={16} />
                ) : (
                  <Send size={16} />
                )}
                {btnLabel[ui]}
              </button>

              {ui === "success" && (
                <p
                  className="text-center font-poppins text-sm"
                  style={{ color: "hsl(var(--gold))" }}
                >
                  ✓ We'll be in touch with you shortly!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ── WhatsApp fallback modal ── */}
      {ui === "fallback" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4">
          <div
            className="rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl"
            style={{ background: "hsl(var(--card))" }}
          >
            <AlertCircle size={36} className="mx-auto mb-3" style={{ color: "hsl(var(--gold))" }} />
            <h3
              className="font-montserrat font-bold text-lg mb-2"
              style={{ color: "hsl(var(--brown))" }}
            >
              Server temporarily unavailable
            </h3>
            <p className="font-poppins text-sm text-muted-foreground mb-6">
              Reach us instantly on WhatsApp — your message is pre-filled and ready to send.
            </p>
            <div className="space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setUi("idle")}
                className="btn-gold w-full flex items-center justify-center gap-2 py-3 rounded-xl font-poppins text-sm font-medium"
              >
                <WhatsAppIcon />
                Message on WhatsApp
              </a>
              <button
                onClick={() => setUi("idle")}
                className="w-full py-3 rounded-xl font-poppins text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ContactRow({
  icon,
  label,
  href,
  external,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "hsl(var(--gold) / 0.12)", color: "hsl(var(--gold))" }}
      >
        {icon}
      </div>
      <div>
        <p className="font-poppins text-xs text-muted-foreground">{label}</p>
        <p
          className="font-poppins text-sm font-medium whitespace-pre-line"
          style={{ color: "hsl(var(--brown))" }}
        >
          {children}
        </p>
      </div>
    </>
  );

  return href ? (
    <a
      href={href}
      className="flex items-center gap-4 group"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  ) : (
    <div className="flex items-start gap-4">{body}</div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}