/**
 * Wrapper for an object and a function within that object.
 * Allows the function to be called with the object as it's first paramter
 * 
 * @template T
 * @template F
 */
export class Method{

    /**
     * Contructor
     * @param {F} theFunction 
     * @param {T} theObject 
     */
    constructor(theFunction, theObject = null){

        /** @type {T} */
        this.object = theObject;

        /** @type {function} */
        this.function = theFunction;
        if (this.function === null || this.function === undefined || typeof this.function !== 'function') {
            console.trace();
            throw new Error("Method function missing");
        }
    }

    /**
     * Calls the function and passed the object as first parameter,  and the provided paramter as the second paramter
     * @param {any} param
     */
    call(param){
        const targetObject = this.object ? this.object : this;
        if (Array.isArray(param)) {
            return this.function.call(targetObject, ...param);
        }
        return this.function.call(targetObject, param);
    }

}
