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

class CastUtils {
    
    static castTo(classReference,object){
        return Object.assign(new classReference(),object);
    }
}

/* jshint esversion: 6 */

/**
 * Generic List class
 */
class List {

    /**
     * 
     * @param {array} array 
     * @param {function} fromFunction from method of entry type 
     */
    static from(array, fromFunction) {
        let list = new List();
        for(var key in array) {
            let value = fromFunction ? fromFunction(array[key]) : array[key];
            list.add(fromFunction(value));
        }
        return list;
    }

    /**
     * Create new list and optionally assign existing array
     * 
     * @param {Array} values 
     */
    constructor(values) {
        if(values !== undefined && values instanceof Array){
            this.list = values;
        }else{
            this.list = [];
        }
    }

    /**
     * Get value of position
     * 
     * @param {number} index 
     * @return {any}
     */
    get(index) {
        return this.list[index];
    }

    /**
     * Set value on position
     * 
     * @param {number} index 
     * @param {any} value 
     */
    set(index,value) {
        this.list[index] = value;
        return this;
    }

    /**
     * Get value of last entry
     * 
     * @return {any}
     */
    getLast() {
        if(this.list.length > 0) {
            return this.list[this.list.length-1];
        }
        return null;
    }

    /**
     * Set value on position
     * 
     * @param {any} value 
     */
    setLast(value) {
        if(this.list.length > 0) {
            this.list[this.list.length-1] = value;
            return this;
        }
        return null;
    }

    /**
     * Add value to end of list
     * 
     * @param {any} value 
     */
    add(value) {
        this.list.push(value);
    }

    /**
     * Get the size of the list
     * 
     * @return {number}
     */
    size() {
        return this.list.length;
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
        for(let val of this.list) {
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
        console.warn(value);
    }

    /**
     * Logs the error to the console
     * @param {string} value 
     */
    static error(value){
        console.error(value);
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
        this.map = {};
    }

    /**
     * Gets the size of the map
     * @returns {number}
     */
    size() {
        return Object.keys(this.map).length;
    }

    /**
     * Returns the object at given key
     * @param {any} name 
     */
    get(name) {
        return this.map[name];
    }

    /**
     * Sets value at key
     * @param {string} key 
     * @param {any} value 
     */
    set(key,value) {
        this.map[key] = value;
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
        if (key in this.map) {
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
        for(let key in this.map) {
            if(!listener(key,this.map[key],parent)){
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
 * Wrapper for an object and a function within that object.
 * Allows the function to be called with the object as it's first paramter
 */
class ObjectFunction{

    /**
     * Contructor
     * @param {any} theObject 
     * @param {function} theFunction 
     */
    constructor(theObject,theFunction){
        this.object = theObject;
        this.function = theFunction;
    }

    /**
     * Get the object
     * @returns {any}
     */
    getObject(){
        return this.object;
    }

    /**
     * Get the function
     * @returns {function}
     */
    getFunction(){
        return this.function;
    }

    /**
     * Calls the function and passed the object as first parameter, and the provided paramter as the second paramter
     * @param {any} params 
     */
    call(params){
        this.function.call(this.object,params);
    }

}

/* jshint esversion: 6 */

class ObjectMapper {

    /**
     * 
     * @param {object} source 
     * @param {object} destination 
     */
    static map(source, destination) {
        if(source === undefined) {
            Logger.error("No source object");
        }
        if(destination === undefined) {
            Logger.error("No destination object");
        }
        var sourceKeys = new List(Object.keys(source));

        sourceKeys.forEach(
            (sourceKey) => {
                
                if(destination[sourceKey] === undefined) {
                    Logger.error("Unable to map " + sourceKey + " from");
                    Logger.error(source);
                    Logger.error("to");
                    Logger.error(destination);
                    throw "Unable to map object";
                }
                destination[sourceKey] = source[sourceKey];
                return true;
            },this
        );

        return destination;

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
exports.CastUtils = CastUtils;
exports.List = List;
exports.Logger = Logger;
exports.Map = Map;
exports.NumberUtils = NumberUtils;
exports.ObjectFunction = ObjectFunction;
exports.ObjectMapper = ObjectMapper;
exports.PropertyAccessor = PropertyAccessor;
exports.StringUtils = StringUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9ib29sZWFuVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvY2FzdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xpc3QuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbG9nZ2VyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL21hcC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9udW1iZXJVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RGdW5jdGlvbi5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RNYXBwZXIuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvcHJvcGVydHlBY2Nlc3Nvci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9vbGVhblV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciBib29sZWFuIHR5cGVcclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBib29sZWFuIGhhcyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaXMgYm9vbGVhbiBpcyB0cnVlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNUcnVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBpcyBmYWxzZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzRmFsc2UodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENhc3RVdGlscyB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBjYXN0VG8oY2xhc3NSZWZlcmVuY2Usb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgY2xhc3NSZWZlcmVuY2UoKSxvYmplY3QpO1xyXG4gICAgfVxyXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG4vKipcbiAqIEdlbmVyaWMgTGlzdCBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheSBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmcm9tRnVuY3Rpb24gZnJvbSBtZXRob2Qgb2YgZW50cnkgdHlwZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShhcnJheSwgZnJvbUZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZyb21GdW5jdGlvbiA/IGZyb21GdW5jdGlvbihhcnJheVtrZXldKSA6IGFycmF5W2tleV07XG4gICAgICAgICAgICBsaXN0LmFkZChmcm9tRnVuY3Rpb24odmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QgYW5kIG9wdGlvbmFsbHkgYXNzaWduIGV4aXN0aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlcykge1xuICAgICAgICBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB2YWx1ZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChpbmRleCx2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3RbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBsYXN0IGVudHJ5XG4gICAgICogXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldExhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldExhc3QodmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdmFsdWUgdG8gZW5kIG9mIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgXG4gICAgICovXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNpemUgb2YgdGhlIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIG9uIGluZGV4IGlzIGVxdWFsIHRvIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWVBdEVxdWFscyhpbmRleCx2YWwpIHtcbiAgICAgICAgaWYodGhpcy5nZXQoaW5kZXgpICE9PSBudWxsICYmIHRoaXMuZ2V0KGluZGV4KSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCkgPT09IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZmlyc3RWYWx1ZUVxdWFscyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBdEVxdWFscygwLHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IHZhbCBvZiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcih2YWwscGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBlbnRyaWVzIGZyb20gcHJvdmlkZWQgbGlzdFxuICAgICAqIEBwYXJhbSB7TGlzdH0gc291cmNlTGlzdCBcbiAgICAgKi9cbiAgICBhZGRBbGwoc291cmNlTGlzdCl7XG4gICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG59XG4iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBMb2dnZXJ7XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBkZWJ1Z2dpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZGlzYWJsZURlYnVnKCkge1xuICAgICAgICBMb2dnZXIuZGVidWdFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBkZWJ1Z2dpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZW5hYmxlRGVidWcoKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1Z0VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHZhbHVlIHRvIGNvbnNvbGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIGxvZyh2YWx1ZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB2YWx1ZSB3aXRoIGluZGVuZGVudGF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZGVidWcoZGVwdGgsIHZhbHVlKXtcbiAgICAgICAgaWYoIUxvZ2dlci5kZWJ1Z0VuYWJsZWQpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsaW5lID0gJyc7XG4gICAgICAgIGxpbmUgPSBsaW5lICsgZGVwdGg7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZGVwdGggOyBpKyspe1xuICAgICAgICAgICAgbGluZSA9IGxpbmUgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgbGluZSA9IGxpbmUgKyB2YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2cobGluZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBhIHdhcm5pbmcgdG8gdGhlIGNvbnNvbGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIHdhcm4odmFsdWUpe1xuICAgICAgICBjb25zb2xlLndhcm4odmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGVycm9yIHRvIHRoZSBjb25zb2xlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBlcnJvcih2YWx1ZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByaW50cyBhIG1hcmtlciAnKycgaW4gYWJvdmUgdGhlIGdpdmVuIHBvc2l0aW9uIG9mIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24gXG4gICAgICovXG4gICAgc3RhdGljIHNob3dQb3ModmFsdWUscG9zaXRpb24pe1xuICAgICAgICBpZighTG9nZ2VyLmRlYnVnRW5hYmxlZCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnNvckxpbmUgPSAnJztcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB2YWx1ZS5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGkgPT0gcG9zaXRpb24pe1xuICAgICAgICAgICAgICAgIGN1cnNvckxpbmUgPSBjdXJzb3JMaW5lICsgJysnO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY3Vyc29yTGluZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgY29uc29sZS5sb2coY3Vyc29yTGluZSk7XG5cbiAgICB9XG5cbn1cbkxvZ2dlci5kZWJ1Z0VhbmJsZWQgPSBmYWxzZTtcbiIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIE1hcCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYXAgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzaXplIG9mIHRoZSBtYXBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1hcCkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCBhdCBnaXZlbiBrZXlcbiAgICAgKiBAcGFyYW0ge2FueX0gbmFtZSBcbiAgICAgKi9cbiAgICBnZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBhdCBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoa2V5LHZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5leGlzdHMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYga2V5IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhpc3RzKGtleSl7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIG1hcCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycyB3aGlsZSB0aGVcbiAgICAgKiBjYWxsZWQgZnVuY3Rpb24gcmV0dXJucyB0cnVlIG9yIHRoZSBsaXN0IGlzIGZ1bGx5IGl0ZXJhdGVkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudCBcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYoIWxpc3RlbmVyKGtleSx0aGlzLm1hcFtrZXldLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIG1hcFxuICAgICAqIEBwYXJhbSB7TWFwfSBzb3VyY2VNYXAgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZU1hcCl7XG4gICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXQoa2V5LHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBpcyBhIG51bWJlclxyXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHBhcmFtZXRlciBjb250YWlucyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbi8qKlxuICogV3JhcHBlciBmb3IgYW4gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHdpdGhpbiB0aGF0IG9iamVjdC5cbiAqIEFsbG93cyB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIG9iamVjdCBhcyBpdCdzIGZpcnN0IHBhcmFtdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RGdW5jdGlvbntcblxuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3JcbiAgICAgKiBAcGFyYW0ge2FueX0gdGhlT2JqZWN0IFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRoZUZ1bmN0aW9uIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRoZU9iamVjdCx0aGVGdW5jdGlvbil7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gdGhlT2JqZWN0O1xuICAgICAgICB0aGlzLmZ1bmN0aW9uID0gdGhlRnVuY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldE9iamVjdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBnZXRGdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5mdW5jdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgZnVuY3Rpb24gYW5kIHBhc3NlZCB0aGUgb2JqZWN0IGFzIGZpcnN0IHBhcmFtZXRlciwgYW5kIHRoZSBwcm92aWRlZCBwYXJhbXRlciBhcyB0aGUgc2Vjb25kIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtcyBcbiAgICAgKi9cbiAgICBjYWxsKHBhcmFtcyl7XG4gICAgICAgIHRoaXMuZnVuY3Rpb24uY2FsbCh0aGlzLm9iamVjdCxwYXJhbXMpO1xuICAgIH1cblxufVxuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xyXG5cclxuLyoqXHJcbiAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdC5qcydcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdE1hcHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzb3VyY2UgXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGVzdGluYXRpb24gXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtYXAoc291cmNlLCBkZXN0aW5hdGlvbikge1xyXG4gICAgICAgIGlmKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIk5vIHNvdXJjZSBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiTm8gZGVzdGluYXRpb24gb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc291cmNlS2V5cyA9IG5ldyBMaXN0KE9iamVjdC5rZXlzKHNvdXJjZSkpO1xyXG5cclxuICAgICAgICBzb3VyY2VLZXlzLmZvckVhY2goXHJcbiAgICAgICAgICAgIChzb3VyY2VLZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZGVzdGluYXRpb25bc291cmNlS2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIG1hcCBcIiArIHNvdXJjZUtleSArIFwiIGZyb21cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwidG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIlVuYWJsZSB0byBtYXAgb2JqZWN0XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltzb3VyY2VLZXldID0gc291cmNlW3NvdXJjZUtleV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSx0aGlzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUFjY2Vzc29ye1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICovXG4gICAgc3RhdGljIGdldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmKGkgPT0gbi0xKXtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIGRlc3RpbmF0aW9uKSB8fCBkZXN0aW5hdGlvbltrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsc3tcblxuICAgIHN0YXRpYyBpc0luQWxwaGFiZXQodmFsKSB7XG4gICAgICAgIGlmICh2YWwuY2hhckNvZGVBdCgwKSA+PSA2NSAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA5MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA5NyAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSAxMjIgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbC5jaGFyQ29kZUF0KDApID49IDQ4ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDU3ICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1N0cmluZyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzQmxhbmsodmFsKSB7XG4gICAgICAgIGlmKCFTdHJpbmdVdGlscy5oYXNWYWx1ZSh2YWwpIHx8IHZhbCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09ISBudWxsICYmIHZhbCA9PSEgdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNLFlBQVksQ0FBQzs7Ozs7OztJQU90QixPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDbEIsT0FBTyxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7S0FDbkM7Ozs7Ozs7SUFPRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDakIsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjs7Ozs7OztJQU9ELE9BQU8sTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNmLEdBQUcsR0FBRyxLQUFLLElBQUksRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjs7Ozs7OztJQU9ELE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNoQixHQUFHLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQztTQUNmO1FB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
