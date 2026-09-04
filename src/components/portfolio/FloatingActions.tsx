import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-3d.png";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href="https://wa.me/2349045403005"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center transition-transform duration-300 hover:scale-105 sm:h-[72px] sm:w-[72px]"
      >
        <img
          src={whatsappIcon}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(37,211,102,0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_35px_rgba(37,211,102,0.55)]"
          draggable={false}
        />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-background/80 text-gold backdrop-blur transition-transform hover:scale-110 sm:h-12 sm:w-12"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
