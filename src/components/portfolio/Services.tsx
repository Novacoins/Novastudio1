import { motion } from "motion/react";
import {
  Bot,
  Smartphone,
  Apple,
  Globe,
  MonitorSmartphone,
  ShoppingBag,
  Gamepad2,
  Palette,
  Sparkles,
  LayoutDashboard,
  Cloud,
  ShieldCheck,
  Package,
  GraduationCap,
  HeartPulse,
  Hotel,
  UtensilsCrossed,
  Car,
  Wallet,
  Brain,
  MessageSquare,
  MapPin,
  Building2,
  Store,
  School,
  Landmark,
  BarChart3,
  ClipboardList,
  Image as ImageIcon,
  Video,
  Music,
  BookOpen,
  CalendarCheck,
  Boxes,
  ReceiptText,
  Plug,
  Cog,
  Rocket,
  Bug,
  Search,
  Wrench,
  Server,
  Database,
  Lock,
  KeyRound,
  Fingerprint,
  Cpu,
  LineChart,
  PenTool,
  Layers,
  Type,
  Camera,
  Mic,
  Headphones,
  Bell,
  Mail,
  Send,
  Repeat,
  Globe2,
  Zap,
  Users,
  HandshakeIcon,
  Truck,
  ShoppingCart,
  CreditCard,
  Banknote,
  TrendingUp,
  PieChart,
  Bitcoin,
  Speaker,
  Film,
  Trophy,
  Puzzle,
  Gift,
  Bookmark,
  Newspaper,
  Building,
  Briefcase,
  Target,
  Megaphone,
} from "lucide-react";
import { SectionLabel } from "./About";
import { useState } from "react";
import { ServicePreviewModal, type PreviewService } from "./ServicePreviewModal";

export type Service = {
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  title: string;
  desc: string;
  accent: string;
};

export const services: Service[] = [
  {
    icon: Bot,
    emoji: "🤖",
    title: "AI Applications",
    desc: "Intelligent apps powered by machine learning, LLMs and computer vision.",
    accent: "from-violet-500/30 to-fuchsia-500/10 text-violet-300",
  },
  {
    icon: Smartphone,
    emoji: "📱",
    title: "Android Apps",
    desc: "Premium native Android experiences engineered for scale and speed.",
    accent: "from-emerald-500/30 to-teal-500/10 text-emerald-300",
  },
  {
    icon: Apple,
    emoji: "🍎",
    title: "iOS Apps",
    desc: "Elegant iOS applications tuned for iPhone and iPad performance.",
    accent: "from-zinc-400/30 to-zinc-500/10 text-zinc-200",
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Websites",
    desc: "Pixel-perfect responsive websites that convert visitors into clients.",
    accent: "from-sky-500/30 to-blue-500/10 text-sky-300",
  },
  {
    icon: MonitorSmartphone,
    emoji: "💻",
    title: "Web Applications",
    desc: "Real-time dashboards and complex web platforms built to last.",
    accent: "from-indigo-500/30 to-blue-500/10 text-indigo-300",
  },
  {
    icon: ShoppingBag,
    emoji: "🛒",
    title: "E-commerce",
    desc: "Full storefronts with payments, inventory and growth tooling.",
    accent: "from-rose-500/30 to-pink-500/10 text-rose-300",
  },
  {
    icon: Gamepad2,
    emoji: "🎮",
    title: "Game Development",
    desc: "2D and casual mobile games with addictive core loops and monetization.",
    accent: "from-purple-500/30 to-violet-500/10 text-purple-300",
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "Luxury Logo Design",
    desc: "Distinctive marks and monograms crafted with editorial precision.",
    accent: "from-amber-500/30 to-orange-500/10 text-amber-300",
  },
  {
    icon: Sparkles,
    emoji: "✨",
    title: "Brand Identity",
    desc: "Complete visual systems: type, color, motion and voice.",
    accent: "from-yellow-500/30 to-amber-500/10 text-yellow-300",
  },
  {
    icon: LayoutDashboard,
    emoji: "📊",
    title: "Dashboards",
    desc: "Analytics dashboards with beautiful data storytelling.",
    accent: "from-cyan-500/30 to-sky-500/10 text-cyan-300",
  },
  {
    icon: Cloud,
    emoji: "☁️",
    title: "Cloud Systems",
    desc: "Serverless and cloud-native infrastructure that scales gracefully.",
    accent: "from-blue-500/30 to-sky-500/10 text-blue-300",
  },
  {
    icon: ShieldCheck,
    emoji: "🔒",
    title: "Cybersecurity",
    desc: "Hardened auth, RLS, encryption and vulnerability audits.",
    accent: "from-red-500/30 to-rose-500/10 text-red-300",
  },
  {
    icon: Package,
    emoji: "📦",
    title: "SaaS Platforms",
    desc: "Subscription products with billing, teams and multi-tenant scaling.",
    accent: "from-teal-500/30 to-emerald-500/10 text-teal-300",
  },
  {
    icon: GraduationCap,
    emoji: "📚",
    title: "Educational Apps",
    desc: "Learning apps with lessons, quizzes and progress tracking.",
    accent: "from-lime-500/30 to-green-500/10 text-lime-300",
  },
  {
    icon: HeartPulse,
    emoji: "🏥",
    title: "Healthcare Systems",
    desc: "Patient portals, telemedicine and clinical management tools.",
    accent: "from-pink-500/30 to-rose-500/10 text-pink-300",
  },
  {
    icon: Hotel,
    emoji: "🏨",
    title: "Hotel Booking Systems",
    desc: "Room inventory, reservations, payments and channel management.",
    accent: "from-amber-500/30 to-yellow-500/10 text-amber-300",
  },
  {
    icon: UtensilsCrossed,
    emoji: "🍔",
    title: "Restaurant Ordering",
    desc: "Menu, cart, kitchen display and delivery workflows.",
    accent: "from-orange-500/30 to-red-500/10 text-orange-300",
  },
  {
    icon: Car,
    emoji: "🚖",
    title: "Taxi Apps",
    desc: "Rider + driver apps with live tracking and cashless payments.",
    accent: "from-yellow-500/30 to-amber-500/10 text-yellow-300",
  },
  {
    icon: Wallet,
    emoji: "💳",
    title: "FinTech Apps",
    desc: "Wallets, transfers and financial products with bank-grade security.",
    accent: "from-emerald-500/30 to-green-500/10 text-emerald-300",
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Machine Learning",
    desc: "Custom ML models trained on your data for real business outcomes.",
    accent: "from-fuchsia-500/30 to-purple-500/10 text-fuchsia-300",
  },
  {
    icon: MessageSquare,
    emoji: "🗣️",
    title: "AI Chatbots",
    desc: "Conversational agents for support, sales and internal ops.",
    accent: "from-violet-500/30 to-indigo-500/10 text-violet-300",
  },
  {
    icon: MapPin,
    emoji: "📍",
    title: "GPS Tracking",
    desc: "Live location, geofencing and fleet visibility at scale.",
    accent: "from-red-500/30 to-orange-500/10 text-red-300",
  },
  {
    icon: Building2,
    emoji: "🏢",
    title: "Business Software",
    desc: "Bespoke software tailored to your unique operational workflows.",
    accent: "from-slate-400/30 to-zinc-500/10 text-slate-200",
  },
  {
    icon: Store,
    emoji: "🏪",
    title: "POS Systems",
    desc: "Point of sale with inventory, staff roles and daily reporting.",
    accent: "from-amber-500/30 to-orange-500/10 text-amber-300",
  },
  {
    icon: School,
    emoji: "🏫",
    title: "School Management",
    desc: "Students, grades, attendance, fees and parent portals.",
    accent: "from-blue-500/30 to-indigo-500/10 text-blue-300",
  },
  {
    icon: Landmark,
    emoji: "🏦",
    title: "Banking Apps",
    desc: "Compliant mobile banking with cards, transfers and analytics.",
    accent: "from-emerald-500/30 to-teal-500/10 text-emerald-300",
  },
  {
    icon: BarChart3,
    emoji: "📈",
    title: "CRM Systems",
    desc: "Sales pipelines, contacts and revenue reporting done right.",
    accent: "from-sky-500/30 to-cyan-500/10 text-sky-300",
  },
  {
    icon: ClipboardList,
    emoji: "📋",
    title: "ERP Systems",
    desc: "End-to-end business operations across finance, HR and inventory.",
    accent: "from-indigo-500/30 to-violet-500/10 text-indigo-300",
  },
  {
    icon: ImageIcon,
    emoji: "📷",
    title: "Image Recognition AI",
    desc: "Object detection, OCR and visual search for your product.",
    accent: "from-purple-500/30 to-fuchsia-500/10 text-purple-300",
  },
  {
    icon: Video,
    emoji: "🎥",
    title: "Video Platforms",
    desc: "Streaming, VOD and live broadcast experiences.",
    accent: "from-rose-500/30 to-red-500/10 text-rose-300",
  },
  {
    icon: Music,
    emoji: "🎵",
    title: "Music Apps",
    desc: "Streaming, playlists and audio experiences that feel premium.",
    accent: "from-pink-500/30 to-fuchsia-500/10 text-pink-300",
  },
  {
    icon: BookOpen,
    emoji: "📖",
    title: "E-learning Platforms",
    desc: "Courses, cohorts, quizzes and certificates end-to-end.",
    accent: "from-green-500/30 to-emerald-500/10 text-green-300",
  },
  {
    icon: CalendarCheck,
    emoji: "📅",
    title: "Booking Systems",
    desc: "Appointments, calendars, reminders and payments unified.",
    accent: "from-cyan-500/30 to-teal-500/10 text-cyan-300",
  },
  {
    icon: Boxes,
    emoji: "📦",
    title: "Inventory Systems",
    desc: "Stock, warehouses, SKUs and low-stock alerts.",
    accent: "from-amber-500/30 to-yellow-500/10 text-amber-300",
  },
  {
    icon: ReceiptText,
    emoji: "🧾",
    title: "Invoice Systems",
    desc: "Beautiful invoices, quotes and automated reminders.",
    accent: "from-teal-500/30 to-emerald-500/10 text-teal-300",
  },
  {
    icon: Plug,
    emoji: "📡",
    title: "API Development",
    desc: "RESTful and GraphQL APIs with clean docs and versioning.",
    accent: "from-blue-500/30 to-indigo-500/10 text-blue-300",
  },
  {
    icon: Cog,
    emoji: "⚙️",
    title: "Automation Systems",
    desc: "Smart workflows that eliminate repetitive manual work.",
    accent: "from-zinc-400/30 to-slate-500/10 text-zinc-200",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    title: "Digital Transformation",
    desc: "Modernize legacy operations with a step-by-step roadmap.",
    accent: "from-orange-500/30 to-red-500/10 text-orange-300",
  },
  {
    icon: Bug,
    emoji: "🐛",
    title: "QA & Testing",
    desc: "Manual QA plus automated test suites for total confidence.",
    accent: "from-lime-500/30 to-green-500/10 text-lime-300",
  },
  {
    icon: Search,
    emoji: "🔍",
    title: "SEO Optimization",
    desc: "Technical SEO that earns long-term organic traffic.",
    accent: "from-emerald-500/30 to-lime-500/10 text-emerald-300",
  },
  {
    icon: Wrench,
    emoji: "🛠️",
    title: "App Maintenance",
    desc: "Ongoing updates, patches and performance monitoring.",
    accent: "from-amber-500/30 to-orange-500/10 text-amber-300",
  },
  {
    icon: Server,
    emoji: "🖥️",
    title: "DevOps & CI/CD",
    desc: "Automated pipelines, monitoring and infra-as-code.",
    accent: "from-slate-400/30 to-zinc-500/10 text-slate-200",
  },
  {
    icon: Database,
    emoji: "🗄️",
    title: "Database Design",
    desc: "Optimized schemas, indexing and query performance.",
    accent: "from-indigo-500/30 to-blue-500/10 text-indigo-300",
  },
  {
    icon: Lock,
    emoji: "🛡️",
    title: "Data Encryption",
    desc: "End-to-end encryption for sensitive user and business data.",
    accent: "from-red-500/30 to-rose-500/10 text-red-300",
  },
  {
    icon: KeyRound,
    emoji: "🔑",
    title: "Auth & Access Control",
    desc: "SSO, OAuth, MFA and role-based permissions done properly.",
    accent: "from-yellow-500/30 to-amber-500/10 text-yellow-300",
  },
  {
    icon: Fingerprint,
    emoji: "👤",
    title: "Biometric Auth",
    desc: "Face ID, Touch ID and fingerprint integrations.",
    accent: "from-cyan-500/30 to-sky-500/10 text-cyan-300",
  },
  {
    icon: Cpu,
    emoji: "🧬",
    title: "IoT Applications",
    desc: "Connected device dashboards, telemetry and control planes.",
    accent: "from-violet-500/30 to-purple-500/10 text-violet-300",
  },
  {
    icon: LineChart,
    emoji: "📉",
    title: "Data Analytics",
    desc: "Turn raw data into insights and decision-ready reports.",
    accent: "from-sky-500/30 to-blue-500/10 text-sky-300",
  },
  {
    icon: PenTool,
    emoji: "🖌️",
    title: "UI / UX Design",
    desc: "Interfaces designed with clarity, hierarchy and craft.",
    accent: "from-fuchsia-500/30 to-pink-500/10 text-fuchsia-300",
  },
  {
    icon: Layers,
    emoji: "🧱",
    title: "Design Systems",
    desc: "Scalable component libraries with tokens and documentation.",
    accent: "from-purple-500/30 to-violet-500/10 text-purple-300",
  },
  {
    icon: Type,
    emoji: "🔤",
    title: "Landing Pages",
    desc: "High-converting landing pages for launches and campaigns.",
    accent: "from-orange-500/30 to-amber-500/10 text-orange-300",
  },
  {
    icon: Camera,
    emoji: "📸",
    title: "Photo Apps",
    desc: "Camera-first apps with filters, editing and cloud sync.",
    accent: "from-pink-500/30 to-rose-500/10 text-pink-300",
  },
  {
    icon: Mic,
    emoji: "🎙️",
    title: "Voice Apps",
    desc: "Voice interfaces, transcription and speech-to-text products.",
    accent: "from-emerald-500/30 to-teal-500/10 text-emerald-300",
  },
  {
    icon: Headphones,
    emoji: "🎧",
    title: "Podcast Platforms",
    desc: "Podcast hosting, distribution and listener apps.",
    accent: "from-indigo-500/30 to-blue-500/10 text-indigo-300",
  },
  {
    icon: Bell,
    emoji: "🔔",
    title: "Push Notification Systems",
    desc: "Segmented, personalized push and in-app messaging.",
    accent: "from-amber-500/30 to-yellow-500/10 text-amber-300",
  },
  {
    icon: Mail,
    emoji: "📧",
    title: "Email Systems",
    desc: "Transactional emails, campaigns and deliverability tooling.",
    accent: "from-sky-500/30 to-cyan-500/10 text-sky-300",
  },
  {
    icon: Send,
    emoji: "💬",
    title: "Messaging Apps",
    desc: "Realtime chat, groups, threads and media sharing.",
    accent: "from-teal-500/30 to-emerald-500/10 text-teal-300",
  },
  {
    icon: Repeat,
    emoji: "🔄",
    title: "Migration Services",
    desc: "Move legacy systems to modern stacks with zero data loss.",
    accent: "from-violet-500/30 to-indigo-500/10 text-violet-300",
  },
  {
    icon: Globe2,
    emoji: "🌎",
    title: "Multi-language Support",
    desc: "i18n, RTL support and localized experiences.",
    accent: "from-cyan-500/30 to-blue-500/10 text-cyan-300",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Performance Optimization",
    desc: "Faster load times, smaller bundles, better UX.",
    accent: "from-yellow-500/30 to-orange-500/10 text-yellow-300",
  },
  {
    icon: Users,
    emoji: "👥",
    title: "Social Networks",
    desc: "Social products with feeds, profiles and engagement loops.",
    accent: "from-rose-500/30 to-pink-500/10 text-rose-300",
  },
  {
    icon: HandshakeIcon,
    emoji: "🤝",
    title: "Marketplace Apps",
    desc: "Two-sided platforms with search, listings and reviews.",
    accent: "from-amber-500/30 to-orange-500/10 text-amber-300",
  },
  {
    icon: Truck,
    emoji: "🚚",
    title: "Logistics Apps",
    desc: "Fleet, dispatch, delivery tracking and proof of delivery.",
    accent: "from-blue-500/30 to-sky-500/10 text-blue-300",
  },
  {
    icon: ShoppingCart,
    emoji: "🛍️",
    title: "Shopping Apps",
    desc: "Native shopping apps with wishlists and one-tap checkout.",
    accent: "from-pink-500/30 to-rose-500/10 text-pink-300",
  },
  {
    icon: CreditCard,
    emoji: "💳",
    title: "Payment Integration",
    desc: "Stripe, Paystack, Flutterwave and card processing.",
    accent: "from-indigo-500/30 to-purple-500/10 text-indigo-300",
  },
  {
    icon: Banknote,
    emoji: "💵",
    title: "Subscription Billing",
    desc: "Recurring revenue plumbing with trials, dunning and receipts.",
    accent: "from-emerald-500/30 to-green-500/10 text-emerald-300",
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "Growth Engineering",
    desc: "Experiments, funnels and conversion optimization.",
    accent: "from-lime-500/30 to-green-500/10 text-lime-300",
  },
  {
    icon: PieChart,
    emoji: "🥧",
    title: "BI & Reporting",
    desc: "Executive dashboards, KPIs and automated reporting.",
    accent: "from-fuchsia-500/30 to-purple-500/10 text-fuchsia-300",
  },
  {
    icon: Bitcoin,
    emoji: "🪙",
    title: "Web3 & Crypto",
    desc: "Wallets, on-chain integrations and token dashboards.",
    accent: "from-amber-500/30 to-yellow-500/10 text-amber-300",
  },
  {
    icon: Speaker,
    emoji: "🔊",
    title: "AR / VR Experiences",
    desc: "Immersive AR and VR product experiences on mobile and web.",
    accent: "from-violet-500/30 to-fuchsia-500/10 text-violet-300",
  },
  {
    icon: Film,
    emoji: "🎬",
    title: "Streaming Platforms",
    desc: "Netflix-style VOD platforms with catalog and playback.",
    accent: "from-red-500/30 to-rose-500/10 text-red-300",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Fitness Apps",
    desc: "Workouts, tracking, gamification and social challenges.",
    accent: "from-orange-500/30 to-red-500/10 text-orange-300",
  },
  {
    icon: Puzzle,
    emoji: "🧩",
    title: "Puzzle Games",
    desc: "Casual puzzle games with polished levels and progression.",
    accent: "from-purple-500/30 to-violet-500/10 text-purple-300",
  },
  {
    icon: Gift,
    emoji: "🎁",
    title: "Rewards & Loyalty",
    desc: "Points, tiers and loyalty programs that drive retention.",
    accent: "from-pink-500/30 to-rose-500/10 text-pink-300",
  },
  {
    icon: Bookmark,
    emoji: "🔖",
    title: "Content Management",
    desc: "Headless CMS setups tailored to editorial workflows.",
    accent: "from-teal-500/30 to-cyan-500/10 text-teal-300",
  },
  {
    icon: Newspaper,
    emoji: "📰",
    title: "News & Media Apps",
    desc: "Publishing platforms with subscriptions and personalization.",
    accent: "from-slate-400/30 to-zinc-500/10 text-slate-200",
  },
  {
    icon: Building,
    emoji: "🏗️",
    title: "Real Estate Apps",
    desc: "Listings, tours, mortgage calculators and agent CRMs.",
    accent: "from-amber-500/30 to-orange-500/10 text-amber-300",
  },
  {
    icon: Briefcase,
    emoji: "💼",
    title: "HR & Recruitment",
    desc: "Applicant tracking, onboarding and employee portals.",
    accent: "from-blue-500/30 to-indigo-500/10 text-blue-300",
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Ad Tech Platforms",
    desc: "Campaign management, tracking and analytics tooling.",
    accent: "from-red-500/30 to-orange-500/10 text-red-300",
  },
  {
    icon: Megaphone,
    emoji: "📣",
    title: "Marketing Automation",
    desc: "Multi-channel automation for lifecycle marketing.",
    accent: "from-fuchsia-500/30 to-pink-500/10 text-fuchsia-300",
  },
];

export function Services() {
  const [active, setActive] = useState<PreviewService | null>(null);
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Our Services</SectionLabel>
          </div>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-[5rem] lg:text-[6rem]">
            {services.length}+ Premium Services{" "}
            <span className="text-gold-gradient italic">Built for Scale</span>
          </h2>
          <p className="mt-6 text-base text-foreground/85 md:text-lg">
            A complete catalog of world-class digital services — from AI and mobile to cloud,
            cybersecurity and brand identity. Tap any card to preview a live app mockup.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              onClick={() => setActive(s)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}
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
                  <h3
                    className={`font-display text-lg font-semibold leading-tight ${s.accent.split("text-")[1] ? "text-" + s.accent.split("text-")[1] : "text-foreground"}`}
                  >
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{s.desc}</p>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-gold/80">
                  Tap to preview →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ServicePreviewModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
