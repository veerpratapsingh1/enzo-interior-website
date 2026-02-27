import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917066280920?text=Hi%20Enzo%20Modular%2C%20I%20would%20like%20to%20inquire%20about%20your%20interior%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" color="white" />
    </a>
  );
}
