import { useState } from 'react';
import { Langs } from 'src/types/constTypes';
import { useLayoutStore } from 'src/store/LayoutStore';
import { useTraductionsStore } from 'src/store/TraductionsStore';

type LangsType = keyof typeof Langs;

const useTextChange = () => {
  const [text, setText] = useState('');
  const [changeTextVisible, setChangeTextVisible] = useState(false);
  const [lang, setLang] = useState<LangsType>('EN');
  const { updateButton, selectedComponentId } = useLayoutStore();
  const { updateTraduction } = useTraductionsStore();

  // CHANGE TEXT COMPONENT VISIBLE
  const handleOnClickTextChange = (initext: string) => {
    setChangeTextVisible(!changeTextVisible);
    setText(initext);
  };

  const handleOnChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lan = e.target.value as keyof typeof Langs;
    setLang(lan);
  };

  // CONPONENT TEXT CHANGE
  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnConfirmTextChange = () => {
    setChangeTextVisible(false);
    if (!selectedComponentId) return;
    updateButton(selectedComponentId, { text });
    updateTraduction(selectedComponentId, text, lang);
  };

  return {
    text,
    lang,
    changeTextVisible,
    handleOnClickTextChange,
    handleOnChangeText,
    handleOnConfirmTextChange,
    handleOnChangeLang,
  };
};

export default useTextChange;
