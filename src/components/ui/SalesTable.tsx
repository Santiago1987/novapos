import type { Themes } from 'types/types';

type Props = {
  salesData: {
    id: string;
    quantity?: number;
    description?: string;
    unitPrice?: number;
    value?: number;
  }[];
  theme?: Themes;
};

const SalesTable = ({ selesData, theme }: Props) => {
  const containerColors = {
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
      tbody: 'text-black',
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
      className={`border h-7/10 rounded-sm ml-1 overflow-y-auto ${theme ? containerColors[theme].constainer : containerColors.default.constainer}`}
    >
      <table className="min-w-full border-collapse border-0 table-fixed">
        <thead
          className={`font-bold text-xl ${theme ? containerColors[theme].thead : containerColors.default.thead}`}
        >
          <tr
            className={`sticky top-0 z-10 ${theme ? containerColors[theme].trhead : containerColors.default.trhead}`}
          >
            <th className="p-0.5 w-2/10">Quantity</th>
            <th className="p-0.5 w-4/10">Description</th>
            <th className="p-0.5 w-2/10">Unit Price</th>
            <th className="p-0.5 w-2/10">Value</th>
          </tr>
        </thead>
        <tbody
          className={`${theme ? containerColors[theme].tbody : containerColors.default.tbody} text-lg`}
        >
          <tr className="border-b border-gray-200">
            <td className="px-1 text-end py-1 w-2/10">2</td>
            <td className="px-1 text-start py-1 w-4/10 overflow-hidden text-ellipsis text-nowrap">
              Papas fritas
            </td>
            <td className="px-1 text-end py-1 w-2/10">100.00</td>
            <td className="px-1 text-end py-1 w-2/10">200.00</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-1 text-end py-1 w-2/10">10</td>
            <td className="px-1 text-start py-1 w-4/10 overflow-hidden text-ellipsis">
              Coca cola 2 LTS
            </td>
            <td className="px-1 text-end py-1 w-2/10">100.00</td>
            <td className="px-1 text-end py-1 w-2/10">200.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
