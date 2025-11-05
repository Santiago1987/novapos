import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { ResizeStoreState } from '@/types/miscStore';
import { produce } from 'immer';

const initialVariables: Pick<
  ResizeStoreState,
  'isResizing' | 'resizeStarted' | 'position' | 'dimensions' | 'text'
> = {
  isResizing: false,
  resizeStarted: false,
  position: { x: 0, y: 0 },
  dimensions: { width: '1px', height: '1px' },
  text: '',
};

export const useResizeStore = create<ResizeStoreState>()(
  devtools(
    persist(
      (set) => ({
        ...initialVariables,
        setIsResizing: (value: boolean) => {
          set(
            produce((state: ResizeStoreState) => {
              state.isResizing = value;
            })
          );
        },
        setResizeStarted: (value: boolean) => {
          set(
            produce((state: ResizeStoreState) => {
              state.resizeStarted = value;
            })
          );
        },
        setPosition: (x: number, y: number) => {
          set(
            produce((state: ResizeStoreState) => {
              state.position = { x, y };
            })
          );
        },
        setDimensions: (width: string, height: string) => {
          set(
            produce((state: ResizeStoreState) => {
              state.dimensions = { width, height };
            })
          );
        },
        setText: (text: string) => {
          set(
            produce((state: ResizeStoreState) => {
              state.text = text;
            })
          );
        },
      }),
      {
        name: 'resize-storage',
      }
    )
  )
);
