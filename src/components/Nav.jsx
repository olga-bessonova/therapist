import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { CALENDLY_URL } from "../config";

export default function Nav() {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isFaqPage = location.pathname.endsWith("/faq");

  const priceHref = isFaqPage ? `/${lang}#pricing` : "#pricing";
  const prepHref = isFaqPage ? `/${lang}#prep` : "#prep";
  const aboutHref = isFaqPage ? `/${lang}#about` : "#about";
  const reviewsHref = isFaqPage ? `/${lang}#reviews` : "#reviews";
  const contactHref = isFaqPage ? `/${lang}#contact` : "#contact";

  return (
    <header className="sticky top-0 z-30 border-b border-olive-100 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-8">
        <Link
          to={`/${lang}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg font-medium text-ink shrink-0"
        >
          {t.nav.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          <a href={aboutHref} className="hover:text-ink">
            {t.nav.about}
          </a>
          <a href={priceHref} className="hover:text-ink">
            {t.nav.price}
          </a>
          <a href={prepHref} className="hover:text-ink">
            {t.nav.prep}
          </a>
          <a href={reviewsHref} className="hover:text-ink">
            {t.nav.reviews}
          </a>
          <a href={contactHref} className="hover:text-ink">
            {t.nav.contact}
          </a>
          <Link to={`/${lang}/faq`} className="hover:text-ink">
            {t.nav.faq}
          </Link>
        </nav>

        <div className="flex flex-1 justify-center md:hidden">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-clay px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-olive-900 transition hover:bg-clay-light"
          >
            {t.nav.bookShort}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LangSwitch lang={lang} />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-clay px-4 py-2 text-center text-sm font-medium text-olive-900 transition hover:bg-clay-light md:inline-block"
          >
            {t.nav.book}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-olive-100 px-5 py-3 text-sm text-ink-soft md:hidden">
          <a href={aboutHref} className="rounded-lg px-2 py-2 hover:bg-olive-100/50" onClick={() => setMenuOpen(false)}>
            {t.nav.about}
          </a>
          <a href={priceHref} className="rounded-lg px-2 py-2 hover:bg-olive-100/50" onClick={() => setMenuOpen(false)}>
            {t.nav.price}
          </a>
          <a href={prepHref} className="rounded-lg px-2 py-2 hover:bg-olive-100/50" onClick={() => setMenuOpen(false)}>
            {t.nav.prep}
          </a>
          <a
            href={reviewsHref}
            className="rounded-lg px-2 py-2 hover:bg-olive-100/50"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.reviews}
          </a>
          <a
            href={contactHref}
            className="rounded-lg px-2 py-2 hover:bg-olive-100/50"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.contact}
          </a>
          <Link
            to={`/${lang}/faq`}
            className="rounded-lg px-2 py-2 hover:bg-olive-100/50"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.faq}
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-clay px-4 py-2 text-center font-medium text-olive-900 transition hover:bg-clay-light"
          >
            {t.nav.book}
          </a>
        </nav>
      )}
    </header>
  );
}

function LangSwitch({ lang }) {
  const otherLang = lang === "en" ? "ru" : "en";
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <LangLink code="en" active={lang === "en"} />
      <span className="text-olive-100">|</span>
      <LangLink code="ru" active={lang === "ru"} />
      <span className="sr-only">Switch to {otherLang}</span>
    </div>
  );
}

function LangLink({ code, active }) {
  const location = useLocation();
  const restOfPath = location.pathname.replace(/^\/(en|ru)/, "");
  return (
    <Link
      to={`/${code}${restOfPath}`}
      className={active ? "text-ink" : "text-ink-soft/60 hover:text-ink-soft"}
    >
      {code.toUpperCase()}
    </Link>
  );
}
