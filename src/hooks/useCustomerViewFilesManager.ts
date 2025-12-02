import { useEffect, useState } from 'react';
import swCustViewFileUpdate from '@/services/swCustViewFileUpdate';
import { type SWFileResponse } from '@/types/miscStore';

const useCustomerViewFilesManager = () => {
  const [manifestJSON, setManifestJSON] = useState<SWFileResponse | null>(null);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const result = await swCustViewFileUpdate();
        if (!result || !result.updateAvailable) return;
        setManifestJSON(result);
      },
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return {
    manifestJSON,
  };
};

export default useCustomerViewFilesManager;
