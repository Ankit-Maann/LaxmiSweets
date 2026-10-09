import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Play,
  Sparkles,
  Star,
} from "lucide-react";

import sweets from "../data/sweets.json";
import media from "../data/siteMedia.json";
import { useCart } from "../context/CartContext";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import CartDrawer from "../components/CartDrawer";
import CheckoutModal from "../components/CheckoutModal";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const testimonials = [
  ["01", "The little details make the whole experience feel special.", "Verified customer"],
  ["02", "Beautifully presented, rich flavours and perfect for gifting.", "Verified customer"],
  ["03", "Exactly the kind of mithai table we wanted for our celebration.", "Verified customer"],
];

function Home() {
  const [activeHero, setActiveHero] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [orderNotice, setOrderNotice] = useState("");
  const touchStart = useRef(null);
  const location = useLocation();

  const {
    cartItems,
    cartCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % media.hero.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.state?.orderSubmitted) {
      setOrderNotice("Your order request has been received. We’ll confirm the final details shortly.");
      window.history.replaceState({}, document.title, window.location.pathname);
      const timer = window.setTimeout(() => setOrderNotice(""), 6000);
      return () => window.clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") setActiveHero((i) => (i + 1) % media.hero.length);
      if (event.key === "ArrowLeft") setActiveHero((i) => (i - 1 + media.hero.length) % media.hero.length);
      if (event.key === "Escape") setStoryOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const featured = useMemo(() => {
    const items = Array.isArray(sweets) ? sweets : [];
    const marked = items.filter((item) => item.featured);
    return (marked.length ? marked : items).slice(0, 4);
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setCartOpen(true);
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const changeHero = (direction) => {
    setActiveHero((current) =>
      (current + direction + media.hero.length) % media.hero.length
    );
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const distance = end - touchStart.current;
    if (Math.abs(distance) > 50) changeHero(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const submitOrder = async (order) => {
    console.info("Order ready for backend/payment integration", order);
    clearCart();
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  return (
    <div className="luxury-site overflow-hidden bg-[#f8f4ec] text-[#211615]">
      {orderNotice && (
        <div className="fixed left-1/2 top-24 z-[140] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-amber-200 bg-[#fffaf2] px-5 py-4 text-center text-sm font-medium text-[#4a101b] shadow-2xl">
          {orderNotice}
        </div>
      )}

      {/* CINEMATIC HERO */}
      <section
        className="lux-hero relative isolate min-h-[calc(100svh-42px)] overflow-hidden bg-[#160b0a]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {media.hero.map((slide, index) => (
             <div
  key={slide.id}
  className={`absolute inset-0 opacity-0 transition-opacity duration-[1800ms] ease-in-out ${
    activeHero === index ? "opacity-100" : ""
  }`}
  aria-hidden={activeHero !== index}
>
           <img
  src={slide.image}
  alt=""
  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
    activeHero === index ? "scale-110" : "scale-100"
  }`}
/>
          </div>
        ))}

        <div className="lux-noise pointer-events-none absolute inset-0 z-10 opacity-[0.12]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#100707]/95 via-[#180b0a]/65 to-[#180b0a]/10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#100707]/90 via-transparent to-[#100707]/20" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_72%_42%,rgba(219,177,99,.22),transparent_30%)]" />

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-42px)] max-w-[1500px] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 lg:px-14 lg:pb-10 lg:pt-28">
          <div className="flex items-center justify-between">
            <div className="lux-reveal flex items-center gap-3" key={`eyebrow-${activeHero}`}>
              <span className="h-px w-9 bg-[#d8b66f]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#f4dfb0] sm:text-[10px]">
                {media.hero[activeHero].eyebrow}
              </span>
            </div>
            <div className="hidden items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/50 sm:flex">
              <span>Est. 1987</span>
              <span className="h-1 w-1 rounded-full bg-[#d8b66f]" />
              <span>Jaipur</span>
            </div>
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-[1fr_300px]">
            <div className="max-w-5xl">
              <div className="mb-7 flex items-center gap-3 text-[#d8b66f]">
                <Sparkles size={14} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">The art of mithai</span>
              </div>

              <h1
                key={`title-${activeHero}`}
                className="lux-title lux-reveal whitespace-pre-line font-serif text-[clamp(3.6rem,8.4vw,8.9rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#fffaf0]"
              >
                {media.hero[activeHero].title}
              </h1>

              <p key={`copy-${activeHero}`} className="lux-reveal-delay mt-8 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                {media.hero[activeHero].description}
              </p>

              <div className="lux-reveal-delay mt-9 flex flex-wrap gap-3">
                <Link to="/sweets" className="lux-gold-button group">
                  Explore the collection <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <button type="button" onClick={() => setStoryOpen(true)} className="lux-outline-button">
                  <Play size={13} fill="currentColor" /> Our story
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="border border-white/15 bg-black/10 p-4 backdrop-blur-md">
                <div className="border border-[#d8b66f]/35 p-7">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-[#d8b66f]">
                    <span>House note</span><span>0{activeHero + 1} / 0{media.hero.length}</span>
                  </div>
                  <div className="my-7 h-px bg-white/10" />
                  <p className="font-serif text-3xl leading-tight text-white">
                    A little luxury,
                    <br />
                    <em className="text-[#d8b66f]">worth sharing.</em>
                  </p>
                  <p className="mt-5 text-xs leading-6 text-white/55">Curated sweets and gifting for the moments that deserve more.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <a href="#collections" className="hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/55 transition hover:text-white sm:flex">
              <ArrowDown size={15} className="animate-bounce" /> Scroll to discover
            </a>

            <div className="ml-auto flex items-center gap-5">
              <button type="button" onClick={() => changeHero(-1)} className="lux-round-control" aria-label="Previous hero slide"><ChevronLeft size={16} /></button>
              <div className="flex items-center gap-2">
                {media.hero.map((slide, index) => (
                  <button key={slide.id} type="button" onClick={() => setActiveHero(index)} aria-label={`Show slide ${index + 1}`} className={`h-[2px] transition-all duration-500 ${index === activeHero ? "w-12 bg-[#d8b66f]" : "w-5 bg-white/30"}`} />
                ))}
              </div>
              <button type="button" onClick={() => changeHero(1)} className="lux-round-control" aria-label="Next hero slide"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* MOVING HOUSE TICKER */}
      <section className="overflow-hidden border-y border-[#3d1a1b] bg-[#2b1114] text-[#f5dfb0]">
        <div className="lux-marquee flex min-w-max items-center gap-10 py-4 text-[9px] font-semibold uppercase tracking-[0.35em] sm:text-[10px]">
          {[...Array(2)].flatMap(() => ["Handcrafted mithai", "Luxury gifting", "Made for celebrations", "Jaipur's sweet tradition", "Thoughtfully packed"]).map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10"><span>{item}</span><span className="text-[#8f6a37]">✦</span></span>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
        <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.35fr_1fr]">
          <div className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#967044]">01 / The philosophy</div>
          <div>
            <p className="lux-display max-w-5xl font-serif text-[clamp(2.8rem,6.3vw,6.8rem)] leading-[0.95] tracking-[-0.04em] text-[#3a1718]">
              We don't just make sweets.
              <br /><em className="text-[#a47a3d]">We dress memories.</em>
            </p>
            <div className="mt-10 grid gap-8 border-t border-[#d9ccb9] pt-8 sm:grid-cols-2">
              <p className="max-w-md text-sm leading-7 text-[#75645b]">Every box is a small ritual: something beautiful to open, something delicious to share, and something worth remembering.</p>
              <p className="max-w-md text-sm leading-7 text-[#75645b]">Our visual language is modern. Our soul is unmistakably Indian. The result is a house of mithai made for today's celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="bg-[#211011] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-14 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d8b66f]">02 / The house collections</p>
              <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">Choose your <em className="text-[#d8b66f]">moment.</em></h2>
            </div>
            <Link to="/sweets" className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ead6a5]">View all sweets <ArrowRight size={15} className="transition group-hover:translate-x-1" /></Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {media.collections.map((collection, index) => (
              <Link key={collection.title} to="/sweets" className={`lux-collection-card group relative overflow-hidden ${index === 1 ? "md:translate-y-12" : ""}`}>
                <img src={collection.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14090a] via-[#14090a]/25 to-transparent" />
                <div className="relative flex min-h-[470px] flex-col justify-between p-6 sm:p-8">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e7c980]">{collection.kicker}</span>
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/55">{collection.description}</p>
                    <h3 className="font-serif text-3xl leading-none sm:text-4xl">{collection.title}</h3>
                    <span className="mt-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition group-hover:border-[#d8b66f] group-hover:bg-[#d8b66f] group-hover:text-[#2b1114]"><ArrowUpRight size={16} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE SWEETS */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading eyebrow="03 / Signatures" title="The sweets people come back for." description="A considered edit of favourites — ready for your table, your guests, or someone you love." />
          <ProductGrid products={featured} onAddToCart={handleAdd} favorites={favorites} onToggleFavorite={toggleFavorite} columns={4} />
        </div>
      </section>

      {/* CRAFT EDITORIAL */}
      <section className="border-y border-[#d9ccb9] bg-[#eee6d9] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="absolute -inset-4 border border-[#b99355]/35 sm:-inset-7" />
            <img src={media.editorial.story} alt="Laxmi Sweets editorial placeholder" loading="lazy" className="relative aspect-[4/5] w-full object-cover" />
            <div className="absolute bottom-5 left-5 border border-white/20 bg-[#281114]/90 px-5 py-4 backdrop-blur"><p className="text-[8px] uppercase tracking-[0.25em] text-[#d8b66f]">Replace this image</p><p className="mt-1 font-serif text-lg text-white">With your real story.</p></div>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#967044]">04 / The craft</p>
            <h2 className="mt-5 font-serif text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-[#321415]">Old soul.<br /><em className="text-[#a47a3d]">New energy.</em></h2>
            <p className="mt-8 max-w-xl text-sm leading-8 text-[#75645b] sm:text-base">The photography can change. The feeling stays. This section is designed as an editorial canvas for your future brand photography, founder story and behind-the-scenes craft.</p>
            <button type="button" onClick={() => setStoryOpen(true)} className="lux-dark-button mt-9">Discover the house <ArrowRight size={15} /></button>
          </div>
        </div>
      </section>

      {/* EXPERIENCE STATS */}
      <section className="bg-[#f8f4ec] px-5 py-24 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1300px] border-y border-[#d9ccb9] py-10 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            {[["01", "Thoughtfully packed", "Every order is presented like a gift."], ["02", "Made to share", "Boxes and portions designed for gatherings."], ["03", "A house of moments", "From everyday treats to big celebrations."]].map(([n, title, copy]) => (
              <div key={n} className="group flex gap-5">
                <span className="font-serif text-xl italic text-[#b08a4c]">{n}</span>
                <div><h3 className="font-serif text-2xl text-[#321415]">{title}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-[#806e64]">{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-[#2b1114] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-12 flex items-end justify-between gap-5">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d8b66f]">05 / Visual diary</p><h2 className="mt-4 font-serif text-4xl text-white sm:text-6xl">A table full of <em className="text-[#d8b66f]">stories.</em></h2></div>
              <div className="hidden items-center gap-5 sm:flex">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
    className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-[#d8b66f]"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-[16px] w-[16px] transition-transform duration-300 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
    Instagram
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Facebook"
    className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 transition hover:text-[#d8b66f]"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-[16px] w-[16px] transition-transform duration-300 group-hover:-translate-y-0.5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.4v3h2.7v8h3.4Z" />
    </svg>
    Facebook
  </a>
</div>
            </div>
          <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
            {media.gallery.map((image, index) => (
              <div key={image} className={`group relative overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : index === 3 ? "row-span-2" : ""}`}>
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover opacity-85 transition duration-1000 group-hover:scale-110 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1050px] text-center">
          <Star size={18} fill="currentColor" className="mx-auto text-[#b08a4c]" />
          <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#967044]">06 / The word on the street</p>
          <blockquote key={testimonials[testimonial][0]} className="lux-quote mt-8 font-serif text-[clamp(2.3rem,5vw,5rem)] leading-[1.03] tracking-[-0.035em] text-[#321415]">“{testimonials[testimonial][1]}”</blockquote>
          <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8a766c]">— {testimonials[testimonial][2]}</p>
          <div className="mt-9 flex justify-center gap-2">
            {testimonials.map(([number], index) => <button key={number} onClick={() => setTestimonial(index)} className={`h-1 transition-all ${testimonial === index ? "w-12 bg-[#8b5c35]" : "w-5 bg-[#d3c5b3]"}`} aria-label={`Review ${index + 1}`} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#170b0c] px-5 py-28 text-center text-white sm:px-8 sm:py-40 lg:px-14">
        <div className="lux-orb absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#9c6e37]/25 blur-[90px]" />
        <div className="lux-orb absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#8a2732]/25 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#d8b66f]">07 / Your next sweet moment</p>
          <h2 className="mt-6 font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em]">Make it <em className="text-[#d8b66f]">memorable.</em></h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/55">Explore the collection, build a beautiful gift, or start planning the next celebration.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/sweets" className="lux-gold-button">Shop the sweets <ArrowUpRight size={16} /></Link>
            <Link to="/catering" className="lux-outline-button">Plan a celebration <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/35"><MapPin size={13} /> Jaipur · Rajasthan · India</div>
        </div>
      </section>

      {/* CART + CHECKOUT */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} onContinueShopping={() => setCartOpen(false)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} items={cartItems} onSubmitOrder={submitOrder} />

      {/* Story modal */}
      {storyOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#100707]/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Our story">
          <button type="button" aria-label="Close story" onClick={() => setStoryOpen(false)} className="absolute inset-0 cursor-default" />
          <div className="lux-modal relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[#d8b66f]/30 bg-[#241012] p-7 text-white shadow-2xl sm:p-12">
            <button type="button" onClick={() => setStoryOpen(false)} className="absolute right-5 top-5 text-white/50 transition hover:text-white">×</button>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d8b66f]">The Laxmi story</p>
            <h3 className="mt-5 font-serif text-4xl sm:text-6xl">A sweet house with a <em className="text-[#d8b66f]">big heart.</em></h3>
            <p className="mt-7 max-w-2xl text-sm leading-8 text-white/60">This is your future brand-story space. Replace this copy with the real Laxmi Sweets history, founder story, craft philosophy and what makes your Jaipur shop special.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">{["Craft", "Celebration", "Community"].map((item) => <div key={item} className="border border-white/10 p-5"><Sparkles size={16} className="text-[#d8b66f]" /><p className="mt-5 font-serif text-xl">{item}</p></div>)}</div>
          </div>
        </div>
      )}

      {cartCount > 0 && !cartOpen && <button type="button" onClick={() => setCartOpen(true)} className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#2b1114] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-2xl ring-1 ring-[#d8b66f]/40 transition hover:-translate-y-1"><Heart size={14} className="text-[#d8b66f]" /> Bag · {cartCount}</button>}
    </div>
  );
}

export default Home;
