import { useEffect, useRef } from 'react';
import { useCustomerViewStore } from '@/store/CustomerViewStore';
import getCustomerViewManifest from '@/services/getCustomerViewManifest';
import getCacheToken from '@/services/getCacheToken';

const useCustomerViewFilesManager = () => {
  const { setManifest } = useCustomerViewStore();

  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    getManifest();
    const interval = setInterval(
      async () => {
        getManifest();
      },
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  // HACER UN HOOK QUE MANEJE EL TOKEN Y SE ENCARGE DE REFRESCARLO
  const refreshToken = async () => {
    try {
      const restoken = await getCacheToken();
      //console.log('restoken', restoken);
      tokenRef.current = restoken;
    } catch (err) {
      console.log('Erro on token', err);
    }
  };

  const getManifest = async () => {
    if (!tokenRef.current) {
      await refreshToken();
    }

    if (!tokenRef.current) return;

    const result = await getCustomerViewManifest(tokenRef.current);

    if (!result) return;
    setManifest(result);
  };
};

export default useCustomerViewFilesManager;
