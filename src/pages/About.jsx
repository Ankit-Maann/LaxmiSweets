
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Sparkles,
  Leaf,
  HandHeart,
  Star,
  Gift,
  CheckCircle2,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";

const values = [
  {
    icon: Heart,
    number: "01",
    title: "Made with care",
    description:
      "Every sweet should feel special. Attention to detail makes every experience more memorable.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Tradition with elegance",
    description:
      "Celebrating familiar flavours and joyful rituals that make Indian sweets meaningful.",
  },
  {
    icon: HandHeart,
    number: "03",
    title: "Made for sharing",
    description:
      "From everyday treats to important milestones, sweets bring people together.",
  },
  {
    icon: Gift,
    number: "04",
    title: "A thoughtful experience",
    description:
      "Whether you're choosing a treat or planning a celebration, we want every interaction to feel welcoming.",
  },
];

const moments = [
  {
    title: "Everyday happiness",
    description: "A little something sweet to brighten an ordinary day.",
    image:
      "https://images.unsplash.com/photo-1605197161470-5d9f1f0b4a0d?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Festive traditions",
    description: "Sharing joy with family, friends, and familiar favourites.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Life's big milestones",
    description: "Adding a sweet touch to moments you'll always remember.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  },
];

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${
        light ? "text-amber-300" : "text-amber-800"
      }`}
    >
      <span
        className={`h-px w-8 ${
          light ? "bg-amber-300" : "bg-amber-700"
        }`}
      />
      {children}
    </p>
  );
}

function StoryHeading({ eyebrow, children, description, centered = false }) {
  return (
    <div
      className={`mb-10 max-w-2xl ${
        centered ? "mx-auto text-center" : ""
      }`}
    >
      <div className={centered ? "flex justify-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>

      <h2 className="font-serif text-4xl leading-tight text-[#451722] sm:text-5xl">
        {children}
      </h2>

      {description && (
        <p className="mt-5 text-sm leading-7 text-stone-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <div className="flex items-start gap-3 text-sm text-white/85">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-amber-300"
      />
      <span>{children}</span>
    </div>
  );
}

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfaf6] text-stone-800">
      {/* Hero */}
      <section className="relative isolate flex min-h-[570px] items-center overflow-hidden bg-[#451722] sm:min-h-[670px]">
        <img
          src="https://images.unsplash.com/photo-1605197161470-5d9f1f0b4a0d?auto=format&fit=crop&w=2200&q=90"
          alt="A selection of sweets for special occasions"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#301018]/95 via-[#451722]/75 to-[#451722]/20" />

        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
          <Eyebrow light>A little tradition, a lot of heart</Eyebrow>

          <h1 className="max-w-4xl font-serif text-5xl leading-[1.06] text-white sm:text-6xl lg:text-8xl">
            Rooted in
            <br />
            tradition.
            <br />
            <span className="italic text-amber-300">
              Made for togetherness.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            At Laxmi Sweets, we believe sweetness is about more than a flavour.
            It's about the people we share it with, the traditions we treasure,
            and the moments that stay with us.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              to="#our-story"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              Discover Our Story
            </Button>

            <Button to="/sweets" variant="outline" size="lg">
              Explore Our Sweets
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-white/70">
            <span className="flex gap-1 text-amber-300">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={14} fill="currentColor" />
              ))}
            </span>
            <span>Sweetness in every moment</span>
          </div>
        </div>
      </section>

      {/* Brand highlights */}
      <section className="border-b border-stone-200 bg-[#f6f0e7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 md:grid-cols-3 lg:px-16">
          {[
            {
              title: "Tradition",
              text: "Honouring familiar sweet traditions",
            },
            {
              title: "Togetherness",
              text: "Bringing people closer through sharing",
            },
            {
              title: "Celebration",
              text: "Making life's moments feel special",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`text-center ${
                index !== 0 ? "md:border-l md:border-stone-300" : ""
              }`}
            >
              <p className="font-serif text-2xl text-[#681c2b]">
                {item.title}
              </p>
              <p className="mt-2 text-xs tracking-wide text-stone-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-24 lg:px-16"
      >
        <div className="relative">
          <div className="overflow-hidden rounded-t-[190px] rounded-b-3xl">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85"
              alt="Food preparation and culinary craftsmanship"
              loading="lazy"
              className="h-[440px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[580px]"
            />
          </div>

          <div className="absolute -bottom-6 left-4 max-w-[270px] rounded-2xl border border-amber-200 bg-[#fffaf0] p-6 shadow-xl sm:-left-6 sm:p-7">
            <Sparkles size={22} className="mb-3 text-amber-800" />
            <p className="font-serif text-2xl leading-snug text-[#451722]">
              Sweet moments become lasting memories.
            </p>
          </div>

          <div className="absolute right-4 top-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-[#681c2b] text-center text-[9px] font-bold uppercase leading-4 tracking-widest text-amber-200 shadow-lg sm:right-8">
            Made
            <br />
            with heart
          </div>
        </div>

        <div className="pt-5 lg:pt-0">
          <StoryHeading
            eyebrow="Our story"
            description="Indian sweets have a special place in our lives. They're offered to welcome guests, shared during festivals, exchanged as gifts, and enjoyed whenever there's a reason to celebrate."
          >
            A sweet tradition
            <br />
            <span className="italic text-amber-800">worth sharing.</span>
          </StoryHeading>

          <div className="space-y-5 text-sm leading-7 text-stone-600">
            <p>
              Laxmi Sweets is built around a simple idea: every sweet moment
              deserves to feel special. We want our customers to find something
              delightful, whether they're bringing home a treat or planning a
              celebration with the people they love.
            </p>

            <p>
              Our approach is guided by a love for traditional flavours, care
              in the experience, and the happiness that comes from sharing.
              Each occasion gives us another opportunity to be part of a
              meaningful moment.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-stone-200 pt-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <Heart size={21} />
            </div>
            <div>
              <p className="font-serif text-xl text-[#451722]">
                Sweetness in every moment
              </p>
              <p className="mt-1 text-xs text-stone-500">
                The spirit behind Laxmi Sweets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f3eee5] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <StoryHeading
            centered
            eyebrow="What matters to us"
            description="The little things shape the experience. These are the principles we want every customer to feel when they choose Laxmi Sweets."
          >
            Our values,
            <br />
            <span className="italic text-amber-800">in every detail.</span>
          </StoryHeading>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.number}
                  className="group rounded-3xl border border-stone-200/80 bg-[#fcfaf6] p-7 transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#681c2b] text-amber-300 transition group-hover:rotate-3 group-hover:scale-105">
                      <Icon size={23} />
                    </span>
                    <span className="font-serif text-2xl text-amber-700/50">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif text-2xl text-[#451722]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-500">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sweet Moments */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <StoryHeading
          eyebrow="A sweet part of life"
          description="Different occasions, different traditions, and one lovely thing in common: the joy of sharing something sweet."
        >
          For the moments
          <br />
          <span className="italic text-amber-800">that matter most.</span>
        </StoryHeading>

        <div className="grid gap-6 md:grid-cols-3">
          {moments.map((moment, index) => (
            <article
              key={moment.title}
              className={`group relative min-h-[400px] overflow-hidden rounded-2xl ${
                index === 1 ? "md:mt-10" : ""
              }`}
            >
              <img
                src={moment.image}
                alt={moment.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#301018]/90 via-[#301018]/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-amber-300 backdrop-blur-sm">
                  <CheckCircle2 size={18} />
                </span>
                <h3 className="font-serif text-2xl text-white">
                  {moment.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {moment.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-[#451722] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow light>Care behind every choice</Eyebrow>

            <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
              The beauty is in
              <br />
              <span className="italic text-amber-300">
                the little details.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-white/70 sm:text-base">
              We believe choosing sweets should feel just as lovely as sharing
              them. From discovering familiar favourites to planning an
              assortment for an occasion, we want the experience to be simple,
              thoughtful, and enjoyable.
            </p>

            <div className="mt-8 space-y-5">
              <CheckItem>
                Choices for everyday treats and special occasions
              </CheckItem>
              <CheckItem>
                Sweet selections for gifting and celebrations
              </CheckItem>
              <CheckItem>
                An opportunity to discuss your preferences with our team
              </CheckItem>
            </div>

            <div className="mt-9">
              <Button
                to="/sweets"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight size={16} />}
              >
                Browse Our Sweets
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85"
                alt="A glimpse of food preparation"
                loading="lazy"
                className="h-[360px] w-full object-cover sm:h-[490px]"
              />
            </div>

            <div className="absolute -bottom-6 -left-3 max-w-[250px] rounded-2xl bg-[#fcfaf6] p-6 shadow-xl sm:-left-6 sm:p-7">
              <Leaf size={22} className="mb-3 text-amber-800" />
              <p className="font-serif text-xl leading-snug text-[#451722]">
                A thoughtful choice for every occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#f0e4ce] px-7 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute -left-12 -top-20 h-56 w-56 rounded-full border border-amber-800/10" />
          <div className="absolute -bottom-32 -right-12 h-72 w-72 rounded-full border border-amber-800/10" />

          <div className="relative mx-auto max-w-2xl">
            <Sparkles size={30} className="mx-auto mb-5 text-amber-800" />
            <div className="flex justify-center">
              <Eyebrow>Come be part of our story</Eyebrow>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#451722] sm:text-6xl">
              Let's make your
              <br />
              next moment{" "}
              <span className="italic text-amber-800">sweeter.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-stone-600">
              Discover your favourites, find a thoughtful gift, or start
              planning sweets for your next celebration.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                to="/sweets"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={16} />}
              >
                Explore Sweets
              </Button>

              <Button
                to="/catering"
                variant="outline"
                size="lg"
                icon={<ArrowRight size={16} />}
              >
                Catering Enquiries
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
