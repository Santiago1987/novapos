import { useLayoutStore } from 'src/store/LayoutStore';
import NewButton from './NewButton';
import { useState } from 'react';
import TextChange from './TextChange';
import ColorPicker from './ColorPicker';
import { DragVariant } from 'src/components/icons/SVGIcons';
import { AnimatePresence, motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';

type Props = {
  changeTextVisible: boolean;
  colorPickerVisible: boolean;
  text: string;
  handleOnColorChange: (color: string, type: 'text' | 'background') => void;
  handleOnChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditorMenu = ({
  changeTextVisible,
  colorPickerVisible,
  text,
  handleOnColorChange,
  handleOnChangeText,
}: Props) => {
  const { reset, layout } = useLayoutStore();
  const [dragSart, setDragSart] = useState(false);
  const { setNodeRef, transform, listeners, attributes, isDragging } =
    useDraggable({
      id: 'editor-manu',
    });

  const handleIsDragging = (dragging: boolean) => {
    setDragSart(dragging);
  };

  const { x, y } = layout.editorMenu.position;
  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    left: x,
    top: y,
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <div
      id="editorMenu"
      ref={setNodeRef}
      style={style}
      className={`absolute top-2 left-2 flex flex-col justify-between items-center
                    z-50 min-w-[200px] w-3/12 h-6/12 text-black 
                    bg-white rounded-2xl border-solid border-2 border-gray-300
                    shadow-lg shadow-gray-400/50 ${dragSart ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="relative flex flex-col justify-center items-center w-full gap-2">
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
        <div {...attributes} {...listeners} className="absolute top-1 left-1">
          <DragVariant
            height="25px"
            width="25px"
            cursor={isDragging ? 'grabbing' : 'grab'}
          />
        </div>
        <h1 className="p-1 text-2xl font-bold">Editor Menu</h1>
        <div
          className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
        >
          <NewButton handleIsDragging={handleIsDragging} />
        </div>
        <AnimatePresence>
          {changeTextVisible && (
            <motion.div
              className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <TextChange text={text} handleOnChangeText={handleOnChangeText} />
            </motion.div>
          )}

          {colorPickerVisible && (
            <motion.div
              className="flex flex-col justify-evenly items-center w-11/12 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50 py-1"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <ColorPicker handleOnColorChange={handleOnColorChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        className="w-8/12 p-1 mb-1 bg-black text-white font-bold rounded-lg text-lg 
                  shadow-md shadow-gray-400/50"
        onClick={reset}
      >
        Reset
      </button>
      <div className="absolute bottom-1 left-1">
        <DragVariant
          cursor={isDragging ? 'grabbing' : 'grab'}
          {...attributes}
          {...listeners}
          height="25px"
          width="25px"
        />
      </div>
      <div className="absolute bottom-1 right-1">
        <DragVariant
          {...attributes}
          {...listeners}
          cursor={isDragging ? 'grabbing' : 'grab'}
          height="25px"
          width="25px"
        />
      </div>
    </div>
  );
};

export default EditorMenu;
