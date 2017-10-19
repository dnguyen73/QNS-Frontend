export class ShippingInfo {
    fullname: string;
    email: string;
    phone: string;
    province: string;
    address: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
