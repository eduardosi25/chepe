import { StatusCode } from "./statuscode";

export class Response<T>{
    public constructor(status:string="-RCH.WS0.99",message:string=null,data:T=null){
        this.success = status.startsWith("+");
        this.status = new StatusCode();
        this.status.code = status;
        this.status.message = message;
        this.data = data;
    }
    public success:boolean;
    public status:StatusCode;
    public data:T;
}