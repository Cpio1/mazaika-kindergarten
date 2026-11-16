"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { Photo } from "@/lib/media";
import { ChevronIcon, CloseIcon } from "./icons";

const MOBILE_INITIAL = 4;
const DESKTOP_INITIAL = 6;
const corners = ["rounded-[1.5rem]", "rounded-[1.5rem] rounded-tr-[5rem]", "rounded-[1.5rem] rounded-bl-[5rem]"];

function gridCols(n: number) {
  const mobile = n === 1 ? "grid-cols-1" : "grid-cols-2";
  const desktop =
    n === 1 ? "max-w-2xl" : n === 2 ? "md:grid-cols-2 lg:max-w-5xl" : n === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return `${mobile} ${desktop}`;
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
        <h2 id="gallery-title" className="text-[min(1.9rem,9vw)] leading-tight font-extrabold [overflow-wrap:anywhere] text-ink sm:text-4xl lg:text-[2.75rem]">
          {t.gallery.title}
        </h2>

        <ul className={`mt-6 grid gap-3 sm:gap-4 ${n === 1 ? "" : "lg:max-w-5xl"} ${gridCols(n)}`}>
          {photos.map((p, i) => {
            const hidden =
              expanded || i < MOBILE_INITIAL ? "" : i < DESKTOP_INITIAL ? "hidden md:block" : "hidden";
            return (
              <li key={p.src} className={hidden}>
                <button
                  ref={(el) => {
                    thumbs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`${t.gallery.open(i + 1)}: ${p.alt[locale]}`}
                  className={`group relative block aspect-[4/3] w-full overflow-hidden bg-paper lg:aspect-[3/2] ${corners[i % corners.length]}`}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
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
        className="viewer viewer-enter"
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
