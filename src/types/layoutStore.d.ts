import type { Layout, TableType, Button, Sales, Payments } from './types';

export type LayoutStoreState = LayoutState & Actions;

export interface LayoutState {
  isEditing: boolean;
  layout: Layout;
  selectedComponent: string | null;
}

export interface Actions {
  toggleEditing: () => void;
  addButton: (button: Button) => void;
  addTable: (table: TableType<Sales | Payments>) => void;
  updateComponent: (
    id: string,
    update: Partial<(Button | TableType<Sales | Payments>)['properties']>
  ) => void;
  setComponents: (components: Button | TableType<Sales | Payments>) => void;
  selectComponent: (id: string | null) => void;
  deleteComponent: (id: string) => void;
}
