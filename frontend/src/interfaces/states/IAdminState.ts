export interface AdminState {
    admin:null|{id:string,email:string,name:string,role:string},
    token:string|null,
    adminLoading:boolean,
    error:string|null
}