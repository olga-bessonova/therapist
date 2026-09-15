import { useLanguage } from "../i18n/LanguageContext";
import { CALENDLY_URL } from "../config";

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="relative scroll-mt-20 overflow-hidden bg-cream py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/pexels-sarahdorweiler-8408553.jpg)" }}
      />
      <div className="absolute inset-0 bg-cream/50" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-center text-2xl font-medium text-ink sm:text-3xl">
          {t.pricing.heading}
        </h2>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
          {t.pricing.services.map((s) => (
            <div key={s.title}>
              <h3 className="font-display text-lg font-medium text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-olive-900 px-8 py-4 text-base font-medium text-cream shadow-lg transition hover:scale-105 hover:bg-olive-800"
          >
            {t.nav.book}
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.pricing.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-2xl border border-olive-100 bg-white/60 p-6 shadow-sm"
            >
              <h3 className="font-display text-base font-medium text-ink">{card.title}</h3>
              {card.subtitle && (
                <p className="mt-1 text-xs text-ink-soft/80">{card.subtitle}</p>
              )}

              <div className="mt-4 flex-1 space-y-1">
                {card.prices.map((p, i) => (
                  <p key={i} className="font-display text-xl font-medium text-ink">
                    {p.amount}
                    {p.label && (
                      <span className="ml-2 text-sm font-normal text-ink-soft"> — {p.label}</span>
                    )}
                  </p>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
