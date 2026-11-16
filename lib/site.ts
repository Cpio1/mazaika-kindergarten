/**
 * Единый источник фактов о детском саде MaZaika.
 * Изменения здесь применяются к казахской и русской версиям сайта.
 * Публикуйте только сведения, подтверждённые заказчиком.
 */

export const site = {
  name: "MaZaika",
  /** Юридическое название в исходной записи заказчика. */
  legalName: "ТОО ASEM- A7",

  phone: {
    display: "+7 777 247 58 70",
    href: "tel:+77772475870",
  },

  /** Дни недели не переданы — выводятся только часы. */
  hours: "07:30–18:00",

  groups: 3,
  ageFrom: 2,
  ageTo: 6,

  address: {
    kk: {
      city: "Алматы қ.",
      district: "Әуезов ауданы",
      street: "Мамыр-4 шағынауданы, 144а үй",
    },
    ru: {
      city: "г. Алматы",
      district: "Ауэзовский район",
      street: "мкр. Мамыр-4, дом 144а",
    },
  },

  map: {
    /**
     * Прямая ссылка на карточку организации в 2ГИС.
     * Пока не подтверждена — используется поиск по полному адресу (searchQuery).
     */
    twoGisUrl: null as string | null,
    searchQuery: "Алматы, Ауэзовский район, микрорайон Мамыр-4, 144а",
  },

  /**
   * Instagram. Заказчик передал «ma.zaika_ almaty»; вероятный профиль — @ma.zaika_almaty.
   * Принадлежность профиля не подтверждена, поэтому ссылка не выводится.
   * После подтверждения укажите полный адрес, например "https://www.instagram.com/ma.zaika_almaty/".
   */
  instagramUrl: null as string | null,

  /** Номер WhatsApp в формате 77771234567. Выводится только после подтверждения. */
  whatsapp: null as string | null,

  /**
   * Публичный домен сайта, например "https://mazaika.kz".
   * Если не задан, на Vercel используется адрес production-деплоя.
   */
  siteUrl: null as string | null,
} as const;

export function mapUrl(): string {
  if (site.map.twoGisUrl) return site.map.twoGisUrl;
  return `https://2gis.kz/almaty/search/${encodeURIComponent(site.map.searchQuery)}`;
}

export function whatsappUrl(): string | null {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}` : null;
}

export function resolveSiteUrl(): URL | undefined {
  const raw =
    site.siteUrl ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null);
  return raw ? new URL(raw) : undefined;
}
