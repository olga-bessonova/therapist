import { useLanguage } from "../i18n/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-olive-100 bg-white/60 p-6 sm:p-8">
      <h2 className="font-display text-lg font-medium text-ink sm:text-xl">{t.terms.heading}</h2>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
        {t.terms.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
