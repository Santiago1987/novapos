import { useLayoutStore } from '../../../store/LayoutStore';
import { AnimatePresence, motion } from 'framer-motion';
import useColorChange from '../../../hooks/useColorChange';
import { useTraductionsStore } from 'src/store/TraductionStore';

const ColorPicker = () => {
  const { layout, selectedComponentId } = useLayoutStore();
  const {
    handleOnBackgroundColorColorChange,
    handleOnTextColorChange,
    handleOnCloseColorChange,
  } = useColorChange();
  const { t } = useTraductionsStore();
  const lang = useLayoutStore((state) => state.layout.lang);
  const colorPickerVisible = useLayoutStore(
    (state) => state.globals.colorPickerVisible
  );

  const bgValue = selectedComponentId
    ? layout.components[selectedComponentId]?.properties.backgroundColor ||
      '#ffffff'
    : '#ffffff';

  const textValue = selectedComponentId
    ? layout.components[selectedComponentId]?.properties.textColor || '#000000'
    : '#000000';

  return (
    <AnimatePresence>
      {colorPickerVisible && (
        <motion.div
          className="flex flex-col justify-evenly items-center w-11/12 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50 py-1"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <h2 className="p1 text-xl">{t('backgroundColor', lang)}</h2>
          <input
            type="color"
            onChange={handleOnBackgroundColorColorChange}
            className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
            value={bgValue}
          />
          <h2 className="p1 text-xl">{t('textColor', lang)}</h2>
          <input
            type="color"
            value={textValue}
            onChange={handleOnTextColorChange}
            className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
          />
          <button
            className="w-11/12 h-10 bg-blue-500 text-white rounded-lg mt-2"
            onClick={handleOnCloseColorChange}
          >
            {t('close', lang)}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorPicker;

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
