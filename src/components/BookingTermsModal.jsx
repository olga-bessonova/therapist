import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

// Shown before opening a paid Calendly booking: key terms + "I agree" checkbox.
export default function BookingTermsModal({ booking, onClose }) {
  const { t } = useLanguage();
  const m = t.terms.modal;
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const proceed = () => {
    window.open(booking.url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-terms-heading"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-ink-soft hover:text-ink"
          aria-label={m.cancel}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id="booking-terms-heading" className="font-display pr-6 text-xl font-medium text-ink">
          {m.heading}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">{booking.service}</p>

        <p className="mt-5 text-sm text-ink-soft">{m.intro}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-relaxed text-ink-soft">
          {t.terms.points.map((point) => (
            <li key={point.title}>
              <strong className="font-semibold text-ink">{point.title}:</strong> {point.text}
            </li>
          ))}
        </ul>

        <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-olive-900"
          />
          {m.agree}
        </label>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            {m.cancel}
          </button>
          <button
            type="button"
            onClick={proceed}
            disabled={!agreed}
            className="rounded-full bg-olive-900 px-5 py-2 text-sm font-medium text-cream transition hover:bg-olive-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-olive-900"
          >
            {m.proceed}
          </button>
        </div>
      </div>
    </div>
  );
}
