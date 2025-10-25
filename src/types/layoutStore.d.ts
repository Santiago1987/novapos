import type {
  Layout,
  Table,
  Button,
  SalesTable,
  PaymentsTable,
} from './ui.types';
import type { Langs } from './constTypes';

export type LayoutStoreState = LayoutState & Actions;

export interface LayoutState {
  isEditing: boolean;
  layout: Layout;
  selectedComponentId: string | null;
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
  selectComponent: (id: string | null) => void;
  deleteComponent: (id: string) => void;
  editLayoutBackground: (background: string) => void;
  reset: () => void;
  modifyEditorPosition: (x: number, y: number) => void;
  modifyComponentDimensions: (
    id: string,
    width: string,
    height: string
  ) => void;
  setLang: (lang: keyof typeof Langs) => void;
}
