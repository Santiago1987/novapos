import stellaVideo from '@/assets/stella.mp4';
import pepsiVideo from '@/assets/pepsi.mp4';
import { useEffect, useRef, useState } from 'react';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useCustomerViewStore } from '@/store/CustomerViewStore';

type Props = {
  id: string;
};

const CarouselVideos = ({ id }: Props) => {
  const videos = [stellaVideo, pepsiVideo];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    status: { emptyticket },
  } = useSalesDataStore();

  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();
  const carouselComponent = layout.components[id];
  if (carouselComponent.type !== 'CAROUSEL_VIDEOS') {
    return null;
  }

  const { isScreensaver, properties } = carouselComponent;
  const { position, size } = properties;

  const screensaverActive = isScreensaver ? emptyticket : true;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      goToNext();
    };

    video.addEventListener('ended', handleVideoEnd);

    video.src = videos[currentIndex];
    video.load();
    video.play().catch((e) => console.warn('Error on video: ', e));

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [screensaverActive, currentIndex]);

  return (
    <div
      className={`flex items-center justify-center mx-auto overflow-hidden shadow-lg shadow-gray-400
    bg-black border rounded-xl top-${position.y} left-${position.x} w-${size.width} h-${size.height}`}
      onClick={() => selectComponent(id)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-center"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default CarouselVideos;
