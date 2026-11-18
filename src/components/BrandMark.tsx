export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-xl bg-white shadow-md shadow-slate-900/15 dark:shadow-black/45 border border-slate-200 dark:border-white/20 flex items-center ${
        compact ? 'px-2.5 py-1' : 'px-3 py-1.5'
      }`}
    >
      <svg
        className={compact ? 'h-6 sm:h-7 w-auto' : 'h-8 sm:h-9 w-auto'}
        viewBox="0 0 235 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ImagingArts Creative Branding"
      >
        <line x1="36" y1="30" x2="64" y2="12" stroke="#162A64" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="64" y1="12" x2="86" y2="27" stroke="#E31E24" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="86" y1="27" x2="112" y2="6" stroke="#E31E24" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="64" cy="12" r="6.5" fill="white" stroke="#E31E24" strokeWidth="2.5" />
        <circle cx="64" cy="12" r="2.5" fill="#E31E24" />
        <circle cx="86" cy="27" r="6.5" fill="white" stroke="#E31E24" strokeWidth="2.5" />
        <circle cx="86" cy="27" r="2.5" fill="#E31E24" />
        <text
          x="10"
          y="47"
          fontFamily="'Outfit', system-ui, sans-serif"
          fontWeight="800"
          fontSize="29"
          letterSpacing="-0.6"
        >
          <tspan fill="#162A64">Imaging</tspan>
          <tspan fill="#0D0E12">Arts</tspan>
        </text>
        <line x1="12" y1="57" x2="54" y2="57" stroke="#E31E24" strokeWidth="2.2" strokeLinecap="round" />
        <text
          x="115"
          y="61"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="600"
          fontSize="11.5"
          fill="#E31E24"
          letterSpacing="0.6"
        >
          Creative Branding
        </text>
        <line x1="176" y1="57" x2="218" y2="57" stroke="#E31E24" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
