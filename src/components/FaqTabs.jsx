import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import MoodGallery from "./MoodGallery";

export default function FaqTabs() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(t.faq.tabs[0].key);
  const [openIndex, setOpenIndex] = useState(0);

  const tabIndex = t.faq.tabs.findIndex((tab) => tab.key === activeTab);
  const current = t.faq.tabContent[activeTab];

  function selectTab(key) {
    setActiveTab(key);
    setOpenIndex(0);
  }

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MoodGallery lang={lang} className="mb-10 flex gap-3 overflow-x-auto pb-2 lg:hidden" />

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:items-start lg:gap-12 xl:grid-cols-[1fr_260px]">
          <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
            <div className="flex justify-center lg:justify-start">
              <span className="rounded-full border border-olive-100 px-4 py-1.5 text-xs font-medium tracking-wide text-ink-soft uppercase">
                {t.faq.heading}
              </span>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <div className="flex flex-wrap justify-center gap-1 rounded-full bg-olive-100/60 p-1 lg:justify-start">
                {t.faq.tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => selectTab(tab.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      tab.key === activeTab
                        ? "bg-olive-900 text-cream"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs font-medium tracking-wide text-clay-dark">
                {String(tabIndex + 1).padStart(2, "0")} / {String(t.faq.tabs.length).padStart(2, "0")}
              </p>
              <h2 className="font-display mt-2 text-2xl font-medium text-ink sm:text-3xl">
                {current.heading}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{current.subheading}</p>
              <div className="mt-4 border-t border-olive-100" />

              <div className="mt-6 space-y-3">
                {current.items.map((item, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <div
                      key={item.q}
                      className="overflow-hidden rounded-2xl border border-olive-100 bg-white/60"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : i)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="rounded-md bg-clay/15 px-2 py-1 text-xs font-medium text-clay-dark">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm font-medium text-ink sm:text-base">
                          {item.q}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive-100/70 text-lg leading-none text-ink-soft">
                          {isOpen ? "–" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pl-16 text-sm leading-relaxed text-ink-soft">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <MoodGallery
            lang={lang}
            className="sticky top-24 hidden flex-col gap-4 lg:flex"
          />
        </div>
      </div>
    </section>
  );
}
