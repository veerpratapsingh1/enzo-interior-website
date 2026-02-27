import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex flex-col leading-tight">
          <span
            className="font-montserrat font-bold text-xl tracking-wider"
            style={{ color: scrolled ? "hsl(var(--brown))" : "white" }}
          >
            ENZO
          </span>
          <span
            className="text-xs tracking-[0.2em] font-poppins font-medium"
            style={{ color: "hsl(var(--gold))" }}
          >
            MODULAR & INTERIORS
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wider transition-colors duration-200 hover:text-gold"
              style={{ color: scrolled ? "hsl(var(--foreground))" : "rgba(255,255,255,0.9)" }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold text-sm px-6 py-2">
            Book Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          style={{ color: scrolled ? "hsl(var(--brown))" : "white" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-foreground text-sm font-medium tracking-wide py-2 border-b border-border/50"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold text-center text-sm mt-2" onClick={() => setMenuOpen(false)}>
            Book Consultation
          </a>
        </div>
      )}
    </nav>
  );
}
