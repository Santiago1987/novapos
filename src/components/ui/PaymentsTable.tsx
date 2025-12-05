import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

const PaymentsTable = () => {
  const lang = useCustomerViewStore((state) => state.lang);
  const payments = useSalesDataStore((state) => state.ticket.payments);
  const { t } = useTraductionsStore();

  const tableStyles = {
    tablebg: '#ffffff',
    header: {
      bg: '#351c75',
      textcolor: '#ffffff',
      fonsize: 'text-2xl',
    },
    body: {
      bg: '#ffffff',
      fontsize: 'text-2xl',
    },
  };

  return (
    <div className="w-full h-full shadow-lg shadow-gray-400">
      <div
        className="border w-full h-full rounded-lg overflow-y-auto"
        style={{ background: tableStyles.tablebg }}
      >
        <table
          className={`w-full border-collapse border-0 table-fixed ${tableStyles.header.fonsize}`}
        >
          <thead>
            <tr
              className="sticky top-0 z-10 h-15 font-bold text-2xl"
              style={{
                color: tableStyles.header.textcolor,
                background: tableStyles.header.bg,
              }}
            >
              <th className="p-1 w-5/12">{t('payment_method', lang)}</th>
              <th className="p-1 w-3/12">{t('quantity', lang)}</th>
              <th className="p-1 w-2/12">{t('amount', lang)}</th>
              <th className="p-1 w-2/12">{t('value', lang)}</th>
            </tr>
          </thead>
          <tbody>
            {payments &&
              payments.map((pay, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-2xl h-15"
                    style={{ background: tableStyles.body.bg }}
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
