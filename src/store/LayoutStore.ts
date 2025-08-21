import { devtools, persist } from 'zustand/middleware';
import { type LayoutState, type LayoutStoreState } from '../types/layoutStore';
import { create } from 'zustand';
import type { Layout } from '../types/types';

const blanckLayout: Layout = {
  background: '#fff',
  size: {
    high: 'h-full',
    width: 'w-full',
  },
  components: {
    buttons: [],
    tables: [],
  },
};

const initialVariables: LayoutState = {
  isEditing: false,
  layout: blanckLayout,
  selectedComponent: null,
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
        updateComponent: () => {},
        setComponents: () => {},
        selectComponent: () => {},
        deleteComponent: () => {},
      }),
      { name: 'layout-store' }
    )
  )
);
