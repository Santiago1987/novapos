import type { Themes } from 'types/types';
import { useState, useEffect } from 'react';

type Props = {
  textLabel?: string;
  theme?: Themes;
};

const MainInput = ({ textLabel, theme }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    //console.log('Component mounted or inputValue changed:', inputValue);
  }, [inputValue]);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setInputValue(ev.target.value);
  };

  const titleColors = {
    default: 'text-black',
    LIGHT: 'text-black',
    DARK: 'text-white',
    DARKBLUE: 'text-white',
    GREEN: 'text-green-800',
  };

  const inputColors = {
    default: {
      background: 'bg-white',
      textColor: 'text-black',
      border: 'border-blue-950',
    },
    LIGHT: {
      background: 'bg-blue-100',
      textColor: 'text-black',
      border: 'border-black',
    },
    DARK: {
      background: 'bg-gray-900',
      textColor: 'text-white',
      border: 'border-grey-700',
    },
    DARKBLUE: {
      background: 'bg-white',
      textColor: 'text-black',
      border: 'border-blue-600',
    },
    GREEN: {
      background: 'bg-green-100',
      textColor: 'text-green-800',
      border: 'border-blue-950',
    },
  };

  const inputColorRes = theme
    ? inputColors[theme].background +
      ' ' +
      inputColors[theme].textColor +
      ' ' +
      inputColors[theme].border
    : inputColors.default.background +
      ' ' +
      inputColors.default.textColor +
      ' ' +
      inputColors.default.border;
  return (
    <div
      className={`flex flex-col gap-1 ${theme ? titleColors[theme] : titleColors.default}`}
    >
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
          className={`border-2 p-1 ml-1 ${inputColorRes}
          rounded-md focus:outline-none focus:ring-2 
          focus:ring-blue-500 background-transparent 
          text-4xl`}
        />
      </div>
    </div>
  );
};

export default MainInput;
