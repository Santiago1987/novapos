import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomerCorousel = () => {
  const images = [
    'src/assets/bife-chorizo.webp',
    'src/assets/cerveza1.webp',
    'src/assets/cerveza2.webp',
    'src/assets/papas-fritas.webp',
    'src/assets/Vinos1.webp',
  ];

  const [currectIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <div className="relative w-full h-full max-w-4xl mx-auto overflow-hidden shadow-lg shadow-gray-400">
      <AnimatePresence initial={false} custom={1}>
        <motion.img
          key={currectIndex}
          src={images[currectIndex]}
          alt={`Slide ${currectIndex + 1}`}
          className="absolute w-full h-full object-fill aspect-square
          rounded-lg"
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default CustomerCorousel;
