
import { ITableProps } from "@/interfaces/ItableProps";

const Table = <T,>({ columns, tableDatas }: ITableProps<T>) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg max-w-[1000px]">
      {/* Wrapper for horizontal and vertical scrolling */}
      <div className="overflow-x-auto max-h-[400px] max-w-[1000px]">
        <table className="min-w-max table-fixed border-collapse border border-gray-700">
          <thead>
            <tr className="bg-yellow-500 text-black">
              {columns.map((header, index) => (
                <th key={index} className="p-2 border border-gray-700">
                  {header.toLowerCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDatas?.map((tableData, index) => (
              <tr key={index} className="border">
                {columns.map((colKey, colIndex) => (
                  <td key={colIndex} className="text-center p-4 text-gray-400">
                    {colKey === 'action' ?'':
                    (tableData as any )[colKey] ||''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;



