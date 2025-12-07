import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

type Props = {
  id: string;
};

const TotalsComponent = ({ id }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.layout.lang);
  const data = useSalesDataStore((state) => state.ticket.header);
  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();

  const totalsComponent = layout.components[id];
  if (totalsComponent.type !== 'TOTALS_COMPONENT') {
    return null;
  }

  const { total, change, rounding, properties } = totalsComponent;
  const { position, size } = properties;

  return (
    <div
      className={`flex flex-col top-${position.y} left-${position.x} w-${size.width} h-${size.height} shadow-lg shadow-gray-400`}
      onClick={() => selectComponent(id)}
    >
      <div
        className={`flex flex-row flex-1 items-center rounded-t-lg ${total.fontSize || 'text-3xl'}`}
        style={{
          color: total.textColor || '#ffffff',
          background: total.backgroundColor || '#351c75',
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
          color: change.textColor || '#ffffff',
          background: change.backgroundColor || '#351c75',
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
          color: rounding.textColor || '#ffffff',
          background: rounding.backgroundColor || '#351c75',
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

export default TotalsComponent;
