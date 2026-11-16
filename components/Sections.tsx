import Image from "next/image";
import { documents, documentsFolderUrl } from "@/lib/documents";
import { getDictionary, type Locale } from "@/lib/i18n";
import { aboutMedia, heroPhoto, logo } from "@/lib/media";
import { mapUrl, site, whatsappUrl } from "@/lib/site";
import { ClockIcon, DocIcon, ExternalIcon, PhoneIcon, PinIcon } from "./icons";
import {
  HeroPhotoPieces,
  MosaicDance,
  MosaicHouseSmall,
  MosaicPlate,
  MosaicScene,
  MosaicSpeech,
  ShapeMark,
  mosaicColors as C,
} from "./Mosaic";

const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const h2Class = "text-[min(1.9rem,9vw)] leading-tight font-extrabold [overflow-wrap:anywhere] text-ink sm:text-4xl lg:text-[2.75rem]";
const btnPrimary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-teal px-6 text-lg font-bold text-white shadow-[0_6px_0_-1px_#075452] transition-[background-color,transform,box-shadow] duration-200 hover:bg-teal-dark active:translate-y-0.5 active:shadow-[0_3px_0_-1px_#075452]";
const btnSecondary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-teal bg-paper px-6 text-lg font-bold text-teal transition-colors duration-200 hover:bg-turquoise-soft";

function address(locale: Locale) {
  const a = site.address[locale];
  return `${a.city}, ${a.district}, ${a.street}`;
}

/* ───────────────────────── Первый экран ───────────────────────── */

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const facts = [
    { label: t.hero.ageLabel, value: t.hero.age, shape: "circle" as const, color: C.turquoise },
    { label: t.hero.languageLabel, value: t.hero.language, shape: "arch" as const, color: C.apricot },
    { label: t.hero.hoursLabel, value: site.hours, shape: "petal" as const, color: C.lilac },
  ];
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-clip bg-milk">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-40 size-[26rem] rounded-full bg-sun-soft/70 md:-right-16 md:-bottom-56 md:size-[40rem]"
      />
      <div
        aria-hidden="true"
        className="pegboard pointer-events-none absolute top-6 right-[38%] hidden h-40 w-56 opacity-80 md:block"
      />
      <div
        className={`${container} relative grid gap-7 pt-5 pb-10 sm:pt-8 md:pt-10 md:pb-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:pt-12 lg:pb-16`}
      >
        <div>
          <h1 id="hero-title" className="text-[min(2.05rem,10.5vw)] leading-[1.08] font-extrabold tracking-tight [overflow-wrap:anywhere] text-ink min-[400px]:text-[min(2.35rem,10.5vw)] sm:text-5xl lg:text-[3.6rem]">
            {t.hero.title}
          </h1>
          <p className="mt-3 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-soft sm:mt-4 sm:text-lg lg:text-xl">
            {t.hero.lead}
          </p>

          <dl className="mt-4 grid max-w-[34rem] gap-1.5 sm:mt-6 sm:grid-cols-3 sm:gap-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex min-w-0 flex-wrap items-baseline gap-x-2 sm:block sm:border-l-2 sm:border-line sm:pl-4 sm:first:border-l-0 sm:first:pl-0"
              >
                <dt className="flex shrink-0 items-center gap-1.5 text-[0.95rem] leading-tight font-semibold text-ink-soft sm:text-sm">
                  <ShapeMark shape={f.shape} color={f.color} className="size-3 shrink-0" />
                  <span>
                    {f.label}
                    <span className="sm:hidden" aria-hidden="true">:</span>
                  </span>
                </dt>
                <dd className="text-[1.05rem] leading-tight font-extrabold whitespace-nowrap text-ink sm:mt-1 sm:text-lg lg:text-xl">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-8">
            <a href={site.phone.href} aria-label={t.callAria} className={btnPrimary}>
              <PhoneIcon />
              {t.call}
            </a>
            <a href="#contacts" className={btnSecondary}>
              <PinIcon />
              {t.hero.address}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[17rem] min-[400px]:max-w-[19rem] sm:max-w-[22rem] lg:max-w-[33rem]">
          {heroPhoto ? (
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[6px] border-paper bg-paper shadow-[0_20px_40px_-24px_rgb(29_34_48/0.45)]">
                <Image
                  src={heroPhoto.src}
                  alt={heroPhoto.alt[locale] || t.hero.photoAlt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 42vw, 80vw"
                  className="object-cover"
                  style={{ objectPosition: heroPhoto.position ?? "50% 40%" }}
                />
              </div>
              <HeroPhotoPieces className="pointer-events-none absolute -top-6 -right-4 w-24 md:w-32" />
              <ShapeMark shape="quarter" color={C.lilac} className="pointer-events-none absolute -bottom-3 -left-3 size-12 md:size-16" />
            </div>
          ) : (
            <MosaicScene className="h-auto w-full drop-shadow-[0_18px_30px_rgb(29_34_48/0.12)]" />
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── О садике и группах ───────────────────────── */

export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const facts = [
    { value: t.about.groupsValue, label: t.about.groupsLabel, shape: "circle" as const, color: C.turquoise },
    { value: t.about.ageValue, label: t.about.ageLabel, shape: "arch" as const, color: C.apricot },
    { value: t.about.langValue, label: t.about.langLabel, shape: "petal" as const, color: C.lilac },
  ];
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-clip border-y border-line bg-paper">
      <div className={`${container} py-12 sm:py-14 lg:pt-16 lg:pb-18`}>
        <div className={aboutMedia ? "grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12" : ""}>
          <div>
            <h2 id="about-title" className={h2Class}>
              {t.about.title}
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.about.lead}</p>
            <ul className={`mt-7 grid gap-4 sm:gap-5 ${aboutMedia ? "" : "md:grid-cols-3 md:gap-8"}`}>
              {facts.map((f) => (
                <li key={f.label} className="flex items-center gap-4 md:items-start md:gap-5">
                  <ShapeMark shape={f.shape} color={f.color} className="size-11 shrink-0 md:mt-1 md:size-14" />
                  <span className="flex min-w-0 flex-1 flex-col [overflow-wrap:anywhere]">
                    <span className="text-[1.75rem] leading-tight font-extrabold text-ink sm:text-4xl lg:text-[2.6rem]">
                      {f.value}
                    </span>
                    <span className="text-base font-semibold text-ink-soft lg:text-lg">{f.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {aboutMedia && (
            <div className="relative mx-auto w-full max-w-xl">
              {aboutMedia.kind === "image" ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] rounded-tr-[7rem] bg-milk">
                  <Image
                    src={aboutMedia.src}
                    alt={aboutMedia.alt[locale]}
                    fill
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    className="object-cover"
                    style={{ objectPosition: aboutMedia.position ?? "50% 40%" }}
                  />
                </div>
              ) : (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={aboutMedia.poster}
                  width={aboutMedia.width}
                  height={aboutMedia.height}
                  aria-label={aboutMedia.label[locale]}
                  className="h-auto max-h-[70svh] w-full rounded-[2rem] rounded-tr-[7rem] bg-ink/5 object-contain"
                >
                  <source src={aboutMedia.src} type={aboutMedia.type} />
                </video>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Питание ───────────────────────── */

export function Food({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="food" aria-labelledby="food-title" className="relative overflow-clip bg-milk">
      <div className={`${container} flex items-center gap-5 py-12 sm:gap-8 sm:py-14 lg:gap-14 lg:py-16`}>
        <div className="relative w-28 shrink-0 sm:w-44 lg:w-60">
          <div aria-hidden="true" className="absolute inset-x-2 -top-3 bottom-4 rounded-t-full bg-sun-soft" />
          <MosaicPlate className="relative h-auto w-full" />
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold text-teal sm:text-lg">{t.food.title}</p>
          <h2 id="food-title" className={`${h2Class} mt-1`}>
            {t.food.headline}
          </h2>
          <p className="mt-2 text-lg leading-relaxed text-ink-soft">{t.food.text}</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Дополнительные занятия ───────────────────────── */

export function Activities({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = [
    {
      title: t.activities.speechTitle,
      text: t.activities.speechText,
      icon: <MosaicSpeech className="h-auto w-[78%]" />,
      shape: "rounded-full bg-lilac-soft",
    },
    {
      title: t.activities.danceTitle,
      text: t.activities.danceText,
      icon: <MosaicDance className="h-auto w-[78%]" />,
      shape: "rounded-t-full rounded-b-[1.75rem] bg-apricot-soft",
    },
  ];
  return (
    <section id="activities" aria-labelledby="activities-title" className="relative overflow-clip border-y border-line bg-paper">
      <div className={`${container} py-12 sm:py-14 lg:pt-16 lg:pb-18`}>
        <h2 id="activities-title" className={h2Class}>
          {t.activities.title}
        </h2>
        <ul className="mt-7 grid gap-5 md:grid-cols-2 md:gap-10">
          {items.map((it) => (
            <li key={it.title} className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div aria-hidden="true" className={`flex size-24 shrink-0 items-center justify-center sm:size-32 lg:size-36 ${it.shape}`}>
                {it.icon}
              </div>
              <div className="min-w-[12rem] flex-1 [overflow-wrap:anywhere]">
                <h3 className="text-2xl font-extrabold text-ink lg:text-[1.9rem]">{it.title}</h3>
                <p className="mt-1 text-lg leading-relaxed text-ink-soft">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── Документы ───────────────────────── */

export function Documents({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="documents" aria-labelledby="documents-title" className="relative bg-milk">
      <div className={`${container} py-12 sm:py-14 lg:pt-16`}>
        <h2 id="documents-title" className={h2Class}>
          {t.documents.title}
        </h2>
        {documents.length > 0 && (
          <ul className="mt-6 grid max-w-3xl gap-2">
            {documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-13 items-center gap-3 rounded-2xl border-2 border-line bg-paper px-4 py-2 text-lg font-bold text-ink transition-colors duration-200 hover:border-teal"
                >
                  <DocIcon className="size-6 shrink-0 text-teal" />
                  <span className="min-w-0 flex-1">{doc.title[locale]}</span>
                  <ExternalIcon className="size-4 shrink-0 text-ink-soft" />
                </a>
              </li>
            ))}
          </ul>
        )}
        {documentsFolderUrl && (
          <a href={documentsFolderUrl} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} mt-6`}>
            <DocIcon />
            {t.documents.folder}
            <ExternalIcon />
          </a>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Контакты ───────────────────────── */

export function Contacts({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const wa = whatsappUrl();
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-clip bg-milk">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-turquoise-soft/70 md:size-80"
      />
      <div className={`${container} relative grid items-start gap-8 py-12 sm:py-14 md:grid-cols-[1.4fr_0.6fr] lg:pt-16 lg:pb-18`}>
        <div className="min-w-0">
          <h2 id="contacts-title" className={h2Class}>
            {t.contacts.title}
          </h2>
          <p className="mt-3 text-lg text-ink-soft">{t.contacts.lead}</p>

          <dl className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-x-10">
            <div className="sm:col-span-2">
              <dt className="flex items-center gap-2 font-semibold text-ink-soft">
                <PhoneIcon className="size-4" />
                {t.contacts.phone}
              </dt>
              <dd className="mt-1">
                <a href={site.phone.href} className="inline-flex min-h-11 items-center text-[min(1.75rem,8.2vw)] leading-tight font-extrabold whitespace-nowrap text-ink underline decoration-sun decoration-4 underline-offset-[6px] sm:text-4xl">
                  {site.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-semibold text-ink-soft">
                <ClockIcon className="size-4" />
                {t.contacts.hours}
              </dt>
              <dd className="mt-1 text-xl font-bold text-ink">{site.hours}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-semibold text-ink-soft">
                <PinIcon className="size-4" />
                {t.contacts.address}
              </dt>
              <dd className="mt-1 text-xl leading-snug font-bold text-ink">
                <address className="not-italic">{address(locale)}</address>
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a href={site.phone.href} aria-label={t.callAria} className={btnPrimary}>
              <PhoneIcon />
              {t.call}
            </a>
            <a href={mapUrl()} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              <PinIcon />
              {t.contacts.map}
              <ExternalIcon />
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                {t.contacts.whatsapp}
                <ExternalIcon />
              </a>
            )}
            {site.instagramUrl && (
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                {t.contacts.instagram}
                <ExternalIcon />
              </a>
            )}
          </div>
          <p className="mt-3 text-sm text-ink-soft">{t.contacts.mapHint}</p>
        </div>

        <div aria-hidden="true" className="pointer-events-none hidden justify-center md:flex">
          <div className="relative w-full max-w-[18rem]">
            <div className="pegboard absolute inset-0 rounded-[2.5rem] bg-paper" />
            <MosaicHouseSmall className="relative h-auto w-full p-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Подвал ───────────────────────── */

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] text-ink">
      <div className={`${container} flex flex-col gap-6 py-9 md:flex-row md:items-end md:justify-between`}>
        <div>
          {logo ? (
            <Image src={logo.src} width={logo.width} height={logo.height} alt={site.name} className="h-12 w-auto object-contain" />
          ) : (
            <p className="text-2xl font-extrabold tracking-tight">
              Ma<span className="text-teal">Z</span>aika
            </p>
          )}
          <p className="mt-1 font-semibold text-ink-soft">{t.footer.name}</p>
          <p className="mt-3 text-sm text-ink-soft">
            © {new Date().getFullYear()} {site.legalName}
          </p>
        </div>
        <div className="text-ink-soft md:text-right">
          <p>{address(locale)}</p>
          <p className="mt-1">
            <a href={site.phone.href} className="inline-flex min-h-11 items-center font-bold text-ink underline decoration-sun decoration-2 underline-offset-4">
              {site.phone.display}
            </a>
            <span className="mx-2" aria-hidden="true">·</span>
            {site.hours}
          </p>
        </div>
      </div>
    </footer>
  );
}
