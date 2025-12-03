import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

const CustomerTotals = () => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.lang);
  const data = useSalesDataStore((state) => state.ticket.header);

  return (
    <div className="flex flex-col w-[400px] h-[200px] shadow-lg shadow-gray-400">
      <div className="flex flex-row flex-1 items-center bg-blue-950 text-white rounded-t-lg">
        <label className="p-1 font-bold w-1/2 text-3xl">
          {t('total', lang)}
        </label>
        <label className="p-1 font-bold w-1/2 text-3xl text-right">
          {data ? `€${data.Total2}` : '€0,00'}
        </label>
      </div>
      <div className="flex flex-row flex-2 items-center bg-white text-black">
        <label className="p-1 font-bold w-1/2 text-4xl place-self-start items-start">
          {t('change', lang)}
        </label>
        <label className="p-1 font-bold w-1/2 text-6xl text-right place-self-end">
          {data ? `€${data.Return}` : '€0,00'}
        </label>
      </div>
      <div className="flex flex-row flex-1 items-center bg-blue-950 text-white rounded-b-lg">
        <label className="p-1 font-bold w-1/2 text-xl">
          {t('rounding', lang)}
        </label>
        <label className="p-1 font-bold w-1/2 text-xl text-right">
          {data ? `€${data.Total2}` : '€0,00'}
        </label>
      </div>
    </div>
  );
};

export default CustomerTotals;
