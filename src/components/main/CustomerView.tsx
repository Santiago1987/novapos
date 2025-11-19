import CustomerSalesTable from '@/components/ui/customerView/CustomerSalesTable';
import useSalesData from '@/hooks/useSalesData';
import CustomerPayments from '../ui/customerView/CustomerPayments';
import CustomerTotals from '../ui/customerView/CustomerTotals';
import CustomerCorousel from '../ui/customerView/CustomerCorousel';
import CustomerScreensaver from '../ui/customerView/CustomerScreensaver';
import CustomerTop from '@/components/ui/customerView/CustomerTop';
import ThankYouBanner from '../ui/customerView/ThankYouBanner';
import { useEffect } from 'react';
import { useLayoutStore } from '@/store/LayoutStore';
import CustomerVideo from '@/components/ui/customerView/CustomerVideo';

const CustomerView = () => {
  const { data } = useSalesData(2000);
  console.log('data', data);
  const {
    layoutActions: { setLang },
  } = useLayoutStore();

  useEffect(() => {
    const lng = data?.ticket.header.Custlng;
    if (data && lng) {
      setLang(lng);
      return;
    }
    setLang('EN');
  }, [data?.ticket.header.Custlng]);

  return (
    <>
      <div
        className="grid w-full h-full bg-gradient-to-r from-blue-200 to-cyan-200
        grid-cols-2 grid-rows-10 gap-1"
      >
        <div className="row-1 col-span-full">
          <CustomerTop operator={data?.ticket.header.Operator} />
        </div>
        <div className="col-1 row-span-6 row-start-2 p-1">
          <CustomerSalesTable
            tickLns={data?.ticket.lines}
            selectedLine={data?.status.selectedLine}
          />
        </div>
        <div className="col-1 row-span-3 row-start-8 p-1">
          <CustomerPayments payments={data?.ticket.payments} />
        </div>
        <div className="col-2 row-span-3 row-start-8 p-1 flex place-content-end items-end">
          <CustomerTotals data={data?.ticket.header} />
        </div>
        <div className="col-2 p-1 row-span-6 row-start-2 items-center justify-center">
          <CustomerVideo screensaverActive={data?.status.emptyticket} />
        </div>
        <CustomerScreensaver isEmpty={data?.status.emptyticket} />
        <ThankYouBanner display={data?.status.instance === 'finishing'} />
      </div>
    </>
  );
};

export default CustomerView;

/**<CustomerScreensaver isEmpty={data?.status.emptyticket} /> */
