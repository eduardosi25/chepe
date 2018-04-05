import {Wagon} from "./wagon";
import {PassengerType} from "./passengertype";
import {TrainStop} from "./trainstop";
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
    public getLastTrainStop(direction:number = 0):TrainStop{
        if(this.last != null && direction == 0){return this.last;}
        if(this.first != null && direction == 1){return this.first;}
        var ts:TrainStop = null;
        for(var i=0;i<this.stops.length;i++){
            let tts:TrainStop = this.stops[i];
            if(ts == null){
                ts = tts;
            }else{
                if(direction == 0){
                    if(tts.km > ts.km){
                        ts = tts;
                    }
                }else if(direction == 1){
                    if(tts.km < ts.km){
                        ts = tts;
                    }
                }
            }
        }
        if(direction == 0){this.last = ts;}
        if(direction == 1){this.first = ts;}
        return ts;
    }
    public getFirstTrainStop(direction:number = 0):TrainStop{
        if(this.first != null && direction == 0){return this.first;}
        if(this.last != null && direction == 1){return this.last;}
        var ts:TrainStop = null;
        for(var i=0;i<this.stops.length;i++){
            let tts:TrainStop = this.stops[i];
            if(ts == null){
                ts = tts;
            }else{
                if(direction == 1){
                    if(tts.km > ts.km){
                        ts = tts;
                    }
                }else if(direction == 0){
                    if(tts.km < ts.km){
                        ts = tts;
                    }
                }
            }
        }
        if(direction == 1){this.last = ts;}
        if(direction == 0){this.first = ts;}
        return ts;
    }
}