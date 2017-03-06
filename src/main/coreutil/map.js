export class Map {

    constructor() {
        this._map = {};
    }

    size(){
        return Object.keys(this._map).length;
    }

    get(name) {
        return this._map[name];
    }

    set(name,value) {
        this._map[name] = value;
    }

    exists(name){
        if (name in this._map) {
            return true;
        }
        return false;
    }

    forEach(listener,parent) {
        for(let key in this._map) {
            if(!listener(key,this._map[key],parent)){
                break;
            }
        }
    }

}
