/** Прокрутка к секции с учётом scroll-padding-top и обновлением хеша. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  history.pushState(null, "", `#${id}`);
  target.scrollIntoView({ block: "start", behavior: reduce ? "instant" : "smooth" });
  const heading = target.querySelector<HTMLElement>("h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

/** id секции, которую сейчас читает пользователь (null — первый экран). */
export function currentSectionId(): string | null {
  const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
  const line = headerH + Math.min(window.innerHeight * 0.3, 240);
  let current: string | null = null;
  document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  });
  if (current === "hero") return null;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) {
    const all = document.querySelectorAll<HTMLElement>("main section[id]");
    return all.length ? all[all.length - 1].id : current;
  }
  return current;
}
