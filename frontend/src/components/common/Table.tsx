import { ITableProps } from "@/interfaces/ItableProps";
const Table = <T,>({ columns, tableDatas }: ITableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-gray-900 p-4 rounded-lg max-w-full">
      <table className="w-full border-collapse border border-gray-700 min-w-[600px]">
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
          {/* Empty state (Replace with actual data dynamically) */}
          {tableDatas.map((tableData, index) => (
            <tr key={index} className="border">
              {Object.values(tableData as string).map((value, colIndes) => (
                <td className="text-center p-4 text-gray-400">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
