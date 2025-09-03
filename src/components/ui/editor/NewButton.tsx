import { useEffect } from 'react';
import { DragVariant } from '../../icons/SVGIcons';
import { useDraggable } from '@dnd-kit/core';

type Props = {
  handleIsDragging: (dragging: boolean) => void;
};

const NewButton = ({ handleIsDragging }: Props) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: 'new-button',
      data: {
        position: document
          .getElementById('new-button')
          ?.getBoundingClientRect(),
      },
    });

  useEffect(() => {
    handleIsDragging(isDragging);
  }, [isDragging, handleIsDragging]);

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    cursor: 'grab',
    touchAction: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
  } as React.CSSProperties;

  return (
    <div className="flex flex-col justify-evenly items-center w-11/12 h-[100px]">
      <h2 className="p-1 text-xl">New Button</h2>
      <button
        id="new-button"
        className="flex flex-row items-center w-[150px] h-[50px] p-1 rounded-lg 
                        shadow-md shadow-gray-400/50 text-lg"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <div className="w-1/4 flex justify-center items-center">
          <DragVariant style={{ width: '1.2em', height: '1.2em' }} />
        </div>
        <div className="w-3/4 flex justify-center items-center">Drag me</div>
      </button>
    </div>
  );
};

export default NewButton;
