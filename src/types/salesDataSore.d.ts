export interface SalesDataStoreState {
  data: Data;
  status: Status;
}

export interface TicketLines {
  [key: string]: TicketLine | {};
}

export interface Data extends TicketLines {
  Cashc: number;
  CustNoPoint: number;
  Custlng: number;
  Customc: string;
  Date: string;
  DiscP: number;
  EOID: string;
  FID: string;
  Hor: number;
  LicPlt: any;
  Opratc1: number;
  Paid: number;
  PayAmt: PayAmt;
  PayCnr: PayCnr;
  PayCnt: PayCnt;
  PayCur: PayCur;
  PayDate: PayDate;
  PayDet: PayDet;
  PayKind: PayKind;
  PayRate: PayRate;
  Points: string;
  PriceBC: any;
  QRCust: any;
  RetChg: any;
  RetDet: any;
  Return: number;
  RndDiff: any;
  SKind: number;
  ScaDate: string;
  ScaTime: string;
  Shopc: number;
  Status: number;
  Time: string;
  Total1: number;
  Total2: number;
  Totalx: number;
  Vatnr: string;
  Vatt: any;
  advance: string;
  curc: string;
  custblock: any;
  custptn: string;
  paycdispty: Paycdispty;
  paycost: Paycost;
  paycoupon: Paycoupon;
  paycouppay: Paycouppay;
  paygrp: Paygrp;
  payintill: Payintill;
  payjoin: Payjoin;
  payminamt: Payminamt;
  paynoret: Paynoret;
  payonly: Payonly;
  paypayterm: Paypayterm;
  payround: Payround;
  paysub: Paysub;
  paytill: Paytill;
  paytype: Paytype;
  totalnocumulrec: string;
  totalnopro: number;
  totemptamt: number;
}

export interface TicketLine {
  AddCost: number;
  'AddCost%': number;
  Artc: string;
  AskCnt: boolean | null;
  AskSalm: boolean | null;
  BalArt: boolean | null;
  Barcode: string;
  Combi: boolean | null;
  Count: number;
  DisCoup: boolean | null;
  EmptAmt: number | null;
  ExpDat: string | null;
  ExtraTx: string | null;
  Lot: string | null;
  LotSup: string | null;
  NoPrChg: boolean;
  NoPromo: boolean;
  NoVisit: boolean;
  PackW: any;
  Packc: any;
  Promo: any;
  QRCode: any;
  Quest: any;
  RPrice: any;
  RQty: any;
  StoKUn: number;
  SuPrice: number;
  Text: Record<string, string>;
  Track: any;
  Type: string;
  UnPrice: number;
  Unit: any;
  UntPack: any;
  UnxArt: any;
  Vatc: any;
  Vatt: number;
  value: number;
  valued: number;
  valuex: number;
  xaskcnt: any;
  xcount: number;
  xunprice: number;
}

export interface Status {
  code: number;
  message: string;
  ticketEmpty: boolean;
}
