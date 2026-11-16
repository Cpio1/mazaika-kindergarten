"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { logo } from "@/lib/media";
import { site } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { LangSwitch } from "./LangSwitch";
import { scrollToSection } from "./scroll";

/** Ширина, с которой помещается горизонтальное меню; зависит от числа пунктов. */
const desktopBreakpoint: Record<number, string> = { 4: "70rem", 5: "76rem", 6: "82rem" };

export type NavItem = { id: string; label: string };

export function SiteHeader({ locale, nav }: { locale: Locale; nav: NavItem[] }) {
  const t = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingTarget = useRef<string | null>(null);
  const size = Math.min(Math.max(nav.length, 4), 6);

  // Фактическая высота шапки → --header-h (scroll-padding-top для якорей).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--header-h", `${Math.round(el.getBoundingClientRect().height)}px`);
    };
    const footer = document.querySelector("body > footer");
    const applyFooter = () => {
      if (footer) document.documentElement.style.setProperty("--footer-h", `${Math.round(footer.getBoundingClientRect().height)}px`);
    };
    apply();
    applyFooter();
    const ro = new ResizeObserver(() => {
      apply();
      applyFooter();
    });
    ro.observe(el.firstElementChild as Element);
    if (footer) ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  // Ссылка с хешем при первой загрузке: уточняем позицию после загрузки шрифтов.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const startY = window.scrollY;
    document.fonts?.ready.then(() => {
      if (Math.abs(window.scrollY - startY) > 4) return;
      requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
    });
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  // Блокировка прокрутки, Escape и удержание фокуса внутри шапки при открытом меню.
  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.classList.remove("scroll-locked");
      const id = pendingTarget.current;
      if (id) {
        pendingTarget.current = null;
        requestAnimationFrame(() => scrollToSection(id));
      }
      return;
    }
    root.classList.add("scroll-locked");
    const header = headerRef.current;
    header?.querySelector<HTMLElement>("#mobile-menu a, #mobile-menu button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab" || !header) return;
      const items = Array.from(
        header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((n) => n.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia(`(min-width: ${desktopBreakpoint[size]})`);
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      root.classList.remove("scroll-locked");
    };
  }, [open, close, size]);

  const onHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0 });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  const onMenuLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    pendingTarget.current = id;
    setOpen(false);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-teal px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        {t.skipLink}
      </a>
      <header
        ref={headerRef}
        data-navsize={size}
        className="sticky top-0 z-40 border-b border-line bg-milk/95 text-ink backdrop-blur-sm"
      >
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 py-2 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:pl-6 sm:pr-5 nav:min-h-[76px] nav:flex-nowrap nav:gap-x-6 nav:px-8">
          <a
            href={localePath(locale)}
            onClick={onHomeClick}
            aria-label={t.homeLabel}
            className="-ml-1 inline-flex min-h-11 shrink-0 items-center rounded-xl px-1"
          >
            {logo ? (
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt=""
                preload
                className="h-10 w-auto object-contain nav:h-12"
              />
            ) : (
              <span className="text-[1.6rem] leading-none font-extrabold tracking-tight text-ink nav:text-[1.85rem]">
                Ma<span className="text-teal">Z</span>aika
              </span>
            )}
          </a>

          <nav aria-label={t.nav.label} className="hdr-desk flex-1 justify-center">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center rounded-full px-3.5 font-bold whitespace-nowrap text-ink transition-colors duration-200 hover:bg-sun-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 nav:gap-3">
            <LangSwitch locale={locale} />
            <a
              href={site.phone.href}
              aria-label={t.callAria}
              className="hdr-desk min-h-11 items-center gap-2 rounded-full bg-teal px-4 font-bold whitespace-nowrap text-white transition-colors duration-200 hover:bg-teal-dark"
            >
              <PhoneIcon className="size-[18px]" />
              {site.phone.display}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.menu.close : t.menu.open}
              onClick={() => (open ? close(false) : setOpen(true))}
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-ink/15 bg-paper text-ink transition-colors duration-200 hover:border-ink/40 hdr-mob"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-line bg-paper pb-[max(1.25rem,env(safe-area-inset-bottom))] text-ink shadow-[0_18px_30px_-20px_rgb(29_34_48/0.35)]"
          >
            <nav aria-label={t.nav.label} className="mx-auto max-w-7xl px-4 pt-2 sm:px-6">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.id} className="border-b border-line last:border-b-0">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => onMenuLink(e, item.id)}
                      className="flex min-h-14 items-center gap-3 text-lg font-bold text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className={`size-3 shrink-0 ${["rounded-full bg-turquoise", "rounded-t-full bg-apricot", "rounded-tr-full bg-sun", "rounded-full bg-lilac"][i % 4]}`}
                      />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={site.phone.href}
                aria-label={t.callAria}
                className="mt-3 flex min-h-13 items-center justify-center gap-2 rounded-full bg-teal px-5 text-lg font-bold text-white"
              >
                <PhoneIcon />
                {t.call}
              </a>
              <p className="mt-3 text-center text-ink-soft">
                {site.phone.display} · {site.hours}
              </p>
            </nav>
          </div>
        )}
      </header>
      {open && (
        <div
          aria-hidden="true"
          onClick={() => close(false)}
          className="fixed inset-0 z-30 bg-ink/25"
        />
      )}
    </>
  );
}
