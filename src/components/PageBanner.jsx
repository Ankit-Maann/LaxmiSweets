
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function PageBanner({
  eyebrow = "LAXMI SWEETS",
  title = "A Little More Sweetness",
  description = "",
  image = "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?auto=format&fit=crop&w=2000&q=85",
  breadcrumbs = [],
  height = "md",
  align = "center",
  overlay = "dark",
  children,
  className = "",
}) {
  const heights = {
    sm: "min-h-[280px] sm:min-h-[340px]",
    md: "min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]",
    lg: "min-h-[450px] sm:min-h-[550px] lg:min-h-[640px]",
  };

  const overlays = {
    dark: "bg-gradient-to-r from-[#21090d]/85 via-[#21090d]/55 to-[#21090d]/20",
    maroon: "bg-gradient-to-r from-[#4a101b]/90 via-[#4a101b]/65 to-[#4a101b]/25",
    soft: "bg-gradient-to-t from-[#21090d]/80 via-[#21090d]/25 to-transparent",
  };

  const alignment = {
    center: "items-center text-center",
    left: "items-start text-left",
  };

  const currentHeight = heights[height] || heights.md;
  const currentOverlay = overlays[overlay] || overlays.dark;
  const currentAlignment = alignment[align] || alignment.center;

  return (
    <section
      className={`relative isolate flex ${currentHeight} overflow-hidden bg-[#3a1117] ${className}`}
    >
      {/* Background photograph */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchPriority="high"
      />

      {/* Colour overlay */}
      <div
        className={`absolute inset-0 -z-10 ${currentOverlay}`}
        aria-hidden="true"
      />

      {/* Decorative gold detail */}
      <div
        className="pointer-events-none absolute inset-5 border border-[#d6b16b]/25 sm:inset-8 lg:inset-10"
        aria-hidden="true"
      >
        <span className="absolute -left-px -top-px h-8 w-8 border-l border-t border-[#d6b16b]/70" />
        <span className="absolute -right-px -top-px h-8 w-8 border-r border-t border-[#d6b16b]/70" />
        <span className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-[#d6b16b]/70" />
        <span className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-[#d6b16b]/70" />
      </div>

      {/* Content */}
      <div
        className={`mx-auto flex w-full max-w-7xl flex-col justify-center px-8 py-20 text-white sm:px-16 lg:px-24 ${currentAlignment}`}
      >
        {eyebrow && (
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#d6b16b]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e6c68c] sm:text-xs">
              {eyebrow}
            </p>
            <span className="h-px w-8 bg-[#d6b16b]" />
          </div>
        )}

        <h1 className="max-w-4xl font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            {description}
          </p>
        )}

        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mt-7 flex flex-wrap items-center gap-2 text-xs text-white/75"
          >
            <Link
              to="/"
              className="transition hover:text-[#e6c68c]"
            >
              Home
            </Link>

            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <span
                  key={`${crumb.label}-${index}`}
                  className="inline-flex items-center gap-2"
                >
                  <ChevronRight size={13} className="text-[#d6b16b]" />

                  {crumb.to && !isLast ? (
                    <Link
                      to={crumb.to}
                      className="transition hover:text-[#e6c68c]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className={isLast ? "text-[#e6c68c]" : ""}
                    >
                      {crumb.label}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {children && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {children}
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d6b16b] to-transparent" />
    </section>
  );
}
