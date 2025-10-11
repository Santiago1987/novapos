import type {
  Layout,
  Table,
  Button,
  SalesTable,
  PaymentsTable,
  ComponentUnion,
} from './ui.types';

export type LayoutStoreState = LayoutState & Actions;

export interface LayoutState {
  isEditing: boolean;
  layout: Layout;
  selectedComponent: {
    id: string | null;
    type: ComponentUnion | null;
  };
}

export interface Actions {
  toggleEditing: () => void;
  addButton: (button: Button) => void;
  addTable: (table: Table<SalesTable | PaymentsTable>) => void;
  updateButton: (id: string, properties: Partial<Button['properties']>) => void;
  updateTable: (
    id: string,
    properties: Partial<Table<SalesTable | PaymentsTable>['properties']>
  ) => void;
  selectComponent: (id: string | null, type: ComponentUnion) => void;
  deleteComponent: (id: string) => void;
  editLayoutBackground: (background: string) => void;
  reset: () => void;
  modifyEditorPosition: (x: number, y: number) => void;
  modifyComponentDimensions: (
    id: string,
    width: string,
    height: string
  ) => void;
}
