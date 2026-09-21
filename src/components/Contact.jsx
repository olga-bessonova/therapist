import { Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { TelegramIcon, WhatsAppIcon, YouTubeIcon } from "./BrandIcons";
import {
  ADDRESS,
  CALENDLY_URLS,
  PHONE,
  PHONE_HREF,
  TELEGRAM_URL,
  WHATSAPP_URL,
  YOUTUBE_URL,
} from "../config";

export default function Contact() {
  const { lang, t } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-20 bg-olive-900 pt-16 text-cream sm:pt-20">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-display text-xl font-medium sm:text-2xl">{t.contact.cta}</h2>
        <a
          href={CALENDLY_URLS[lang]}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-sm font-medium text-olive-900 transition hover:bg-clay-light"
        >
          {t.contact.book}
        </a>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm text-olive-100 sm:mt-16">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cream"
          >
            <TelegramIcon className="h-5 w-5" />
          </a>

          <Divider />

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.whatsapp}
            className="hover:text-cream"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          <Divider />

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.youtube}
            className="hover:text-cream"
          >
            <YouTubeIcon className="h-5 w-5" />
          </a>

          <Divider />

          <a href={`tel:${PHONE_HREF}`} className="flex items-center gap-2 hover:text-cream">
            <Phone className="h-4 w-4" />
            {PHONE}
          </a>

          <Divider />

          <span>{ADDRESS}</span>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <span className="hidden text-olive-100/30 sm:inline">|</span>;
}
