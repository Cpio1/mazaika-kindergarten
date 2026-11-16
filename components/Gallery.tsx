"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { Photo } from "@/lib/media";
import { ChevronIcon, CloseIcon } from "./icons";
import { ShapeMark, Wave, mosaicColors } from "./Mosaic";

const MOBILE_INITIAL = 4;
const DESKTOP_INITIAL = 6;
const DESKTOP_QUERY = "(min-width: 1024px)";

/** Форма кадра: из настройки thumb или по исходным пропорциям снимка. */
function shapeOf(p: Photo): "tall" | "wide" {
  return p.thumb ?? (p.width >= p.height ? "wide" : "tall");
}

/**
 * Раскладка кадра. Телефон: общая сетка в две колонки (вертикальный кадр — на две строки).
 * Ноутбук: разворот альбома — левая и правая страницы со своей сеткой.
 */
function tileLayout(p: Photo, aloneOnPage: boolean) {
  const tall = shapeOf(p) === "tall";
  const mobile = tall ? "row-span-2" : "";
  if (aloneOnPage) return `${mobile} lg:col-span-2 lg:row-span-2 lg:items-center`;
  return tall ? `${mobile} lg:row-span-2` : "lg:col-span-2 lg:row-span-1";
}

const corners = ["bg-teal", "bg-apricot-deep", "bg-lilac"];

export function Gallery({ locale, photos }: { locale: Locale; photos: Photo[] }) {
  const t = getDictionary(locale);
  const n = photos.length;
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastIndex = useRef(0);
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const wasOpen = useRef(false);

  const show = (i: number) => {
    lastIndex.current = i;
    setIndex(i);
  };
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + n) % n)), [n]);

  const closeViewer = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setIndex(null);
  }, []);

  // Открытие и закрытие модального просмотра; возврат фокуса к миниатюре без прокрутки страницы.
  const isOpen = index !== null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      root.classList.add("scroll-locked");
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    root.classList.remove("scroll-locked");
    const thumb = thumbs.current[lastIndex.current];
    if (thumb) requestAnimationFrame(() => thumb.focus({ preventScroll: true }));
  }, [isOpen]);

  useEffect(() => {
    if (index !== null) lastIndex.current = index;
  }, [index]);

  useEffect(() => () => document.documentElement.classList.remove("scroll-locked"), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (n < 2) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  const expand = () => {
    const first = window.matchMedia(DESKTOP_QUERY).matches ? DESKTOP_INITIAL : MOBILE_INITIAL;
    setExpanded(true);
    requestAnimationFrame(() => thumbs.current[first]?.focus({ preventScroll: true }));
  };

  const moreVisibility = n > DESKTOP_INITIAL ? "" : "lg:hidden";
  const current = index !== null ? photos[index] : null;
  const half = n > 1 ? Math.floor(n / 2) : 1;
  const pages = [photos.slice(0, half).map((p, k) => ({ p, i: k })), photos.slice(half).map((p, k) => ({ p, i: half + k }))].filter(
    (page) => page.length > 0,
  );

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-x-clip bg-lilac-soft">
      <Wave fill="#ece4f8" className="pointer-events-none absolute inset-x-0 bottom-full block h-5 w-full sm:h-8" />
      <div className="mx-auto w-full max-w-7xl px-4 pt-12 pb-14 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16 lg:pb-16">
        <h2 id="gallery-title" className="flex items-start gap-2 text-[min(1.9rem,9vw)] leading-tight font-extrabold [overflow-wrap:anywhere] text-ink sm:text-4xl lg:text-[2.75rem]">
          {t.gallery.title}
          <ShapeMark shape="petal" color={mosaicColors.apricot} className="mt-0.5 size-5 shrink-0 sm:size-6" />
        </h2>
        <p className="mt-3 max-w-4xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">{t.gallery.intro}</p>

        {/* Раскрытый фотоальбом: бумажные уголки у снимков, цветные закладки по краю */}
        <div className="relative mt-8 max-w-5xl rounded-[1.25rem] bg-paper p-3 shadow-[0_18px_36px_-26px_rgb(29_34_48/0.55)] sm:rounded-[1.75rem] sm:p-5 lg:p-8">
          <span aria-hidden="true" className="pointer-events-none absolute -top-5 right-8 h-7 w-4 bg-teal [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)] sm:right-14" />
          <span aria-hidden="true" className="pointer-events-none absolute -top-4 right-14 h-6 w-4 bg-sun [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)] sm:right-21" />
          <span aria-hidden="true" className="pointer-events-none absolute top-16 -right-2 h-4 w-3 rounded-r-sm bg-apricot sm:-right-3 sm:w-4" />
          {pages.length > 1 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-line to-transparent lg:block"
            />
          )}

          <div
            className={
              n === 1
                ? "mx-auto max-w-sm"
                : "grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-auto lg:gap-x-14"
            }
          >
            {pages.map((page, pi) => (
              <ul key={pi} className={n === 1 ? "" : "contents lg:grid lg:auto-rows-[11.5rem] lg:grid-cols-2 lg:content-start lg:gap-4"}>
                {page.map(({ p, i }) => {
                  const hidden = expanded || i < MOBILE_INITIAL ? "flex" : i < DESKTOP_INITIAL ? "hidden lg:flex" : "hidden";
                  const alone = page.length === 1 && n > 1;
                  const caption = p.caption?.[locale];
                  const corner = corners[i % corners.length];
                  return (
                    <li key={p.src} className={`${hidden} min-h-0 flex-col ${n === 1 ? "" : tileLayout(p, alone)}`}>
                      <button
                        ref={(el) => {
                          thumbs.current[i] = el;
                        }}
                        type="button"
                        onClick={() => show(i)}
                        aria-label={`${t.gallery.open(i + 1)}: ${p.alt[locale]}`}
                        className={`relative block min-h-0 w-full rounded-md bg-paper p-2 shadow-[0_6px_16px_-10px_rgb(29_34_48/0.55)] ring-1 ring-line sm:p-2.5 ${
                          n === 1 ? (shapeOf(p) === "tall" ? "aspect-[3/4]" : "aspect-[4/3]") : `flex-1 ${alone && shapeOf(p) === "tall" ? "lg:aspect-[3/4] lg:w-auto" : ""}`
                        }`}
                      >
                        <span className="relative block size-full overflow-hidden rounded-sm bg-milk">
                          <Image
                            src={p.src}
                            alt=""
                            fill
                            sizes={shapeOf(p) === "wide" ? "(min-width: 1024px) 460px, 50vw" : "(min-width: 1024px) 320px, 50vw"}
                            className="object-cover"
                            style={{ objectPosition: p.position ?? "50% 40%" }}
                          />
                        </span>
                        <span aria-hidden="true" className={`pointer-events-none absolute -top-1 -left-1 size-3 [clip-path:polygon(0_0,100%_0,0_100%)] sm:-top-1.5 sm:-left-1.5 sm:size-4 ${corner}`} />
                        <span aria-hidden="true" className={`pointer-events-none absolute -right-1 -bottom-1 size-3 [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:-right-1.5 sm:-bottom-1.5 sm:size-4 ${corner}`} />
                      </button>
                      {caption && <p className="mt-1.5 line-clamp-2 text-sm leading-snug font-semibold text-ink-soft sm:text-base">{caption}</p>}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        {!expanded && n > MOBILE_INITIAL && (
          <button
            type="button"
            onClick={expand}
            className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-teal bg-paper px-6 text-lg font-bold text-teal transition-colors duration-200 hover:bg-turquoise-soft ${moreVisibility}`}
          >
            {t.gallery.showMore}
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="viewer"
        aria-label={t.gallery.viewer}
        onCancel={(e) => {
          e.preventDefault();
          closeViewer();
        }}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
      >
        {current && index !== null && (
          <div className="flex h-full flex-col pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
            <div className="flex min-h-16 shrink-0 items-center justify-between gap-3 px-3 sm:px-5">
              <p className="min-w-0 truncate pl-1 font-semibold text-ink-soft">{current.alt[locale]}</p>
              <button
                type="button"
                autoFocus
                onClick={closeViewer}
                aria-label={t.gallery.close}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-milk transition-colors duration-200 hover:bg-teal"
              >
                <CloseIcon />
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 touch-pan-y select-none"
              onPointerDown={(e) => {
                swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
              }}
              onPointerUp={(e) => {
                const s = swipe.current;
                swipe.current = null;
                if (!s || s.id !== e.pointerId || n < 2) return;
                const dx = e.clientX - s.x;
                const dy = e.clientY - s.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
              }}
              onPointerCancel={() => {
                swipe.current = null;
              }}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt[locale]}
                fill
                sizes="100vw"
                draggable={false}
                className="object-contain px-2 sm:px-6"
              />
            </div>

            {n > 1 && (
              <div className="flex min-h-20 shrink-0 items-center justify-center gap-5 px-4 pb-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.gallery.prev}
                  className="inline-flex size-13 items-center justify-center rounded-full border-2 border-ink/20 bg-paper text-ink transition-colors duration-200 hover:border-ink"
                >
                  <ChevronIcon dir="left" />
                </button>
                <p aria-live="polite" className="min-w-16 text-center text-lg font-bold text-ink tabular-nums">
                  <span aria-hidden="true">{t.gallery.counter(index + 1, n)}</span>
                  <span className="sr-only">{t.gallery.counterAria(index + 1, n)}</span>
                </p>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.gallery.next}
                  className="inline-flex size-13 items-center justify-center rounded-full border-2 border-ink/20 bg-paper text-ink transition-colors duration-200 hover:border-ink"
                >
                  <ChevronIcon dir="right" />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
