import stellaVideo from '@/assets/stella.mp4';
import pepsiVideo from '@/assets/pepsi.mp4';
import { useEffect, useRef, useState } from 'react';

type Props = {
  screensaverActive: boolean | null | undefined;
};

const CustomerVideo = ({ screensaverActive }: Props) => {
  const videos = [stellaVideo, pepsiVideo];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      className="flex items-center justify-center w-full h-full max-w-4xl mx-auto overflow-hidden shadow-lg shadow-gray-400
    bg-black border rounded-xl"
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

export default CustomerVideo;
