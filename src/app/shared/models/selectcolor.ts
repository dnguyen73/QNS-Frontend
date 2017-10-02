export class SelectColor {
    parentId: number;     //category identifier
    filename: string;
    description: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
