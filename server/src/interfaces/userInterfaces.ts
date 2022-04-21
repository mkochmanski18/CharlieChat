export interface userData{
    userid:string;
    name:string;
    email:string;
    sex:string;
    status?:boolean;
    confirmed?:boolean;
}
export interface userDataForUpdate{
    userid:string;
    name:string;
    sex:string;
    email:string;
}