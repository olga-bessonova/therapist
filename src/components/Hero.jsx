import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-olive-800 text-cream scroll-mt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(223,227,210,0.25), transparent 45%), radial-gradient(circle at 85% 75%, rgba(217,154,124,0.25), transparent 40%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:py-28">
        <div>
          <h1 className="font-display text-3xl leading-tight font-medium sm:text-4xl md:text-5xl">
            {t.hero.eyebrow}
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-olive-100 sm:text-lg">
            {t.hero.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <div className="aspect-[4/5] w-64 rounded-3xl bg-olive-600/60 shadow-xl ring-1 ring-cream/10 sm:w-80 md:w-full md:max-w-sm flex items-center justify-center">
            <span className="px-6 text-center text-sm text-olive-100/70">{t.hero.imageAlt}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
