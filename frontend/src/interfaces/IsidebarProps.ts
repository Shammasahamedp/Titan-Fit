import { AxiosResponse } from "axios";

export interface ISidebarProps {
    items:string[][];
    profilePicture?:string;
    role:'user'|'admin'|'trainer';
    uploadProfilePicApi?:(profilePic:string)=>Promise<AxiosResponse|undefined>
}