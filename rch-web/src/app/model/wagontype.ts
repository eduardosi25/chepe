import { FromJSONable } from "./FromJSONable";

export class WagonType implements FromJSONable {
    public constructor(id: number = 0, name: string = "", status: number = 1,
        details: string = "", img_banner: string = "assets/img/regional-clasico.jpg",
        img_mobile: string = "assets/img/reservacion/vagon-clasico-regional.png",
        features: string[] = [], id_clase: number = 0, numero_carro: number = 0) {
        this.id = id;
        this.id_clase = id_clase;
        this.name = name;
        this.status = status;
        this.details = details;
        this.img_banner = img_banner;
        this.img_mobile = img_mobile;
        this.features = features;
        this.numero_carro = numero_carro;
    }
    parseJSONObject(object: Object) {
        if (!object) { return; }
        Object.assign(this, object);
    }
    id: number;
    id_clase: number;
    name: string;
    status: number = 1;
    public img_banner: string = "assets/img/regional-clasico.jpg";
    public img_mobile: string = "assets/img/reservacion/vagon-clasico-regional.png";
    public details: string = "";
    public features: string[] = [];
    numero_carro : number;
}