import { useEffect, useRef, useState } from 'react';
import getCacheToken from '@/services/getCacheToken';
import getSalesData from '@/services/getSalesData';
import type { SalesDataStoreState } from '@/types/salesDataSore';
import type { AxiosError } from 'axios';

const useSalesData = (pollInterval: number = 2000) => {
  const [data, setData] = useState<SalesDataStoreState>();
  const [error, setError] = useState<string | null>(null);

  const tokenRef = useRef<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getData();

    intervalRef.current = setInterval(() => {
      getData();
    }, pollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pollInterval]);

  const refreshToken = async () => {
    try {
      const restoken = await getCacheToken();
      //console.log('restoken', restoken);
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
      setData(result.data);
      setError(null);
    } catch (error) {
      setError('Error on getting data: ' + error);
      setData(undefined);
    }
  };

  return { data, error };
};

export default useSalesData;
