import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id="terms"
      className="mt-12 scroll-mt-24 rounded-2xl border border-olive-100 bg-white/60 p-5 sm:p-6"
    >
      <h2 className="font-display text-base font-medium text-ink">{t.terms.heading}</h2>

      <div className="mt-3">
        <div
          id="terms-body"
          className={`space-y-2 overflow-hidden text-xs leading-relaxed text-ink-soft ${
            expanded ? "" : "max-h-[4.5rem]"
          }`}
          style={expanded ? undefined : { maskImage: "linear-gradient(to bottom, black 50%, transparent)" }}
        >
          {t.terms.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {t.terms.points.map((point) => (
            <p key={point.title}>
              <strong className="font-semibold text-ink">{point.title}:</strong> {point.text}
            </p>
          ))}

          <h3 className="font-display pt-3 text-sm font-medium text-ink">{t.terms.recording.title}</h3>
          <p>{t.terms.recording.intro}</p>
          {t.terms.recording.agree && <p>{t.terms.recording.agree}</p>}
          <ul className="list-disc space-y-2 pl-5">
            {t.terms.recording.points.map((point) => (
              <li key={point.title}>
                <strong className="font-semibold text-ink">{point.title}:</strong> {point.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls="terms-body"
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-olive-700 hover:text-olive-900"
      >
        {expanded ? t.terms.less : t.terms.more}
        <ChevronDown className={`h-3.5 w-3.5 transition ${expanded ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
