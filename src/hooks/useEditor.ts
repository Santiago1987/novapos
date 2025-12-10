import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useLayoutStore } from '@/store/LayoutStore';
import { v4 as uuidv4 } from 'uuid';
import { useTraductionsStore } from '@/store/TraductionStore';
import { useCustomerViewStore } from '@/store/CustomerViewStore';
import useCVLayoutActions from './useCVLayoutActions';

type Props = {
  gridSize: number;
  type: 'CustomerView' | 'SalesView';
};

const useEditor = ({ gridSize, type }: Props) => {
  //LAYOUT EDITOR
  /*const {
    layout,
    componentActions: { addComponent, updateButton, deleteComponent },
    selectedComponentId,
    editorActions: { selectComponent, modifyEditorPosition },
  } = useLayoutStore();*/

  const { changeEditorMenuPosition, createNewComponent } = useCVLayoutActions();

  //VARIABLES
  //const [colorPickerVisible, setColorPickerVisible] = useState(false);

  //const { removeTraduction } = useTraductionsStore();

  //DRAG END
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const { x, y } = active.data.current?.position || { x: 0, y: 0 };

    if (type === 'CustomerView') {
      if (active.id === 'CAROUSEL_IMAGES') {
        createNewComponent({
          position: { x, y },
          gridSize,
          componentType: 'CAROUSEL_IMAGES',
        });
        return;
      }
      if (active.id === 'SALES_TABLE') {
        createNewComponent({
          position: { x, y },
          gridSize,
          componentType: 'SALES_TABLE',
        });
        return;
      }
    }

    // NEW BUTTON
    if (active.id === 'new-button' && type === 'SalesView') {
      const { x, y } = active.data.current?.position || { x: 0, y: 0 };
      createNewComponent({
        position: { x, y },
        gridSize,
        componentType: 'BUTTON',
      });
      return;
    }

    // POSITON OF A EXISTING BUTTON
    /*if (active.data.current?.type === 'button') {
      const component = layout.components[active.id];
      if (!component) return;
      if (!delta) return;
      const { x, y } = delta;

      const newX = (component.properties.position.x || 0) + x;
      const newY = (component.properties.position.y || 0) + y;

      updateButton(component.id, {
        position: {
          ...component.properties.position,
          x: newX,
          y: newY,
        },
      });
      return;
    }*/

    //EDITO MENU POSITION
    if (active.id === 'editor-menu') {
      if (!delta) return;
      const { x, y } = delta;

      changeEditorMenuPosition(x, y);
      return;
    }
  };

  //SELECT COMPONENT
  /*const handleSelectComponent = (id: string) => {
    setColorPickerVisible(false);
    if (selectedComponentId === id) {
      selectComponent(null);
      return;
    }
    selectComponent(id);
  };

  //HANDEL COPY COMPONENT
  const handleCopyComponent = (id: string) => {
    const component = layout.components[id];
    if (!component) return;
    if (component.type !== 'BUTTON') return;

    const newID = uuidv4();
    const newComponent = {
      ...component,
      id: newID,
      properties: {
        ...component.properties,
        position: {
          ...component.properties.position,
          x: (component.properties.position.x || 0) + 20,
          y: (component.properties.position.y || 0) + 20,
        },
      },
    };
    addComponent(newID, newComponent);
  };

  //DELETE COMPONENT
  const handleDeleteComponent = (id: string) => {
    deleteComponent(id);
    removeTraduction(id);
  };

  // CHANGFE COLOR COMPONENT VISIBLE
  const handleOnClickColorChange = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  // COMPONENT COLOR CHANGE EVENT
  const handleOnColorChange = (color: string, type: 'text' | 'background') => {
    if (!selectedComponentId) return;
    if (type === 'text') {
      updateButton(selectedComponentId, { textColor: color });
    }
    if (type === 'background') {
      updateButton(selectedComponentId, { backgroundColor: color });
    }
  };*/

  return {
    //colorPickerVisible,
    //selectedComponentId,
    handleDragEnd,
    //handleSelectComponent,
    //handleCopyComponent,
    //handleDeleteComponent,
    //handleOnClickColorChange,
    //handleOnColorChange,
  };
};

export default useEditor;
