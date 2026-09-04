import { motion } from "motion/react";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SectionLabel } from "./About";

type Item = {
  emoji: string;
  title: string;
  body: string;
  accent: string; // hsl color
  glow: string; // rgba
};

const items: Item[] = [
  {
    emoji: "⭐",
    title: "Why Choose Nova Studio?",
    body: "Nova Studio combines 5+ years of hands-on engineering with premium design craft. Every project is treated like a flagship product — meticulously planned, elegantly designed and shipped with world-class polish.",
    accent: "hsl(45 90% 60%)",
    glow: "rgba(255,215,0,0.28)",
  },
  {
    emoji: "🚀",
    title: "Why Our Development Process Works",
    body: "We follow a proven six-step process: Discovery → Design → Build → Test → Launch → Support. Clear milestones, frequent previews and transparent communication keep you in control from day one to delivery.",
    accent: "hsl(200 90% 60%)",
    glow: "rgba(56,189,248,0.28)",
  },
  {
    emoji: "🤖",
    title: "Why We Use AI",
    body: "AI accelerates everything we do — from prototyping and design exploration to code generation, QA and content. You get better products, faster delivery and a real competitive edge without sacrificing quality.",
    accent: "hsl(280 80% 65%)",
    glow: "rgba(192,132,252,0.28)",
  },
  {
    emoji: "📱",
    title: "Why Our Apps Perform Better",
    body: "We engineer for speed, smooth animations and low battery usage. Native-quality performance, buttery-smooth 60fps interfaces and thoughtful UX make every tap feel premium.",
    accent: "hsl(150 70% 55%)",
    glow: "rgba(52,211,153,0.28)",
  },
  {
    emoji: "🌍",
    title: "Worldwide Client Support",
    body: "We serve clients across every timezone. Async communication, weekly updates and on-demand video calls mean your project keeps moving whether you're in New York, Lagos, London or Tokyo.",
    accent: "hsl(15 90% 62%)",
    glow: "rgba(251,146,60,0.28)",
  },
  {
    emoji: "🔒",
    title: "Security & Reliability",
    body: "Bank-grade encryption, secure auth, role-based access control and rigorous testing are built into every product. Your data — and your customers' data — stays protected.",
    accent: "hsl(340 85% 62%)",
    glow: "rgba(244,114,182,0.28)",
  },
  {
    emoji: "⚡",
    title: "Fast Delivery Process",
    body: "Modern tooling, reusable design systems and AI-assisted workflows compress delivery timelines dramatically — without cutting corners on quality, testing or polish.",
    accent: "hsl(45 90% 60%)",
    glow: "rgba(255,215,0,0.28)",
  },
  {
    emoji: "💎",
    title: "Premium Design Philosophy",
    body: "We believe great software should feel effortless. Thoughtful typography, refined motion, considered color and disciplined layout come together to create experiences users genuinely enjoy.",
    accent: "hsl(200 90% 60%)",
    glow: "rgba(56,189,248,0.28)",
  },
];

export function WhyMe() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="why-me" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel>Why Choose Us</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-[4rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[5rem] lg:text-[6rem]">
            Premium results, <span className="text-gold-gradient italic">personal</span> attention.
          </h2>
          <p className="mt-5 text-base text-foreground/85 md:text-lg">
            Everything that makes Nova Studio the studio of choice for serious founders and brands.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur-xl transition-colors"
                style={{
                  borderColor: isOpen ? item.accent : "hsl(0 0% 100% / 0.08)",
                  boxShadow: isOpen ? `0 20px 60px -20px ${item.glow}` : undefined,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-[3px]"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${item.accent}, transparent)`,
                    opacity: isOpen ? 1 : 0.35,
                  }}
                />
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-xl"
                      style={{
                        borderColor: `${item.accent}55`,
                        backgroundColor: `${item.accent}18`,
                      }}
                    >
                      {item.emoji}
                    </span>
                    <span
                      className="font-display text-lg font-semibold md:text-2xl"
                      style={{ color: isOpen ? item.accent : "#ffffff" }}
                    >
                      {item.title}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: item.accent,
                      backgroundColor: isOpen ? item.accent : "transparent",
                      color: isOpen ? "#0a0a0a" : item.accent,
                    }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-7 pl-[5.25rem] pr-16 text-base leading-relaxed text-foreground/90 md:px-7 md:pl-[5.75rem] md:text-lg">
                    {item.body}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FAQ ------------------------ */

const faqs = [
  {
    q: "What services do you offer?",
    a: "Mobile app development, website design & development, web applications, UI/UX design, e-commerce, AI systems, custom software, brand identity and app publishing.",
  },
  {
    q: "Which technologies do you use?",
    a: "Modern stacks including React, Next.js, TypeScript, Flutter, Node.js, Supabase, Firebase, Tailwind, and AI-assisted development tools — chosen per project.",
  },
  {
    q: "How long does it take to complete a project?",
    a: "Small websites ship in days; larger platforms and apps take a few weeks. You always get a clear delivery schedule before development begins.",
  },
  {
    q: "Can you build Android and iOS apps?",
    a: "Yes. We ship premium native-quality Android and iOS apps with beautiful interfaces, fast performance and features tailored to your users.",
  },
  {
    q: "Can you redesign or improve my existing website or app?",
    a: "Absolutely. We modernize legacy UI, improve performance, fix bugs, add new features and re-architect systems for scale.",
  },
  {
    q: "Do you provide maintenance and technical support?",
    a: "Yes. Ongoing maintenance, security updates, performance monitoring, bug fixes and long-term technical support after delivery.",
  },
  {
    q: "Can you publish my app on Google Play or the App Store?",
    a: "Yes. We prepare, optimize and publish your apps on Google Play and Apple's App Store, following each platform's guidelines.",
  },
  {
    q: "How do we get started?",
    a: "Reach out through the Contact section. We'll discuss your goals, requirements, budget and timeline before starting development.",
  },
  {
    q: "Why should I choose Nova Studio?",
    a: "Technical expertise + world-class design + clear communication + fast delivery + reliable long-term support — all in one studio.",
  },
];

const FAQ_ACCENTS = [
  { ring: "hsl(45 90% 60%)", glow: "rgba(255,215,0,0.28)" },
  { ring: "hsl(200 90% 60%)", glow: "rgba(56,189,248,0.28)" },
  { ring: "hsl(280 80% 65%)", glow: "rgba(192,132,252,0.28)" },
  { ring: "hsl(150 70% 55%)", glow: "rgba(52,211,153,0.28)" },
  { ring: "hsl(15 90% 62%)", glow: "rgba(251,146,60,0.28)" },
  { ring: "hsl(340 85% 62%)", glow: "rgba(244,114,182,0.28)" },
  { ring: "hsl(45 90% 60%)", glow: "rgba(255,215,0,0.28)" },
  { ring: "hsl(200 90% 60%)", glow: "rgba(56,189,248,0.28)" },
  { ring: "hsl(280 80% 65%)", glow: "rgba(192,132,252,0.28)" },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-[4rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[5rem] lg:text-[6rem]">
            Questions? <span className="text-gold-gradient italic">Answers.</span>
          </h2>
          <p className="mt-5 text-base text-foreground/85 md:text-lg">
            Everything you need to know before starting your next project with Nova Studio.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const accent = FAQ_ACCENTS[i % FAQ_ACCENTS.length];
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur-xl"
                style={{
                  borderColor: isOpen ? accent.ring : "hsl(0 0% 100% / 0.08)",
                  boxShadow: isOpen ? `0 20px 60px -20px ${accent.glow}` : undefined,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-display text-lg font-semibold md:text-2xl"
                    style={{ color: isOpen ? accent.ring : "#ffffff" }}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: accent.ring,
                      backgroundColor: isOpen ? accent.ring : "transparent",
                      color: isOpen ? "#0a0a0a" : accent.ring,
                    }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-7 pr-16 text-base leading-relaxed text-foreground/90 md:px-7 md:text-lg">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
