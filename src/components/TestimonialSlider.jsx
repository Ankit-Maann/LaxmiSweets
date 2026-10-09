
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function TestimonialSlider({
  testimonials = [],
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials.length) {
    return (
      <div
        className={`rounded-2xl border border-[#eadfce] bg-[#faf7f1] px-6 py-12 text-center ${className}`}
      >
        <Quote className="mx-auto mb-4 text-[#b88a43]" size={32} />
        <h3 className="text-xl font-semibold text-[#501b24]">
          Sweet words from our customers
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Customer reviews will appear here.
        </p>
      </div>
    );
  }

  const current = testimonials[activeIndex];

  const previous = () => {
    setActiveIndex((index) =>
      index === 0 ? testimonials.length - 1 : index - 1
    );
  };

  const next = () => {
    setActiveIndex((index) =>
      index === testimonials.length - 1 ? 0 : index + 1
    );
  };

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-[#501b24] px-6 py-12 text-white sm:px-12 sm:py-16 ${className}`}
      aria-label="Customer testimonials"
    >
      {/* Decorative accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-[#d6b16d]/20"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Quote
          size={38}
          className="mx-auto mb-6 text-[#d6b16d]"
          aria-hidden="true"
        />

        {/* Star rating, only when supplied */}
        {typeof current.rating === "number" && (
          <div
            className="mb-5 flex justify-center gap-1"
            aria-label={`${current.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={17}
                fill={index < current.rating ? "currentColor" : "none"}
                className={
                  index < current.rating
                    ? "text-[#e7c77f]"
                    : "text-white/30"
                }
              />
            ))}
          </div>
        )}

        <blockquote
          key={activeIndex}
          className="text-xl font-medium leading-relaxed sm:text-2xl lg:text-3xl"
        >
          “{current.quote}”
        </blockquote>

        <div className="mt-8 flex flex-col items-center">
          {current.image ? (
            <img
              src={current.image}
              alt=""
              loading="lazy"
              className="mb-3 h-14 w-14 rounded-full border-2 border-[#d6b16d] object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d6b16d] bg-white/10 text-lg font-semibold text-[#f0d49b]"
            >
              {current.name?.trim()?.charAt(0)?.toUpperCase() || "C"}
            </div>
          )}

          <p className="font-semibold tracking-wide">
            {current.name}
          </p>

          {current.role && (
            <p className="mt-1 text-sm text-white/65">
              {current.role}
            </p>
          )}
        </div>

        {/* Carousel controls */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:border-[#d6b16d] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c77f]"
            >
              <ChevronLeft size={21} />
            </button>

            <div
              className="flex items-center gap-2"
              aria-label={`Review ${activeIndex + 1} of ${testimonials.length}`}
            >
              {testimonials.map((item, index) => (
                <button
                  key={item.id ?? `${item.name}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-7 bg-[#e7c77f]"
                      : "w-2 bg-white/35 hover:bg-white/65"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:border-[#d6b16d] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c77f]"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
