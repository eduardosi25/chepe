import { FromJSONable } from "./FromJSONable";

export class WagonType implements FromJSONable{
    public constructor(id:number=0,name:string="",status:number=1,
    details:string="",img_banner:string="assets/img/regional-clasico.jpg",
    img_mobile:string = "assets/img/reservacion/vagon-clasico-regional.png",
    features:string[]=[]){
        this.id = id;
        this.name = name;
        this.status = status;
        this.details = details;
        this.img_banner = img_banner;
        this.img_mobile = img_mobile;
        this.features = features;
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
    }
    id:number;
    name:string;
    status:number=1;
    public img_banner:string = "assets/img/regional-clasico.jpg";
    public img_mobile:string = "assets/img/reservacion/vagon-clasico-regional.png";
    public details:string = "";
    public features:string[] = [];
}