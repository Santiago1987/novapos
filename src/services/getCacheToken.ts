import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL_COLRYUT;
const cacheUser = import.meta.env.VITE_CACHE_USR;
const cachePSW = import.meta.env.VITE_CACHE_PSW;
const getCacheToken = () => {
  if (!serverURL) {
    throw new Error('no server URL');
  }

  return axios
    .get(`/api/sys/signin`, {
      headers: {
        'Content-Type': 'application/json',
        SDP_USER: cacheUser,
        SDP_PASS: cachePSW,
      },
    })
    .then((res) => {
      const { data } = res;
      return data.data.token.access;
    });
};

export default getCacheToken;
