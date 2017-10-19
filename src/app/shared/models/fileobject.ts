export class FileObject {
    filename: string;
    filepath: string;
    filesize: number;
    thumbnail: string;
    isColor: boolean;
    description: string;
    file: File;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
