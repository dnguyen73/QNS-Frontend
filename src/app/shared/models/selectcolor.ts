export class SelectColor {
    parentId: number;     //category identifier
    filename: string;
    description: string;
    selected: boolean;
    activated: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
