import { useEffect, useRef } from 'react';
import { useCustomerViewStore } from '@/store/CustomerViewStore';
import getCustomerViewManifest from '@/services/getCustomerViewManifest';
import getCacheToken from '@/services/getCacheToken';
import { useSalesDataStore } from '@/store/SalesDataStore';

const useCustomerViewFilesManager = () => {
  const { setManifest } = useCustomerViewStore();
  const refreshFiles = useSalesDataStore(
    (state) => state.customerView.refreshFiles
  );

  const {
    customerViewActions: { setRefreshFiles },
  } = useSalesDataStore();

  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (refreshFiles) {
      getManifest();
      setRefreshFiles(false);
    }
  }, [refreshFiles]);

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
