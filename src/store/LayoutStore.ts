import { devtools, persist } from 'zustand/middleware';
import { type LayoutState, type LayoutStoreState } from '@/types/layoutStore.d';
import { create } from 'zustand';
import type { Layout, SalesTable } from '@/types/ui.types';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const idtable = uuidv4();

const tableExample = {
  id: idtable,
  type: 'TABLE',
  tableType: 'sales',
  properties: {
    size: { width: '100%', height: 'auto' },
    position: { x: 50, y: 100 },
    backgroundColor: '#f9fafb',
    header: {
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
    },
    rows: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      fontSize: '13px',
      fontFamily: '',
      hoverColor: '#f3f4f6',
    },
    border: {
      color: '#e5e7eb',
      width: '1px',
    },
  },
  columns: [
    {
      key: 'QTY',
      title: 'Cantidad',
      visible: true,
      order: 0,
      width: '20%',
      textColor: '#1f2937',
      fontSize: '13px',
      align: 'center',
    },
    {
      key: 'DESCR',
      title: 'Descripción',
      visible: true,
      order: 1,
      width: '40%',
      textColor: '#374151',
      fontSize: '13px',
      align: 'left',
    },
    {
      key: 'UNPR',
      title: 'Precio Unit.',
      visible: true,
      order: 2,
      width: '20%',
      textColor: '#374151',
      fontSize: '13px',
      align: 'right',
    },
    {
      key: 'VALUE',
      title: 'Total',
      visible: true,
      order: 3,
      width: '20%',
      textColor: '#10b981',
      fontSize: '13px',
      fontWeight: '600',
      align: 'right',
    },
  ],
} as SalesTable;

const blanckLayout: Layout = {
  background: '#ffffff',
  lang: 'EN',
  size: {
    height: 'h-full',
    width: 'w-full',
  },
  components: {
    [idtable]: tableExample,
  },
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
);
