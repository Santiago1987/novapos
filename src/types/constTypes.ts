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
  BUTTON: 'buttons',
  SALES_TABLE: 'sales_table',
  PAYMENTS_TABLE: 'payments_table',
  PROMOTIONS_TABLE: 'promotions_table',
  TOTALS_COMPONENT: 'totals_component',
  LABEL: 'labels',
  INPUT: 'inputs',
  CAROUSEL_IMAGES: 'carousel_images',
  CAROUSEL_VIDEOS: 'carousel_videos',
  OPEATOR: 'operator',
  LOGO: 'logo',
} as const;

export const Langs = {
  EN: 'EN',
  ES: 'ES',
  BE: 'BE',
  NLBE: 'NLBE',
} as const;
