import { TrainStop } from "./trainstop";

export class AvailabilityQuery2{
    public src:TrainStop;
    public dst:TrainStop;
    public start:string;
    public end:string;
    public passengers = {};
    public stops = [];
}