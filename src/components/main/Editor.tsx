import { useEffect } from 'react';
import { useLayoutStore } from '../../store/LayoutStore';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  useDroppable,
  useSensor,
  TouchSensor,
  type DragEndEvent,
  PointerSensor,
  useSensors,
} from '@dnd-kit/core';
import Button from '../ui/ButtonComponent';

const Editor = () => {
  const { layout, updateButton } = useLayoutStore();
  const { setNodeRef } = useDroppable({ id: 'editor' });
  const { background, components } = layout;
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {}, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const component = layout.components.buttons.find(
      (butt) => butt.id === active.id
    );
    if (!component) return;
    if (!delta) return;
    const { x, y } = delta;

    const newX = (component.properties.position.x || 0) + x;
    const newY = (component.properties.position.y || 0) + y;

    updateButton(component.id, {
      position: {
        ...component.properties.position,
        x: newX,
        y: newY,
      },
    });
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
    >
      <div
        ref={setNodeRef}
        className={`w-screen h-screen relative ${background}`}
      >
        {components.buttons.map((button) => (
          <div key={button.id}>
            <Button button={button} />
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Editor;
