import { en } from "./content.en";
import { ru } from "./content.ru";

export const LANGS = ["en", "ru"];
export const DEFAULT_LANG = "en";

export const content = { en, ru };

export function isValidLang(lang) {
  return LANGS.includes(lang);
}
