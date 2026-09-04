import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, Mail, MessageCircle, Search, Sparkles } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { FloatingActions } from "@/components/portfolio/FloatingActions";
import { BottomNav } from "@/components/portfolio/BottomNav";
import { SectionLabel } from "@/components/portfolio/About";
import {
  ServicePreviewModal,
  type PreviewService,
} from "@/components/portfolio/ServicePreviewModal";
import { services } from "@/components/portfolio/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Nova Studio | 80+ Premium Digital Services" },
      {
        name: "description",
        content:
          "Explore 80+ world-class digital services from Nova Studio: mobile apps, AI solutions, web platforms, cloud architecture, cybersecurity, and luxury brand design.",
      },
      { property: "og:title", content: "Our Services — Nova Studio" },
      {
        property: "og:description",
        content:
          "80+ Premium Services Built for Scale. Mobile Apps, Web Applications, AI Systems, Cloud Infrastructure, and Brand Design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Our Services — Nova Studio" },
      {
        name: "twitter:description",
        content:
          "80+ Premium Services Built for Scale. Explore our complete catalog of mobile, web, AI, and digital engineering services.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [active, setActive] = useState<PreviewService | null>(null);
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    if (!search.trim()) return services;
    const q = search.toLowerCase();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.emoji.includes(q),
    );
  }, [search]);

  return (
    <main className="relative min-h-screen bg-background text-foreground grain pb-28 sm:pb-32">
      <Nav />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[150px]" />
      </div>

      {/* Hero Header for Our Services */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <SectionLabel>Our Services</SectionLabel>
            </div>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-[5rem] lg:text-[5.5rem]">
              {services.length}+ Premium Services{" "}
              <span className="text-gold-gradient italic">Built for Scale</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
              A complete catalog of world-class digital services — from AI and mobile to cloud,
              cybersecurity, e-commerce, and luxury brand identity. Tap any service card to preview
              a live interactive app mockup.
            </p>

            {/* Quick search input */}
            <div className="mx-auto mt-8 max-w-md">
              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${services.length} services (e.g. AI, Mobile, Web, FinTech)...`}
                  className="h-12 w-full rounded-full border border-gold/30 bg-surface/70 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 backdrop-blur-xl focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((s, i) => (
              <motion.button
                key={s.title}
                type="button"
                onClick={() => setActive(s)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min((i % 12) * 0.025, 0.3) }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/60 p-6 text-left backdrop-blur-xl transition-colors hover:border-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(255,215,0,0.35)]"
              >
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${s.accent.split(" text-")[0]} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${s.accent} transition-transform group-hover:scale-105`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-lg" aria-hidden>
                      {s.emoji}
                    </span>
                    <h2
                      className={`font-display text-lg font-semibold leading-tight ${s.accent.split("text-")[1] ? "text-" + s.accent.split("text-")[1] : "text-foreground"}`}
                    >
                      {s.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold/80 group-hover:text-gold">
                    <span>Tap to preview</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="mt-12 rounded-2xl border border-border bg-surface/40 p-12 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-gold" />
              <p className="mt-3 text-lg font-medium text-foreground">
                No services matched "{search}"
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for a different keyword or view our complete catalog.
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-5 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-primary-foreground"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* CTA Banner at bottom of services page */}
          <div className="mt-20 overflow-hidden rounded-3xl border border-gold/30 bg-surface/60 p-8 text-center sm:p-12 md:p-16">
            <div className="mx-auto max-w-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                Custom Engineering
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
                Need a tailored solution?{" "}
                <span className="text-gold-gradient italic">Let's build together.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Whether you need a dedicated mobile application, a scalable enterprise system, or an
                AI-driven platform, Nova Studio delivers with speed and craftsmanship.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/"
                  hash="contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Mail className="h-4 w-4" /> Start a Project
                </Link>
                <a
                  href="https://wa.me/2349045403005"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-400/20"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicePreviewModal service={active} onClose={() => setActive(null)} />

      <Footer />
      <FloatingActions />
      <BottomNav />
    </main>
  );
}
