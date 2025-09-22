import { useLayoutStore } from 'src/store/LayoutStore';

const BodyBackgroundColorPicker = () => {
  const { layout, editLayoutBackground } = useLayoutStore();
  const { background } = layout;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editLayoutBackground(e.target.value);
  };

  return (
    <>
      <h2 className="p1 text-xl">Sales backgraund color</h2>
      <input
        type="color"
        onChange={handleColorChange}
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={background}
      />
    </>
  );
};

export default BodyBackgroundColorPicker;
