import type { Themes } from 'types/types';
import Clock from './Clock';
import { useState } from 'react';
type Props = {
  theme: Themes;
  onChangeTheme: (e: Themes) => void;
};

const Miselaneos = ({ theme, onChangeTheme }: Props) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as Themes;
    setSelectedValue(val);
    console.log(e.target.value);
    onChangeTheme(val);
  };

  return (
    <div className="flex flex-col justify-between w-4/10 h-full">
      <Clock theme={theme} />
      <button
        type="button"
        className="text-white bg-red-800 rounded-sm font-bold w-20 h-20 border-2 border-red-600 text-3xl mt-1"
      >
        X
      </button>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300
       text-gray-900 text-sm rounded-lg focus:ring-blue-500
        focus:border-blue-500 block w-full p-2.5
         dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white
           dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a theme</option>
        <option value="DARK" selected>
          DARK
        </option>
        <option value="GREEN">GREEN</option>
        <option value="LIGHT">LIGHT</option>
        <option value="DARKBLUE">DARKBLUE</option>
      </select>
    </div>
  );
};

export default Miselaneos;
