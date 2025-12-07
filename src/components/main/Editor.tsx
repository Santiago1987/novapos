import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  useDroppable,
  useSensor,
  TouchSensor,
  PointerSensor,
  useSensors,
} from '@dnd-kit/core';
import ComponentFactory from '@/components/ui/editor/ComponentFactory';
import EditorMenu from '@/components/ui/editor/EditorMenu';
import useEditor from '@/hooks/useEditor';
import ResizePreviewComponent from '@/components/ui/editor/ResizePreviewComponent';
import { useLayoutStore } from '@/store/LayoutStore';
import { useCustomerViewStore } from '@/store/CustomerViewStore';

type Props = {
  type: 'CustomerView' | 'SalesView';
};

const Editor = ({ type }: Props) => {
  const gridSize = 5;
  const { setNodeRef } = useDroppable({ id: 'editor' });
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const layout =
    type === 'CustomerView'
      ? useCustomerViewStore((state) => state.layout)
      : useLayoutStore((state) => state.layout);

  const {
    selectedComponentId,
    handleDragEnd,
    handleSelectComponent,
    handleCopyComponent,
    handleDeleteComponent,
  } = useEditor({ gridSize, type });

  const { background, components, lang } = layout;
  const snapToGrid = createSnapModifier(gridSize);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[snapToGrid, restrictToWindowEdges]}
    >
      <div
        className={`w-screen h-screen relative`}
        style={{
          background,
        }}
      >
        <div ref={setNodeRef}>
          {Object.entries(components).map(([id, component]) => (
            <ComponentFactory key={id} type={component.type} id={id} />
          ))}
        </div>
        <EditorMenu lang={lang} />
        <ResizePreviewComponent />
      </div>
    </DndContext>
  );
};

export default Editor;
