import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import videoFile from '@/assets/coca-cola.mp4';

type Props = {
  isEmpty: boolean | undefined;
};

const CustomerScreensaver = ({ isEmpty }: Props) => {
  const [screensaverActive, setScreensaverActive] = useState(false);
  const inactivityTimeout = 8000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isEmpty || isEmpty === undefined) {
      timer = setTimeout(() => {
        setScreensaverActive(true);
      }, inactivityTimeout);
    }

    return () => {
      console.log('timeout juira');
      clearTimeout(timer);
    };
  }, [isEmpty]);

  const screensaverVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {screensaverActive && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center
        justify-center bg-black"
            variants={screensaverVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <video
              className="w-full h-full object-cover"
              ref={(video) => {
                if (video) {
                  screensaverActive ? video.play() : video.pause();
                }
              }}
              src={videoFile}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerScreensaver;
