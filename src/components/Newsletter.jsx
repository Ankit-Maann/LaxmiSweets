
import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, Sparkles } from "lucide-react";

export default function Newsletter({
  onSubscribe,
  title = "A Little Sweetness in Your Inbox",
  description = "Be the first to discover festive specials, seasonal treats, and sweet surprises from Laxmi Sweets.",
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (typeof onSubscribe !== "function") {
      setStatus("error");
      setMessage("Subscriptions aren't connected yet. Please try again later.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await onSubscribe(cleanEmail);
      setStatus("success");
      setMessage("You're on the list! Watch your inbox for something sweet.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("We couldn't subscribe you just now. Please try again.");
    }
  };

  return (
    <section
      className={`relative overflow-hidden bg-[#4a101b] px-5 py-16 text-white sm:px-8 sm:py-20 ${className}`}
    >
      {/* Decorative details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d6b16b]/20 sm:-right-10 sm:-top-32 sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#d6b16b]/15 sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-2 text-[#e6c68c]">
            <Sparkles size={16} strokeWidth={1.5} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs">
              A sweeter connection
            </span>
          </div>

          <h2 className="max-w-xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#e6c68c]" />
              Festive favourites
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#e6c68c]" />
              Special announcements
            </span>
          </div>
        </div>

        <div className="border border-[#d6b16b]/30 bg-white/[0.04] p-5 sm:p-7 lg:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b16b]/40 text-[#e6c68c]">
            <Mail size={21} strokeWidth={1.5} />
          </div>

          <h3 className="font-serif text-2xl text-white">
            Stay in the know
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/65">
            Sign up for occasional updates from our sweet kitchen.
          </p>

          {status === "success" ? (
            <div
              role="status"
              className="mt-6 border border-emerald-300/30 bg-emerald-100/10 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-[#e6c68c]">
                <CheckCircle2 size={18} />
                Subscription received
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                {message}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="mt-3 text-xs underline underline-offset-4 hover:text-[#e6c68c]"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <label
                htmlFor="newsletter-email"
                className="mb-2 block text-xs font-medium text-white/80"
              >
                Email address
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  disabled={status === "loading"}
                  className="min-w-0 flex-1 border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#e6c68c] disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-3 bg-[#d6b16b] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#351016] transition hover:bg-[#e6c68c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Joining..." : "Subscribe"}
                  {status !== "loading" && <ArrowRight size={15} />}
                </button>
              </div>

              {message && status === "error" && (
                <p
                  role="alert"
                  className="mt-3 text-sm text-red-200"
                >
                  {message}
                </p>
              )}

              <p className="mt-4 text-[11px] leading-5 text-white/50">
                By subscribing, you agree to receive occasional updates.
                You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
