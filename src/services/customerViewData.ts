import { useRef, useState } from 'react';

const useCustomerViewData = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>(
    'connecting'
  );

  const eventSourceRef = useRef<EventSource | null>(null);

  const openConnection = () => {
    const url = 'http://localhost';
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log('SSE conectado');
      setStatus('open');
    };

    eventSource.onerror = (err) => {
      console.log('Error SSE', err);
    };

    eventSource.onmessage = (e) => {
      try {
        const newData = JSON.parse(e.data);
        setData(newData);
        console.log('New data', newData);
      } catch (err) {
        console.error('Error on message', err);
      }
    };
    eventSourceRef.current = eventSource;
  };

  const closeConnection = () => {
    const es = eventSourceRef.current;
    if (!es) return;
    es.close();
  };

  return { data, status, openConnection, closeConnection };
};

export default useCustomerViewData;
