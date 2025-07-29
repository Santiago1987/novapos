import { useState, useEffect } from 'react';
const MainInput = () => {
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
      Main input
      <input type="text" onChange={handleOnChange} />
    </label>
  );
};

export default MainInput;
