
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock3,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Replace these placeholders with your real business details.
const SHOP_PHONE = "+91 XXXXX XXXXX";
const SHOP_EMAIL = "yourshop@example.com";
const SHOP_ADDRESS = "Add your shop address here";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Our Sweets", to: "/sweets" },
  { label: "Catering", to: "/catering" },
  { label: "Our Story", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const occasions = [
  "Weddings & Celebrations",
  "Festive Gifting",
  "Corporate Orders",
  "Family Gatherings",
];

// Instagram outline icon using inline SVG.
function InstagramIcon({ size = 17 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="0.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

// Facebook logo using inline SVG.
function FacebookIcon({ size = 17 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V13h2.8v8h3.4Z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d1014] text-[#f8eee0]">
      {/* Newsletter-style CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12 lg:py-14">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d9b879]">
              <Sparkles size={14} />
              Make every moment sweeter
            </div>

            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              Have a celebration in mind?
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#e2d1c0]/70">
              From traditional mithai to memorable celebration orders, let's
              find something special for your occasion.
            </p>
          </div>

          <Link
            to="/catering"
            className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[#dfbf83] px-6 py-4 text-xs font-bold uppercase tracking-[0.13em] text-[#351318] transition hover:bg-[#f7e8c9] md:self-center"
          >
            Plan your event
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr] lg:gap-10 lg:px-12">
        {/* Brand */}
        <div>
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d9b879]">
              <div className="absolute inset-1 rounded-full border border-[#d9b879]/40" />

              <span className="font-serif text-2xl font-semibold text-[#e4c78b]">
                L
              </span>

              <Sparkles
                size={12}
                className="absolute -right-1 -top-1 text-[#e4c78b]"
                fill="currentColor"
              />
            </div>

            <div>
              <span className="block font-serif text-2xl leading-none text-[#fff6e8]">
                Laxmi Sweets
              </span>

              <span className="mt-2 block text-[8px] font-bold uppercase tracking-[0.24em] text-[#d9b879]">
                Sweetness in every moment
              </span>
            </div>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-7 text-[#e2d1c0]/70">
            Bringing people together through the joy of sweets, thoughtful
            gifting, and the little traditions that make life memorable.
          </p>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#e4c78b] transition hover:border-[#e4c78b] hover:bg-[#e4c78b] hover:text-[#351318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4c78b]"
            >
              <InstagramIcon size={17} />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#e4c78b] transition hover:border-[#e4c78b] hover:bg-[#e4c78b] hover:text-[#351318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e4c78b]"
            >
              <FacebookIcon size={17} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-6 font-serif text-xl text-[#fff6e8]">
            Explore
          </h3>

          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-2 text-sm text-[#e2d1c0]/70 transition hover:text-[#e4c78b]"
                >
                  <ArrowRight
                    size={13}
                    className="text-[#a77e46] transition-transform group-hover:translate-x-1"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Occasions */}
        <div>
          <h3 className="mb-6 font-serif text-xl text-[#fff6e8]">
            Made for moments
          </h3>

          <ul className="space-y-4">
            {occasions.map((occasion) => (
              <li key={occasion}>
                <Link
                  to="/catering"
                  className="group inline-flex items-center gap-2 text-sm text-[#e2d1c0]/70 transition hover:text-[#e4c78b]"
                >
                  <span className="h-1 w-1 rounded-full bg-[#d9b879]" />
                  {occasion}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/sweets"
            className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#e4c78b] transition hover:text-white"
          >
            Browse sweets
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Contact details */}
        <div>
          <h3 className="mb-6 font-serif text-xl text-[#fff6e8]">
            Visit or reach us
          </h3>

          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <MapPin
                size={17}
                className="mt-0.5 shrink-0 text-[#d9b879]"
              />

              <span className="text-sm leading-6 text-[#e2d1c0]/70">
                {SHOP_ADDRESS}
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Phone
                size={16}
                className="mt-0.5 shrink-0 text-[#d9b879]"
              />

              <a
                href={`tel:${SHOP_PHONE.replace(/[^\d+]/g, "")}`}
                className="text-sm text-[#e2d1c0]/70 transition hover:text-[#e4c78b]"
              >
                {SHOP_PHONE}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <Mail
                size={16}
                className="mt-0.5 shrink-0 text-[#d9b879]"
              />

              <a
                href={`mailto:${SHOP_EMAIL}`}
                className="break-all text-sm text-[#e2d1c0]/70 transition hover:text-[#e4c78b]"
              >
                {SHOP_EMAIL}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <Clock3
                size={16}
                className="mt-0.5 shrink-0 text-[#d9b879]"
              />

              <span className="text-sm leading-6 text-[#e2d1c0]/70">
                Update your shop timings
                <br />

                <Link
                  to="/contact"
                  className="mt-1 inline-flex items-center gap-1 text-xs text-[#e4c78b] hover:text-white"
                >
                  Contact us
                  <ArrowUpRight size={12} />
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-center sm:px-8 md:flex-row md:items-center md:justify-between md:text-left lg:px-12">
          <p className="text-xs text-[#e2d1c0]/55">
            © {currentYear} Laxmi Sweets. All rights reserved.
          </p>

          <p className="inline-flex items-center justify-center gap-1.5 text-xs text-[#e2d1c0]/65">
            Made with
            <Heart
              size={12}
              className="fill-[#d9b879] text-[#d9b879]"
            />
            for every sweet moment.
          </p>

          <Link
            to="/"
            className="text-xs text-[#e2d1c0]/55 transition hover:text-[#e4c78b]"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
