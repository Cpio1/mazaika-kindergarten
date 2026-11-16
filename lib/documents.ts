import type { Localized } from "./i18n";

/**
 * Документы детского сада. Раздел «Документы» и пункт меню появляются автоматически,
 * когда есть хотя бы один документ или ссылка на папку.
 * Файлы кладутся в public/media/documents/ либо указывается внешняя публичная ссылка.
 */

export type DocumentItem = {
  title: Localized;
  /** Например "/media/documents/license.pdf" или полная ссылка на файл. */
  href: string;
};

export const documents: DocumentItem[] = [];

/** Публичная ссылка на папку с документами (Google Drive и т. п.). */
export const documentsFolderUrl: string | null = null;

export const hasDocuments = documents.length > 0 || Boolean(documentsFolderUrl);
