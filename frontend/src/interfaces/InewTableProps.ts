export interface INewTableProps<T>{
 columns:string[];
 tableDatas:T[];
 rederActions?:(item:T)=>React.ReactNode
 filterKeys?:(keyof T)[]
}