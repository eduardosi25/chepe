export class Seat{
    public constructor(id:number=0,id_wagon:number=0,name:string="A1",status:number=1){
        this.id = id;
        this.id_wagon = id_wagon;
        this.name = name;
        this.status = status;
    }
    id:number;
    id_wagon:number;
    name:string;
    status:number = 1;
}