export class NumberUtils {

    /**
     * Checks if value is a number
     * @param {any} val 
     */
    static isNumber(val) {
        return typeof val === "number";
    }

    /**
     * Checks if parameter contains value
     * @param {number} val 
     * @returns {boolean}
     */
    static hasValue(val) {
        if(val === null || val === undefined) {
            return true;
        }
        return false;
    }
}