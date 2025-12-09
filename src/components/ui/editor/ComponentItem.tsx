import { useDraggable } from '@dnd-kit/core';
import { ComponentTypes } from '@/types/constTypes';

type Props = {
  idx: keyof typeof ComponentTypes;
  handleSelect: (index: number) => void;
  index: number;
  cp: string;
};

const ComponentItem = ({ idx, index, cp, handleSelect }: Props) => {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: idx,
    data: {
      component: idx,
      //position: document.getElementById(idx)?.getBoundingClientRect(),
    },
  });

  const style = {
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
    zIndex: isDragging ? 9999 : 'auto',
    opacity: isDragging ? 0.9 : 1,
    boxShadow: isDragging
      ? '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)'
      : '0 1px 3px rgba(0,0,0,0.1)',
  } as React.CSSProperties;

  return (
    <button
      id={idx}
      onClick={() => handleSelect(index)}
      className={`w-11/12 px-4 py-3 text-left text-sm transition-colors flex items-center justify-between 
        border-solid border-black border-1 rounded-lg shadow-lg shadow-gray-400/50'
        hover:scale-105 ${isDragging ? 'opacity-50' : ''}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-no-dnd="true"
      style={style}
    >
      <span className={'font-medium w-3/4'}>{cp}</span>
    </button>
  );
};

export default ComponentItem;
