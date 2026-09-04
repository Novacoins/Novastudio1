import usersBg from "@/assets/images/stat_users_bg_1786912827425.jpg";
import downloadsBg from "@/assets/images/stat_downloads_bg_1786912840719.jpg";
import ratingBg from "@/assets/images/stat_rating_bg_1786912851296.jpg";
import spinsBg from "@/assets/images/stat_spins_bg_1786912863257.jpg";
import levelsBg from "@/assets/images/stat_levels_bg_1786912872806.jpg";
import gamesBg from "@/assets/images/stat_games_bg_1786912882792.jpg";

import perfDownloadsBg from "@/assets/images/perf_downloads_bg_1786915291768.jpg";
import perfRatingBg from "@/assets/images/perf_rating_bg_1786915302093.jpg";
import perfStabilityBg from "@/assets/images/perf_stability_bg_1786915312208.jpg";
import perfMaintainedBg from "@/assets/images/perf_maintained_bg_1786915322310.jpg";

export type ProjectStatus = "Live" | "Beta" | "Completed";

export type ProjectStat = {
  label: string;
  value: string;
  backgroundImage?: string;
};
export type ProcessStep = { title: string; body: string };

export type Project = {
  slug: string;
  title: string;
  cat: string;
  tag: string;
  short: string;
  overview: string;
  status: ProjectStatus;
  platform: string;
  category: string;
  version: string;
  image: string;
  icon?: string;
  screenshots: string[];
  features: string[];
  technologies: string[];
  stats: ProjectStat[];
  process: ProcessStep[];
  challenges: { title: string; body: string }[];
  liveDemo?: string;
  website?: string;
  download?: string;
};

const defaultProcess: ProcessStep[] = [
  {
    title: "Ideation",
    body: "Discovery, market research, and product framing to lock the core value proposition.",
  },
  {
    title: "Design",
    body: "Wireframes, UX flows, and a premium UI system with motion, color, and brand alignment.",
  },
  {
    title: "Development",
    body: "Clean, modular code with reusable components, performant rendering, and scalable architecture.",
  },
  {
    title: "Testing",
    body: "Manual QA, device testing, and automated checks across screen sizes and OS versions.",
  },
  {
    title: "Deployment",
    body: "Play Store release, monitoring, crash reporting, and analytics wiring from day one.",
  },
  {
    title: "Iteration",
    body: "Data-driven updates, A/B tested features, and continuous polish based on user behavior.",
  },
];

export const projects: Project[] = [
  {
    slug: "nova-numerology-astrology",
    title: "Nova Numerology & Astrology",
    cat: "Mobile Apps",
    tag: "Just Launched",
    status: "Live",
    short:
      "Discover the hidden meaning behind your numbers and stars, and begin your journey toward greater self-discovery, guidance, and destiny.",
    overview:
      "Nova Numerology & Astrology combines ancient wisdom and modern mobile engineering to help users uncover the hidden meanings behind their numbers and cosmic signs. Through personalized life path calculations, daily horoscopes, Western and Chinese zodiac wisdom, compatibility analysis, and private journaling tools, the application offers an empowering daily guide for self-discovery, personal growth, and destiny alignment.",
    image: "https://i.postimg.cc/dtcHy9Qj/file-000000005dfc71f4bcd8409e1f2db9a8.png",
    icon: "https://i.postimg.cc/dtcHy9Qj/file-000000005dfc71f4bcd8409e1f2db9a8.png",
    screenshots: [
      "https://i.postimg.cc/1tNBg8LY/file-00000000f774821095a999f925b33fec.png",
      "https://i.postimg.cc/Bb7CBCNP/file-000000003b08820a8d3c315dfa777550.png",
      "https://i.postimg.cc/VvXCdBTp/file-00000000507c81f4877a610eaedfdadf.png",
      "https://i.postimg.cc/g0BR508K/file-0000000059188210bd1baeb3047bd827.png",
      "https://i.postimg.cc/rFC4Tj5R/file-00000000290c81f4a87513c648dc2833.png",
      "https://i.postimg.cc/s28QmNRv/file-0000000078e48210b3782d7c26a11a85.png",
      "https://i.postimg.cc/0QDQf5fz/file-000000007a288246a252eb56c51292d4.png",
    ],
    features: [
      "Life Path Number & Core Numerology Insights",
      "Daily Horoscope & Celestial Transits",
      "Western Zodiac & Chinese Zodiac Profiles",
      "Personalized Astrological Readings",
      "Relationship & Compatibility Insights",
      "Lucky Days, Numbers & Cosmic Timing",
      "Personal Journal with Mood & Reflection Tracking",
      "Reading History & Saved Favorites",
      "Personal Goals & Self-Discovery Milestones",
      "Comprehensive Astrology & Numerology Guidance",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Google Play Services", "Clean Architecture"],
    platform: "Android",
    category: "Mobile Apps",
    version: "1.0",
    stats: [
      { label: "Total Downloads", value: "5+", backgroundImage: perfDownloadsBg },
      { label: "App Rating", value: "5.0 ★", backgroundImage: perfRatingBg },
      { label: "Crash-Free Users", value: "99.9%", backgroundImage: perfStabilityBg },
      { label: "Status", value: "Live & Maintained", backgroundImage: perfMaintainedBg },
    ],
    process: defaultProcess,
    challenges: [
      {
        title: "Deterministic celestial & numerological engine",
        body: "Engineered high-accuracy astrological and numerological calculation algorithms that compute charts and daily readings on-device with optimal speed.",
      },
      {
        title: "Serene celestial user experience",
        body: "Designed an ethereal, cosmic dark interface with gold celestial accents, intuitive reading flows, and secure local storage for personal reflections and journals.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=com.novastudio.astrology",
  },
  {
    slug: "nova-memory",
    title: "Nova Memory",
    cat: "Educational Apps",
    tag: "Launched",
    status: "Live",
    short:
      "Brain training & memory challenge with emoji matching, quizzes, and hundreds of levels.",
    overview:
      "Nova Memory is a fun and educational memory training application featuring emoji matching, quizzes, and hundreds of levels designed to improve focus, memory, and cognitive skills. Built for daily engagement with a polished, premium interface, smooth progression curves, and reward loops that keep users coming back.",
    image: "https://i.postimg.cc/wv8CLyhM/file-00000000c12471f4bff06cbcb19655b0.png",
    screenshots: [
      "https://i.postimg.cc/R0Qk1CXB/file-0000000050a0722f87b57f175da45745.png",
      "https://i.postimg.cc/pdHNn5QK/IMG-20260121-222203.png",
      "https://i.postimg.cc/c4p2VtbF/file-0000000073507246aa9b8b1eb3762d95.png",
      "https://i.postimg.cc/XqXt0fWQ/file-00000000f48071f5803abf3161aef07d.png",
      "https://i.postimg.cc/mDL0mx5H/IMG-20260121-234817.png",
      "https://i.postimg.cc/bJyKmXFK/IMG-20260121-235259.png",
      "https://i.postimg.cc/zXs69Hcd/file-000000006c3871f497fcb1e5c3ee0824.png",
    ],
    features: [
      "Hundreds of progressive memory levels",
      "Emoji matching mini-games",
      "Quiz mode with timed challenges",
      "Daily streaks & cognitive scoring",
      "Cloud-synced progress",
      "Beautiful, distraction-free UI",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Google Play Services", "AdMob"],
    platform: "Android",
    category: "Game",
    version: "9.3",
    stats: [
      { label: "Total Users", value: "50+", backgroundImage: usersBg },
      { label: "Downloads", value: "50+", backgroundImage: downloadsBg },
      { label: "App Rating", value: "2.2★", backgroundImage: ratingBg },
      { label: "Levels", value: "60+", backgroundImage: levelsBg },
    ],
    process: defaultProcess,
    challenges: [
      {
        title: "Smooth performance at scale",
        body: "Designed an asset-streaming pipeline so hundreds of levels load instantly on low-end Android devices.",
      },
      {
        title: "Daily retention",
        body: "Engineered streaks, daily challenges, and reward loops that lifted Day-7 retention significantly.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=nova.memory",
  },
  {
    slug: "nova-spin",
    title: "Nova Spin",
    cat: "Mobile Apps",
    tag: "Live",
    status: "Live",
    short:
      "Interactive rewards & spin experience with achievements, in-app rewards, and social sharing.",
    overview:
      "Nova Spin is an engaging spin-based mobile application where users enjoy interactive gameplay, unlock achievements, earn in-app rewards, and share their progress with friends. The product blends premium visual polish with addictive gameplay loops and a frictionless reward system.",
    image: "https://i.postimg.cc/SskZmW6v/file-00000000a0cc71f480aa0e9ce2357b9f.png",
    screenshots: [
      "https://i.postimg.cc/T1zx77br/file-00000000e72c71f4a26e276c735c4cb5.png",
      "https://i.postimg.cc/vTJyqqnr/file-0000000064c871f49fcc56492c368c46.png",
      "https://i.postimg.cc/hvknyym3/file-0000000054cc7246b3638c2e1a59bdba.png",
      "https://i.postimg.cc/WpCs13y4/file-000000006a7472439f2b3abd067127aa.png",
      "https://i.postimg.cc/90RVB5Db/file-000000007a2071f481560f3c59e6c997.png",
      "https://i.postimg.cc/Fzdmx5Yd/file-00000000d4d471f490e96bb45ace1f35.jpg",
      "https://i.postimg.cc/MZNzpTL3/file-00000000105871f48d821eced6bbf9b8.png",
      "https://i.postimg.cc/mZJTgDnV/file-000000002b6871f485cd74974ad9e4dd.png",
      "https://i.postimg.cc/dtCwkFMf/file-00000000a58871f4ae2c7e0c33cd89c2.png",
      "https://i.postimg.cc/CL8SB0TT/file-00000000a6c871f491cc002bd4ee3857.png",
    ],
    features: [
      "Animated spin wheel with prize mechanics",
      "Achievements & unlockable badges",
      "In-app rewards & coin economy",
      "Daily missions and bonuses",
      "Friend invites & social sharing",
      "Optimized for buttery-smooth animation",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Functions", "AdMob"],
    platform: "Android",
    category: "Game",
    version: "5.2",
    stats: [
      { label: "Total Users", value: "50+", backgroundImage: usersBg },
      { label: "Downloads", value: "50+", backgroundImage: downloadsBg },
      { label: "App Rating", value: "2.2★", backgroundImage: ratingBg },
      { label: "Daily Spins", value: "100+", backgroundImage: spinsBg },
    ],
    process: defaultProcess,
    challenges: [
      {
        title: "Provably-fair spin engine",
        body: "Implemented a server-validated randomness layer to keep rewards fair while preserving the thrill of the spin.",
      },
      {
        title: "Animation performance",
        body: "Hand-tuned the spin physics and easing to hit 60fps across mid-tier Android hardware.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=novaspin.aplicajn",
  },
  {
    slug: "nova-play",
    title: "Nova Play",
    cat: "Mobile Apps",
    tag: "Flagship",
    status: "Live",
    short: "All-in-one entertainment platform with mini games, puzzles, and challenges.",
    overview:
      "Nova Play is a feature-rich mobile gaming app offering a collection of fun mini-games, puzzles, and challenges designed to deliver engaging entertainment and a smooth user experience. A modular launcher architecture makes it easy to ship new games without compromising the core experience.",
    image: "https://i.postimg.cc/fy2PZXFn/file-00000000de1471f4869d977f909653a6.png",
    screenshots: [
      "https://i.postimg.cc/c1mJ10Sz/file-0000000051fc7246811c96a4eb30158b.png",
      "https://i.postimg.cc/fWKbWDNd/file-00000000715c71f480408ec4c21112b1.png",
      "https://i.postimg.cc/TYNYm0hn/file-00000000795c720a907292c0818d3850-(1).png",
      "https://i.postimg.cc/dtNtd6Dd/file-000000009ca07246b6b7cd0b416352cc.png",
      "https://i.postimg.cc/SRDQg7rD/file-00000000e0c471f48946f8bf698183de.png",
      "https://i.postimg.cc/Gtq3XJQZ/file-00000000eb8071f4beaa164b9085285e.png",
      "https://i.postimg.cc/Dyww8Hf0/IMG-20251117-095725.png",
      "https://i.postimg.cc/w38xB71J/file-0000000050c071f4b10837514c5f880e.png",
    ],
    features: [
      "Curated library of mini-games",
      "Puzzles, arcade and challenge modes",
      "Cross-game leaderboards",
      "Unified profile & achievements",
      "Offline-capable gameplay",
      "Premium dark UI with gold accents",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Game Services", "AdMob"],
    platform: "Android",
    category: "Game",
    version: "9.3",
    stats: [
      { label: "Total Users", value: "50+", backgroundImage: usersBg },
      { label: "Downloads", value: "50+", backgroundImage: downloadsBg },
      { label: "App Rating", value: "2.4★", backgroundImage: ratingBg },
      { label: "Mini Games", value: "25+", backgroundImage: gamesBg },
    ],
    process: defaultProcess,
    challenges: [
      {
        title: "Modular game architecture",
        body: "Built a plug-in style architecture so new mini-games can be shipped as isolated modules without app-wide regressions.",
      },
      {
        title: "Install size optimization",
        body: "Used dynamic asset delivery to keep the base install lean while supporting a large catalog of games.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=novaplay.aplicwoo",
  },
];

export const globalProjectPerformance: ProjectStat[] = [
  { label: "TOTAL DOWNLOADS", value: "1K+", backgroundImage: perfDownloadsBg },
  { label: "AVERAGE RATING", value: "4.8 ★", backgroundImage: perfRatingBg },
  { label: "CRASH-FREE USERS", value: "99.9%", backgroundImage: perfStabilityBg },
  { label: "LIVE & MAINTAINED", value: "92%", backgroundImage: perfMaintainedBg },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
