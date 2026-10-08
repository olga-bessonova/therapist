import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Video } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { reviews } from "../data/reviews";
import VideoLightbox from "./VideoLightbox";

const SCROLL_AMOUNT = 300;

// Accepts a bare video ID or a full YouTube URL (youtu.be/ID, watch?v=ID, embed/ID, shorts/ID).
function extractYoutubeId(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
    if (url.searchParams.has("v")) return url.searchParams.get("v");
    const pathMatch = url.pathname.match(/\/(?:embed|shorts)\/([\w-]+)/);
    if (pathMatch) return pathMatch[1];
    return "";
  } catch {
    return value.trim();
  }
}

export default function Reviews() {
  const { lang, t } = useLanguage();
  const trackRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // Scrollbar thumb: width and left offset as fractions of the bar.
  const [thumb, setThumb] = useState({ size: 1, offset: 0 });

  function scrollBy(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function updateEnds() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    setThumb({ size: el.clientWidth / el.scrollWidth, offset: el.scrollLeft / el.scrollWidth });
  }

  // Drag the thumb (or press anywhere on the bar) to scroll the carousel.
  function onBarPointerDown(e) {
    const el = trackRef.current;
    const bar = e.currentTarget;
    if (!el) return;
    const rect = bar.getBoundingClientRect();
    const thumbWidth = rect.width * (el.clientWidth / el.scrollWidth);
    const scrollTo = (clientX) => {
      const ratio = (clientX - rect.left - thumbWidth / 2) / (rect.width - thumbWidth);
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      el.scrollLeft = Math.max(0, Math.min(1, ratio)) * (el.scrollWidth - el.clientWidth);
    };
    const onMove = (ev) => scrollTo(ev.clientX);
    const onUp = () => {
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    scrollTo(e.clientX);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  useEffect(() => {
    updateEnds();
    window.addEventListener("resize", updateEnds);
    return () => window.removeEventListener("resize", updateEnds);
  }, []);

  return (
    <section id="reviews" className="scroll-mt-20 bg-cream pt-12 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            {t.reviews.heading}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">{t.reviews.intro}</p>
        </div>

        <div className="mt-8 hidden justify-center gap-3 sm:flex">
          <CarouselButton direction="left" disabled={atStart} onClick={() => scrollBy(-SCROLL_AMOUNT)} />
          <CarouselButton direction="right" disabled={atEnd} onClick={() => scrollBy(SCROLL_AMOUNT)} />
        </div>

        <div
          onPointerDown={onBarPointerDown}
          className="mt-6 cursor-pointer touch-none py-2 sm:mt-5"
          aria-hidden="true"
        >
          <div className="relative h-1 rounded-full bg-olive-100">
            <div
              className="absolute inset-y-0 rounded-full bg-olive-900"
              style={{ width: `${thumb.size * 100}%`, left: `${thumb.offset * 100}%` }}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateEnds}
          className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((item) => (
            <ReviewCard key={item.id} item={item} lang={lang} onPlay={setActiveVideo} />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoLightbox youtubeId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}

function ReviewCard({ item, lang, onPlay }) {
  const youtubeId = extractYoutubeId(item.youtubeId);
  const hasVideo = Boolean(youtubeId);
  const thumbnail =
    item.thumbnail || (hasVideo ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null);

  return (
    <div className="w-64 shrink-0 snap-start sm:w-72">
      <button
        type="button"
        onClick={() => onPlay(youtubeId)}
        disabled={!hasVideo}
        className={`group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-olive-700 ${
          hasVideo ? "cursor-pointer" : "cursor-default opacity-60"
        }`}
      >
        {thumbnail ? (
          <img src={thumbnail} alt={item.name[lang]} className="h-full w-full object-cover" />
        ) : (
          <Video className="h-8 w-8 text-olive-100" strokeWidth={1.5} />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        <span
          className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-olive-900 shadow-md transition ${
            hasVideo ? "group-hover:scale-110" : ""
          }`}
        >
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
        </span>
      </button>

      <h3 className="font-display mt-3 text-base font-medium text-ink">{item.name[lang]}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.quote[lang]}</p>
    </div>
  );
}

function CarouselButton({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-900 text-olive-900 transition hover:bg-olive-900 hover:text-cream disabled:pointer-events-none disabled:opacity-25"
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
