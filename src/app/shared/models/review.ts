export class Review {
    name: string;
    email: string;
    title: string;
    comment: string;
    rating: number;
    createdDate: Date;
    status: boolean;
    productId: string;
    productCode: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
