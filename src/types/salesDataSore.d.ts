import { Langs } from './constTypes';
export interface SalesDataStoreState {
  ticket: Ticket;
  status: Status;
}

export type Instance = 'initial' | 'proccess' | 'finishing' | 'empty';

export interface Status {
  emptyticket: boolean;
  instance: Instance;
  selectedLine: number | null;
}

export interface TicketHeader {
  Custlng: number | null;
  DiscP: string | null;
  Operator: string | null;
  Paid: string | null;
  Return: string | null;
  RndDiff: string | null;
  Total1: string | null;
  Total2: string | null;
  Totalx: string | null;
  advance: string | null;
  totalnocumulrec: string | null;
  totalnopro: string | null;
  totemptamt: string | null;
}

export interface TicketLines {
  AddCost: string | null;
  Artc: string | null;
  Barcode: string | null;
  Count: number | null;
  EmptAmt: number | null;
  Promo: string | null;
  StoKUn: number | null;
  SuPrice: string | null;
  Descr: string | null;
  Text: Record<keyof typeof Langs, string> | null;
  Type: string | null;
  UnPrice: string | null;
  Vatc: string | null;
  Vatt: string | null;
  value: string | null;
  valued: string | null;
  valuex: string | null;
}

export interface Payment {
  PayAmt: string | null;
  PayCur: string | null;
  PayDate: string | null;
  PayKind: string | null;
}

export interface Ticket {
  header: TicketHeader;
  lines: Record<string, TicketLines>;
  payments: Payment[];
}
