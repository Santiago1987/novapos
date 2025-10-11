import { devtools, persist } from 'zustand/middleware';
import { type LayoutState, type LayoutStoreState } from '../types/layoutStore';
import { create } from 'zustand';
import type { Layout } from 'src/types/ui.types';

const blanckLayout: Layout = {
  background: '#ffffff',
  size: {
    height: 'h-full',
    width: 'w-full',
  },
  components: [],
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
    type: null,
  },
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
        editLayoutBackground: (background) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          newLayout.background = background;
          set({ layout: newLayout });
        },
        addButton: (button) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          let { components } = newLayout;
          if (!components) components = [];
          components = [...components, button];
          newLayout.components = components;
          set({ layout: newLayout });
        },
        addTable: (table) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          let { components } = newLayout;
          if (!components) components = [];
          components = [...components, table];
          newLayout.components = components;
          set({ layout: newLayout });
        },
        updateButton: (id, properties) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const { components } = newLayaut;
          layout.components = components.map((comp) =>
            comp.id === id
              ? { ...comp, properties: { ...comp.properties, ...properties } }
              : comp
          );
          set({ layout });
        },
        updateTable: (id, properties) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const { components } = newLayaut;

          layout.components = components.map((table) =>
            table.id === id
              ? { ...table, properties: { ...table.properties, ...properties } }
              : table
          );
        },
        selectComponent: (id, type) => {
          set({ selectedComponent: { id, type } });
        },
        deleteComponent: (id) => {
          const { layout } = get();
          const newLayaut = structuredClone(layout);
          const { components } = newLayaut;
          if (!components || components.length === 0) return;

          const newbuttonList = components.filter((comp) => comp.id !== id);
          layout.components = newbuttonList;
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
        modifyComponentDimensions: (
          id: string,
          width: string,
          height: string
        ) => {
          const { layout } = get();
          const newLayout = structuredClone(layout);
          const { components } = newLayout;
          const component = components.find((comp) => comp.id === id);
          if (!component) return;
          component.properties.size = { width, height };
          set({ layout: newLayout });
        },
      }),
      { name: 'layout-store' }
    )
  )
);
