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
  TABLE: 'tables',
  LABEL: 'labels',
  INPUT: 'inputs',
} as const;

export const Langs = {
  EN: 'EN',
  ES: 'ES',
  BE: 'BE',
} as const;
