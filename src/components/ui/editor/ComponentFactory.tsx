import type { ComponentUnion } from 'src/types/ui.types';
import ButtonComponent from './ButtonComponent';
import type { ButtonProps } from 'src/types/componentProps';
import type { Langs } from 'src/types/constTypes';

interface Props extends ButtonProps {
  component: ComponentUnion;
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

const ComponentFactory = (props: Props) => {
  const { component } = props;
  if (component.type === 'BUTTON') {
    const {
      isSelected,
      lang,
      text,
      changeTextVisible,
      handleCopyComponent,
      handleDeleteComponent,
      handleOnClickTextChange,
      handleOnClickColorChange,
      handleResizeStart,
      handleSelectComponent,
    } = props;
    return (
      <ButtonComponent
        button={component}
        text={text}
        lang={lang}
        changeTextVisible={changeTextVisible}
        isSelected={isSelected}
        handleSelectComponent={handleSelectComponent}
        handleCopyComponent={handleCopyComponent}
        handleDeleteComponent={handleDeleteComponent}
        handleOnClickTextChange={handleOnClickTextChange}
        handleOnClickColorChange={handleOnClickColorChange}
        handleResizeStart={handleResizeStart}
      />
    );
  }

  return <></>;
};

export default ComponentFactory;
