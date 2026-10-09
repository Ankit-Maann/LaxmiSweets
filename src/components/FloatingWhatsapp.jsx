
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp({
  phoneNumber,
  message = "Hello Laxmi Sweets! I'd like to enquire about your sweets and catering services.",
  label = "Chat with us on WhatsApp",
  showLabel = true,
  className = "",
}) {
  // Use the international country code without +, spaces, or dashes.
  // Example format for India: 91XXXXXXXXXX
  const cleanPhone = String(phoneNumber || "").replace(/\D/g, "");

  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    : null;

  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4 sm:bottom-7 sm:right-7 ${
        showLabel ? "sm:pl-5" : ""
      } ${className}`}
    >
      <MessageCircle size={25} fill="currentColor" strokeWidth={1.5} />

      {showLabel && (
        <span className="hidden text-sm font-semibold sm:inline">
          WhatsApp Us
        </span>
      )}

      <span className="sr-only">Opens WhatsApp in a new tab</span>
    </a>
  );
}
