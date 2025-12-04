import type { CVFileManifest } from '@/types/customerView';
import axios, { type AxiosResponse } from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL_COLRYUT;

const getCustomerViewManifest = (token: string) => {
  if (!serverURL) {
    throw new Error('no server URL');
  }
  if (!token) {
    throw new Error('no token');
  }

  return axios
    .get<AxiosResponse<CVFileManifest>>(`/api/pos/sales/filmanifest`, {
      headers: {
        'Content-Type': 'application/json',
        SDP_TOKEN: token,
      },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      throw err;
    });
};

export default getCustomerViewManifest;
