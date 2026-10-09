
import { useEffect, useState } from "react";
import {
  X,
  ShoppingBag,
  UserRound,
  Phone,
  MapPin,
  CalendarDays,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price || 0);

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  deliveryDate: "",
  occasion: "",
  notes: "",
  paymentMethod: "upi",
};

export default function CheckoutModal({
  isOpen = false,
  onClose,
  items = [],
  onSubmitOrder,
  isSubmitting = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const validItems = items.filter(
    (item) => item && item.id && Number(item.quantity) > 0
  );

  const subtotal = validItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity),
    0
  );

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (validItems.length === 0) {
      setError("Your shopping bag is empty. Please add some sweets first.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    if (typeof onSubmitOrder !== "function") {
      setError("Checkout is not connected yet. Please contact the shop to order.");
      return;
    }

    const order = {
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        pincode: form.pincode.trim(),
      },
      deliveryDate: form.deliveryDate,
      occasion: form.occasion,
      notes: form.notes.trim(),
      paymentMethod,
      items: validItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price || 0),
        quantity: Number(item.quantity),
      })),
      subtotal,
      currency: "INR",
    };

    try {
      await onSubmitOrder(order);
    } catch {
      setError("We couldn't submit your request. Please try again.");
    }
  };

  const inputClass =
    "mt-2 w-full rounded-sm border border-[#e6d8c9] bg-white px-4 py-3 text-sm text-[#4a101b] outline-none transition placeholder:text-[#b5a497] focus:border-[#8c5b38] focus:ring-1 focus:ring-[#8c5b38]/20";

  const labelClass =
    "block text-xs font-semibold uppercase tracking-[0.12em] text-[#6b4b41]";

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-[#21100f]/60 backdrop-blur-sm sm:items-center sm:p-5"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close checkout"
        disabled={isSubmitting}
        onClick={onClose}
        className="absolute inset-0 cursor-default disabled:cursor-wait"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="relative flex max-h-[95dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-xl bg-[#fffdf8] shadow-2xl sm:max-h-[90dvh] sm:flex-row sm:rounded-xl"
      >
        {/* Form side */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mb-7 flex items-start justify-between">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ad8548]">
                Laxmi Sweets
              </p>
              <h2
                id="checkout-title"
                className="font-serif text-3xl text-[#4a101b] sm:text-4xl"
              >
                Almost yours.
              </h2>
              <p className="mt-2 text-sm text-[#89766b]">
                Tell us where to deliver your sweetness.
              </p>
            </div>

            <button
              type="button"
              aria-label="Close checkout"
              disabled={isSubmitting}
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#eadfd1] text-[#5b3933] transition hover:bg-[#f4ece3] disabled:opacity-50"
            >
              <X size={19} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Payment method */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#4a101b]">
                <ShieldCheck size={18} className="text-[#ad8548]" />
                Payment method
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["upi", "UPI", "Pay via UPI / QR"],
                  ["razorpay", "Razorpay", "Cards, UPI & more"],
                  ["cod", "Pay on delivery", "Confirm with the shop"],
                ].map(([value, title, copy]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentMethod(value)}
                    className={`rounded-xl border p-4 text-left transition ${paymentMethod === value ? "border-[#ad8548] bg-[#fff7e8] ring-1 ring-[#ad8548]/20" : "border-[#e6d8c9] bg-white hover:border-[#c6a36a]"}`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-serif text-base text-[#4a101b]">{title}</span>
                      <span className={`h-3 w-3 rounded-full border ${paymentMethod === value ? "border-[#7a252e] bg-[#7a252e]" : "border-[#c9b9a7]"}`} />
                    </span>
                    <span className="mt-1 block text-[10px] leading-5 text-[#927c6d]">{copy}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-5 text-[#927c6d]">Online payment is shown as a checkout option; connect your Razorpay backend/order creation before accepting live payments.</p>
            </div>

            {/* Customer details */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#4a101b]">
                <UserRound size={18} className="text-[#ad8548]" />
                Your details
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Full name *
                  <input
                    className={inputClass}
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>

                <label className={labelClass}>
                  Mobile number *
                  <span className="relative block">
                    <Phone
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ad9988]"
                    />
                    <input
                      className={`${inputClass} pl-9`}
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="10-digit mobile number"
                      autoComplete="tel"
                      required
                      maxLength={10}
                    />
                  </span>
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Email address
                  <input
                    className={inputClass}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={150}
                  />
                </label>
              </div>
            </div>

            {/* Delivery details */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#4a101b]">
                <MapPin size={18} className="text-[#ad8548]" />
                Delivery details
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className={`${labelClass} sm:col-span-2`}>
                  Delivery address *
                  <textarea
                    className={`${inputClass} min-h-20 resize-y`}
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    placeholder="House / flat, street, area, landmark"
                    autoComplete="street-address"
                    required
                    rows={2}
                    maxLength={500}
                  />
                </label>

                <label className={labelClass}>
                  City *
                  <input
                    className={inputClass}
                    name="city"
                    value={form.city}
                    onChange={updateField}
                    placeholder="Your city"
                    autoComplete="address-level2"
                    required
                    maxLength={100}
                  />
                </label>

                <label className={labelClass}>
                  PIN code *
                  <input
                    className={inputClass}
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={updateField}
                    placeholder="6-digit PIN code"
                    autoComplete="postal-code"
                    required
                    maxLength={6}
                  />
                </label>

                <label className={labelClass}>
                  Preferred delivery date
                  <span className="relative block">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ad9988]"
                    />
                    <input
                      className={`${inputClass} pl-9`}
                      name="deliveryDate"
                      type="date"
                      value={form.deliveryDate}
                      onChange={updateField}
                      min={minDate}
                    />
                  </span>
                </label>

                <label className={labelClass}>
                  Occasion
                  <select
                    className={inputClass}
                    name="occasion"
                    value={form.occasion}
                    onChange={updateField}
                  >
                    <option value="">Select occasion</option>
                    <option value="Everyday">Just because</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Festival">Festival</option>
                    <option value="Corporate">Corporate gifting</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Payment preference
                  <select
                    className={inputClass}
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={updateField}
                  >
                    <option value="upi">UPI / Online payment</option>
                    <option value="cod">Cash on delivery</option>
                    <option value="bank">Bank transfer</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Additional note */}
            <div>
              <label className={labelClass}>
                <span className="flex items-center gap-2">
                  <MessageSquare size={15} className="text-[#ad8548]" />
                  Special instructions
                </span>
                <textarea
                  className={`${inputClass} min-h-20 resize-y`}
                  name="notes"
                  value={form.notes}
                  onChange={updateField}
                  placeholder="Gift message, preferred packaging, or other requests..."
                  rows={2}
                  maxLength={1000}
                />
              </label>
            </div>

            {error && (
              <p
                role="alert"
                className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 border-t border-[#eadfd1] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7b2630] hover:text-[#ad8548] disabled:opacity-50"
              >
                <ArrowLeft size={15} />
                Back to bag
              </button>

              <button
                type="submit"
                disabled={isSubmitting || validItems.length === 0}
                className="inline-flex items-center justify-center gap-3 bg-[#6d1725] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#4a101b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit order request"}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </div>
          </form>
        </div>

        {/* Order summary side */}
        <aside className="shrink-0 border-t border-[#eadfd1] bg-[#f7f0e6] px-5 py-6 sm:w-[320px] sm:overflow-y-auto sm:border-l sm:border-t-0 sm:px-7 sm:py-8 lg:w-[350px]">
          <div className="mb-6 flex items-center gap-3">
            <ShoppingBag size={19} className="text-[#ad8548]" />
            <h3 className="font-serif text-xl text-[#4a101b]">
              Your sweet selection
            </h3>
          </div>

          <div className="space-y-4">
            {validItems.length === 0 ? (
              <p className="py-6 text-sm text-[#89766b]">
                Your bag is empty.
              </p>
            ) : (
              validItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[#eadfd1]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#8a5a4e]">
                        <ShoppingBag size={21} />
                      </div>
                    )}

                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6d1725] px-1 text-[10px] text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-base text-[#4a101b]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-[#927c6d]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-[#4a101b]">
                    {formatPrice(Number(item.price || 0) * item.quantity)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="my-6 border-t border-[#e3d4c3]" />

          <div className="flex items-center justify-between text-sm text-[#806d62]">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-[#806d62]">
            <span>Delivery</span>
            <span className="text-xs">Confirmed separately</span>
          </div>

          <div className="my-5 border-t border-[#e3d4c3]" />

          <div className="flex items-center justify-between gap-3">
            <span className="font-serif text-xl text-[#4a101b]">
              Estimated total
            </span>
            <span className="font-serif text-2xl text-[#6d1725]">
              {formatPrice(subtotal)}
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-[#927c6d]">
            This estimate excludes delivery fees and any applicable taxes.
            Final pricing will be confirmed by the shop.
          </p>

          <div className="mt-7 border border-[#e5d4bf] bg-[#fffaf2] p-4">
            <ShieldCheck
              size={20}
              className="mb-2 text-[#ad8548]"
            />
            <p className="font-serif text-base text-[#4a101b]">
              Made with care
            </p>
            <p className="mt-1 text-xs leading-5 text-[#927c6d]">
              Your order details will be handled by the shop once a secure
              order submission service is connected.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
