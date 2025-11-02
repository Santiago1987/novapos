import { useLayoutStore } from 'src/store/LayoutStore';
import { useTraductionsStore } from 'src/store/TraductionStore';

const BodyBackgroundColorPicker = () => {
  const {
    layout,
    layoutActions: { editLayoutBackground },
  } = useLayoutStore();
  const { background, lang } = layout;
  const { t } = useTraductionsStore();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editLayoutBackground(e.target.value);
  };

  return (
    <>
      <div
        className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
      >
        <h2 className="p1 text-xl">{t('salesBackgroundColor', lang)}</h2>
        <input
          type="color"
          onChange={handleColorChange}
          className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
          value={background}
        />
      </div>
    </>
  );
};

export default BodyBackgroundColorPicker;
