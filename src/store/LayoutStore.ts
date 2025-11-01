import { devtools, persist } from 'zustand/middleware';
import { type LayoutState, type LayoutStoreState } from '../types/layoutStore';
import { create } from 'zustand';
import type { Layout } from 'src/types/ui.types';
import { produce } from 'immer';

const blanckLayout: Layout = {
  background: '#ffffff',
  lang: 'EN',
  size: {
    height: 'h-full',
    width: 'w-full',
  },
  components: {},
  editorMenu: {
    position: {
      x: 0,
      y: 0,
    },
  },
};

const initialVariables: LayoutState = {
  isEditing: false,
  layout: blanckLayout,
  selectedComponentId: null,
  globals: {
    colorPickerVisible: false,
    textEditorVisible: false,
    resizeStarted: false,
    gridSize: 5,
  },
};

const updateLayout = (
  set: (
    partial:
      | Partial<LayoutStoreState>
      | ((state: LayoutStoreState) => Partial<LayoutStoreState>)
  ) => void,
  updater: (draft: LayoutStoreState) => void
) => {
  set(produce(updater));
};

export const useLayoutStore = create<LayoutStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialVariables,
        toggleEditing: () => {
          const { isEditing } = get();

          set({ isEditing: !isEditing });
        },
        layoutActions: {
          setLang: (lang) => {
            updateLayout(set, (state) => {
              state.layout.lang = lang;
            });
          },
          editLayoutBackground: (background) => {
            updateLayout(set, (state) => {
              state.layout.background = background;
            });
          },
        },
        componentActions: {
          addComponent: (id, button) => {
            updateLayout(set, (state) => {
              state.layout.components[id] = button;
            });
          },
          updateButton: (id, properties) => {
            updateLayout(set, (state) => {
              const button = state.layout.components[id];
              if (button) {
                button.properties = { ...button.properties, ...properties };
              }
            });
          },
          updateTable: (id, properties) => {
            updateLayout(set, (state) => {
              const table = state.layout.components[id];
              if (table) {
                table.properties = { ...table.properties, ...properties };
              }
            });
          },
          deleteComponent: (id) => {
            updateLayout(set, (state) => {
              delete state.layout.components[id];
            });
          },
          modifyComponentDimensions: (id, width, height) => {
            updateLayout(set, (state) => {
              const component = state.layout.components[id];
              if (component) {
                component.properties.size = { width, height };
              }
            });
          },
        },
        editorActions: {
          toggleEditing: () => {
            updateLayout(set, (state) => {
              state.isEditing = !state.isEditing;
            });
          },
          selectComponent: (id) => {
            updateLayout(set, (state) => {
              if (!id) {
                state.globals.colorPickerVisible = false;
                state.globals.textEditorVisible = false;
                state.globals.resizeStarted = false;
              }
              state.selectedComponentId = id;
            });
          },
          modifyEditorPosition: (x: number, y: number) => {
            updateLayout(set, (state) => {
              state.layout.editorMenu.position = { x, y };
            });
          },
        },
        globalsActions: {
          setGlobal: (key, value) => {
            updateLayout(set, (state) => {
              state.globals[key] = value;
            });
          },
          setToggleGlobal: (key, value) => {
            updateLayout(set, (draft) => {
              draft.globals.colorPickerVisible = false;
              draft.globals.textEditorVisible = false;
              draft.globals.resizeStarted = false;
              draft.globals[key] = value;
            });
          },
        },

        reset: () => {
          set({ ...initialVariables });
        },
      }),
      { name: 'layout-store' }
    )
  )
);
