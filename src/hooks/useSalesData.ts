import { useEffect, useRef, useState } from 'react';
import getCacheToken from '@/services/getCacheToken';
import getSalesData from '@/services/getSalesData';

const useSalesData = (pollInterval: number = 2000) => {
  const [data, setData] = useState<any>('');
  const [error, setError] = useState<string | null>(null);

  const tokenRef = useRef<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshToken = async () => {
    try {
      const restoken = await getCacheToken();

      tokenRef.current = restoken;
    } catch (err) {
      setError('error on token: ' + err);
      console.log('Erro on token', err);
    }
  };

  const getData = async () => {
    if (!tokenRef.current) {
      await refreshToken();
    }

    if (!tokenRef.current) return;

    try {
      const result = await getSalesData(tokenRef.current);
      setData(result);
      setError(null);
    } catch (err) {
      setError('Error on getting data: ' + err);
      console.log('ERROR ON DATA: ', err);
    }
  };

  useEffect(() => {
    getData();

    intervalRef.current = setInterval(() => {
      getData();
    }, pollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pollInterval]);

  return [data, error];
};

export default useSalesData;
