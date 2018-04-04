export class StatusCode{
    code:string;
    message:string;
    toString():string{
        return "["+this.code+"] "+this.message;
    }
}