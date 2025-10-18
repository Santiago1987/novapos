import type { Langs } from 'src/types/constTypes';
export type TranslationMap = Record<
  string,
  Partial<Record<keyof typeof Langs, string>>
>;

type langstypes = keyof typeof Langs;

export type TraductionsStoreState = {
  traductionsList: TranslationMap;
  t: (key?: string, lang?: keyof typeof Langs) => string;
  updateTraduction: (id: string, text: string, lang: langstypes) => void;
  removeTraduction: (id: string) => void;
};
