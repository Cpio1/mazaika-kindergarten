"use client";

import { LANG_STORAGE_KEY, localePath, type Locale } from "@/lib/i18n";
import { currentSectionId } from "./scroll";

const options: { locale: Locale; short: string; name: string }[] = [
  { locale: "kk", short: "ҚАЗ", name: "Қазақша" },
  { locale: "ru", short: "РУС", name: "Русский" },
];

export function LangSwitch({ locale }: { locale: Locale }) {
  const onSwitch = (e: React.MouseEvent<HTMLAnchorElement>, next: Locale) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* хранилище недоступно — язык просто не запомнится */
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const id = currentSectionId();
    window.location.assign(localePath(next) + (id ? `#${id}` : ""));
  };

  return (
    <div className="flex items-center rounded-full border-2 border-ink/15 bg-paper text-ink">
      {options.map((o) =>
        o.locale === locale ? (
          <span
            key={o.locale}
            lang={o.locale}
            aria-current="true"
            title={o.name}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink px-2.5 text-sm font-extrabold text-milk"
          >
            <span aria-hidden="true">{o.short}</span>
            <span className="sr-only">{o.name}</span>
          </span>
        ) : (
          <a
            key={o.locale}
            href={localePath(o.locale)}
            hrefLang={o.locale}
            lang={o.locale}
            title={o.name}
            onClick={(e) => onSwitch(e, o.locale)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2.5 text-sm font-extrabold text-ink transition-colors duration-200 hover:bg-sun-soft"
          >
            <span aria-hidden="true">{o.short}</span>
            <span className="sr-only">{o.name}</span>
          </a>
        ),
      )}
    </div>
  );
}
