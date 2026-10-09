
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({
  title,
  description,
  image,
  to = "/sweets",
  count,
  className = "",
}) {
  const content = (
    <>
      {/* Category image */}
      <div className="absolute inset-0 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-[#6b2634]" />
        )}
      </div>

      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#260c11]/90 via-[#260c11]/25 to-transparent transition-colors duration-300 group-hover:from-[#260c11]/95" />

      {/* Gold accent */}
      <div className="absolute inset-3 rounded-xl border border-white/30 transition-all duration-300 group-hover:inset-4 group-hover:border-[#d6b16d]/80" />

      {/* Category content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7">
        {count && (
          <span className="mb-3 w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
            {count}
          </span>
        )}

        <h3 className="text-2xl font-semibold tracking-wide text-white sm:text-3xl">
          {title}
        </h3>

        {description && (
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
            {description}
          </p>
        )}

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-[#f0d49b]">
          Explore Collection
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </>
  );

  return (
    <Link
      to={to}
      aria-label={`Explore ${title}`}
      className={`group relative block min-h-[320px] overflow-hidden rounded-2xl bg-[#501b24] shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88a43] focus-visible:ring-offset-4 ${className}`}
    >
      {content}
    </Link>
  );
}
