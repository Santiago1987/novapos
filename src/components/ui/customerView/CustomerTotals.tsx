import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import type { TicketHeader } from '@/types/salesDataSore';

type Props = {
  data?: TicketHeader;
};

const CustomerTotals = ({ data }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useLayoutStore((state) => state.layout.lang);
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
      <div className="flex flex-row flex-2 items-center bg-blue-600 text-white">
        <label className="p-1 font-bold w-1/2 text-4xl place-self-start items-start">
          {t('change', lang)}
        </label>
        <label className="p-1 font-bold w-1/2 text-6xl text-right place-self-end">
          {data ? `€${data.Total2}` : '€0,00'}
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
