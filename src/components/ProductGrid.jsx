
import SweetCard from "./SweetCard";

export default function ProductGrid({
  products = [],
  onAddToCart,
  favorites,
  onToggleFavorite,
  columns = 3,
  emptyMessage = "No sweets found. Try another category!",
  className = "",
}) {
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const gridColumns =
    columnClasses[columns] || columnClasses[3];

  if (!products.length) {
    return (
      <div
        className={`rounded-2xl border border-[#eadfce] bg-[#faf7f1] px-6 py-16 text-center ${className}`}
      >
        <span className="mb-4 block text-4xl" aria-hidden="true">
          🍬
        </span>

        <h3 className="mb-2 text-xl font-semibold text-[#501b24]">
          Nothing sweet here yet
        </h3>

        <p className="mx-auto max-w-md text-sm leading-6 text-gray-600">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid ${gridColumns} gap-5 sm:gap-6 lg:gap-7 ${className}`}
    >
      {products.map((sweet) => (
        <SweetCard
          key={sweet.id}
          sweet={sweet}
          onAddToCart={onAddToCart}
          isFavorite={
            favorites === undefined
              ? undefined
              : favorites.includes(sweet.id)
          }
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
