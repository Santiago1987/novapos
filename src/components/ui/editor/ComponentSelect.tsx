import { useDraggable } from '@dnd-kit/core';
import { ComponentTypes } from '@/types/constTypes';

type Props = {
  idx: keyof typeof ComponentTypes;
  handleSelect: (index: number) => void;
  index: number;
  cp: string;
};

const ComponentSelect = ({ idx, index, cp, handleSelect }: Props) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: idx,
      data: {
        component: idx,
        position: document.getElementById(idx)?.getBoundingClientRect(),
      },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <button
      id={idx}
      onClick={() => handleSelect(index)}
      className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between 
        border-solid border-black border-1 rounded-lg shadow-lg shadow-gray-400/50'
        hover:scale-105 ${isDragging ? 'opacity-50' : ''}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <span className={'font-medium w-3/4'}>{cp}</span>
    </button>
  );
};

export default ComponentSelect;
