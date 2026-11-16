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
export const heroPhoto: Photo | null = null;

/** main-page2 — фото или видео для раздела «О садике». */
export const aboutMedia: AboutMedia | null = null;

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
export const gallery: Photo[] = [];
