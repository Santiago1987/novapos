import { useState, useEffect } from 'react';

type Props = {
  textLabel?: string;
};

const MainInput = ({ textLabel }: Props) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log('Component mounted or inputValue changed:', inputValue);
  }, [inputValue]);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setInputValue(ev.target.value);
  };
  return (
    <label>
      {textLabel}
      <input type="text" id="main-input" onChange={handleOnChange} />
    </label>
  );
};

export default MainInput;
