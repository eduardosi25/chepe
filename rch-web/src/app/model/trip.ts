import { FromJSONable } from "./FromJSONable";

export class Trip implements FromJSONable{
    id_src:number;
    id_dst:number;
    start:Date;
    constructor(id_src:number=0,id_dst:number=0,start:Date){
        this.id_src = id_src;
        this.id_dst = id_dst;
        this.start = start;
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
    }
}