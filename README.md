# MaZaika — лендинг детского сада

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Статический сайт, готов к публикации на Vercel.

- `/` — казахская версия (по умолчанию), `/ru` — русская. Выбор языка запоминается в `localStorage`.
- Всегда светлая тема (`color-scheme: only light`).

## Где менять данные

| Что | Файл |
| --- | --- |
| Телефон, часы, адрес, юр. название, 2ГИС, Instagram, WhatsApp, домен | `lib/site.ts` |
| Тексты интерфейса и метаданные (ҚАЗ / РУС) | `lib/i18n.ts` |
| Фото первого экрана, main-page2, логотип, галерея | `lib/media.ts` + файлы в `public/media/` |
| Документы и ссылка на папку | `lib/documents.ts` + файлы в `public/media/documents/` |

Пустая галерея и пустой список документов скрываются вместе с пунктами меню.
Пути к файлам указываются с точным регистром и расширением.

## Требует подтверждения заказчика

- `site.instagramUrl` — передано «ma.zaika_ almaty», вероятно `@ma.zaika_almaty`; ссылка скрыта до подтверждения.
- `site.map.twoGisUrl` — ссылка на карточку в 2ГИС; пока открывается поиск по адресу.
- `site.whatsapp` — номер WhatsApp, если есть.
- `site.siteUrl` — публичный домен (для canonical и hreflang).
- Фотографии (main-page, main-page2, галерея) и логотип.

## Команды

```bash
npm install
npm run dev        # разработка
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production-сборка
npm start          # запуск собранной версии
```
