import { FromJSONable } from "./FromJSONable";

export class Departure implements FromJSONable{
    public constructor(id:number=0,id_trainstop:number=0,weekday:number=0,time:string="00:00:01",direction:number = 0,status:number=1){
        this.id = id;
        this.id_trainstop = id_trainstop;
        this.weekday = weekday;
        this.time = time;
        this.status = status;
        this.direction = direction;
    }
    parseJSONObject(object: Object) {
        if(!object){return;}
        Object.assign(this,object);
    }
    id:number;
    id_trainstop:number;
    weekday:number;
    time:string;
    status:number = 1;
    direction:number = 0;
}