export interface TrainerState {
    trainer:null|{_id:string,email:string,name:string,role:string},
    token:string|null,
    trainerLoading:boolean,
    error:string|null
}