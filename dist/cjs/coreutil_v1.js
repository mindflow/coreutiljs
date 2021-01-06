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

/**
 * Generic List class
 * @template T
 */
class List {

    /**
     * 
     * @param {Array} array 
     * @param {Function} fromFunction from method of entry type 
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
     * @param {Array<T>} values 
     */
    constructor(values) {
        /** @type {array} */
        this.list = null;
        if(values !== undefined && values instanceof Array){
            this.list = values;
        }else {
            this.list = [];
        }
    }

    /**
     * Get value of position
     * 
     * @param {number} index 
     * @return {T}
     */
    get(index) {
        return this.list[index];
    }

    /**
     * Set value on position
     * 
     * @param {number} index 
     * @param {T} value 
     */
    set(index,value) {
        this.list[index] = value;
        return this;
    }

    /**
     * Get value of last entry
     * 
     * @return {T}
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
     * @param {T} value 
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
     * @param {T} value 
     */
    add(value) {
        this.list.push(value);
        return this;
    }

    /**
     * Remove element from list
     * 
     * @param {T} value 
     */
    remove(value) {
        this.list = this.list.filter(function(entry){
            return entry != value;
        });
        return this;
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
     * 
     * @param {number} index 
     * @param {T} val 
     * @returns {boolean}
     */
    valueAtEquals(index,val) {
        if(this.get(index) !== null && this.get(index) !== undefined){
            return this.get(index) === val;
        }
        return false;
    }

    /**
     * Checks if value exists
     * 
     * @param {T} val 
     * @returns {boolean}
     */
    contains(value) {
        return this.getArray().includes(value);
    }

    /**
     * Checks if first value is equal to parameter
     * 
     * @param {T} val 
     * @returns {boolean}
     */
    firstValueEquals(val) {
        return this.valueAtEquals(0,val);
    }
    
    /**
     * Loops over all values in the list and calls the provided function
     * with the key, value and parent as callback paramters while the
     * called function returns true or the list is not yet fully iterated
     * 
     * @param {function(T, any)} listener
     * @param {any} parent
     * 
     */
    forEach(listener, parent) {
        for(let val of this.list) {
            if(!listener(val,parent)){
                break;
            }
        }
    }

    /**
     * Loops over all values in the list and calls the provided function
     * with the value and parent as callback paramters. The listener must
     * itself return a promise which when resolved will continue the chain
     * 
     * @param {function(T, any)} listener
     * @param {any} parent
     */
    promiseChain(listener,parent) {
        return new Promise((completedResolve, completedReject) => {
            List.promiseChainStep(listener, this.list, parent, 0, completedResolve, completedReject);
        });
    }

    /**
     * 
     * @param {function(T, any)} listener 
     * @param {Array<T>} valueArray 
     * @param {Object} parent
     * @param {Number} index 
     * @param {Function} completedResolve
     * @param {Function} completedReject
     */
    static promiseChainStep(listener, valueArray, parent, index, completedResolve, completedReject) {
        if (index >= valueArray.length) {
            completedResolve();
            return;
        }
        listener(valueArray[index], parent).then(() => {
            List.promiseChainStep(listener, valueArray, parent, index+1, completedResolve, completedReject);
        }).catch((error) => {
            completedReject(error);
        });
    }

    /**
     * Adds all entries from provided list
     * 
     * @param {List<T>} sourceList 
     */
    addAll(sourceList){
        sourceList.forEach(function(value,parent) {
            parent.add(value);
            return true;
        },this);
        return this;
    }

    /**
     * Gets the underlying array
     * 
     * @returns {Array<T>}
     */
    getArray() {
        return this.list;
    }

    /**
     * 
     * @param {Function} filterFunction 
     */
    filter(filterFunction) {
        return new List(this.list.filter(filterFunction));
    }
}

/* jshint esversion: 6 */

/**
 * Wrapper for an object and a function within that object.
 * Allows the function to be called with the object as it's first paramter
 * 
 * @template T
 */
class ObjectFunction{

    /**
     * Contructor
     * @param {T} theObject 
     * @param {function} theFunction 
     */
    constructor(theObject,theFunction){
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
     * @returns {function}
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

let logLevel = null;

/** @type {ObjectFunction} */
let logListener = null;

class Logger{

    static get FATAL() { return 1; };
    static get ERROR() { return 2; };
    static get WARN() { return 3; };;
    static get INFO() { return 4; };
    static get DEBUG() { return 5; };
    
    static get FATAL_LABEL() { return "FATAL"; };
    static get ERROR_LABEL() { return "ERROR"; };
    static get WARN_LABEL() { return "WARN "; };
    static get INFO_LABEL() { return "INFO "; };
    static get DEBUG_LABEL() { return "DEBUG"; };

    constructor(logName) {
        this.logName = logName;
    }

    static set level(level) {
        logLevel = level;
    }

    /**
     * @param {ObjectFunction} listener 
     */
    static set listener(listener) {
        logListener = listener;
    }

    static clearListener() {
        logListener = null;
    }

    static get level() {
        if (logLevel) {
            return logLevel;
        }
        return Logger.INFO;
    }

    /**
     * Logs the value to console
     * @param {string} value 
     */
    info(value, indentation = 0){
        Logger.log(value, this.logName, Logger.INFO, Logger.INFO_LABEL, (val) => { console.info(val); }, indentation);
    }

    /**
     * Logs a warning
     * @param {string} value 
     */
    warn(value, indentation = 0){
        Logger.log(value, this.logName, Logger.WARN, Logger.WARN_LABEL, (val) => { console.warn(val); }, indentation);
    }

    /**
     * Logs the debug
     * @param {string} value 
     */
    debug(value, indentation = 0){
        Logger.log(value, this.logName, Logger.DEBUG, Logger.DEBUG_LABEL, (val) => { console.debug(val); }, indentation);
    }

    /**
     * Logs the error
     * @param {string} value 
     */
    error(value, indentation = 0) {
        Logger.log(value, this.logName, Logger.ERROR, Logger.ERROR_LABEL, (val) => { console.error(val); }, indentation);
    }

    /**
     * Logs the fatal
     * @param {string} value 
     */
    fatal(value, indentation = 0) {
        Logger.log(value, this.logName, Logger.FATAL, Logger.FATAL_LABEL, (val) => { console.fatal(val); }, indentation);
    }

    static log(value, logName, level, levelLabel, func, indentation) {
        if(Logger.level < level) {
            return;
        }

        let dateTime= new Date().toISOString();

        if(typeof value === "object") {
            func(levelLabel + " " + dateTime + " " + logName + ":");
            func(value);
        } else {
            func(levelLabel + " " + dateTime + " " + logName + " " + Logger.indent(indentation, value));
        }

        if (logListener) {
            if(typeof value === "object") {
                if (value instanceof Error) {
                    logListener.call([value.stack, level]);
                } else {
                    logListener.call([JSON.stringify(value,null,2), level]);
                }
                return
            }

            if(value === undefined) {
                logListener.call(["undefined", level]);
                return;
            }

            logListener.call([value, level]);
        }
    }

    /**
     * Indent the log entry
     * @param {number} depth 
     * @param {string} value 
     */
    static indent(indentation, value){
        if(indentation === 0) {
            return value;
        }
        let line = '';
        line = line + indentation;
        for(let i = 0 ; i < indentation ; i++){
            line = line + ' ';
        }
        line = line + value;
        return line;
    }


    /**
     * Prints a marker '+' in above the given position of the value
     * @param {string} value 
     * @param {number} position 
     */
    showPos(value,position){
        if(logLevel < Logger.DEBUG){
            return;
        }
        let cursorLine = '';
        for(let i = 0 ; i < value.length ; i++) {
            if(i == position){
                cursorLine = cursorLine + '+';
            }else {
                cursorLine = cursorLine + ' ';
            }
        }
        console.log(cursorLine);
        console.log(value);
        console.log(cursorLine);

    }

}

/**
 * @template T
 */
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
     * @param {string} name 
     * @returns {T}
     */
    get(name) {
        return this.map[name];
    }

    /**
     * Sets value at key
     * @param {string} key 
     * @param {T} value 
     */
    set(key, value) {
        this.map[key] = value;
        return this;
    }

    /**
     * Remove entry from map
     * @param {string} key 
     */
    remove(key) {
        delete this.map[key];
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
     * 
     * @param {function(String, T, any)} listener 
     * @param {any} parent 
     * 
     */
    forEach(listener,parent) {
        for(let key in this.map) {
            if(!listener(key,this.map[key],parent)){
                break;
            }
        }
    }

    /**
     * Loops over all values in the map and calls the provided function
     * with the key, value and parent as callback paramters. The listener
     * must itself return a promise which when resolved will continue the chain
     * 
     * @param {function(String, T, any)} listener
     * @param {any} parent
     */
    promiseChain(listener, parent) {
        let keyArray = [];
        let valueArray = [];
        for(let key in this.map) {
            keyArray.push(key);
            valueArray.push(this.map[key]);
        }
        return new Promise((completedResolve, completedReject) => {
            Map.promiseChainStep(listener, keyArray, valueArray, parent, 0, completedResolve, completedReject);
        });
    }

    /**
     * 
     * @param {function(String, T, any)} listener 
     * @param {Array} keyArray 
     * @param {Array} valueArray 
     * @param {Object} parent
     * @param {Number} index 
     * @param {Function} completedResolve
     * @param {Function} completedReject
     */
    static promiseChainStep(listener, keyArray, valueArray, parent, index, completedResolve, completedReject) {
        if (index >= valueArray.length) {
            completedResolve();
            return;
        }
        listener(keyArray[index], valueArray[index], parent).then(() => {
            Map.promiseChainStep(listener, keyArray, valueArray, parent, index+1, completedResolve, completedReject);
        }).catch((error) => {
            completedReject(error);
        });
    }


    /**
     * Adds all entries from provided map
     * @param {Map<T>} sourceMap 
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

const LOG = new Logger("ObjectMapper");

/**
 * Maps fields from one object to another
 */
class ObjectMapper {

    /**
     * Maps fields from one object to another
     * 
     * @template T
     * @param {object} source 
     * @param {T} destination 
     * @returns T
     */
    static map(source, destination) {
        if(source === undefined) {
            LOG.error("No source object");
        }
        if(destination === undefined) {
            LOG.error("No destination object");
        }
        var sourceKeys = new List(Object.keys(source));

        sourceKeys.forEach(
            (sourceKey) => {
                
                if(destination[sourceKey] === undefined) {
                    LOG.error("Unable to map " + sourceKey + " from");
                    LOG.error(source);
                    LOG.error("to");
                    LOG.error(destination);
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

class TimePromise {

    /**
     * Return promise which executes the promiseFunction within given time
     * @param {number} time 
     * @param {Function} promiseFunction 
     * @returns {Promise}
     */
    static asPromise(time, promiseFunction) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                promiseFunction.call();
                resolve.call();
            }, time);
        });
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
exports.TimePromise = TimePromise;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9ib29sZWFuVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvY2FzdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xpc3QuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvb2JqZWN0RnVuY3Rpb24uanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbG9nZ2VyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL21hcC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9udW1iZXJVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RNYXBwZXIuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvcHJvcGVydHlBY2Nlc3Nvci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC90aW1lUHJvbWlzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9vbGVhblV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciBib29sZWFuIHR5cGVcclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBib29sZWFuIGhhcyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaXMgYm9vbGVhbiBpcyB0cnVlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNUcnVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBpcyBmYWxzZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzRmFsc2UodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENhc3RVdGlscyB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBjYXN0VG8oY2xhc3NSZWZlcmVuY2Usb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgY2xhc3NSZWZlcmVuY2UoKSxvYmplY3QpO1xyXG4gICAgfVxyXG59IiwiLyoqXG4gKiBHZW5lcmljIExpc3QgY2xhc3NcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0IHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZyb21GdW5jdGlvbiBmcm9tIG1ldGhvZCBvZiBlbnRyeSB0eXBlIFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tKGFycmF5LCBmcm9tRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgTGlzdCgpO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBhcnJheSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gZnJvbUZ1bmN0aW9uID8gZnJvbUZ1bmN0aW9uKGFycmF5W2tleV0pIDogYXJyYXlba2V5XTtcbiAgICAgICAgICAgIGxpc3QuYWRkKGZyb21GdW5jdGlvbih2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgbGlzdCBhbmQgb3B0aW9uYWxseSBhc3NpZ24gZXhpc3RpbmcgYXJyYXlcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5PFQ+fSB2YWx1ZXMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodmFsdWVzKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7YXJyYXl9ICovXG4gICAgICAgIHRoaXMubGlzdCA9IG51bGw7XG4gICAgICAgIGlmKHZhbHVlcyAhPT0gdW5kZWZpbmVkICYmIHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHZhbHVlcztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBwb3NpdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcmV0dXJuIHtUfVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgdGhpcy5saXN0W2luZGV4XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgbGFzdCBlbnRyeVxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge1R9XG4gICAgICovXG4gICAgZ2V0TGFzdCgpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aC0xXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldExhc3QodmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdmFsdWUgdG8gZW5kIG9mIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3QucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBlbGVtZW50IGZyb20gbGlzdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgcmVtb3ZlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5maWx0ZXIoZnVuY3Rpb24oZW50cnkpe1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICE9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzaXplIG9mIHRoZSBsaXN0XG4gICAgICogXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBvbiBpbmRleCBpcyBlcXVhbCB0byBwYXJhbXRlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZUF0RXF1YWxzKGluZGV4LHZhbCkge1xuICAgICAgICBpZih0aGlzLmdldChpbmRleCkgIT09IG51bGwgJiYgdGhpcy5nZXQoaW5kZXgpICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KSA9PT0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgZXhpc3RzXG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXkoKS5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZpcnN0VmFsdWVFcXVhbHModmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlQXRFcXVhbHMoMCx2YWwpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIGxpc3QgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBub3QgeWV0IGZ1bGx5IGl0ZXJhdGVkXG4gICAgICogXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihULCBhbnkpfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCB2YWwgb2YgdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIodmFsLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycy4gVGhlIGxpc3RlbmVyIG11c3RcbiAgICAgKiBpdHNlbGYgcmV0dXJuIGEgcHJvbWlzZSB3aGljaCB3aGVuIHJlc29sdmVkIHdpbGwgY29udGludWUgdGhlIGNoYWluXG4gICAgICogXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihULCBhbnkpfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBwcm9taXNlQ2hhaW4obGlzdGVuZXIscGFyZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBMaXN0LnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHRoaXMubGlzdCwgcGFyZW50LCAwLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFQsIGFueSl9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8VD59IHZhbHVlQXJyYXkgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkge1xuICAgICAgICBpZiAoaW5kZXggPj0gdmFsdWVBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlc29sdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcih2YWx1ZUFycmF5W2luZGV4XSwgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIExpc3QucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGVudHJpZXMgZnJvbSBwcm92aWRlZCBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0PFQ+fSBzb3VyY2VMaXN0IFxuICAgICAqL1xuICAgIGFkZEFsbChzb3VyY2VMaXN0KXtcbiAgICAgICAgc291cmNlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdW5kZXJseWluZyBhcnJheVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcnJheTxUPn1cbiAgICAgKi9cbiAgICBnZXRBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaWx0ZXJGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBmaWx0ZXIoZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0KHRoaXMubGlzdC5maWx0ZXIoZmlsdGVyRnVuY3Rpb24pKTtcbiAgICB9XG59XG4iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbi8qKlxuICogV3JhcHBlciBmb3IgYW4gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHdpdGhpbiB0aGF0IG9iamVjdC5cbiAqIEFsbG93cyB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIG9iamVjdCBhcyBpdCdzIGZpcnN0IHBhcmFtdGVyXG4gKiBcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RGdW5jdGlvbntcblxuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3JcbiAgICAgKiBAcGFyYW0ge1R9IHRoZU9iamVjdCBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0aGVGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aGVPYmplY3QsdGhlRnVuY3Rpb24pe1xuICAgICAgICB0aGlzLm9iamVjdCA9IHRoZU9iamVjdDtcbiAgICAgICAgdGhpcy5mdW5jdGlvbiA9IHRoZUZ1bmN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb2JqZWN0XG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgZ2V0T2JqZWN0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIGdldEZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBmdW5jdGlvbiBhbmQgcGFzc2VkIHRoZSBvYmplY3QgYXMgZmlyc3QgcGFyYW1ldGVyLCBhbmQgdGhlIHByb3ZpZGVkIHBhcmFtdGVyIGFzIHRoZSBzZWNvbmQgcGFyYW10ZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW1cbiAgICAgKi9cbiAgICBjYWxsKHBhcmFtKXtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mdW5jdGlvbi5jYWxsKHRoaXMub2JqZWN0LCAuLi5wYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb24uY2FsbCh0aGlzLm9iamVjdCwgcGFyYW0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiLi9vYmplY3RGdW5jdGlvbi5qc1wiO1xuXG5cbmxldCBsb2dMZXZlbCA9IG51bGw7XG5cbi8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXG5sZXQgbG9nTGlzdGVuZXIgPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xuXG4gICAgc3RhdGljIGdldCBGQVRBTCgpIHsgcmV0dXJuIDE7IH07XG4gICAgc3RhdGljIGdldCBFUlJPUigpIHsgcmV0dXJuIDI7IH07XG4gICAgc3RhdGljIGdldCBXQVJOKCkgeyByZXR1cm4gMzsgfTs7XG4gICAgc3RhdGljIGdldCBJTkZPKCkgeyByZXR1cm4gNDsgfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHKCkgeyByZXR1cm4gNTsgfTtcbiAgICBcbiAgICBzdGF0aWMgZ2V0IEZBVEFMX0xBQkVMKCkgeyByZXR1cm4gXCJGQVRBTFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgRVJST1JfTEFCRUwoKSB7IHJldHVybiBcIkVSUk9SXCI7IH07XG4gICAgc3RhdGljIGdldCBXQVJOX0xBQkVMKCkgeyByZXR1cm4gXCJXQVJOIFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgSU5GT19MQUJFTCgpIHsgcmV0dXJuIFwiSU5GTyBcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHX0xBQkVMKCkgeyByZXR1cm4gXCJERUJVR1wiOyB9O1xuXG4gICAgY29uc3RydWN0b3IobG9nTmFtZSkge1xuICAgICAgICB0aGlzLmxvZ05hbWUgPSBsb2dOYW1lO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgbGV2ZWwobGV2ZWwpIHtcbiAgICAgICAgbG9nTGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBsaXN0ZW5lciBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0IGxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIGxvZ0xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyTGlzdGVuZXIoKSB7XG4gICAgICAgIGxvZ0xpc3RlbmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxldmVsKCkge1xuICAgICAgICBpZiAobG9nTGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2dMZXZlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTG9nZ2VyLklORk87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgdmFsdWUgdG8gY29uc29sZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBpbmZvKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5JTkZPLCBMb2dnZXIuSU5GT19MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmluZm8odmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBhIHdhcm5pbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgd2Fybih2YWx1ZSwgaW5kZW50YXRpb24gPSAwKXtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuV0FSTiwgTG9nZ2VyLldBUk5fTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS53YXJuKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGRlYnVnXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGRlYnVnKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5ERUJVRywgTG9nZ2VyLkRFQlVHX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuZGVidWcodmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZXJyb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZXJyb3IodmFsdWUsIGluZGVudGF0aW9uID0gMCkge1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5FUlJPUiwgTG9nZ2VyLkVSUk9SX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuZXJyb3IodmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZmF0YWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZmF0YWwodmFsdWUsIGluZGVudGF0aW9uID0gMCkge1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5GQVRBTCwgTG9nZ2VyLkZBVEFMX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuZmF0YWwodmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyh2YWx1ZSwgbG9nTmFtZSwgbGV2ZWwsIGxldmVsTGFiZWwsIGZ1bmMsIGluZGVudGF0aW9uKSB7XG4gICAgICAgIGlmKExvZ2dlci5sZXZlbCA8IGxldmVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0ZVRpbWU9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGZ1bmMobGV2ZWxMYWJlbCArIFwiIFwiICsgZGF0ZVRpbWUgKyBcIiBcIiArIGxvZ05hbWUgKyBcIjpcIik7XG4gICAgICAgICAgICBmdW5jKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bmMobGV2ZWxMYWJlbCArIFwiIFwiICsgZGF0ZVRpbWUgKyBcIiBcIiArIGxvZ05hbWUgKyBcIiBcIiArIExvZ2dlci5pbmRlbnQoaW5kZW50YXRpb24sIHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9nTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW3ZhbHVlLnN0YWNrLCBsZXZlbF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW0pTT04uc3RyaW5naWZ5KHZhbHVlLG51bGwsMiksIGxldmVsXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbG9nTGlzdGVuZXIuY2FsbChbXCJ1bmRlZmluZWRcIiwgbGV2ZWxdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW3ZhbHVlLCBsZXZlbF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kZW50IHRoZSBsb2cgZW50cnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVwdGggXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBpbmRlbnQoaW5kZW50YXRpb24sIHZhbHVlKXtcbiAgICAgICAgaWYoaW5kZW50YXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGluZSA9ICcnO1xuICAgICAgICBsaW5lID0gbGluZSArIGluZGVudGF0aW9uO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGluZGVudGF0aW9uIDsgaSsrKXtcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgPSBsaW5lICsgdmFsdWU7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJpbnRzIGEgbWFya2VyICcrJyBpbiBhYm92ZSB0aGUgZ2l2ZW4gcG9zaXRpb24gb2YgdGhlIHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBcbiAgICAgKi9cbiAgICBzaG93UG9zKHZhbHVlLHBvc2l0aW9uKXtcbiAgICAgICAgaWYobG9nTGV2ZWwgPCBMb2dnZXIuREVCVUcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJzb3JMaW5lID0gJyc7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdmFsdWUubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpID09IHBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcrJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGN1cnNvckxpbmUgPSBjdXJzb3JMaW5lICsgJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnNvckxpbmUpO1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnNvckxpbmUpO1xuXG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXAge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFwID0ge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2l6ZSBvZiB0aGUgbWFwXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXApLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXQgZ2l2ZW4ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwW25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgYXQga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGVudHJ5IGZyb20gbWFwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBrZXkgZXhpc3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhpc3RzKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGV4aXN0cyhrZXkpe1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBtYXAgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBmdWxseSBpdGVyYXRlZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oU3RyaW5nLCBULCBhbnkpfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50IFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvckVhY2gobGlzdGVuZXIscGFyZW50KSB7XG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIoa2V5LHRoaXMubWFwW2tleV0scGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIG1hcCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycy4gVGhlIGxpc3RlbmVyXG4gICAgICogbXVzdCBpdHNlbGYgcmV0dXJuIGEgcHJvbWlzZSB3aGljaCB3aGVuIHJlc29sdmVkIHdpbGwgY29udGludWUgdGhlIGNoYWluXG4gICAgICogXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihTdHJpbmcsIFQsIGFueSl9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqL1xuICAgIHByb21pc2VDaGFpbihsaXN0ZW5lciwgcGFyZW50KSB7XG4gICAgICAgIGxldCBrZXlBcnJheSA9IFtdO1xuICAgICAgICBsZXQgdmFsdWVBcnJheSA9IFtdO1xuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAga2V5QXJyYXkucHVzaChrZXkpO1xuICAgICAgICAgICAgdmFsdWVBcnJheS5wdXNoKHRoaXMubWFwW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBNYXAucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwga2V5QXJyYXksIHZhbHVlQXJyYXksIHBhcmVudCwgMCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihTdHJpbmcsIFQsIGFueSl9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleUFycmF5IFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlQXJyYXkgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGtleUFycmF5LCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXIoa2V5QXJyYXlbaW5kZXhdLCB2YWx1ZUFycmF5W2luZGV4XSwgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE1hcC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIG1hcFxuICAgICAqIEBwYXJhbSB7TWFwPFQ+fSBzb3VyY2VNYXAgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZU1hcCl7XG4gICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXQoa2V5LHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBpcyBhIG51bWJlclxyXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHBhcmFtZXRlciBjb250YWlucyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0LmpzJ1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlci5qcyc7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiT2JqZWN0TWFwcGVyXCIpO1xyXG5cclxuLyoqXHJcbiAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT2JqZWN0TWFwcGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXHJcbiAgICAgKiBcclxuICAgICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc291cmNlIFxyXG4gICAgICogQHBhcmFtIHtUfSBkZXN0aW5hdGlvbiBcclxuICAgICAqIEByZXR1cm5zIFRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG1hcChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgaWYoc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgTE9HLmVycm9yKFwiTm8gc291cmNlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBkZXN0aW5hdGlvbiBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzb3VyY2VLZXlzID0gbmV3IExpc3QoT2JqZWN0LmtleXMoc291cmNlKSk7XHJcblxyXG4gICAgICAgIHNvdXJjZUtleXMuZm9yRWFjaChcclxuICAgICAgICAgICAgKHNvdXJjZUtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihkZXN0aW5hdGlvbltzb3VyY2VLZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJVbmFibGUgdG8gbWFwIFwiICsgc291cmNlS2V5ICsgXCIgZnJvbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3Ioc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJ0b1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiVW5hYmxlIHRvIG1hcCBvYmplY3RcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW3NvdXJjZUtleV0gPSBzb3VyY2Vbc291cmNlS2V5XTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LHRoaXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XHJcblxyXG4gICAgfVxyXG5cclxufSIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5QWNjZXNzb3J7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUpIHtcbiAgICAgICAgdmFyIHBhdGhBcnJheSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYXRoQXJyYXkubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKGtleSBpbiBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRWYWx1ZShkZXN0aW5hdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHBhdGhBcnJheSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYXRoQXJyYXkubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W2ldO1xuICAgICAgICAgICAgaWYoaSA9PSBuLTEpe1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gZGVzdGluYXRpb24pIHx8IGRlc3RpbmF0aW9uW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxze1xuXG4gICAgc3RhdGljIGlzSW5BbHBoYWJldCh2YWwpIHtcbiAgICAgICAgaWYgKHZhbC5jaGFyQ29kZUF0KDApID49IDY1ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDkwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbC5jaGFyQ29kZUF0KDApID49IDk3ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDEyMiApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gNDggJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gNTcgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzU3RyaW5nKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNCbGFuayh2YWwpIHtcbiAgICAgICAgaWYoIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKHZhbCkgfHwgdmFsID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT0hIG51bGwgJiYgdmFsID09ISB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVGltZVByb21pc2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHByb21pc2Ugd2hpY2ggZXhlY3V0ZXMgdGhlIHByb21pc2VGdW5jdGlvbiB3aXRoaW4gZ2l2ZW4gdGltZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9taXNlRnVuY3Rpb24gXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzUHJvbWlzZSh0aW1lLCBwcm9taXNlRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VGdW5jdGlvbi5jYWxsKCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlLmNhbGwoKTtcclxuICAgICAgICAgICAgfSwgdGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNLFlBQVksQ0FBQztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUMxQixRQUFRLE9BQU8sT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDO0FBQ3hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUN6QixRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM5QyxZQUFZLE9BQU8sSUFBSSxDQUFDO0FBQ3hCLFNBQVM7QUFDVCxRQUFRLE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsRUFBRTtB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
