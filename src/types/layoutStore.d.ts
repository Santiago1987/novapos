import type { Layout, TableType, Button, Sales, Payments } from './types';

export type LayoutStoreState = LayoutState & Actions;

export interface LayoutState {
  isEditing: boolean;
  layout: Layout;
  selectedComponent: {
    id: string | null;
    type: 'buttons' | 'tables';
  };
}

export interface Actions {
  toggleEditing: () => void;
  addButton: (button: Button) => void;
  addTable: (table: TableType<Sales | Payments>) => void;
  updateButton: (id: string, properties: Partial<Button['properties']>) => void;
  updateTable: (
    id: string,
    properties: Partial<TableType<Sales | Payments>['properties']>
  ) => void;
  selectComponent: (id: string | null, type: 'tables' | 'buttons') => void;
  deleteButton: (id: string) => void;
  deleteTable: (id: string) => void;
  editLayoutBackground: (background: string) => void;
  reset: () => void;
}
