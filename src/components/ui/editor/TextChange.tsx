import { useLayoutStore } from '../../../store/LayoutStore';
const TextChange = () => {
  const { layout, selectedComponent, updateButton } = useLayoutStore();

  const handleOnChange = (text: string) => {
    if (!selectedComponent.id) return;
    updateButton(selectedComponent.id, { label: text });
  };

  const text = layout.components.buttons.find(
    (butt) => butt.id === selectedComponent.id
  )?.properties.label;

  return (
    <div
      className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
    >
      <div className="flex flex-col justify-evenly items-center w-11/12 h-full">
        <h2 className="p1 text-xl">Text Change</h2>
        <input
          type="text"
          className="w-11/12 h-8 border-solid border-2 border-gray-300 rounded-lg p-1"
          placeholder="Change button text..."
          onChange={(e) => handleOnChange(e.target.value)}
          value={text}
        />
      </div>
    </div>
  );
};

export default TextChange;
