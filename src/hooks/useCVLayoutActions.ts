import { useCustomerViewStore } from '@/store/CustomerViewStore';
import type { ComponentTypes } from '@/types/constTypes';
import { v4 as uuidv4 } from 'uuid';

const useCVLayoutActions = () => {
  const {
    layout,
    componentActions: { addComponent },
    editorActions: { modifyEditorPosition },
  } = useCustomerViewStore();

  const createNewComponent = ({
    position,
    gridSize,
    componentType,
  }: {
    position: { x: number; y: number };
    gridSize: number;
    componentType: keyof typeof ComponentTypes;
  }) => {
    const salesEditorFuntions = {
      BUTTON: () => {},
      SALES_TABLE: addNewSalesTable,
      PAYMENTS_TABLE: () => {},
      PROMOTIONS_TABLE: () => {},
      TOTALS_COMPONENT: () => {},
      LABEL: () => {},
      INPUT: () => {},
      CAROUSEL_IMAGES: addNewCarouselImages,
      CAROUSEL_VIDEOS: () => {},
      OPERATOR: () => {},
      LOGO: () => {},
    };
    if (!componentType) return;
    salesEditorFuntions[componentType](
      { x: position.x, y: position.y },
      gridSize
    );
  };

  //EDITOR MENU
  const changeEditorMenuPosition = (x: number, y: number) => {
    const { x: EditorX, y: EditorY } = layout.editorMenu.position;

    const newX = (EditorX || 0) + x;
    const newY = (EditorY || 0) + y;

    modifyEditorPosition(newX, newY);
  };

  //SALES TABLE
  const addNewSalesTable = (
    position: { x: number; y: number },
    gridSize: number
  ) => {
    const { x, y } = position || { x: 0, y: 0 };
    const newID = uuidv4();

    addComponent(newID, {
      id: newID,
      type: 'SALES_TABLE',
      properties: {
        position: {
          x: x - (x % gridSize),
          y: y - (y % gridSize),
        },
        size: { width: '500px', height: '500px' },
      },
    });
  };

  //IMAGE CAROUSEL
  const addNewCarouselImages = (
    position: { x: number; y: number },
    gridSize: number
  ) => {
    const { x, y } = position || { x: 0, y: 0 };
    const newID = uuidv4();
    addComponent(newID, {
      id: newID,
      imgFiles: [],
      type: 'CAROUSEL_IMAGES',
      properties: {
        position: {
          x: x - (x % gridSize),
          y: y - (y % gridSize),
        },
        size: { width: '500px', height: '500px' },
        backgroundColor: '#E0D8D7',
      },
    });
  };
  return { createNewComponent, changeEditorMenuPosition };
};

export default useCVLayoutActions;
