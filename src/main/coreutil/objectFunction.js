export class ObjectFunction{

    constructor(theObject,theFunction){
        this._object = theObject;
        this._function = theFunction;
    }

    getObject(){
        return this._object;
    }

    getFunction(){
        return this._function;
    }

    call(params){
        this._function.call(this._object,params);
    }

}
