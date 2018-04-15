import { FromJSONable } from "./FromJSONable";

export class StatusCode implements FromJSONable{
    code:string;
    message:string;
    toString():string{
        return "["+this.code+"] "+this.message;
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
    }
}