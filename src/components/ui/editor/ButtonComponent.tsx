import { useDraggable } from '@dnd-kit/core';
import type { Button } from '../../../types/types';
import {
  ContentCopy,
  Delete,
  FormatText,
  Function,
  FormatColorFill,
} from '../../icons/SVGIcons';

type Props = {
  button: Button;
  isSelected: boolean;
  handleSelectComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleCopyComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleDeleteComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleOnClickTextChange: () => void;
  handleOnClickColorChange: () => void;
};

const ButtonComponent = ({
  button,
  isSelected,
  handleSelectComponent,
  handleCopyComponent,
  handleDeleteComponent,
  handleOnClickTextChange,
  handleOnClickColorChange,
}: Props) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: button.id,
  });
  const { properties } = button;

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    position: properties.position.mode === 'absolute' ? 'absolute' : 'relative',
    left: properties.position.x,
    top: properties.position.y,
    width: properties.size ? `${properties.size.width}` : 'auto',
    height: properties.size ? `${properties.size.height}` : 'auto',
    backgroundColor: properties.color ? properties.color : 'bg-red-500',
    cursor: 'grab',
    touchAction: 'none',
  } as React.CSSProperties;

  const sizeProps = `w-[${properties.size?.width}] h-[${properties.size?.height}] max-w-[${properties.size?.width}] max-h-[${properties.size?.height}]`;
  const customProps = `${sizeProps} ${properties.miscStyles ? properties.miscStyles : ''} ${properties.fontSize}`;
  const buttonStyle = {
    backgroundColor: properties.color,
    color: properties.textColor,
  };

  const iconWidth = '1.4em';
  const iconHeight = '1.4em';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`flex items-center justify-center rounded-lg`}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div
          className={`absolute flex gap-1 justify-between w-[${properties.size?.width}] 
          ${isSelected ? 'visible' : 'invisible'} top-[-25px] z-50`}
        >
          <button onClick={() => handleCopyComponent(button.id, 'buttons')}>
            <ContentCopy width={iconWidth} height={iconHeight} />
          </button>
          <button onClick={() => handleOnClickTextChange()}>
            <FormatText width={iconWidth} height={iconHeight} />
          </button>
          <button>
            <Delete
              onClick={() => handleDeleteComponent(button.id, 'buttons')}
              width={iconWidth}
              height={iconHeight}
              color="red"
            />
          </button>
        </div>
        <button
          className={`p-1  wrap-anywhere leading-5 ${customProps} ${isSelected ? 'ring-4 ring-blue-300' : ''}`}
          style={buttonStyle}
          onClick={() => handleSelectComponent(button.id, 'buttons')}
        >
          {properties.label}
        </button>
        <div
          className={`absolute flex gap-1 justify-between w-[${properties.size?.width}] 
          ${isSelected ? 'visible' : 'invisible'} top-[53px] z-50`}
        >
          <button>
            <Function width={iconWidth} height={iconHeight} />
          </button>
          <button onClick={handleOnClickColorChange}>
            <FormatColorFill width={iconWidth} height={iconHeight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponent;
