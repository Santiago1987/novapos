import { useEffect, useRef, useState } from 'react';
import { useLayoutStore } from 'src/store/LayoutStore';

const useResize = () => {
  const { layout, selectedComponentId, modifyComponentDimensions } =
    useLayoutStore();

  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [resizeStarted, setResizeStarted] = useState(false);
  const [iniValues, setIniValues] = useState({ width: 0, height: 0 });
  const [text, setText] = useState('');

  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    if (selectedComponentId) {
      const comp = layout.components.find((b) => b.id === selectedComponentId);
      if (comp && comp.properties.size) {
        setDimensions({
          width: comp.properties.size.width.replace(/\D/g, ''),
          height: comp.properties.size.height.replace(/\D/g, ''),
        });
        setPosition({
          x: comp.properties.position.x || 0,
          y: comp.properties.position.y || 0,
        });
        setText(comp.properties.text || '');
      }
    }
  }, [selectedComponentId]);

  const handlePointerDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    //console.log('handlePointerDown');
    if (isResizing) return;
    setIsResizing(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    setDimensions({
      width: iniValues.width.toString(),
      height: iniValues.height.toString(),
    });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handleMauseUp);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isResizing) return;

    console.log('handlePointerMove', e.clientX, startX.current);

    const deltaX = +e.clientX - startX.current;
    const deltaY = +e.clientY - startY.current;
    setDimensions({
      width: dimensions.width + deltaX,
      height: dimensions.height + deltaY,
    });
  };

  const handleMauseUp = () => {
    console.log('handleMauseUp');
    setIsResizing(false);
    if (selectedComponentId) {
      modifyComponentDimensions(
        selectedComponentId,
        dimensions.width + 'px',
        dimensions.height + 'px'
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
    setIniValues({ width: iniWidth, height: iniHeight });
  };

  const handleOnResizeEnd = () => {
    setResizeStarted(false);
    if (selectedComponentId) {
      modifyComponentDimensions(
        selectedComponentId,
        dimensions.width + 'px',
        dimensions.height + 'px'
      );
    }
    setIniValues({ width: 0, height: 0 });
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
