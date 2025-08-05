const Payments = () => {
  return (
    <div className="border border-green-950 h-3/10 rounded-sm ml-1 bg-green-100 overflow-y-auto">
      <table className="min-w-full border-collapse border-0 table-fixed">
        <thead className="text-white font-bold text-xl">
          <tr className="sticky top-0 z-10 bg-green-950">
            <th className="p-0.5 w-6/10">Payment Method</th>
            <th className="p-0.5 w-1/10">Quantity</th>
            <th className="p-0.5 w-1/10">Amount</th>
            <th className="p-0.5 w-1/10">Value</th>
          </tr>
        </thead>
        <tbody className="text-green-950 text-lg">
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
