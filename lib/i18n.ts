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
    activities: "Үйірмелер",
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
    /** Порядок частей заголовка: название MaZaika крупно, слово «балабақшасы» — ниже. */
    titleParts: { before: "", brand: "MaZaika", after: "балабақшасы" },
    lead: [
      "MaZaika — Алматыдағы Мамыр-4 шағынауданында орналасқан балабақша.",
      `Мұнда ${site.ageFrom} жастан ${site.ageTo} жасқа дейінгі балалар қазақ тілінде тәрбиеленіп, білім алады.`,
      "Балабақшада үш топ, күніне бес мезгіл тамақтану, логопед және хореография сабақтары бар.",
    ],
    hoursLabel: "Жұмыс уақыты",
    route: "Қалай жетуге болады",
    photoAlt: "MaZaika балабақшасы",
  },
  about: {
    title: "Біз туралы",
    subtitle: "MaZaika кімге қолайлы",
    text: [
      `MaZaika-да ${site.ageFrom} жастан ${site.ageTo} жасқа дейінгі балаларға арналған үш топ жұмыс істейді. Барлық топта тәрбие мен оқыту қазақ тілінде жүргізіледі.`,
      "Балаңыз қай топқа бара алатынын және онда орын бар-жоғын білу үшін балабақшаға қоңырау шалып, баланың жасын айтыңыз.",
    ],
    callLink: "Топ туралы сұрау",
    groupsCaption: "топ",
    ageValue: `${age}`,
    ageUnit: "жас",
    langWord: "Қазақша",
    langCaption: "тәрбие мен оқыту тілі",
    illustrationLabel: `Үш топ, ${site.ageFrom}–${site.ageTo} жастағы балалар, оқыту тілі — қазақ тілі`,
  },
  food: {
    title: "Тамақтану",
    headline: "Күніне бес рет",
    text: "Бүгінгі ас мәзірін білгіңіз келе ме? Балаңыздың тамақтануына қатысты сұрақтарыңыз болса, бізге қоңырау шалыңыз.",
    menuLink: "Мәзірді нақтылау",
    menuLinkAria: `Мәзірді нақтылау: ${site.phone.display}`,
  },
  activities: {
    title: "Үйірмелер",
    speechTitle: "Логопед",
    speechText: "Логопед сабақтарында балалардың сөйлеуіне және дыбыстарды дұрыс айтуына көңіл бөлінеді.",
    danceTitle: "Хореография",
    danceText: "Хореография сабақтарында балалар музыка ырғағын сезінуді, әуенге сай қимылдауды және қимылдарын үйлестіруді үйренеді.",
  },
  gallery: {
    title: "Галерея",
    intro: "MaZaika-ға фотосуреттер арқылы көз салыңыз. Суретті толық көру үшін оны басыңыз.",
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
    empty: "Құжаттар жақында жарияланады",
    open: "Құжаттарды ашу",
    opens: "жаңа терезеде ашылады",
  },
  contacts: {
    title: "Бізді қалай табуға болады",
    phone: "Телефон",
    hours: "Жұмыс уақыты",
    address: "Мекенжай",
    note: "Телефон арқылы бос орындардың бар-жоғын біліп, сабақтар туралы сұрақ қойып, балабақшаға қашан келу ыңғайлы екенін нақтылай аласыз.",
    map: "2ГИС-те ашу",
    mapAria: "Мекенжайды 2ГИС картасынан ашу (жаңа терезеде)",
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
    activities: "Кружки",
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
    titleParts: { before: "Детский сад", brand: "MaZaika", after: "" },
    lead: [
      "MaZaika — детский сад в микрорайоне Мамыр-4 в Алматы.",
      `Здесь дети от ${site.ageFrom} до ${site.ageTo} лет воспитываются и учатся на казахском языке.`,
      "В садике три группы, пятиразовое питание и дополнительные занятия с логопедом и по хореографии.",
    ],
    hoursLabel: "Часы работы",
    route: "Как добраться",
    photoAlt: "Детский сад MaZaika",
  },
  about: {
    title: "О садике",
    subtitle: "Кому подойдёт MaZaika",
    text: [
      `В MaZaika работают три группы для детей от ${site.ageFrom} до ${site.ageTo} лет. Язык воспитания и обучения во всех группах — казахский.`,
      "Чтобы узнать, в какую группу может пойти ваш ребёнок и есть ли в ней место, позвоните в садик и назовите возраст ребёнка.",
    ],
    callLink: "Спросить о группе",
    groupsCaption: "группы",
    ageValue: `${age}`,
    ageUnit: "лет",
    langWord: "Қазақша",
    langCaption: "язык воспитания и обучения",
    illustrationLabel: `Три группы, дети ${site.ageFrom}–${site.ageTo} лет, язык обучения — казахский`,
  },
  food: {
    title: "Питание",
    headline: "Пять раз в день",
    text: "Хотите узнать, что сегодня в меню, или обсудить особенности питания вашего ребёнка? Позвоните нам в MaZaika.",
    menuLink: "Уточнить меню",
    menuLinkAria: `Уточнить меню: ${site.phone.display}`,
  },
  activities: {
    title: "Кружки",
    speechTitle: "Логопед",
    speechText: "На занятиях с логопедом внимание уделяется развитию речи и произношению звуков.",
    danceTitle: "Хореография",
    danceText: "На занятиях по хореографии дети учатся двигаться под музыку, чувствовать ритм и координировать движения.",
  },
  gallery: {
    title: "Галерея",
    intro: "Загляните в MaZaika через фотографии садика. Нажмите на снимок, чтобы рассмотреть его целиком.",
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
    empty: "Документы скоро появятся",
    open: "Открыть документы",
    opens: "откроется в новом окне",
  },
  contacts: {
    title: "Как нас найти",
    phone: "Телефон",
    hours: "Часы работы",
    address: "Адрес",
    note: "По телефону можно уточнить наличие мест, задать вопросы о занятиях и узнать, когда удобно посетить садик.",
    map: "Открыть в 2ГИС",
    mapAria: "Открыть адрес на карте 2ГИС (в новом окне)",
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
