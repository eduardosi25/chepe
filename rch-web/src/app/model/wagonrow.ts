import { Seat } from "./seat";

export class WagonRow{
    public cols:Seat[] = [];

    public getSeatClasses(i:number,seat:Seat){
        var cls:string[] = [];
        cls.push("seat");
        switch(i){
            case 0:cls.push("left");cls.push("regseatlb");break;
            case 1:cls.push("left");cls.push("regseatrb");break;
            case 2:cls.push("right");cls.push("regseatlb");break;
            case 3:cls.push("right");cls.push("regseatrb");break;
        }
        cls.push(seat.getStatusClass());
        return cls.join(" ");
    }
}