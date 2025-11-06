import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';

const CustomerSalesTable = () => {
  const { t } = useTraductionsStore();
  const lang = useLayoutStore((state) => state.layout.lang);
  return (
    <>
      <div className="border bg-white w-8/10 h-8/10 rounded-lg overflow-y-auto">
        <table className="w-full border-collapse border-0 table-fixed">
          <thead className="font-bold text-xl text-white bg-blue-950">
            <tr className="sticky top-0 z-10 h-15">
              <th className="p-1 w-2/10">{t('quantity', lang)}</th>
              <th className="p-1 w-4/10 text-left">{t('description', lang)}</th>
              <th className="p-1 w-2/10">{t('unpr', lang)}</th>
              <th className="p-1 w-2/10">{t('value', lang)}</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr className="border-b border-gray-200">
              <td className="p-1 text-end w-2/10">2</td>
              <td className="p-1 text-start w-4/10 overflow-hidden text-ellipsis text-nowrap">
                Papas fritas
              </td>
              <td className="p-1 text-end w-2/10">100.00</td>
              <td className="p-1 text-end w-2/10">200.00</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-1 text-end w-2/10">10</td>
              <td className="p-1 text-start w-4/10 overflow-hidden text-ellipsis">
                Coca cola 2 LTS
              </td>
              <td className="p-1 text-end w-2/10">100.00</td>
              <td className="p-1 text-end w-2/10">200.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerSalesTable;
