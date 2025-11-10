import axios from 'axios';
import cRec from '../../cRec.json';

const serverURL = import.meta.env.VITE_SERVER_URL_COLRYUT;

/*const getSalesData = (token: string) => {
  if (!serverURL) {
    throw new Error('no server URL');
  }
  if (!token) {
    throw new Error('no token');
  }

  return axios
    .get(`/api/pos/sales/data`, {
      headers: {
        'Content-Type': 'application/json',
        SDP_TOKEN: token,
      },
    })
    .then((res) => res.data);
};*/

const getSalesData = (token: string) => {
  if (!serverURL) {
    throw new Error('no server URL');
  }
  if (!token) {
    throw new Error('no token');
  }

  return new Promise((resolve) => resolve(cRec));
};

export default getSalesData;
