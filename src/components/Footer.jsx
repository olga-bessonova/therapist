import { useLanguage } from "../i18n/LanguageContext";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Globe } from "lucide-react";
import {
  SITE_NAME,
  DEVELOPER_NAME,
  DEVELOPER_SITE_URL,
  DEVELOPER_GITHUB_URL,
  DEVELOPER_LINKEDIN_URL,
} from "../config";

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

        <div className="mt-4 flex items-center justify-center gap-2 border-t border-cream/10 pt-4 text-olive-100/40">
          <span>{t.footer.developedBy}</span>
          <a
            href={DEVELOPER_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-olive-100/70 hover:text-cream"
          >
            {DEVELOPER_NAME}
          </a>
          <span className="text-olive-100/20">·</span>
          <a
            href={DEVELOPER_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-cream"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={DEVELOPER_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-cream"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={DEVELOPER_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="hover:text-cream"
          >
            <Globe className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
