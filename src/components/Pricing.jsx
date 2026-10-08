import { useLanguage } from "../i18n/LanguageContext";
import { useBooking } from "./BookingContext";
import Terms from "./Terms";

export default function Pricing() {
  const { t } = useLanguage();
  const { openBooking, openFreeConsultation } = useBooking();

  return (
    <section id="pricing" className="relative scroll-mt-20 overflow-hidden bg-cream pt-12 pb-16 sm:pb-24">
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

        <Terms />

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={openFreeConsultation}
            className="inline-block rounded-full bg-olive-900 px-8 py-4 text-base font-medium text-cream shadow-lg transition hover:scale-105 hover:bg-olive-800"
          >
            {t.nav.book}
          </button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.pricing.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-2xl border border-olive-100 bg-white/60 p-6 shadow-sm"
            >
              <h3 className="font-display text-center text-base font-medium text-ink">{card.title}</h3>
              {card.subtitle && (
                <p className="mt-1 text-center text-xs text-ink-soft/80">{card.subtitle}</p>
              )}

              <div className="mt-4 flex-1 space-y-2">
                {card.prices.map((p, i) => (
                  <div key={i} className="flex items-center justify-center gap-3">
                    <span className="font-display w-14 shrink-0 text-sm text-ink-soft">{p.label}</span>
                    <span className="font-display w-16 shrink-0 text-xl font-medium text-ink tabular-nums">
                      {p.amount}
                    </span>
                    {p.url && (
                      <button
                        type="button"
                        onClick={() =>
                          openBooking({
                            url: p.url,
                            service: p.label ? `${card.title} — ${p.label}` : card.title,
                          })
                        }
                        aria-label={`${t.pricing.bookLabel}: ${card.title}${p.label ? `, ${p.label}` : ""}`}
                        className="shrink-0 rounded-full bg-olive-900 px-4 py-1.5 text-sm font-medium text-cream transition hover:bg-olive-600"
                      >
                        {t.pricing.bookLabel}
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
