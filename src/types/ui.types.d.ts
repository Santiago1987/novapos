import type {
  ThemesList,
  SalesColumns,
  PaymentsColumns,
  ComponentTypes,
} from './constTypes';

export type ComponentUnion = Button | Table<SalesData> | Table<PaymentsData>;

// Layout configuration for UI components
export interface Layout {
  background?: string;
  size: {
    height: string;
    width: string;
  };
  editorMenu: {
    position: Position;
  };
  components: ComponentUnion[];
}

export interface BaseComponentProps {
  text?: string;
  textColor?: string;
  fontSize?: string;
  size?: Size;
  position?: Position;
  className?: string;
  styles?: React.CSSProperties;
  backgroundColor?: string;
  disabled?: boolean;
}

// General component interface
export interface Component<T extends ComponentTypes> {
  id: string;
  type: T;
  properties: BaseComponentProps;
}

// Button component extending general component
export interface Button extends Component<'BUTTON'> {
  subMenu?: SubMenu;
  properties: BaseComponentProps & {
    onClick?: () => void;
    icon?: string;
    image?: string;
  };
}

// SubMenu structure for buttons
export interface SubMenu {
  title: string;
  buttons: Button[];
  position: Position;
  size: Size;
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

export type SalesTable = Table<SalesColumns>;
export type PaymentsTable = Table<PaymentsColumns>;

// Table component extending general component
export interface Table<T> extends Component<'TABLE'> {
  tableType: 'sales' | 'payments' | 'promotions';
  columns: TableColumn<T>[];
  properties: BaseComponentProps & {
    headerColor?: string;
    rowsColor?: string;
  };
}

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
