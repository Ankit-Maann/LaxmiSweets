
import { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from "lucide-react";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    accent: "border-l-emerald-600",
    iconColor: "text-emerald-600",
  },
  error: {
    icon: AlertCircle,
    accent: "border-l-red-600",
    iconColor: "text-red-600",
  },
  info: {
    icon: Info,
    accent: "border-l-[#ad8548]",
    iconColor: "text-[#ad8548]",
  },
};

export default function Toast({
  message = "",
  type = "success",
  isOpen = false,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!isOpen || !duration) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen || !message) return null;

  const style = toastStyles[type] || toastStyles.success;
  const Icon = style.icon;

  return (
    <div
      className="fixed right-4 top-5 z-[200] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-top-3 duration-300 sm:right-6 sm:top-6"
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <div
        className={`flex items-start gap-3 border border-[#eadfd1] border-l-4 ${style.accent} bg-[#fffdf8] p-4 shadow-xl`}
      >
        <Icon
          size={21}
          className={`mt-0.5 shrink-0 ${style.iconColor}`}
        />

        <div className="min-w-0 flex-1">
          <p className="font-serif text-base text-[#4a101b]">
            {type === "success"
              ? "Lovely!"
              : type === "error"
                ? "Something went wrong"
                : "A little note"}
          </p>

          <p className="mt-1 break-words text-sm leading-5 text-[#806d62]">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="flex h-7 w-7 shrink-0 items-center justify-center text-[#927c6d] transition hover:bg-[#f4ece3] hover:text-[#4a101b]"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
