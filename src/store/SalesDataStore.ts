import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { produce } from 'immer';
import type {
  SalesDataStoreState,
  SalesDataStore,
} from '@/types/salesDataSore';

const initialVariables: SalesDataStore = {
  status: { instance: 'empty', emptyticket: true, selectedLine: null },
  ticket: {
    header: {
      Custlng: null,
      DiscP: null,
      Operator: null,
      Paid: null,
      Return: null,
      RndDiff: null,
      Total1: null,
      Total2: null,
      Totalx: null,
      advance: null,
      totalnocumulrec: null,
      totalnopro: null,
      totemptamt: null,
    },
    lines: {},
    payments: [],
  },
};

export const useSalesDataStore = create<SalesDataStoreState>()(
  devtools((set) => ({
    ...initialVariables,
    setSalesData: (data: SalesDataStoreState) => {
      set(
        produce((state) => {
          state = data;
        })
      );
    },
    reset: () => {
      set(produce((state) => (state = initialVariables)));
    },
  }))
);
