import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Prep() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="prep" className="scroll-mt-20 bg-olive-900 py-16 text-cream sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-center text-2xl font-medium sm:text-3xl">
          {t.prep.heading}
        </h2>
        <p className="mt-4 text-center text-sm leading-relaxed text-olive-100 sm:text-base">
          {t.prep.intro}
        </p>

        <div className="mt-10 space-y-3">
          {t.prep.sections.map((section, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={section.heading} className="overflow-hidden rounded-2xl bg-olive-700/60 ring-1 ring-cream/5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium sm:text-lg">
                    {section.heading}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/10 text-lg leading-none">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="space-y-3 px-5 pb-5 text-sm leading-relaxed text-olive-100 sm:text-[15px]">
                    {section.subheading && (
                      <p className="italic text-clay-light">{section.subheading}</p>
                    )}
                    {section.intro && <p>{section.intro}</p>}
                    {section.itemsIntro && <p>{section.itemsIntro}</p>}
                    {section.items && (
                      <ul className="list-inside list-disc space-y-1.5 marker:text-clay">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.note && <p className="text-olive-100/90">{section.note}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
