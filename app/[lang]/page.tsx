import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { About, Activities, Contacts, Documents, Food, Hero, SiteFooter } from "@/components/Sections";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { getDictionary, isLocale } from "@/lib/i18n";
import { gallery } from "@/lib/media";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const hasGallery = gallery.length > 0;

  const nav: NavItem[] = [
    { id: "about", label: t.nav.about },
    { id: "food", label: t.nav.food },
    { id: "activities", label: t.nav.activities },
    ...(hasGallery ? [{ id: "gallery", label: t.nav.gallery }] : []),
    { id: "documents", label: t.nav.documents },
    { id: "contacts", label: t.nav.contacts },
  ];

  return (
    <>
      <SiteHeader locale={lang} nav={nav} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero locale={lang} />
        <About locale={lang} />
        <Food locale={lang} />
        <Activities locale={lang} />
        {hasGallery && <Gallery locale={lang} photos={gallery} />}
        <Documents locale={lang} />
        <Contacts locale={lang} />
      </main>
      <SiteFooter locale={lang} />
    </>
  );
}
