/*import type { Themes } from 'types/types';
import { useState, useEffect } from 'react';

type Props = {
  theme: Themes;
};

const Clock = ({ theme }: Props) => {
  const [time, setTime] = useState(new Date());

  const containerColors = {
    default: {
      textcolor: 'text-black',
    },
    LIGHT: {
      textcolor: 'text-black',
    },
    DARK: {
      textcolor: 'text-white',
    },
    DARKBLUE: {
      textcolor: 'text-black',
    },
    GREEN: {
      textcolor: 'text-black',
    },
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  return (
    <div
      className={`flex items-center justify-center rounded-sm font-bold w-25 h-15 border-2 text-4xl place-self-end ${theme ? containerColors[theme].textcolor : containerColors.default.textcolor}`}
    >
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
    </div>
  );
};

export default Clock;*/
