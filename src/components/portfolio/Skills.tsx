import { motion } from "motion/react";
import { Smartphone, Code2, Database, Palette, Plug, Rocket, Globe, Sparkles } from "lucide-react";
import { SectionLabel } from "./About";

const skills = [
  { icon: Smartphone, name: "Flutter", level: 95, blurb: "Production-grade cross-platform apps" },
  { icon: Code2, name: "React Native", level: 92, blurb: "Native-feel iOS & Android experiences" },
  { icon: Database, name: "Firebase", level: 94, blurb: "Auth, Firestore, Functions & FCM" },
  { icon: Plug, name: "API Integration", level: 96, blurb: "REST, GraphQL, third-party services" },
  { icon: Palette, name: "UX / UI Design", level: 90, blurb: "Premium interfaces & motion design" },
  { icon: Globe, name: "Web Development", level: 93, blurb: "React, Next.js & modern web stacks" },
  {
    icon: Rocket,
    name: "Play Store Release",
    level: 95,
    blurb: "Launch, ASO & post-launch growth",
  },
  { icon: Sparkles, name: "Product Strategy", level: 88, blurb: "From idea to monetized product" },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Top Skills</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            The stack behind <span className="text-gold-gradient italic">premium</span> products.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:border-gold/40 hover:gold-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg">{s.name}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b]"
                  />
                </div>
                <div className="mt-1 text-right text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.level}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
