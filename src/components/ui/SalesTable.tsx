import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import { useEffect, useRef } from 'react';

const SalesTable = () => {
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

  const tableStyles = {
    tablebg: '#ffffff',
    position: {
      top: 0,
      left: 0,
    },
    size: {
      w: 50,
      h: 50,
    },
    header: {
      bg: '#351c75',
      textcolor: '#ffffff',
      fonsize: 'text-2xl',
    },
    body: {
      bg: '#ffffff',
      selectline: '#6fa8dc',
      fontsize: 'text-2xl',
    },
  };

  return (
    <div
      className={`top-${tableStyles.position.top} left-${tableStyles.position.left} w-${tableStyles.size.w} h-${tableStyles.size.h} shadow-lg shadow-gray-400`}
    >
      <div
        className="border w-full h-full rounded-lg overflow-y-auto"
        style={{ background: tableStyles.tablebg }}
      >
        <table className="w-full border-collapse border-0 table-fixed">
          <thead>
            <tr
              className={`sticky top-0 z-10 h-15 w-full font-bold ${tableStyles.header.fonsize}`}
              style={{
                color: tableStyles.header.textcolor,
                background: tableStyles.header.bg,
              }}
            >
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
                  className={`border-b border-gray-200 h-15 font-bold ${tableStyles.body.fontsize}`}
                  style={
                    isSelectedRow
                      ? { background: tableStyles.body.selectline }
                      : { background: tableStyles.body.bg }
                  }
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

export default SalesTable;
