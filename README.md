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

Подключено: `public/media/gallery/main-page.jpeg` — первый экран, `main-page2.jpeg` — «О садике»,
`image1.jpeg`, `image2.jpeg`, `image3.jpeg` — галерея. Для фото доступны `position` (кадрирование),
`positionDesktop` (отдельно для ноутбука) и `thumb: "tall" | "wide"` (форма миниатюры; по умолчанию — по пропорциям).

## Требует подтверждения заказчика

- `site.instagramUrl` — передано «ma.zaika_ almaty», вероятно `@ma.zaika_almaty`; ссылка скрыта до подтверждения.
- `site.map.twoGisUrl` — ссылка на карточку в 2ГИС; пока открывается поиск по адресу.
- `site.whatsapp` — номер WhatsApp, если есть.
- `site.siteUrl` — публичный домен (для canonical и hreflang).
- Логотип (пока название выводится текстом).

## Команды

```bash
npm install
npm run dev        # разработка
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production-сборка
npm start          # запуск собранной версии
```
