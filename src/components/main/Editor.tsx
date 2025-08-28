import { useState } from 'react';
import { useLayoutStore } from '../../store/LayoutStore';
import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  useDroppable,
  useSensor,
  TouchSensor,
  type DragEndEvent,
  PointerSensor,
  useSensors,
} from '@dnd-kit/core';
import ButtonComponent from '../ui/ButtonComponent';
import EditorMenu from '../ui/EditorMenu';
import { v4 as uuidv4 } from 'uuid';

const Editor = () => {
  const { layout, updateButton, addButton } = useLayoutStore();
  const { setNodeRef } = useDroppable({ id: 'editor' });
  const { background, components } = layout;
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const [dragStarted, setDragStarted] = useState(false);
  const [mausePosition, setMausePosition] = useState({ x: 0, y: 0 });
  const [dragStyle, setDragStyle] = useState('opacity-100');

  const gridSize = 5;
  const snapToGrid = createSnapModifier(gridSize);

  //DRAG END
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setDragStarted(false);
    setDragStyle('opacity-100');

    // NEW BUTTON
    if (active.id === 'new-button') {
      addButton({
        id: uuidv4(),
        properties: {
          label: 'New Button',
          position: {
            mode: 'absolute',
            x: mausePosition.x,
            y: mausePosition.y,
          },
          size: { width: '150', height: '50' },
          color: 'bg-blue-500',
          textColor: 'text-white',
          isClicked: false,
        },
      });
    }

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

  //handle is dragging
  const handleIsDraggin = (isDragging: boolean) => setDragStarted(isDragging);

  //handle mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragStarted) return;
    setMausePosition({ x: e.clientX, y: e.clientY });
    setDragStyle('opacity-50');
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[snapToGrid, restrictToWindowEdges]}
    >
      <div
        onMouseMove={handleMouseMove}
        className={`w-screen h-screen relative ${background}`}
      >
        <div ref={setNodeRef}>
          {components.buttons.map((button) => (
            <ButtonComponent key={button.id} button={button} />
          ))}
        </div>
        <EditorMenu dragStyle={dragStyle} handleIsDraggin={handleIsDraggin} />
      </div>
    </DndContext>
  );
};

export default Editor;
