
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Heart,
  Gift,
  Building2,
  PartyPopper,
  CakeSlice,
  Users,
  Sparkles,
  Send,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";

const events = [
  {
    title: "Weddings",
    description: "Beautiful mithai selections for your special day.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    icon: Heart,
  },
  {
    title: "Family Celebrations",
    description: "Sweeten birthdays, anniversaries, and family gatherings.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
    icon: PartyPopper,
  },
  {
    title: "Festivals & Gifting",
    description: "Thoughtfully presented sweet boxes for special occasions.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
    icon: Gift,
  },
  {
    title: "Corporate Events",
    description: "Sweet gifts for teams, clients, and business celebrations.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
    icon: Building2,
  },
];

const packages = [
  {
    name: "The Intimate Gathering",
    subtitle: "Small celebrations",
    description: "A curated selection of classic favourites.",
    features: [
      "Curated mithai assortment",
      "Choice of selected varieties",
      "Elegant presentation options",
    ],
  },
  {
    name: "The Grand Celebration",
    subtitle: "Weddings & milestones",
    description: "A generous sweet selection for memorable occasions.",
    features: [
      "Expanded mithai selection",
      "Customisable assortment",
      "Gift-box options on request",
    ],
    popular: true,
  },
  {
    name: "The Signature Gifting",
    subtitle: "Personal & corporate gifting",
    description: "A thoughtful way to share joy and appreciation.",
    features: [
      "Sweet box selections",
      "Presentation options",
      "Bulk enquiry support",
    ],
  },
];

const sweetCategories = [
  {
    title: "Traditional Mithai",
    description: "Timeless favourites for every generation.",
    image:
      "https://images.unsplash.com/photo-1605197161470-5d9f1f0b4a0d?auto=format&fit=crop&w=700&q=85",
    to: "/sweets",
  },
  {
    title: "Festive Sweet Boxes",
    description: "Thoughtful gifting for meaningful moments.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=85",
    to: "/sweets",
  },
  {
    title: "Celebration Assortments",
    description: "A variety of treats for your guests.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=85",
    to: "/sweets",
  },
];

export default function Catering() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Wedding",
    eventDate: "",
    guests: "",
    packageName: "Not sure yet",
    details: "",
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const selectPackage = (packageName) => {
    setForm((current) => ({ ...current, packageName }));
    document.getElementById("enquire")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const submitEnquiry = (event) => {
    event.preventDefault();

    const subject = `Catering enquiry - ${form.eventType} - ${form.name}`;
    const body = [
      "Hello Laxmi Sweets,",
      "",
      "I would like to enquire about catering.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Event: ${form.eventType}`,
      `Date: ${form.eventDate || "To be confirmed"}`,
      `Guests: ${form.guests || "To be confirmed"}`,
      `Package: ${form.packageName}`,
      `Details: ${form.details || "None provided"}`,
    ].join("\n");

    // Add your real business email address here.
    const shopEmail = "yourshop@example.com";

    window.location.href =
      `mailto:${shopEmail}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-[#fcfaf6] text-stone-800">
      {/* Hero */}
      <section className="relative isolate flex min-h-[570px] items-center overflow-hidden bg-[#451722] sm:min-h-[660px]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90"
          alt="Elegant celebration setting"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#301018]/95 via-[#451722]/75 to-[#451722]/20" />

        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
            Thoughtfully made for your special day
          </p>

          <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-8xl">
            Every celebration
            <br />
            deserves a little
            <br />
            <span className="italic text-amber-300">
              more sweetness.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            From intimate family gatherings to grand weddings and corporate
            celebrations, explore sweet selections for your special occasion.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="#enquire" variant="primary" size="lg">
              Plan Your Event <ArrowRight size={16} />
            </Button>

            <Button to="#packages" variant="outline" size="lg">
              Explore Packages
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs text-white/75">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-300" />
              Made for memorable moments
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-300" />
              Options for different occasions
            </span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-16">
        <div className="overflow-hidden rounded-t-[180px] rounded-b-3xl">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85"
            alt="A beautifully arranged celebration table"
            loading="lazy"
            className="h-[430px] w-full object-cover sm:h-[550px]"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="The Laxmi experience"
            title="More than sweets. A shared tradition."
            description="Explore sweet selections for the people and occasions that matter most, with choices tailored to your gathering."
          />

          <div className="mt-8 space-y-5">
            {[
              "Selections for weddings, festivals, family gatherings, and gifting.",
              "Planning based on your event date, guest count, and preferences.",
              "Assortment and presentation options to discuss with our team.",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <Check
                  size={19}
                  className="mt-1 shrink-0 text-amber-800"
                />
                <p className="text-sm leading-7 text-stone-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event categories: reusable CategoryCard */}
      <section className="bg-[#f3eee5] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Made for every occasion"
            title="What are we celebrating?"
            description="Explore catering possibilities for every kind of gathering."
            centered
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((item) => (
              <CategoryCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                to="/contact"
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section
        id="packages"
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <SectionHeading
          eyebrow="Find your perfect fit"
          title="Sweet options for your celebration."
          description="Choose a starting point for your enquiry. Final selections, quantities, availability, and pricing need confirmation."
          centered
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <article
              key={item.name}
              className={`relative flex flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9 ${
                item.popular
                  ? "border-[#681c2b] bg-[#681c2b] text-white"
                  : "border-stone-200 bg-white"
              }`}
            >
              {item.popular && (
                <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#451722]">
                  Popular choice
                </span>
              )}

              <p className="text-xs font-bold tracking-[0.2em] text-amber-700">
                0{index + 1}
              </p>

              <p
                className={`mt-7 text-[10px] font-bold uppercase tracking-widest ${
                  item.popular ? "text-white/60" : "text-stone-400"
                }`}
              >
                {item.subtitle}
              </p>

              <h3 className="mt-2 font-serif text-3xl">{item.name}</h3>

              <p
                className={`mt-4 text-sm leading-7 ${
                  item.popular ? "text-white/75" : "text-stone-500"
                }`}
              >
                {item.description}
              </p>

              <div
                className={`my-7 h-px ${
                  item.popular ? "bg-white/20" : "bg-stone-200"
                }`}
              />

              <ul className="mb-9 flex-1 space-y-4">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-amber-500"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={() => selectPackage(item.name)}
                variant={item.popular ? "primary" : "outline"}
                size="lg"
                fullWidth
              >
                Enquire About This <ArrowRight size={16} />
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-stone-400">
          These are suggested enquiry packages, not fixed-price offers.
        </p>
      </section>

      {/* Sweet showcase: reusable CategoryCard */}
      <section className="bg-[#451722] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
                Made to be shared
              </p>
              <h2 className="font-serif text-4xl text-white sm:text-5xl">
                A spread full of little delights.
              </h2>
            </div>

            <Link
              to="/sweets"
              className="inline-flex items-center gap-3 border-b border-amber-300 pb-2 text-sm font-semibold text-amber-300"
            >
              Explore All Sweets <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {sweetCategories.map((item) => (
              <CategoryCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                to={item.to}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section
        id="enquire"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-16"
      >
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
            Let's plan something special
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#451722] sm:text-5xl">
            Tell us about
            <br />
            <span className="italic text-amber-800">
              your celebration.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-stone-500">
            Share your event details and preferences so the team can discuss
            suitable selections and next steps.
          </p>

          <div className="mt-9 space-y-5">
            <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5">
              <PhoneIcon />
              <div>
                <h3 className="font-semibold text-[#451722]">
                  Contact our team
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  Add your shop's phone number to your contact details.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                <Users size={19} />
              </span>
              <div>
                <h3 className="font-semibold text-[#451722]">
                  Your event, your preferences
                </h3>
                <p className="mt-1 text-sm leading-6 text-stone-500">
                  Guest count, sweet selection, and presentation can be
                  discussed as part of your enquiry.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submitEnquiry}
          className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_25px_80px_rgba(69,23,34,0.07)] sm:p-9 lg:p-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-800">
            Catering enquiry
          </p>
          <h3 className="mb-8 mt-2 font-serif text-3xl text-[#451722]">
            Let's get the details.
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Your name *">
              <input
                required
                name="name"
                value={form.name}
                onChange={updateField}
                className={inputClass}
                placeholder="Full name"
              />
            </FormField>

            <FormField label="Phone number *">
              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                className={inputClass}
                placeholder="Contact number"
              />
            </FormField>

            <FormField label="Email address" className="sm:col-span-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                className={inputClass}
                placeholder="you@example.com"
              />
            </FormField>

            <FormField label="Type of event *">
              <select
                required
                name="eventType"
                value={form.eventType}
                onChange={updateField}
                className={inputClass}
              >
                <option>Wedding</option>
                <option>Engagement</option>
                <option>Birthday</option>
                <option>Family Celebration</option>
                <option>Festival or Gifting</option>
                <option>Corporate Event</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Event date">
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={updateField}
                className={inputClass}
              />
            </FormField>

            <FormField label="Estimated guests">
              <select
                name="guests"
                value={form.guests}
                onChange={updateField}
                className={inputClass}
              >
                <option value="">Select guest count</option>
                <option>Under 50</option>
                <option>50–100</option>
                <option>100–250</option>
                <option>250–500</option>
                <option>500+</option>
                <option>Not sure yet</option>
              </select>
            </FormField>

            <FormField label="Preferred package">
              <select
                name="packageName"
                value={form.packageName}
                onChange={updateField}
                className={inputClass}
              >
                <option>Not sure yet</option>
                {packages.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Tell us more" className="sm:col-span-2">
              <textarea
                rows={4}
                name="details"
                value={form.details}
                onChange={updateField}
                className={inputClass}
                placeholder="Sweet preferences, gifting ideas, venue, or other details..."
              />
            </FormField>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Send Catering Enquiry <Send size={16} />
          </Button>

          <p className="mt-4 text-center text-[11px] leading-5 text-stone-400">
            No payment is collected through this form. Sending opens your email
            app; it does not confirm a booking.
          </p>
        </form>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 sm:px-10 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#f0e4ce] px-7 py-12 text-center sm:px-12 sm:py-16">
          <CakeSlice size={30} className="mx-auto mb-5 text-amber-800" />

          <SectionHeading
            eyebrow="Let's make it memorable"
            title="Your celebration. Our sweetest touch."
            description="Have a date in mind? Tell us what you're planning and start an enquiry about your catering needs."
            centered
          />

          <Button to="#enquire" variant="primary" size="lg">
            Start Your Enquiry <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-[#fcfaf6] px-4 py-3.5 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100";

function FormField({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold text-stone-600">
        {label}
      </span>
      {children}
    </label>
  );
}

function PhoneIcon() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
      <Sparkles size={19} />
    </span>
  );
}
