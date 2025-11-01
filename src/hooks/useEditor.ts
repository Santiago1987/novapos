import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useLayoutStore } from 'src/store/LayoutStore';
import { v4 as uuidv4 } from 'uuid';
import { useTraductionsStore } from 'src/store/TraductionStore';

type Props = {
  gridSize: number;
};

const useEditor = ({ gridSize }: Props) => {
  //LAYOUT EDITOR
  const {
    layout,
    componentActions: { addComponent, updateButton, deleteComponent },
    selectedComponentId,
    editorActions: { selectComponent, modifyEditorPosition },
  } = useLayoutStore();

  //VARIABLES
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const { removeTraduction, updateTraduction } = useTraductionsStore();

  //DRAG END
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    // NEW BUTTON
    if (active.id === 'new-button') {
      const { x, y } = active.data.current?.position || { x: 0, y: 0 };
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
      return;
    }

    // POSITON OF A EXISTING BUTTON
    if (active.data.current?.type === 'button') {
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
    }

    //EDITO MENU POSITION
    if (active.id === 'editor-manu') {
      if (!delta) return;
      const { x: EditorX, y: EditorY } = layout.editorMenu.position;
      const { x, y } = delta;

      const newX = (EditorX || 0) + x;
      const newY = (EditorY || 0) + y;

      modifyEditorPosition(newX, newY);
    }
  };

  //SELECT COMPONENT
  const handleSelectComponent = (id: string) => {
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
  };

  return {
    colorPickerVisible,
    layout,
    selectedComponentId,
    handleDragEnd,
    handleSelectComponent,
    handleCopyComponent,
    handleDeleteComponent,
    handleOnClickColorChange,
    handleOnColorChange,
  };
};

export default useEditor;
