import { useLayoutStore } from 'src/store/LayoutStore';
import { useTraductionsStore } from 'src/store/TraductionStore';

const BodyBackgroundColorPicker = () => {
  const { layout, editLayoutBackground } = useLayoutStore();
  const { background, lang } = layout;
  const { t } = useTraductionsStore();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editLayoutBackground(e.target.value);
  };

  return (
    <>
      <h2 className="p1 text-xl">{t('salesBackgroundColor', lang)}</h2>
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
