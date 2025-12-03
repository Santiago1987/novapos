import type { Langs } from './constTypes';

export type CustomerViewStore = CustomerViewState & Actions;

export interface CustomerViewState {
  lang: keyof typeof Langs;
  manifest: CVFileManifest;
}

export interface CVFileManifest {
  version: number;
  images: string[];
  video: {
    screensaver: string[];
    carousel: string[];
  };
}

export interface SWFileResponse extends CVFileManifest {
  updateAvailable: boolean;
}

export interface Actions {
  setLang: (lang: keyof typeof Langs) => void;
  setManifest: (value: CVFileManifest) => void;
}
