import useCustomerViewFilesManager from '@/hooks/useCustomerViewFilesManager';
import ThankYouBanner from './ThankYouBanner';

const CustomerScreen = () => {
  useCustomerViewFilesManager();
  return (
    <>
      <div
        className="grid w-full h-full bg-gradient-to-r from-blue-200 to-cyan-200
        grid-cols-2 grid-rows-10 gap-1"
      >
        <ThankYouBanner />
      </div>
    </>
  );
};

export default CustomerScreen;
