import { useLayoutStore } from '@/store/LayoutStore';
import { useState } from 'react';
import ColorPicker from '@/components/ui/editor/ColorPicker';
import { useDraggable } from '@dnd-kit/core';
import BodyBackgroundColorPicker from '@/components/ui/editor/BodyBackgroundColorPicker';
import ResizeChangeComponent from '@/components/ui/editor/ResizeChangeComponent';
import TextChangeComponent from '@/components/ui/editor/TextChangeComponent';
import { useTraductionsStore } from '@/store/TraductionStore';
import EditorDragStars from '@/components/common/EditorDragStars';
import { useCustomerViewStore } from '@/store/CustomerViewStore';
import ComponentCB from './ComponentCB';

type Props = {
  type: 'CustomerView' | 'SalesView';
};

const EditorMenu = ({ type }: Props) => {
  const { reset, layout } = useLayoutStore();
  const [dragSart, setDragStart] = useState(false);
  const lang =
    type === 'CustomerView'
      ? useCustomerViewStore((state) => state.layout.lang)
      : useLayoutStore((state) => state.layout.lang);

  const { t } = useTraductionsStore();

  //EDITOR DRAGGING
  const { setNodeRef, transform, listeners, attributes, isDragging } =
    useDraggable({
      id: 'editor-manu',
    });

  const { x, y } = layout.editorMenu.position;
  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    left: x,
    top: y,
    touchAction: 'none',
  } as React.CSSProperties;
  //---------------------------------------------------

  const handleIsDragging = (dragging: boolean) => {
    setDragStart(dragging);
  };

  return (
    <div
      id="editorMenu"
      ref={setNodeRef}
      style={style}
      className={`absolute top-2 left-2 flex flex-col justify-between items-center
                    z-50 min-w-[200px] w-3/12 h-8/12 text-black 
                    bg-white rounded-2xl border-solid border-2
                    shadow-lg shadow-gray-400/50 ${dragSart ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="relative flex flex-col justify-center items-center w-full gap-2">
        <h1 className="p-1 text-2xl font-bold">{t('editorMenu', lang)}</h1>
        <BodyBackgroundColorPicker type={type} />
        <ComponentCB />
        <TextChangeComponent />
        <ColorPicker />
        <ResizeChangeComponent />
      </div>
      <button
        className="w-8/12 p-1 mb-1 bg-black text-white font-bold rounded-lg text-lg 
                  shadow-md shadow-gray-400/50"
        onClick={reset}
      >
        {t('resetLayout', lang)}
      </button>
      <EditorDragStars
        isDragging={isDragging}
        listeners={listeners}
        attributes={attributes}
      />
    </div>
  );
};

export default EditorMenu;
/*<NewButton handleIsDragging={handleIsDragging} lang={lang} />*/
