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
    <div className="flex flex-col w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-4/12 justify-between items-center bg-blue-950 text-white">
        <label className="p-1 font-bold w-1/2 text-3xl">
          {t('total', lang)}
        </label>
        <label className="p-1 font-bold w-1-2 text-3xl">
          {data ? data.Total2 : '0,00'}
        </label>
      </div>
      <div className="flex flex-row w-full h-6/12 justify-between items-center bg-blue-600 text-white">
        <label className="p-1 font-bold w-1/2 text-4xl place-self-start">
          {t('change', lang)}
        </label>
        <label className="p-1 font-bold w-1-2 text-6xl place-self-end">
          {data ? data.Total2 : '0,00'}
        </label>
      </div>
      <div className="flex flex-row w-full h-2/12 justify-between items-center bg-blue-950 text-white">
        <label className="p-1 font-bold w-1/2 text-xl">
          {t('rounding', lang)}
        </label>
        <label className="p-1 font-bold w-1-2 text-xl">
          {data ? data.Total2 : '0,00'}
        </label>
      </div>
    </div>
  );
};

export default CustomerTotals;
