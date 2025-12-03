import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import { useEffect, useRef } from 'react';

const CustomerSalesTable = () => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.lang);
  const tickLns = useSalesDataStore((state) => state.ticket.lines);
  const selectedLine = useSalesDataStore((state) => state.status.selectedLine);

  const linesEntries = Object.entries(tickLns || {});

  const lastRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [tickLns]);

  const validLines = linesEntries.filter(([, ln]) => !ln.Cancel);

  return (
    <div className="w-full h-full shadow-lg shadow-gray-400">
      <div className="border bg-white w-full h-full rounded-lg overflow-y-auto">
        <table className="w-full border-collapse border-0 table-fixed">
          <thead>
            <tr className="sticky top-0 z-10 h-15 bg-blue-950 w-full font-bold text-2xl text-white">
              <th className="p-1 w-2/10">{t('quantity', lang)}</th>
              <th className="p-1 w-4/10 text-left">{t('description', lang)}</th>
              <th className="p-1 w-2/10">{t('unpr', lang)}</th>
              <th className="p-1 w-2/10">{t('value', lang)}</th>
            </tr>
          </thead>
          <tbody>
            {validLines.map(([id, ln]) => {
              let descr = ln.Text?.[lang] ?? ln.Descr;

              const isSelectedRow = selectedLine
                ? selectedLine === parseInt(id)
                : false;
              return (
                <tr
                  key={id}
                  ref={isSelectedRow ? lastRowRef : null}
                  className={`border-b border-gray-200 h-15 text-2xl font-bold ${isSelectedRow ? 'bg-blue-400' : 'bg-white'}`}
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
