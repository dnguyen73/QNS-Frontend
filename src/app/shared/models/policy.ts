export class Policy {
    id: string; //auto gen from loopback
    type: string;
    content: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
