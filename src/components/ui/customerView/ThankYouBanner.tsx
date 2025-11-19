import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  display: boolean;
};

const ThankYouBanner = ({ display }: Props) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTraductionsStore();
  const lang = useLayoutStore((state) => state.layout.lang);

  useEffect(() => {
    const showBanner = setTimeout(() => {
      setVisible(true);
    }, 1000);

    const hideBanner = setTimeout(() => {
      setVisible(false);
    }, 7000);

    return () => {
      clearTimeout(showBanner);
      clearTimeout(hideBanner);
    };
  }, [display]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.9 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // ease-out-cubic suave
          }}
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div
            className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-20 py-12 rounded-2xl 
          shadow-2xl items-center gap-3 backdrop-blur-sm border border-white/20 inline-flex"
          >
            <span className="text-8xl font-bold tracking-wide whitespace-nowrap">
              {`${t('thankyoumessage', lang)} `}
              <motion.span
                className="inline-block"
                animate={{
                  scale: [1, 1.4, 1.4, 1, 1],
                  opacity: [1, 0.8, 1, 1, 0.8],
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                {`✨`}
              </motion.span>
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 origin-left"
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouBanner;
