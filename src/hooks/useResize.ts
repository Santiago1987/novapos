import { useRef, useState } from 'react';
import { useLayoutStore } from 'src/store/LayoutStore';

const useResize = () => {
  const { layout, selectedComponentId, modifyComponentDimensions } =
    useLayoutStore();

  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [resizeStarted, setResizeStarted] = useState(false);
  const [text, setText] = useState('');

  const startX = useRef(0);
  const startY = useRef(0);
  const isResizing = useRef(false);
  const initialWidth = useRef(0);
  const initialHeight = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    console.log('handlePointerDown');

    e.currentTarget.setPointerCapture(e.pointerId);

    startX.current = e.clientX;
    startY.current = e.clientY;
    initialWidth.current = Number(dimensions.width.replace('px', ''));
    initialHeight.current = Number(dimensions.height.replace('px', ''));

    isResizing.current = true;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handleMauseUp);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isResizing.current) return;

    const deltaX = +e.clientX - startX.current;
    const deltaY = +e.clientY - startY.current;

    const newWidth = initialWidth.current + deltaX;
    const newHeight = initialHeight.current + deltaY;

    setDimensions({
      width: `${Math.max(newWidth, 50)}px`,
      height: `${Math.max(newHeight, 25)}px`,
    });
  };

  const handleMauseUp = () => {
    isResizing.current = false;
    if (selectedComponentId) {
      modifyComponentDimensions(
        selectedComponentId,
        dimensions.width,
        dimensions.height
      );
    }

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handleMauseUp);
  };

  const handleOnResizeManualChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'width' | 'height'
  ) => {
    const value = e.target.value.replace(/\D/g, '');
    if (type === 'width') {
      setDimensions((prev) => ({ ...prev, width: value }));
    } else {
      setDimensions((prev) => ({ ...prev, height: value }));
    }
  };

  const handleResizeStart = (iniWidth: number, iniHeight: number) => {
    setResizeStarted(!resizeStarted);
    initialHeight.current = iniHeight;
    initialWidth.current = iniWidth;
    if (selectedComponentId) {
      const comp = layout.components.find((b) => b.id === selectedComponentId);
      if (comp && comp.properties.size) {
        setDimensions({
          width: comp.properties.size.width.replace(/\D/g, '') + 'px',
          height: comp.properties.size.height.replace(/\D/g, '') + 'px',
        });
        setPosition({
          x: comp.properties.position.x || 0,
          y: comp.properties.position.y || 0,
        });
        setText(comp.properties.text || '');
      }
    }
  };

  const handleOnResizeEnd = () => {
    setResizeStarted(false);
    if (selectedComponentId) {
      modifyComponentDimensions(
        selectedComponentId,
        dimensions.width,
        dimensions.height
      );
    }
    setText('');
    setDimensions({ width: '', height: '' });
  };

  return {
    isResizing,
    dimensions,
    resizeStarted,
    position,
    text,
    handlePointerDown,
    handleResizeStart,
    handleOnResizeManualChange,
    handleOnResizeEnd,
    handlePointerMove,
    handleMauseUp,
  };
};

export default useResize;
