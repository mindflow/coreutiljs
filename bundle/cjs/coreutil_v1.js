'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class BooleanUtils {

    /**
     * Check for boolean type
     * @param {any} val 
     * @returns {boolean}
     */
    static isBoolean(val) {
        return typeof val === "boolean";
    }

    /**
     * Check if boolean has value
     * @param {boolean} val 
     * @returns {boolean}
     */
    static hasValue(val) {
        if(val ==! null && val ==! undefined) {
            return true;
        }
        return false;
    }

    /**
     * Check is boolean is true
     * @param {boolean} val 
     * @returns {boolean}
     */
    static isTrue(val) {
        if(val === true) {
            return true;
        }
        return false;
    }

    /**
     * Check if boolean is false
     * @param {boolean} val 
     * @returns {boolean}
     */
    static isFalse(val) {
        if(val === false) {
            return true;
        }
        return false;
    }
}

/* jshint esversion: 6 */

/**
 * Generic List class
 */
class List {

    /**
     * Create new list and optionally assign existing array
     * 
     * @param {Array} values 
     */
    constructor(values) {
        if(values !== undefined && values instanceof Array){
            this._list = values;
        }else{
            this._list = [];
        }
    }

    /**
     * Get value of position
     * 
     * @param {number} index 
     * @return {any}
     */
    get(index) {
        return this._list[index];
    }

    /**
     * Set value on position
     * 
     * @param {number} index 
     * @param {any} value 
     */
    set(index,value) {
        this._list[index] = value;
        return this;
    }

    /**
     * Add value to end of list
     * 
     * @param {any} value 
     */
    add(value) {
        this._list.push(value);
    }

    /**
     * Get the size of the list
     * 
     * @return {number}
     */
    size() {
        return this._list.length;
    }

    /**
     * Checks if value on index is equal to paramter
     * @param {number} index 
     * @param {any} val 
     * @returns {boolean}
     */
    valueAtEquals(index,val) {
        if(this.get(index) !== null && this.get(index) !== undefined){
            return this.get(index) === val;
        }
        return false;
    }

    /**
     * Checks if first value is equal to parameter
     * @param {any} val 
     * @returns {boolean}
     */
    firstValueEquals(val) {
        return this.valueAtEquals(0,val);
    }

    /**
     * Loops over all values in the list and calls the provided function
     * with the key, value and parent as callback paramters while the
     * called function returns true or the list is fully iterated
     * @param {function} listener
     * @param {any} parent
     */
    forEach(listener,parent) {
        for(let val of this._list) {
            if(!listener(val,parent)){
                break;
            }
        }
    }

    /**
     * Adds all entries from provided list
     * @param {List} sourceList 
     */
    addAll(sourceList){
        sourceList.forEach(function(value,parent) {
            parent.add(value);
            return true;
        },this);
    }

}

/* jshint esversion: 6 */

class Logger{

    /**
     * Disables debugging
     */
    static disableDebug() {
        Logger.debugEnabled = false;
    }

    /**
     * Enables debugging
     */
    static enableDebug() {
        Logger.debugEnabled = true;
    }

    /**
     * Logs the value to console
     * @param {string} value 
     */
    static log(value){
        console.log(value);
    }

    /**
     * Logs the value with indendentation
     * @param {number} depth 
     * @param {string} value 
     */
    static debug(depth, value){
        if(!Logger.debugEnabled){
            return;
        }
        let line = '';
        line = line + depth;
        for(let i = 0 ; i < depth ; i++){
            line = line + ' ';
        }
        line = line + value;
        console.log(line);
    }

    /**
     * Logs a warning to the console
     * @param {string} value 
     */
    static warn(value){
        console.warn('------------------WARN------------------');
        console.warn(value);
        console.warn('------------------/WARN------------------');
    }

    /**
     * Logs the error to the console
     * @param {string} value 
     */
    static error(value){
        console.error('------------------ERROR------------------');
        console.error(value);
        console.error('------------------/ERROR------------------');
    }

    /**
     * Prints a marker '+' in above the given position of the value
     * @param {string} value 
     * @param {number} position 
     */
    static showPos(value,position){
        if(!Logger.debugEnabled){
            return;
        }
        let cursorLine = '';
        for(let i = 0 ; i < value.length ; i++) {
            if(i == position){
                cursorLine = cursorLine + '+';
            }else{
                cursorLine = cursorLine + ' ';
            }
        }
        console.log(cursorLine);
        console.log(value);
        console.log(cursorLine);

    }

}
Logger.debugEanbled = false;

/* jshint esversion: 6 */

class Map {

    constructor() {
        this._map = {};
    }

    /**
     * Gets the size of the map
     * @returns {number}
     */
    size() {
        return Object.keys(this._map).length;
    }

    /**
     * Returns the object at given key
     * @param {any} name 
     */
    get(name) {
        return this._map[name];
    }

    /**
     * Sets value at key
     * @param {string} key 
     * @param {any} value 
     */
    set(key,value) {
        this._map[key] = value;
        return this;
    }

    /**
     * Checks if key exists
     * @param {string} key 
     * @returns {boolean}
     */
    contains(key) {
        return this.exists(key);
    }

    /**
     * Checks if key exists
     * @param {string} key 
     * @returns {boolean}
     */
    exists(key){
        if (key in this._map) {
            return true;
        }
        return false;
    }

    /**
     * Loops over all values in the map and calls the provided function
     * with the key, value and parent as callback paramters while the
     * called function returns true or the list is fully iterated
     * @param {function} listener 
     * @param {any} parent 
     */
    forEach(listener,parent) {
        for(let key in this._map) {
            if(!listener(key,this._map[key],parent)){
                break;
            }
        }
    }

    /**
     * Adds all entries from provided map
     * @param {Map} sourceMap 
     */
    addAll(sourceMap){
        sourceMap.forEach(function(key,value,parent) {
            parent.set(key,value);
            return true;
        },this);
    }

}

class NumberUtils {

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

/* jshint esversion: 6 */

/**
 * Wrapper for an object and a function withing that object.
 * Allows the function to be called with the object as it's first paramter
 */
class ObjectFunction{

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

/* jshint esversion: 6 */

class PropertyAccessor{

    /**
     * 
     * @param {*} destination 
     * @param {*} name 
     */
    static getValue(destination, name) {
        var pathArray = name.split('.');
        for (var i = 0, n = pathArray.length; i < n; ++i) {
            var key = pathArray[i];
            if (key in destination) {
                destination = destination[key];
            } else {
                return;
            }
        }
        return destination;
    }

    /**
     * 
     * @param {*} destination 
     * @param {*} name 
     * @param {*} value 
     */
    static setValue(destination, name, value) {
        var pathArray = name.split('.');
        for (var i = 0, n = pathArray.length; i < n; ++i) {
            var key = pathArray[i];
            if(i == n-1){
                destination[key] = value;
                return;
            }
            if (!(key in destination) || destination[key] === null) {
                destination[key] = {};
            }
            destination = destination[key];
        }
    }

}

/* jshint esversion: 6 */

class StringUtils{

    static isInAlphabet(val) {
        if (val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90) {
            return true;
        }
        if ( val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122 ) {
            return true;
        }
        if ( val.charCodeAt(0) >= 48 && val.charCodeAt(0) <= 57 ) {
            return true;
        }
        return false;
    }

    static isString(val) {
        return typeof val === "string";
    }

    static isBlank(val) {
        if(!StringUtils.hasValue(val) || val === "") {
            return true;
        }
        return false;
    }

    static hasValue(val) {
        if(val ==! null && val ==! undefined) {
            return true;
        }
        return false;
    }
}

exports.BooleanUtils = BooleanUtils;
exports.List = List;
exports.Logger = Logger;
exports.Map = Map;
exports.NumberUtils = NumberUtils;
exports.ObjectFunction = ObjectFunction;
exports.PropertyAccessor = PropertyAccessor;
exports.StringUtils = StringUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9ib29sZWFuVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbGlzdC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9sb2dnZXIuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWFwLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL251bWJlclV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL29iamVjdEZ1bmN0aW9uLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL3Byb3BlcnR5QWNjZXNzb3IuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvc3RyaW5nVXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJvb2xlYW5VdGlscyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBmb3IgYm9vbGVhbiB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsIFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0Jvb2xlYW4odmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBoYXMgdmFsdWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcclxuICAgICAgICBpZih2YWwgPT0hIG51bGwgJiYgdmFsID09ISB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlzIGJvb2xlYW4gaXMgdHJ1ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWwpIHtcclxuICAgICAgICBpZih2YWwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGJvb2xlYW4gaXMgZmFsc2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0ZhbHNlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuLyoqXG4gKiBHZW5lcmljIExpc3QgY2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIExpc3Qge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBsaXN0IGFuZCBvcHRpb25hbGx5IGFzc2lnbiBleGlzdGluZyBhcnJheVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZXMpIHtcbiAgICAgICAgaWYodmFsdWVzICE9PSB1bmRlZmluZWQgJiYgdmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgdGhpcy5fbGlzdCA9IHZhbHVlcztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGlzdFtpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHZhbHVlIHRvIGVuZCBvZiBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9saXN0LnB1c2godmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2l6ZSBvZiB0aGUgbGlzdFxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIG9uIGluZGV4IGlzIGVxdWFsIHRvIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWVBdEVxdWFscyhpbmRleCx2YWwpIHtcbiAgICAgICAgaWYodGhpcy5nZXQoaW5kZXgpICE9PSBudWxsICYmIHRoaXMuZ2V0KGluZGV4KSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCkgPT09IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZmlyc3RWYWx1ZUVxdWFscyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBdEVxdWFscygwLHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IHZhbCBvZiB0aGlzLl9saXN0KSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIodmFsLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIGxpc3RcbiAgICAgKiBAcGFyYW0ge0xpc3R9IHNvdXJjZUxpc3QgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZUxpc3Qpe1xuICAgICAgICBzb3VyY2VMaXN0LmZvckVhY2goZnVuY3Rpb24odmFsdWUscGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgZGVidWdnaW5nXG4gICAgICovXG4gICAgc3RhdGljIGRpc2FibGVEZWJ1ZygpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgZGVidWdnaW5nXG4gICAgICovXG4gICAgc3RhdGljIGVuYWJsZURlYnVnKCkge1xuICAgICAgICBMb2dnZXIuZGVidWdFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB2YWx1ZSB0byBjb25zb2xlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBsb2codmFsdWUpe1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgdmFsdWUgd2l0aCBpbmRlbmRlbnRhdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIGRlYnVnKGRlcHRoLCB2YWx1ZSl7XG4gICAgICAgIGlmKCFMb2dnZXIuZGVidWdFbmFibGVkKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGluZSA9ICcnO1xuICAgICAgICBsaW5lID0gbGluZSArIGRlcHRoO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGRlcHRoIDsgaSsrKXtcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgPSBsaW5lICsgdmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nIHRvIHRoZSBjb25zb2xlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyB3YXJuKHZhbHVlKXtcbiAgICAgICAgY29uc29sZS53YXJuKCctLS0tLS0tLS0tLS0tLS0tLS1XQVJOLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgICAgIGNvbnNvbGUud2Fybih2YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUud2FybignLS0tLS0tLS0tLS0tLS0tLS0tL1dBUk4tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBlcnJvciB0byB0aGUgY29uc29sZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZXJyb3IodmFsdWUpe1xuICAgICAgICBjb25zb2xlLmVycm9yKCctLS0tLS0tLS0tLS0tLS0tLS1FUlJPUi0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgICAgICBjb25zb2xlLmVycm9yKHZhbHVlKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignLS0tLS0tLS0tLS0tLS0tLS0tL0VSUk9SLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJpbnRzIGEgbWFya2VyICcrJyBpbiBhYm92ZSB0aGUgZ2l2ZW4gcG9zaXRpb24gb2YgdGhlIHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd1Bvcyh2YWx1ZSxwb3NpdGlvbil7XG4gICAgICAgIGlmKCFMb2dnZXIuZGVidWdFbmFibGVkKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3Vyc29yTGluZSA9ICcnO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHZhbHVlLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PSBwb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnKyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcblxuICAgIH1cblxufVxuTG9nZ2VyLmRlYnVnRWFuYmxlZCA9IGZhbHNlO1xuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgTWFwIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXAgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzaXplIG9mIHRoZSBtYXBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9tYXApLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXQgZ2l2ZW4ga2V5XG4gICAgICogQHBhcmFtIHthbnl9IG5hbWUgXG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIGF0IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChrZXksdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5leGlzdHMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYga2V5IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhpc3RzKGtleSl7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBtYXAgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBmdWxseSBpdGVyYXRlZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnQgXG4gICAgICovXG4gICAgZm9yRWFjaChsaXN0ZW5lcixwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIoa2V5LHRoaXMuX21hcFtrZXldLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIG1hcFxuICAgICAqIEBwYXJhbSB7TWFwfSBzb3VyY2VNYXAgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZU1hcCl7XG4gICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXQoa2V5LHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBpcyBhIG51bWJlclxyXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHBhcmFtZXRlciBjb250YWlucyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbi8qKlxuICogV3JhcHBlciBmb3IgYW4gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHdpdGhpbmcgdGhhdCBvYmplY3QuXG4gKiBBbGxvd3MgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBvYmplY3QgYXMgaXQncyBmaXJzdCBwYXJhbXRlclxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0RnVuY3Rpb257XG5cbiAgICAvKipcbiAgICAgKiBDb250cnVjdG9yXG4gICAgICogQHBhcmFtIHthbnl9IHRoZU9iamVjdCBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0aGVGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aGVPYmplY3QsdGhlRnVuY3Rpb24pe1xuICAgICAgICB0aGlzLl9vYmplY3QgPSB0aGVPYmplY3Q7XG4gICAgICAgIHRoaXMuX2Z1bmN0aW9uID0gdGhlRnVuY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldE9iamVjdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgZ2V0RnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Z1bmN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBmdW5jdGlvbiBhbmQgcGFzc2VkIHRoZSBvYmplY3QgYXMgZmlyc3QgcGFyYW1ldGVyLCBhbmQgdGhlIHByb3ZpZGVkIHBhcmFtdGVyIGFzIHRoZSBzZWNvbmQgcGFyYW10ZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW1zIFxuICAgICAqL1xuICAgIGNhbGwocGFyYW1zKXtcbiAgICAgICAgdGhpcy5fZnVuY3Rpb24uY2FsbCh0aGlzLl9vYmplY3QscGFyYW1zKTtcbiAgICB9XG5cbn1cbiIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5QWNjZXNzb3J7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUpIHtcbiAgICAgICAgdmFyIHBhdGhBcnJheSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYXRoQXJyYXkubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKGtleSBpbiBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRWYWx1ZShkZXN0aW5hdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHBhdGhBcnJheSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYXRoQXJyYXkubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W2ldO1xuICAgICAgICAgICAgaWYoaSA9PSBuLTEpe1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gZGVzdGluYXRpb24pIHx8IGRlc3RpbmF0aW9uW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxze1xuXG4gICAgc3RhdGljIGlzSW5BbHBoYWJldCh2YWwpIHtcbiAgICAgICAgaWYgKHZhbC5jaGFyQ29kZUF0KDApID49IDY1ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDkwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbC5jaGFyQ29kZUF0KDApID49IDk3ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDEyMiApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gNDggJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gNTcgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzU3RyaW5nKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNCbGFuayh2YWwpIHtcbiAgICAgICAgaWYoIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKHZhbCkgfHwgdmFsID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT0hIG51bGwgJiYgdmFsID09ISB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU0sWUFBWSxDQUFDOzs7Ozs7O0lBT3RCLE9BQU8sU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNsQixPQUFPLE9BQU8sR0FBRyxLQUFLLFNBQVMsQ0FBQztLQUNuQzs7Ozs7OztJQU9ELE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUNqQixHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7O0lBT0QsT0FBTyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ2YsR0FBRyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7O0lBT0QsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2hCLEdBQUcsR0FBRyxLQUFLLEtBQUssRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjs7O0FDN0NMOzs7OztBQUtBLEFBQU8sTUFBTSxJQUFJLENBQUM7Ozs7Ozs7SUFPZCxXQUFXLENBQUMsTUFBTSxFQUFFO1FBQ2hCLEdBQUcsTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLFlBQVksS0FBSyxDQUFDO1lBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCLElBQUk7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtLQUNKOzs7Ozs7OztJQVFELEdBQUcsQ0FBQyxLQUFLLEVBQUU7UUFDUCxPQUFPLElB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
