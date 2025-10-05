import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useLayoutStore } from 'src/store/LayoutStore';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  gridSize: number;
};

const useEditor = ({ gridSize }: Props) => {
  //LAYOUT EDITOR
  const {
    layout,
    addButton,
    updateButton,
    selectedComponent,
    selectComponent,
    deleteButton,
    modifyEditorPosition,
    modifyButtonsDimensions,
  } = useLayoutStore();

  //VARIABLES
  const [changeTextVisible, setChangeTextVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  //DRAG END
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    // NEW BUTTON
    if (active.id === 'new-button') {
      const { x, y } = active.data.current?.position || { x: 0, y: 0 };
      addButton({
        id: uuidv4(),
        type: 'button',
        properties: {
          label: 'New Button',
          position: {
            mode: 'absolute',
            x: x - (x % gridSize),
            y: y - (y % gridSize),
          },
          size: { width: '150px', height: '50px' },
          color: '#3b82f6',
          textColor: '#ffffff',
          fontSize: 'text-lg',
          isClicked: false,
          miscStyles: 'rounded-lg shadow-md shadow-gray-400/50',
        },
      });
      return;
    }

    // POSITON OF A EXISTING BUTTON
    if (active.data.current?.type === 'button') {
      const component = layout.components.buttons.find(
        (butt) => butt.id === active.id
      );
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
  const handleSelectComponent = (id: string, type: 'buttons' | 'tables') => {
    setChangeTextVisible(false);
    setColorPickerVisible(false);
    if (selectedComponent.id === id) {
      selectComponent(null, 'buttons');
      return;
    }
    selectComponent(id, type);
  };

  //HANDEL COPY COMPONENT
  const handleCopyComponent = (id: string, type: 'buttons' | 'tables') => {
    const component = layout.components[type].find((comp) => comp.id === id);
    if (!component) return;
    if (type === 'buttons' && component.type === 'button') {
      const newButton = {
        ...component,
        id: uuidv4(),
        properties: {
          ...component.properties,
          position: {
            ...component.properties.position,
            x: (component.properties.position.x || 0) + 20,
            y: (component.properties.position.y || 0) + 20,
          },
        },
      };
      addButton(newButton);
    }
  };

  //DELETE COMPONENT
  const handleDeleteComponent = (id: string, type: 'buttons' | 'tables') => {
    if (type === 'buttons') {
      deleteButton(id);
      setChangeTextVisible(false);
    }
  };

  // CHANGE TEXT COMPONENT VISIBLE
  const handleOnClickTextChange = () => {
    setChangeTextVisible(!changeTextVisible);
    setColorPickerVisible(false);
  };

  // CONPONENT TEXT CHANGE
  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedComponent.id === null) return;
    updateButton(selectedComponent.id, { label: e.target.value });
  };

  // CHANGFE COLOR COMPONENT VISIBLE
  const handleOnClickColorChange = () => {
    setChangeTextVisible(false);
    setColorPickerVisible(!colorPickerVisible);
  };

  // COMPONENT COLOR CHANGE EVENT
  const handleOnColorChange = (color: string, type: 'text' | 'background') => {
    if (!selectedComponent.id) return;
    if (type === 'text') {
      updateButton(selectedComponent.id, { textColor: color });
    }
    if (type === 'background') {
      updateButton(selectedComponent.id, { color: color });
    }
  };

  // COMPONENT RISIZE BUTONS
  const handleOnResizeEnd = (width: string, height: string) => {
    if (!selectedComponent.id) return;
    modifyButtonsDimensions(selectedComponent.id, width, height);
  };

  const text = layout.components['buttons'].find(
    (elem) => elem.id === selectedComponent.id
  )?.properties.label;

  return {
    changeTextVisible,
    colorPickerVisible,
    layout,
    selectedComponent,
    text,
    handleDragEnd,
    handleSelectComponent,
    handleCopyComponent,
    handleDeleteComponent,
    handleOnClickTextChange,
    handleOnClickColorChange,
    handleOnColorChange,
    handleOnChangeText,
    handleOnResizeEnd,
  };
};

export default useEditor;
