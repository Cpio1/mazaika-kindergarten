import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { nunito } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 — MaZaika",
  robots: { index: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ec",
  colorScheme: "only light",
};

export default function GlobalNotFound() {
  return (
    <html lang="kk" className={nunito.variable} style={{ colorScheme: "only light" }}>
      <body>
        <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-4 px-6">
          <p className="text-5xl font-extrabold text-teal">404</p>
          <h1 className="text-2xl font-extrabold">
            Бет табылмады <span className="block text-lg font-semibold text-ink-soft" lang="ru">Страница не найдена</span>
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-full bg-teal px-5 font-bold text-white hover:bg-teal-dark">
              Басты бет
            </Link>
            <Link href="/ru" lang="ru" className="inline-flex min-h-11 items-center rounded-full border-2 border-teal bg-paper px-5 font-bold text-teal">
              Главная
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
