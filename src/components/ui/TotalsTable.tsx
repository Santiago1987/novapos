import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

const CustomerTotals = () => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.lang);
  const data = useSalesDataStore((state) => state.ticket.header);

  const tableStyles = {
    position: {},
    size: {
      w: 20,
      h: 20,
    },
    total: {
      textcolor: '#ffffff',
      bg: '#351c75',
      fontsize: 'text-3xl',
    },
    change: {
      textcolor: '#ffffff',
      bg: '#351c75',
      fontsize: 'text-3xl',
    },
    rounding: {
      textcolor: '#ffffff',
      bg: '#351c75',
      fontsize: 'text-xl',
    },
  };

  return (
    <div
      className={`flex flex-col w-${tableStyles.size.w} h-${tableStyles.size.h} shadow-lg shadow-gray-400`}
    >
      <div
        className={`flex flex-row flex-1 items-center rounded-t-lg ${tableStyles.total.fontsize}`}
        style={{
          color: tableStyles.total.textcolor,
          background: tableStyles.total.bg,
        }}
      >
        <label className="p-1 font-bold w-1/2">{t('total', lang)}</label>
        <label className="p-1 font-bold w-1/2 text-right">
          {data.Total2 ? `€${data.Total2}` : '€0,00'}
        </label>
      </div>
      <div
        className="flex flex-row flex-2 items-center"
        style={{
          color: tableStyles.change.textcolor,
          background: tableStyles.change.bg,
        }}
      >
        <label className="p-1 font-bold w-1/2 text-4xl place-self-start items-start">
          {t('change', lang)}
        </label>
        <label className="p-1 font-bold w-1/2 text-6xl text-right place-self-end">
          {data ? `€${data.Return}` : '€0,00'}
        </label>
      </div>
      <div
        className="flex flex-row flex-1 items-center rounded-b-lg"
        style={{
          color: tableStyles.rounding.textcolor,
          background: tableStyles.rounding.bg,
        }}
      >
        <label className="p-1 font-bold w-1/2 text-xl">
          {t('rounding', lang)}
        </label>
        <label className="p-1 font-bold w-1/2 text-xl text-right">
          {data.Total2 ? `€${data.Total2}` : '€0,00'}
        </label>
      </div>
    </div>
  );
};

export default CustomerTotals;
