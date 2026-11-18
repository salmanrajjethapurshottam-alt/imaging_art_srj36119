import { useEffect, useState } from 'react';
import { UI_DICTIONARY, type LanguageCode } from '../i18n/translations';

interface IntroPreloaderProps {
  visible: boolean;
  lang: LanguageCode;
  onDismiss: () => void;
}

export function IntroPreloader({ visible, lang, onDismiss }: IntroPreloaderProps) {
  const [exiting, setExiting] = useState(false);
  const dict = UI_DICTIONARY[lang].preloader;

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(onDismiss, 600);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [visible, onDismiss]);

  if (!visible) return null;

  const handleSkip = () => {
    setExiting(true);
    window.setTimeout(onDismiss, 250);
  };

  return (
    <div
      role="dialog"
      aria-label="ImagingArts Creative Branding Opening Sequence"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F1F5F9_68%,#E2E8F0_100%)] transition-all duration-500 ${
        exiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative px-6 py-8 flex flex-col items-center max-w-2xl w-full">
        <svg
          className="w-full max-w-[420px] sm:max-w-[520px] h-auto drop-shadow-xl"
          viewBox="0 0 460 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            className="logo-draw-line"
            x1="108"
            y1="74"
            x2="162"
            y2="26"
            stroke="#162A64"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            className="logo-draw-line-2"
            x1="162"
            y1="26"
            x2="216"
            y2="62"
            stroke="#E31E24"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            className="logo-draw-line-3"
            x1="216"
            y1="62"
            x2="268"
            y2="8"
            stroke="#E31E24"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <g className="logo-node-group logo-node-1">
            <circle cx="162" cy="26" r="13" fill="#FFFFFF" stroke="#E31E24" strokeWidth="4.2" />
            <circle cx="162" cy="26" r="7" fill="#FFFFFF" stroke="#162A64" strokeWidth="2.5" />
            <circle cx="162" cy="26" r="2.8" fill="#E31E24" />
          </g>

          <g className="logo-node-group logo-node-2">
            <circle cx="216" cy="62" r="13" fill="#FFFFFF" stroke="#E31E24" strokeWidth="4.2" />
            <circle cx="216" cy="62" r="7" fill="#FFFFFF" stroke="#162A64" strokeWidth="2.5" />
            <circle cx="216" cy="62" r="2.8" fill="#E31E24" />
          </g>

          <g className="logo-wordmark-reveal">
            <text
              x="230"
              y="112"
              textAnchor="middle"
              fontFamily="'Outfit', system-ui, sans-serif"
              fontWeight="800"
              fontSize="62"
              letterSpacing="-1.5"
            >
              <tspan fill="#162A64">Imaging</tspan>
              <tspan fill="#0D0E12">Arts</tspan>
            </text>
          </g>

          <line
            className="logo-rule-expand"
            x1="34"
            y1="135"
            x2="124"
            y2="135"
            stroke="#E31E24"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <line
            className="logo-rule-expand"
            x1="336"
            y1="135"
            x2="426"
            y2="135"
            stroke="#E31E24"
            strokeWidth="3.8"
            strokeLinecap="round"
          />

          <text
            className="logo-tagline-reveal"
            x="230"
            y="142"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="600"
            fontSize="21"
            fill="#E31E24"
          >
            Creative Branding
          </text>
        </svg>

        <p className="mt-5 font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#162A64] font-bold text-center">
          {dict.subtitleLead} <span className="text-[#E31E24]">{dict.subtitleHighlight}</span>{' '}
          {dict.subtitleTail}
        </p>

        <div className="mt-4 w-56 sm:w-72 h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="intro-progress-bar h-full bg-gradient-to-r from-[#162A64] via-[#E31E24] to-[#0D0E12] rounded-full" />
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="mt-6 px-4 py-1.5 rounded-lg border border-slate-300 bg-white/80 text-xs font-mono uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          {dict.enterStudio}
        </button>
      </div>
    </div>
  );
}
