"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { Photo } from "@/lib/media";
import { ChevronIcon, CloseIcon } from "./icons";
import { ShapeMark, mosaicColors } from "./Mosaic";

const MOBILE_INITIAL = 4;
const DESKTOP_INITIAL = 6;
/** Форма миниатюры: из настройки thumb или по исходным пропорциям снимка. */
function shapeOf(p: Photo): "tall" | "wide" {
  return p.thumb ?? (p.width >= p.height ? "wide" : "tall");
}

/** Вертикальные кадры — арка на две строки, горизонтальные — широкая плитка с одним скруглённым углом. */
function tileClass(p: Photo, i: number, single: boolean) {
  const tall = shapeOf(p) === "tall";
  if (single) return tall ? "aspect-[3/4] max-w-sm rounded-t-full rounded-b-[1.5rem]" : "aspect-[4/3] max-w-2xl rounded-[1.5rem] rounded-tr-[5rem]";
  if (tall) return "h-full rounded-t-full rounded-b-[1.25rem]";
  return `h-full md:col-span-2 rounded-[1.25rem] ${i % 2 ? "rounded-bl-[4rem]" : "rounded-tr-[4rem]"}`;
}

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
    const first = window.matchMedia("(min-width: 768px)").matches ? DESKTOP_INITIAL : MOBILE_INITIAL;
    setExpanded(true);
    requestAnimationFrame(() => thumbs.current[first]?.focus({ preventScroll: true }));
  };

  const moreVisibility = n > DESKTOP_INITIAL ? "" : "md:hidden";
  const current = index !== null ? photos[index] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-milk">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h2 id="gallery-title" className="flex items-start gap-2 text-[min(1.9rem,9vw)] leading-tight font-extrabold [overflow-wrap:anywhere] text-ink sm:text-4xl lg:text-[2.75rem]">
          {t.gallery.title}
          <ShapeMark shape="petal" color={mosaicColors.apricot} className="mt-0.5 size-5 shrink-0 sm:size-6" />
        </h2>

        <ul
          className={
            n === 1
              ? "mt-6"
              : "mt-6 grid max-w-3xl grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-3 lg:auto-rows-[12.5rem]"
          }
        >
          {photos.map((p, i) => {
            const hidden =
              expanded || i < MOBILE_INITIAL ? "" : i < DESKTOP_INITIAL ? "hidden md:block" : "hidden";
            return (
              <li key={p.src} className={`${hidden} ${n > 1 && shapeOf(p) === "tall" ? "row-span-2" : ""} ${n > 1 && shapeOf(p) === "wide" ? "md:col-span-2" : ""}`}>
                <button
                  ref={(el) => {
                    thumbs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`${t.gallery.open(i + 1)}: ${p.alt[locale]}`}
                  className={`relative block w-full overflow-hidden bg-paper ${tileClass(p, i, n === 1)}`}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes={shapeOf(p) === "wide" ? "(min-width: 768px) 512px, 50vw" : "(min-width: 768px) 256px, 50vw"}
                    className="object-cover"
                    style={{ objectPosition: p.position ?? "50% 40%" }}
                  />
                </button>
              </li>
            );
          })}
        </ul>

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
