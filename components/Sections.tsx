import Image from "next/image";
import type { CSSProperties } from "react";
import { documents, documentsFolderUrl } from "@/lib/documents";
import { getDictionary, type Locale } from "@/lib/i18n";
import { aboutMedia, heroPhoto, logo } from "@/lib/media";
import { mapUrl, site, whatsappUrl } from "@/lib/site";
import { ClockIcon, DocIcon, ExternalIcon, PhoneIcon, PinIcon } from "./icons";
import { CloudBg, DanceRibbon, FolderOpen, HeroCluster, MapScene, MosaicScene, PlateGrains, SpeechPair, Wave, mosaicColors as C } from "./Mosaic";

const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
/** Верхний отступ секций с якорями согласован с --sec-pt в globals.css. */
const sectionPad = "pt-12 sm:pt-14 lg:pt-16";
const h2Class = "text-[min(1.9rem,9vw)] leading-tight font-extrabold [overflow-wrap:anywhere] text-ink sm:text-4xl lg:text-[2.75rem]";
const bodyText = "text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg";
const btnPrimary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-teal px-6 text-lg font-bold text-white shadow-[0_6px_0_-1px_#075452] transition-[background-color,transform,box-shadow] duration-200 hover:bg-teal-dark active:translate-y-0.5 active:shadow-[0_3px_0_-1px_#075452]";
const btnSecondary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-teal bg-paper px-6 text-lg font-bold text-teal transition-colors duration-200 hover:bg-turquoise-soft";
const textLink =
  "inline-flex min-h-11 items-center gap-2 font-bold text-teal underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-teal-dark";

/** Волна над секцией, нарисованная цветом этой секции. */
function TopWave({ fill }: { fill: string }) {
  return <Wave fill={fill} className="pointer-events-none absolute inset-x-0 bottom-full block h-5 w-full sm:h-8" />;
}

function address(locale: Locale) {
  const a = site.address[locale];
  return `${a.city}, ${a.district}, ${a.street}`;
}

/* ───────────────────────── Первый экран ───────────────────────── */

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { before, brand, after } = t.hero.titleParts;
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-x-clip bg-milk">
      <div
        className={`${container} relative grid gap-8 pt-6 pb-14 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pt-10 lg:pb-20`}
      >
        <div className="min-w-0 lg:max-w-[38rem]">
          <h1 id="hero-title" className="text-ink">
            {before && <span className="block text-xl font-extrabold text-teal sm:text-2xl">{before}</span>}{" "}
            <span className="block text-[min(3.6rem,16vw)] leading-[0.95] font-black tracking-tight sm:text-7xl lg:text-[5.5rem]">
              {brand.slice(0, 2)}
              <span className="text-teal">{brand.slice(2, 3)}</span>
              {brand.slice(3)}
            </span>{" "}
            {after && (
              <span className="mt-1 block text-[min(1.9rem,8.5vw)] leading-tight font-extrabold sm:text-4xl">{after}</span>
            )}
          </h1>
          <p className={`mt-4 max-w-[36rem] sm:mt-5 lg:text-xl ${bodyText}`}>{t.hero.lead.join(" ")}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-8">
            <a href={site.phone.href} aria-label={t.callAria} className={btnPrimary}>
              <PhoneIcon />
              {t.call}
            </a>
            <p className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sun-soft py-1.5 pr-5 pl-3.5 text-ink">
              <ClockIcon className="size-5 shrink-0 text-teal" />
              <span className="text-sm font-semibold text-ink-soft">{t.hero.hoursLabel}</span>
              <span className="text-lg font-extrabold whitespace-nowrap">{site.hours}</span>
            </p>
          </div>
          <a href="#contacts" className={`mt-3 ${textLink}`}>
            <PinIcon className="size-5" />
            {t.hero.route}
          </a>
        </div>

        {heroPhoto ? (
          <div className="flex items-end justify-center gap-3 sm:gap-5 lg:justify-end">
            <HeroCluster className="h-auto w-24 shrink-0 sm:w-32 xl:w-40" />
            <div className="relative aspect-[4/5] w-[min(14.5rem,56vw)] shrink-0 overflow-hidden rounded-t-full rounded-b-[1.75rem] border-[6px] border-paper bg-paper shadow-[0_20px_40px_-24px_rgb(29_34_48/0.45)] sm:w-[17rem] lg:aspect-[3/4] lg:w-[18rem] xl:w-[21rem]">
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

/** Единая иллюстрация: круглая деталь конструктора с цифрой 3, арка с возрастом, речевое облако «Қазақша». */
function GroupsIllustration({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const caption = "mt-1.5 block text-center text-sm leading-tight font-semibold text-ink-soft";
  const studs = [0, 60, 120, 180, 240, 300];
  return (
    <div role="img" aria-label={t.about.illustrationLabel} className="mt-8 flex max-w-[30rem] flex-wrap items-end gap-x-2.5 gap-y-4 sm:gap-x-5">
      <div className="flex w-20 flex-col items-center sm:w-28">
        <div className="relative flex size-20 items-center justify-center rounded-full bg-teal shadow-[inset_0_-6px_0_rgb(0_0_0/0.16)] [--r:1.95rem] sm:size-28 sm:[--r:2.75rem]">
          {studs.map((deg) => (
            <span
              key={deg}
              aria-hidden="true"
              className="absolute inset-0 m-auto size-2 rounded-full bg-milk/35 sm:size-2.5"
              style={{ transform: `rotate(${deg}deg) translateY(calc(-1 * var(--r)))` }}
            />
          ))}
          <span className="text-[2.75rem] leading-none font-black text-milk sm:text-6xl">{site.groups}</span>
        </div>
        <span className={caption}>{t.about.groupsCaption}</span>
      </div>

      <div className="flex h-[6.25rem] w-[5.5rem] flex-col items-center justify-end rounded-t-full bg-apricot pb-2.5 sm:h-32 sm:w-28 sm:pb-3.5">
        <span className="text-2xl leading-none font-black whitespace-nowrap text-ink sm:text-[2rem]">{t.about.ageValue}</span>
        <span className="mt-0.5 text-base font-extrabold text-ink sm:text-lg">{t.about.ageUnit}</span>
      </div>

      <div className="mb-3 flex w-32 flex-col items-center sm:mb-6 sm:w-40">
        <div className="relative flex h-[4.75rem] w-full items-center justify-center sm:h-24">
          <CloudBg className="absolute inset-0 size-full" />
          <span lang="kk" className="relative -mt-2 text-lg font-extrabold text-ink sm:text-xl">
            {t.about.langWord}
          </span>
        </div>
        <span className={caption}>{t.about.langCaption}</span>
      </div>
    </div>
  );
}

export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip bg-paper">
      <TopWave fill={C.board} />
      <div
        className={`${container} grid gap-8 pb-14 ${sectionPad} lg:pb-20 ${aboutMedia ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14" : ""}`}
      >
        <div className="min-w-0">
          <h2 id="about-title" className={h2Class}>
            {t.about.title}
          </h2>
          <h3 className="mt-2 text-xl font-extrabold text-teal sm:text-2xl">{t.about.subtitle}</h3>
          {t.about.text.map((para) => (
            <p key={para} className={`mt-3 max-w-2xl ${bodyText}`}>
              {para}
            </p>
          ))}
          <a href={site.phone.href} className={`mt-2 ${textLink}`}>
            <PhoneIcon className="size-5" />
            {t.about.callLink}: {site.phone.display}
          </a>
          <GroupsIllustration locale={locale} />
        </div>

        {aboutMedia &&
          (aboutMedia.kind === "image" ? (
            <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-tl-[5rem] rounded-tr-[1.25rem] rounded-br-[5rem] rounded-bl-[1.25rem] bg-milk lg:aspect-[4/5] lg:max-w-[22rem] lg:rounded-tl-[7rem] lg:rounded-br-[7rem]">
              <Image
                src={aboutMedia.src}
                alt={aboutMedia.alt[locale]}
                fill
                sizes="(min-width: 1024px) 352px, (min-width: 448px) 448px, 92vw"
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
              className="mx-auto h-auto max-h-[70svh] w-full max-w-md rounded-tl-[5rem] rounded-tr-[1.25rem] rounded-br-[5rem] rounded-bl-[1.25rem] bg-ink/5 object-contain lg:max-w-[22rem]"
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
    <section id="food" aria-labelledby="food-title" className="relative z-10 overflow-x-clip bg-sun-soft">
      <TopWave fill={C.sunSoft} />
      <Wave fill={C.sunSoft} flip className="pointer-events-none absolute inset-x-0 top-full block h-5 w-full sm:h-8" />
      <div
        className={`${container} grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 pb-12 ${sectionPad} sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16 lg:gap-y-3 lg:pb-16`}
      >
        <div className="col-start-2 row-start-1 min-w-0 lg:col-start-1 lg:self-end">
          <p className="text-base font-bold text-ink-soft sm:text-lg">{t.food.title}</p>
          <h2 id="food-title" className={`mt-1 ${h2Class}`}>
            {t.food.headline}
          </h2>
        </div>
        <div className="col-span-2 row-start-2 min-w-0 lg:col-span-1 lg:col-start-1 lg:self-start">
          <p className={`max-w-2xl ${bodyText} text-ink`}>{t.food.text}</p>
          <a href={site.phone.href} aria-label={t.food.menuLinkAria} className={`mt-2 ${textLink}`}>
            <PhoneIcon className="size-5" />
            {t.food.menuLink}
          </a>
        </div>
        <PlateGrains className="col-start-1 row-start-1 h-auto w-full lg:col-start-2 lg:row-span-2 lg:w-80 xl:w-96" />
      </div>
    </section>
  );
}

/* ───────────────────────── Дополнительные занятия ───────────────────────── */

export function Activities({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = [
    { title: t.activities.speechTitle, text: t.activities.speechText, Figure: SpeechPair, offset: "" },
    { title: t.activities.danceTitle, text: t.activities.danceText, Figure: DanceRibbon, offset: "lg:mt-12" },
  ];
  return (
    <section id="activities" aria-labelledby="activities-title" className="relative overflow-x-clip bg-milk">
      <div className={`${container} pb-14 ${sectionPad} lg:pb-20`}>
        <h2 id="activities-title" className={h2Class}>
          {t.activities.title}
        </h2>
        {/* Два направления в одной композиции: у каждого свой рисунок-силуэт, текст на спокойном фоне */}
        <ul className="mt-7 grid gap-8 sm:gap-10 lg:mt-10 lg:max-w-6xl lg:grid-cols-2 lg:gap-16">
          {items.map(({ title, text, Figure, offset }) => (
            <li key={title} className={`flex flex-wrap items-start gap-x-4 gap-y-2 sm:gap-x-6 ${offset}`}>
              <Figure className="h-auto w-20 shrink-0 sm:w-28 lg:w-36" />
              <div className="min-w-[11rem] flex-1 [overflow-wrap:anywhere] sm:pt-2">
                <h3 className="text-[1.6rem] leading-tight font-extrabold text-ink sm:text-[1.9rem]">{title}</h3>
                <p className={`mt-2 max-w-md ${bodyText}`}>{text}</p>
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
  const empty = documents.length === 0 && !documentsFolderUrl;
  return (
    <section id="documents" aria-labelledby="documents-title" className="relative overflow-x-clip bg-milk">
      <TopWave fill={C.milk} />
      <div className={`${container} pb-14 ${sectionPad} lg:pb-16`}>
        {/* Панель в форме папки: язычок сверху слева */}
        <div className="relative mt-5 max-w-5xl rounded-[1.75rem] rounded-tl-none bg-turquoise-soft px-5 pt-6 pb-7 sm:mt-6 sm:rounded-[2.5rem] sm:rounded-tl-none sm:px-10 sm:pt-8 sm:pb-10 lg:px-14">
          <span aria-hidden="true" className="pointer-events-none absolute bottom-full left-0 h-5 w-36 rounded-t-[1.25rem] bg-turquoise-soft sm:h-6 sm:w-52" />
          <div className="flex items-start gap-4 sm:gap-6">
            <h2 id="documents-title" className={h2Class}>
              {t.documents.title}
            </h2>
            <FolderOpen className="-mt-1 h-auto w-16 shrink-0 sm:-mt-2 sm:w-20 lg:w-24" />
          </div>

          {documents.length > 0 && (
            <ul className="mt-5 grid gap-x-12 gap-y-4 md:grid-cols-2">
              {documents.map((doc) => (
                <li key={doc.href}>
                  <a href={doc.href} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-start gap-3 text-lg font-bold text-ink">
                    <DocIcon className="mt-0.5 size-6 shrink-0 text-teal" />
                    <span className="underline decoration-sun decoration-2 underline-offset-4 group-hover:decoration-teal">
                      {doc.title[locale]}
                      <span className="sr-only"> ({t.documents.opens})</span>
                    </span>
                  </a>
                  {doc.note && <p className="mt-1 pl-9 text-base text-ink-soft">{doc.note[locale]}</p>}
                </li>
              ))}
            </ul>
          )}

          {documentsFolderUrl && (
            <a href={documentsFolderUrl} target="_blank" rel="noopener noreferrer" className={`mt-6 ${btnPrimary}`}>
              <DocIcon />
              {t.documents.open}
              <ExternalIcon />
              <span className="sr-only"> ({t.documents.opens})</span>
            </a>
          )}

          {empty && (
            <p className="mt-4 flex items-center gap-3 text-lg font-bold text-ink sm:mt-5 sm:text-xl">
              <ClockIcon className="size-6 shrink-0 text-teal" />
              {t.documents.empty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Контакты ───────────────────────── */

export function Contacts({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const wa = whatsappUrl();
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-x-clip bg-milk">
      <div
        className={`${container} grid gap-8 pb-14 ${sectionPad} lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:pb-18`}
      >
        <div className="min-w-0">
          <h2 id="contacts-title" className={h2Class}>
            {t.contacts.title}
          </h2>
          <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-ink-soft">
            <PinIcon className="size-4 shrink-0 translate-y-0.5" />
            {t.contacts.address}
          </p>
          <address className="mt-1 text-xl leading-snug font-extrabold text-ink not-italic sm:text-2xl">{address(locale)}</address>

          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <dt className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <ClockIcon className="size-4" />
                {t.contacts.hours}
              </dt>
              <dd className="mt-1 text-xl font-extrabold text-ink">{site.hours}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <PhoneIcon className="size-4" />
                {t.contacts.phone}
              </dt>
              <dd>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center text-xl font-extrabold whitespace-nowrap text-ink underline decoration-sun decoration-4 underline-offset-[6px]"
                >
                  {site.phone.display}
                </a>
              </dd>
            </div>
          </dl>

          <p className={`mt-4 max-w-xl ${bodyText}`}>{t.contacts.note}</p>

          <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a href={site.phone.href} aria-label={t.callAria} className={btnPrimary}>
              <PhoneIcon />
              {t.call}
            </a>
            <a href={mapUrl()} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              <PinIcon />
              {t.contacts.map}
              <ExternalIcon />
              <span className="sr-only"> ({t.documents.opens})</span>
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
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative aspect-[16/10] w-full max-w-lg overflow-hidden rounded-[1.75rem] rounded-tl-[5rem] border-2 border-line bg-paper lg:aspect-[4/3] lg:justify-self-end lg:rounded-tl-[7rem]"
        >
          <MapScene className="absolute inset-0 size-full" />
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
