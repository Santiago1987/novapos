import { useEffect, useRef, useState } from 'react';
import getCacheToken from '@/services/getCacheToken';
import getSalesData from '@/services/getSalesData';
import type { AxiosError } from 'axios';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useCustomerViewStore } from '@/store/CustomerViewStore';

const useSalesData = (pollInterval: number = 2000) => {
  const { setSalesData, reset } = useSalesDataStore();
  const { setLang } = useCustomerViewStore();
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
      const { data } = result;
      setSalesData(data);
      setError(null);
      if (data.ticket.header.Custlng) {
        setLang(data.ticket.header.Custlng);
        return;
      }
      setLang('EN');
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 408) {
        await refreshToken();
      }
      reset();
      setError('Error on getting data: ' + error);
    }
  };

  return { error };
};

export default useSalesData;
