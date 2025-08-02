type Props = {
  salesData: {
    id: string;
    quantity?: number;
    description?: string;
    unitPrice?: number;
    value?: number;
  }[];
};

const SalesTable = ({ selesData }: Props) => {
  return (
    <div className="border border-green-950 7/10 rounded-sm mx-1 bg-green-100 overflow-y-auto">
      <table className="min-w-full border-collapse border-0 table-fixed">
        <thead className="text-white font-bold text-xl">
          <tr className="sticky top-0 z-10 bg-green-950">
            <th className="p-0.5 w-2/10">Quantity</th>
            <th className="p-0.5 w-4/10">Description</th>
            <th className="p-0.5 w-2/10">Unit Price</th>
            <th className="p-0.5 w-2/10">Value</th>
          </tr>
        </thead>
        <tbody className="text-green-950 text-lg">
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
