import { useState, useMemo } from "react";
import { INewTableProps } from "@/interfaces/InewTableProps";
const NewTable = <T,>({ columns, tableDatas, rederActions, filterKeys = [] }: INewTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");

  const itemsPerPage = 5;

  // Filter
  const filteredData = useMemo(() => {
    if (!search) return tableDatas;
    return tableDatas.filter((item) =>
      filterKeys.some((key) =>
        String(item[key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tableDatas]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortAsc]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (col: keyof T) => {
    if (sortKey === col) setSortAsc((prev) => !prev);
    else {
      setSortKey(col);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg overflow-hidden ">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded text-white w-full md:w-1/3 border"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="w-full overflow-x-auto ">
      <table className="min-w-max w-full  border-collapse border border-gray-700">
        <thead>
          <tr className="bg-yellow-500 text-black">
            {columns.map((col) => (
              <th
                key={col}
                className="p-2 border border-gray-700 cursor-pointer"
                onClick={() => handleSort(col as keyof T)}
              >
                {col.toUpperCase()}
                {sortKey === col && (sortAsc ? " ▲" : " ▼")}
              </th>
            ))}
            {rederActions && <th className="p-2 border border-gray-700">ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="border border-gray-700 text-gray-300">
              {columns.map((col) => (
                <td key={col} className="p-2 text-center">
                  {col === "profilePicture" ? (
                    <img
                      src={String(item[col as keyof T]) || "/default-profile.png"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full mx-auto object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default-profile.png";
                      }}
                    />
                  ) : (
                    String(item[col as keyof T])
                  )}
                </td>
              ))}
              {rederActions && <td className="text-center">{rederActions(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewTable;
