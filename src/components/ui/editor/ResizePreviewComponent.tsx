import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutStore } from 'src/store/LayoutStore';
import useResize from 'src/hooks/useResize';

const ResizePreviewComponent = () => {
  const {
    position,
    dimensions,
    handlePointerDown,
    handlePointerMove,
    handleMauseUp,
  } = useResize();
  const { x, y } = position;
  const { width, height } = dimensions;
  const risizeStarted = useLayoutStore((state) => state.globals.resizeStarted);

  return (
    <AnimatePresence>
      {risizeStarted && (
        <motion.div
          className="absolute flex justify-center items-center border-2 border-dashed border-gray-400 "
          style={{
            width,
            height,
            left: x,
            top: y,
          }}
          animate={{ width, height }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              background: 'gray',
              cursor: 'se-resize',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handleMauseUp}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResizePreviewComponent;
