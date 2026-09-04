import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Award, ZoomIn, RefreshCw, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "./About";
import { ImageLightbox } from "./ImageLightbox";

const CERTIFICATE_DATA = {
  title: "Professional Software Development",
  issuer: "Nova Studio Verified Professional Credential",
  imageUrl: "https://i.postimg.cc/yWqFLhMW/file-000000003a6471f4b10e733df0b8e236.png",
  alt: "Nova Studio Professional Software Development Certificate",
  verifiedAlt: "Nova Studio Verified Professional Credential",
};

export function Certifications() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleRetry = () => {
    setHasError(false);
    setIsLoaded(false);
    setRetryCount((prev) => prev + 1);
  };

  const imageSrc =
    retryCount > 0 ? `${CERTIFICATE_DATA.imageUrl}?retry=${retryCount}` : CERTIFICATE_DATA.imageUrl;

  return (
    <section id="certifications" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[320px] w-[750px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionLabel>Credentials</SectionLabel>
          <h2 className="mt-5 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[4rem] md:text-[5rem]">
            <span aria-hidden>🏆 </span>
            Professional <span className="text-gold-gradient italic">Certifications</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/80">
            Verified certificates demonstrating my professional software development skills and
            technical expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-10 sm:mt-12 w-full max-w-4xl"
        >
          <div className="cert-glow relative rounded-3xl p-[2px] transition-all duration-300">
            <div className="group relative overflow-hidden rounded-[calc(1.5rem-2px)] border border-gold/30 bg-surface/85 p-2.5 sm:p-5 md:p-6 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]">
              {/* Corner Accents */}
              <span className="cert-corner cert-corner-tl" aria-hidden />
              <span className="cert-corner cert-corner-tr" aria-hidden />
              <span className="cert-corner cert-corner-bl" aria-hidden />
              <span className="cert-corner cert-corner-br" aria-hidden />

              {/* Loading Skeleton */}
              {!isLoaded && !hasError && (
                <div
                  id="cert-loading-skeleton"
                  className="flex min-h-[260px] sm:min-h-[380px] md:min-h-[460px] w-full flex-col items-center justify-center rounded-2xl bg-surface-elevated/40 border border-gold/10 animate-pulse"
                >
                  <Award className="h-12 w-12 text-gold/40 animate-bounce" />
                  <p className="mt-3 text-xs uppercase tracking-widest text-gold/60">
                    Loading verified credential...
                  </p>
                </div>
              )}

              {/* Error Fallback */}
              {hasError ? (
                <div
                  id="cert-error-fallback"
                  className="flex min-h-[260px] sm:min-h-[380px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-surface-elevated/50 p-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold mb-4 border border-gold/20">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-white">
                    {CERTIFICATE_DATA.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground max-w-md">
                    Verified Professional Credential for Nova Studio. The image is temporarily
                    refreshing from the secure host.
                  </p>
                  <button
                    id="retry-cert-load-btn"
                    onClick={handleRetry}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold/20 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Reload Certificate
                  </button>
                </div>
              ) : (
                /* Real Certificate Image Container */
                <div
                  className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    !isLoaded
                      ? "opacity-0 absolute inset-0 pointer-events-none"
                      : "opacity-100 relative"
                  }`}
                  onClick={() => setIsZoomed(true)}
                  title="Tap or click to view high-resolution certificate"
                >
                  <img
                    ref={imgRef}
                    id="nova-studio-certificate-image"
                    src={imageSrc}
                    alt={CERTIFICATE_DATA.alt}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    loading="eager"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                      setHasError(true);
                      setIsLoaded(false);
                    }}
                    className="block w-full h-auto max-h-[580px] md:max-h-[660px] rounded-xl sm:rounded-2xl object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.008]"
                  />

                  {/* Desktop Hover Prompt */}
                  <div className="hidden sm:flex absolute inset-0 items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px] pointer-events-none">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/80 px-4 py-2 text-xs font-medium uppercase tracking-widest text-gold shadow-lg">
                      <ZoomIn className="h-4 w-4" /> View Full Certificate
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar & Verified Credential Badge */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-8 sm:w-12 bg-gold/40" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                Verified Credential
              </span>
              <span className="h-px w-8 sm:w-12 bg-gold/40" />
            </div>

            <p className="text-xs text-muted-foreground max-w-lg px-2">
              Official certification issued to Nova Studio for professional software development.
            </p>

            {/* Quick Zoom Button for Mobile / Phone */}
            <button
              onClick={() => setIsZoomed(true)}
              className="inline-flex sm:hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gold active:bg-gold/20"
            >
              <ZoomIn className="h-3.5 w-3.5" /> Tap to Expand & View High-Res
            </button>
          </div>
        </motion.div>
      </div>

      {/* High-Resolution Certificate Lightbox / Modal */}
      <ImageLightbox
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        images={[
          {
            src: imageSrc,
            alt: CERTIFICATE_DATA.verifiedAlt,
            title: CERTIFICATE_DATA.title,
            caption: CERTIFICATE_DATA.issuer,
          },
        ]}
        title={CERTIFICATE_DATA.title}
      />
    </section>
  );
}
