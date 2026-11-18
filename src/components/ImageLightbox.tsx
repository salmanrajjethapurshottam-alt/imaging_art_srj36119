import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SmartImage } from './SmartImage';

export interface LightboxImageItem {
  src: string;
  caption: string;
}

export interface LightboxState {
  items: LightboxImageItem[];
  index: number;
}

interface ImageLightboxProps {
  state: LightboxState | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function ImageLightbox({ state, onClose, onNavigate }: ImageLightboxProps) {
  useEffect(() => {
    if (!state) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && state.items.length > 1) {
        onNavigate((state.index + 1) % state.items.length);
      } else if (e.key === 'ArrowLeft' && state.items.length > 1) {
        onNavigate((state.index - 1 + state.items.length) % state.items.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, onClose, onNavigate]);

  if (!state || state.items.length === 0) return null;
  const current = state.items[state.index] ?? state.items[0];
  const hasMultiple = state.items.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="High resolution visual viewer"
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E31E24] text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((state.index - 1 + state.items.length) % state.items.length);
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E31E24] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((state.index + 1) % state.items.length);
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E31E24] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[min(94vw,1440px)] max-h-[78vh] flex items-center justify-center"
      >
        <SmartImage
          src={current.src}
          alt={current.caption}
          loading="eager"
          className="max-w-full max-h-[76vh] object-contain rounded-lg border border-white/10 shadow-2xl"
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 text-center max-w-2xl px-4"
      >
        <p className="text-slate-200 text-xs sm:text-sm font-medium">{current.caption}</p>
        {hasMultiple && (
          <p className="font-mono text-[10px] text-slate-400 mt-1">
            {state.index + 1} / {state.items.length}
          </p>
        )}
      </div>
    </div>
  );
}
