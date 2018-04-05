import { TrainStop } from "./trainstop";

export class AvailabilityQuery2{
    public src:TrainStop = null;
    public dst:TrainStop = null;
    public start:string = (new Date()).toString();
    public end:string = (new Date()).toString();
    public passengers = [0,1,0,0,0,0,0,0,0];
    public stops = {};
    public getTotalPassengers():number{
        var n:number = 0;

        for(var i in this.passengers){
            let n2:number = this.passengers[i];
            n+=n2;
        }

        return n;
    }
}