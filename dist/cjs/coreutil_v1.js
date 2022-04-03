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
     * List Listener
     * 
     * @typedef {function(T, Object)} ListListener
     * @callback ListListener
     * @param {T} value
     * @param {Object} parent
     */


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
     * @param {ListListener} listener
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
     * @param {ListListener} listener
     * @param {any} parent
     */
    promiseChain(listener,parent) {
        return new Promise((completedResolve, completedReject) => {
            List.promiseChainStep(listener, this.list, parent, 0, completedResolve, completedReject);
        });
    }

    /**
     * 
     * @param {ListListener} listener 
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

class ListUtils {

    /**
     * 
     * @param {List} list 
     */
    static reverse(list) {
        var reversed = new List();
        for(var i = list.size()-1; i >= 0; i--) {
            reversed.add(list.get(i));
        }
        return reversed;
    }

}

/**
 * Wrapper for an object and a function within that object.
 * Allows the function to be called with the object as it's first paramter
 * 
 * @template T
 * @template F
 */
class ObjectFunction{

    /**
     * Contructor
     * @param {T} theObject 
     * @param {F} theFunction 
     */
    constructor(theObject, theFunction){

        /** @type {T} */
        this.object = theObject;

        /** @type {F} */
        this.function = theFunction;
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
     * Map Listener
     * 
     * @typedef {function(String, T, Object)} MapListener
     * @callback MapListener
     * @param {String} key
     * @param {T} value
     * @param {Object} parent
     */


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
     * @param {MapListener} listener 
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
     * @param {MapListener} listener
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
     * @param {MapListener} listener 
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

    /**
     * 
     * @param {string} value1 
     * @param {string} value2 
     * @returns 
     */
    static nonNullEquals(value1, value2) {
        if (!value1) {
            return false;
        }
        if (!value2) {
            return false;
        }
        return value1 == value2;
    }

    /**
     * 
     * @param {string} value1 
     * @param {string} value2 
     * @returns 
     */
     static equals(value1, value2) {
        return value1 == value2;
    }

    /**
     * 
     * @param {string} value1 
     * @param {string} value2 
     * @returns 
     */
     static startsWith(value1, value2) {
         if (!value1 || !value2) {
             return false;
         }
        return value1.startsWith(value2);
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
exports.ListUtils = ListUtils;
exports.Logger = Logger;
exports.Map = Map;
exports.NumberUtils = NumberUtils;
exports.ObjectFunction = ObjectFunction;
exports.ObjectMapper = ObjectMapper;
exports.PropertyAccessor = PropertyAccessor;
exports.StringUtils = StringUtils;
exports.TimePromise = TimePromise;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9ib29sZWFuVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvY2FzdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xpc3QuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbGlzdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL29iamVjdEZ1bmN0aW9uLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xvZ2dlci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYXAuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbnVtYmVyVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvb2JqZWN0TWFwcGVyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL3Byb3BlcnR5QWNjZXNzb3IuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvc3RyaW5nVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvdGltZVByb21pc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJvb2xlYW5VdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgYm9vbGVhbiB0eXBlXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNCb29sZWFuKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBoYXMgdmFsdWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlzIGJvb2xlYW4gaXMgdHJ1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1RydWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGJvb2xlYW4gaXMgZmFsc2VcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGYWxzZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQ2FzdFV0aWxzIHtcbiAgICBcbiAgICBzdGF0aWMgY2FzdFRvKGNsYXNzUmVmZXJlbmNlLG9iamVjdCl7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBjbGFzc1JlZmVyZW5jZSgpLG9iamVjdCk7XG4gICAgfVxufSIsIi8qKlxuICogR2VuZXJpYyBMaXN0IGNsYXNzXG4gKiBAdGVtcGxhdGUgVFxuICovXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmcm9tRnVuY3Rpb24gZnJvbSBtZXRob2Qgb2YgZW50cnkgdHlwZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShhcnJheSwgZnJvbUZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZyb21GdW5jdGlvbiA/IGZyb21GdW5jdGlvbihhcnJheVtrZXldKSA6IGFycmF5W2tleV07XG4gICAgICAgICAgICBsaXN0LmFkZChmcm9tRnVuY3Rpb24odmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QgYW5kIG9wdGlvbmFsbHkgYXNzaWduIGV4aXN0aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheTxUPn0gdmFsdWVzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlcykge1xuICAgICAgICAvKiogQHR5cGUge2FycmF5fSAqL1xuICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xuICAgICAgICBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB2YWx1ZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IExpc3RlbmVyXG4gICAgICogXG4gICAgICogQHR5cGVkZWYge2Z1bmN0aW9uKFQsIE9iamVjdCl9IExpc3RMaXN0ZW5lclxuICAgICAqIEBjYWxsYmFjayBMaXN0TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqL1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHJldHVybiB7VH1cbiAgICAgKi9cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdFtpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgc2V0KGluZGV4LHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdFtpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIG9mIGxhc3QgZW50cnlcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtUfVxuICAgICAqL1xuICAgIGdldExhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXRMYXN0KHZhbHVlKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aC0xXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHZhbHVlIHRvIGVuZCBvZiBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBhZGQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5saXN0LnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZWxlbWVudCBmcm9tIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHJlbW92ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuZmlsdGVyKGZ1bmN0aW9uKGVudHJ5KXtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAhPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2l6ZSBvZiB0aGUgbGlzdFxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgb24gaW5kZXggaXMgZXF1YWwgdG8gcGFyYW10ZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtUfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWVBdEVxdWFscyhpbmRleCx2YWwpIHtcbiAgICAgICAgaWYodGhpcy5nZXQoaW5kZXgpICE9PSBudWxsICYmIHRoaXMuZ2V0KGluZGV4KSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCkgPT09IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIGV4aXN0c1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFycmF5KCkuaW5jbHVkZXModmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBmaXJzdCB2YWx1ZSBpcyBlcXVhbCB0byBwYXJhbWV0ZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmaXJzdFZhbHVlRXF1YWxzKHZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZUF0RXF1YWxzKDAsdmFsKTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgbm90IHlldCBmdWxseSBpdGVyYXRlZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCB2YWwgb2YgdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIodmFsLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycy4gVGhlIGxpc3RlbmVyIG11c3RcbiAgICAgKiBpdHNlbGYgcmV0dXJuIGEgcHJvbWlzZSB3aGljaCB3aGVuIHJlc29sdmVkIHdpbGwgY29udGludWUgdGhlIGNoYWluXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqL1xuICAgIHByb21pc2VDaGFpbihsaXN0ZW5lcixwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpID0+IHtcbiAgICAgICAgICAgIExpc3QucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdGhpcy5saXN0LCBwYXJlbnQsIDAsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0FycmF5PFQ+fSB2YWx1ZUFycmF5IFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVzb2x2ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXIodmFsdWVBcnJheVtpbmRleF0sIHBhcmVudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBMaXN0LnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgrMSwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBlbnRyaWVzIGZyb20gcHJvdmlkZWQgbGlzdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdDxUPn0gc291cmNlTGlzdCBcbiAgICAgKi9cbiAgICBhZGRBbGwoc291cmNlTGlzdCl7XG4gICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHVuZGVybHlpbmcgYXJyYXlcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8VD59XG4gICAgICovXG4gICAgZ2V0QXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyRnVuY3Rpb24gXG4gICAgICovXG4gICAgZmlsdGVyKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdCh0aGlzLmxpc3QuZmlsdGVyKGZpbHRlckZ1bmN0aW9uKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3QuanNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3R9IGxpc3QgXG4gICAgICovXG4gICAgc3RhdGljIHJldmVyc2UobGlzdCkge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSBuZXcgTGlzdCgpO1xuICAgICAgICBmb3IodmFyIGkgPSBsaXN0LnNpemUoKS0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgcmV2ZXJzZWQuYWRkKGxpc3QuZ2V0KGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV2ZXJzZWQ7XG4gICAgfVxuXG59IiwiLyoqXG4gKiBXcmFwcGVyIGZvciBhbiBvYmplY3QgYW5kIGEgZnVuY3Rpb24gd2l0aGluIHRoYXQgb2JqZWN0LlxuICogQWxsb3dzIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2l0aCB0aGUgb2JqZWN0IGFzIGl0J3MgZmlyc3QgcGFyYW10ZXJcbiAqIFxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RGdW5jdGlvbntcblxuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3JcbiAgICAgKiBAcGFyYW0ge1R9IHRoZU9iamVjdCBcbiAgICAgKiBAcGFyYW0ge0Z9IHRoZUZ1bmN0aW9uIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRoZU9iamVjdCwgdGhlRnVuY3Rpb24pe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7VH0gKi9cbiAgICAgICAgdGhpcy5vYmplY3QgPSB0aGVPYmplY3Q7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtGfSAqL1xuICAgICAgICB0aGlzLmZ1bmN0aW9uID0gdGhlRnVuY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIGZ1bmN0aW9uIGFuZCBwYXNzZWQgdGhlIG9iamVjdCBhcyBmaXJzdCBwYXJhbWV0ZXIsIGFuZCB0aGUgcHJvdmlkZWQgcGFyYW10ZXIgYXMgdGhlIHNlY29uZCBwYXJhbXRlclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbVxuICAgICAqL1xuICAgIGNhbGwocGFyYW0pe1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uLmNhbGwodGhpcy5vYmplY3QsIC4uLnBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mdW5jdGlvbi5jYWxsKHRoaXMub2JqZWN0LCBwYXJhbSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCIuL29iamVjdEZ1bmN0aW9uLmpzXCI7XG5cblxubGV0IGxvZ0xldmVsID0gbnVsbDtcblxuLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cbmxldCBsb2dMaXN0ZW5lciA9IG51bGw7XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXJ7XG5cbiAgICBzdGF0aWMgZ2V0IEZBVEFMKCkgeyByZXR1cm4gMTsgfTtcbiAgICBzdGF0aWMgZ2V0IEVSUk9SKCkgeyByZXR1cm4gMjsgfTtcbiAgICBzdGF0aWMgZ2V0IFdBUk4oKSB7IHJldHVybiAzOyB9OztcbiAgICBzdGF0aWMgZ2V0IElORk8oKSB7IHJldHVybiA0OyB9O1xuICAgIHN0YXRpYyBnZXQgREVCVUcoKSB7IHJldHVybiA1OyB9O1xuICAgIFxuICAgIHN0YXRpYyBnZXQgRkFUQUxfTEFCRUwoKSB7IHJldHVybiBcIkZBVEFMXCI7IH07XG4gICAgc3RhdGljIGdldCBFUlJPUl9MQUJFTCgpIHsgcmV0dXJuIFwiRVJST1JcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IFdBUk5fTEFCRUwoKSB7IHJldHVybiBcIldBUk4gXCI7IH07XG4gICAgc3RhdGljIGdldCBJTkZPX0xBQkVMKCkgeyByZXR1cm4gXCJJTkZPIFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgREVCVUdfTEFCRUwoKSB7IHJldHVybiBcIkRFQlVHXCI7IH07XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2dOYW1lKSB7XG4gICAgICAgIHRoaXMubG9nTmFtZSA9IGxvZ05hbWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldCBsZXZlbChsZXZlbCkge1xuICAgICAgICBsb2dMZXZlbCA9IGxldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGxpc3RlbmVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQgbGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgbG9nTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJMaXN0ZW5lcigpIHtcbiAgICAgICAgbG9nTGlzdGVuZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbGV2ZWwoKSB7XG4gICAgICAgIGlmIChsb2dMZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ0xldmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMb2dnZXIuSU5GTztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB2YWx1ZSB0byBjb25zb2xlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGluZm8odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLklORk8sIExvZ2dlci5JTkZPX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuaW5mbyh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGEgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICB3YXJuKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5XQVJOLCBMb2dnZXIuV0FSTl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLndhcm4odmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZGVidWdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZGVidWcodmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkRFQlVHLCBMb2dnZXIuREVCVUdfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5kZWJ1Zyh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBlcnJvcih2YWx1ZSwgaW5kZW50YXRpb24gPSAwKSB7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkVSUk9SLCBMb2dnZXIuRVJST1JfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5lcnJvcih2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBmYXRhbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBmYXRhbCh2YWx1ZSwgaW5kZW50YXRpb24gPSAwKSB7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkZBVEFMLCBMb2dnZXIuRkFUQUxfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5mYXRhbCh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKHZhbHVlLCBsb2dOYW1lLCBsZXZlbCwgbGV2ZWxMYWJlbCwgZnVuYywgaW5kZW50YXRpb24pIHtcbiAgICAgICAgaWYoTG9nZ2VyLmxldmVsIDwgbGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRlVGltZT0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgZnVuYyhsZXZlbExhYmVsICsgXCIgXCIgKyBkYXRlVGltZSArIFwiIFwiICsgbG9nTmFtZSArIFwiOlwiKTtcbiAgICAgICAgICAgIGZ1bmModmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVuYyhsZXZlbExhYmVsICsgXCIgXCIgKyBkYXRlVGltZSArIFwiIFwiICsgbG9nTmFtZSArIFwiIFwiICsgTG9nZ2VyLmluZGVudChpbmRlbnRhdGlvbiwgdmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2dMaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nTGlzdGVuZXIuY2FsbChbdmFsdWUuc3RhY2ssIGxldmVsXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nTGlzdGVuZXIuY2FsbChbSlNPTi5zdHJpbmdpZnkodmFsdWUsbnVsbCwyKSwgbGV2ZWxdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFtcInVuZGVmaW5lZFwiLCBsZXZlbF0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nTGlzdGVuZXIuY2FsbChbdmFsdWUsIGxldmVsXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRlbnQgdGhlIGxvZyBlbnRyeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIGluZGVudChpbmRlbnRhdGlvbiwgdmFsdWUpe1xuICAgICAgICBpZihpbmRlbnRhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsaW5lID0gJyc7XG4gICAgICAgIGxpbmUgPSBsaW5lICsgaW5kZW50YXRpb247XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgaW5kZW50YXRpb24gOyBpKyspe1xuICAgICAgICAgICAgbGluZSA9IGxpbmUgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgbGluZSA9IGxpbmUgKyB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcmludHMgYSBtYXJrZXIgJysnIGluIGFib3ZlIHRoZSBnaXZlbiBwb3NpdGlvbiBvZiB0aGUgdmFsdWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uIFxuICAgICAqL1xuICAgIHNob3dQb3ModmFsdWUscG9zaXRpb24pe1xuICAgICAgICBpZihsb2dMZXZlbCA8IExvZ2dlci5ERUJVRyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnNvckxpbmUgPSAnJztcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB2YWx1ZS5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGkgPT0gcG9zaXRpb24pe1xuICAgICAgICAgICAgICAgIGN1cnNvckxpbmUgPSBjdXJzb3JMaW5lICsgJysnO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY3Vyc29yTGluZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgY29uc29sZS5sb2coY3Vyc29yTGluZSk7XG5cbiAgICB9XG5cbn1cbiIsIi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuZXhwb3J0IGNsYXNzIE1hcCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYXAgPSB7fTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1hcCBMaXN0ZW5lclxuICAgICAqIFxuICAgICAqIEB0eXBlZGVmIHtmdW5jdGlvbihTdHJpbmcsIFQsIE9iamVjdCl9IE1hcExpc3RlbmVyXG4gICAgICogQGNhbGxiYWNrIE1hcExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAgICovXG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNpemUgb2YgdGhlIG1hcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubWFwKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGF0IGdpdmVuIGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIGdldChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFtuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIGF0IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBlbnRyeSBmcm9tIG1hcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICovXG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYga2V5IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4aXN0cyhrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBrZXkgZXhpc3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBleGlzdHMoa2V5KXtcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgbWFwIGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50IFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvckVhY2gobGlzdGVuZXIscGFyZW50KSB7XG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIoa2V5LHRoaXMubWFwW2tleV0scGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIG1hcCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycy4gVGhlIGxpc3RlbmVyXG4gICAgICogbXVzdCBpdHNlbGYgcmV0dXJuIGEgcHJvbWlzZSB3aGljaCB3aGVuIHJlc29sdmVkIHdpbGwgY29udGludWUgdGhlIGNoYWluXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXBMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICovXG4gICAgcHJvbWlzZUNoYWluKGxpc3RlbmVyLCBwYXJlbnQpIHtcbiAgICAgICAgbGV0IGtleUFycmF5ID0gW107XG4gICAgICAgIGxldCB2YWx1ZUFycmF5ID0gW107XG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICBrZXlBcnJheS5wdXNoKGtleSk7XG4gICAgICAgICAgICB2YWx1ZUFycmF5LnB1c2godGhpcy5tYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpID0+IHtcbiAgICAgICAgICAgIE1hcC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCAwLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlBcnJheSBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZUFycmF5IFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVzb2x2ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSB7XG4gICAgICAgIGlmIChpbmRleCA+PSB2YWx1ZUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29tcGxldGVkUmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVyKGtleUFycmF5W2luZGV4XSwgdmFsdWVBcnJheVtpbmRleF0sIHBhcmVudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBNYXAucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwga2V5QXJyYXksIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgrMSwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGVudHJpZXMgZnJvbSBwcm92aWRlZCBtYXBcbiAgICAgKiBAcGFyYW0ge01hcDxUPn0gc291cmNlTWFwIFxuICAgICAqL1xuICAgIGFkZEFsbChzb3VyY2VNYXApe1xuICAgICAgICBzb3VyY2VNYXAuZm9yRWFjaChmdW5jdGlvbihrZXksdmFsdWUscGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuc2V0KGtleSx2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBOdW1iZXJVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgaXMgYSBudW1iZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsIFxuICAgICAqL1xuICAgIHN0YXRpYyBpc051bWJlcih2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHBhcmFtZXRlciBjb250YWlucyB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdC5qcydcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyLmpzJztcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIk9iamVjdE1hcHBlclwiKTtcblxuLyoqXG4gKiBNYXBzIGZpZWxkcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlclxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0TWFwcGVyIHtcblxuICAgIC8qKlxuICAgICAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXG4gICAgICogXG4gICAgICogQHRlbXBsYXRlIFRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc291cmNlIFxuICAgICAqIEBwYXJhbSB7VH0gZGVzdGluYXRpb24gXG4gICAgICogQHJldHVybnMgVFxuICAgICAqL1xuICAgIHN0YXRpYyBtYXAoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgICAgICBpZihzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgTE9HLmVycm9yKFwiTm8gc291cmNlIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihkZXN0aW5hdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBkZXN0aW5hdGlvbiBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNvdXJjZUtleXMgPSBuZXcgTGlzdChPYmplY3Qua2V5cyhzb3VyY2UpKTtcblxuICAgICAgICBzb3VyY2VLZXlzLmZvckVhY2goXG4gICAgICAgICAgICAoc291cmNlS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoZGVzdGluYXRpb25bc291cmNlS2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihcIlVuYWJsZSB0byBtYXAgXCIgKyBzb3VyY2VLZXkgKyBcIiBmcm9tXCIpO1xuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3Ioc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKFwidG9cIik7XG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiVW5hYmxlIHRvIG1hcCBvYmplY3RcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bc291cmNlS2V5XSA9IHNvdXJjZVtzb3VyY2VLZXldO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSx0aGlzXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuXG4gICAgfVxuXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlBY2Nlc3NvcntcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRWYWx1ZShkZXN0aW5hdGlvbiwgbmFtZSkge1xuICAgICAgICB2YXIgcGF0aEFycmF5ID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhdGhBcnJheS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoa2V5IGluIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIHNldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgcGF0aEFycmF5ID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhdGhBcnJheS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbaV07XG4gICAgICAgICAgICBpZihpID09IG4tMSl7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKGtleSBpbiBkZXN0aW5hdGlvbikgfHwgZGVzdGluYXRpb25ba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbHN7XG5cbiAgICBzdGF0aWMgaXNJbkFscGhhYmV0KHZhbCkge1xuICAgICAgICBpZiAodmFsLmNoYXJDb2RlQXQoMCkgPj0gNjUgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gOTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gOTcgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gMTIyICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA0OCAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA1NyApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNTdHJpbmcodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0JsYW5rKHZhbCkge1xuICAgICAgICBpZighU3RyaW5nVXRpbHMuaGFzVmFsdWUodmFsKSB8fCB2YWwgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZTEgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlMiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgbm9uTnVsbEVxdWFscyh2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICBpZiAoIXZhbHVlMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlMSA9PSB2YWx1ZTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBzdGF0aWMgZXF1YWxzKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTEgPT0gdmFsdWUyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZTEgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlMiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgc3RhdGljIHN0YXJ0c1dpdGgodmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgICAgIGlmICghdmFsdWUxIHx8ICF2YWx1ZTIpIHtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTEuc3RhcnRzV2l0aCh2YWx1ZTIpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUaW1lUHJvbWlzZSB7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gcHJvbWlzZSB3aGljaCBleGVjdXRlcyB0aGUgcHJvbWlzZUZ1bmN0aW9uIHdpdGhpbiBnaXZlbiB0aW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvbWlzZUZ1bmN0aW9uIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXRpYyBhc1Byb21pc2UodGltZSwgcHJvbWlzZUZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9taXNlRnVuY3Rpb24uY2FsbCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUuY2FsbCgpO1xuICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQU8sTUFBTSxZQUFZLENBQUM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDMUIsUUFBUSxPQUFPLE9BQU8sR0FBRyxLQUFLLFNBQVMsQ0FBQztBQUN4QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUU7QUFDekIsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFD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
