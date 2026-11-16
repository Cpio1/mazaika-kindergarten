import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { nunito } from "@/lib/fonts";
import { getDictionary, isLocale, LANG_STORAGE_KEY, localePath, locales } from "@/lib/i18n";
import { resolveSiteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#fbf6ec",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  const base = resolveSiteUrl();
  return {
    metadataBase: base,
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    alternates: base
      ? {
          canonical: localePath(lang),
          languages: { kk: localePath("kk"), ru: localePath("ru"), "x-default": localePath("kk") },
        }
      : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "kk" ? "kk_KZ" : "ru_RU",
      ...(base ? { url: localePath(lang) } : {}),
    },
    formatDetection: { telephone: false },
  };
}

/** Повторный визит: если раньше выбран русский язык, «/» открывает русскую версию. */
const restoreLanguageScript = `try{if(location.pathname==="/"&&localStorage.getItem(${JSON.stringify(
  LANG_STORAGE_KEY,
)})==="ru"){location.replace("/ru"+location.search+location.hash)}}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={nunito.variable} style={{ colorScheme: "only light" }}>
      <head>
        {lang === "kk" && <script dangerouslySetInnerHTML={{ __html: restoreLanguageScript }} />}
      </head>
      <body>{children}</body>
    </html>
  );
}
