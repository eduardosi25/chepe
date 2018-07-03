import { FromJSONable } from "./FromJSONable";
export class Country implements FromJSONable {    
    id: number;
    nombre_es: string;
    nombre_en: string;

    public constructor(id: number = 0, nombre_es: string = "", nombre_en: string = "") {
        this.id = id;
        this.nombre_es = nombre_es;
        this.nombre_en = nombre_en;
    }
    parseJSONObject(object: Object) {
        if(!object){return;}
        Object.assign(this, object);
    }
}