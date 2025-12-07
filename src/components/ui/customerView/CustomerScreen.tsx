import useCustomerViewFilesManager from '@/hooks/useCustomerViewFilesManager';
import CustomerTop from './CustomerTop';
import CustomerCorousel from './CarouselImages';
import ThankYouBanner from './ThankYouBanner';
import SalesTable from '../SalesTable';
import PaymentsTable from '../PaymentsTable';
import TotalsTable from '../TotalsComponent';

const CustomerScreen = () => {
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
          <SalesTable />
        </div>
        <div className="col-1 row-span-3 row-start-8 p-1">
          <PaymentsTable />
        </div>
        <div className="col-2 row-span-3 row-start-8 p-1 flex place-content-end items-end">
          <TotalsTable />
        </div>
        <div className="col-2 p-1 row-span-6 row-start-2 items-center justify-center">
          <CustomerCorousel />
        </div>

        <ThankYouBanner />
      </div>
    </>
  );
};

export default CustomerScreen;
