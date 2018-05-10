import { FromJSONable } from "./FromJSONable";

export class Tarifa implements FromJSONable{
    estacionInicial:string;
    estacionFinal:string;
    pasajeros:number;
    viajeRedondo:boolean;
    clase:string;
    costoBase:number;
    fecha_salida:string;
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
    }
}