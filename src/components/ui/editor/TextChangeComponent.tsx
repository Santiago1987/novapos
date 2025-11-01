import { AnimatePresence, motion } from 'framer-motion';
import { Langs } from 'src/types/constTypes';
import { useTraductionsStore } from 'src/store/TraductionStore';
import useTextChange from 'src/hooks/useTextChange';
import { useLayoutStore } from 'src/store/LayoutStore';

const TextChangeComponent = () => {
  const { t } = useTraductionsStore();
  const {
    previewText,
    handleOnChangeText,
    handleOnConfirmTextChange,
    handleOnChangeLang,
  } = useTextChange();

  //Nunca desestructures objetos anidados directamente si esperas que sus propiedades internas activen re-renders.
  const changeTextVisible = useLayoutStore(
    (state) => state.globals.textEditorVisible
  );
  const lang = useLayoutStore((state) => state.layout.lang);

  return (
    <AnimatePresence>
      {changeTextVisible && (
        <motion.div
          className="flex flex-col justify-evenly items-center w-11/12 h-[140px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="flex flex-col justify-evenly items-center h-full w-full gap-1">
            <h2 className="p1 text-xl">{t('textChange', lang)}</h2>
            <div className="flex flex-row gap-1 w-full px-2">
              <select
                name="lang"
                className="w-1/4 border-2 border-gray-600 rounded-lg p-1"
                onChange={handleOnChangeLang}
              >
                {Object.keys(Langs).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="w-3/4 h-8 border-solid border-2 border-gray-600 rounded-lg p-1"
                placeholder="Change button text..."
                onChange={handleOnChangeText}
                value={previewText}
              />
            </div>
            <button
              className="w-8/12 p-1 bg-black text-white font-bold rounded-lg text-lg 
                  shadow-md shadow-gray-400/50"
              onClick={handleOnConfirmTextChange}
            >
              {t('confirm', lang)}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default TextChangeComponent;
