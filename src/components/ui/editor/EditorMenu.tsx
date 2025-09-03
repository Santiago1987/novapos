import { useLayoutStore } from 'src/store/LayoutStore';
import NewButton from './NewButton';
import { useState } from 'react';
import TextChange from './TextChange';
import ColorPicker from './ColorPicker';
import { DragVariant } from 'src/components/icons/SVGIcons';

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
  const { reset } = useLayoutStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleIsDragging = (dragging: boolean) => {
    setIsDragging(dragging);
  };

  return (
    <div
      className={`absolute flex flex-col justify-between items-center
                    z-50 min-w-[200px] w-3/12 h-6/12 text-black 
                    bg-white rounded-2xl border-solid border-2 border-gray-300
                    shadow-lg shadow-gray-400/50 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="relative flex flex-col justify-center items-center w-full gap-2">
        <div className="absolute top-1 right-1">
          <DragVariant height="25px" width="25px" />
        </div>
        <h1 className="p-1 text-2xl font-bold">Editor Menu</h1>
        <div
          className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
        >
          <NewButton handleIsDragging={handleIsDragging} />
        </div>
        {changeTextVisible && (
          <TextChange text={text} handleOnChangeText={handleOnChangeText} />
        )}
        {colorPickerVisible && (
          <ColorPicker handleOnColorChange={handleOnColorChange} />
        )}
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
