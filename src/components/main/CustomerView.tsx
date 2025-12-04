import CustomerSalesTable from '@/components/ui/customerView/CustomerSalesTable';
import CustomerPayments from '../ui/customerView/CustomerPayments';
import CustomerTotals from '../ui/customerView/CustomerTotals';
import CustomerCorousel from '../ui/customerView/CustomerCorousel';
import CustomerScreensaver from '../ui/customerView/CustomerScreensaver';
import CustomerTop from '@/components/ui/customerView/CustomerTop';
import ThankYouBanner from '../ui/customerView/ThankYouBanner';
import useCustomerViewFilesManager from '@/hooks/useCustomerViewFilesManager';

const CustomerView = () => {
  useCustomerViewFilesManager();
  return (
    <>
      <div
        className="grid w-full h-full bg-gradient-to-r from-blue-200 to-cyan-200
        grid-cols-2 grid-rows-10 gap-1"
      >
        <div className="row-1 col-span-full">
          <CustomerTop />
        </div>
        <div className="col-1 row-span-6 row-start-2 p-1">
          <CustomerSalesTable />
        </div>
        <div className="col-1 row-span-3 row-start-8 p-1">
          <CustomerPayments />
        </div>
        <div className="col-2 row-span-3 row-start-8 p-1 flex place-content-end items-end">
          <CustomerTotals />
        </div>
        <div className="col-2 p-1 row-span-6 row-start-2 items-center justify-center">
          <CustomerCorousel />
        </div>

        <ThankYouBanner />
      </div>
    </>
  );
};

export default CustomerView;

/** <div className="col-2 p-1 row-span-6 row-start-2 items-center justify-center">
      <CustomerVideo screensaverActive={data?.status.emptyticket} />
    </div> 
    <CustomerScreensaver />*/
