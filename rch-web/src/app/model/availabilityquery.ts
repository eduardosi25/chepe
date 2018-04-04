export class AvailabilityQuery{
    id_route:number;
    id_src:number;
    id_dst:number;
    stops:number[];
    start:string;
    end:string;
    passengers:number=1;
}