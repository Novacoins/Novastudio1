import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: (string | LightboxItem)[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  title?: string;
}

export function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex = 0,
  onIndexChange,
  title,
}: ImageLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Normalize images into structured items
  const normalizedImages: LightboxItem[] = images.map((item, idx) => {
    if (typeof item === "string") {
      return {
        src: item,
        alt: title ? `${title} - Image ${idx + 1}` : `Image ${idx + 1}`,
      };
    }
    return item;
  });

  const total = normalizedImages.length;
  const currentItem = normalizedImages[currentIndex] || normalizedImages[0];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : total - 1;
    onIndexChange?.(prevIndex);
  }, [currentIndex, total, onIndexChange]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    const nextIndex = currentIndex < total - 1 ? currentIndex + 1 : 0;
    onIndexChange?.(nextIndex);
  }, [currentIndex, total, onIndexChange]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Mobile swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is dominant and above threshold
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && total > 1) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="nova-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={title || "Image Viewer"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-xl select-none"
        >
          {/* Header Bar */}
          <div
            className="flex w-full max-w-6xl items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              {title && (
                <span className="font-display text-sm sm:text-base font-semibold text-gold truncate max-w-[240px] sm:max-w-md">
                  {title}
                </span>
              )}
              {total > 1 && (
                <span className="text-xs text-muted-foreground">
                  {currentIndex + 1} of {total}
                </span>
              )}
            </div>

            {/* ONLY [X Close] button — no external-link button */}
            <button
              id="lightbox-close-btn"
              type="button"
              onClick={onClose}
              aria-label="Close image"
              title="Close image (Esc)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-surface-elevated/80 text-gold shadow-lg transition-all hover:border-gold hover:bg-gold hover:text-black active:scale-95 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Central Image Viewport */}
          <div
            className="relative flex flex-1 w-full max-w-6xl items-center justify-center overflow-hidden my-auto py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button (Desktop & Tablet) */}
            {total > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                title="Previous image (Left Arrow)"
                className="absolute left-1 sm:left-4 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/40 bg-black/80 text-gold shadow-2xl transition-all hover:border-gold hover:bg-gold hover:text-black active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Complete original image (contained, responsive) */}
            <motion.div
              key={currentItem.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center max-h-[78vh] sm:max-h-[82vh] max-w-full"
            >
              <img
                src={currentItem.src}
                alt={currentItem.alt || "Project preview"}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="max-h-[76vh] sm:max-h-[80vh] w-auto max-w-full rounded-xl sm:rounded-2xl border border-gold/20 object-contain shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              />
            </motion.div>

            {/* Next Button (Desktop & Tablet) */}
            {total > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                title="Next image (Right Arrow)"
                className="absolute right-1 sm:right-4 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/40 bg-black/80 text-gold shadow-2xl transition-all hover:border-gold hover:bg-gold hover:text-black active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Indicator / Caption */}
          <div
            className="flex items-center justify-center z-20 pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.caption ? (
              <span className="text-center text-xs text-muted-foreground px-4">
                {currentItem.caption}
              </span>
            ) : total > 1 ? (
              <div className="flex items-center gap-1.5">
                {normalizedImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onIndexChange?.(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 bg-gold shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                        : "w-1.5 bg-gold/30 hover:bg-gold/60"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span className="text-[11px] uppercase tracking-widest text-gold/70">
                Nova Studio High-Resolution Viewer
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
