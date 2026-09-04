import { motion } from "motion/react";
import studioBg from "@/assets/images/about_studio_bg_1786841093511.jpg";
import globalBg from "@/assets/images/about_global_bg_1786841105556.jpg";
import stackBg from "@/assets/images/about_stack_bg_1786841117717.jpg";
import statusBg from "@/assets/images/about_status_bg_1786841132975.jpg";

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>About Us</SectionLabel>
        <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[4rem] font-semibold leading-[1.1] tracking-tight text-white md:text-[5rem] lg:text-[6rem]">
              A premium digital studio with{" "}
              <span className="text-gold-gradient italic">5+ years</span> of craft.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
              Nova Studio helps businesses, startups, and entrepreneurs transform their ideas into
              successful digital products. We deliver premium mobile apps, AI systems, web
              platforms, custom software, and brand experiences engineered for growth, innovation,
              and lasting profitability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 self-center"
          >
            {[
              { k: "Studio", v: "Nova Studio", bg: studioBg },
              { k: "Based in", v: "Worldwide 🌍", bg: globalBg },
              { k: "Stack", v: "Mobile · Web · AI", bg: stackBg },
              { k: "Status", v: "Available for work 👨‍💻", bg: statusBg },
            ].map((i) => (
              <div
                key={i.k}
                className="group relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-lg transition-all duration-300 hover:border-gold/40"
              >
                {/* Photographic realistic background visual */}
                <img
                  src={i.bg}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Cinematic dark & warm gold studio overlay */}
                <div className="absolute inset-0 bg-black/75 transition-colors duration-500 group-hover:bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_70%)]" />

                {/* Relative Card Content */}
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {i.k}
                  </div>
                  <div className="mt-1.5 text-base font-medium text-foreground">{i.v}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-10 bg-gold" />
      <span className="text-xs uppercase tracking-[0.3em] text-gold">{children}</span>
    </div>
  );
}
