//--------------------------------Traductions Store Types--------------------------------//
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

//--------------------------------Resize Store Types--------------------------------//
export type ResizeStoreState = {
  isResizing: boolean;
  resizeStarted: boolean;
  position: { x: number; y: number };
  dimensions: { width: string; height: string };
  text: string;
  setIsResizing: (value: boolean) => void;
  setResizeStarted: (value: boolean) => void;
  setPosition: (x: number, y: nmumber) => void;
  setDimensions: (width: string, height: string) => void;
  setText: (text: string) => void;
};
