import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import yearsExpBg from "@/assets/images/stat_years_exp_1786841582843.jpg";
import completedProjBg from "@/assets/images/stat_completed_proj_1786841600795.jpg";
import happyClientsBg from "@/assets/images/stat_happy_clients_1786841617968.jpg";
import appsDevBg from "@/assets/images/stat_apps_dev_1786841633767.jpg";
import websitesCreatedBg from "@/assets/images/stat_websites_created_1786841652331.jpg";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience", bg: yearsExpBg },
  { value: 50, suffix: "+", label: "Completed Projects", bg: completedProjBg },
  { value: 40, suffix: "+", label: "Happy Clients", bg: happyClientsBg },
  { value: 25, suffix: "+", label: "Apps Developed", bg: appsDevBg },
  { value: 30, suffix: "+", label: "Websites Created", bg: websitesCreatedBg },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const c = animate(count, to, { duration: 1.8, ease: "easeOut" });
      return c.stop;
    }
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-xl transition-all duration-300 hover:border-gold/40 hover:shadow-gold/5"
            >
              {/* Photographic realistic background visual */}
              <img
                src={s.bg}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinematic dark & warm gold studio overlay for optimal contrast */}
              <div className="absolute inset-0 bg-black/75 transition-colors duration-500 group-hover:bg-black/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/50" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.14),transparent_70%)]" />

              {/* Relative Content */}
              <div className="relative z-10 flex min-h-[140px] flex-col items-center justify-center text-center">
                <div className="font-display text-4xl font-bold tracking-tight text-gold-gradient drop-shadow-md md:text-5xl lg:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
