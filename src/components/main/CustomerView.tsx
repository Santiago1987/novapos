import { useEffect } from 'react';
import useCustomerViewData from '@/services/customerViewData';

const CustomerView = () => {
  const { data, openConnection, closeConnection } = useCustomerViewData();

  useEffect(() => {
    openConnection();

    return closeConnection();
  }, []);

  return (
    <>
      <h1>Customer View</h1>
      <p>Data: {data}</p>
    </>
  );
};

export default CustomerView;
