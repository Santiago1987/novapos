import { useLayoutStore } from '../../../store/LayoutStore';

type Props = {
  handleOnColorChange: (color: string, type: 'text' | 'background') => void;
};
const ColorPicker = ({ handleOnColorChange }: Props) => {
  const { layout, selectedComponentId } = useLayoutStore();
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

  const bgValue = layout.components.find(
    (butt) => butt.id === selectedComponentId
  )?.properties.backgroundColor;

  const textValue = layout.components.find(
    (butt) => butt.id === selectedComponentId
  )?.properties.textColor;

  return (
    <>
      <h2 className="p1 text-xl">Backgraund color</h2>
      <input
        type="color"
        onChange={(e) => handleOnColorChange(e.target.value, 'background')}
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={bgValue}
      />
      <h2 className="p1 text-xl">Text color</h2>
      <input
        type="color"
        value={textValue}
        onChange={(e) => handleOnColorChange(e.target.value, 'text')}
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
      />
    </>
  );
};

export default ColorPicker;
