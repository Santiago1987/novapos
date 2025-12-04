import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

const CustomerPayments = () => {
  const lang = useCustomerViewStore((state) => state.lang);
  const payments = useSalesDataStore((state) => state.ticket.payments);
  const { t } = useTraductionsStore();

  return (
    <div className="w-full h-full shadow-lg shadow-gray-400">
      <div className="border w-full h-full bg-white rounded-lg overflow-y-auto">
        <table className="w-full border-collapse border-0 table-fixed">
          <thead>
            <tr className="sticky top-0 z-10 h-15 font-bold text-2xl text-white bg-blue-950">
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
                    className="border-b border-gray-200 text-2xl h-15 bg-white"
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

export default CustomerPayments;
