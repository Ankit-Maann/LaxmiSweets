
import { useState } from "react";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function SweetCard({
  sweet,
  onAddToCart,
  isFavorite: favoriteProp,
  onToggleFavorite,
}) {
  const [localFavorite, setLocalFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  if (!sweet) return null;

  const {
    id,
    name = "Traditional Sweet",
    price = 0,
    image,
    description = "A delicious traditional favourite, made for sharing.",
    category,
    featured = false,
  } = sweet;

  const isControlled = typeof favoriteProp === "boolean";
  const isFavorite = isControlled ? favoriteProp : localFavorite;

  const handleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(sweet);
    } else {
      setLocalFavorite((current) => !current);
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(sweet);
      setAdded(true);

      // Brief button feedback; resets automatically.
      setTimeout(() => setAdded(false), 1200);
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#eadfce] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#d3b47b] hover:shadow-xl hover:shadow-[#40171b]/10">
      {/* Product image */}
      <div className="relative aspect-[4/4.2] overflow-hidden bg-[#f7f0e6]">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#a08e7e]">
            Sweet image coming soon
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1014]/30 via-transparent to-transparent opacity-60" />

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#e4c78b] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#40171b]">
            Customer favourite
          </span>
        )}

        {category && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/50 bg-[#fffdf9]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#40171b] backdrop-blur">
            {category}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${name} from favourites`
              : `Add ${name} to favourites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition ${
            isFavorite
              ? "bg-[#7a252e] text-white"
              : "bg-white/90 text-[#6b3435] hover:bg-[#7a252e] hover:text-white"
          }`}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
            strokeWidth={1.7}
          />
        </button>
      </div>

      {/* Product details */}
      <div className="p-4 sm:p-5">
        <div className="flex min-h-[28px] items-center gap-1 text-[#b08a4c]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={11}
              fill="currentColor"
              strokeWidth={1}
            />
          ))}
          <span className="ml-1 text-[9px] uppercase tracking-[0.1em] text-[#9a887b]">
            A sweet classic
          </span>
        </div>

        <h3 className="mt-2 line-clamp-1 font-serif text-xl text-[#40171b] transition group-hover:text-[#8a2831]">
          {name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-[#89786d]">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eee4d7] pt-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a08e7e]">
              Price
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-[#40171b]">
              {formatPrice(price)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!onAddToCart || added}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition ${
              added
                ? "bg-[#526b48] text-white"
                : "bg-[#7a252e] text-white hover:bg-[#40171b]"
            } disabled:cursor-default`}
          >
            {added ? (
              <>
                <Check size={14} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                Add to bag
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}