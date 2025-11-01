import type {
  ThemesList,
  SalesColumns,
  PaymentsColumns,
  ComponentTypes,
  Langs,
} from './constTypes';

export type ComponentUnion = Button | Table<SalesData> | Table<PaymentsData>;
export type ComponentTypes = keyof typeof ComponentTypes;

// Layout configuration for UI components
export interface Layout {
  background?: string;
  lang: keyof typeof Langs;
  size: {
    height: string;
    width: string;
  };
  editorMenu: {
    position: Position;
  };
  components: Record<string, ComponentUnion>;
}

export interface BaseComponentProps {
  text?: string;
  textColor?: string;
  fontSize?: string;
  size: Size;
  position: Position;
  className?: string;
  styles?: React.CSSProperties;
  backgroundColor?: string;
  disabled?: boolean;
}

// General component interface
export interface Component<T extends keyof typeof ComponentTypes> {
  id: string;
  type: T;
  properties: BaseComponentProps;
}

// Button component extending general component
export interface Button extends Component<'BUTTON'> {
  type: 'BUTTON';
  subMenu?: SubMenu;
  properties: BaseComponentProps & {
    onClick?: () => void;
    icon?: string;
    image?: string;
  };
}

// SubMenu structure for buttons
export interface SubMenu {
  title: Text;
  buttons: Button[];
  position: Position;
  size: Size;
}

export interface Text {
  [key: string]: { lang: keyof typeof Langs; text: string }[];
}

//-------------------------TABLES-------------------------//
export interface SalesColumns {
  QTY: number;
  DESCR: string;
  UNPR: number;
  VALUE: number;
}

export interface PaymentsColumns {
  PAYMETH: string;
  QTY: number;
  AMT: number;
  VALUE: number;
}

export interface TableColumn<T> {
  type: keyof T; // Clave del dato (ej. 'QTY', 'PAYMETH')
  title: string; // Título de la cabecera (reemplaza 'text' para claridad)
  width?: string; // Ancho de la columna (ej. '100px', '20%')
  textColor?: string; // Color del texto (cabecera o celdas)
  styles?: React.CSSProperties; // Opcional: estilos adicionales (ej. align, fontSize)
}

// Table component extending general component
export interface Table<T> extends Component<'TABLE'> {
  type: 'TABLE';
  tableType: 'sales' | 'payments' | 'promotions';
  columns: TableColumn<T>[];
  properties: BaseComponentProps & {
    headerColor?: string;
    rowsColor?: string;
  };
}

export type SalesTable = Table<SalesColumns>;
export type PaymentsTable = Table<PaymentsColumns>;

//MISC TYPES
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: string;
  height: string;
}

export type Themes = (typeof ThemesList)[keyof typeof ThemesList];
