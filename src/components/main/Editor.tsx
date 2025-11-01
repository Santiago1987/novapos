import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  useDroppable,
  useSensor,
  TouchSensor,
  PointerSensor,
  useSensors,
} from '@dnd-kit/core';
import ComponentFactory from 'src/components/ui/editor/ComponentFactory';
import EditorMenu from 'src/components/ui/editor/EditorMenu';
import useEditor from 'src/hooks/useEditor';
import ResizePreviewComponent from '../ui/editor/ResizePreviewComponent';

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
    colorPickerVisible,
    layout,
    selectedComponentId,
    handleDragEnd,
    handleSelectComponent,
    handleCopyComponent,
    handleDeleteComponent,
    handleOnClickColorChange,
    handleOnColorChange,
  } = useEditor({ gridSize });

  const { background, components, lang } = layout;
  const snapToGrid = createSnapModifier(gridSize);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[snapToGrid, restrictToWindowEdges]}
    >
      <div className={`w-screen h-screen relative`} style={{ background }}>
        <div ref={setNodeRef}>
          {Object.keys(components).map((idc) => (
            <ComponentFactory
              key={idc}
              component={components[idc]}
              lang={lang}
              isSelected={selectedComponentId === idc}
              handleSelectComponent={handleSelectComponent}
              handleCopyComponent={handleCopyComponent}
              handleDeleteComponent={handleDeleteComponent}
              handleOnClickColorChange={handleOnClickColorChange}
            />
          ))}
        </div>
        <EditorMenu
          colorPickerVisible={colorPickerVisible}
          handleOnColorChange={handleOnColorChange}
          lang={lang}
        />
        <ResizePreviewComponent />
      </div>
    </DndContext>
  );
};

export default Editor;
