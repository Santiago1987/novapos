export const ThemesList = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  GREEN: 'GREEN',
  DARKBLUE: 'DARKBLUE',
} as const;

export const SalesColumns = {
  QTY: 'QUANTITY',
  DESCR: 'DESCRIPTION',
  UNPR: 'UNIT PRICE',
  VALUE: 'VALUE',
} as const;

export const PaymentsColumns = {
  PAYMETH: 'PAYMENT METHOD',
  QTY: 'QUANTITY',
  AMT: 'AMOUNT',
  VALUE: 'VALUE',
} as const;

export const ComponentTypes = {
  BUTTON: 'BUTTON',
  SALES_TABLE: 'SALES TABLE',
  PAYMENTS_TABLE: 'PAYMENTS TABLE',
  PROMOTIONS_TABLE: 'PROMOTIONS TABLE',
  TOTALS_COMPONENT: 'TOTALS COMPONENT',
  LABEL: 'LABEL',
  INPUT: 'INPUT',
  CAROUSEL_IMAGES: 'CAROUSEL IMAGES',
  CAROUSEL_VIDEOS: 'CAROUSEL VIDEOS',
  OPERATOR: 'OPERATOR',
  LOGO: 'LOGO',
} as const;

export const Langs = {
  EN: 'EN',
  ES: 'ES',
  BE: 'BE',
  NLBE: 'NLBE',
} as const;

export const keysOf = <T extends object>(obj: T): (keyof T)[] =>
  Object.keys(obj) as (keyof T)[];
