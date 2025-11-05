import { useRef } from 'react';
import { useLayoutStore } from '@/store/LayoutStore';
import { useResizeStore } from '@/store/ResizeStore';

const useResize = () => {
  const {
    layout,
    selectedComponentId,
    componentActions: { updateButton },
    globalsActions: { setToggleGlobal },
  } = useLayoutStore();

  const { position, dimensions, setDimensions, setPosition } = useResizeStore();

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
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isResizing.current) return;

    const deltaX = +e.clientX - startX.current;
    const deltaY = +e.clientY - startY.current;

    const newWidth = initialWidth.current + deltaX;
    const newHeight = initialHeight.current + deltaY;

    const width = `${Math.max(newWidth, 50)}px`;
    const height = `${Math.max(newHeight, 25)}px`;

    setDimensions(width, height);
  };

  const handleMauseUp = () => {
    isResizing.current = false;
    if (selectedComponentId) {
      updateButton(selectedComponentId, {
        size: {
          width: dimensions.width,
          height: dimensions.height,
        },
      });
    }
  };

  const handleOnResizeManualChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'width' | 'height'
  ) => {
    const value = e.target.value.replace(/\D/g, '');
    if (type === 'width') {
      setDimensions(value + 'px', dimensions.height);
    } else {
      setDimensions(dimensions.width, value + 'px');
    }
  };

  const handleResizeStart = (iniWidth: number, iniHeight: number) => {
    setToggleGlobal('resizeStarted', true);
    initialHeight.current = iniHeight;
    initialWidth.current = iniWidth;
    if (selectedComponentId) {
      const comp = layout.components[selectedComponentId];
      const width = comp.properties.size.width.replace(/\D/g, '') + 'px';
      const height = comp.properties.size.height.replace(/\D/g, '') + 'px';

      if (comp && comp.properties.size) {
        setDimensions(width, height);
        setPosition(
          comp.properties.position.x || 0,
          comp.properties.position.y || 0
        );
      }
    }
  };

  const handleOnResizeEnd = () => {
    setToggleGlobal('resizeStarted', false);
    if (selectedComponentId) {
      updateButton(selectedComponentId, {
        size: {
          width: dimensions.width,
          height: dimensions.height,
        },
      });
    }
    setDimensions('1px', '1px');
  };

  return {
    isResizing,
    dimensions,
    position,
    handlePointerDown,
    handleResizeStart,
    handleOnResizeManualChange,
    handleOnResizeEnd,
    handlePointerMove,
    handleMauseUp,
  };
};

export default useResize;
