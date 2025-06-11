export interface INewTableProps<T>{
 columns:string[];
 tableDatas:T[];
 rederActions?:(item:T)=>React.ReactNode
 filterKeys?:(keyof T)[]
}

export interface BackendTableProps<T> extends Omit<INewTableProps<T>, 'columns'|'filterKeys'>{
  columns:[string,string][],
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSortChange: (key: keyof T, asc: boolean) => void;
  onSearchChange: (search: string) => void;
  sortKey?: string;
  sortAsc?: boolean;
  search?: string;
  filterKeys?:{key:keyof T;label:string;options:string[]}[];
  onFilterChange?:(key:keyof T,value:string)=>void;
  filters?:{[key:string]:string}
} 