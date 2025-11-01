import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutStore } from 'src/store/LayoutStore';
import { useTraductionsStore } from 'src/store/TraductionStore';
import useResize from 'src/hooks/useResize';

const ResizeChangeComponent = () => {
  const { t } = useTraductionsStore();
  const { dimensions, handleOnResizeManualChange, handleOnResizeEnd } =
    useResize();

  const resizeStarted = useLayoutStore((state) => state.globals.resizeStarted);
  const lang = useLayoutStore((state) => state.layout.lang);

  return (
    <AnimatePresence>
      {resizeStarted && (
        <motion.div
          className="flex flex-col justify-evenly items-center w-11/12 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50 py-1"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="p1 text-xl">{t('dimensionsSett', lang)}</div>
          <label>{t('width', lang)}</label>
          <input
            type="text"
            className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
            value={dimensions.width}
            onChange={(e) => handleOnResizeManualChange(e, 'width')}
          />
          <label>{t('height', lang)}</label>
          <input
            type="text"
            className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
            value={dimensions.height}
            onChange={(e) => handleOnResizeManualChange(e, 'height')}
          />
          <button
            className="w-11/12 h-10 bg-blue-500 text-white rounded-lg mt-2"
            onClick={handleOnResizeEnd}
          >
            {t('close', lang)}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResizeChangeComponent;
