import { useState, type ImgHTMLAttributes } from 'react';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

/**
 * Renders local/static imagery with an intentional fallback frame so
 * no broken-image icons ever appear if a user adds an invalid path.
 */
export function SmartImage({
  fallbackLabel,
  alt,
  className = '',
  loading = 'lazy',
  ...props
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'ImagingArts media frame'}
        className={`flex items-center justify-center bg-[#121622] text-slate-400 text-[11px] font-mono text-center px-3 ${className}`}
      >
        <span>{fallbackLabel || alt || 'ImagingArts Visual'}</span>
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
