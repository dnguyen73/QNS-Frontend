import { ShippingInfo } from "./shippinginfo";
import { CartItem } from "./cartitem";

export class Order {
    userInfo: ShippingInfo;
    orderCode: string;
    orderDate: Date;
    shippingFee: number;
    orderAmount: number;
    totalAmount: number;
    items: CartItem[];
    notes: string;
    paymentStatus: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
