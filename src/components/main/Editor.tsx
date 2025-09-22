import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  useDroppable,
  useSensor,
  TouchSensor,
  PointerSensor,
  useSensors,
} from '@dnd-kit/core';
import ButtonComponent from 'src/components/ui/editor/ButtonComponent';
import EditorMenu from 'src/components/ui/editor/EditorMenu';
import useEditor from 'src/hooks/useEditor';

const Editor = () => {
  const gridSize = 5;
  const { setNodeRef } = useDroppable({ id: 'editor' });
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const {
    changeTextVisible,
    colorPickerVisible,
    layout,
    selectedComponent,
    text,
    handleDragEnd,
    handleSelectComponent,
    handleCopyComponent,
    handleDeleteComponent,
    handleOnClickTextChange,
    handleOnClickColorChange,
    handleOnColorChange,
    handleOnChangeText,
  } = useEditor({ gridSize });

  const { background, components } = layout;
  const snapToGrid = createSnapModifier(gridSize);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[snapToGrid, restrictToWindowEdges]}
    >
      <div className={`w-screen h-screen relative`} style={{ background }}>
        <div ref={setNodeRef}>
          {components.buttons.map((button) => (
            <ButtonComponent
              key={button.id}
              button={button}
              isSelected={selectedComponent.id === button.id}
              handleSelectComponent={handleSelectComponent}
              handleCopyComponent={handleCopyComponent}
              handleDeleteComponent={handleDeleteComponent}
              handleOnClickTextChange={handleOnClickTextChange}
              handleOnClickColorChange={handleOnClickColorChange}
            />
          ))}
        </div>
        <EditorMenu
          changeTextVisible={changeTextVisible}
          colorPickerVisible={colorPickerVisible}
          handleOnColorChange={handleOnColorChange}
          text={text ? text : ''}
          handleOnChangeText={handleOnChangeText}
        />
      </div>
    </DndContext>
  );
};

export default Editor;
