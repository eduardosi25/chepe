import { FromJSONable } from "./FromJSONable";
export class Referencia implements FromJSONable {    
    id: string;
    liga: string;
    public constructor(id: string = "", liga: string = "") {
        this.id = id;
        this.liga = this.liga;
    }
    parseJSONObject(object: Object) {
        if (!object) { return; }
        Object.assign(this, object);
    }

}