import { useEffect } from 'react';
import swCustViewFileUpdate from '@/services/swCustViewFileUpdate';
import { useCustomerViewStore } from '@/store/CustomerViewStore';

const useCustomerViewFilesManager = () => {
  const { setManifest } = useCustomerViewStore();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const result = await swCustViewFileUpdate();
        console.log('manifest json', result);
        if (!result || !result.updateAvailable) return;
        let { updateAvailable, ...res } = result;
        setManifest(res);
      },
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);
};

export default useCustomerViewFilesManager;
