import type { Localized } from "./i18n";

/**
 * Медиафайлы сайта. Файлы кладутся в public/media/, пути указываются от корня сайта
 * с точным регистром и расширением (production работает на регистрозависимой ФС).
 *
 * Пока заказчик не передал фотографии, поля пустые:
 * — без hero на первом экране выводится иллюстрация-мозаика;
 * — без about раздел «О садике» показывает только факты;
 * — пустая галерея скрывается вместе с пунктом меню;
 * — без logo название MaZaika выводится текстом.
 */

export type Photo = {
  /** Например "/media/gallery/01.jpg". */
  src: string;
  width: number;
  height: number;
  alt: Localized;
  /** object-position для миниатюры, например "50% 30%", чтобы лица оставались в кадре. */
  position?: string;
  /** Отдельное кадрирование для ноутбука и десктопа (от 1024px). По умолчанию — как position. */
  positionDesktop?: string;
  /**
   * Форма миниатюры в галерее: "tall" — вертикальная, "wide" — горизонтальная.
   * По умолчанию определяется по пропорциям снимка. В просмотре фото всегда показывается целиком.
   */
  thumb?: "tall" | "wide";
  /** Короткая подпись в галерее — только если по кадру понятно, что изображено. */
  caption?: Localized;
};

export type AboutMedia =
  | ({ kind: "image" } & Photo)
  | {
      kind: "video";
      /** Например "/media/main-page2.mp4". */
      src: string;
      type: "video/mp4" | "video/webm";
      width: number;
      height: number;
      poster?: string;
      label: Localized;
    };

export type Logo = { src: string; width: number; height: number };

/** main-page — главный визуал первого экрана, например { src: "/media/main-page.jpg", ... }. */
export const heroPhoto: Photo | null = {
  src: "/media/gallery/main-page.jpeg",
  width: 960,
  height: 1280,
  position: "50% 72%",
  positionDesktop: "50% 50%",
  alt: {
    kk: "MaZaika балабақшасының ғимараты мен ойын алаңы бар ауласы",
    ru: "Здание детского сада MaZaika и двор с качелями",
  },
};

/** main-page2 — фото или видео для раздела «О садике». */
export const aboutMedia: AboutMedia | null = {
  kind: "image",
  src: "/media/gallery/main-page2.jpeg",
  width: 960,
  height: 1280,
  position: "50% 45%",
  alt: {
    kk: "Түрлі-түсті жалаушалармен безендірілген балабақша ғимараты мен ауласы",
    ru: "Здание садика и двор, украшенный цветными флажками",
  },
};

/** logo — прозрачный PNG логотипа, например { src: "/media/logo.png", width: 512, height: 256 }. */
export const logo: Logo | null = null;

/**
 * Реальные фотографии MaZaika для галереи (без логотипа, иконок и главного фото).
 * Пример записи:
 * {
 *   src: "/media/gallery/01.jpg", width: 1600, height: 1200, position: "50% 35%",
 *   alt: { kk: "Топ бөлмесі", ru: "Групповая комната" },
 * },
 */
export const gallery: Photo[] = [
  {
    src: "/media/gallery/image3.jpeg",
    width: 960,
    height: 1280,
    thumb: "tall",
    position: "50% 40%",
    alt: {
      kk: "«Алтын күз» мерекесіне әуе шарларымен безендірілген зал",
      ru: "Зал, украшенный воздушными шарами к празднику «Алтын күз»",
    },
    caption: { kk: "«Алтын күз» мерекесіне арналған зал", ru: "Зал к празднику «Алтын күз»" },
  },
  {
    src: "/media/gallery/image1.jpeg",
    width: 900,
    height: 1600,
    thumb: "wide",
    position: "50% 60%",
    alt: {
      kk: "Балабақшадағы түскі ас: сорпа, екінші ас, салат, нан және шай",
      ru: "Обед в садике: суп, второе блюдо, салат, хлеб и чай",
    },
    caption: { kk: "Түскі ас", ru: "Обед" },
  },
  {
    src: "/media/gallery/image2.jpeg",
    width: 960,
    height: 1280,
    thumb: "wide",
    position: "50% 62%",
    alt: { kk: "Балабақша қоршауындағы MaZaika баннері", ru: "Баннер MaZaika на ограде садика" },
    caption: { kk: "Қоршаудағы баннер", ru: "Баннер на ограде" },
  },
];
