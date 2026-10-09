
import { LoaderCircle } from "lucide-react";

export default function Loader({
  size = "md",
  text = "Preparing something sweet...",
  fullScreen = false,
  overlay = false,
  className = "",
}) {
  const sizes = {
    sm: {
      icon: 20,
      container: "gap-2",
      text: "text-xs",
    },
    md: {
      icon: 32,
      container: "gap-3",
      text: "text-sm",
    },
    lg: {
      icon: 44,
      container: "gap-4",
      text: "text-base",
    },
  };

  const selected = sizes[size] || sizes.md;

  const content = (
    <div
      className={`flex flex-col items-center justify-center ${selected.container} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-14 w-14 rounded-full border border-[#ad8548]/20" />

        <LoaderCircle
          size={selected.icon}
          strokeWidth={1.6}
          className="animate-spin text-[#6d1725]"
          aria-hidden="true"
        />
      </div>

      {text && (
        <p
          className={`${selected.text} text-center leading-6 text-[#806d62]`}
        >
          {text}
        </p>
      )}

      <span className="sr-only">Loading, please wait.</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[300] flex items-center justify-center ${
          overlay ? "bg-[#21100f]/50 backdrop-blur-sm" : "bg-[#fffdf8]"
        }`}
      >
        <div
          className={`rounded-sm px-8 py-10 ${
            overlay ? "bg-[#fffdf8] shadow-2xl" : ""
          }`}
        >
          {content}
        </div>
      </div>
    );
  }

  return content;
}
