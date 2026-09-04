import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import type { ComponentType } from "react";

/* ============================================================
   Per-service unique preview generator.
   Every service opens a distinct interactive app mockup:
     · unique device (phone / tablet / laptop)
     · unique template layout
     · unique hue derived from the service title
     · unique app name & tagline pulled from the service
   No two service cards produce the same preview.
   ============================================================ */

export type DeviceKind = "phone" | "tablet" | "laptop";

export type TemplateKind =
  | "chat"
  | "dashboard"
  | "feed"
  | "store"
  | "player"
  | "editor"
  | "map"
  | "wallet"
  | "calendar"
  | "security"
  | "kanban"
  | "gallery"
  | "scanner"
  | "writer"
  | "terminal"
  | "inbox"
  | "lms"
  | "landing"
  | "logo"
  | "brand"
  | "iot"
  | "podcast"
  | "game"
  | "cms"
  | "email"
  | "form";

export interface PreviewService {
  title: string;
  desc: string;
  accent: string;
  emoji: string;
  icon: ComponentType<{ className?: string }>;
}

const AUTO_CLOSE_MS = 9000;

/* ---------- deterministic hue from title (unique per service) ---------- */
function titleHue(title: string) {
  let h = 5381;
  for (let i = 0; i < title.length; i++) h = ((h << 5) + h + title.charCodeAt(i)) >>> 0;
  return h % 360;
}
const hsl = (h: number, s: number, l: number, a = 1) => `hsl(${h} ${s}% ${l}% / ${a})`;

/* ---------- per-service device + template assignment ---------- */
const SPEC: Record<string, { d: DeviceKind; t: TemplateKind }> = {
  "AI Applications": { d: "phone", t: "chat" },
  "Android Apps": { d: "phone", t: "feed" },
  "iOS Apps": { d: "phone", t: "store" },
  Websites: { d: "laptop", t: "landing" },
  "Web Applications": { d: "laptop", t: "dashboard" },
  "E-commerce": { d: "laptop", t: "store" },
  "Game Development": { d: "tablet", t: "game" },
  "Luxury Logo Design": { d: "laptop", t: "logo" },
  "Brand Identity": { d: "tablet", t: "brand" },
  Dashboards: { d: "laptop", t: "dashboard" },
  "Cloud Systems": { d: "laptop", t: "terminal" },
  Cybersecurity: { d: "laptop", t: "security" },
  "SaaS Platforms": { d: "laptop", t: "dashboard" },
  "Educational Apps": { d: "tablet", t: "lms" },
  "Healthcare Systems": { d: "phone", t: "dashboard" },
  "Hotel Booking Systems": { d: "phone", t: "calendar" },
  "Restaurant Ordering": { d: "phone", t: "store" },
  "Taxi Apps": { d: "phone", t: "map" },
  "FinTech Apps": { d: "phone", t: "wallet" },
  "Machine Learning": { d: "laptop", t: "terminal" },
  "AI Chatbots": { d: "phone", t: "chat" },
  "GPS Tracking": { d: "phone", t: "map" },
  "Business Software": { d: "laptop", t: "kanban" },
  "POS Systems": { d: "tablet", t: "store" },
  "School Management": { d: "laptop", t: "dashboard" },
  "Banking Apps": { d: "phone", t: "wallet" },
  "CRM Systems": { d: "laptop", t: "kanban" },
  "ERP Systems": { d: "laptop", t: "dashboard" },
  "Image Recognition AI": { d: "phone", t: "scanner" },
  "Video Platforms": { d: "tablet", t: "player" },
  "Music Apps": { d: "phone", t: "player" },
  "E-learning Platforms": { d: "laptop", t: "lms" },
  "Booking Systems": { d: "phone", t: "calendar" },
  "Inventory Systems": { d: "laptop", t: "dashboard" },
  "Invoice Systems": { d: "laptop", t: "form" },
  "API Development": { d: "laptop", t: "terminal" },
  "Automation Systems": { d: "laptop", t: "kanban" },
  "Digital Transformation": { d: "laptop", t: "dashboard" },
  "QA & Testing": { d: "laptop", t: "terminal" },
  "SEO Optimization": { d: "laptop", t: "dashboard" },
  "App Maintenance": { d: "laptop", t: "terminal" },
  "DevOps & CI/CD": { d: "laptop", t: "terminal" },
  "Database Design": { d: "laptop", t: "terminal" },
  "Data Encryption": { d: "laptop", t: "security" },
  "Auth & Access Control": { d: "phone", t: "security" },
  "Biometric Auth": { d: "phone", t: "scanner" },
  "IoT Applications": { d: "tablet", t: "iot" },
  "Data Analytics": { d: "laptop", t: "dashboard" },
  "UI / UX Design": { d: "laptop", t: "editor" },
  "Design Systems": { d: "laptop", t: "editor" },
  "Landing Pages": { d: "laptop", t: "landing" },
  "Photo Apps": { d: "phone", t: "gallery" },
  "Voice Apps": { d: "phone", t: "player" },
  "Podcast Platforms": { d: "phone", t: "podcast" },
  "Push Notification Systems": { d: "phone", t: "inbox" },
  "Email Systems": { d: "laptop", t: "email" },
  "Messaging Apps": { d: "phone", t: "chat" },
  "Migration Services": { d: "laptop", t: "terminal" },
  "Multi-language Support": { d: "phone", t: "writer" },
  "Performance Optimization": { d: "laptop", t: "dashboard" },
  "Social Networks": { d: "phone", t: "feed" },
  "Marketplace Apps": { d: "phone", t: "store" },
  "Logistics Apps": { d: "phone", t: "map" },
  "Shopping Apps": { d: "phone", t: "store" },
  "Payment Integration": { d: "phone", t: "wallet" },
  "Subscription Billing": { d: "laptop", t: "form" },
  "Growth Engineering": { d: "laptop", t: "dashboard" },
  "BI & Reporting": { d: "laptop", t: "dashboard" },
  "Web3 & Crypto": { d: "phone", t: "wallet" },
  "AR / VR Experiences": { d: "tablet", t: "gallery" },
  "Streaming Platforms": { d: "tablet", t: "player" },
  "Fitness Apps": { d: "phone", t: "dashboard" },
  "Puzzle Games": { d: "phone", t: "game" },
  "Rewards & Loyalty": { d: "phone", t: "wallet" },
  "Content Management": { d: "laptop", t: "cms" },
  "News & Media Apps": { d: "phone", t: "feed" },
  "Real Estate Apps": { d: "phone", t: "gallery" },
  "HR & Recruitment": { d: "laptop", t: "kanban" },
  "Ad Tech Platforms": { d: "laptop", t: "dashboard" },
  "Marketing Automation": { d: "laptop", t: "email" },
};

const DEFAULT_SPEC: { d: DeviceKind; t: TemplateKind } = { d: "phone", t: "chat" };

/* ================= Device frames ================= */

function FrameShell({
  children,
  label,
  onClose,
  device,
}: {
  children: React.ReactNode;
  label: string;
  onClose: () => void;
  device: DeviceKind;
}) {
  useEffect(() => {
    const id = window.setTimeout(onClose, AUTO_CLOSE_MS);
    return () => window.clearTimeout(id);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-full w-full flex-col items-center overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center gap-2 rounded-full border border-gold/40 bg-black/70 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur-xl sm:text-sm">
          <span>{label}</span>
          <span className="text-gold/50">·</span>
          <span className="uppercase tracking-widest text-gold/70">
            {device === "phone" ? "Mobile" : device === "tablet" ? "Tablet" : "Desktop"}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-1 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-white/10 sm:right-4 sm:top-4"
        >
          <X className="h-4 w-4" />
        </button>

        {children}
      </motion.div>
    </motion.div>
  );
}

function ScrollBody({
  children,
  ms = AUTO_CLOSE_MS - 500,
}: {
  children: React.ReactNode;
  ms?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) el.scrollTop = max * p;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ms]);
  return (
    <div ref={ref} className="scroll-smooth h-full w-full overflow-y-auto overflow-x-hidden">
      {children}
      <div className="h-10" />
    </div>
  );
}

function PhoneFrame({ children, hue }: { children: React.ReactNode; hue: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[2.4rem] border-[9px] border-neutral-900 bg-neutral-950"
      style={{
        width: "min(340px, 92vw)",
        height: "min(680px, 78vh)",
        boxShadow: `0 30px 90px -20px ${hsl(hue, 90, 55, 0.45)}`,
      }}
    >
      <div className="absolute left-1/2 top-0 z-20 flex h-5 w-28 -translate-x-1/2 items-center justify-center rounded-b-2xl bg-black" />
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-1.5 text-[9px] font-semibold text-white/85 mix-blend-difference">
        <span>9:41</span>
        <span>●●●● 100%</span>
      </div>
      <div className="absolute inset-0 pt-7">{children}</div>
      <div className="absolute inset-x-0 bottom-1.5 z-20 flex justify-center">
        <span className="h-1 w-24 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

function TabletFrame({ children, hue }: { children: React.ReactNode; hue: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[1.8rem] border-[10px] border-neutral-900 bg-neutral-950"
      style={{
        width: "min(460px, 92vw)",
        maxWidth: "94vw",
        height: "min(620px, 78vh)",
        boxShadow: `0 30px 100px -20px ${hsl(hue, 90, 55, 0.4)}`,
      }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-1 text-[10px] font-semibold text-white/80 mix-blend-difference">
        <span>Nova OS</span>
        <span>9:41 AM · 100%</span>
      </div>
      <div className="absolute inset-0 pt-5">{children}</div>
    </div>
  );
}

function LaptopFrame({ children, hue }: { children: React.ReactNode; hue: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center" style={{ maxWidth: "96vw" }}>
      <div
        className="relative overflow-hidden rounded-2xl border-[10px] border-neutral-900 bg-neutral-950"
        style={{
          width: "min(720px, 92vw)",
          height: "min(440px, 70vh)",
          boxShadow: `0 30px 90px -20px ${hsl(hue, 90, 55, 0.4)}`,
        }}
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-white/10 bg-neutral-900/95 px-3 py-1.5 text-[10px] text-white/80">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="flex-1 truncate rounded-md bg-neutral-800/80 px-2 py-1 text-center">
            🔒 novastudio.app
          </span>
          <span className="text-white/40">⋯</span>
        </div>
        <div className="absolute inset-0 pt-9">{children}</div>
      </div>
      <div
        className="h-2 rounded-b-2xl bg-gradient-to-b from-neutral-800 to-neutral-950"
        style={{ width: "min(760px, 96vw)" }}
      />
      <div className="h-1 w-40 rounded-full bg-neutral-800" />
    </div>
  );
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

function Frame({
  device,
  hue,
  children,
}: {
  device: DeviceKind;
  hue: number;
  children: React.ReactNode;
}) {
  const narrow = useIsNarrow();
  // On mobile, always present the preview as a real native-app phone frame
  // (no browser chrome, no tablet chrome) — feels like an installed app.
  const effective: DeviceKind = narrow ? "phone" : device;
  if (effective === "phone") return <PhoneFrame hue={hue}>{children}</PhoneFrame>;
  if (effective === "tablet") return <TabletFrame hue={hue}>{children}</TabletFrame>;
  return <LaptopFrame hue={hue}>{children}</LaptopFrame>;
}

/* ================= Reusable header ================= */

function AppHeader({
  hue,
  service,
  subtitle,
}: {
  hue: number;
  service: PreviewService;
  subtitle?: string;
}) {
  const Icon = service.icon;
  return (
    <div
      className="flex items-center gap-2 border-b border-white/10 px-3 py-2"
      style={{
        background: `linear-gradient(135deg, ${hsl(hue, 80, 22)}, ${hsl((hue + 40) % 360, 75, 12)})`,
      }}
    >
      <div
        className="grid h-8 w-8 place-items-center rounded-lg text-white shadow"
        style={{
          background: `linear-gradient(135deg, ${hsl(hue, 80, 55)}, ${hsl((hue + 40) % 360, 80, 45)})`,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold text-white">{service.title}</div>
        <div className="truncate text-[10px] text-white/60">{subtitle ?? service.desc}</div>
      </div>
      <span className="text-lg" aria-hidden>
        {service.emoji}
      </span>
    </div>
  );
}

/* ================= Templates ================= */
/* Each template accepts { service, hue, device } and paints a fully unique
   interface. Content is derived from service.title so every card is different. */

interface TplProps {
  service: PreviewService;
  hue: number;
  device: DeviceKind;
}

function bgSurface(hue: number) {
  return {
    background: `linear-gradient(180deg, ${hsl(hue, 40, 8)}, ${hsl((hue + 30) % 360, 30, 5)})`,
  };
}

/* ---- CHAT ---- */
function ChatTpl({ service, hue }: TplProps) {
  const bot = service.title;
  const msgs = [
    { r: "bot", t: `Hi 👋 I'm ${bot}. How can I help you today?` },
    { r: "me", t: "Show me what you can do." },
    { r: "bot", t: service.desc },
    { r: "me", t: "Let's start with a demo." },
    { r: "bot", t: "Sure — spinning up a live preview…" },
    { r: "me", t: "Perfect. Any premium features?" },
    { r: "bot", t: "Yes — enterprise SSO, RLS security & realtime sync are on by default." },
    { r: "bot", t: "Anything else I can prepare for you?" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Online · Powered by Nova" />
      <ScrollBody>
        <div className="space-y-2 p-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.r === "me" ? "justify-end" : ""}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
                  m.r === "me" ? "text-white" : "text-white/90"
                }`}
                style={{
                  background:
                    m.r === "me"
                      ? `linear-gradient(135deg, ${hsl(hue, 85, 55)}, ${hsl((hue + 40) % 360, 85, 45)})`
                      : "rgba(255,255,255,0.06)",
                }}
              >
                {m.t}
              </div>
            </div>
          ))}
        </div>
      </ScrollBody>
      <div className="border-t border-white/10 bg-black/50 p-2">
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-[11px] text-white/50">
          <span>Message {bot}…</span>
          <span
            className="ml-auto grid h-6 w-6 place-items-center rounded-full text-black"
            style={{ background: hsl(hue, 90, 60) }}
          >
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- DASHBOARD ---- */
function DashboardTpl({ service, hue }: TplProps) {
  const kpis = [
    { k: "Revenue", v: "$248,910", d: "+12.4%" },
    { k: "Active Users", v: "42,180", d: "+8.1%" },
    { k: "Conversion", v: "3.42%", d: "+0.6%" },
    { k: "Retention", v: "91%", d: "+2.3%" },
  ];
  const rows = [
    ["Session · US", "1,204", "healthy"],
    ["Session · EU", "982", "healthy"],
    ["Session · APAC", "744", "healthy"],
    ["Anomaly · CDN", "1", "watching"],
    ["Deploy · prod", "OK", "healthy"],
    ["Queue · worker", "72", "healthy"],
    ["Cache hit", "98.4%", "healthy"],
    ["p95 latency", "84ms", "healthy"],
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle={`${service.title} · Overview`} />
      <ScrollBody>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {kpis.map((k) => (
              <div key={k.k} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                <div className="text-[9px] uppercase tracking-wider text-white/50">{k.k}</div>
                <div className="mt-1 text-sm font-bold text-white">{k.v}</div>
                <div className="text-[9px]" style={{ color: hsl(hue, 90, 70) }}>
                  {k.d}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-1 text-[10px] uppercase tracking-wider text-white/50">
              Traffic · 30d
            </div>
            <svg viewBox="0 0 200 60" className="h-16 w-full">
              <defs>
                <linearGradient id={`g${hue}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={hsl(hue, 90, 60)} stopOpacity="0.6" />
                  <stop offset="1" stopColor={hsl(hue, 90, 60)} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                points="0,45 20,40 40,30 60,32 80,20 100,25 120,15 140,22 160,12 180,18 200,8"
                fill="none"
                stroke={hsl(hue, 90, 65)}
                strokeWidth="2"
              />
              <polygon
                points="0,45 20,40 40,30 60,32 80,20 100,25 120,15 140,22 160,12 180,18 200,8 200,60 0,60"
                fill={`url(#g${hue})`}
              />
            </svg>
          </div>
          <div className="mt-3 space-y-1.5">
            {rows.map((r) => (
              <div
                key={r[0]}
                className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[11px]"
              >
                <span className="text-white/80">{r[0]}</span>
                <span className="text-white">{r[1]}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
                  style={{
                    background:
                      r[2] === "healthy" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.18)",
                    color: r[2] === "healthy" ? "#6ee7b7" : "#fcd34d",
                  }}
                >
                  {r[2]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- FEED ---- */
function FeedTpl({ service, hue }: TplProps) {
  const posts = Array.from({ length: 6 }).map((_, i) => ({
    author: ["Ava Chen", "Marcus Bell", "Zara Ali", "Kenji Ito", "Nia Okafor", "Diego Vega"][i],
    time: `${i + 1}h`,
    text: [
      `Just tried ${service.title} — the experience is unreal.`,
      `${service.title} is a total game-changer for our team.`,
      "Weekend project going live in T-3, wish me luck 🚀",
      "Design system ships — pixels aligned, souls at peace.",
      `Loving the polish on ${service.title}. Details matter.`,
      "Coffee, code, ship. Repeat.",
    ][i],
  }));
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Following · Trending" />
      <ScrollBody>
        <div className="space-y-2 p-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-12 shrink-0 rounded-xl"
                style={{
                  background: `linear-gradient(160deg, ${hsl((hue + i * 40) % 360, 80, 55)}, ${hsl((hue + i * 40 + 60) % 360, 80, 30)})`,
                }}
              />
            ))}
          </div>
          {posts.map((p, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
              <div className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${hsl((hue + i * 50) % 360, 80, 60)}, ${hsl((hue + i * 50 + 60) % 360, 80, 40)})`,
                  }}
                />
                <div className="flex-1 text-[11px]">
                  <div className="font-medium text-white">{p.author}</div>
                  <div className="text-white/40">{p.time} · Public</div>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-white/85">{p.text}</div>
              <div
                className="mt-2 h-24 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${hsl((hue + i * 30) % 360, 80, 45)}, ${hsl((hue + i * 30 + 80) % 360, 80, 25)})`,
                }}
              />
              <div className="mt-2 flex gap-3 text-[10px] text-white/60">
                <span>♥ {120 + i * 43}</span>
                <span>💬 {8 + i * 3}</span>
                <span>↗ Share</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- STORE ---- */
function StoreTpl({ service, hue }: TplProps) {
  const items = [
    { n: "Nova Pro", p: "$99" },
    { n: "Studio Bundle", p: "$249" },
    { n: "Enterprise", p: "$599" },
    { n: "Team Seat", p: "$29" },
    { n: "Add-on Pack", p: "$49" },
    { n: "Priority Support", p: "$199" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Shop · Featured Today" />
      <ScrollBody>
        <div
          className="mx-2 mt-2 overflow-hidden rounded-xl p-3 text-white"
          style={{
            background: `linear-gradient(135deg, ${hsl(hue, 85, 45)}, ${hsl((hue + 40) % 360, 85, 30)})`,
          }}
        >
          <div className="text-[9px] uppercase tracking-wider opacity-80">Featured</div>
          <div className="mt-1 text-base font-bold">{service.title}</div>
          <div className="mt-0.5 text-[11px] opacity-90">{service.desc}</div>
          <button className="mt-3 rounded-full bg-white/25 px-3 py-1 text-[10px] font-semibold">
            Shop now →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
          {items.map((it, i) => (
            <div key={it.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
              <div
                className="h-20 rounded-lg"
                style={{
                  background: `linear-gradient(160deg, ${hsl((hue + i * 40) % 360, 70, 55)}, ${hsl((hue + i * 40 + 60) % 360, 70, 25)})`,
                }}
              />
              <div className="mt-1.5 text-[11px] font-medium text-white">{it.n}</div>
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold" style={{ color: hsl(hue, 90, 70) }}>
                  {it.p}
                </div>
                <button
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold text-black"
                  style={{ background: hsl(hue, 90, 65) }}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- PLAYER ---- */
function PlayerTpl({ service, hue }: TplProps) {
  const list = [
    "Deep Focus Mix",
    "Studio Ambience",
    "Late Night Coding",
    "Cinematic Score",
    "Neo Jazz",
    "Retro Synth",
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Now Playing" />
      <ScrollBody>
        <div className="p-3">
          <div
            className="relative aspect-square w-full overflow-hidden rounded-2xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${hsl(hue, 90, 60)}, ${hsl((hue + 60) % 360, 90, 25)})`,
            }}
          >
            <motion.div
              className="absolute inset-6 rounded-full border border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                background: `radial-gradient(circle, ${hsl(hue, 90, 30)}, ${hsl(hue, 90, 10)})`,
              }}
            >
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
            </motion.div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-sm font-semibold text-white">{service.title}</div>
            <div className="text-[11px] text-white/60">Studio Sessions · Vol. 03</div>
          </div>
          <div className="mt-3 h-1 rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: "42%", background: hsl(hue, 90, 65) }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-white/50">
            <span>1:34</span>
            <span>3:42</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-white">
            <span>⏮</span>
            <span
              className="grid h-10 w-10 place-items-center rounded-full text-black"
              style={{ background: hsl(hue, 90, 65) }}
            >
              ▶
            </span>
            <span>⏭</span>
          </div>
          <div className="mt-4 space-y-1">
            {list.map((n, i) => (
              <div
                key={n}
                className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-white/85"
              >
                <span>{n}</span>
                <span className="text-white/40">
                  {2 + i}:{15 + i * 4}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- EDITOR (Figma-like) ---- */
function EditorTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Design Canvas · Auto-saved" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-24 shrink-0 border-r border-white/10 bg-black/40 p-2 text-[10px] text-white/70">
          <div className="mb-2 uppercase tracking-wider text-white/40">Layers</div>
          {["Header", "Hero", "Card 01", "Card 02", "Grid", "Footer", "Modal"].map((l) => (
            <div key={l} className="mb-1 rounded px-1.5 py-1 hover:bg-white/5">
              ▸ {l}
            </div>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0_10px,transparent_10px_20px)]">
          <div
            className="absolute left-6 top-8 h-24 w-40 rounded-xl border border-white/20"
            style={{
              background: `linear-gradient(135deg, ${hsl(hue, 80, 55)}, ${hsl((hue + 40) % 360, 80, 30)})`,
            }}
          />
          <div className="absolute left-10 top-40 h-20 w-32 rounded-xl border border-white/20 bg-white/10 backdrop-blur" />
          <div
            className="absolute right-8 top-10 h-32 w-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${hsl((hue + 60) % 360, 80, 60)}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-x-6 bottom-4 rounded-lg border border-dashed border-white/30 bg-white/[0.04] p-2 text-[10px] text-white/70">
            {service.title} · Frame 1440 × 900
          </div>
        </div>
        <div className="w-24 shrink-0 border-l border-white/10 bg-black/40 p-2 text-[10px] text-white/70">
          <div className="mb-2 uppercase tracking-wider text-white/40">Style</div>
          <div>Fill</div>
          <div className="mt-1 h-4 rounded" style={{ background: hsl(hue, 90, 55) }} />
          <div className="mt-2">Radius · 16</div>
          <div className="mt-2">Shadow · lg</div>
          <div className="mt-2">Font · Display</div>
        </div>
      </div>
    </div>
  );
}

/* ---- MAP ---- */
function MapTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Live tracking" />
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${hsl(hue, 60, 25)}, ${hsl((hue + 40) % 360, 60, 8)})`,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full">
          <path
            d="M20 340 C 80 260, 140 260, 180 200 S 260 100, 280 40"
            stroke={hsl(hue, 90, 65)}
            strokeWidth="3"
            strokeDasharray="6 4"
            fill="none"
          />
          <circle cx="20" cy="340" r="6" fill={hsl(hue, 90, 65)} />
          <circle cx="280" cy="40" r="6" fill="#fff" />
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: hsl(hue, 90, 70), boxShadow: `0 0 0 6px ${hsl(hue, 90, 60, 0.3)}` }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
      <div className="border-t border-white/10 bg-black/60 p-3">
        <div className="text-[10px] uppercase tracking-wider text-white/50">Trip in progress</div>
        <div className="mt-1 text-sm font-semibold text-white">Downtown → Studio HQ</div>
        <div className="mt-1 flex items-center justify-between text-[11px]">
          <div className="text-white/70">ETA · 12 min</div>
          <div style={{ color: hsl(hue, 90, 70) }}>$18.40</div>
        </div>
        <button
          className="mt-3 w-full rounded-lg py-2 text-[11px] font-semibold text-black"
          style={{ background: hsl(hue, 90, 65) }}
        >
          Track {service.title}
        </button>
      </div>
    </div>
  );
}

/* ---- WALLET ---- */
function WalletTpl({ service, hue }: TplProps) {
  const tx = [
    { n: "Nova Studio", a: "+ $4,200" },
    { n: "Cloud Systems", a: "- $89" },
    { n: "Payout", a: "+ $1,540" },
    { n: "Design Tools", a: "- $124" },
    { n: "Client · Orbit Labs", a: "+ $6,800" },
    { n: "Subscription", a: "- $19" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Wallet · Live balance" />
      <ScrollBody>
        <div className="p-3">
          <div
            className="rounded-2xl p-4 text-white shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${hsl(hue, 85, 45)}, ${hsl((hue + 60) % 360, 85, 25)})`,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-70">Total Balance</div>
            <div className="mt-1 text-2xl font-bold">$128,540.20</div>
            <div className="mt-1 text-[10px] opacity-80">•••• •••• •••• 4295 · Nova</div>
            <div className="mt-4 flex justify-between text-[11px]">
              <span>Cardholder</span>
              <span>Expires 08/29</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] text-white/85">
            {["Send", "Receive", "Top up", "More"].map((a) => (
              <div
                key={a}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center"
              >
                {a}
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-wider text-white/50">
            Transactions
          </div>
          <div className="mt-1 space-y-1">
            {tx.map((t) => (
              <div
                key={t.n}
                className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2 text-[11px]"
              >
                <span className="text-white/85">{t.n}</span>
                <span className={t.a.startsWith("+") ? "text-emerald-300" : "text-rose-300"}>
                  {t.a}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- CALENDAR / BOOKING ---- */
function CalendarTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="November · 2026" />
      <ScrollBody>
        <div className="p-3">
          <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-white/50">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 2;
              const active = [4, 11, 18, 22, 29].includes(day);
              return (
                <div
                  key={i}
                  className="grid aspect-square place-items-center rounded-md text-[10px]"
                  style={{
                    background: active ? hsl(hue, 90, 55) : "rgba(255,255,255,0.04)",
                    color: active
                      ? "#000"
                      : day > 0
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(255,255,255,0.2)",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {day > 0 && day <= 30 ? day : ""}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-[10px] uppercase tracking-wider text-white/50">
            Upcoming bookings
          </div>
          <div className="mt-2 space-y-2">
            {[
              { t: "Discovery call · Acme", h: "10:00" },
              { t: "Design review · Orbit", h: "13:30" },
              { t: "Launch meeting · Vault", h: "16:00" },
              { t: "1:1 with client", h: "18:15" },
            ].map((b) => (
              <div
                key={b.t}
                className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2 text-[11px]"
              >
                <div className="w-10 text-white/50">{b.h}</div>
                <div className="flex-1 text-white">{b.t}</div>
                <div className="h-2 w-2 rounded-full" style={{ background: hsl(hue, 90, 65) }} />
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full rounded-full py-2 text-[11px] font-semibold text-black"
            style={{ background: hsl(hue, 90, 65) }}
          >
            + Book with {service.title}
          </button>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- SECURITY ---- */
function SecurityTpl({ service, hue }: TplProps) {
  const events = [
    { t: "SQL injection blocked", ip: "185.220.101.42", f: "🇷🇺" },
    { t: "Brute force · admin", ip: "45.155.204.13", f: "🇨🇳" },
    { t: "Suspicious login", ip: "104.28.14.89", f: "🇺🇸" },
    { t: "DDoS mitigated · L7", ip: "91.240.118.202", f: "🇺🇦" },
    { t: "Path traversal", ip: "203.0.113.5", f: "🇧🇷" },
    { t: "MFA challenge sent", ip: "198.51.100.7", f: "🇮🇳" },
    { t: "Token rotated", ip: "127.0.0.1", f: "🌐" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Threat intelligence · Live" />
      <ScrollBody>
        <div className="p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Threats blocked", v: "12,481" },
              { k: "Score", v: "A+" },
              { k: "Uptime", v: "99.99%" },
            ].map((k) => (
              <div
                key={k.k}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center"
              >
                <div className="text-[9px] uppercase tracking-wider text-white/50">{k.k}</div>
                <div className="mt-0.5 text-sm font-bold text-white">{k.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5">
            <div className="text-[10px] uppercase tracking-wider text-rose-300">Live shield</div>
            <div className="mt-0.5 text-sm font-semibold text-white">{service.title} · Active</div>
            <div className="text-[10px] text-white/60">
              Zero-trust posture · encrypted at rest & in transit
            </div>
          </div>
          <div className="mt-3 space-y-1 text-[10px]">
            {events.map((e) => (
              <div key={e.ip} className="flex items-center gap-2 rounded bg-black/40 p-2">
                <span>{e.f}</span>
                <span className="font-mono text-white/70">{e.ip}</span>
                <span className="flex-1 truncate text-white/85">{e.t}</span>
                <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">Blocked</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- KANBAN ---- */
function KanbanTpl({ service, hue }: TplProps) {
  const cols = [
    { n: "Backlog", items: ["Research users", "Wireframe hero", "Audit copy"] },
    { n: "In progress", items: ["Design system v2", "Auth flow", "Onboarding"] },
    { n: "Review", items: ["Analytics", "Billing"] },
    { n: "Shipped", items: ["Landing page", "Contact form", "SEO"] },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Team board · Sprint 12" />
      <ScrollBody>
        <div className="flex gap-2 p-2 overflow-x-auto">
          {cols.map((c, ci) => (
            <div
              key={c.n}
              className="w-40 shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-2"
            >
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
                <span>{c.n}</span>
                <span
                  className="rounded-full px-1.5 py-0.5 text-white"
                  style={{ background: hsl((hue + ci * 60) % 360, 80, 45) }}
                >
                  {c.items.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {c.items.map((it) => (
                  <div
                    key={it}
                    className="rounded-lg bg-black/40 p-2 text-[11px] text-white/85 shadow-sm"
                  >
                    {it}
                    <div className="mt-1 flex items-center justify-between text-[9px] text-white/40">
                      <span>NOVA-{100 + Math.floor(Math.random() * 900)}</span>
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ background: hsl((hue + ci * 40) % 360, 80, 60) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- GALLERY (photo / logo / brand / AR-VR / real-estate) ---- */
function GalleryTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Curated collection" />
      <ScrollBody>
        <div className="grid grid-cols-3 gap-1 p-1">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square"
              style={{
                background: `linear-gradient(${(i * 27) % 360}deg, ${hsl(
                  (hue + i * 20) % 360,
                  80,
                  55,
                )}, ${hsl((hue + i * 20 + 60) % 360, 80, 25)})`,
              }}
            />
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- SCANNER (OCR / biometric / image recognition) ---- */
function ScannerTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Scanning…" />
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-4 rounded-2xl border-2 border-dashed"
          style={{ borderColor: hsl(hue, 90, 65) }}
        >
          <motion.div
            className="absolute inset-x-0 h-0.5"
            style={{ background: hsl(hue, 90, 65), boxShadow: `0 0 12px ${hsl(hue, 90, 65)}` }}
            animate={{ top: ["6%", "94%", "6%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2"
            style={{ borderColor: hsl(hue, 90, 70) }}
          />
          <div
            className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2"
            style={{ borderColor: hsl(hue, 90, 70) }}
          />
          <div
            className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2"
            style={{ borderColor: hsl(hue, 90, 70) }}
          />
          <div
            className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2"
            style={{ borderColor: hsl(hue, 90, 70) }}
          />
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/60 p-3 text-[11px]">
        <div className="text-white/60">Detected:</div>
        <div className="mt-1 space-y-1">
          {["ID · Passport · Match 99.4%", "Face verified", "Document authentic"].map((r) => (
            <div
              key={r}
              className="flex items-center justify-between rounded bg-white/[0.04] px-2 py-1.5 text-white"
            >
              <span>{r}</span>
              <span style={{ color: hsl(hue, 90, 70) }}>✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- WRITER / TRANSLATOR ---- */
function WriterTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Draft · autosaved" />
      <ScrollBody>
        <div className="p-3 text-[11px] leading-relaxed text-white/85">
          <div className="text-[10px] uppercase tracking-wider text-white/50">Input</div>
          <div className="mt-1 rounded-lg border border-white/10 bg-white/[0.04] p-2">
            {service.desc}
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-wider text-white/50">
            Translated · Localized
          </div>
          <div className="mt-1 space-y-1">
            {[
              "🇬🇧 English · Ready",
              "🇫🇷 Français · Ready",
              "🇪🇸 Español · Ready",
              "🇩🇪 Deutsch · Ready",
              "🇯🇵 日本語 · Ready",
              "🇸🇦 العربية · Ready",
              "🇧🇷 Português · Ready",
            ].map((r) => (
              <div
                key={r}
                className="flex items-center justify-between rounded bg-white/[0.04] px-2 py-1.5 text-white/85"
              >
                <span>{r}</span>
                <span style={{ color: hsl(hue, 90, 70) }}>●</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- TERMINAL / DEVOPS / API / DB ---- */
function TerminalTpl({ service, hue }: TplProps) {
  const lines = [
    `$ nova deploy --project ${service.title.toLowerCase().replace(/\s+/g, "-")}`,
    "→ verifying credentials … ok",
    "→ resolving dependencies … 1284 packages",
    "→ building production bundle …",
    "✓ compiled in 1.24s (0 warnings)",
    "→ uploading to edge network …",
    "✓ deployed to 275 regions",
    "→ invalidating cache …",
    "✓ done · https://novastudio.app",
    "$ nova status",
    "· workers: healthy · db: healthy · cache: 98.4%",
    "· p50 42ms · p95 84ms · error rate 0.01%",
    "$ nova logs -f",
    `[info] ${service.title} · request 3f4a → 200`,
    "[info] auth · session refreshed · 42ms",
    "[warn] rate-limit approaching · region eu-west",
    "[info] backup · scheduled snapshot ok",
  ];
  return (
    <div className="flex h-full flex-col bg-black">
      <AppHeader hue={hue} service={service} subtitle="zsh · production" />
      <ScrollBody>
        <div className="p-3 font-mono text-[10px] leading-[1.6] text-emerald-300/90">
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {l}
            </div>
          ))}
          <div className="mt-1 flex items-center">
            <span className="text-emerald-400">$</span>
            <motion.span
              className="ml-1 inline-block h-3 w-1.5"
              style={{ background: hsl(hue, 90, 70) }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- INBOX / NOTIFICATION CENTER ---- */
function InboxTpl({ service, hue }: TplProps) {
  const notifs = [
    { t: "New signup · Emma from Berlin", h: "just now" },
    { t: "Payment received · $4,200", h: "2m" },
    { t: "Weekly report is ready", h: "1h" },
    { t: "Backup completed successfully", h: "3h" },
    { t: "Deployment to production", h: "6h" },
    { t: "Team member added · Marcus", h: "1d" },
    { t: "Subscription renewed", h: "2d" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="12 new · Push center" />
      <ScrollBody>
        <div className="space-y-1.5 p-2">
          {notifs.map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-2.5"
            >
              <div
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${hsl((hue + i * 40) % 360, 80, 55)}, ${hsl((hue + i * 40 + 60) % 360, 80, 30)})`,
                }}
              >
                <span className="text-white">🔔</span>
              </div>
              <div className="min-w-0 flex-1 text-[11px]">
                <div className="truncate font-medium text-white">{n.t}</div>
                <div className="text-white/50">
                  {service.title} · {n.h}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- LMS / EDUCATION ---- */
function LmsTpl({ service, hue }: TplProps) {
  const lessons = [
    "01 · Foundations",
    "02 · Core concepts",
    "03 · Hands-on lab",
    "04 · Real-world case study",
    "05 · Assessment · quiz",
    "06 · Capstone project",
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Course · 42 min left" />
      <ScrollBody>
        <div className="p-3">
          <div
            className="rounded-xl p-3 text-white"
            style={{
              background: `linear-gradient(135deg, ${hsl(hue, 80, 45)}, ${hsl((hue + 40) % 360, 80, 25)})`,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-80">Continue learning</div>
            <div className="mt-1 text-base font-bold">{service.title}</div>
            <div className="mt-1 text-[11px] opacity-90">Chapter 3 · Applied practice</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: "62%" }} />
            </div>
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-wider text-white/50">Curriculum</div>
          <div className="mt-1 space-y-1">
            {lessons.map((l, i) => (
              <div
                key={l}
                className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2 text-[11px]"
              >
                <div
                  className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-black"
                  style={{
                    background: i < 3 ? hsl(hue, 90, 65) : "rgba(255,255,255,0.15)",
                    color: i < 3 ? "#000" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {i < 3 ? "✓" : i + 1}
                </div>
                <div className="flex-1 text-white/85">{l}</div>
                <div className="text-[10px] text-white/50">{6 + i} min</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- LANDING (browser website) ---- */
function LandingTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col text-white" style={bgSurface(hue)}>
      <div
        className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px]"
        style={{ background: hsl(hue, 40, 8) }}
      >
        <span className="font-semibold">{service.title}</span>
        <div className="flex gap-3 text-white/70">
          <span>Product</span>
          <span>Pricing</span>
          <span>Docs</span>
          <span
            className="rounded-full px-3 py-0.5 text-black"
            style={{ background: hsl(hue, 90, 65) }}
          >
            Get started
          </span>
        </div>
      </div>
      <ScrollBody>
        <div className="p-6 text-center">
          <div className="mx-auto max-w-lg text-3xl font-bold leading-tight">
            {service.title}{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${hsl(hue, 90, 65)}, ${hsl((hue + 40) % 360, 90, 65)})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              built for scale
            </span>
          </div>
          <div className="mx-auto mt-3 max-w-md text-[12px] text-white/70">{service.desc}</div>
          <div className="mt-4 inline-flex gap-2">
            <button
              className="rounded-full px-4 py-1.5 text-[11px] font-semibold text-black"
              style={{ background: hsl(hue, 90, 65) }}
            >
              Launch demo
            </button>
            <button className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white/80">
              Learn more
            </button>
          </div>
        </div>
        <div className="mx-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {["Fast", "Secure", "Beautiful"].map((f, i) => (
              <div key={f} className="rounded-lg border border-white/10 bg-black/40 p-3">
                <div
                  className="mx-auto h-8 w-8 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${hsl((hue + i * 60) % 360, 90, 60)}, ${hsl((hue + i * 60 + 40) % 360, 90, 40)})`,
                  }}
                />
                <div className="mt-2 text-[12px] font-semibold">{f}</div>
                <div className="text-[10px] text-white/50">Enterprise-grade craft</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-6 text-[10px] text-white/40">
          {["Acme", "Orbit", "Vault", "North", "Helix", "Prism", "Lume", "Nova"].map((b) => (
            <div key={b} className="rounded border border-white/10 py-2 text-center">
              {b}
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- LOGO WORKSPACE ---- */
function LogoTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Logo studio · 300 dpi" />
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {["A", "N", "S", "M", "V", "K", "L", "X", "◆"].map((c, i) => (
          <div
            key={i}
            className="grid aspect-square place-items-center rounded-xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${hsl((hue + i * 45) % 360, 70, 30)}, ${hsl((hue + i * 45 + 60) % 360, 70, 10)})`,
            }}
          >
            <span
              className="font-display text-3xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${hsl((hue + i * 45) % 360, 90, 75)}, ${hsl((hue + i * 45 + 40) % 360, 90, 55)})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {c}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 bg-black/60 p-3 text-[11px] text-white/80">
        Concept exploration · 9 directions · client review Thursday
      </div>
    </div>
  );
}

/* ---- BRAND IDENTITY BOARD ---- */
function BrandTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Brand system · v1.0" />
      <ScrollBody>
        <div className="grid grid-cols-2 gap-2 p-3">
          <div className="col-span-2 rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="text-[10px] uppercase tracking-widest text-white/50">Wordmark</div>
            <div
              className="mt-1 font-display text-3xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${hsl(hue, 90, 70)}, ${hsl((hue + 40) % 360, 90, 55)})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {service.title}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-2">
            <div className="text-[10px] uppercase tracking-wider text-white/50">Palette</div>
            <div className="mt-1 grid grid-cols-4 gap-1">
              {[0, 30, 60, 200, 260, 320, 45, 180].map((o, i) => (
                <div
                  key={i}
                  className="h-8 rounded"
                  style={{ background: hsl((hue + o) % 360, 80, 55) }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-2 text-white/85">
            <div className="text-[10px] uppercase tracking-wider text-white/50">Typography</div>
            <div className="mt-1 font-display text-lg">Cormorant · Display</div>
            <div className="text-[11px]">Inter · Body</div>
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-lg"
                style={{
                  background: `linear-gradient(${i * 60}deg, ${hsl((hue + i * 60) % 360, 80, 45)}, ${hsl((hue + i * 60 + 60) % 360, 80, 20)})`,
                }}
              />
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- IOT ---- */
function IotTpl({ service, hue }: TplProps) {
  const devices = [
    { n: "Studio · Air quality", v: "AQI 32", on: true },
    { n: "Studio · Lighting", v: "62%", on: true },
    { n: "Server rack · Temp", v: "22.4°C", on: true },
    { n: "Access · Front door", v: "Locked", on: true },
    { n: "Power · Total", v: "1.24 kW", on: true },
    { n: "Camera · Lobby", v: "Live", on: true },
    { n: "Speakers · Focus mix", v: "42%", on: true },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="7 devices online" />
      <ScrollBody>
        <div className="grid grid-cols-2 gap-2 p-3">
          {devices.map((d, i) => (
            <div key={d.n} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
              <div className="flex items-start justify-between">
                <div
                  className="grid h-8 w-8 place-items-center rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${hsl((hue + i * 40) % 360, 80, 55)}, ${hsl((hue + i * 40 + 60) % 360, 80, 30)})`,
                  }}
                >
                  <span className="text-white text-xs">◉</span>
                </div>
                <div
                  className="h-4 w-8 rounded-full p-0.5"
                  style={{ background: d.on ? hsl(hue, 90, 55) : "rgba(255,255,255,0.15)" }}
                >
                  <div
                    className="h-3 w-3 rounded-full bg-white"
                    style={{ marginLeft: d.on ? "auto" : 0 }}
                  />
                </div>
              </div>
              <div className="mt-2 text-[11px] font-medium text-white">{d.n}</div>
              <div className="text-[10px] text-white/60">{d.v}</div>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- PODCAST ---- */
function PodcastTpl({ service, hue }: TplProps) {
  const eps = [
    "Ep 42 · Building at the edge",
    "Ep 41 · Systems that scale",
    "Ep 40 · Craft over chaos",
    "Ep 39 · Design & discipline",
    "Ep 38 · Shipping every week",
    "Ep 37 · Founder stories",
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Nova Studio · The Show" />
      <ScrollBody>
        <div className="p-3">
          <div
            className="flex items-center gap-3 rounded-xl p-3"
            style={{
              background: `linear-gradient(135deg, ${hsl(hue, 80, 40)}, ${hsl((hue + 60) % 360, 80, 20)})`,
            }}
          >
            <div
              className="h-16 w-16 rounded-xl"
              style={{
                background: `radial-gradient(circle, ${hsl(hue, 90, 70)}, ${hsl((hue + 60) % 360, 90, 30)})`,
              }}
            />
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-white/70">Now playing</div>
              <div className="text-[12px] font-semibold text-white">{eps[0]}</div>
              <div className="mt-1 h-1 rounded-full bg-white/20">
                <div
                  className="h-full rounded-full"
                  style={{ width: "38%", background: hsl(hue, 90, 70) }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-wider text-white/50">Episodes</div>
          <div className="mt-1 space-y-1">
            {eps.map((e) => (
              <div
                key={e}
                className="flex items-center gap-2 rounded bg-white/[0.04] p-2 text-[11px]"
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-black"
                  style={{ background: hsl(hue, 90, 65) }}
                >
                  ▶
                </span>
                <span className="flex-1 text-white/85">{e}</span>
                <span className="text-[10px] text-white/40">32 min</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- GAME ---- */
function GameTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Level 12 · Score 24,910" />
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${hsl(hue, 90, 40)}, ${hsl((hue + 60) % 360, 90, 8)})`,
          }}
        />
        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${hsl((hue + i * 30) % 360, 85, 60)}, ${hsl((hue + i * 30 + 40) % 360, 85, 35)})`,
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5 + (i % 5) * 0.2, repeat: Infinity, delay: (i * 0.1) % 1 }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="rounded-full border border-white/20 bg-black/70 px-4 py-2 text-[11px] font-semibold text-white">
            Combo × {3 + Math.floor(Math.random() * 6)} · +250 XP
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/60 p-3 text-[11px] text-white/85">
        {service.title} · Daily challenge streak 🔥 12 days
      </div>
    </div>
  );
}

/* ---- CMS ---- */
function CmsTpl({ service, hue }: TplProps) {
  const posts = [
    { t: "Launching Nova Studio v3", s: "Published", d: "today" },
    { t: "Behind the scenes · design", s: "Draft", d: "2d" },
    { t: "Client story · Orbit Labs", s: "Scheduled", d: "Fri" },
    { t: "Engineering deep dive", s: "Draft", d: "1w" },
    { t: "Case study · Vault Co.", s: "Published", d: "2w" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Content · 42 entries" />
      <ScrollBody>
        <div className="space-y-1 p-2">
          {posts.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-[11px]"
            >
              <div
                className="h-10 w-14 rounded"
                style={{
                  background: `linear-gradient(135deg, ${hsl((hue + i * 40) % 360, 80, 55)}, ${hsl((hue + i * 40 + 60) % 360, 80, 25)})`,
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-white">{p.t}</div>
                <div className="text-white/50">
                  {service.title} · {p.d}
                </div>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
                style={{
                  background:
                    p.s === "Published"
                      ? "rgba(16,185,129,0.15)"
                      : p.s === "Draft"
                        ? "rgba(148,163,184,0.15)"
                        : "rgba(245,158,11,0.18)",
                  color: p.s === "Published" ? "#6ee7b7" : p.s === "Draft" ? "#cbd5e1" : "#fcd34d",
                }}
              >
                {p.s}
              </span>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- EMAIL ---- */
function EmailTpl({ service, hue }: TplProps) {
  const emails = [
    { f: "Sarah · Acme", s: "Loved the new build", t: "9:41" },
    { f: "Billing", s: "Invoice #4820 paid", t: "8:12" },
    { f: "Nova Studio", s: "Weekly deploy summary", t: "yesterday" },
    { f: "Marcus · Vault", s: "Ready for launch 🚀", t: "yesterday" },
    { f: "Newsletter", s: "This week in design", t: "2d" },
    { f: "Github", s: "PR #482 merged to main", t: "3d" },
  ];
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Inbox · 128 new" />
      <ScrollBody>
        <div className="space-y-1 p-2">
          {emails.map((e, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5"
            >
              <div
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white text-[10px] font-bold"
                style={{
                  background: `linear-gradient(135deg, ${hsl((hue + i * 40) % 360, 80, 55)}, ${hsl((hue + i * 40 + 60) % 360, 80, 30)})`,
                }}
              >
                {e.f[0]}
              </div>
              <div className="min-w-0 flex-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="truncate font-medium text-white">{e.f}</div>
                  <div className="text-[10px] text-white/40">{e.t}</div>
                </div>
                <div className="truncate text-white/70">{e.s}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollBody>
    </div>
  );
}

/* ---- FORM (invoices / billing / subscription) ---- */
function FormTpl({ service, hue }: TplProps) {
  return (
    <div className="flex h-full flex-col" style={bgSurface(hue)}>
      <AppHeader hue={hue} service={service} subtitle="Invoice INV-4820" />
      <ScrollBody>
        <div className="p-4 text-[11px] text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">From</div>
              <div className="font-semibold">Nova Studio</div>
              <div className="text-white/60">hello@novastudio.app</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-white/50">Bill to</div>
              <div className="font-semibold">Acme Inc.</div>
              <div className="text-white/60">billing@acme.co</div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            {[
              { k: "Design retainer", v: "$4,500" },
              { k: "Development sprint", v: "$8,200" },
              { k: "Deployment · infra", v: "$1,240" },
              { k: "Support · Q4", v: "$980" },
            ].map((r) => (
              <div
                key={r.k}
                className="flex items-center justify-between border-b border-white/5 py-1.5 last:border-none"
              >
                <span className="text-white/80">{r.k}</span>
                <span className="text-white">{r.v}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between text-[13px] font-bold">
              <span>Total due</span>
              <span style={{ color: hsl(hue, 90, 70) }}>$14,920.00</span>
            </div>
          </div>
          <button
            className="mt-4 w-full rounded-lg py-2 text-[11px] font-semibold text-black"
            style={{ background: hsl(hue, 90, 65) }}
          >
            Pay with {service.title}
          </button>
        </div>
      </ScrollBody>
    </div>
  );
}

/* ================= Template picker ================= */

const TEMPLATES: Record<TemplateKind, (p: TplProps) => React.ReactElement> = {
  chat: ChatTpl,
  dashboard: DashboardTpl,
  feed: FeedTpl,
  store: StoreTpl,
  player: PlayerTpl,
  editor: EditorTpl,
  map: MapTpl,
  wallet: WalletTpl,
  calendar: CalendarTpl,
  security: SecurityTpl,
  kanban: KanbanTpl,
  gallery: GalleryTpl,
  scanner: ScannerTpl,
  writer: WriterTpl,
  terminal: TerminalTpl,
  inbox: InboxTpl,
  lms: LmsTpl,
  landing: LandingTpl,
  logo: LogoTpl,
  brand: BrandTpl,
  iot: IotTpl,
  podcast: PodcastTpl,
  game: GameTpl,
  cms: CmsTpl,
  email: EmailTpl,
  form: FormTpl,
};

/* ================= Public component ================= */

export function ServicePreviewModal({
  service,
  onClose,
}: {
  service: PreviewService | null;
  onClose: () => void;
}) {
  const spec = service ? (SPEC[service.title] ?? DEFAULT_SPEC) : null;
  const hue = useMemo(() => (service ? titleHue(service.title) : 0), [service]);

  return (
    <AnimatePresence>
      {service && spec && (
        <FrameShell key={service.title} label={service.title} onClose={onClose} device={spec.d}>
          <Frame device={spec.d} hue={hue}>
            {(() => {
              const T = TEMPLATES[spec.t];
              return <T service={service} hue={hue} device={spec.d} />;
            })()}
          </Frame>
        </FrameShell>
      )}
    </AnimatePresence>
  );
}
