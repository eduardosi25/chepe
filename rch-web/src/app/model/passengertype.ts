import { FromJSONable } from "./FromJSONable";

export class PassengerType implements FromJSONable{
    constructor(id:number=0,name:string="",details:string="",min:number=0,max:number=100){
        this.id = id;
        this.name = name;
        this.details = details;
        this.min = min;
        this.max = max;
    }
    parseJSONObject(object: Object) {
        Object.assign(this,object);
    }
    id:number;
    name:string;
    details:string;
    min:number = 0;
    max:number = 100;
}