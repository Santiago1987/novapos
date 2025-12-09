import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DndContext,
  useDroppable,
  useSensor,
  TouchSensor,
  PointerSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import ComponentFactory from '@/components/ui/editor/ComponentFactory';
import EditorMenu from '@/components/ui/editor/EditorMenu';
import useEditor from '@/hooks/useEditor';
import ResizePreviewComponent from '@/components/ui/editor/ResizePreviewComponent';
import { useLayoutStore } from '@/store/LayoutStore';
import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useState } from 'react';
import type { ComponentTypes } from '@/types/constTypes';

type Props = {
  type: 'CustomerView' | 'SalesView';
};

const Editor = ({ type }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const { handleDragEnd } = useEditor({ gridSize, type });

  /**=========================================== */
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };
  const handleEnd = (event: DragEndEvent) => {
    setActiveId(null);
    handleDragEnd(event);
  };

  const getActiveComponentType = (id: string | null) => {
    return id as keyof typeof ComponentTypes;
  };

  const activeComponentType = getActiveComponentType(activeId);

  /**=========================================== */

  const { background, components } = layout;
  const snapToGrid = createSnapModifier(gridSize);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleEnd}
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
          <EditorMenu type={type} />
        </div>
        <ResizePreviewComponent />
      </div>
      <DragOverlay modifiers={[snapToGrid, restrictToWindowEdges]}>
        {activeId && activeComponentType ? (
          <button
            className={`w-11/12 px-4 py-3 text-left text-sm transition-colors flex items-center justify-between 
        border-solid border-black border-1 rounded-lg shadow-lg shadow-gray-400/50'
        hover:scale-105`}
          >
            <span className={'font-medium w-3/4'}>{activeComponentType}</span>
          </button>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Editor;
