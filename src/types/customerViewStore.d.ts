import type { Langs } from './constTypes';
import type { Component, Layout } from './ui.types';

export type CustomerViewStore = CustomerViewState & Actions;

export interface CustomerViewState {
  isEditing: boolean;
  layout: Layout;
  manifest: CVFileManifest;
  selectedComponentId: string | null;
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
  setManifest: (value: CVFileManifest) => void;
  layoutActions: {
    setLang: (lang: keyof typeof Langs) => void;
    editLayoutBackground: (background: string) => void;
    editSize: (width: string, height: string) => void;
    selectComponent: (id: string | null) => void;
  };
  componentActions: {
    addComponent: (id: string, component: any) => void;
    edditComponent: (
      id: string,
      properties: Partial<Component<any>['properties']>
    ) => void;
    deleteComponent: (id: string) => void;
  };
}
