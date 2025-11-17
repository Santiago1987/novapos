import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import type { TicketLines } from '@/types/salesDataSore';

type Props = {
  tickLns?: Record<string, TicketLines>;
};

const CustomerSalesTable = ({ tickLns }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useLayoutStore((state) => state.layout.lang);
  const linesEntries = Object.entries(tickLns || {});

  return (
    <div className="w-full h-full shadow-lg shadow-gray-400">
      <div className="border bg-white w-full h-full rounded-lg overflow-y-auto">
        <table className="w-full border-collapse border-0 table-fixed">
          <thead>
            <tr className="sticky top-0 z-10 h-15 bg-blue-950 w-full font-bold text-3xl text-white">
              <th className="p-1 w-2/10">{t('quantity', lang)}</th>
              <th className="p-1 w-4/10 text-left">{t('description', lang)}</th>
              <th className="p-1 w-2/10">{t('unpr', lang)}</th>
              <th className="p-1 w-2/10">{t('value', lang)}</th>
            </tr>
          </thead>
          <tbody>
            {linesEntries.map(([id, ln]) => {
              let descr = ln.Text && ln.Text[lang] ? ln.Text[lang] : ln.Descr;
              return (
                <tr
                  key={id}
                  className="border-b border-gray-200 h-15 text-2xl font-bold"
                >
                  <td className="p-1 text-end w-2/10">{ln.Count}</td>
                  <td className="p-1 text-start w-4/10 overflow-hidden text-ellipsis text-nowrap">
                    {descr ?? ''}
                  </td>
                  <td className="p-1 text-end w-2/10">{ln.UnPrice}</td>
                  <td className="p-1 text-end w-2/10">{ln.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerSalesTable;
