import { useLanguage } from "../i18n/LanguageContext";
import { SITE_NAME, CALENDLY_URL } from "../config";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-900 text-cream">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-14 text-center sm:px-8 sm:pt-10">
        <h2 className="font-display text-xl font-medium sm:text-2xl">{t.footer.cta}</h2>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-sm font-medium text-olive-900 transition hover:bg-clay-light"
        >
          {t.footer.book}
        </a>

        <div className="mt-12 border-t border-cream/10 pt-6 text-xs text-olive-100/70">
          <p>{SITE_NAME}</p>
          <p className="mt-1">
            © {year} {SITE_NAME}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
