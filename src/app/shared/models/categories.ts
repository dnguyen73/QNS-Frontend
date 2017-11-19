export class Category {
    id: string;
    parentId: number;
    name: string;
    label: string;
    route: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}