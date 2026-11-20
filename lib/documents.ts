import type { Localized } from "./i18n";

/**
 * Документы детского сада. Раздел «Документы» виден всегда: пока материалов нет,
 * в нём выводится сообщение «Құжаттар жақында жарияланады / Документы скоро появятся».
 * Кнопка «Құжаттарды ашу / Открыть документы» появляется, когда задана ссылка на папку.
 * Файлы кладутся в public/media/documents/ либо указывается внешняя публичная ссылка.
 */

export type DocumentItem = {
  title: Localized;
  /** Например "/media/documents/license.pdf" или полная ссылка на файл. */
  href: string;
  /** Одна строка о содержании документа — только если оно известно. */
  note?: Localized;
};

export const documents: DocumentItem[] = [];

/** Публичная ссылка на папку с документами (Google Drive и т. п.). */
export const documentsFolderUrl: string | null = "https://drive.google.com/drive/folders/1zSwWsp5ZpbIFY491KqBNsxzdVjYVtu9B";

