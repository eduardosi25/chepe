import {AvailabilityQuery} from "./availabilityquery";
import { Travel } from "./travel";
export class Schedule{
    query:AvailabilityQuery = new AvailabilityQuery();
    travels:Travel[] = [];
}