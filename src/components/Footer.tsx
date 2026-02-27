import { Instagram, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = ["Home", "About", "Services", "Gallery", "Contact"];
const serviceLinks = [
  "Modular Kitchen",
  "Modular Wardrobes",
  "Home Interiors",
  "Custom Furniture",
  "Interior Consultation",
];

export default function Footer() {
  return (
    <footer style={{ background: "hsl(var(--brown))" }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="font-montserrat font-bold text-2xl tracking-wider text-white">ENZO</div>
              <div className="text-xs tracking-[0.2em] font-poppins font-medium" style={{ color: "hsl(var(--gold))" }}>
                MODULAR & INTERIORS
              </div>
            </div>
            <div className="w-10 h-0.5 mb-4" style={{ background: "hsl(var(--gold))" }} />
            <p className="font-poppins text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
              Premium modular kitchens, wardrobes & complete home interior solutions in Vasai, Maharashtra.
            </p>
            <a
              href="https://instagram.com/enzo_modular_interiors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-poppins transition-all hover:scale-105"
              style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(var(--gold))" }}
            >
              <Instagram size={14} />
              @enzo_modular_interiors
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wider text-white mb-5 uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="font-poppins text-xs transition-colors hover:text-gold"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wider text-white mb-5 uppercase">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-poppins text-xs transition-colors hover:text-gold"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-sm tracking-wider text-white mb-5 uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} style={{ color: "hsl(var(--gold))", marginTop: "2px", flexShrink: 0 }} />
                <a href="tel:7066280920" className="font-poppins text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  +91 7066280920<br />+91 8850644199
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} style={{ color: "hsl(var(--gold))", marginTop: "2px", flexShrink: 0 }} />
                <a href="mailto:enzomodularinteriors@gmail.com" className="font-poppins text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  enzomodularinteriors@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} style={{ color: "hsl(var(--gold))", marginTop: "2px", flexShrink: 0 }} />
                <span className="font-poppins text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Shop No. 3, Indumati Building,<br />Ambadi Road, Near Jain Mandir,<br />Vasai (W), Maharashtra
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © 2025 Enzo Modular & Interiors. All rights reserved.
          </p>
          <p className="font-poppins text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Crafted with ❤ in Vasai, Maharashtra
          </p>
        </div>
      </div>
    </footer>
  );
}
