import { Nunito } from "next/font/google";

/** Nunito: полная поддержка казахской кириллицы (подмножества cyrillic + cyrillic-ext). */
export const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: "variable",
  display: "swap",
  variable: "--font-nunito",
});
