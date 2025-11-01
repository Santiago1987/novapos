import { useState } from 'react';
import { Langs } from 'src/types/constTypes';
import { useLayoutStore } from 'src/store/LayoutStore';
import { useTraductionsStore } from 'src/store/TraductionStore';

type LangsType = keyof typeof Langs;

const useTextChange = () => {
  const [previewText, setPreviewText] = useState<string>('');
  const [lang, setLang] = useState<LangsType>('EN');
  const {
    //componentActions: { updateButton },
    selectedComponentId,
    globalsActions,
  } = useLayoutStore();
  const { updateTraduction } = useTraductionsStore();

  // CHANGE TEXT COMPONENT VISIBLE
  const handleOnClickTextChange = () => {
    globalsActions.setToggleGlobal('textEditorVisible', true);
  };

  const handleOnChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lan = e.target.value as keyof typeof Langs;
    setLang(lan);
    setPreviewText('');
  };

  // CONPONENT TEXT CHANGE
  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedComponentId) return;
    const text = e.target.value;
    //updateTraduction(selectedComponentId, text, lang);
    setPreviewText(text);
  };

  const handleOnConfirmTextChange = () => {
    globalsActions.setToggleGlobal('textEditorVisible', false);
    if (!selectedComponentId) return;
    updateTraduction(selectedComponentId, previewText, lang);
  };

  return {
    previewText,
    handleOnClickTextChange,
    handleOnChangeText,
    handleOnConfirmTextChange,
    handleOnChangeLang,
  };
};

export default useTextChange;
