import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  label: string;
  width: string;
  height: string;
  risizeStarted: boolean;
  x: number;
  y: number;
  handlePointerDown: (e: React.MouseEvent) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handleMauseUp: () => void;
};

const ResizeComponent = ({
  risizeStarted,
  label,
  width,
  height,
  x,
  y,
  handlePointerDown,
  handlePointerMove,
  handleMauseUp,
}: Props) => {
  width = width === 'px' ? '1' : width;
  height = height === 'px' ? '1' : height;

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
          <label className="p-1 wrap-anywhere leading-5">{label}</label>
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

export default ResizeComponent;
