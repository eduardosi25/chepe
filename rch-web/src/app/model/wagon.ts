import {WagonType} from "./wagontype"
import {Seat} from "./seat";
export class Wagon {
    id: number;
    type: WagonType;
    name: string;
    status: number = 1;
    seats: Seat[];
}