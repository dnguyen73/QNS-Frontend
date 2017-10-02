export class Size {
    label: string;
    code: string;
    selected: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}