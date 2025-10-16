import type { ComponentUnion } from 'src/types/ui.types';
import ButtonComponent from './ButtonComponent';
import type { ButtonProps } from 'src/types/componentProps';
interface Props extends ButtonProps {
  component: ComponentUnion;
}

const ComponentFactory = ({ component, ...props }: Props) => {
  if (component.type === 'BUTTON') {
    return <ButtonComponent button={component} {...props} />;
  }

  return <></>;
};

export default ComponentFactory;
