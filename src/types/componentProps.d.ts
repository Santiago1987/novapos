import type { Langs } from 'src/types/constTypes';
export interface ButtonProps {
  isSelected: boolean;
  lang: keyof typeof Langs;
  text?: string;
  changeTextVisible?: boolean;
  handleSelectComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleCopyComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleDeleteComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleOnClickTextChange: (initext: string) => void;
  handleOnClickColorChange: () => void;
  handleResizeStart: (iniWidth: number, iniHeight: number) => void;
}
