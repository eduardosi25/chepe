import { StatusCode } from "./statuscode";
import { FromJSONable } from "./FromJSONable";

class Factory
{
    public static create<T>(type: (new () => T)): T {
        return new type();
    }
}
export class Response<T> implements FromJSONable{
    public constructor(status:string="-RCH.WS0.99",message:string=null,data:T=null){
        this.success = status != null ? status.startsWith("+"):false;
        this.status = new StatusCode();
        this.status.code = status;
        this.status.message = message;
        this.data = data;
    }
    instanceOfA(object: any): object is FromJSONable {
        return true;
    }
    parseJSONObject(object: Object) {
        if(!object){return;}
        let data = object["data"];
        this.success = object["success"];
        this.status = new StatusCode(); this.status.parseJSONObject(object["status"]);
        if(this.instanceOfA(this.data)){
            this.data.parseJSONObject(data);
        }
    }
    parseJSONObject2(object:Object,cl:{new()}){
        if(!object){return;}
        this.success = object["success"];
        this.status = new StatusCode(); this.status.parseJSONObject(object["status"]);
        let x:Object[] = object["data"];
        for(var i=0;i<x.length;i++){
            let y:Object = x[i];
            let z = new cl();
            if(this.instanceOfA(z)){
                z.parseJSONObject(y);
                if(this.data instanceof Array){
                    this.data.push(z);
                }
            }
        }

    }
    public success:boolean;
    public status:StatusCode;
    public data:T;
}