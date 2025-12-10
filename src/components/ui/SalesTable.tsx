import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import { useEffect, useRef } from 'react';

type Props = {
  id: string;
};

const SalesTable = ({ id }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.layout.lang);
  const tickLns = useSalesDataStore((state) => state.ticket.lines);
  const selectedLine = useSalesDataStore((state) => state.status.selectedLine);
  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();

  const salesTableComponent = layout.components[id];
  if (salesTableComponent.type !== 'SALES_TABLE') {
    return null;
  }

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

  //CUSTOMER STYLES
  const { position, size, rows, header } = salesTableComponent.properties;

  return (
    <div
      className={`top-${position.y} left-${position.x} w-${size.width} h-${size.height} shadow-lg shadow-gray-400`}
      onClick={() => selectComponent(id)}
    >
      <div
        className="border w-full h-full rounded-lg overflow-y-auto"
        style={{ background: rows?.backgroundColor || '#ffffff' }}
      >
        <table className="w-full border-collapse border-0 table-fixed">
          <thead>
            <tr
              className={`sticky top-0 z-10 h-15 w-full font-bold ${header?.fontSize || 'text-2xl'}`}
              style={{
                color: header?.textColor || '#ffffff',
                background: header?.backgroundColor || '#351c75',
              }}
            >
              <th className="p-1 w-2/10 visible">{t('quantity', lang)}</th>
              <th className="p-1 w-4/10 text-left visible">
                {t('description', lang)}
              </th>
              <th className="p-1 w-2/10 visible">{t('unpr', lang)}</th>
              <th className="p-1 w-2/10 visible">{t('value', lang)}</th>
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
                  className={`border-b border-gray-200 h-15 font-bold ${rows?.fontSize || 'text-2xl'}`}
                  style={
                    isSelectedRow
                      ? {
                          background:
                            salesTableComponent.selectedRowColor || '#6fa8dc',
                        }
                      : { background: rows?.backgroundColor || '#ffffff' }
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
