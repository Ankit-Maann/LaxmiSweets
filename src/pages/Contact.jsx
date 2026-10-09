
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

// Replace these placeholders with your real shop details.
const SHOP_EMAIL = "ankitmaann@gmail.com";
const SHOP_PHONE = "+917878054308";
const SHOP_ADDRESS = "VT road near pacific mall";
const SHOP_HOURS = "24*7 all day";

const contactDetails = [
  {
    icon: Phone,
    label: "Call us",
    value: SHOP_PHONE,
    note: "We're happy to help with your order.",
    href: `tel:${SHOP_PHONE.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email us",
    value: SHOP_EMAIL,
    note: "Send us your questions and enquiries.",
    href: `mailto:${SHOP_EMAIL}`,
  },
  {
    icon: MapPin,
    label: "Visit our shop",
    value: SHOP_ADDRESS,
    note: "We'd love to welcome you.",
    href: null,
  },
  {
    icon: Clock3,
    label: "Opening hours",
    value: SHOP_HOURS,
    note: "Update this with your current timings.",
    href: null,
  },
];

const enquiryTypes = [
  "General enquiry",
  "Sweet order",
  "Wedding catering",
  "Festival gifting",
  "Corporate gifting",
  "Bulk order",
];

function Eyebrow({ children, light = false }) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${
        light ? "text-[#e4c78b]" : "text-[#a67b3e]"
      }`}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#40171b] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-sm leading-7 text-[#77665d] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function ContactCard({ detail, index }) {
  const Icon = detail.icon;

  return (
    <div
      className="group rounded-2xl border border-[#eadfce] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c8a66c] hover:shadow-xl hover:shadow-[#40171b]/5 sm:p-7"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f0e4] text-[#7a252e] transition group-hover:bg-[#7a252e] group-hover:text-white">
        <Icon size={20} strokeWidth={1.6} />
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a67b3e]">
        {detail.label}
      </p>

      {detail.href ? (
        <a
          href={detail.href}
          className="mt-2 block break-words font-serif text-xl text-[#40171b] transition hover:text-[#a67b3e]"
        >
          {detail.value}
        </a>
      ) : (
        <p className="mt-2 break-words font-serif text-xl text-[#40171b]">
          {detail.value}
        </p>
      )}

      <p className="mt-3 text-sm leading-6 text-[#89786d]">{detail.note}</p>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    enquiryType: "General enquiry",
    message: "",
  });

  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      SHOP_EMAIL === "yourshop@example.com" ||
      !SHOP_EMAIL.includes("@")
    ) {
      setError(
        "Please add your real shop email in the SHOP_EMAIL setting at the top of Contact.jsx before sending enquiries."
      );
      return;
    }

    const subject = `${form.enquiryType} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Email: ${form.email}`,
      `Enquiry type: ${form.enquiryType}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="overflow-hidden bg-[#fffdf9] text-[#40171b]">
      {/* HERO */}
      <section className="relative flex min-h-[590px] items-center bg-[#40171b] sm:min-h-[650px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=2000&q=85"
            alt="Beautifully arranged chocolates and sweets"
            className="h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b1014] via-[#40171b]/90 to-[#40171b]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b1014]/70 via-transparent to-[#2b1014]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow light>We'd love to hear from you</Eyebrow>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#fffaf1] sm:text-7xl lg:text-8xl">
              Let's make
              <br />
              something <span className="italic text-[#e4c78b]">sweet.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#f1e6d9]/85 sm:text-base sm:leading-8">
              Planning a celebration, looking for a thoughtful gift, or simply
              craving your favourite mithai? We're here to help make every
              moment a little sweeter.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-3 rounded-full bg-[#e4c78b] px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-[#40171b] transition hover:bg-white"
              >
                Send an enquiry
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact-details"
                className="inline-flex items-center gap-2 px-3 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white/90 transition hover:text-[#e4c78b]"
              >
                Find our details
                <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <div className="absolute bottom-7 right-8 hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60 md:flex">
            <Sparkles size={15} className="text-[#e4c78b]" />
            Every occasion deserves something special
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-b border-[#eadfce] bg-[#f8f1e6]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#e4d6c3] px-5 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
          {[
            ["01", "Personalised service"],
            ["02", "Celebrations & catering"],
            ["03", "Gifting made memorable"],
          ].map(([number, label]) => (
            <div
              key={number}
              className="flex items-center justify-center gap-4 py-5 sm:py-7"
            >
              <span className="font-serif text-sm italic text-[#a67b3e]">
                {number}
              </span>
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#5b3432] sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section
        id="contact-details"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Get in touch"
            title="We're just a conversation away."
            description="Whether it's a quick question or a big celebration in the making, choose the easiest way to reach us."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactDetails.map((detail, index) => (
              <ContactCard
                key={detail.label}
                detail={detail}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM + LOCATION */}
      <section className="bg-[#f7f0e6] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* FORM */}
          <div
            id="contact-form"
            className="scroll-mt-24 rounded-3xl border border-[#e8dccb] bg-white p-6 shadow-xl shadow-[#40171b]/5 sm:p-9 lg:p-11"
          >
            <Eyebrow>Write to us</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-[#40171b] sm:text-5xl">
              Tell us what
              <br />
              you're dreaming of.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77665d]">
              Share a few details and we'll help you figure out the sweetest
              way forward.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#684742]"
                  >
                    Your name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    required
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[#e7dbca] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#40171b] outline-none transition placeholder:text-[#b5a69a] focus:border-[#a67b3e] focus:ring-2 focus:ring-[#a67b3e]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#684742]"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    placeholder="+91"
                    className="w-full rounded-xl border border-[#e7dbca] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#40171b] outline-none transition placeholder:text-[#b5a69a] focus:border-[#a67b3e] focus:ring-2 focus:ring-[#a67b3e]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#684742]"
                >
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#e7dbca] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#40171b] outline-none transition placeholder:text-[#b5a69a] focus:border-[#a67b3e] focus:ring-2 focus:ring-[#a67b3e]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiryType"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#684742]"
                >
                  What can we help with? *
                </label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  value={form.enquiryType}
                  onChange={updateField}
                  required
                  className="w-full rounded-xl border border-[#e7dbca] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#40171b] outline-none transition focus:border-[#a67b3e] focus:ring-2 focus:ring-[#a67b3e]/10"
                >
                  {enquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#684742]"
                >
                  Your message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  required
                  rows={5}
                  placeholder="Tell us about your order, event, preferred date, quantity, or any questions..."
                  className="w-full resize-y rounded-xl border border-[#e7dbca] bg-[#fffdf9] px-4 py-3.5 text-sm leading-6 text-[#40171b] outline-none transition placeholder:text-[#b5a69a] focus:border-[#a67b3e] focus:ring-2 focus:ring-[#a67b3e]/10"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#7a252e] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#40171b] sm:w-auto"
              >
                Send your enquiry
                <Send
                  size={15}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </button>

              <p className="text-xs leading-5 text-[#978579]">
                Your email app will open with your message ready to send.
                This form does not send or store enquiries directly on a server.
              </p>
            </form>
          </div>

          {/* LOCATION + HELP */}
          <div className="flex flex-col gap-6">
            <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-3xl bg-[#40171b] p-7 sm:min-h-[380px] sm:p-10">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, transparent 47%, #e4c78b 48%, transparent 49%), linear-gradient(-45deg, transparent 47%, #e4c78b 48%, transparent 49%)",
                    backgroundSize: "62px 62px",
                  }}
                />
              </div>

              <div className="relative flex h-full min-h-[260px] flex-col justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e4c78b]/40 bg-[#e4c78b]/10 text-[#e4c78b]">
                  <MapPin size={25} strokeWidth={1.5} />
                </div>

                <div className="mt-12">
                  <Eyebrow light>Come say hello</Eyebrow>
                  <h3 className="max-w-md font-serif text-4xl leading-tight text-[#fffaf1] sm:text-5xl">
                    Your next sweet memory starts here.
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                    {SHOP_ADDRESS}. Add your verified shop location and a
                    Google Maps link here so customers can find you easily.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      SHOP_ADDRESS
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#e4c78b] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#40171b] transition hover:bg-white"
                  >
                    Find us on maps
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e5d6c3] bg-[#fffdf9] p-7 sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5ead9] text-[#7a252e]">
                  <MessageCircle size={21} strokeWidth={1.6} />
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#40171b]">
                    Planning something special?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#77665d]">
                    From wedding mithai to festive hampers and large
                    celebrations, let's create an experience your guests will
                    remember.
                  </p>
                  <Link
                    to="/catering"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8b5b28] transition hover:text-[#40171b]"
                  >
                    Explore catering
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e5d6c3] bg-[#fffdf9] p-7 sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5ead9] text-[#7a252e]">
                  <CheckCircle2 size={21} strokeWidth={1.6} />
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#40171b]">
                    Know what you're craving?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#77665d]">
                    Browse our collection of traditional favourites and
                    discover something new for your next celebration.
                  </p>
                  <Link
                    to="/sweets"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8b5b28] transition hover:text-[#40171b]"
                  >
                    Explore our sweets
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-[#40171b] px-5 py-20 text-center sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute -left-20 -top-28 h-64 w-64 rounded-full border border-[#e4c78b]/15" />
        <div className="pointer-events-none absolute -bottom-36 -right-20 h-80 w-80 rounded-full border border-[#e4c78b]/15" />

        <div className="relative mx-auto max-w-3xl">
          <Sparkles size={25} className="mx-auto mb-6 text-[#e4c78b]" />
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#e4c78b]">
            Laxmi Sweets
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[#fffaf1] sm:text-6xl">
            Every sweet has
            <br />
            a story to tell.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Let us be a small part of your big moments, happy traditions, and
            everyday celebrations.
          </p>

          <Link
            to="/sweets"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#e4c78b] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#40171b] transition hover:bg-white"
          >
            Discover our sweets
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
