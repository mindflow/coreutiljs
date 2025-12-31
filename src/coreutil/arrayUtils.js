import { StringUtils } from "./stringUtils.js"

export class ArrayUtils {

    /**
     * 
     * @param {Array} array 
     * @param {String} delimiter 
     */
    static toString(array, delimiter) {
        let result = "";
        array.forEach((value, index) => {
            if (index > 0 && !StringUtils.isBlank(delimiter)) {
                result = result + delimiter;
            }
            if (value.toString) {
                result = result + value.toString();
            } else {
                result = result + value;
            }
        });
        return result;
    }

    /**
     * Merge multiple arrays into one
     * @param {Array<Array<any>>} sourceArrayArray
     * @return {Array<any>}
     */
    static merge(sourceArrayArray) {
        if (!sourceArrayArray || sourceArrayArray.length === 0) {
            return null;
        }
        
        const resultArray = new Array();
        sourceArrayArray.forEach((sourceArray) => {
            sourceArray.forEach((value) => {
                if (!resultArray.includes(value)) {
                    resultArray.push(value);
                }
            });
        });
        return resultArray;
    }

    /**
     * Add if not exists
     * @param {Array<any>} array 
     * @param {any} value 
     * @returns 
     */
    static add(array, value) {
        if (!array) {
            return null;
        }

        const newArray = new Array();
        array.forEach((item) => {
            if (item !== value) {
                newArray.push(item);
            }
        });
        newArray.push(value);
        return newArray;
    }

    /**
     * Loops over all values in the provided array and calls the provided function
     * with the value and parent as callback paramters. The listener must
     * itself return a promise which when resolved will continue the chain
     * 
     * @param {Array<any>} array
     * @param {ListListener} listener
     * @param {any} parent
     */
    static promiseChain(array, listener) {
        return new Promise((completedResolve, completedReject) => {
            ArrayUtils.promiseChainStep(listener, array, 0, completedResolve, completedReject);
        });
    }

    /**
     * 
     * @param {ListListener} listener 
     * @param {Array<T>} valueArray 
     * @param {Number} index 
     * @param {Function} completedResolve
     * @param {Function} completedReject
     */
    static async promiseChainStep(listener, valueArray, index, completedResolve, completedReject) {
        if (index >= valueArray.length) {
            completedResolve();
            return null;
        }
        try {
            await listener(valueArray[index]);
            ArrayUtils.promiseChainStep(listener, valueArray, index+1, completedResolve, completedReject);
        } catch (error) {
            completedReject(error);
        }
    }

    /**
     * 
     * @param {Object} value 
     * @param {Array<Object>} array 
     * @returns 
     */
    static contains(value, array) {
        if (!array) {
            return false;
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    }

}