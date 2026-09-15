import { useLanguage } from "../i18n/LanguageContext";
import HelpIcon from "./HelpIcon";
import MoodGallery from "./MoodGallery";

const HELP_IMAGES = [
  {
    src: "/images/5.jpg",
    alt: { en: "Hands giving Reiki over the chest and face", ru: "Руки проводят Рейки над грудью и лицом" },
    position: "center 45%",
  },
  {
    src: "/images/8.jpg",
    alt: { en: "Crystal, sage, and a small Buddha on an altar", ru: "Кристалл, шалфей и статуэтка Будды на алтаре" },
    position: "center 45%",
  },
  {
    src: "/images/12.jpg",
    alt: { en: "Meditation hands in mudra at the ocean's edge", ru: "Руки в мудре во время медитации у кромки океана" },
    position: "center 45%",
  },
];

export default function HelpGrid() {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-olive-800 pt-16 pb-16 sm:pt-10 sm:pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-center text-2xl font-medium text-clay-light sm:text-3xl">
          {t.help.heading}
        </h2>

        <MoodGallery
          lang={lang}
          images={HELP_IMAGES}
          className="mt-8 flex justify-center gap-3 overflow-x-auto pb-2 lg:hidden"
        />

        {/* mobile/tablet: plain 2-col card grid, no row-matched photos */}
        <div className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:hidden">
          {t.help.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl bg-olive-700 p-6 text-cream ring-1 ring-cream/5 transition-transform duration-200 ease-out hover:scale-[1.02]"
            >
              <HelpIcon name={item.icon} className="h-6 w-6 text-clay" />
              <h3 className="font-display mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-olive-100">{item.text}</p>
            </div>
          ))}
        </div>

        {/* desktop: photos share the same grid rows as the cards, so each photo is the height of its card row */}
        <div className="mt-10 hidden auto-rows-fr gap-4 lg:grid lg:grid-cols-[220px_repeat(3,1fr)] xl:grid-cols-[260px_repeat(3,1fr)]">
          {HELP_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="group relative overflow-hidden rounded-2xl shadow-md ring-1 ring-cream/10"
              style={{ gridColumn: 1, gridRow: i + 1 }}
            >
              <img
                src={img.src}
                alt={img.alt[lang]}
                style={{ objectPosition: img.position }}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
              />
            </div>
          ))}

          {t.help.items.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl bg-olive-700 p-6 text-cream ring-1 ring-cream/5 transition-transform duration-200 ease-out hover:scale-[1.02]"
              style={{ gridColumn: (i % 3) + 2, gridRow: Math.floor(i / 3) + 1 }}
            >
              <HelpIcon name={item.icon} className="h-6 w-6 text-clay" />
              <h3 className="font-display mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-olive-100">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
