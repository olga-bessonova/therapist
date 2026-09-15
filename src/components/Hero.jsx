import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-olive-800 text-cream scroll-mt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/pexels-di-lai-567499892-19389843.jpg)" }}
      />
      <div className="absolute inset-0 bg-olive-900/75" />

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
          <img
            src="/images/2636689f44d23e4e1decc9cc9cc4d048.jpg"
            alt={t.hero.imageAlt}
            className="aspect-[4/5] w-64 rounded-3xl object-cover shadow-xl ring-1 ring-cream/10 sm:w-80 md:w-full md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}
