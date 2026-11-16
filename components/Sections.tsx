import Image from "next/image";
import type { CSSProperties } from "react";
import { documents, documentsFolderUrl } from "@/lib/documents";
import { getDictionary, type Locale } from "@/lib/i18n";
import { aboutMedia, heroPhoto, logo } from "@/lib/media";
import { mapUrl, site, whatsappUrl } from "@/lib/site";
import { ClockIcon, DocIcon, ExternalIcon, PhoneIcon, PinIcon } from "./icons";
import {
  CloudShape,
  DanceSteps,
  HeroSun,
  MapTrail,
  MosaicScene,
  PlateGrains,
  ShapeMark,
  SpeechPair,
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
        className="pointer-events-none absolute -right-40 -bottom-56 hidden size-[36rem] rounded-full bg-sun-soft/60 lg:block"
      />
      <div
        className={`${container} relative grid gap-8 pt-6 pb-10 sm:pt-8 md:pb-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pt-12 lg:pb-16`}
      >
        <div className="min-w-0 lg:max-w-[36rem]">
          <h1
            id="hero-title"
            className="text-[min(2.05rem,10.5vw)] leading-[1.08] font-extrabold tracking-tight [overflow-wrap:anywhere] text-ink min-[400px]:text-[min(2.35rem,10.5vw)] sm:text-5xl lg:text-[3.4rem] xl:text-[3.6rem]"
          >
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

        {heroPhoto ? (
          <div className="flex items-start justify-center gap-3 sm:gap-5 lg:justify-end">
            <HeroSun className="mt-2 h-auto w-20 shrink-0 sm:w-28 lg:mt-8 lg:w-28 xl:w-36" />
            <div className="relative aspect-[4/5] w-[min(14.5rem,58vw)] shrink-0 overflow-hidden rounded-t-full rounded-b-[1.75rem] border-[6px] border-paper bg-paper shadow-[0_20px_40px_-24px_rgb(29_34_48/0.45)] sm:w-[17rem] lg:aspect-[3/4] lg:w-[18rem] xl:w-[21rem]">
              <Image
                src={heroPhoto.src}
                alt={heroPhoto.alt[locale] || t.hero.photoAlt}
                fill
                preload
                sizes="(min-width: 1280px) 336px, (min-width: 1024px) 288px, (min-width: 640px) 272px, 232px"
                className="object-cover object-[var(--pos)] lg:object-[var(--pos-lg)]"
                style={
                  {
                    "--pos": heroPhoto.position ?? "50% 50%",
                    "--pos-lg": heroPhoto.positionDesktop ?? heroPhoto.position ?? "50% 50%",
                  } as CSSProperties
                }
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[17rem] min-[400px]:max-w-[19rem] sm:max-w-[22rem] lg:max-w-[30rem]">
            <MosaicScene className="h-auto w-full drop-shadow-[0_18px_30px_rgb(29_34_48/0.12)]" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── О садике и группах ───────────────────────── */

export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const unit = "block text-2xl leading-tight font-extrabold text-ink sm:text-[1.75rem]";
  const label = "block text-base font-semibold text-ink-soft";
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-clip border-y border-line bg-paper">
      <div
        className={`${container} grid gap-6 py-12 sm:gap-8 sm:py-14 lg:pt-16 lg:pb-18 ${aboutMedia ? "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14" : ""}`}
      >
        <div className="min-w-0">
          <h2 id="about-title" className={h2Class}>
            {t.about.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.about.lead}</p>

          {/* Одна композиция на общем фоне: круг, арка и речевое облако разного размера */}
          <ul
            className={`mt-6 grid gap-4 rounded-[2rem] bg-milk p-5 sm:gap-5 sm:p-7 lg:mt-8 ${aboutMedia ? "lg:max-w-xl" : "md:grid-cols-3 md:items-center md:rounded-[3rem]"}`}
          >
            <li className="flex items-center gap-4 sm:gap-5">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-teal text-[2rem] font-extrabold text-milk sm:size-20 sm:text-[2.5rem]">
                {site.groups}
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">
                <span className={unit}>{t.about.groupsUnit}</span>
                <span className={label}>{t.about.groupsLabel}</span>
              </span>
            </li>
            <li className={`flex items-center gap-4 sm:gap-5 ${aboutMedia ? "lg:ml-14" : ""}`}>
              <span className="flex h-16 w-[4.75rem] shrink-0 items-end justify-center rounded-t-full bg-apricot pb-2 text-xl font-extrabold whitespace-nowrap text-ink sm:h-20 sm:w-24 sm:pb-3 sm:text-2xl">
                {site.ageFrom}–{site.ageTo}
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">
                <span className={unit}>{t.about.ageUnit}</span>
                <span className={label}>{t.about.ageLabel}</span>
              </span>
            </li>
            <li className={`flex items-center gap-4 sm:gap-5 ${aboutMedia ? "lg:ml-6" : ""}`}>
              <span aria-hidden="true" className="relative flex h-[3.75rem] w-[4.75rem] shrink-0 items-center justify-center sm:h-[4.25rem] sm:w-[5.5rem]">
                <CloudShape className="absolute inset-0 size-full" />
                <span className="relative -mt-1.5 text-xl font-extrabold text-ink sm:text-2xl">Әә</span>
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">
                <span className={unit}>{t.about.langValue}</span>
                <span className={label}>{t.about.langLabel}</span>
              </span>
            </li>
          </ul>
        </div>

        {aboutMedia &&
          (aboutMedia.kind === "image" ? (
            <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-tl-[5rem] rounded-tr-[1.25rem] rounded-br-[5rem] rounded-bl-[1.25rem] bg-milk lg:aspect-[3/4] lg:w-[19rem] lg:max-w-none lg:rounded-tl-[7rem] lg:rounded-br-[7rem]">
              <Image
                src={aboutMedia.src}
                alt={aboutMedia.alt[locale]}
                fill
                sizes="(min-width: 1024px) 304px, (min-width: 448px) 448px, 92vw"
                className="object-cover"
                style={{ objectPosition: aboutMedia.position ?? "50% 50%" }}
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
              className="mx-auto h-auto max-h-[70svh] w-full max-w-md rounded-tl-[5rem] rounded-tr-[1.25rem] rounded-br-[5rem] rounded-bl-[1.25rem] bg-ink/5 object-contain lg:w-[19rem]"
            >
              <source src={aboutMedia.src} type={aboutMedia.type} />
            </video>
          ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Питание ───────────────────────── */

export function Food({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="food" aria-labelledby="food-title" className="relative overflow-clip bg-milk">
      <div className={`${container} flex items-center gap-4 py-12 sm:gap-8 sm:py-14 lg:gap-12 lg:py-16`}>
        <PlateGrains className="h-auto w-28 shrink-0 sm:w-44 lg:w-64" />
        <div className="min-w-0">
          <p className="text-base font-bold text-teal sm:text-lg">{t.food.title}</p>
          <h2
            id="food-title"
            className="mt-1 text-[min(2rem,8.5vw)] leading-[1.1] font-extrabold [overflow-wrap:anywhere] text-ink sm:text-5xl lg:text-[3.25rem]"
          >
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
    { title: t.activities.speechTitle, text: t.activities.speechText, Figure: SpeechPair },
    { title: t.activities.danceTitle, text: t.activities.danceText, Figure: DanceSteps },
  ];
  return (
    <section id="activities" aria-labelledby="activities-title" className="relative overflow-clip border-y border-line bg-paper">
      <div className={`${container} py-12 sm:py-14 lg:pt-16 lg:pb-18`}>
        <h2 id="activities-title" className={h2Class}>
          {t.activities.title}
        </h2>
        <ul className="mt-6 grid gap-5 sm:gap-6 md:mt-8 md:grid-cols-2 md:gap-10">
          {items.map(({ title, text, Figure }) => (
            <li key={title} className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Figure className="h-auto w-20 shrink-0 sm:w-28 lg:w-36" />
              <div className="min-w-[10rem] flex-1 [overflow-wrap:anywhere]">
                <h3 className="text-2xl font-extrabold text-ink lg:text-[1.9rem]">{title}</h3>
                <p className="mt-1 text-lg leading-relaxed text-ink-soft">{text}</p>
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
    <section id="contacts" aria-labelledby="contacts-title" className="relative bg-milk">
      <div className={`${container} grid items-end gap-8 py-12 sm:py-14 md:grid-cols-[minmax(0,1fr)_auto] lg:pt-16 lg:pb-18`}>
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

        <MapTrail className="pointer-events-none hidden h-auto w-56 md:block lg:mb-10 lg:w-64" />
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
