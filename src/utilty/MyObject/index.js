export class MyObject{
    obj = null;
    constructor(obj) {
        this.obj = obj;
    }
    toArray() {
        return Object.keys(this.obj || {}).map(key => ({
            ...this.obj[key],
            uid: key
        }))
    }
}