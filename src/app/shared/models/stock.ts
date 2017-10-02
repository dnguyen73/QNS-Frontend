export class Stock {
    filename: string;
    description: string;
    size: string;
    quantity: number;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
