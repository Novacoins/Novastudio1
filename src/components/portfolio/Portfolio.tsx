import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Rocket, Globe, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "./About";
import { projects } from "./projects-data";
import novaVisionIcon from "@/assets/nova-vision-icon.png";
import nv1 from "@/assets/nova-vision-1.jpg";
import nv2 from "@/assets/nova-vision-2.jpg";
import nv3 from "@/assets/nova-vision-3.jpg";
import nv4 from "@/assets/nova-vision-4.jpg";
import nv5 from "@/assets/nova-vision-5.jpg";
import nv6 from "@/assets/nova-vision-6.jpg";

const novaVisionShots = [nv1, nv2, nv3, nv4, nv5, nv6];

const categories = ["All", "Mobile Apps", "Educational Apps", "Websites", "Business Apps"];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [shot, setShot] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setShot((s) => (s + 1) % novaVisionShots.length), 3500);
    return () => window.clearInterval(id);
  }, []);
  const visible = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-4 font-display text-[4rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[5rem] lg:text-[6rem]">
              Projects that move <span className="text-gold-gradient italic">businesses</span>{" "}
              forward.
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            Explore All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Featured Coming Soon: Nova Vision AI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-[#0a0a0a] via-[#12100a] to-[#0a0a0a] p-8 shadow-[0_40px_140px_-40px_rgba(255,215,0,0.5)] md:p-12"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-[100px]" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-gold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Coming Soon · Featured
              </div>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={novaVisionIcon}
                  alt="Nova Vision AI"
                  className="h-16 w-16 rounded-2xl border border-gold/30 object-cover shadow-[0_10px_40px_-10px_rgba(255,215,0,0.5)] md:h-20 md:w-20"
                />
                <h3 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                  Nova Vision <span className="text-gold-gradient italic">AI</span>
                </h3>
              </div>

              <p className="mt-6 text-lg font-medium text-foreground">
                See smarter. Create faster. Work better.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
                🤖 Nova Vision AI is an all-in-one intelligent assistant designed to transform the
                way you work and learn. It combines advanced AI technology with powerful visual
                recognition to deliver fast, 🚀 accurate, and intelligent results.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-foreground/90 sm:grid-cols-2">
                {[
                  "📷 Smart Camera Scanner",
                  "🧠 AI Chat Assistant",
                  "🖼️ Image Recognition",
                  "📄 Document & Text Analysis",
                  "🌍 Object & Scene Detection",
                  "👤 Personalized User Profiles",
                  "⚡ Lightning-Fast AI Responses",
                ].map((t) => (
                  <div key={t} className="rounded-lg border border-gold/20 bg-gold/5 px-3 py-2">
                    {t}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/70">
                🚀 More intelligent tools are continuously being added.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold"
                >
                  <Rocket className="h-4 w-4" /> Launching Soon
                </button>
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground/70"
                >
                  <Download className="h-4 w-4" /> Google Play · Coming Soon
                </button>
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground/70"
                >
                  <Globe className="h-4 w-4" /> Website · Coming Soon
                </button>
              </div>
            </div>

            {/* Screenshot preview */}
            <div className="relative">
              <div className="relative mx-auto aspect-[9/19] w-full max-w-[300px] overflow-hidden rounded-[2.2rem] border-[10px] border-black bg-black shadow-[0_30px_100px_-20px_rgba(255,215,0,0.4)]">
                {novaVisionShots.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Nova Vision AI screenshot ${idx + 1}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                    style={{ opacity: idx === shot ? 1 : 0 }}
                  />
                ))}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/50 to-transparent" />
              </div>
              <div className="mt-4 flex justify-center gap-1.5">
                {novaVisionShots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setShot(idx)}
                    aria-label={`Screenshot ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${idx === shot ? "w-8 bg-gold" : "w-2 bg-white/25"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                filter === c
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border bg-surface/60 text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 transition-all duration-500 hover:border-gold/60 hover:gold-glow"
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="relative block aspect-[4/3] overflow-hidden bg-black"
              >
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  width={768}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                  {p.tag?.toLowerCase().includes("launched") && (
                    <Sparkles className="h-3 w-3 text-gold animate-pulse" />
                  )}
                  {p.tag}
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-widest text-emerald-300 backdrop-blur">
                  {p.status}
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{p.cat}</span>
                  <span className="text-gold/80">
                    V{p.version} · {p.platform.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:rotate-45" />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.short}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-[10px] tracking-wide text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-primary-foreground"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
