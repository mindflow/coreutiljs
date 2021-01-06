/**
 * Wrapper for an object and a function within that object.
 * Allows the function to be called with the object as it's first paramter
 * 
 * @template T
 * @template F
 */
export class ObjectFunction{

    /**
     * Contructor
     * @param {T} theObject 
     * @param {F} theFunction 
     */
    constructor(theObject, theFunction){
        this.object = theObject;
        this.function = theFunction;
    }

    /**
     * Get the object
     * @returns {T}
     */
    getObject(){
        return this.object;
    }

    /**
     * Get the function
     * @returns {F}
     */
    getFunction(){
        return this.function;
    }

    /**
     * Calls the function and passed the object as first parameter, and the provided paramter as the second paramter
     * @param {any} param
     */
    call(param){
        if (Array.isArray(param)) {
            return this.function.call(this.object, ...param);
        }
        return this.function.call(this.object, param);
    }

}
