export interface UserState {
    user:null|{id:string,email:string,name:string,role:string},
    token:string|null,
    loading:boolean,
    error:string|null
}