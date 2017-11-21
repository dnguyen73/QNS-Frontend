export class Province {
    id: string; //auto gen from loopback
    name: string;
    code: string;
    charge: number;
    isEdit: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
