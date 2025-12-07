import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

type Props = {
  id: string;
};

const PaymentsTable = ({ id }: Props) => {
  const lang = useCustomerViewStore((state) => state.layout.lang);
  const payments = useSalesDataStore((state) => state.ticket.payments);
  const { t } = useTraductionsStore();
  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();

  const paymentsTableComponent = layout.components[id];
  if (paymentsTableComponent.type !== 'PAYMENTS_TABLE') {
    return null;
  }

  const { position, size, rows, header } = paymentsTableComponent.properties;

  return (
    <div
      className={`top-${position.y} left-${position.x} w-${size.width} h-${size.height} shadow-lg shadow-gray-400`}
      onClick={() => selectComponent(id)}
    >
      <div
        className="border w-full h-full rounded-lg overflow-y-auto"
        style={{ background: rows.backgroundColor || '#ffffff' }}
      >
        <table className={`w-full border-collapse border-0 table-fixed`}>
          <thead>
            <tr
              className={`sticky top-0 z-10 h-15 font-bold ${header.fontSize || 'text-2xl'}`}
              style={{
                color: header.textColor || '#ffffff',
                background: header.backgroundColor || '#351c75',
              }}
            >
              <th className="p-1 w-5/12 visible">
                {t('payment_method', lang)}
              </th>
              <th className="p-1 w-3/12 visible">{t('quantity', lang)}</th>
              <th className="p-1 w-2/12 visible">{t('amount', lang)}</th>
              <th className="p-1 w-2/12 visible">{t('value', lang)}</th>
            </tr>
          </thead>
          <tbody>
            {payments &&
              payments.map((pay, index) => {
                return (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 h-15 ${rows.fontSize || 'text-2xl'}`}
                    style={{ background: rows.backgroundColor || '#ffffff' }}
                  >
                    <td className="p-1 text-start w-5/20 overflow-hidden text-ellipsis text-nowrap font-bold">
                      {pay.PayKind}
                    </td>
                    <td className="p-1 text-end w-3/20">{1}</td>
                    <td className="p-1 text-end w-2/20">{pay.PayAmt}</td>
                    <td className="p-1 text-end w-2/20">{pay.PayAmt}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;
