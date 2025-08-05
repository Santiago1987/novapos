import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  return (
    <div className="flex items-center justify-center rounded-sm font-bold w-25 h-15 border-2 text-4xl place-self-end">
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
    </div>
  );
};

export default Clock;
