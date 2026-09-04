import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CreditCard, Sparkles, Star } from "lucide-react";

const HERO_TITLE = "Professional Mobile App & Web Developer";
const HERO_SUB =
  "We design, develop, and launch premium mobile apps, AI solutions, business websites, web applications, digital platforms, and luxury brand identities for businesses worldwide.";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-24 lg:pt-52 lg:pb-36">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-gold/5 blur-[110px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full bg-silver/5 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-[11px] uppercase tracking-[0.28em] text-gold backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Nova Studio · Premium Digital Agency
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[92px]"
        >
          {HERO_TITLE.split("&")[0]}
          <span className="text-gold-gradient italic">&amp;</span>
          {HERO_TITLE.split("&")[1]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-10 max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-lg md:text-xl"
        >
          {HERO_SUB}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b] px-8 py-4 text-sm font-semibold text-primary-foreground gold-glow transition-transform hover:scale-[1.03]"
          >
            Hire Me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-8 py-4 text-sm font-medium text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            View Portfolio
          </a>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/5 px-8 py-4 text-sm font-semibold text-gold transition-all hover:border-gold hover:bg-gold/15"
          >
            <Star className="h-4 w-4 fill-current" />
            Our Services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
          <a
            href="#payments"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/40 bg-surface/45 px-8 py-4 text-sm font-semibold text-gold shadow-[0_0_0_1px_rgba(212,175,55,0.12),0_18px_48px_-26px_rgba(212,175,55,0.85)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-gold/10 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.28),0_24px_60px_-24px_rgba(212,175,55,1)]"
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-gold/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CreditCard className="relative h-4 w-4" />
            <span className="relative">Pay Now</span>
            <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-10 border-t border-border/60 pt-10"
        >
          <Stat value="5+" label="Years exp." />
          <div className="h-10 w-px bg-border" />
          <Stat value="50+" label="Projects" />
          <div className="h-10 w-px bg-border" />
          <Stat value="100%" label="Dedication" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl text-gold-gradient sm:text-4xl">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
        {label}
      </div>
    </div>
  );
}
