import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bell, Music2, Pause, Play, Sparkles, Code2, GitBranch, Cpu, Wifi } from "lucide-react";
import { projects } from "./projects-data";

/* ---------------- Realistic client messages ---------------- */
const CLIENT_MESSAGES = [
  { from: "Sarah · Acme Studio", text: "Can we schedule a meeting?" },
  { from: "Daniel · Northwind", text: "Project approved 🎉" },
  { from: "Inbound", text: "New client inquiry received." },
  { from: "Lena · Orbit Labs", text: "Website delivered successfully." },
  { from: "QA · Nova Studio", text: "Mobile app ready for review." },
  { from: "Marcus · Vault Co.", text: "Loving the latest build." },
  { from: "HQ · Nova Studio", text: "Deployment finished · v.2 live." },
];

/* ---------------- Sound (WebAudio synthesized) ---------------- */
function useSfx(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!enabled) {
      ambientRef.current?.stop();
      ambientRef.current = null;
      return;
    }
    const Ctx =
      (window as unknown as { AudioContext: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 90;
    g.gain.value = 0.008;
    o.connect(g).connect(ctx.destination);
    o.start();
    ambientRef.current = {
      stop: () => {
        try {
          o.stop();
        } catch {
          /* noop */
        }
      },
    };
    return () => {
      ambientRef.current?.stop();
      ambientRef.current = null;
    };
  }, [enabled]);

  const ping = (freq: number, dur = 0.06, type: OscillatorType = "square", vol = 0.05) => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  };

  // realistic mechanical key — short noise burst + click tone
  const key = () => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    // click
    ping(1800 + Math.random() * 400, 0.012, "square", 0.025);
    // thock
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 180 + Math.random() * 60;
    g.gain.setValueAtTime(0.04, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.06);
  };

  return {
    key,
    notify: () => {
      ping(880, 0.12, "sine", 0.05);
      setTimeout(() => ping(1320, 0.16, "sine", 0.045), 110);
    },
    reply: () => ping(660, 0.18, "triangle", 0.045),
  };
}

/* ---------------- Live code stream ---------------- */
const CODE_LINES = [
  { c: "hsl(280 70% 70%)", t: "import" },
  { c: "#e5e7eb", t: " { motion } " },
  { c: "hsl(280 70% 70%)", t: "from" },
  { c: "hsl(160 70% 60%)", t: " 'framer-motion'" },
  { c: "#e5e7eb", t: ";" },
];
const SNIPPETS = [
  `export async function deploy() {`,
  `  const build = await pipeline.run();`,
  `  if (build.ok) ship(build.artifact);`,
  `}`,
  `const user = await db.users.find(id);`,
  `return <Hero data={user} />;`,
  `// optimizing bundle...`,
  `tree.shake(); minify(); compress();`,
  `app.listen(3000, () => log('ready'));`,
];

function CodeStream({ active }: { active: boolean }) {
  const [lines, setLines] = useState<string[]>(SNIPPETS.slice(0, 6));
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setLines((prev) => {
        const next = [...prev.slice(1), SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]];
        return next;
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [active]);
  return (
    <div className="font-mono text-[9px] leading-[1.5] text-white/80">
      {lines.map((l, i) => (
        <motion.div
          key={`${i}-${l}`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 0.85, x: 0 }}
          transition={{ duration: 0.4 }}
          className="truncate"
        >
          <span className="text-[hsl(45_90%_60%)]">{String(i + 142).padStart(3, "0")}</span>{" "}
          <span className="text-white/70">{l}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Terminal log stream ---------------- */
const TERMINAL_LINES = [
  "$ bun run build",
  "▲ vite v7.0 building for production…",
  "✓ 1284 modules transformed",
  "dist/assets/index.js   142.3 kb │ gzip: 48.2 kb",
  "✓ built in 1.21s",
  "$ git push origin main",
  "→ pushed 3 commits · main",
  "$ wrangler deploy",
  "✓ deployed to https://novaplay.app",
  "→ 200 OK · ttfb 84ms",
  "$ pnpm test --silent",
  "✓ 142 tests passed",
];
function TerminalLog({ active }: { active: boolean }) {
  const [lines, setLines] = useState<string[]>(TERMINAL_LINES.slice(0, 5));
  useEffect(() => {
    if (!active) return;
    let i = 5;
    const id = window.setInterval(() => {
      setLines((prev) => [...prev.slice(1), TERMINAL_LINES[i++ % TERMINAL_LINES.length]]);
    }, 1400);
    return () => window.clearInterval(id);
  }, [active]);
  return (
    <div>
      {lines.map((l, i) => (
        <motion.div
          key={`${i}-${l}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
          className="truncate"
        >
          {l}
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Project rotator ---------------- */
const rotatorItems = [
  ...projects.map((p) => ({
    name: p.title,
    image: p.image,
    category: p.category,
    platform: p.platform,
    status: p.status,
    version: p.version,
  })),
  {
    name: "Next Project",
    image: projects[0].image,
    category: "Coming Soon",
    platform: "Multi-platform",
    status: "In Development" as const,
    version: "TBA",
    placeholder: true as const,
  },
];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((x) => (x + 1) % rotatorItems.length), 4500);
    return () => window.clearInterval(id);
  }, []);
  const item = rotatorItems[i];
  return (
    <div className="relative mx-auto mt-10 max-w-3xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[hsl(45_90%_55%/0.25)] bg-black/60 shadow-[0_20px_80px_-20px_hsl(45_90%_55%/0.35)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {"placeholder" in item ? (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1408]">
                <div className="text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-[hsl(45_90%_60%)]" />
                  <div className="mt-3 text-2xl font-semibold text-[hsl(45_90%_70%)]">
                    Next Project
                  </div>
                  <div className="mt-1 text-sm text-white/60">In active development</div>
                </div>
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={`info-${i}`}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[hsl(45_90%_70%)]">
                {item.category}
              </div>
              <div className="mt-1 text-xl font-semibold text-white">{item.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {[
                { k: "Status", v: item.status },
                { k: "Platform", v: item.platform },
                { k: "Version", v: item.version },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-md border border-white/10 bg-black/50 px-2 py-1 text-center"
                >
                  <div className="text-[9px] uppercase tracking-wider text-white/50">{m.k}</div>
                  <div className="mt-0.5 font-medium text-white">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {rotatorItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show project ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-[hsl(45_90%_60%)]" : "w-2 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export function Workspace() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const [playing, setPlaying] = useState(true);

  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    if (typeof document !== "undefined") {
      setPageVisible(document.visibilityState === "visible");
    }
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", () => setPageVisible(false));
    window.addEventListener("focus", () => setPageVisible(document.visibilityState === "visible"));
    return () => {
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  const active = inView && playing && pageVisible;
  // Auto-play studio ambience whenever the section is on screen and tab is active.
  const sfx = useSfx(active);

  // On first user gesture (required by browsers), resume any suspended audio ctx.
  useEffect(() => {
    const resume = () => {
      const AC =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      // Touch/click will unlock audio globally for the tab.
      const tmp = new AC();
      tmp.resume().catch(() => {});
    };
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", resume, opts);
    window.addEventListener("keydown", resume, opts);
    window.addEventListener("touchstart", resume, opts);
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      window.removeEventListener("touchstart", resume);
    };
  }, []);

  // periodic typing sfx (only when active)
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(
      () => {
        // simulate human typing bursts: 2-5 keys then pause
        const burst = 2 + Math.floor(Math.random() * 4);
        for (let i = 0; i < burst; i++) {
          window.setTimeout(() => sfx.key(), i * (80 + Math.random() * 60));
        }
      },
      1400 + Math.random() * 900,
    );
    return () => window.clearInterval(id);
  }, [active, sfx]);

  const [notif, setNotif] = useState<null | {
    phase: "incoming" | "reply";
    from: string;
    text: string;
  }>(null);
  useEffect(() => {
    if (!active) {
      setNotif(null);
      return;
    }
    let t1: number;
    let t2: number;
    let t3: number;
    const loop = () => {
      t1 = window.setTimeout(
        () => {
          const msg = CLIENT_MESSAGES[Math.floor(Math.random() * CLIENT_MESSAGES.length)];
          setNotif({ phase: "incoming", ...msg });
          sfx.notify();
          t2 = window.setTimeout(() => {
            setNotif({ phase: "reply", from: msg.from, text: "Thanks — on it." });
            sfx.reply();
            t3 = window.setTimeout(() => setNotif(null), 2200);
          }, 2600);
        },
        6000 + Math.random() * 4000,
      );
    };
    loop();
    const id = window.setInterval(loop, 14000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearInterval(id);
    };
  }, [active, sfx]);

  const floatingChips = useMemo(
    () => [
      { icon: Code2, label: "TypeScript", x: "6%", y: "12%", delay: 0 },
      { icon: GitBranch, label: "main · synced", x: "82%", y: "8%", delay: 0.4 },
      { icon: Cpu, label: "Build · 1.2s", x: "4%", y: "70%", delay: 0.8 },
      { icon: Wifi, label: "Deploy · live", x: "84%", y: "74%", delay: 1.2 },
    ],
    [],
  );

  return (
    <section
      id="workspace"
      ref={ref}
      className="relative min-h-screen overflow-hidden py-20 sm:py-28"
    >
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[hsl(45_90%_55%/0.10)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[320px] w-[600px] rounded-full bg-[hsl(45_90%_55%/0.06)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(45_90%_55%/0.35)] bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[hsl(45_90%_70%)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Inside The Studio
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Professional <span className="text-gold-gradient">Mobile App</span> &amp; Web Developer
          </h2>
          <p className="mt-3 text-white/65">
            A real workspace where premium mobile apps, web platforms, and digital products are
            designed, engineered and shipped.
          </p>
        </div>

        {/* scene */}
        <div className="relative mx-auto mt-12 max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(45_90%_55%/0.25)] bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-3 shadow-[0_30px_140px_-30px_hsl(45_90%_55%/0.45)] sm:p-6">
            {/* controls */}
            <div className="absolute right-5 top-5 z-30 flex gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause animation" : "Play animation"}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur transition hover:text-[hsl(45_90%_70%)]"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>

            {/* main stage */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5">
              {/* photo */}
              <motion.img
                src="https://i.postimg.cc/s2y0pRM2/Screenshot-20260816-001644.jpg"
                alt="Realistic premium developer workspace"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.04 }}
                animate={active ? { scale: [1.04, 1.06, 1.04] } : { scale: 1.04 }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                loading="lazy"
                width={1600}
                height={1000}
              />
              {/* tone overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,transparent_30%,rgba(0,0,0,0.55)_85%)]" />

              {/* live coding overlay (over left/top monitor area) */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: active ? 1 : 0.4, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute left-[5%] top-[14%] hidden w-[30%] rounded-lg border border-[hsl(45_90%_55%/0.35)] bg-black/65 p-2.5 backdrop-blur-md sm:block"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-[8px] uppercase tracking-wider text-white/60">
                      build_runner.dart
                    </span>
                  </div>
                  <span className="rounded bg-[hsl(45_90%_55%/0.2)] px-1.5 py-0.5 text-[7px] font-mono text-[hsl(45_90%_75%)]">
                    Flutter 3.x
                  </span>
                </div>
                <CodeStream active={active} />
              </motion.div>

              {/* typing indicator chip — pulses on keyboard area */}
              <motion.div
                className="absolute left-[38%] top-[78%] z-10"
                animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <div className="flex items-center gap-1.5 rounded-full border border-[hsl(45_90%_55%/0.5)] bg-black/70 px-2.5 py-1 backdrop-blur">
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1 w-1 rounded-full bg-[hsl(45_90%_65%)]"
                        animate={active ? { y: [0, -2, 0] } : undefined}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[hsl(45_90%_75%)]">
                    Active build session
                  </span>
                </div>
              </motion.div>

              {/* floating UI chips */}
              {floatingChips.map((c, idx) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={idx}
                    className="absolute hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur-md md:inline-flex"
                    style={{ left: c.x, top: c.y }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={active ? { opacity: 1, y: [0, -4, 0] } : { opacity: 0.5, y: 0 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: c.delay,
                    }}
                  >
                    <Icon className="h-3 w-3 text-[hsl(45_90%_70%)]" />
                    {c.label}
                  </motion.div>
                );
              })}

              {/* scanline accent */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(45_90%_60%/0.55)] to-transparent"
                animate={active ? { y: ["8%", "92%", "8%"] } : { y: "50%" }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* live client message popup */}
              <AnimatePresence>
                {notif && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="absolute left-3 top-3 z-20 w-[230px] rounded-xl border border-[hsl(45_90%_55%/0.4)] bg-black/80 p-3 backdrop-blur-xl sm:left-5 sm:top-5 sm:w-64"
                  >
                    <div className="flex items-start gap-2">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[hsl(45_90%_55%/0.2)]">
                        <Bell className="h-3.5 w-3.5 text-[hsl(45_90%_70%)]" />
                      </div>
                      <div className="min-w-0 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <div className="truncate font-medium text-white">
                            {notif.phase === "incoming" ? notif.from : "Reply sent ✓"}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-white/40">
                            now
                          </div>
                        </div>
                        <div className="mt-0.5 truncate text-white/65">{notif.text}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* terminal log overlay */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: active ? 0.95 : 0.3, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-4 right-[5%] hidden w-[25%] rounded-lg border border-emerald-400/25 bg-black/75 p-2 font-mono text-[8px] leading-[1.5] text-emerald-300/85 backdrop-blur-md md:block"
              >
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-[8px] uppercase tracking-wider text-white/45">
                    flutter build apk --release
                  </span>
                </div>
                <TerminalLog active={active} />
              </motion.div>

              {/* bottom status bar */}
              <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs text-white/85">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Ready for new engagements
                </div>
                <div className="hidden gap-4 text-[10px] uppercase tracking-wider text-white/55 sm:flex">
                  <span>Flutter Dev Tools</span>
                  <span>React &amp; Node</span>
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[hsl(45_90%_75%)]">
                  <Music2 className="h-3 w-3" /> NV-PM · Deep Work
                </div>
              </div>
            </div>

            {/* premium studio status dashboard */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[hsl(45_90%_55%/0.2)]">
                    <Music2 className="h-4 w-4 text-[hsl(45_90%_70%)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">NV-PM Focus</div>
                    <div className="text-[11px] text-white/55">Studio mix</div>
                  </div>
                </div>
                <div className="mt-4 flex items-end gap-1">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 rounded-sm bg-gradient-to-t from-[hsl(45_90%_45%)] to-[hsl(45_90%_75%)]"
                      animate={active ? { height: [6, 18 + (i % 6) * 3, 6] } : { height: 6 }}
                      transition={{
                        duration: 0.9 + (i % 4) * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (i * 0.07) % 1.2,
                      }}
                      style={{ height: 6 }}
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Nova Studio · Live Systems
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    All systems operational
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3 lg:grid-cols-4">
                  {[
                    { k: "Editor", v: "VS Code", tone: "text-sky-300" },
                    { k: "Language", v: "TypeScript", tone: "text-blue-300" },
                    { k: "Framework", v: "Flutter · React · Next.js", tone: "text-cyan-300" },
                    { k: "Backend", v: "Supabase · Node.js", tone: "text-emerald-300" },
                    { k: "Database", v: "PostgreSQL", tone: "text-indigo-300" },
                    { k: "Deployment", v: "Cloudflare", tone: "text-orange-300" },
                    { k: "Git Branch", v: "production", tone: "text-purple-300" },
                    { k: "Status", v: "Live", tone: "text-emerald-300" },
                    { k: "Build", v: "Success", tone: "text-emerald-300" },
                    { k: "Performance", v: "99.9%", tone: "text-lime-300" },
                    { k: "Security", v: "Protected", tone: "text-rose-300" },
                    { k: "Version", v: "v3.x", tone: "text-amber-300" },
                  ].map((m, i) => (
                    <motion.div
                      key={m.k}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                      className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40 p-2.5 transition-all hover:-translate-y-0.5 hover:border-[hsl(45_90%_55%/0.4)] hover:shadow-[0_10px_30px_-10px_hsl(45_90%_55%/0.5)]"
                    >
                      <div className="text-[9px] uppercase tracking-wider text-white/45">{m.k}</div>
                      <div className={`mt-1 truncate font-semibold ${m.tone}`}>{m.v}</div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(45_90%_60%/0.5)] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[11px]">
                  <div className="flex items-center gap-2 text-white/70">
                    <span className="text-white/45">Last Deploy</span>
                    <span className="font-medium text-white">Recently Updated</span>
                  </div>
                  <div className="hidden items-center gap-3 text-white/55 sm:flex">
                    <span>ttfb 84ms</span>
                    <span>·</span>
                    <span>uptime 99.99%</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/50">
                    <span>Now Building</span>
                    <span>Compiling · Bundling · Shipping</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[hsl(45_90%_45%)] to-[hsl(45_90%_75%)]"
                      animate={active ? { width: ["10%", "82%", "30%", "92%"] } : { width: "30%" }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* rotator */}
            <Rotator />
          </div>
        </div>
      </div>
    </section>
  );
}
