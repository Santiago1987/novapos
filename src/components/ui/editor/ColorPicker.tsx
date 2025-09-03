import { useLayoutStore } from '../../../store/LayoutStore';

type Props = {
  handleOnColorChange: (color: string) => void;
};
const ColorPicker = ({ handleOnColorChange }: Props) => {
  const { layout, selectedComponent } = useLayoutStore();
  /*const colors = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'stone',
    'neutral',
    'gray',
    'slate',
  ];
  const shades = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];*/

  const bgValue = layout.components.buttons.find(
    (butt) => butt.id === selectedComponent.id
  )?.properties.color;

  const textValue = layout.components.buttons.find(
    (butt) => butt.id === selectedComponent.id
  )?.properties.textColor;

  return (
    <div
      className="flex flex-col justify-evenly items-center w-11/12 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50 py-1"
    >
      <h2 className="p1 text-xl">Backgraund color</h2>
      <input
        type="color"
        onChange={(e) => handleOnColorChange(e.target.value)}
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={bgValue}
      />
      <h2 className="p1 text-xl">Text color</h2>
      <input
        type="color"
        value={textValue}
        onChange={(e) => handleOnColorChange(e.target.value)}
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
      />
    </div>
  );
};

export default ColorPicker;
