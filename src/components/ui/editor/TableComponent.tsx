import type { SalesTable, PaymentsTable } from 'src/types/ui.types';
type Props = {
  component: SalesTable | PaymentsTable;
};

const TableComponent = ({ component }: Props) => {
  const { columns, properties } = component;
  const columnsList = columns
    .filter((c) => c.visible)
    .sort((a, b) => a.order - b.order);
  const { header, rows } = properties;
  const {
    backgroundColor: HBG,
    textColor: HTC,
    fontSize: HFS,
    fontFamily: HFF,
  } = header;
  const headerProps = `text-[${HFF}] font-[${HFS}] text-[${HTC}]`;

  const {
    backgroundColor: RBG,
    textColor: RTC,
    fontSize: RFS,
    fontFamily: RFF,
  } = rows;
  const rowProps = `text-[${RFF}] font-[${RFS}] text-[${RTC}] text-center`;

  return (
    <table>
      <thead
        className={`border-collapse border-0 table-fixed ${headerProps}`}
        style={{ background: HBG }}
      >
        <tr className="sticky top-0 z-10">
          {columnsList.map((col) => (
            <th
              key={col.key}
              style={{ width: col.width, textAlign: col.align }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className={rowProps} style={{ background: RBG }}>
          <td className="p-1"></td>
        </tr>
      </tbody>
    </table>
  );
};
export default TableComponent;
