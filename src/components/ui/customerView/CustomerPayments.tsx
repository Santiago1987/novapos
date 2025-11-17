import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import type { Payment } from '@/types/salesDataSore';

type Props = {
  payments?: Payment[];
};

const CustomerPayments = ({ payments }: Props) => {
  const lang = useLayoutStore((state) => state.layout.lang);
  const { t } = useTraductionsStore();
  return (
    <div className="w-full h-full shadow-lg shadow-gray-400">
      <div className="border w-full h-full bg-white rounded-lg overflow-y-auto">
        <table className="w-full border-collapse border-0 table-fixed">
          <thead>
            <tr className="sticky top-0 z-10 h-15 font-bold text-3xl text-white bg-blue-950">
              <th className="p-1 w-6/12">{t('payment_method', lang)}</th>
              <th className="p-1 w-2/12 text-left">{t('quantity', lang)}</th>
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
                    <td className="p-1 text-start w-6/20 overflow-hidden text-ellipsis text-nowrap font-bold">
                      {pay.PayKind}
                    </td>
                    <td className="p-1 text-end w-2/20">{1}</td>
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
