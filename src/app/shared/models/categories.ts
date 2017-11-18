export class Category {
    id: string;
    parentId: number;
    name: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}