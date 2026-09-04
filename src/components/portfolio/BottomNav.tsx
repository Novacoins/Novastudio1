import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, Briefcase } from "lucide-react";
import { motion } from "motion/react";

export function BottomNav() {
  const location = useRouterState({ select: (s) => s.location });
  const pathname = location.pathname;
  const hash = location.hash || "";

  const isServices = pathname.startsWith("/services");
  const isProjects = pathname.startsWith("/projects");
  const isHome = pathname === "/" && !isServices && !isProjects;

  const items = [
    {
      label: "Home",
      to: "/",
      hash: undefined,
      active: isHome,
      Icon: Home,
    },
    {
      label: "Our Services",
      to: "/services",
      hash: undefined,
      active: isServices,
      Icon: Sparkles,
    },
    {
      label: "Projects",
      to: "/projects",
      hash: undefined,
      active: isProjects,
      Icon: Briefcase,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-40 block px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-2 lg:hidden"
    >
      <div className="mx-auto max-w-sm">
        {/* Floating Transparent Navigation System */}
        <div className="flex items-center justify-around px-2 py-1">
          {items.map((item) => {
            const Icon = item.Icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className="group relative flex flex-1 flex-col items-center justify-center py-1 text-center transition-transform active:scale-95"
              >
                {/* Subtle active glow indicator */}
                {item.active && (
                  <motion.div
                    layoutId="mobileNavActiveIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute -top-1 h-0.5 w-6 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,1)]"
                  />
                )}

                {/* Icon with refined styling */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center transition-all duration-300 ${
                      item.active
                        ? "text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.85)]"
                        : "text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-gold/90"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={item.active ? 2.3 : 1.9} />
                  </div>
                </div>

                {/* Label */}
                <span
                  className={`mt-0.5 text-[11px] tracking-tight transition-colors duration-200 ${
                    item.active
                      ? "font-semibold text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                      : "font-medium text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
