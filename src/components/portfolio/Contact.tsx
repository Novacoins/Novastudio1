import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "./About";

const ACCESS_KEY = "b3825961-2c7a-4517-802e-e355bdf5557a";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "oniyetaofiqishola11@gmail.com",
    href: "mailto:oniyetaofiqishola11@gmail.com",
    accent: "from-sky-500/25 to-blue-500/10 text-sky-300",
  },
  {
    icon: Phone,
    label: "Call",
    value: "09045403005",
    href: "tel:+2349045403005",
    accent: "from-amber-500/25 to-orange-500/10 text-amber-300",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "09045403005",
    href: "https://wa.me/2349045403005",
    accent: "from-emerald-500/25 to-teal-500/10 text-emerald-300",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available Worldwide 🌍",
    href: "#",
    accent: "from-violet-500/25 to-fuchsia-500/10 text-violet-300",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const payload = new FormData();
    payload.append("access_key", ACCESS_KEY);
    payload.append("subject", `New message from ${formData.name} — Nova Studio`);
    payload.append("from_name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-5 font-display text-[4rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[5rem] lg:text-[6rem]">
              Let's build your <span className="text-gold-gradient italic">next</span> big idea.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80">
              Tell us about your project. We'll get back within 24 hours with ideas, timelines, and
              a clear path forward.
            </p>

            <div className="mt-10 space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface/60 p-5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-surface-elevated"
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${c.accent} transition-transform group-hover:scale-110`}
                  >
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="mt-1 truncate text-base font-semibold text-foreground group-hover:text-gold">
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl glass-panel p-8 md:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Your Name"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+234 904 540 3005"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Message
              </label>
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Tell us about your project, goals, and timeline..."
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 p-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b] px-8 py-4 text-sm font-semibold text-primary-foreground gold-glow transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                "Sending..."
              ) : status === "success" ? (
                "Message Sent ✓"
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
            {status === "success" && (
              <p className="mt-4 text-center text-sm text-emerald-300">
                Thank you for contacting Nova Studio. Your message has been received and we will
                respond as soon as possible.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}
