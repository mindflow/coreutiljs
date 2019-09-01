/* jshint esversion: 6 */

/**
 * Wrapper for an object and a function within that object.
 * Allows the function to be called with the object as it's first paramter
 */
export class ObjectFunction{

    /**
     * Contructor
     * @param {any} theObject 
     * @param {function} theFunction 
     */
    constructor(theObject,theFunction){
        this._object = theObject;
        this._function = theFunction;
    }

    /**
     * Get the object
     * @returns {any}
     */
    getObject(){
        return this._object;
    }

    /**
     * Get the function
     * @returns {function}
     */
    getFunction(){
        return this._function;
    }

    /**
     * Calls the function and passed the object as first parameter, and the provided paramter as the second paramter
     * @param {any} params 
     */
    call(params){
        this._function.call(this._object,params);
    }

}
