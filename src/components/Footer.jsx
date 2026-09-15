import { useLanguage } from "../i18n/LanguageContext";
import { SITE_NAME } from "../config";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-900 text-cream">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center text-xs text-olive-100/70 sm:px-8">
        <p>{SITE_NAME}</p>
        <p className="mt-1">
          © {year} {SITE_NAME}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
