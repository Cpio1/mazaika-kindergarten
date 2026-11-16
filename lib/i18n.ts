import { site } from "./site";

export const locales = ["kk", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "kk";
export type Localized = Record<Locale, string>;

export const LANG_STORAGE_KEY = "mazaika-lang";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Путь главной страницы для языка: казахская версия открывается по «/». */
export function localePath(locale: Locale): string {
  return locale === "kk" ? "/" : "/ru";
}

const age = `${site.ageFrom}–${site.ageTo}`;

const kk = {
  htmlLang: "kk",
  meta: {
    title: "MaZaika балабақшасы — Алматы, Мамыр-4",
    description: `Алматыдағы Мамыр-4 шағынауданындағы MaZaika балабақшасы: ${age} жастағы балаларға арналған ${site.groups} топ, қазақ тілінде оқыту, күніне 5 рет тамақтану, логопед және хореография. Жұмыс уақыты ${site.hours}.`,
  },
  skipLink: "Негізгі мазмұнға өту",
  homeLabel: "MaZaika балабақшасы — беттің басына",
  nav: {
    label: "Негізгі мәзір",
    about: "Біз туралы",
    food: "Тамақтану",
    activities: "Қосымша сабақтар",
    gallery: "Галерея",
    documents: "Құжаттар",
    contacts: "Байланыс",
  },
  menu: { open: "Мәзірді ашу", close: "Мәзірді жабу", title: "Мәзір" },
  lang: { label: "Сайт тілі", current: "Қазақша", other: "Орысша" },
  call: "Қоңырау шалу",
  callAria: `Қоңырау шалу: ${site.phone.display}`,
  hero: {
    title: "MaZaika балабақшасы",
    lead: "Алматыдағы Мамыр-4 шағынауданында 2–6 жастағы балаларға арналған балабақша. Тәрбие мен оқыту қазақ тілінде жүргізіледі.",
    factsLabel: "Қысқаша",
    age: `${age} жас`,
    ageLabel: "Балалардың жасы",
    language: "Қазақ тілінде",
    languageLabel: "Оқыту тілі",
    hoursLabel: "Жұмыс уақыты",
    address: "Мекенжай",
    photoAlt: "MaZaika балабақшасы",
  },
  about: {
    title: "Біз туралы",
    lead: `Балабақшада ${site.groups} топ бар. Топтарға ${site.ageFrom} жастан ${site.ageTo} жасқа дейінгі балалар барады, тәрбие мен оқыту қазақ тілінде жүргізіледі.`,
    groupsUnit: "топ",
    groupsLabel: "балабақшада",
    ageUnit: "жас",
    ageLabel: "балалардың жасы",
    langValue: "Қазақ тілі",
    langLabel: "оқыту тілі",
  },
  food: {
    title: "Тамақтану",
    headline: "Күніне 5 рет тамақтану",
    text: "Балалар балабақшада күніне бес рет тамақтанады.",
  },
  activities: {
    title: "Қосымша сабақтар",
    speechTitle: "Логопед",
    speechText: "Сөйлеу тілін дамытуға арналған сабақтар.",
    danceTitle: "Хореография",
    danceText: "Музыка, ырғақ және қимыл.",
  },
  gallery: {
    title: "Галерея",
    showMore: "Тағы көрсету",
    showLess: "Жасыру",
    open: (n: number) => `${n}-фотосуретті үлкейтіп ашу`,
    viewer: "Фотосуретті қарау",
    close: "Жабу",
    prev: "Алдыңғы фото",
    next: "Келесі фото",
    counter: (i: number, n: number) => `${i} / ${n}`,
    counterAria: (i: number, n: number) => `${n} фотосуреттің ${i}-сі`,
  },
  documents: {
    title: "Құжаттар",
    folder: "Құжаттар қалтасын ашу",
  },
  contacts: {
    title: "Байланыс",
    lead: "Сұрақтарыңыз болса, қоңырау шалыңыз.",
    phone: "Телефон",
    hours: "Жұмыс уақыты",
    address: "Мекенжай",
    map: "Картадан ашу",
    mapHint: "2ГИС-те ашылады",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
  },
  footer: {
    name: "MaZaika балабақшасы",
  },
  notFound: {
    title: "Бет табылмады",
    back: "Басты бетке оралу",
  },
};

export type Dictionary = typeof kk;

const ru: Dictionary = {
  htmlLang: "ru",
  meta: {
    title: "Детский сад MaZaika — Алматы, Мамыр-4",
    description: `Детский сад MaZaika в микрорайоне Мамыр-4, Алматы: ${site.groups} группы для детей ${age} лет, обучение на казахском языке, пятиразовое питание, логопед и хореография. Часы работы ${site.hours}.`,
  },
  skipLink: "Перейти к основному содержанию",
  homeLabel: "Детский сад MaZaika — в начало страницы",
  nav: {
    label: "Основное меню",
    about: "О садике",
    food: "Питание",
    activities: "Занятия",
    gallery: "Галерея",
    documents: "Документы",
    contacts: "Контакты",
  },
  menu: { open: "Открыть меню", close: "Закрыть меню", title: "Меню" },
  lang: { label: "Язык сайта", current: "Русский", other: "Казахский" },
  call: "Позвонить",
  callAria: `Позвонить: ${site.phone.display}`,
  hero: {
    title: "Детский сад MaZaika",
    lead: "Детский сад для детей 2–6 лет в микрорайоне Мамыр-4 в Алматы. Воспитание и обучение ведутся на казахском языке.",
    factsLabel: "Коротко",
    age: `${age} лет`,
    ageLabel: "Возраст детей",
    language: "На казахском",
    languageLabel: "Язык обучения",
    hoursLabel: "Часы работы",
    address: "Адрес",
    photoAlt: "Детский сад MaZaika",
  },
  about: {
    title: "О садике",
    lead: `В садике ${site.groups} группы для детей от ${site.ageFrom} до ${site.ageTo} лет. Воспитание и обучение ведутся на казахском языке.`,
    groupsUnit: "группы",
    groupsLabel: "в садике",
    ageUnit: "лет",
    ageLabel: "возраст детей",
    langValue: "Казахский язык",
    langLabel: "язык обучения",
  },
  food: {
    title: "Питание",
    headline: "Пятиразовое питание",
    text: "В садике дети питаются пять раз в день.",
  },
  activities: {
    title: "Дополнительные занятия",
    speechTitle: "Логопед",
    speechText: "Занятия по развитию речи.",
    danceTitle: "Хореография",
    danceText: "Музыка, ритм и движение.",
  },
  gallery: {
    title: "Галерея",
    showMore: "Показать ещё",
    showLess: "Свернуть",
    open: (n: number) => `Открыть фото ${n} целиком`,
    viewer: "Просмотр фотографии",
    close: "Закрыть",
    prev: "Предыдущее фото",
    next: "Следующее фото",
    counter: (i: number, n: number) => `${i} / ${n}`,
    counterAria: (i: number, n: number) => `Фото ${i} из ${n}`,
  },
  documents: {
    title: "Документы",
    folder: "Открыть папку с документами",
  },
  contacts: {
    title: "Контакты",
    lead: "Если остались вопросы, позвоните нам.",
    phone: "Телефон",
    hours: "Часы работы",
    address: "Адрес",
    map: "Открыть на карте",
    mapHint: "Откроется в 2ГИС",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
  },
  footer: {
    name: "Детский сад MaZaika",
  },
  notFound: {
    title: "Страница не найдена",
    back: "Вернуться на главную",
  },
};

const dictionaries: Record<Locale, Dictionary> = { kk, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
