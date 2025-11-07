import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL_COLRYUT;

const getSalesData = (token: string) => {
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
};

export default getSalesData;
