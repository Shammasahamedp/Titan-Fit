import { BackendTableProps } from "@/interfaces/InewTableProps";


const BackendTable = <T,>({
  columns,
  tableDatas,
  rederActions,
  filterKeys = [],
  currentPage,
  totalPages,
  onPageChange,
  onSortChange,
  onSearchChange,
  onFilterChange,
  filters,
  sortKey,
  sortAsc,
  search = ""
}: BackendTableProps<T>) => {
  const handleSort = (col: keyof T) => {
    if (sortKey === col) onSortChange(col, !sortAsc);
    else onSortChange(col, true);
  };

  return (
    <div className="bg-black/30 p-4 rounded-lg overflow-hidden">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded text-white w-full md:w-1/3 border"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {filterKeys.length > 0 && (
  <div className="mb-4 flex flex-wrap gap-4">
    {filterKeys.map((filter) => (
      <div key={filter.key.toString()}>
        <label className="text-white mr-2">{filter.label}</label>
        <select
          value={filters&&filters[filter.key as string] || ""}
          onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All</option>
          {filter.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>
)}

      <div className="w-full overflow-x-auto">
        <table className="min-w-max w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-yellow-500 text-black">
              {columns.map((col) => (
                <th
                  key={col[0]}
                  className="p-2 border border-gray-700 cursor-pointer"
                  onClick={() => handleSort(col[0] as keyof T)}
                >
                  {col[1].toUpperCase()}
                  {sortKey === col[1] && (sortAsc ? " ▲" : " ▼")}
                </th>
              ))}
              {rederActions && (
                <th className="p-2 border border-gray-700">ACTIONS</th>
              )}
            </tr>
          </thead>
          <tbody>
            <>
            {tableDatas.map((item, index) => (
            
              <tr key={index} className="border border-gray-700 text-gray-300">
                {columns.map((col) => (
                  
                  <td key={col[1]} className="p-2 text-center">
                   
                    {col[0] === "profilePicture" ? (
                      <img
                        src={String(item[col[0] as keyof T]) || "/default-profile.png"}
                        alt="Profile"
                        className="h-10 w-10 rounded-full mx-auto object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/default-profile.png";
                        }}
                      />
                    ) : (
                      String(item[col[0] as keyof T])
                    )}
                  </td>
                ))}
                {rederActions && (
                  <td className="text-center">{rederActions(item)}</td>
                )}
              </tr>
            ))}
            </>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackendTable;
