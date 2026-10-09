
import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ArrowUpRight,
  X,
  Check,
  Sparkles,
} from "lucide-react";

import sweets from "../data/sweets.json";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const categories = [
  "All Sweets",
  "Laddoo",
  "Barfi",
  "Kaju Sweets",
  "Bengali Sweets",
  "Traditional",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

function SectionLabel({ children }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
      <span className="h-px w-7 bg-amber-600" />
      {children}
    </p>
  );
}

function SweetCard({ sweet, onAdd, isFavorite, onFavorite }) {
  return (
    <article className="group overflow-hidden rounded-t-[110px] rounded-b-2xl border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-[0_22px_55px_rgba(67,36,20,0.13)]">
      <div className="relative h-64 overflow-hidden bg-stone-100 sm:h-72">
        <img
          src={sweet.image}
          alt={sweet.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/35 via-transparent to-transparent" />

        {sweet.featured && (
          <span className="absolute left-4 top-5 rounded-full bg-[#681c2b] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
            Customer Favourite
          </span>
        )}

        <button
          type="button"
          onClick={() => onFavorite(sweet.id)}
          aria-label={
            isFavorite ? "Remove from favourites" : "Add to favourites"
          }
          aria-pressed={isFavorite}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
            isFavorite
              ? "bg-[#681c2b] text-white"
              : "bg-white/90 text-stone-700 hover:bg-[#681c2b] hover:text-white"
          }`}
        >
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-white">
          <Sparkles size={14} className="text-amber-300" />
          Made with care
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
              {sweet.category || "Traditional Indian Sweet"}
            </p>
            <h3 className="font-serif text-xl text-[#451722] transition group-hover:text-amber-700">
              {sweet.name}
            </h3>
          </div>

          <span className="shrink-0 pt-1 text-base font-bold text-[#681c2b]">
            {formatPrice(sweet.price)}
          </span>
        </div>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-stone-500">
          {sweet.description ||
            "A delightful traditional treat, prepared to make your special moments sweeter."}
        </p>

        <button
          type="button"
          onClick={() => onAdd(sweet)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#681c2b] px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#681c2b] transition hover:bg-[#681c2b] hover:text-white"
        >
          <ShoppingBag size={15} />
          Add to Bag
          <ArrowUpRight size={15} className="ml-auto" />
        </button>
      </div>
    </article>
  );
}

export default function Sweets() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Sweets");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    if (!addedMessage) return;

    const timer = setTimeout(() => setAddedMessage(""), 2200);
    return () => clearTimeout(timer);
  }, [addedMessage]);

  const productList = Array.isArray(sweets) ? sweets : [];

  const filteredSweets = useMemo(() => {
    let result = productList.filter((sweet) => {
      const searchableText = [
        sweet.name,
        sweet.category,
        sweet.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(search.toLowerCase());

      const categoryTerm = {
        "Kaju Sweets": "kaju",
        "Bengali Sweets": "bengali",
        Traditional: "traditional",
      }[activeCategory] || activeCategory.toLowerCase().replace(" sweets", "");

      const matchesCategory =
        activeCategory === "All Sweets" ||
        (sweet.category || "").toLowerCase().includes(categoryTerm);

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result = [...result].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else {
      result = [...result].sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      );
    }

    return result;
  }, [productList, activeCategory, search, sort]);

  const handleAddToCart = (sweet) => {
    addToCart(sweet);
    setAddedMessage(`${sweet.name} added to your bag`);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    updateCartQuantity(id, quantity);
  };

  return (
    <main className="min-h-screen bg-[#fcfaf6] text-stone-800">
      {/* Hero */}
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-[#451722] sm:min-h-[510px]">
        <img
          src="https://images.unsplash.com/photo-1605197161470-5d9f1f0b4a0d?auto=format&fit=crop&w=2000&q=85"
          alt="An elegant spread of Indian sweets"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#321018]/95 via-[#451722]/80 to-[#451722]/25" />

        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
          <SectionLabel>From our kitchen to your heart</SectionLabel>

          <h1 className="max-w-3xl font-serif text-5xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            A little sweetness,
            <br />
            <span className="italic text-amber-300">a lot of love.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Discover timeless Indian mithai, crafted with care and made to
            bring people together. Every bite has a story worth sharing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#our-sweets"
              className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#451722] transition hover:bg-amber-300"
            >
              Explore Our Sweets <ArrowUpRight size={16} />
            </a>

            <Link
              to="/catering"
              className="inline-flex items-center rounded-full border border-white/40 px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#451722]"
            >
              Bulk & Catering
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs tracking-wide text-white/70">
            {["Crafted with care", "Perfect for gifting", "Made for celebrations"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check size={15} className="text-amber-300" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section
        id="our-sweets"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>The sweet collection</SectionLabel>
            <h2 className="font-serif text-4xl text-[#451722] sm:text-5xl">
              Find your favourite.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500">
              From rich, nutty classics to delicate festive delights, discover
              something special for every craving and occasion.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-stone-500">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <ShoppingBag size={17} />
            </span>
            <span>
              <strong className="text-[#451722]">
                {filteredSweets.length}
              </strong>{" "}
              sweet varieties to explore
            </span>
          </div>
        </div>

        {/* Search and sorting */}
        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="flex min-h-12 items-center gap-3 rounded-full border border-stone-200 bg-white px-5 transition focus-within:border-amber-600">
            <Search size={18} className="shrink-0 text-stone-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search sweets, flavours, categories..."
              aria-label="Search sweets"
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} className="text-stone-400" />
              </button>
            )}
          </label>

          <label className="flex min-h-12 items-center gap-3 rounded-full border border-stone-200 bg-white px-5">
            <SlidersHorizontal size={17} className="text-amber-800" />
            <span className="whitespace-nowrap text-xs font-semibold text-stone-500">
              Sort by
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="max-w-40 bg-transparent text-sm font-medium text-[#451722] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`shrink-0 rounded-full border px-5 py-3 text-xs font-bold transition ${
                activeCategory === category
                  ? "border-[#681c2b] bg-[#681c2b] text-white shadow-lg shadow-[#681c2b]/15"
                  : "border-stone-200 bg-white text-stone-600 hover:border-amber-500 hover:text-[#681c2b]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filteredSweets.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onAdd={handleAddToCart}
                isFavorite={favorites.includes(sweet.id)}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-800">
              <Search size={25} />
            </span>
            <h3 className="font-serif text-2xl text-[#451722]">
              No sweets found
            </h3>
            <p className="mt-2 text-sm text-stone-500">
              Try another search or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Sweets");
              }}
              className="mt-6 rounded-full bg-[#681c2b] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#451722]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Catering banner */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#681c2b]">
          <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
          <div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/10 sm:h-72 sm:w-72" />

          <div className="relative grid gap-8 px-7 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16">
            <div>
              <SectionLabel>Make it memorable</SectionLabel>
              <h2 className="max-w-2xl font-serif text-3xl leading-tight text-white sm:text-5xl">
                Big celebration?
                <br />
                <span className="italic text-amber-300">
                  We have sweetness covered.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                Planning a wedding, family gathering, festival, or corporate
                event? Let us help you create a memorable sweet spread.
              </p>
            </div>

            <Link
              to="/catering"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-amber-400 px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#451722] transition hover:bg-amber-300"
            >
              Explore Catering <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Floating bag button */}
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label={`Open shopping bag, ${cartCount} items`}
        className="fixed bottom-6 right-5 z-40 flex h-14 items-center gap-3 rounded-full bg-[#681c2b] px-5 text-white shadow-xl shadow-[#451722]/25 transition hover:-translate-y-1 hover:bg-[#451722] sm:bottom-8 sm:right-8"
      >
        <ShoppingBag size={19} />
        <span className="text-sm font-semibold">My Bag</span>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-[#451722]">
          {cartCount}
        </span>
      </button>

      {/* Added notification */}
      {addedMessage && (
        <div
          role="status"
          className="fixed bottom-24 right-5 z-50 flex max-w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl bg-stone-900 px-5 py-4 text-sm text-white shadow-2xl sm:bottom-28 sm:right-8"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <Check size={15} />
          </span>
          {addedMessage}
        </div>
      )}

      {/* Shared cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          navigate("/checkout");
        }}
        onContinueShopping={() => setCartOpen(false)}
      />
    </main>
  );
}
