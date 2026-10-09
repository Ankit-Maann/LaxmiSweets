
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, House, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#fffdf9] px-5 py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full border border-[#e7d8c1]" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-96 w-96 rounded-full border border-[#e7d8c1]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#e5d3b5] bg-[#f8f0e4] text-[#8a612f]">
          <Sparkles size={28} strokeWidth={1.4} />
        </div>

        <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#a67b3e]">
          Laxmi Sweets · A little detour
        </p>

        <h1 className="font-serif text-8xl leading-none tracking-tight text-[#7a252e] sm:text-9xl">
          404
        </h1>

        <h2 className="mt-7 font-serif text-3xl leading-tight text-[#40171b] sm:text-5xl">
          Oops! This sweet
          <br />
          page is missing.
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77665d] sm:text-base">
          Looks like this page wandered off in search of mithai! Don't worry —
          there's plenty more sweetness waiting for you.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#7a252e] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#40171b]"
          >
            <House size={16} />
            Back to home
          </Link>

          <Link
            to="/sweets"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d9c8ae] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#40171b] transition hover:border-[#7a252e] hover:bg-[#f8f0e4]"
          >
            Explore our sweets
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-[#a08e7e]">
          <ArrowLeft size={13} />
          <span>Every celebration deserves a little sweetness.</span>
        </div>
      </div>
    </main>
  );
}
