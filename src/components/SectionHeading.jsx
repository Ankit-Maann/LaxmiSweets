
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : "text-left"} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${
            centered ? "justify-center" : "justify-start"
          } ${light ? "text-[#e4c78b]" : "text-[#a67b3e]"}`}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
          <span className="h-px w-8 bg-current" />
        </div>
      )}

      <h2
        className={`font-serif text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-[#fffaf1]" : "text-[#40171b]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-sm leading-7 sm:text-base ${
            light ? "text-white/70" : "text-[#77665d]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
