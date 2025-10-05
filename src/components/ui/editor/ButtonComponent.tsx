import { useDraggable } from '@dnd-kit/core';
import type { Button } from 'src/types/types';
import {
  ContentCopy,
  Delete,
  FormatText,
  Function,
  FormatColorFill,
  Resize,
} from 'src/components/icons/SVGIcons';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  button: Button;
  isSelected: boolean;
  handleSelectComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleCopyComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleDeleteComponent: (id: string, type: 'buttons' | 'tables') => void;
  handleOnClickTextChange: () => void;
  handleOnClickColorChange: () => void;
  handleResizeStart: (width: number, height: number) => void;
};

const ButtonComponent = ({
  button,
  isSelected,
  handleSelectComponent,
  handleCopyComponent,
  handleDeleteComponent,
  handleOnClickTextChange,
  handleOnClickColorChange,
  handleResizeStart,
}: Props) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: button.id,
      data: {
        type: 'button',
      },
    });
  const { properties } = button;

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    position: properties.position.mode === 'absolute' ? 'absolute' : 'relative',
    left: properties.position.x,
    top: properties.position.y,
    width: `${properties.size.width}`,
    height: `${properties.size.height}`,
    backgroundColor: properties.color ? properties.color : 'bg-red-500',
    touchAction: 'none',
  } as React.CSSProperties;

  //const sizeProps = `w-[${properties.size.width}] h-[${properties.size.height}]`;
  const customProps = `p-1 wrap-anywhere leading-5 ${properties.miscStyles ? properties.miscStyles : ''} ${properties.fontSize}`;
  const buttonStyle = {
    backgroundColor: properties.color,
    color: properties.textColor,
    cursor: isDragging ? 'grabbing' : 'grab',
    width: `${properties.size.width}`,
    height: `${properties.size.height}`,
  };

  const iconWidth = '1.4em';
  const iconHeight = '1.4em';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`relative flex flex-col items-center justify-center rounded-lg`}
    >
      <button
        className={`${customProps} ${isSelected ? 'ring-4 ring-blue-300' : ''}`}
        style={buttonStyle}
        onClick={() => handleSelectComponent(button.id, 'buttons')}
      >
        {properties.label}
      </button>
      <AnimatePresence>
        {isSelected && (
          <>
            <motion.div
              className={`absolute flex gap-1 justify-between z-50`}
              style={{ width: properties.size.width }}
              initial={{ opacity: 0, top: '-10px' }}
              animate={{ opacity: 1, top: '-25px' }}
              exit={{ opacity: 0, top: '-10px' }}
            >
              <button
                onClick={() => handleCopyComponent(button.id, 'buttons')}
                className="cursor-pointer hover:scale-110"
              >
                <ContentCopy width={iconWidth} height={iconHeight} />
              </button>
              <button
                onClick={() => handleOnClickTextChange()}
                className="cursor-pointer hover:scale-110"
              >
                <FormatText width={iconWidth} height={iconHeight} />
              </button>
              <button
                onClick={() => handleDeleteComponent(button.id, 'buttons')}
                className="cursor-pointer hover:scale-110"
              >
                <Delete width={iconWidth} height={iconHeight} color="red" />
              </button>
            </motion.div>
            <motion.div
              className={`absolute flex gap-1 justify-between z-50`}
              style={{ width: properties.size.width }}
              initial={{
                opacity: 0,
                top: +properties.size.height.replace(/\D/g, '') + -10 + 'px',
              }}
              animate={{
                opacity: 1,
                top: +properties.size.height.replace(/\D/g, '') + 5 + 'px',
              }}
              exit={{
                opacity: 0,
                top: +properties.size.height.replace(/\D/g, '') + -10 + 'px',
              }}
            >
              <button className="cursor-pointer hover:scale-110">
                <Function width={iconWidth} height={iconHeight} />
              </button>
              <button
                className="cursor-pointer hover:scale-110"
                onClick={() =>
                  handleResizeStart(
                    +properties.size.width.replace(/\D/g, ''),
                    +properties.size.height.replace(/\D/g, '')
                  )
                }
              >
                <Resize width={iconWidth} height={iconHeight} />
              </button>
              <button
                onClick={handleOnClickColorChange}
                className="cursor-pointer hover:scale-110"
              >
                <FormatColorFill width={iconWidth} height={iconHeight} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ButtonComponent;
