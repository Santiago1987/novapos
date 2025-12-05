import type {
  ThemesList,
  SalesColumns,
  PaymentsColumns,
  ComponentTypes,
  Langs,
} from './constTypes';

// === MISC TYPES ===
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: string;
  height: string;
}

export interface Text {
  [key: string]: { lang: keyof typeof Langs; text: string }[];
}

export type ComponentUnion = Button | Table<SalesData> | Table<PaymentsData>;
export type ComponentTypes = keyof typeof ComponentTypes;

//==== COLUMN CONFIG TYPES ====//
export interface TableColumnConfig<T> {
  key: keyof T; // Clave del dato (ej. 'QTY', 'PAYMETH')
  title: string; // Título de la cabecera (reemplaza 'text' para claridad)
  visible: boolean; // Indica si la columna es visible
  width?: string; // Ancho de la columna (ej. '100px', '20%')
  order: number; // Orden de la columna en la tabla
  textColor?: string; // Color del texto (cabecera o celdas)
  styles?: React.CSSProperties; // Opcional: estilos adicionales (ej. align, fontSize)
  fontSize?: string; // Tamaño de la fuente (ej. 'text-sm', 'text-lg')
  fontFamily?: string; // Familia de la fuente (ej. 'Arial', 'Helvetica')
  align?: 'left' | 'center' | 'right'; // Alineación del texto
}

//==== TABLE DATA TYPES ====//
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

export interface PromotionsColumns {
  PROMO: string;
  DISCOUNT: number;
  VALID_UNTIL: string;
}

//==== BASE COMPONENT TYPE ====//
export interface Component<T extends keyof typeof ComponentTypes> {
  id: string;
  type: T;
  properties: BaseComponentProps;
}

//==== BASE PROPS ====//
export interface BaseComponentProps {
  size: Size;
  position: Position;
  className?: string;
  styles?: React.CSSProperties;
  backgroundColor?: string;
}

//==== TABLE PROPERTIES ====//
export interface TableProperties extends BaseComponentProps {
  header: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontFamily?: string;
  };
  rows: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontFamily?: string;
  };
  border?: {
    width?: string;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  };
}

// === COMPONENT DISCRIMINATED UNION === //
export type ComponentMap = {
  BUTTON: Button;
  TABLE: Table<SalesColumns | PaymentsColumns>;
};

export type ComponentType = keyof ComponentMap;

//=== BUTTON ===//
export interface Button extends Component<'BUTTON'> {
  type: 'BUTTON';
  subMenu?: SubMenu;
  properties: BaseComponentProps & {
    text?: string;
    textColor?: string;
    fontSize?: string;
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

//=== TABLE ===//
export interface Table<T> extends Component<'TABLE'> {
  type: 'TABLE';
  tableType: 'sales' | 'payments' | 'promotions';
  columns: TableColumnConfig<T>[];
  properties: TableProperties;
}

//=== ESPECIFIC TYPES ===//
export type SalesTable = Table<SalesColumns>;
export type PaymentsTable = Table<PaymentsColumns>;
export type PromotionsTable = Table<PromotionsColumns>;

//=== CAROUSEL ===//
export interface Carousel extends Component<'CAROUSEL'> {
  carouselType: 'images' | 'videos';
}

//=== LAYOUT ===//
export interface Layout {
  background?: string;
  lang: keyof typeof Langs;
  size: Size;
  editorMenu: {
    position: Position;
  };
  components: Record<
    string,
    Button | SalesTable | PaymentsTable | PromotionsTable | Carousel
  >;
}

export type Themes = (typeof ThemesList)[keyof typeof ThemesList];
