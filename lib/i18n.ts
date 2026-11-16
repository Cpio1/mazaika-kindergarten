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
    headline: "Күн бойы бес мезгіл тамақ",
    text: "MaZaika-да күніне бес мезгіл тамақтану қарастырылған. Мәзірді алдын ала білгіңіз келсе немесе балаңыздың тамақтану ерекшеліктерін талқылағыңыз келсе, балабақшаға келмес бұрын хабарласыңыз.",
    menuLink: "Мәзірді нақтылау",
    menuLinkAria: `Мәзірді нақтылау үшін қоңырау шалу: ${site.phone.display}`,
  },
  activities: {
    title: "Қосымша сабақтар",
    speechTitle: "Логопедпен сабақтар",
    speechText: "Балабақшада логопедпен сабақтар бар. Бұл бағыт сөйлеу тілін және дыбыстарды дұрыс айтуды дамытуға арналған. Сабақтардың қалай өтетінін және баланың сөйлеуіне қатысты қандай сұрақтарды маманмен талқылауға болатынын ата-аналар нақтылай алады.",
    danceTitle: "Хореография",
    danceText: "Хореография балаларды музыкамен қимылдаумен, ырғақпен және қимыл үйлесімділігімен таныстырады. Балаңыз билегенді ұнатса, оның жасына арналған сабақтардың қалай ұйымдастырылғанын балабақшадан нақтылаңыз.",
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
    intro: "Балабақшаның ресми құжаттары мен материалдары.",
    folder: "Құжаттар қалтасын ашу",
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
    headline: "Пять приёмов пищи в течение дня",
    text: "В MaZaika предусмотрено пятиразовое питание. Если вам важно заранее узнать меню или обсудить особенности питания ребёнка, свяжитесь с садиком до посещения.",
    menuLink: "Уточнить меню",
    menuLinkAria: `Позвонить, чтобы уточнить меню: ${site.phone.display}`,
  },
  activities: {
    title: "Дополнительные занятия",
    speechTitle: "Занятия с логопедом",
    speechText: "В садике есть занятия с логопедом. Это направление связано с развитием речи и произношения. Родители могут уточнить, как проходят занятия и какие вопросы о речи ребёнка можно обсудить со специалистом.",
    danceTitle: "Хореография",
    danceText: "Хореография знакомит детей с движением под музыку, ритмом и координацией. Если ребёнок любит танцевать, уточните в садике, как организованы занятия для его возраста.",
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
    intro: "Официальные документы и материалы садика.",
    folder: "Открыть папку с документами",
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
