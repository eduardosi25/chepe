export class WagonType{
    public constructor(id:number=0,name:string="",status:number=1){
        this.id = id;
        this.name = name;
        this.status = status;
    }
    id:number;
    name:string;
    status:number=1;
}