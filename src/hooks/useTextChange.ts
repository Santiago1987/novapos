import { useState } from 'react';
import { Langs } from 'src/types/constTypes';

type LangsType = keyof typeof Langs;

const useTextChange = () => {
  const [text, setText] = useState('');
  const [changeTextVisible, setChangeTextVisible] = useState(false);
  const [lang, setLang] = useState<LangsType>('EN');

  // CHANGE TEXT COMPONENT VISIBLE
  const handleOnClickTextChange = (initext: string) => {
    setChangeTextVisible(!changeTextVisible);
    setText(initext);
  };

  const handleChangeLang = (newLang: LangsType) => {
    setLang(newLang);
  };

  // CONPONENT TEXT CHANGE
  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return {
    text,
    lang,
    changeTextVisible,
    handleOnClickTextChange,
    handleOnChangeText,
    handleChangeLang,
  };
};

export default useTextChange;
