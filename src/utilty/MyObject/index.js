export class MyObject {
    obj = null;
    constructor(obj) {
        this.obj = obj;
    }

    removeObject(key) {
        const newObj = { ...this.obj };
        delete newObj[key];
        return newObj;
    }

    toArray() {
        return Object.keys(this.obj || {}).map(key => ({
            ...this.obj[key],
            uid: key
        }))
    }
}