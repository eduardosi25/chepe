import { FromJSONable } from "./FromJSONable";

export class SessionToken implements FromJSONable{
    constructor(token:string = ""){
        this.token = token;
        let now:Date = new Date();
        this.expires_at = new Date(now.getTime()+(1000*60*5)).toString();
        this.created_at = now.toString();
        this.updated_at = now.toString();
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
    }
    token:string;
    expires_at:string;
    created_at:string;
    updated_at:string;
}