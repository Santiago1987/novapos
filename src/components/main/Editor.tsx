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
  const {
    layout,
    selectedComponent,
    updateButton,
    addButton,
    selectComponent,
  } = useLayoutStore();
  const { setNodeRef } = useDroppable({ id: 'editor' });
  const { background, components } = layout;
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const gridSize = 5;
  const snapToGrid = createSnapModifier(gridSize);

  //DRAG END
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    // NEW BUTTON
    if (active.id === 'new-button') {
      const { x, y } = active.data.current?.position || { x: 0, y: 0 };
      addButton({
        id: uuidv4(),
        properties: {
          label: 'New Button',
          position: {
            mode: 'absolute',
            x: x - (x % gridSize),
            y: y - (y % gridSize),
          },
          size: { width: '150px', height: '50px' },
          color: 'bg-blue-500',
          textColor: 'text-white',
          fontSize: 'text-lg',
          isClicked: false,
          miscStyles: 'rounded-lg shadow-md shadow-gray-400/50',
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

  //SELECT COMPONENT
  const handleSelectComponent = (id: string, type: 'buttons' | 'tables') => {
    selectComponent(id, type);
  };

  //HANDEL COPY COMPONENT
  const handleCopyComponent = (id: string, type: 'buttons' | 'tables') => {
    const component = layout.components[type].find((comp) => comp.id === id);
    if (!component) return;
    if (type === 'buttons') {
      const newButton = {
        ...component,
        id: uuidv4(),
        properties: {
          ...component.properties,
          position: {
            ...component.properties.position,
            x: (component.properties.position.x || 0) + 20,
            y: (component.properties.position.y || 0) + 20,
          },
        },
      };
      addButton(newButton);
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[snapToGrid, restrictToWindowEdges]}
    >
      <div className={`w-screen h-screen relative ${background}`}>
        <div ref={setNodeRef}>
          {components.buttons.map((button) => (
            <ButtonComponent
              key={button.id}
              button={button}
              isSelected={selectedComponent.id === button.id}
              handleSelectComponent={handleSelectComponent}
              handleCopyComponent={handleCopyComponent}
            />
          ))}
        </div>
        <EditorMenu />
      </div>
    </DndContext>
  );
};

export default Editor;
