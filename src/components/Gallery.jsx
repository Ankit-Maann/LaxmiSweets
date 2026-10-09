
import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

const defaultCategories = [
  "All",
  "Sweets",
  "Events",
  "Our Store",
  "Celebrations",
];

export default function Gallery({
  images = [],
  title = "Moments of Sweetness",
  description = "From handcrafted sweets to joyful celebrations, explore the world of Laxmi Sweets.",
  categories = defaultCategories,
  className = "",
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter(
          (image) =>
            image.category?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const selectedImage =
    selectedIndex !== null
      ? filteredImages[selectedIndex]
      : null;

  const closeLightbox = () => setSelectedIndex(null);

  const showPrevious = () => {
    setSelectedIndex((index) =>
      index === 0 ? filteredImages.length - 1 : index - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((index) =>
      index === filteredImages.length - 1 ? 0 : index + 1
    );
  };

  // Close the viewer when the user presses Escape.
  // Arrow keys navigate between images.
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();

      if (event.key === "ArrowLeft" && filteredImages.length > 1) {
        showPrevious();
      }

      if (event.key === "ArrowRight" && filteredImages.length > 1) {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, filteredImages.length]);

  // Reset the selected image when changing categories.
  const changeCategory = (category) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };

  return (
    <section
      className={`py-12 sm:py-16 lg:py-20 ${className}`}
      aria-label="Laxmi Sweets photo gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#b88a43]">
            Our Gallery
          </span>

          <h2 className="font-serif text-3xl font-semibold text-[#501b24] sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            {description}
          </p>

          <div className="mx-auto mt-5 h-px w-20 bg-[#c7a15a]" />
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => changeCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88a43] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-[#501b24] bg-[#501b24] text-white"
                    : "border-[#e8d9c4] bg-white text-[#501b24] hover:border-[#b88a43] hover:bg-[#faf5ec]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.id ?? image.src}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${image.title || image.alt || "gallery image"}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f4ece0] text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88a43] focus-visible:ring-offset-4"
              >
                <img
                  src={image.src}
                  alt={image.alt || image.title || "Laxmi Sweets gallery"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#260c11]/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  {image.category && (
                    <span className="mb-2 inline-block rounded-full border border-white/20 bg-[#501b24]/80 px-3 py-1 text-xs text-white">
                      {image.category}
                    </span>
                  )}

                  {image.title && (
                    <h3 className="text-lg font-semibold text-white">
                      {image.title}
                    </h3>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#eadfce] bg-[#faf7f1] px-6 py-14 text-center">
            <Images
              size={36}
              className="mx-auto mb-4 text-[#b88a43]"
            />
            <h3 className="text-lg font-semibold text-[#501b24]">
              More sweet moments coming soon
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Add photos to this category to showcase them here.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={24} />
          </button>

          <div className="relative flex max-h-full w-full max-w-5xl flex-col items-center">
            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt || selectedImage.title || "Gallery image"}
                className="max-h-[72vh] max-w-full rounded-lg object-contain"
              />

              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous image"
                    className="absolute left-2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80 sm:left-4"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="absolute right-2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80 sm:right-4"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 w-full text-center text-white">
              {selectedImage.title && (
                <h3 className="text-lg font-semibold">
                  {selectedImage.title}
                </h3>
              )}

              <p className="mt-1 text-sm text-white/65">
                {selectedImage.category || "Gallery"} ·{" "}
                {selectedIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}