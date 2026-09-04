import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  Globe,
  Mail,
  MessageCircle,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { FloatingActions } from "@/components/portfolio/FloatingActions";
import { BottomNav } from "@/components/portfolio/BottomNav";
import { getProject, type Project } from "@/components/portfolio/projects-data";
import { ImageLightbox, type LightboxItem } from "@/components/portfolio/ImageLightbox";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project as Project | undefined;
    if (!p) return { meta: [{ title: "Project — Nova Studio" }] };
    return {
      meta: [
        { title: `${p.title} — Nova Studio` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.title} — Case Study` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.image },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-gold">404</p>
        <h1 className="mt-2 font-display text-3xl">Project not found</h1>
        <Link
          to="/"
          hash="portfolio"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-sm text-gold hover:bg-gold hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
      </div>
    </main>
  ),
  errorComponent: () => (
    <main className="grid min-h-screen place-items-center bg-background text-foreground">
      <p>Something went wrong loading this project.</p>
    </main>
  ),
});

const statusStyles: Record<string, string> = {
  Live: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Beta: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  Completed: "border-sky-400/40 bg-sky-400/10 text-sky-300",
};

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems: LightboxItem[] = p.screenshots.map((src, idx) => ({
    src,
    alt: `${p.title} screenshot ${idx + 1}`,
    title: p.title,
    caption: `${p.title} · Screenshot ${idx + 1} of ${p.screenshots.length}`,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground grain pb-24 sm:pb-0">
      <Nav />

      {/* Hero banner */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          className="absolute inset-0 -z-10 opacity-30 blur-3xl"
          style={{
            backgroundImage: `url(${p.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/95 to-background" />

        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                  {p.cat}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur ${
                    statusStyles[p.status] ?? statusStyles.Live
                  }`}
                >
                  ● {p.status}
                </span>
              </div>

              <h1 className="mt-5 font-display text-5xl leading-tight md:text-6xl lg:text-7xl">
                <span className="text-gold-gradient">{p.title}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {p.short}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {p.liveDemo && (
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-primary-foreground"
                  >
                    <Globe className="h-4 w-4" /> Visit Website
                  </a>
                )}
                {p.download && (
                  <a
                    href={p.download}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-primary-foreground"
                  >
                    <Download className="h-4 w-4" />{" "}
                    {p.download.includes("play.google.com")
                      ? "View on Google Play"
                      : "Download App"}
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mx-auto w-full max-w-md group cursor-pointer"
              onClick={() => openLightbox(0)}
              title="Click to view full image"
            >
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gold/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="overflow-hidden rounded-[2rem] border border-gold/30 bg-surface/60 p-3 backdrop-blur transition-all duration-300 group-hover:border-gold/60 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                <img
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="mx-auto max-w-7xl px-6 pt-4">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-gold/20 bg-surface/60 p-5 sm:grid-cols-4">
          {[
            { label: "Platform", value: p.platform },
            { label: "Category", value: p.category },
            { label: "Version", value: p.version },
            { label: "Status", value: p.status },
          ].map((d) => (
            <div key={d.label} className="text-center">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {d.label}
              </div>
              <div className="mt-1 font-display text-lg text-gold-gradient">{d.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Statistics */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading kicker="Impact" title="Project Statistics" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/75">
            Portfolio Figures
          </span>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {p.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-6 text-center shadow-lg transition-all duration-300 hover:border-gold/50 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.25)]"
            >
              {/* Photographic Background with Subdued Tone & Dark Gradient */}
              {s.backgroundImage && (
                <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
                  <img
                    src={s.backgroundImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center opacity-30 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-40"
                  />
                  {/* Dark gradient & vignette overlay for maximum readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="font-display text-3xl font-bold tracking-tight text-gold-gradient drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-foreground/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screenshots gallery */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Gallery" title="App Screenshots" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {p.screenshots.map((src, i) => (
            <motion.button
              key={src + i}
              type="button"
              onClick={() => openLightbox(i)}
              aria-label={`View ${p.title} screenshot ${i + 1} full size`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className="group relative block w-full text-left overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all hover:border-gold/40 hover:gold-glow cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <img
                src={src}
                alt={`${p.title} screenshot ${i + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/80 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gold shadow-lg backdrop-blur-sm">
                  <ZoomIn className="h-3.5 w-3.5" /> View
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading kicker="Overview" title="Project Overview" />
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{p.overview}</p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Capabilities" title="Key Features" />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-gold/40"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed">{f}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Stack" title="Technologies Used" />
        <div className="mt-10 flex flex-wrap gap-3">
          {p.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-gold/30 bg-gold/5 px-5 py-2 text-sm text-foreground/90"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Engineering" title="Challenges Solved" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {p.challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-3xl border border-border bg-surface/60 p-7 transition-all hover:border-gold/40 hover:gold-glow"
            >
              <Sparkles className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-display text-2xl">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Developer Process */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Workflow" title="Developer Process" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.process.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:border-gold/40"
            >
              <div className="font-display text-3xl text-gold/70">0{i + 1}</div>
              <h3 className="mt-2 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-surface/60 p-10 text-center md:p-16">
          <div className="absolute -inset-20 -z-10 bg-gold/10 blur-3xl" />
          <h2 className="font-display text-3xl md:text-5xl">
            Like what you see? <span className="text-gold-gradient italic">Let's build yours.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Available for new mobile app, web, and product engagements worldwide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </Link>
            <a
              href="https://wa.me/2349045403005"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm font-medium text-emerald-300 transition-all hover:bg-emerald-400/20"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Image Lightbox Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryItems}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        title={p.title}
      />

      <Footer />
      <FloatingActions />
      <BottomNav />
    </main>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-gold">{kicker}</div>
      <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl">
        {title} <ArrowUpRight className="inline h-6 w-6 text-gold/70" />
      </h2>
    </div>
  );
}
