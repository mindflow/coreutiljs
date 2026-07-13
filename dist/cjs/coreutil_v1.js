'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
        if(val !== null && val !== undefined) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {String} value1 
     * @param {String} value2 
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
     * @param {String} value1 
     * @param {String} value2 
     * @returns 
     */
     static equals(value1, value2) {
        return value1 == value2;
    }

    /**
     * 
     * @param {String} value1 
     * @param {String} value2 
     * @returns 
     */
     static startsWith(value1, value2) {
         if (!value1 || !value2) {
             return false;
         }
        return value1.startsWith(value2);
    }

    /**
     * 
     * @param {String} value
     * @returns the compressed String
     */
    static compressWhitespace(value) {
        if (StringUtils.isBlank(value)) {
            return value;
        }
        while(value.indexOf("  ") > -1) {
            value = value.replace("  ", " ");
        }
        return value;
    }

    /**
     * 
     * @param {String} value 
     * @param {String} delimiter 
     * @param {Boolean} trim
     * @param {Boolean} compressWhitespace
     * @returns the array
     */
    static toArray(value, delimiter, trim = true, compressWhitespace = true) {
        if (trim) {
            value = StringUtils.trim(value);
        }
        if (compressWhitespace) {
            value = StringUtils.compressWhitespace(value);
        }
        if (StringUtils.isBlank(value)) {
            return [];
        }
        if (StringUtils.isBlank(delimiter)) {
            return [value];
        }
        if (value.indexOf(delimiter) == -1) {
            return [value];
        }
        return value.split(delimiter);
    }

    /**
     * 
     * @param {String} value 
     * @returns the trimmed String
     */
    static trim(value) {
        if (StringUtils.isBlank(value)) {
            return value;
        }
        return value.trim();
    }

    static leftPad(value, targetLength, padChar) {
        let result = value;
        while (result.length < targetLength) {
            result = padChar + result;
        }
        return result;
    }

    /**
     * 
     * @param {String} needle 
     * @param {String} haystack 
     * @returns 
     */
    static contains(needle, haystack) {
        if (!StringUtils.hasValue(needle) || !StringUtils.hasValue(haystack)) {
            return false;
        }
        return haystack.indexOf(needle) > -1;
    }
}

class ArrayUtils {

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
        }else if(values !== undefined && values !== null) {
            this.list = [values];
        } else {
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
    static async promiseChainStep(listener, valueArray, parent, index, completedResolve, completedReject) {
        if (index >= valueArray.length) {
            completedResolve();
            return null;
        }
        try {
            await listener(valueArray[index], parent);
            List.promiseChainStep(listener, valueArray, parent, index+1, completedResolve, completedReject);
        } catch (error) {
            completedReject(error);
        }
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
class Method{

    /**
     * Contructor
     * @param {F} theFunction 
     * @param {T} theObject 
     * @param {boolean} explodeArrayParam
     */
    constructor(theFunction, theObject = null, explodeArrayParam = true){

        /** @type {T} */
        this.object = theObject;

        /** @type {boolean} */
        this.explodeArrayParam = explodeArrayParam;

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
        if (Array.isArray(param) && this.explodeArrayParam) {
            return this.function.call(targetObject, ...param);
        }
        return this.function.call(targetObject, param);
    }

}

let logLevel = null;

/** @type {Method} */
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
     * @param {Method} listener 
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
        console.trace();
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

class MacUtils {

    /**
     * 
     * @param {Number} mac 
     * @returns {String}
     */
    static toMacAddress(mac) {
        let hex = mac.toString(16).toUpperCase().padStart(12, '0');
        return hex.match(/.{1,2}/g).reverse().join(":");
    }
}

/**
 * @template T
 */
class Map {

    constructor() {
        this.map = {};
    }


    static from(map) {
        const newMap = new Map();
        if (map instanceof Map) {
            newMap.map = map.map;
        } else if (map.map) {
            newMap.map = map.map;
        } else {
            newMap.map = map;
        }
        return newMap;
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

class MapUtils {

    /**
     * 
     * @param {Map} map 
     * @param {String} keyValueDelimiter 
     * @param {String} entryDelimiter 
     */
     static toString(map, keyValueDelimiter = "=", entryDelimiter = "&") {
        let result = "";
        let first = true;
        map.forEach((key, value, parent) => {
            if (!first) {
                result = result + entryDelimiter;
            }
            first = false;

            let resolvedKey = key;
            if (resolvedKey.toString) {
                resolvedKey = resolvedKey.toString();
            }

            let resolvedValue = value;
            if (resolvedValue.toString) {
                resolvedValue = resolvedValue.toString();
            }

            result = result + resolvedKey + keyValueDelimiter + resolvedValue;

            return true;
        });
        return result;
    }

    /**
     * 
     * @param {Array<Map<any,any>>} sourceMapArray
     * @param {Boolean} overwrite
     * @return {Map<any,any>}
     */
    static merge(sourceMapArray, overwrite = true) {
        const resultMap = new Map();
        if (!sourceMapArray || sourceMapArray.length === 0) {
            return null;
        }

        sourceMapArray.forEach((sourceMap) => {
            sourceMap.forEach((value, key) => {
                if (overwrite || !resultMap.has(key)) {
                    resultMap.set(key, value);
                }
            });
        });
        return resultMap;
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
     * @template T[]
     * @param {array} source 
     * @param {T} destination 
     * @param {function} mapperFunction Custom mapper function to map each element. If null, the default mapping is used.
     * @returns T[]
     */
    static mapAll(source, destination, mapperFunction = null) {
        let response = [];
        source.forEach(element => {
            if (mapperFunction === null) {
                response.push(ObjectMapper.map(element, new destination()));
            } else {
                response.push(mapperFunction(element));
            }
        });
        return response;
    }

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
                
                if (sourceKey.startsWith("__")) {
                    // Ignore technical fields
                    return true;
                }

                if(destination[sourceKey] === undefined) {
                    LOG.error("Unable to map " + sourceKey + " from / to:");
                    LOG.warn(source);
                    LOG.warn(destination);
                    throw "Unable to map object";
                }
                destination[sourceKey] = source[sourceKey];
                return true;
            },this
        );

        return destination;

    }

}

class ObjectUtils {

    /**
     * Parses an object into a human-readable format.
     * @param {any} object 
     */
    static parseHumanReadable(object) {
        if (object === null) {
            return "";

        } else if (object === undefined) {
            return "";

        } else if (typeof object === "string" || typeof object === "number" || typeof object === "boolean") {
            return object.toString();

        } else if (Array.isArray(object)) {
            return `[${object.map(item => this.parseHumanReadable(item)).join("")}]`;

        } else if (typeof object === "object") {
            let entries = Object.entries(object).map(([key, value]) => {
                let hrKey = this.camelCaseToHumanReadable(key);
                return `${hrKey}: ${this.parseHumanReadable(value)}\n`;
            });
            return entries.join("");
        } else {
            return object.toString();
        }
    }

    static camelCaseToHumanReadable(text) {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
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

class RadixUtils {

    static CUSTOM_CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
     * 
     * @param {String} radixString 
     * @returns {Boolean}
     */
    static isValidRadixString(radixString) {
        if (radixString == null || radixString.length === 0) {
            return false;
        }
        const customDigits = RadixUtils.CUSTOM_CHARACTERS.split('');
        for (const c of radixString.split('')) {
            let isValid = false;
            for (const digit of customDigits) {
                if (c === digit) {
                    isValid = true;
                    break;
                }
            }
            if (!isValid) {
                return false;
            }
        }
        return true;
    }

    /**
     * 
     * @param {Number} number 
     * @returns {String}
     */
    static toRadixString(number) {
        const customDigits = RadixUtils.CUSTOM_CHARACTERS.split('');
        let result = "";
        while (number > 0) {
            let remainder = Math.floor(number % customDigits.length);
            result = customDigits[remainder] + result;
            number = Math.floor(number / customDigits.length);
        }
        return result;
    }

    /**
     * 
     * @param {String} radixString 
     * @returns {Number}
     */
    static fromRadixString(radixString) {
        const customDigits = RadixUtils.CUSTOM_CHARACTERS.split('');
        let result = 0;
        for (let i = 0; i < radixString.length; i++) {
            const c = radixString.charAt(i);
            const index = customDigits.indexOf(c);
            if (index == -1) {
                throw Error("Invalid character in radix string: " + c);
            }
            result = result * customDigits.length + index;
        }
        return result;
    }

}

class StringTemplate {

    /**
     * 
     * @param {String} theString 
     * @returns {StringTemplate}
     */
    static from(theString) {
        return new StringTemplate(theString);
    }

    /**
     * 
     * @param {String} theString 
     */
    constructor(theString) {
        this.theString = theString;
    }

    set(key, value) {
        this.theString = this.theString.replace("{" + key + "}", value);
        return this;
    }

    toString() {
        return this.theString;
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

exports.ArrayUtils = ArrayUtils;
exports.BooleanUtils = BooleanUtils;
exports.CastUtils = CastUtils;
exports.List = List;
exports.ListUtils = ListUtils;
exports.Logger = Logger;
exports.MacUtils = MacUtils;
exports.Map = Map;
exports.MapUtils = MapUtils;
exports.Method = Method;
exports.NumberUtils = NumberUtils;
exports.ObjectMapper = ObjectMapper;
exports.ObjectUtils = ObjectUtils;
exports.PropertyAccessor = PropertyAccessor;
exports.RadixUtils = RadixUtils;
exports.StringTemplate = StringTemplate;
exports.StringUtils = StringUtils;
exports.TimePromise = TimePromise;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9hcnJheVV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2Jvb2xlYW5VdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9jYXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbGlzdC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9saXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWV0aG9kLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xvZ2dlci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYWNVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYXAuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWFwVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbnVtYmVyVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvb2JqZWN0TWFwcGVyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL29iamVjdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL3Byb3BlcnR5QWNjZXNzb3IuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvcmFkaXhVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdUZW1wbGF0ZS5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC90aW1lUHJvbWlzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsc3tcblxuICAgIHN0YXRpYyBpc0luQWxwaGFiZXQodmFsKSB7XG4gICAgICAgIGlmICh2YWwuY2hhckNvZGVBdCgwKSA+PSA2NSAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA5MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA5NyAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSAxMjIgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbC5jaGFyQ29kZUF0KDApID49IDQ4ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDU3ICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1N0cmluZyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzQmxhbmsodmFsKSB7XG4gICAgICAgIGlmKCFTdHJpbmdVdGlscy5oYXNWYWx1ZSh2YWwpIHx8IHZhbCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBub25OdWxsRXF1YWxzKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIGlmICghdmFsdWUxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUxID09IHZhbHVlMjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUxIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZTIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHN0YXRpYyBlcXVhbHModmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlMSA9PSB2YWx1ZTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBzdGF0aWMgc3RhcnRzV2l0aCh2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICAgaWYgKCF2YWx1ZTEgfHwgIXZhbHVlMikge1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlMS5zdGFydHNXaXRoKHZhbHVlMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMgdGhlIGNvbXByZXNzZWQgU3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIGNvbXByZXNzV2hpdGVzcGFjZSh2YWx1ZSkge1xuICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSh2YWx1ZS5pbmRleE9mKFwiICBcIikgPiAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwiICBcIiwgXCIgXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbGltaXRlciBcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRyaW1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNvbXByZXNzV2hpdGVzcGFjZVxuICAgICAqIEByZXR1cm5zIHRoZSBhcnJheVxuICAgICAqL1xuICAgIHN0YXRpYyB0b0FycmF5KHZhbHVlLCBkZWxpbWl0ZXIsIHRyaW0gPSB0cnVlLCBjb21wcmVzc1doaXRlc3BhY2UgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0cmltKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFN0cmluZ1V0aWxzLnRyaW0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wcmVzc1doaXRlc3BhY2UpIHtcbiAgICAgICAgICAgIHZhbHVlID0gU3RyaW5nVXRpbHMuY29tcHJlc3NXaGl0ZXNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNCbGFuayhkZWxpbWl0ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihkZWxpbWl0ZXIpID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUuc3BsaXQoZGVsaW1pdGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gICAgICogQHJldHVybnMgdGhlIHRyaW1tZWQgU3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIHRyaW0odmFsdWUpIHtcbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnRyaW0oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGVmdFBhZCh2YWx1ZSwgdGFyZ2V0TGVuZ3RoLCBwYWRDaGFyKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgd2hpbGUgKHJlc3VsdC5sZW5ndGggPCB0YXJnZXRMZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHBhZENoYXIgKyByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmVlZGxlIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoYXlzdGFjayBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgY29udGFpbnMobmVlZGxlLCBoYXlzdGFjaykge1xuICAgICAgICBpZiAoIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKG5lZWRsZSkgfHwgIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKGhheXN0YWNrKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXlzdGFjay5pbmRleE9mKG5lZWRsZSkgPiAtMTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdHJpbmdVdGlscyB9IGZyb20gXCIuL3N0cmluZ1V0aWxzLmpzXCJcblxuZXhwb3J0IGNsYXNzIEFycmF5VXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbGltaXRlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9TdHJpbmcoYXJyYXksIGRlbGltaXRlcikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmICFTdHJpbmdVdGlscy5pc0JsYW5rKGRlbGltaXRlcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBkZWxpbWl0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUudG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgbXVsdGlwbGUgYXJyYXlzIGludG8gb25lXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheTxhbnk+Pn0gc291cmNlQXJyYXlBcnJheVxuICAgICAqIEByZXR1cm4ge0FycmF5PGFueT59XG4gICAgICovXG4gICAgc3RhdGljIG1lcmdlKHNvdXJjZUFycmF5QXJyYXkpIHtcbiAgICAgICAgaWYgKCFzb3VyY2VBcnJheUFycmF5IHx8IHNvdXJjZUFycmF5QXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVzdWx0QXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgc291cmNlQXJyYXlBcnJheS5mb3JFYWNoKChzb3VyY2VBcnJheSkgPT4ge1xuICAgICAgICAgICAgc291cmNlQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdEFycmF5LmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRBcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgaWYgbm90IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyYXkgXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGQoYXJyYXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FycmF5LnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBwcm92aWRlZCBhcnJheSBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMuIFRoZSBsaXN0ZW5lciBtdXN0XG4gICAgICogaXRzZWxmIHJldHVybiBhIHByb21pc2Ugd2hpY2ggd2hlbiByZXNvbHZlZCB3aWxsIGNvbnRpbnVlIHRoZSBjaGFpblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyYXlcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICovXG4gICAgc3RhdGljIHByb21pc2VDaGFpbihhcnJheSwgbGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpID0+IHtcbiAgICAgICAgICAgIEFycmF5VXRpbHMucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgYXJyYXksIDAsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0FycmF5PFQ+fSB2YWx1ZUFycmF5IFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgbGlzdGVuZXIodmFsdWVBcnJheVtpbmRleF0pO1xuICAgICAgICAgICAgQXJyYXlVdGlscy5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB2YWx1ZUFycmF5LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29tcGxldGVkUmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGFycmF5IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBjb250YWlucyh2YWx1ZSwgYXJyYXkpIHtcbiAgICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIEJvb2xlYW5VdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgYm9vbGVhbiB0eXBlXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNCb29sZWFuKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBoYXMgdmFsdWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlzIGJvb2xlYW4gaXMgdHJ1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1RydWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGJvb2xlYW4gaXMgZmFsc2VcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGYWxzZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQ2FzdFV0aWxzIHtcbiAgICBcbiAgICBzdGF0aWMgY2FzdFRvKGNsYXNzUmVmZXJlbmNlLG9iamVjdCl7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBjbGFzc1JlZmVyZW5jZSgpLG9iamVjdCk7XG4gICAgfVxufSIsIi8qKlxuICogR2VuZXJpYyBMaXN0IGNsYXNzXG4gKiBAdGVtcGxhdGUgVFxuICovXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmcm9tRnVuY3Rpb24gZnJvbSBtZXRob2Qgb2YgZW50cnkgdHlwZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShhcnJheSwgZnJvbUZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZyb21GdW5jdGlvbiA/IGZyb21GdW5jdGlvbihhcnJheVtrZXldKSA6IGFycmF5W2tleV07XG4gICAgICAgICAgICBsaXN0LmFkZChmcm9tRnVuY3Rpb24odmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QgYW5kIG9wdGlvbmFsbHkgYXNzaWduIGV4aXN0aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheTxUPn0gdmFsdWVzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlcykge1xuICAgICAgICAvKiogQHR5cGUge2FycmF5fSAqL1xuICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xuICAgICAgICBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB2YWx1ZXM7XG4gICAgICAgIH1lbHNlIGlmKHZhbHVlcyAhPT0gdW5kZWZpbmVkICYmIHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW3ZhbHVlc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3QgTGlzdGVuZXJcbiAgICAgKiBcbiAgICAgKiBAdHlwZWRlZiB7ZnVuY3Rpb24oVCwgT2JqZWN0KX0gTGlzdExpc3RlbmVyXG4gICAgICogQGNhbGxiYWNrIExpc3RMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAgICovXG5cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBwb3NpdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcmV0dXJuIHtUfVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgdGhpcy5saXN0W2luZGV4XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgbGFzdCBlbnRyeVxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge1R9XG4gICAgICovXG4gICAgZ2V0TGFzdCgpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aC0xXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldExhc3QodmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdmFsdWUgdG8gZW5kIG9mIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3QucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBlbGVtZW50IGZyb20gbGlzdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgcmVtb3ZlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5maWx0ZXIoZnVuY3Rpb24oZW50cnkpe1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICE9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzaXplIG9mIHRoZSBsaXN0XG4gICAgICogXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBvbiBpbmRleCBpcyBlcXVhbCB0byBwYXJhbXRlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZUF0RXF1YWxzKGluZGV4LHZhbCkge1xuICAgICAgICBpZih0aGlzLmdldChpbmRleCkgIT09IG51bGwgJiYgdGhpcy5nZXQoaW5kZXgpICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KSA9PT0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgZXhpc3RzXG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXkoKS5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZpcnN0VmFsdWVFcXVhbHModmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlQXRFcXVhbHMoMCx2YWwpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIGxpc3QgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBub3QgeWV0IGZ1bGx5IGl0ZXJhdGVkXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvckVhY2gobGlzdGVuZXIsIHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IHZhbCBvZiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcih2YWwscGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIGxpc3QgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzLiBUaGUgbGlzdGVuZXIgbXVzdFxuICAgICAqIGl0c2VsZiByZXR1cm4gYSBwcm9taXNlIHdoaWNoIHdoZW4gcmVzb2x2ZWQgd2lsbCBjb250aW51ZSB0aGUgY2hhaW5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICovXG4gICAgcHJvbWlzZUNoYWluKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkgPT4ge1xuICAgICAgICAgICAgTGlzdC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB0aGlzLmxpc3QsIHBhcmVudCwgMCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8VD59IHZhbHVlQXJyYXkgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkge1xuICAgICAgICBpZiAoaW5kZXggPj0gdmFsdWVBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlc29sdmUoKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBsaXN0ZW5lcih2YWx1ZUFycmF5W2luZGV4XSwgcGFyZW50KTtcbiAgICAgICAgICAgIExpc3QucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29tcGxldGVkUmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGVudHJpZXMgZnJvbSBwcm92aWRlZCBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0PFQ+fSBzb3VyY2VMaXN0IFxuICAgICAqL1xuICAgIGFkZEFsbChzb3VyY2VMaXN0KXtcbiAgICAgICAgc291cmNlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdW5kZXJseWluZyBhcnJheVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcnJheTxUPn1cbiAgICAgKi9cbiAgICBnZXRBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaWx0ZXJGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBmaWx0ZXIoZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0KHRoaXMubGlzdC5maWx0ZXIoZmlsdGVyRnVuY3Rpb24pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vbGlzdC5qc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdFV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdH0gbGlzdCBcbiAgICAgKi9cbiAgICBzdGF0aWMgcmV2ZXJzZShsaXN0KSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IG5ldyBMaXN0KCk7XG4gICAgICAgIGZvcih2YXIgaSA9IGxpc3Quc2l6ZSgpLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICByZXZlcnNlZC5hZGQobGlzdC5nZXQoaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXZlcnNlZDtcbiAgICB9XG5cbn0iLCIvKipcbiAqIFdyYXBwZXIgZm9yIGFuIG9iamVjdCBhbmQgYSBmdW5jdGlvbiB3aXRoaW4gdGhhdCBvYmplY3QuXG4gKiBBbGxvd3MgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBvYmplY3QgYXMgaXQncyBmaXJzdCBwYXJhbXRlclxuICogXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIEZcbiAqL1xuZXhwb3J0IGNsYXNzIE1ldGhvZHtcblxuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z9IHRoZUZ1bmN0aW9uIFxuICAgICAqIEBwYXJhbSB7VH0gdGhlT2JqZWN0IFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwbG9kZUFycmF5UGFyYW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aGVGdW5jdGlvbiwgdGhlT2JqZWN0ID0gbnVsbCwgZXhwbG9kZUFycmF5UGFyYW0gPSB0cnVlKXtcblxuICAgICAgICAvKiogQHR5cGUge1R9ICovXG4gICAgICAgIHRoaXMub2JqZWN0ID0gdGhlT2JqZWN0O1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5leHBsb2RlQXJyYXlQYXJhbSA9IGV4cGxvZGVBcnJheVBhcmFtO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb259ICovXG4gICAgICAgIHRoaXMuZnVuY3Rpb24gPSB0aGVGdW5jdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuZnVuY3Rpb24gPT09IG51bGwgfHwgdGhpcy5mdW5jdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0aGlzLmZ1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgZnVuY3Rpb24gbWlzc2luZ1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBmdW5jdGlvbiBhbmQgcGFzc2VkIHRoZSBvYmplY3QgYXMgZmlyc3QgcGFyYW1ldGVyLCAgYW5kIHRoZSBwcm92aWRlZCBwYXJhbXRlciBhcyB0aGUgc2Vjb25kIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtXG4gICAgICovXG4gICAgY2FsbChwYXJhbSl7XG4gICAgICAgIGNvbnN0IHRhcmdldE9iamVjdCA9IHRoaXMub2JqZWN0ID8gdGhpcy5vYmplY3QgOiB0aGlzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkgJiYgdGhpcy5leHBsb2RlQXJyYXlQYXJhbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb24uY2FsbCh0YXJnZXRPYmplY3QsIC4uLnBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mdW5jdGlvbi5jYWxsKHRhcmdldE9iamVjdCwgcGFyYW0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSBcIi4vbWV0aG9kLmpzXCI7XG5cblxubGV0IGxvZ0xldmVsID0gbnVsbDtcblxuLyoqIEB0eXBlIHtNZXRob2R9ICovXG5sZXQgbG9nTGlzdGVuZXIgPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xuXG4gICAgc3RhdGljIGdldCBGQVRBTCgpIHsgcmV0dXJuIDE7IH07XG4gICAgc3RhdGljIGdldCBFUlJPUigpIHsgcmV0dXJuIDI7IH07XG4gICAgc3RhdGljIGdldCBXQVJOKCkgeyByZXR1cm4gMzsgfTs7XG4gICAgc3RhdGljIGdldCBJTkZPKCkgeyByZXR1cm4gNDsgfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHKCkgeyByZXR1cm4gNTsgfTtcbiAgICBcbiAgICBzdGF0aWMgZ2V0IEZBVEFMX0xBQkVMKCkgeyByZXR1cm4gXCJGQVRBTFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgRVJST1JfTEFCRUwoKSB7IHJldHVybiBcIkVSUk9SXCI7IH07XG4gICAgc3RhdGljIGdldCBXQVJOX0xBQkVMKCkgeyByZXR1cm4gXCJXQVJOIFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgSU5GT19MQUJFTCgpIHsgcmV0dXJuIFwiSU5GTyBcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHX0xBQkVMKCkgeyByZXR1cm4gXCJERUJVR1wiOyB9O1xuXG4gICAgY29uc3RydWN0b3IobG9nTmFtZSkge1xuICAgICAgICB0aGlzLmxvZ05hbWUgPSBsb2dOYW1lO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgbGV2ZWwobGV2ZWwpIHtcbiAgICAgICAgbG9nTGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbGlzdGVuZXIgXG4gICAgICovXG4gICAgc3RhdGljIHNldCBsaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICBsb2dMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhckxpc3RlbmVyKCkge1xuICAgICAgICBsb2dMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsZXZlbCgpIHtcbiAgICAgICAgaWYgKGxvZ0xldmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExvZ2dlci5JTkZPO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHZhbHVlIHRvIGNvbnNvbGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgaW5mbyh2YWx1ZSwgaW5kZW50YXRpb24gPSAwKXtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuSU5GTywgTG9nZ2VyLklORk9fTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5pbmZvKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHdhcm4odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLldBUk4sIExvZ2dlci5XQVJOX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUud2Fybih2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBkZWJ1Z1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBkZWJ1Zyh2YWx1ZSwgaW5kZW50YXRpb24gPSAwKXtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuREVCVUcsIExvZ2dlci5ERUJVR19MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmRlYnVnKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGVycm9yKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuRVJST1IsIExvZ2dlci5FUlJPUl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmVycm9yKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZmF0YWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZmF0YWwodmFsdWUsIGluZGVudGF0aW9uID0gMCkge1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5GQVRBTCwgTG9nZ2VyLkZBVEFMX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuZmF0YWwodmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyh2YWx1ZSwgbG9nTmFtZSwgbGV2ZWwsIGxldmVsTGFiZWwsIGZ1bmMsIGluZGVudGF0aW9uKSB7XG4gICAgICAgIGlmKExvZ2dlci5sZXZlbCA8IGxldmVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0ZVRpbWU9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGZ1bmMobGV2ZWxMYWJlbCArIFwiIFwiICsgZGF0ZVRpbWUgKyBcIiBcIiArIGxvZ05hbWUgKyBcIjpcIik7XG4gICAgICAgICAgICBmdW5jKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bmMobGV2ZWxMYWJlbCArIFwiIFwiICsgZGF0ZVRpbWUgKyBcIiBcIiArIGxvZ05hbWUgKyBcIiBcIiArIExvZ2dlci5pbmRlbnQoaW5kZW50YXRpb24sIHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9nTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW3ZhbHVlLnN0YWNrLCBsZXZlbF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW0pTT04uc3RyaW5naWZ5KHZhbHVlLG51bGwsMiksIGxldmVsXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbG9nTGlzdGVuZXIuY2FsbChbXCJ1bmRlZmluZWRcIiwgbGV2ZWxdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW3ZhbHVlLCBsZXZlbF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kZW50IHRoZSBsb2cgZW50cnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVwdGggXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBpbmRlbnQoaW5kZW50YXRpb24sIHZhbHVlKXtcbiAgICAgICAgaWYoaW5kZW50YXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGluZSA9ICcnO1xuICAgICAgICBsaW5lID0gbGluZSArIGluZGVudGF0aW9uO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGluZGVudGF0aW9uIDsgaSsrKXtcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lICsgJyAnO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgPSBsaW5lICsgdmFsdWU7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJpbnRzIGEgbWFya2VyICcrJyBpbiBhYm92ZSB0aGUgZ2l2ZW4gcG9zaXRpb24gb2YgdGhlIHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBcbiAgICAgKi9cbiAgICBzaG93UG9zKHZhbHVlLHBvc2l0aW9uKXtcbiAgICAgICAgaWYobG9nTGV2ZWwgPCBMb2dnZXIuREVCVUcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJzb3JMaW5lID0gJyc7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdmFsdWUubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpID09IHBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcrJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGN1cnNvckxpbmUgPSBjdXJzb3JMaW5lICsgJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnNvckxpbmUpO1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnNvckxpbmUpO1xuXG4gICAgfVxuXG59XG4iLCJleHBvcnQgY2xhc3MgTWFjVXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1hYyBcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b01hY0FkZHJlc3MobWFjKSB7XG4gICAgICAgIGxldCBoZXggPSBtYWMudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoMTIsICcwJyk7XG4gICAgICAgIHJldHVybiBoZXgubWF0Y2goLy57MSwyfS9nKS5yZXZlcnNlKCkuam9pbihcIjpcIik7XG4gICAgfVxufSIsIi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuZXhwb3J0IGNsYXNzIE1hcCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tYXAgPSB7fTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tKG1hcCkge1xuICAgICAgICBjb25zdCBuZXdNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChtYXAgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIG5ld01hcC5tYXAgPSBtYXAubWFwO1xuICAgICAgICB9IGVsc2UgaWYgKG1hcC5tYXApIHtcbiAgICAgICAgICAgIG5ld01hcC5tYXAgPSBtYXAubWFwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TWFwLm1hcCA9IG1hcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3TWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcCBMaXN0ZW5lclxuICAgICAqIFxuICAgICAqIEB0eXBlZGVmIHtmdW5jdGlvbihTdHJpbmcsIFQsIE9iamVjdCl9IE1hcExpc3RlbmVyXG4gICAgICogQGNhbGxiYWNrIE1hcExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAgICovXG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNpemUgb2YgdGhlIG1hcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubWFwKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGF0IGdpdmVuIGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIGdldChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFtuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIGF0IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBlbnRyeSBmcm9tIG1hcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICovXG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYga2V5IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4aXN0cyhrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBrZXkgZXhpc3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBleGlzdHMoa2V5KXtcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgbWFwIGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50IFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvckVhY2gobGlzdGVuZXIscGFyZW50KSB7XG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIoa2V5LHRoaXMubWFwW2tleV0scGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIG1hcCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycy4gVGhlIGxpc3RlbmVyXG4gICAgICogbXVzdCBpdHNlbGYgcmV0dXJuIGEgcHJvbWlzZSB3aGljaCB3aGVuIHJlc29sdmVkIHdpbGwgY29udGludWUgdGhlIGNoYWluXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXBMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICovXG4gICAgcHJvbWlzZUNoYWluKGxpc3RlbmVyLCBwYXJlbnQpIHtcbiAgICAgICAgbGV0IGtleUFycmF5ID0gW107XG4gICAgICAgIGxldCB2YWx1ZUFycmF5ID0gW107XG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICBrZXlBcnJheS5wdXNoKGtleSk7XG4gICAgICAgICAgICB2YWx1ZUFycmF5LnB1c2godGhpcy5tYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpID0+IHtcbiAgICAgICAgICAgIE1hcC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCAwLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlBcnJheSBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZUFycmF5IFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVzb2x2ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSB7XG4gICAgICAgIGlmIChpbmRleCA+PSB2YWx1ZUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29tcGxldGVkUmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVyKGtleUFycmF5W2luZGV4XSwgdmFsdWVBcnJheVtpbmRleF0sIHBhcmVudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBNYXAucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwga2V5QXJyYXksIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgrMSwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGVudHJpZXMgZnJvbSBwcm92aWRlZCBtYXBcbiAgICAgKiBAcGFyYW0ge01hcDxUPn0gc291cmNlTWFwIFxuICAgICAqL1xuICAgIGFkZEFsbChzb3VyY2VNYXApe1xuICAgICAgICBzb3VyY2VNYXAuZm9yRWFjaChmdW5jdGlvbihrZXksdmFsdWUscGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuc2V0KGtleSx2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE1hcCB9IGZyb20gXCIuL21hcC5qc1wiO1xuXG5leHBvcnQgY2xhc3MgTWFwVXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXB9IG1hcCBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5VmFsdWVEZWxpbWl0ZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5RGVsaW1pdGVyIFxuICAgICAqL1xuICAgICBzdGF0aWMgdG9TdHJpbmcobWFwLCBrZXlWYWx1ZURlbGltaXRlciA9IFwiPVwiLCBlbnRyeURlbGltaXRlciA9IFwiJlwiKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xuICAgICAgICBtYXAuZm9yRWFjaCgoa2V5LCB2YWx1ZSwgcGFyZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgZW50cnlEZWxpbWl0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBsZXQgcmVzb2x2ZWRLZXkgPSBrZXk7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWRLZXkudG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZEtleSA9IHJlc29sdmVkS2V5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCByZXNvbHZlZFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWRWYWx1ZS50b1N0cmluZykge1xuICAgICAgICAgICAgICAgIHJlc29sdmVkVmFsdWUgPSByZXNvbHZlZFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHJlc29sdmVkS2V5ICsga2V5VmFsdWVEZWxpbWl0ZXIgKyByZXNvbHZlZFZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheTxNYXA8YW55LGFueT4+fSBzb3VyY2VNYXBBcnJheVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3ZlcndyaXRlXG4gICAgICogQHJldHVybiB7TWFwPGFueSxhbnk+fVxuICAgICAqL1xuICAgIHN0YXRpYyBtZXJnZShzb3VyY2VNYXBBcnJheSwgb3ZlcndyaXRlID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCByZXN1bHRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmICghc291cmNlTWFwQXJyYXkgfHwgc291cmNlTWFwQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNvdXJjZU1hcEFycmF5LmZvckVhY2goKHNvdXJjZU1hcCkgPT4ge1xuICAgICAgICAgICAgc291cmNlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlIHx8ICFyZXN1bHRNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0TWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRNYXA7XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBpcyBhIG51bWJlclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICovXG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgcGFyYW1ldGVyIGNvbnRhaW5zIHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0LmpzJ1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuanMnO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiT2JqZWN0TWFwcGVyXCIpO1xuXG4vKipcbiAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RNYXBwZXIge1xuXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGZpZWxkcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlclxuICAgICAqIFxuICAgICAqIEB0ZW1wbGF0ZSBUW11cbiAgICAgKiBAcGFyYW0ge2FycmF5fSBzb3VyY2UgXG4gICAgICogQHBhcmFtIHtUfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXBwZXJGdW5jdGlvbiBDdXN0b20gbWFwcGVyIGZ1bmN0aW9uIHRvIG1hcCBlYWNoIGVsZW1lbnQuIElmIG51bGwsIHRoZSBkZWZhdWx0IG1hcHBpbmcgaXMgdXNlZC5cbiAgICAgKiBAcmV0dXJucyBUW11cbiAgICAgKi9cbiAgICBzdGF0aWMgbWFwQWxsKHNvdXJjZSwgZGVzdGluYXRpb24sIG1hcHBlckZ1bmN0aW9uID0gbnVsbCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBbXTtcbiAgICAgICAgc291cmNlLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAobWFwcGVyRnVuY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5wdXNoKE9iamVjdE1hcHBlci5tYXAoZWxlbWVudCwgbmV3IGRlc3RpbmF0aW9uKCkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UucHVzaChtYXBwZXJGdW5jdGlvbihlbGVtZW50KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBmaWVsZHMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcbiAgICAgKiBcbiAgICAgKiBAdGVtcGxhdGUgVFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzb3VyY2UgXG4gICAgICogQHBhcmFtIHtUfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcmV0dXJucyBUXG4gICAgICovXG4gICAgc3RhdGljIG1hcChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGlmKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBzb3VyY2Ugb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIExPRy5lcnJvcihcIk5vIGRlc3RpbmF0aW9uIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc291cmNlS2V5cyA9IG5ldyBMaXN0KE9iamVjdC5rZXlzKHNvdXJjZSkpO1xuXG4gICAgICAgIHNvdXJjZUtleXMuZm9yRWFjaChcbiAgICAgICAgICAgIChzb3VyY2VLZXkpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlS2V5LnN0YXJ0c1dpdGgoXCJfX1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGVjaG5pY2FsIGZpZWxkc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkZXN0aW5hdGlvbltzb3VyY2VLZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKFwiVW5hYmxlIHRvIG1hcCBcIiArIHNvdXJjZUtleSArIFwiIGZyb20gLyB0bzpcIik7XG4gICAgICAgICAgICAgICAgICAgIExPRy53YXJuKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIExPRy53YXJuKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJVbmFibGUgdG8gbWFwIG9iamVjdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltzb3VyY2VLZXldID0gc291cmNlW3NvdXJjZUtleV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LHRoaXNcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG5cbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgT2JqZWN0VXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGFuIG9iamVjdCBpbnRvIGEgaHVtYW4tcmVhZGFibGUgZm9ybWF0LlxuICAgICAqIEBwYXJhbSB7YW55fSBvYmplY3QgXG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlSHVtYW5SZWFkYWJsZShvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgfSBlbHNlIGlmIChvYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBvYmplY3QgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGBbJHtvYmplY3QubWFwKGl0ZW0gPT4gdGhpcy5wYXJzZUh1bWFuUmVhZGFibGUoaXRlbSkpLmpvaW4oXCJcIil9XWA7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iamVjdCkubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaHJLZXkgPSB0aGlzLmNhbWVsQ2FzZVRvSHVtYW5SZWFkYWJsZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtocktleX06ICR7dGhpcy5wYXJzZUh1bWFuUmVhZGFibGUodmFsdWUpfVxcbmA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBlbnRyaWVzLmpvaW4oXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY2FtZWxDYXNlVG9IdW1hblJlYWRhYmxlKHRleHQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGV4dC5yZXBsYWNlKC8oW0EtWl0pL2csIFwiICQxXCIpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVzdWx0LnNsaWNlKDEpO1xuICAgIH1cblxuXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlBY2Nlc3NvcntcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRWYWx1ZShkZXN0aW5hdGlvbiwgbmFtZSkge1xuICAgICAgICB2YXIgcGF0aEFycmF5ID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhdGhBcnJheS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoa2V5IGluIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIHNldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgcGF0aEFycmF5ID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhdGhBcnJheS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbaV07XG4gICAgICAgICAgICBpZihpID09IG4tMSl7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKGtleSBpbiBkZXN0aW5hdGlvbikgfHwgZGVzdGluYXRpb25ba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIFJhZGl4VXRpbHMge1xuXG4gICAgc3RhdGljIENVU1RPTV9DSEFSQUNURVJTID0gXCIwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJhZGl4U3RyaW5nIFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1ZhbGlkUmFkaXhTdHJpbmcocmFkaXhTdHJpbmcpIHtcbiAgICAgICAgaWYgKHJhZGl4U3RyaW5nID09IG51bGwgfHwgcmFkaXhTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VzdG9tRGlnaXRzID0gUmFkaXhVdGlscy5DVVNUT01fQ0hBUkFDVEVSUy5zcGxpdCgnJyk7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiByYWRpeFN0cmluZy5zcGxpdCgnJykpIHtcbiAgICAgICAgICAgIGxldCBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRpZ2l0IG9mIGN1c3RvbURpZ2l0cykge1xuICAgICAgICAgICAgICAgIGlmIChjID09PSBkaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1iZXIgXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9SYWRpeFN0cmluZyhudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tRGlnaXRzID0gUmFkaXhVdGlscy5DVVNUT01fQ0hBUkFDVEVSUy5zcGxpdCgnJyk7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICB3aGlsZSAobnVtYmVyID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlbWFpbmRlciA9IE1hdGguZmxvb3IobnVtYmVyICUgY3VzdG9tRGlnaXRzLmxlbmd0aCk7XG4gICAgICAgICAgICByZXN1bHQgPSBjdXN0b21EaWdpdHNbcmVtYWluZGVyXSArIHJlc3VsdDtcbiAgICAgICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IobnVtYmVyIC8gY3VzdG9tRGlnaXRzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmFkaXhTdHJpbmcgXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJhZGl4U3RyaW5nKHJhZGl4U3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbURpZ2l0cyA9IFJhZGl4VXRpbHMuQ1VTVE9NX0NIQVJBQ1RFUlMuc3BsaXQoJycpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpeFN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYyA9IHJhZGl4U3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY3VzdG9tRGlnaXRzLmluZGV4T2YoYyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIHJhZGl4IHN0cmluZzogXCIgKyBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCAqIGN1c3RvbURpZ2l0cy5sZW5ndGggKyBpbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBTdHJpbmdUZW1wbGF0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlU3RyaW5nIFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmdUZW1wbGF0ZX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbSh0aGVTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdUZW1wbGF0ZSh0aGVTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVTdHJpbmcgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGhlU3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGhlU3RyaW5nID0gdGhlU3RyaW5nO1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudGhlU3RyaW5nID0gdGhpcy50aGVTdHJpbmcucmVwbGFjZShcIntcIiArIGtleSArIFwifVwiLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVTdHJpbmc7XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFRpbWVQcm9taXNlIHtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBwcm9taXNlIHdoaWNoIGV4ZWN1dGVzIHRoZSBwcm9taXNlRnVuY3Rpb24gd2l0aGluIGdpdmVuIHRpbWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9taXNlRnVuY3Rpb24gXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhdGljIGFzUHJvbWlzZSh0aW1lLCBwcm9taXNlRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb21pc2VGdW5jdGlvbi5jYWxsKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZS5jYWxsKCk7XG4gICAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ08sTUFBTSxXQUFXO0FBQ3hCO0FBQ0EsSUFBSSxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDN0IsUUFBUSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO0FBQ2hFLFlBQVks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
