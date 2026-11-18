import { useMemo, useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import {
  estimatePrintQuote,
  type CurrencyCode,
  type FinishOption,
} from '../data/printTiers';
import { UI_DICTIONARY, type LanguageCode } from '../i18n/translations';

interface QuoteStudioZoneProps {
  lang: LanguageCode;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function QuoteStudioZone({
  lang,
  selectedCategory,
  onCategoryChange,
}: QuoteStudioZoneProps) {
  const dict = UI_DICTIONARY[lang].quote;

  const [finish, setFinish] = useState<FinishOption>('Matte / Velvet Lamination');
  const [currency, setCurrency] = useState<CurrencyCode>('TZS');
  const [dimensions, setDimensions] = useState('Standard / Custom');
  const [quantity, setQuantity] = useState(100);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  const finishOptions: Array<{ label: string; value: FinishOption }> = [
    { label: dict.finishLabels.matte, value: 'Matte / Velvet Lamination' },
    { label: dict.finishLabels.foil, value: '24K Metallic Foil + Emboss' },
    { label: dict.finishLabels.vinyl, value: 'Heavy Outdoor UV Vinyl / 3D Acrylic' },
    { label: dict.finishLabels.pvc, value: 'PVC Card / Cotton Apparel' },
  ];

  const estimate = useMemo(
    () => estimatePrintQuote(selectedCategory, finish, quantity, currency),
    [selectedCategory, finish, quantity, currency],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const sender = name.trim() || (lang === 'sw' ? 'Mteja' : 'Client');
    setSubmittedMsg(
      lang === 'sw'
        ? `Asante, ${sender}! Umechagua idadi ${quantity.toLocaleString()} za "${selectedCategory}" (${finish}). Makisio: ${estimate.formatted}. Timu yetu ya Mbezi Beach (+255 716 237 714) itawasiliana nawe mara moja.`
        : `Asante, ${sender}! Configured ${quantity.toLocaleString()} units of "${selectedCategory}" (${finish}). Estimated ${estimate.formatted}. Our Mbezi Beach team (+255 716 237 714) will respond promptly.`,
    );
  };

  const handleReset = () => {
    setSubmittedMsg(null);
    setName('');
    setContact('');
    setNotes('');
    setQuantity(100);
    setDimensions('Standard / Custom');
  };

  return (
    <div className="studio-card rounded-2xl w-full max-w-5xl mx-auto max-h-[calc(100dvh-168px)] overflow-y-auto zone-scroll-area custom-scroll border-t-[3px] border-t-[#E31E24] p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C8191E] dark:text-[#E31E24] font-bold">
            {dict.eyebrow}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-0.5">
            {dict.title}
          </h2>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => setCurrency((c) => (c === 'TZS' ? 'USD' : 'TZS'))}
            className="px-3 py-1.5 rounded-xl bg-[#162A64] border border-transparent dark:border-white/15 font-mono text-xs text-white hover:bg-[#25449C] cursor-pointer"
          >
            {dict.currencyLabel}: {currency}
          </button>
          <div className="text-right">
            <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase">
              {dict.estimatedTier}
            </div>
            <div
              data-testid="quote-estimate-display"
              className="font-display font-extrabold text-lg sm:text-2xl text-[#E31E24] tabular-nums"
            >
              {estimate.formatted}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
        <div className="p-4 rounded-2xl bg-[#162A64]/[0.06] dark:bg-[#162A64]/25 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 text-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold mb-2.5">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>{dict.freeDelivery}</span>
            </div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              {dict.officeHeading}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-950 dark:text-white">
                White Beach Park Commercial Complex
              </strong>
              <br />
              First Floor, Office # 207/210, Mbezi Beach
              <br />
              P.O. Box 31902, Dar es Salaam, Tanzania
            </p>
            <div className="mt-3 space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-200">
              <div>
                Mob:{' '}
                <a
                  href="tel:+255716237714"
                  className="text-[#C8191E] dark:text-[#F87171] font-semibold hover:underline"
                >
                  +255 716 237 714
                </a>{' '}
                |{' '}
                <a
                  href="tel:+255768725874"
                  className="text-[#C8191E] dark:text-[#F87171] font-semibold hover:underline"
                >
                  +255 768 725 874
                </a>
              </div>
              <div>
                Email:{' '}
                <a
                  href="mailto:imagingarts@hotmail.com"
                  className="text-[#162A64] dark:text-blue-300 font-semibold hover:underline"
                >
                  imagingarts@hotmail.com
                </a>
              </div>
              <div className="text-slate-500 dark:text-slate-400">Social: @imagingarts_tz</div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 font-mono text-[10px] text-slate-600 dark:text-slate-400 space-y-1">
            <div className="text-slate-900 dark:text-white font-bold">{dict.accreditedHeading}</div>
            <div>
              • {dict.incorpLabel}:{' '}
              <span className="text-slate-900 dark:text-slate-200 font-semibold">488483</span>
            </div>
            <div>
              • {dict.licenseLabel}:{' '}
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                BL01396912025-2600010011
              </span>
            </div>
            <div>
              • {dict.tinLabel}:{' '}
              <span className="text-slate-900 dark:text-slate-200 font-semibold">139-769-368</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="q-category"
                className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold"
              >
                {dict.step1}
              </label>
              <select
                id="q-category"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D0E12] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#E31E24]"
              >
                {dict.categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                {dict.step2}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {finishOptions.map((opt) => {
                  const active = finish === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFinish(opt.value)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                        active
                          ? 'border-[#E31E24] bg-[#E31E24]/12 dark:bg-[#E31E24]/20 text-slate-950 dark:text-white font-bold'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="q-dimensions"
                  className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold"
                >
                  {dict.step3}
                </label>
                <input
                  id="q-dimensions"
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>
              <div>
                <label
                  htmlFor="q-qty"
                  className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold"
                >
                  {dict.step4} ({quantity.toLocaleString()})
                </label>
                <input
                  id="q-qty"
                  type="range"
                  min={1}
                  max={5000}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#E31E24] mt-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div>
                <label
                  htmlFor="q-name"
                  className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold"
                >
                  {dict.nameLabel}
                </label>
                <input
                  id="q-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.namePlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>
              <div>
                <label
                  htmlFor="q-contact"
                  className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold"
                >
                  {dict.contactLabel}
                </label>
                <input
                  id="q-contact"
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={dict.contactPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>
              <div>
                <label
                  htmlFor="q-notes"
                  className="block font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400 mb-1 font-semibold"
                >
                  {dict.notesLabel}
                </label>
                <textarea
                  id="q-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={dict.notesPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#E31E24]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#162A64] via-[#E31E24] to-[#B31217] text-white font-display font-extrabold text-sm tracking-wide hover:brightness-110 transition-all shadow-lg shadow-[#E31E24]/25 cursor-pointer"
            >
              {dict.submitBtn}
            </button>
          </div>
        </form>
      </div>

      {submittedMsg && (
        <div
          role="status"
          className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-400/50 text-emerald-900 dark:text-emerald-100 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <strong className="font-display text-emerald-950 dark:text-white block">
              {dict.statusTitle}
            </strong>
            <span className="text-xs text-emerald-800 dark:text-emerald-200/90">{submittedMsg}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-emerald-700 dark:bg-white/10 hover:bg-emerald-800 dark:hover:bg-white/20 text-white text-xs font-mono shrink-0 cursor-pointer"
          >
            {dict.newQuoteBtn}
          </button>
        </div>
      )}
    </div>
  );
}
