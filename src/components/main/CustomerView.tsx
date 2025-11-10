import CustomerSalesTable from '@/components/ui/customerView/CustomerSalesTable';
import useSalesData from '@/hooks/useSalesData';
import CustomerPayments from '../ui/customerView/CustomerPayments';
import CustomerTotals from '../ui/customerView/CustomerTotals';

const CustomerView = () => {
  const { data } = useSalesData(2000);

  console.log('aaa', data);

  return (
    <>
      <div className="w-full h-full bg-gradient-to-r from-amber-500 to-pink-500 flex flex-col items-center justify-center">
        <h1>Customer View</h1>
        <CustomerSalesTable tickLns={data?.ticket.lines} />
        <CustomerPayments payments={data?.ticket.payments} />
        <CustomerTotals data={data?.ticket.header} />
      </div>
    </>
  );
};

export default CustomerView;
