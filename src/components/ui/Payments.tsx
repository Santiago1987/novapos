import type { Themes } from 'types/types';

type Props = {
  theme: Themes;
};
const Payments = ({ theme }: Props) => {
  const paymentGridColor = {
    default: {
      constainer: 'bg-white border-blue-950',
      thead: 'text-white',
      trhead: 'bg-green-950',
      tbody: 'text-green-950',
    },
    LIGHT: {
      constainer: 'bg-blue-100 border-black',
      thead: 'text-black',
      trhead: 'bg-blue-700',
      tbody: 'text-dark',
    },
    DARK: {
      constainer: 'bg-gray-900 border-grey-700',
      thead: 'text-white',
      trhead: 'bg-blue-950',
      tbody: 'text-white',
    },
    DARKBLUE: {
      constainer: 'bg-white border-blue-600',
      thead: 'text-white',
      trhead: 'bg-blue-700',
      tbody: 'text-white',
    },
    GREEN: {
      constainer: 'bg-green-100 border-blue-950',
      thead: 'text-white',
      trhead: 'bg-green-950',
      tbody: 'text-green-950',
    },
  };

  return (
    <div
      className={`border h-3/10 rounded-sm ml-1 overflow-y-auto ${theme ? paymentGridColor[theme].constainer : paymentGridColor.default.constainer}`}
    >
      <table className="min-w-full border-collapse border-0 table-fixed">
        <thead
          className={`font-bold text-xl ${theme ? paymentGridColor[theme].thead : paymentGridColor.default.thead}`}
        >
          <tr
            className={`sticky top-0 z-10 ${theme ? paymentGridColor[theme].trhead : paymentGridColor.default.trhead}`}
          >
            <th className="p-0.5 w-6/10">Payment Method</th>
            <th className="p-0.5 w-1/10">Quantity</th>
            <th className="p-0.5 w-1/10">Amount</th>
            <th className="p-0.5 w-1/10">Value</th>
          </tr>
        </thead>
        <tbody
          className={`${theme ? paymentGridColor[theme].tbody : paymentGridColor.default.tbody} text-lg`}
        >
          <tr className="border-b border-gray-200">
            <td className="px-1 text-start py-1 w-6/10 font-bold">
              Mastercard
            </td>
            <td className="px-1 text-end py-1 w-1/10 overflow-hidden text-ellipsis text-nowrap">
              1
            </td>
            <td className="px-1 text-end py-1 w-1/10">2000.00</td>
            <td className="px-1 text-end py-1 w-1/10">2000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
