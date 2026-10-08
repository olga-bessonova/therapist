import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { CALENDLY_URLS } from "../config";
import BookingTermsModal from "./BookingTermsModal";

const BookingContext = createContext(null);

// Every booking link opens the terms modal first; the modal then opens Calendly.
export function BookingProvider({ children }) {
  const { lang, t } = useLanguage();
  const [booking, setBooking] = useState(null);

  const openBooking = useCallback((next) => setBooking(next), []);
  const openFreeConsultation = useCallback(
    () => setBooking({ url: CALENDLY_URLS[lang], service: t.nav.bookShort }),
    [lang, t]
  );
  const close = useCallback(() => setBooking(null), []);

  const value = useMemo(
    () => ({ openBooking, openFreeConsultation }),
    [openBooking, openFreeConsultation]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      {booking && <BookingTermsModal booking={booking} onClose={close} />}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
