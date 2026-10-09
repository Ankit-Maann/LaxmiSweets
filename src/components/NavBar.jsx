
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Sweets", path: "/sweets" },
  { name: "Catering", path: "/catering" },
  { name: "Our Story", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Replace this with your shared cart count when cart state is connected.
  const cartCount = 0;

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top announcement strip */}
      <div className="bg-[#40171b] px-4 py-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-[#f7e8c9] sm:text-[10px]">
        <Sparkles size={11} className="mr-2 inline-block text-[#d8b66f]" />
        A little sweetness for every special moment
        <Sparkles size={11} className="ml-2 inline-block text-[#d8b66f]" />
      </div>

      {/* Main navigation */}
      <div className="border-b border-[#e8dccb] bg-[#fffdf9]/95 shadow-sm shadow-[#40171b]/5 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:h-[88px] lg:px-12">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center gap-3"
            aria-label="Laxmi Sweets home"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#b99759] sm:h-12 sm:w-12">
              <div className="absolute inset-1 rounded-full border border-[#b99759]/40" />
              <span className="font-serif text-2xl font-semibold text-[#7a252e]">
                L
              </span>
              <span className="absolute -right-1 -top-1 text-[#b99759]">
                <Sparkles size={13} fill="currentColor" />
              </span>
            </div>

            <div className="leading-none">
              <span className="block font-serif text-[21px] font-semibold tracking-tight text-[#40171b] sm:text-2xl">
                Laxmi Sweets
              </span>
              <span className="mt-2 block text-[8px] font-bold uppercase tracking-[0.22em] text-[#9a7743] sm:text-[9px]">
                Sweetness in every moment
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-9"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `group relative py-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "text-[#8a2831]"
                      : "text-[#654c45] hover:text-[#8a2831]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#b99759] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/sweets"
              className="hidden items-center gap-2 rounded-full bg-[#7a252e] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#40171b] xl:inline-flex"
            >
              Shop now
              <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/contact"
              aria-label={`Shopping bag (${cartCount} items)`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e6d9c7] text-[#40171b] transition hover:border-[#b99759] hover:bg-[#f8f0e4] sm:h-11 sm:w-11"
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#7a252e] px-1 text-[9px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e6d9c7] text-[#40171b] transition hover:bg-[#f8f0e4] lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
            mobileOpen
              ? "max-h-[440px] border-t border-[#eadfce] opacity-100"
              : "max-h-0 opacity-0"
          }`}
          aria-hidden={!mobileOpen}
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-5 py-3 sm:px-8"
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMobileMenu}
                tabIndex={mobileOpen ? 0 : -1}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-[#eee4d7] py-4 text-sm transition last:border-0 ${
                    isActive
                      ? "font-semibold text-[#8a2831]"
                      : "text-[#654c45] hover:text-[#8a2831]"
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <span className="font-serif text-xs italic text-[#b99759]">
                    0{index + 1}
                  </span>
                  {link.name}
                </span>
                <ChevronDown
                  size={15}
                  className="-rotate-90 text-[#b99759]"
                />
              </NavLink>
            ))}

            <Link
              to="/sweets"
              onClick={closeMobileMenu}
              tabIndex={mobileOpen ? 0 : -1}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#7a252e] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#40171b]"
            >
              Explore our sweets
              <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
