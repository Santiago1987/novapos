import { useState, useEffect } from 'react';

type Props = {
  textLabel?: string;
};

const MainInput = ({ textLabel }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    //console.log('Component mounted or inputValue changed:', inputValue);
  }, [inputValue]);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setInputValue(ev.target.value);
  };
  return (
    <div className="flex flex-col gap-1 text-green-800">
      <div className="flex flex-col">
        <label
          className="text-xm ml-1 font-bold p-0.5 text-xl"
          htmlFor="main-input"
        >
          {textLabel}
        </label>
        <input
          name="main-input"
          type="text"
          id="main-input"
          onChange={handleOnChange}
          value={inputValue}
          className="border-2 p-1 ml-1 
          border-blue-950 bg-green-100 
          rounded-md focus:outline-none focus:ring-2 
          focus:ring-blue-500 background-transparent 
          text-green-800 text-4xl"
        />
      </div>
    </div>
  );
};

export default MainInput;
