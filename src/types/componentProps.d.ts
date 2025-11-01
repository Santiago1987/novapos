export interface ButtonProps {
  isSelected: boolean;

  handleSelectComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleCopyComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleDeleteComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleOnClickColorChange: () => void;
}
