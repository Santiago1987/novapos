import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import { v4 as uuidv4 } from 'uuid';
import type { ComponentTypes } from '@/types/constTypes';

type Parameters = {
  position: { x: number; y: number };
  gridSize: number;
  layoutType: 'CustomerView' | 'SalesView';
  componentType: keyof typeof ComponentTypes;
};

const createNewComponent = ({
  position,
  gridSize,
  layoutType,
  componentType,
}: Parameters) => {
  if (layoutType === 'CustomerView') {
    const salesEditorFuntions = {
      BUTTON: addNewButton,
      SALES_TABLE: () => {},
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
  }
};

const addNewButton = (position: { x: number; y: number }, gridSize: number) => {
  const {
    componentActions: { addComponent },
  } = useLayoutStore();
  const { updateTraduction } = useTraductionsStore();
  const { x, y } = position || { x: 0, y: 0 };
  const newID = uuidv4();
  addComponent(newID, {
    id: newID,
    type: 'BUTTON',
    properties: {
      text: 'NewButton',
      position: {
        x: x - (x % gridSize),
        y: y - (y % gridSize),
      },
      size: { width: '150px', height: '50px' },
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      fontSize: 'text-lg',
      className: 'rounded-lg shadow-md shadow-gray-400/50',
    },
  });
  updateTraduction(newID, 'New Button', 'EN');
};

const addNewCarouselImages = (
  position: { x: number; y: number },
  gridSize: number
) => {
  const {
    componentActions: { addComponent },
  } = useCustomerViewStore();
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
export default createNewComponent;
