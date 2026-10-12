import { ar } from "./ar";
import { en } from "./en";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale, IconName, PillarIcon } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

/** Unknown or missing values fall back to English. */
export function dictionaryFor(locale: unknown): Dictionary {
  return locale === "ar" ? ar : en;
}
