import type { ComponentUnion } from '@/types/ui.types';
import ButtonComponent from '@/components/ui/editor/ButtonComponent';
import type { ButtonProps } from '@/types/componentProps';
import type { Langs } from '@/types/constTypes';

interface Props extends ButtonProps {
  component: ComponentUnion;
  isSelected: boolean;
  lang: keyof typeof Langs;
  text?: string;
  changeTextVisible?: boolean;
  handleSelectComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleCopyComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleDeleteComponent: (id: string, type: 'buttons' | 'tables') => void;
}

const ComponentFactory = (props: Props) => {
  const { component } = props;
  if (component.type === 'BUTTON') {
    const {
      isSelected,
      handleCopyComponent,
      handleDeleteComponent,
      handleSelectComponent,
    } = props;
    return (
      <ButtonComponent
        button={component}
        isSelected={isSelected}
        handleSelectComponent={handleSelectComponent}
        handleCopyComponent={handleCopyComponent}
        handleDeleteComponent={handleDeleteComponent}
      />
    );
  }

  return <></>;
};

export default ComponentFactory;
