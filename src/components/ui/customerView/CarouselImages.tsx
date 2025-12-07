import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL_COLRYUT;

type Props = {
  id: string;
};

const CarouselImages = ({ id }: Props) => {
  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();

  const carouselComponent = layout.components[id];
  if (carouselComponent.type !== 'CAROUSEL_IMAGES') {
    return null;
  }
  const { imgFiles, properties } = carouselComponent;
  const { position, size } = properties;

  const [currectIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imgFiles.length < 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imgFiles]);

  const variants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <div
      className={`relative mx-auto overflow-hidden shadow-lg shadow-gray-400 rounded-lg 
        top-${position.y} left-${position.x} w-${size.width} h-${size.height}`}
      onClick={() => selectComponent(id)}
    >
      <AnimatePresence initial={false} custom={1}>
        <motion.img
          key={currectIndex}
          src={`${SERVER_URL}/csp/api/cusfil/${imgFiles[currectIndex]}`}
          alt={`Slide ${imgFiles[currectIndex]}`}
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

export default CarouselImages;
