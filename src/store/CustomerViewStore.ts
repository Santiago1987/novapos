import { devtools } from 'zustand/middleware';
import type {
  CustomerViewStore,
  CustomerViewState,
} from '@/types/customerViewStore';
import { create } from 'zustand';
import { produce } from 'immer';
import type { Layout } from '@/types/ui.types';

const initialLayout: Layout = {
  lang: 'EN',
  size: { width: '1920px', height: '1080px' },
  background: '#ffffff',
  components: {},
  editorMenu: {
    position: { x: 0, y: 0 },
  },
};

const initialVariables: CustomerViewState = {
  isEditing: true,
  layout: initialLayout,
  selectedComponentId: null,
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
    layoutActions: {
      setLang(lang) {
        set(
          produce((state: CustomerViewState) => {
            state.layout.lang = lang;
          })
        );
      },
      selectComponent(id) {
        set(
          produce((state: CustomerViewState) => {
            state.selectedComponentId = id;
          })
        );
      },
      editLayoutBackground(background) {
        set(
          produce((state: CustomerViewState) => {
            state.layout.background = background;
          })
        );
      },
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
