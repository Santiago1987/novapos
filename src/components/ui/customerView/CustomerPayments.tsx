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
    <div className="border bg-white w-full h-full rounded-lg overflow-y-auto">
      <table className="w-full border-collapse border-0 table-fixed">
        <thead className="font-bold text-xl text-white bg-blue-950">
          <tr className="sticky top-0 z-10 h-15">
            <th className="p-1 w-6/12">{t('payment_method', lang)}</th>
            <th className="p-1 w-2/20 text-left">{t('quantity', lang)}</th>
            <th className="p-1 w-2/10">{t('amount', lang)}</th>
            <th className="p-1 w-2/10">{t('value', lang)}</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {payments &&
            payments.map((pay, index) => {
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-1 text-start w-6/20 overflow-hidden text-ellipsis text-nowrap">
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
  );
};

export default CustomerPayments;
