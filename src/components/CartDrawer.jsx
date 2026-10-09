
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBasket,
  ShieldCheck,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price || 0);

export default function CartDrawer({
  isOpen = false,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cartItems = items.filter((item) => (item.quantity ?? 1) > 0);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * (item.quantity ?? 1),
    0
  );

  const handleContinueShopping = () => {
    onClose?.();

    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      role="presentation"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close shopping bag"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#21100f]/55 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full max-w-[480px] flex-col bg-[#fffdf8] shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eadfd1] px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6d1725]/10 text-[#6d1725]">
              <ShoppingBag size={21} strokeWidth={1.7} />
            </div>

            <div>
              <h2
                id="cart-drawer-title"
                className="font-serif text-xl text-[#4a101b]"
              >
                Your Sweet Bag
              </h2>
              <p className="mt-0.5 text-xs text-[#89766b]">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfd1] text-[#5b3933] transition hover:bg-[#f4ece3]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f5ede2] text-[#7b2630]">
              <ShoppingBasket size={39} strokeWidth={1.3} />
            </div>

            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ad8548]">
              A little sweetness awaits
            </p>

            <h3 className="font-serif text-3xl text-[#4a101b]">
              Your bag is empty
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-[#806d62]">
              Discover our handcrafted sweets and find something special to
              share with the people you love.
            </p>

            <button
              type="button"
              onClick={handleContinueShopping}
              className="mt-7 inline-flex items-center gap-2 bg-[#6d1725] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#4a101b]"
            >
              Explore our sweets <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-3 sm:px-7">
              <p className="border-b border-[#efe5d9] py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a18b7b]">
                Handpicked for you
              </p>

              <div className="divide-y divide-[#efe5d9]">
                {cartItems.map((item) => {
                  const quantity = item.quantity ?? 1;

                  return (
                    <article
                      key={item.id}
                      className="flex gap-4 py-5"
                    >
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-[#f3e9dc]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#8a5a4e]">
                            <ShoppingBag size={26} />
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-serif text-lg leading-snug text-[#4a101b]">
                              {item.name}
                            </h3>

                            {item.category && (
                              <p className="mt-1 text-xs text-[#9a8173]">
                                {item.category}
                              </p>
                            )}
                          </div>

                          <p className="shrink-0 text-sm font-semibold text-[#6d1725]">
                            {formatPrice(Number(item.price || 0) * quantity)}
                          </p>
                        </div>

                        <div className="mt-auto flex items-end justify-between pt-3">
                          <div className="inline-flex items-center border border-[#e5d6c6]">
                            <button
                              type="button"
                              aria-label={`Decrease ${item.name} quantity`}
                              disabled={quantity <= 1}
                              onClick={() =>
                                onUpdateQuantity?.(item.id, quantity - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#6d1725] transition hover:bg-[#f3e9dc] disabled:cursor-not-allowed disabled:opacity-35"
                            >
                              <Minus size={13} />
                            </button>

                            <span
                              aria-label={`Quantity ${quantity}`}
                              className="min-w-8 text-center text-xs font-medium text-[#4a101b]"
                            >
                              {quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Increase ${item.name} quantity`}
                              onClick={() =>
                                onUpdateQuantity?.(item.id, quantity + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#6d1725] transition hover:bg-[#f3e9dc]"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem?.(item.id)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#9a766c] transition hover:text-[#a12a35]"
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleContinueShopping}
                className="mb-5 mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7b2630] transition hover:text-[#ad8548]"
              >
                <Plus size={15} />
                Add more sweetness
              </button>
            </div>

            {/* Order summary */}
            <div className="border-t border-[#e9ddcf] bg-white px-5 pb-6 pt-5 sm:px-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-[#806d62]">
                  Subtotal
                </span>
                <span className="font-serif text-2xl text-[#4a101b]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="mb-5 text-xs leading-5 text-[#998679]">
                Delivery charges and any applicable taxes will be confirmed
                during order confirmation.
              </p>

              <button
                type="button"
                onClick={onCheckout}
                className="flex w-full items-center justify-center gap-3 bg-[#6d1725] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#4a101b]"
              >
                Continue to checkout
                <ArrowRight size={16} />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#9a8173]">
                <ShieldCheck size={15} className="text-[#ad8548]" />
                Thoughtfully packed with care
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
