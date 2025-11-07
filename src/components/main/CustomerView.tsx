import CustomerSalesTable from '@/components/ui/customerView/CustomerSalesTable';
import useSalesData from '@/hooks/useSalesData';

const CustomerView = () => {
  const [data] = useSalesData(2000);

  console.log('aaa', data.data.ticket);

  return (
    <>
      <div className="w-full h-full bg-gradient-to-r from-amber-500 to-pink-500 flex flex-col items-center justify-center">
        <h1>Customer View</h1>
        <CustomerSalesTable tickLns={data?.data.ticket?.lines || []} />
      </div>
    </>
  );
};

export default CustomerView;
