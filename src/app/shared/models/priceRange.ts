export class PriceRange {
    min: number;
    max: number;
    label: string;
    selected: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
