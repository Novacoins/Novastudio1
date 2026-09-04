import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Globe,
  Search,
  Sparkles,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { FloatingActions } from "@/components/portfolio/FloatingActions";
import { BottomNav } from "@/components/portfolio/BottomNav";
import { SectionLabel } from "@/components/portfolio/About";
import {
  projects,
  globalProjectPerformance,
  type Project,
} from "@/components/portfolio/projects-data";
import workspaceBg from "@/assets/images/project_perf_workspace_bg_1786918139395.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Selected Projects — Nova Studio | Launched Mobile & Web Apps" },
      {
        name: "description",
        content:
          "Explore the digital products, mobile applications, and software platforms launched and published by Nova Studio.",
      },
      { property: "og:title", content: "Selected Projects — Nova Studio" },
      {
        property: "og:description",
        content:
          "Explore the digital products and applications launched by Nova Studio. 100K+ downloads, 4.8★ average rating, and production-grade software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Selected Projects — Nova Studio" },
      {
        name: "twitter:description",
        content:
          "Explore live mobile apps, educational tools, and digital platforms engineered and published by Nova Studio.",
      },
    ],
  }),
  component: ProjectsPage,
});

function isLaunchedProject(p: Project): boolean {
  // Only display projects marked as Live or Launched
  const validStatus = p.status === "Live" || p.status === "Completed";
  const validTag =
    p.tag?.toLowerCase() === "launched" ||
    p.tag?.toLowerCase() === "live" ||
    p.tag?.toLowerCase() === "flagship" ||
    p.tag?.toLowerCase() === "just launched" ||
    p.tag?.toLowerCase() === "new" ||
    p.tag?.toLowerCase() === "new launch";
  return validStatus || validTag;
}

const categories = ["All", "Mobile Apps", "Educational Apps", "Games"];

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Only include launched/live projects
  const launchedProjects = useMemo(() => {
    return projects.filter(isLaunchedProject);
  }, []);

  const filteredProjects = useMemo(() => {
    return launchedProjects.filter((p) => {
      const matchCategory =
        activeCategory === "All" ||
        p.cat.toLowerCase() === activeCategory.toLowerCase() ||
        p.category.toLowerCase() === activeCategory.toLowerCase();

      if (!matchCategory) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [launchedProjects, activeCategory, search]);

  return (
    <main className="relative min-h-screen bg-background text-foreground grain pb-28 sm:pb-32">
      <Nav />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[150px]" />
      </div>

      {/* Header section */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14">
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
              <SectionLabel>Selected Projects</SectionLabel>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Explore the digital products and applications{" "}
              <span className="text-gold-gradient italic">I've launched.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-foreground/85 md:text-lg">
              Production-ready mobile applications and software platforms engineered with high
              performance, intuitive UX, and scalable architecture.
            </p>

            {/* Quick search input */}
            <div className="mx-auto mt-8 max-w-md">
              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by project name or technology..."
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

            {/* Category tabs */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all sm:text-sm sm:normal-case sm:tracking-normal ${
                    activeCategory === cat
                      ? "border border-gold bg-gold text-primary-foreground shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "border border-border/80 bg-surface/60 text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Launched Projects Grid */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-surface/65 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-gold/60 hover:shadow-[0_20px_60px_-20px_rgba(255,215,0,0.35)]"
              >
                {/* Thumbnail Image Link */}
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="relative block aspect-[16/10] overflow-hidden bg-black"
                >
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    width={768}
                    height={480}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold backdrop-blur-md">
                    {p.tag?.toLowerCase().includes("launched") && (
                      <Sparkles className="h-3 w-3 text-gold animate-pulse" />
                    )}
                    {p.tag || "Live"}
                  </div>
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {p.status.toUpperCase()}
                  </div>
                </Link>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="font-medium text-gold/90">{p.cat}</span>
                    <span className="text-muted-foreground/80">
                      V{p.version} · {p.platform.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-start justify-between gap-3">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                      {p.title}
                    </h2>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`View ${p.title} details`}
                      className="text-muted-foreground hover:text-gold"
                    >
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:rotate-45" />
                    </Link>
                  </div>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-foreground/80">
                    {p.short}
                  </p>

                  {/* Highlights / Stats chips if available */}
                  {p.stats && p.stats.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/5 bg-black/40 p-3">
                      {p.stats.slice(0, 2).map((st) => (
                        <div key={st.label} className="text-center">
                          <div className="text-xs font-semibold text-gold">{st.value}</div>
                          <div className="text-[10px] text-muted-foreground">{st.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-2 border-t border-border/50">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold transition-all hover:bg-gold hover:text-primary-foreground"
                    >
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    {p.download && (
                      <a
                        href={p.download}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/70 px-3.5 py-2.5 text-xs font-medium text-foreground/90 transition-colors hover:border-gold/40 hover:text-gold"
                        title="Download on Google Play"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">Google Play</span>
                      </a>
                    )}

                    {p.liveDemo && (
                      <a
                        href={p.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/70 px-3.5 py-2.5 text-xs font-medium text-foreground/90 transition-colors hover:border-gold/40 hover:text-gold"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-gold" />
                        <span className="hidden sm:inline">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-12 rounded-2xl border border-border bg-surface/40 p-12 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-gold" />
              <p className="mt-3 text-lg font-medium text-foreground">
                No launched projects matched "{search}"
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try selecting a different category or clearing the search filter.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-primary-foreground"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Standalone Global Section: PROJECT PERFORMANCE ↗ */}
          <section className="mt-20 sm:mt-28">
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-surface/85 p-6 shadow-2xl sm:p-10 md:p-12">
              {/* Realistic Developer Workspace Photographic Background */}
              <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
                <img
                  src={workspaceBg}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center opacity-30 transition-transform duration-1000 ease-out"
                />
                {/* Multi-stop dark gradient & vignette overlay for maximum contrast and readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px]" />
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
                <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
              </div>

              {/* Section Header */}
              <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/60 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    Overview
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl flex items-center gap-2">
                    PROJECT PERFORMANCE <span className="text-gold">↗</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-gold">
                    Portfolio Metrics
                  </span>
                </div>
              </div>

              {/* Four Separate Statistic Cards */}
              <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {globalProjectPerformance.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/75 p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:bg-surface/90 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.3)]"
                  >
                    {/* Category-specific realistic photographic background */}
                    {stat.backgroundImage && (
                      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
                        <img
                          src={stat.backgroundImage}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center opacity-35 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-45"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/85 to-background/60" />
                        <div className="absolute inset-0 bg-black/30" />
                      </div>
                    )}

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="font-display text-3xl font-bold tracking-tight text-gold-gradient drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-4xl">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-foreground/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
      <FloatingActions />
      <BottomNav />
    </main>
  );
}
