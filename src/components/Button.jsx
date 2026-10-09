
import { Link } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon = true,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-bold uppercase tracking-[0.12em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b99759] focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[#7a252e] text-white hover:bg-[#40171b]",
    gold:
      "bg-[#e4c78b] text-[#40171b] hover:bg-[#f0dba9]",
    outline:
      "border border-[#cbb48d] text-[#40171b] hover:border-[#7a252e] hover:bg-[#f8f0e4]",
    light:
      "bg-[#fffdf9] text-[#40171b] hover:bg-[#f8f0e4]",
    dark:
      "bg-[#40171b] text-[#fffaf1] hover:bg-[#602027]",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-[10px]",
    md: "px-6 py-3.5 text-[11px]",
    lg: "px-8 py-4 text-xs",
  };

  const classes = [
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? "w-full" : "",
    disabled || loading ? "cursor-not-allowed opacity-60" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        children
      )}

      {!loading && icon && <ArrowRight size={16} />}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || loading}
        onClick={(event) => {
          if (disabled || loading) event.preventDefault();
          else onClick?.(event);
        }}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={disabled || loading ? undefined : href}
        className={classes}
        aria-disabled={disabled || loading}
        onClick={(event) => {
          if (disabled || loading) event.preventDefault();
          else onClick?.(event);
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
