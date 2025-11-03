import { useLayoutStore } from 'src/store/LayoutStore';
import NewButton from './NewButton';
import { useState } from 'react';
import ColorPicker from './ColorPicker';
import { DragVariant } from 'src/components/icons/SVGIcons';
import { useDraggable } from '@dnd-kit/core';
import BodyBackgroundColorPicker from './BodyBackgroundColorPicker';
import ResizeChangeComponent from './ResizeChangeComponent';
import TextChangeComponent from './TextChangeComponent';
import { Langs } from 'src/types/constTypes';
import { useTraductionsStore } from 'src/store/TraductionStore';

type Props = {
  lang: keyof typeof Langs;
};

const EditorMenu = ({ lang }: Props) => {
  const { reset, layout } = useLayoutStore();
  const [dragSart, setDragSart] = useState(false);

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
    setDragSart(dragging);
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
        <BodyBackgroundColorPicker />
        <NewButton handleIsDragging={handleIsDragging} lang={lang} />
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
    </div>
  );
};

export default EditorMenu;