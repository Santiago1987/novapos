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
import useResize from 'src/hooks/useResize';
import ResizeComponent from '../ui/editor/ResizeComponent';
import useTextChange from 'src/hooks/useTextChange';

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

  const {
    text,
    changeTextVisible,
    handleOnChangeText,
    handleOnClickTextChange,
    handleOnConfirmTextChange,
    handleOnChangeLang,
  } = useTextChange();

  const {
    resizeStarted,
    dimensions,
    position,
    handleResizeStart,
    handleOnResizeManualChange,
    handleOnResizeEnd,
    handlePointerDown,
    handlePointerMove,
    handleMauseUp,
  } = useResize();

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
          {components.map((component) => (
            <ComponentFactory
              key={component.id}
              component={component}
              text={text}
              lang={lang}
              changeTextVisible={
                changeTextVisible && selectedComponentId === component.id
              }
              isSelected={selectedComponentId === component.id}
              handleSelectComponent={handleSelectComponent}
              handleCopyComponent={handleCopyComponent}
              handleDeleteComponent={handleDeleteComponent}
              handleOnClickTextChange={handleOnClickTextChange}
              handleOnClickColorChange={handleOnClickColorChange}
              handleResizeStart={handleResizeStart}
            />
          ))}
        </div>
        <EditorMenu
          changeTextVisible={changeTextVisible}
          colorPickerVisible={colorPickerVisible}
          handleOnColorChange={handleOnColorChange}
          text={text ? text : ''}
          lang={lang}
          handleOnChangeText={handleOnChangeText}
          resizeStarted={resizeStarted}
          dimensions={dimensions}
          handleOnResizeManualChange={handleOnResizeManualChange}
          handleOnResizeEnd={handleOnResizeEnd}
          handleOnConfirmTextChange={handleOnConfirmTextChange}
          handleOnChangeLang={handleOnChangeLang}
        />
        <ResizeComponent
          risizeStarted={resizeStarted}
          label={text || ''}
          width={dimensions.width}
          height={dimensions.height}
          x={position.x}
          y={position.y}
          handlePointerDown={handlePointerDown}
          handlePointerMove={handlePointerMove}
          handleMauseUp={handleMauseUp}
        />
      </div>
    </DndContext>
  );
};

export default Editor;
