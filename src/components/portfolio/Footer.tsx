import { RatingBadge } from "./RatingBadge";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 font-display text-3xl font-semibold">
              <span>
                Nova<span className="text-gold-gradient italic"> Studio</span>
              </span>
              <span
                aria-label="Verified"
                title="Verified"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center md:h-6 md:w-6"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-full w-full drop-shadow-[0_0_6px_rgba(29,155,240,0.55)]"
                  aria-hidden="true"
                >
                  <path
                    fill="#1D9BF0"
                    d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
                  />
                  <path
                    fill="#fff"
                    d="m10.54 15.6-2.63-2.63 1.42-1.42 1.21 1.21 3.79-3.79 1.41 1.42z"
                  />
                </svg>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/75">
              Nova Studio is a premium digital agency crafting world-class mobile apps, AI systems,
              web platforms and luxury brand experiences for ambitious businesses worldwide.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Navigate
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              {["About", "Services", "Portfolio", "Reviews", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-gold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              <li>
                <a href="mailto:oniyetaofiqishola11@gmail.com" className="hover:text-gold">
                  oniyetaofiqishola11@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2349045403005" className="hover:text-gold">
                  Call: 09045403005
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349045403005"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-gold"
                >
                  WhatsApp: 09045403005
                </a>
              </li>
              <li>Available Worldwide 🌍</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border">
          <RatingBadge />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="text-xs text-foreground/60">
            © {new Date().getFullYear()} Nova Studio. All rights reserved.
          </div>
          <div className="text-xs text-foreground/60">Designed &amp; engineered with care.</div>
        </div>
      </div>
    </footer>
  );
}
