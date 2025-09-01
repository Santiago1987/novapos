import { useDraggable } from '@dnd-kit/core';
import { useLayoutStore } from '../../store/LayoutStore';

const EditorMenu = () => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: 'new-button',
      data: {
        position: document
          .getElementById('new-button')
          ?.getBoundingClientRect(),
      },
    });
  const { reset } = useLayoutStore();

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    cursor: 'grab',
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <div
      className={`absolute flex flex-col justify-between items-center gap-1
                    z-50 top-1 right-1 min-w-[200px] w-2/12 h-11/12 text-black 
                    bg-white rounded-2xl border-solid border-2 border-gray-300
                    shadow-lg shadow-gray-400/50 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="flex flex-col justify-center items-center w-full gap-1">
        <h1 className="p-1 text-2xl font-bold">Editor Menu</h1>
        <div
          className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg"
        >
          <h2 className="p-1 text-xl">New Button</h2>
          <button
            id="new-button"
            className="w-[150px] h-[50px] p-1 bg-blue-500 text-white rounded-lg 
                    shadow-md shadow-gray-400/50 text-lg"
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
          >
            Drag me
          </button>
        </div>
      </div>
      <button
        className="w-11/12 p-1 mb-1 bg-black text-white font-bold rounded-lg text-lg 
                  shadow-md shadow-gray-400/50"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default EditorMenu;
