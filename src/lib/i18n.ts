import { en } from './dictionaries/en';
import { hi } from './dictionaries/hi';
import { mr } from './dictionaries/mr';

export type Locale = 'en' | 'hi' | 'mr';

export const dictionaries = {
  en,
  hi,
  mr,
};

export function getDictionary(locale: Locale = 'en') {
  return dictionaries[locale] || dictionaries.en;
}
