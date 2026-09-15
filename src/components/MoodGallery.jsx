export const FAQ_IMAGES = [
  {
    src: "/images/11.jpg",
    alt: { en: "Hands giving Reiki over closed eyes", ru: "Руки проводят Рейки над закрытыми глазами" },
    position: "center 25%",
  },
  {
    src: "/images/2.jpg",
    alt: { en: "A woman holding a quartz crystal to her forehead", ru: "Женщина держит кварцевый кристалл у лба" },
    position: "center 35%",
  },
];

export default function MoodGallery({ lang, images = FAQ_IMAGES, className = "" }) {
  return (
    <div className={className}>
      {images.map((img) => (
        <div
          key={img.src}
          className="group relative aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 sm:w-40 lg:w-full"
        >
          <img
            src={img.src}
            alt={img.alt[lang]}
            style={{ objectPosition: img.position }}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}
