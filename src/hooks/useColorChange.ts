import { useLayoutStore } from '@/store/LayoutStore';

const useColorChange = () => {
  const {
    selectedComponentId,
    componentActions: { updateButton },
    globalsActions: { setToggleGlobal },
  } = useLayoutStore();

  const handleOnClickColorChange = () => {
    setToggleGlobal('colorPickerVisible', true);
  };

  const handleOnBackgroundColorColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = e.target.value;
    if (selectedComponentId) {
      updateButton(selectedComponentId, {
        backgroundColor: color,
      });
    }
  };

  const handleOnTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (selectedComponentId) {
      updateButton(selectedComponentId, {
        textColor: color,
      });
    }
  };

  const handleOnCloseColorChange = () => {
    setToggleGlobal('colorPickerVisible', false);
  };

  return {
    handleOnClickColorChange,
    handleOnBackgroundColorColorChange,
    handleOnTextColorChange,
    handleOnCloseColorChange,
  };
};

export default useColorChange;
