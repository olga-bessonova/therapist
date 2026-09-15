import { useLanguage } from "../i18n/LanguageContext";
import HelpIcon from "./HelpIcon";

export default function HelpGrid() {
  const { t } = useLanguage();

  return (
    <section className="bg-olive-800 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-center text-2xl font-medium text-clay-light sm:text-3xl">
          {t.help.heading}
        </h2>

        <div className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
