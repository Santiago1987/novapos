import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DragVariant } from '@/components/icons/SVGIcons';

type Props = {
  isDragging: boolean;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};
const EditorDragStars = ({ isDragging, listeners, attributes }: Props) => {
  return (
    <>
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 right-1 hover:scale-120"
      >
        <DragVariant
          height="25px"
          width="25px"
          cursor={isDragging ? 'grabbing' : 'grab'}
        />
      </div>
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 hover:scale-120"
      >
        <DragVariant
          height="25px"
          width="25px"
          cursor={isDragging ? 'grabbing' : 'grab'}
        />
      </div>
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-1 left-1 hover:scale-120"
      >
        <DragVariant
          cursor={isDragging ? 'grabbing' : 'grab'}
          height="25px"
          width="25px"
        />
      </div>
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-1 right-1 hover:scale-120"
      >
        <DragVariant
          cursor={isDragging ? 'grabbing' : 'grab'}
          height="25px"
          width="25px"
        />
      </div>
    </>
  );
};

export default EditorDragStars;
