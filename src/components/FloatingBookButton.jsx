import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { CALENDLY_URL } from "../config";

export default function FloatingBookButton() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.nav.book}
      className={`group fixed top-1/2 right-6 z-40 grid h-16 -translate-y-1/2 grid-cols-[4rem_0fr] items-center overflow-hidden rounded-full bg-clay text-olive-900 shadow-lg transition-all duration-300 ease-out hover:grid-cols-[4rem_1fr] hover:bg-clay-light sm:right-12 sm:h-[100px] sm:grid-cols-[100px_0fr] sm:hover:grid-cols-[100px_1fr] ${
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
      }`}
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-[100px] sm:w-[100px]">
        <img src="/favicon.png" alt="" className="h-8 w-8 sm:h-12 sm:w-12" />
      </span>
      <span className="overflow-hidden pr-0 text-sm font-medium whitespace-nowrap transition-[padding] duration-300 group-hover:pr-7 sm:text-base sm:group-hover:pr-9">
        {t.nav.book}
      </span>
    </a>
  );
}
