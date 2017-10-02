export class Category {
    id: number;
    description: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}