import CustomerSalesTable from '@/components/ui/customerView/CustomerSalesTable';
import useSalesData from '@/hooks/useSalesData';
import CustomerPayments from '../ui/customerView/CustomerPayments';
import CustomerTotals from '../ui/customerView/CustomerTotals';
import CustomerCorousel from '../ui/customerView/CustomerCorousel';
import { useEffect } from 'react';
import CustomerScreensaver from '../ui/customerView/CustomerScreensaver';

const CustomerView = () => {
  const { data } = useSalesData(2000);

  return (
    <>
      <div
        className="grid w-full h-full bg-gradient-to-r from-amber-500 to-pink-500
        grid-cols-2 grid-rows-2 gap-1"
      >
        <div className="col-2 row-1">
          <CustomerSalesTable tickLns={data?.ticket.lines} />
        </div>
        <div className="col-1 row-2">
          <CustomerPayments payments={data?.ticket.payments} />
        </div>
        <div className="col-2 row-2">
          <CustomerTotals data={data?.ticket.header} />
        </div>
        <div className="col-1 row-1 items-center justify-center">
          <CustomerCorousel />
        </div>
        <CustomerScreensaver isEmpty={data?.status.emptyticket} />
      </div>
    </>
  );
};

export default CustomerView;
