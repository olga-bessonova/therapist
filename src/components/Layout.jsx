import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { content, isValidLang, DEFAULT_LANG, LANGS } from "../i18n";
import { LanguageContext } from "../i18n/LanguageContext";
import { SITE_URL } from "../config";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingBookButton from "./FloatingBookButton";

function upsertMeta(attr, value, contentValue) {
  let el = document.head.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", contentValue);
}

function upsertLink(rel, hreflang, href) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Layout() {
  const { lang } = useParams();
  const location = useLocation();
  const valid = isValidLang(lang);
  const t = valid ? content[lang] : content[DEFAULT_LANG];
  const isFaqPage = location.pathname.endsWith("/faq");

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;

    const page = isFaqPage ? "/faq" : "";
    const title = isFaqPage ? `${t.faq.heading} — ${t.meta.title}` : t.meta.title;
    const description = t.meta.description;
    const url = `${SITE_URL}/${lang}${page}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", t.meta.keywords);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", t.nav.name);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:locale", lang === "ru" ? "ru_RU" : "en_US");
    upsertMeta("property", "og:image", `${SITE_URL}/images/2636689f44d23e4e1decc9cc9cc4d048.jpg`);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", `${SITE_URL}/images/2636689f44d23e4e1decc9cc9cc4d048.jpg`);

    upsertLink("canonical", null, url);
    LANGS.forEach((code) => {
      upsertLink("alternate", code, `${SITE_URL}/${code}${page}`);
    });
    upsertLink("alternate", "x-default", `${SITE_URL}/${DEFAULT_LANG}${page}`);
  }, [t, lang, isFaqPage]);

  if (!valid) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      <div className="flex min-h-screen flex-col bg-cream">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingBookButton />
      </div>
    </LanguageContext.Provider>
  );
}
