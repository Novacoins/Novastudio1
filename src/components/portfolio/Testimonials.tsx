import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { SectionLabel } from "./About";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import t4 from "@/assets/testimonial-4.jpg";

const reviews = [
  {
    name: "Marcus Johnson",
    role: "Founder & CEO",
    company: "Northwind Labs · USA",
    image: t1,
    quote:
      "Exceptional mobile app development. Nova Studio delivered a polished product ahead of schedule and elevated every detail of the experience.",
  },
  {
    name: "Sophie Bennett",
    role: "Startup Owner",
    company: "Lumen Studio · UK",
    image: t2,
    quote:
      "Outstanding communication and technical expertise. He transformed our idea into a beautiful, production-ready application.",
  },
  {
    name: "Rajesh Patel",
    role: "Business Manager",
    company: "Meridian Group · Canada",
    image: t3,
    quote:
      "Professional, reliable, and extremely talented. Our platform launched flawlessly and our users love it.",
  },
  {
    name: "Mia Chen",
    role: "Product Designer",
    company: "FORM & FUNCTION · NY",
    image: t4,
    quote:
      "A rare blend of design sensitivity and engineering craft. Every pixel and interaction shipped exactly as envisioned.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Kind Words</SectionLabel>
            <h2 className="mt-4 font-display text-[4rem] leading-[1.1] tracking-tight md:text-[5rem] lg:text-[6rem]">
              Trusted by founders & <span className="text-gold-gradient italic">teams</span>.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="group relative rounded-3xl glass-panel p-8 transition-all duration-500 hover:-translate-y-1 hover:gold-glow md:p-10"
            >
              <Quote className="absolute right-8 top-8 h-10 w-10 text-gold/20" />
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-xl leading-snug text-foreground md:text-2xl">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 ring-offset-2 ring-offset-background">
                  <img
                    src={r.image}
                    alt={`${r.name} headshot`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-gold/90">{r.role}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {r.company}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
