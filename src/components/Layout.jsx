import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { content, isValidLang, DEFAULT_LANG } from "../i18n";
import { LanguageContext } from "../i18n/LanguageContext";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingBookButton from "./FloatingBookButton";

export default function Layout() {
  const { lang } = useParams();
  const valid = isValidLang(lang);
  const t = valid ? content[lang] : content[DEFAULT_LANG];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

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
