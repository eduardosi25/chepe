import { StatusCode } from "./statuscode";

export class Response<T>{
    success:boolean;
    status:StatusCode;
    data:T;
}