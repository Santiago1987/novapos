import type { Langs } from 'src/types/constTypes';
import traductions from './traductions';

// Function to get the translation for a given key and language
const t = (key?: string, lang?: keyof typeof Langs): string => {
  const defaultLang = 'EN' as keyof typeof Langs;
  const resolvedLang = lang ?? defaultLang;
  key = key ?? 'default';

  type TranslationMap = Record<string, Record<keyof typeof Langs, string>>;
  const tr = traductions as unknown as TranslationMap;

  return tr[key]?.[resolvedLang] ?? tr['default']?.[resolvedLang] ?? '';
};

export default t;
