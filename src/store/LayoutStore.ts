import { devtools, persist } from 'zustand/middleware';
import { type LayoutState, type LayoutStoreState } from '../types/layoutStore';
import { create } from 'zustand';
import type { Layout } from '../types/types';

const blanckLayout: Layout = {
  background: '#ffffff',
  size: {
    high: 'h-full',
    width: 'w-full',
  },
  components: {
    buttons: [],
    tables: [],
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
  selectedComponent: {
    id: null,
    type: 'buttons',
  },
};

export const useLayoutStore = create<LayoutStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialVariables,
        toggleEditing: () => {
          const { isEditing } = get();
          console.log('Toggling editing mode:', isEditing);
          set({ isEditing: !isEditing });
          console.log('get:', get());
        },
        editLayoutBackground: (background) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          newLayout.background = background;
          set({ layout: newLayout });
        },
        addButton: (button) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          let { buttons } = newLayout.components;
          if (!buttons) buttons = [];
          buttons = [...buttons, button];
          newLayout.components.buttons = buttons;
          set({ layout: newLayout });
        },
        addTable: (table) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          let { tables } = newLayout.components;
          if (!tables) tables = [];
          tables = [...tables, table];
          newLayout.components.tables = tables;
          set({ layout: newLayout });
        },
        updateButton: (id, properties) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const buttonList = newLayaut.components.buttons;
          if (!buttonList || buttonList.length === 0) return;

          layout.components.buttons = buttonList.map((butt) =>
            butt.id === id
              ? { ...butt, properties: { ...butt.properties, ...properties } }
              : butt
          );

          set({ layout });
        },
        updateTable: (id, properties) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const tableList = newLayaut.components.tables;
          if (!tableList || tableList.length === 0) return;

          layout.components.tables = tableList.map((table) =>
            table.id === id
              ? { ...table, properties: { ...table.properties, ...properties } }
              : table
          );
        },
        selectComponent: (id, type) => {
          set({ selectedComponent: { id, type } });
        },
        deleteButton: (id) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const buttonList = newLayaut.components.buttons;
          if (!buttonList || buttonList.length === 0) return;

          const newbuttonList = buttonList.filter((butt) => butt.id !== id);
          layout.components.buttons = newbuttonList;

          set({ layout });
        },
        deleteTable: (id) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const tableList = newLayaut.components.tables;
          if (!tableList || tableList.length === 0) return;

          const newbuttonList = tableList.filter((table) => table.id !== id);
          layout.components.tables = newbuttonList;

          set({ layout });
        },
        reset: () => {
          set({ ...initialVariables });
        },
        modifyEditorPosition: (x: number, y: number) => {
          const { layout } = get();
          layout.editorMenu.position = { x, y };
          set({ layout });
        },
      }),
      { name: 'layout-store' }
    )
  )
);
