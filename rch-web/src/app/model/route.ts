import {Wagon} from "./wagon";
import {PassengerType} from "./passengertype";
import {TrainStop} from "./trainstop";
import {Direction} from "./direction";
export class Route {
    public id: number;
    public name: string;
    public wagons: Wagon[];
    public passenger_types: PassengerType[];
    public stops: TrainStop[];
    public status: number = 1;
    public img_url:string = "";
    public img_map:string = "";
    public max_stops:number = 3;

    private first:TrainStop = null;
    private last:TrainStop = null;
    public getLastTrainStop(direction:number = Direction.up):TrainStop{
        if(this.last != null && direction == Direction.up){return this.last;}
        if(this.first != null && direction == Direction.down){return this.first;}
        var ts:TrainStop = null;
        for(var i=0;i<this.stops.length;i++){
            let tts:TrainStop = this.stops[i];
            if(ts == null){
                ts = tts;
            }else{
                if(direction == Direction.up){
                    if(tts.km > ts.km){
                        ts = tts;
                    }
                }else if(direction == Direction.down){
                    if(tts.km < ts.km){
                        ts = tts;
                    }
                }
            }
        }
        if(direction == Direction.up){this.last = ts;}
        if(direction == Direction.down){this.first = ts;}
        return ts;
    }
    public getFirstTrainStop(direction:number = Direction.up):TrainStop{
        if(this.first != null && direction == Direction.up){return this.first;}
        if(this.last != null && direction == Direction.down){return this.last;}
        var ts:TrainStop = null;
        for(var i=0;i<this.stops.length;i++){
            let tts:TrainStop = this.stops[i];
            if(ts == null){
                ts = tts;
            }else{
                if(direction == Direction.down){
                    if(tts.km > ts.km){
                        ts = tts;
                    }
                }else if(direction == Direction.up){
                    if(tts.km < ts.km){
                        ts = tts;
                    }
                }
            }
        }
        if(direction == Direction.down){this.last = ts;}
        if(direction == Direction.up){this.first = ts;}
        return ts;
    }
    public getSrcs(direction:number=Direction.up):TrainStop[]{
        return this.stops;
    }
    public getDsts(direction:number=Direction.up,id_src:number):TrainStop[]{
        var tss:TrainStop[] = [];
        for(var i=0;i<this.stops.length;i++){
            let ts:TrainStop = this.stops[i];
            if(ts.id == id_src){continue;}
            tss.push(ts);
        }
        return tss;
    }
    public getDirection(src:TrainStop,dst:TrainStop):number{
        return (src.km > dst.km)?Direction.down:Direction.up;
    }
}