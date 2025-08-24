import { useDraggable } from '@dnd-kit/core';
import type { Button } from '../../types/types';
type Props = {
  button: Button;
};

const ButtonComponent = ({ button }: Props) => {
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
    width: properties.size ? properties.size.width : 'auto',
    height: properties.size ? properties.size.height : 'auto',
    backgroundColor: properties.color ? properties.color : 'bg-blue-500',
    cursor: 'grab',
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`flex items-center justify-center rounded bg-black ${properties.color}}`}
    >
      <button className={`p-2 ${properties.textColor} ${properties.color}`}>
        {properties.label}
      </button>
    </div>
  );
};

export default ButtonComponent;
