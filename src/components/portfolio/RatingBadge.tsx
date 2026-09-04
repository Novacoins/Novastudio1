import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export function RatingBadge() {
  const [lit, setLit] = useState(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step = (step + 1) % 7; // 0..5 lighting, 6 pause
      setLit(step > 5 ? 5 : step);
      if (step === 0) setLit(0);
    }, 450);
    return () => clearInterval(id);
  }, []);

  const handleClick = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 2600);
  };

  const Laurel = ({ flip = false }: { flip?: boolean }) => (
    <svg
      viewBox="0 0 60 100"
      className={`h-16 w-10 md:h-20 md:w-12 ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`laurel-${flip ? "r" : "l"}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffe9a0" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <g fill={`url(#laurel-${flip ? "r" : "l"})`}>
        <path
          d="M30 96 C 30 60 30 20 30 4"
          stroke={`url(#laurel-${flip ? "r" : "l"})`}
          strokeWidth="1.5"
          fill="none"
        />
        {[10, 22, 34, 46, 58, 70, 82].map((y, i) => {
          const size = 10 + (i < 3 ? i : 6 - i) * 1.2;
          return (
            <ellipse
              key={y}
              cx={30 - size}
              cy={y}
              rx={size}
              ry={size / 2.2}
              transform={`rotate(-35 ${30 - size} ${y})`}
              opacity="0.95"
            />
          );
        })}
      </g>
    </svg>
  );

  return (
    <div className="relative mx-auto flex max-w-2xl flex-col items-center py-10">
      <div className="flex items-center justify-center gap-4">
        <Laurel />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => {
              const active = i < lit;
              return (
                <button
                  key={i}
                  onClick={handleClick}
                  aria-label={`Rate ${i + 1} star`}
                  className="transition-transform duration-200 hover:scale-125"
                >
                  <Star
                    className={`h-6 w-6 md:h-7 md:w-7 transition-all duration-500 ${
                      active
                        ? "fill-[#ffd700] text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.85)]"
                        : "fill-black text-black/70"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              );
            })}
          </div>
          <div className="mt-3 font-display text-2xl tracking-[0.25em] text-gold-gradient md:text-3xl">
            ★ TOP #1
          </div>
          <div className="mt-1 font-display text-base italic tracking-wide text-foreground/80 md:text-lg">
            Nova Studio <span className="text-gold">(Coding)</span>
          </div>
        </div>
        <Laurel flip />
      </div>

      {toast && (
        <div
          role="status"
          className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 animate-fade-in rounded-full border border-gold/40 bg-black/80 px-5 py-2 text-sm font-medium text-gold shadow-[0_0_30px_rgba(255,215,0,0.35)] backdrop-blur"
        >
          ⭐ Thank you for rating Nova Studio!
        </div>
      )}
    </div>
  );
}
