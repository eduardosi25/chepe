export class BillFiscal {
    constructor(   
        public razon_social:String,
        public rfc:String,
        public forma_pago:String,
        public uso_cfdi:String,
        public calle:String,
        public no_ext:String,
        public no_int:String,
        public cp:String,
        public colonia:String,
        public municipio:String,
        public estado:String,
        public pais:String,
        public correo_electronico:String,
        public telefono:String,
        public conceptos:[{
            clave: String,
            monto_neto:number,
            impuestos:number,
            fecha_venta:String
        }]
    ){}
}