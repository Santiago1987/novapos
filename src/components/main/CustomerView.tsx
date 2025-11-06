import { useEffect } from 'react';
import useCustomerViewData from '@/services/customerViewData';
import CustomerSalesTable from '../ui/customerView/customerSalesTable';

const CustomerView = () => {
  const { data, openConnection, closeConnection } = useCustomerViewData();

  useEffect(() => {
    openConnection();

    return closeConnection();
  }, []);

  return (
    <>
      <div className="w-full h-full bg-gradient-to-r from-amber-500 to-pink-500 flex flex-col items-center justify-center">
        <h1>Customer View</h1>
        <CustomerSalesTable />
      </div>
    </>
  );
};

export default CustomerView;
