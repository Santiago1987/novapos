import { useDraggable } from '@dnd-kit/core';
import type { Button } from 'src/types/ui.types';
import {
  ContentCopy,
  Delete,
  FormatText,
  Function,
  FormatColorFill,
  Resize,
} from 'src/components/icons/SVGIcons';
import { AnimatePresence, motion } from 'framer-motion';
import type { ButtonProps } from 'src/types/componentProps';
import { useTraductionsStore } from 'src/store/TraductionsStore';

interface Props extends ButtonProps {
  button: Button;
}

const ButtonComponent = ({
  button,
  isSelected,
  lang,
  text,
  changeTextVisible,
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
  const { t } = useTraductionsStore();

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    left: properties.position.x,
    top: properties.position.y,
    width: `${properties.size.width}`,
    height: `${properties.size.height}`,
    backgroundColor: properties.backgroundColor
      ? properties.backgroundColor
      : 'bg-red-500',
    touchAction: 'none',
  } as React.CSSProperties;

  //const sizeProps = `w-[${properties.size.width}] h-[${properties.size.height}]`;
  const customProps = `p-1 wrap-anywhere leading-5 ${properties.className ? properties.className : ''} ${properties.fontSize}`;
  const buttonStyle = {
    backgroundColor: properties.backgroundColor,
    color: properties.textColor,
    cursor: isDragging ? 'grabbing' : 'grab',
    width: `${properties.size.width}`,
    height: `${properties.size.height}`,
  };

  const iconWidth = '1.4em';
  const iconHeight = '1.4em';

  const buttonText = changeTextVisible ? text : t(button.id, lang);

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
        {buttonText}
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
                onClick={() => handleOnClickTextChange(buttonText || '')}
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
