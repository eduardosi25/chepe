import { Referencia } from "./referencia"
import { FromJSONable } from "./FromJSONable";
export class WebPay implements FromJSONable {    
    descripcion: string;
    referencia: Referencia = new Referencia();
    estatus: string;

    public constructor(descripcion: string = "", ref: Referencia = null, estatus: string = "") {
        this.descripcion = descripcion;
        this.referencia = ref;
        this.estatus = name;
    }
    parseJSONObject(object: Object) {
        if (!object) { return; }
        Object.assign(this, object);
        this.referencia = new Referencia(); this.referencia.parseJSONObject(object["referencia"]);
    }

}