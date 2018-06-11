import { FromJSONable } from "./FromJSONable";

export class UrlWebPay implements FromJSONable{
    url:string;
    constructor(url:string=null){
        this.url = url;
    }
    toString():string{
        return  this.url;
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
    }
}