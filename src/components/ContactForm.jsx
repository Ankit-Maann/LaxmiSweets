
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  LoaderCircle,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "General Enquiry",
  message: "",
};

export default function ContactForm({
  onSubmit,
  title = "Let's Talk Sweets",
  description = "Have a question or planning something special? Send us a message.",
  className = "",
}) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() ||
        !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (typeof onSubmit !== "function") {
      setError("The enquiry form is not connected yet. Please contact the shop directly.");
      return;
    }

    try {
      setStatus("loading");

      await onSubmit({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Your message could not be sent. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#e6dac9] bg-white px-4 py-3 text-sm text-[#35191d] outline-none transition placeholder:text-gray-400 focus:border-[#b88a43] focus:ring-2 focus:ring-[#b88a43]/20";

  return (
    <section
      className={`rounded-3xl border border-[#eee3d5] bg-[#fffdf9] p-5 shadow-sm sm:p-8 lg:p-10 ${className}`}
    >
      <div className="mb-7">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b88a43]">
          Get in Touch
        </span>

        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#501b24]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>

      {status === "success" ? (
        <div
          role="status"
          className="rounded-2xl border border-green-200 bg-green-50 px-5 py-8 text-center"
        >
          <CheckCircle
            size={42}
            className="mx-auto mb-3 text-green-700"
          />

          <h3 className="text-lg font-semibold text-green-900">
            Thank you for reaching out!
          </h3>

          <p className="mt-2 text-sm leading-6 text-green-800">
            Your enquiry has been submitted successfully.
          </p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 text-sm font-semibold text-[#501b24] underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-[#501b24]"
              >
                Your name *
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b88a43]"
                />

                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter your name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-[#501b24]"
              >
                Email address *
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b88a43]"
                />

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-phone"
                className="mb-2 block text-sm font-medium text-[#501b24]"
              >
                Phone number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b88a43]"
                />

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Your phone number"
                  autoComplete="tel"
                  maxLength={20}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-medium text-[#501b24]"
              >
                What can we help with?
              </label>

              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={updateField}
                className={inputClass}
              >
                <option>General Enquiry</option>
                <option>Sweet Order</option>
                <option>Catering Enquiry</option>
                <option>Gift Boxes</option>
                <option>Feedback</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-sm font-medium text-[#501b24]"
            >
              Your message *
            </label>

            <div className="relative">
              <MessageSquare
                size={18}
                className="absolute left-3 top-4 text-[#b88a43]"
              />

              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Tell us what you have in mind..."
                rows={5}
                maxLength={3000}
                required
                className={`${inputClass} resize-y pl-10`}
              />
            </div>

            <p className="mt-1 text-right text-xs text-gray-400">
              {form.message.length}/3000
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {status === "error" && (
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-sm font-medium text-[#501b24] underline underline-offset-4"
            >
              Try again
            </button>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#501b24] px-6 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-[#6b2634] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88a43] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Enquiry
                <Send size={17} />
              </>
            )}
          </button>

          <p className="text-xs leading-5 text-gray-500">
            Your details should only be used to respond to your enquiry.
          </p>
        </form>
      )}
    </section>
  );
}
