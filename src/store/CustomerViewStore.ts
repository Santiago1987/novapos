import { devtools } from 'zustand/middleware';
import type {
  CustomerViewStore,
  CustomerViewState,
} from '@/types/customerView';
import { create } from 'zustand';
import { produce } from 'immer';

const initialVariables: CustomerViewState = {
  lang: 'EN',
  manifest: {
    version: 0,
    images: [],
    video: {
      screensaver: [],
      carousel: [],
    },
  },
};

export const useCustomerViewStore = create<CustomerViewStore>()(
  devtools((set) => ({
    ...initialVariables,
    setLang(lang) {
      set(
        produce((state: CustomerViewState) => {
          state.lang = lang;
        })
      );
    },
    setManifest(value) {
      set(
        produce((state: CustomerViewState) => {
          state.manifest = value;
        })
      );
    },
  }))
);
