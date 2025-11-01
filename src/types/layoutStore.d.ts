import type {
  Layout,
  Table,
  Button,
  SalesTable,
  PaymentsTable,
} from './ui.types';
import type { Langs } from './constTypes';

export type LayoutStoreState = LayoutState & Actions;

export type globalsToogleKeys =
  | 'colorPickerVisible'
  | 'textEditorVisible'
  | 'resizeStarted';

export interface globals extends globalsToogleKeys {
  [key: string]: boolean | number | string;
}

export interface LayoutState {
  isEditing: boolean;
  layout: Layout;
  selectedComponentId: string | null;
  globals: globals;
}

export interface Actions {
  reset: () => void;
  layoutActions: {
    setLang: (lang: keyof typeof Langs) => void;
    editLayoutBackground: (background: string) => void;
  };
  componentActions: {
    addComponent: (id: string, button: Button) => void;
    updateButton: (
      id: string,
      properties: Partial<Button['properties']>
    ) => void;
    updateTable: (
      id: string,
      properties: Partial<Table<SalesTable | PaymentsTable>['properties']>
    ) => void;
    deleteComponent: (id: string) => void;
    modifyComponentDimensions: (
      id: string,
      width: string,
      height: string
    ) => void;
  };
  editorActions: {
    toggleEditing: () => void;
    selectComponent: (id: string | null) => void;
    modifyEditorPosition: (x: number, y: number) => void;
  };
  globalsActions: {
    setGlobal: (key: string, value: boolean | number | string) => void;
    setToggleGlobal: (key: globalsToogleKeys, value: boolean) => void;
  };
}
