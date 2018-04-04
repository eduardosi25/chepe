import {Wagon} from "./wagon";
import {PassengerType} from "./passengertype";
import {TrainStop} from "./trainstop";
export class Route {
    id: number;
    name: string;
    wagons: Wagon[];
    passenger_types: PassengerType[];
    stops: TrainStop[];
    status: number = 1;
}