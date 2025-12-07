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
export interface Component {
  id: string;
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

//=== BUTTON ===//
export interface Button extends Component {
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
export interface SalesTable extends Component {
  type: 'SALES_TABLE';
  columns: TableColumnConfig<SalesColumns>[];
  properties: TableProperties;
}

export interface PaymentsTable extends Component {
  type: 'PAYMENTS_TABLE';
  columns: TableColumnConfig<PaymentsColumns>[];
  properties: TableProperties;
}

export interface PromotionsTable extends Component {
  type: 'PROMOTIONS_TABLE';
  columns: TableColumnConfig<PaymentsColumns>[];
  properties: TableProperties;
}

//=== CAROUSEL ===//
export interface Carousel extends Component {
  carouselType: 'images' | 'videos';
  files: string[];
}

export interface Logo extends Component {
  type: 'LOGO';
  imageUrl: string;
}

//=== LAYOUT ===//
export interface Layout {
  background?: string;
  lang: keyof typeof Langs;
  size: Size;
  editorMenu: {
    position: Position;
  };
  components: Record<string, ComponentList>;
}

export type ComponentList =
  | Button
  | SalesTable
  | PaymentsTable
  | PromotionsTable
  | Carousel
  | Logo
  | Component<'TOTALS_TABLE'>;

export type Themes = (typeof ThemesList)[keyof typeof ThemesList];
