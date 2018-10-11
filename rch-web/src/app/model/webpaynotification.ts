import { FromJSONable } from "./FromJSONable";
export class WebPayNotification implements FromJSONable {    
    notification_id: number;
    reference: string;
    response: string;
    folio_c_pagos: string;
    auth: string;
    cd_response: string;
    cd_error: string;
    nb_error: string;
    date: string;
    time: string;
    cc_number: string;
    amount: string;
    nb_company: string;
    nb_merchang: string;
    cc_type: string;
    emv_key_date: string;
    id_url: string;
    email: string;
    datos_adicionales: string;

    public constructor(notification_id:number=0, reference:string="",response: string="", folio_c_pagos: string="",auth: string="",cd_response: string="",cd_error: string="",
        nb_error: string="", date: string="",time: string="",cc_number: string="",amount: string="",nb_company: string="",nb_merchang: string="",cc_type: string="",
        emv_key_date: string="",id_url: string="",email: string="",datos_adicionales: string="") {
            this.notification_id = notification_id;
            this.reference = reference;
            this.response = response;
            this.folio_c_pagos = folio_c_pagos;
            this.auth = auth;
            this.cd_response = cd_response;
            this.cd_error = cd_error;
            this.nb_error = nb_error;
            this.date = date;
            this.time = time;
            this.cc_number = cc_number;
            this.amount = amount;
            this.nb_company = nb_company;
            this.nb_merchang = nb_merchang;
            this.cc_type = cc_type;
            this.emv_key_date = emv_key_date;
            this.id_url = id_url;
            this.email = email;
            this.datos_adicionales = datos_adicionales;
            
    }
    parseJSONObject(object: Object) {
        if (!object) { return; }
        Object.assign(this, object);
    }

}
