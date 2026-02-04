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
     * @returns T[]
     */
    static mapAll(source, destination) {
        let response = [];
        source.forEach(element => {
            response.push(this.map(element, new destination()));
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

export { ArrayUtils, BooleanUtils, CastUtils, List, ListUtils, Logger, MacUtils, Map, MapUtils, Method, NumberUtils, ObjectMapper, ObjectUtils, PropertyAccessor, RadixUtils, StringTemplate, StringUtils, TimePromise };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9hcnJheVV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2Jvb2xlYW5VdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9jYXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbGlzdC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9saXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWV0aG9kLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xvZ2dlci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYWNVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYXAuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWFwVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbnVtYmVyVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvb2JqZWN0TWFwcGVyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL29iamVjdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL3Byb3BlcnR5QWNjZXNzb3IuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvcmFkaXhVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdUZW1wbGF0ZS5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC90aW1lUHJvbWlzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsc3tcblxuICAgIHN0YXRpYyBpc0luQWxwaGFiZXQodmFsKSB7XG4gICAgICAgIGlmICh2YWwuY2hhckNvZGVBdCgwKSA+PSA2NSAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA5MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA5NyAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSAxMjIgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbC5jaGFyQ29kZUF0KDApID49IDQ4ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDU3ICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1N0cmluZyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzQmxhbmsodmFsKSB7XG4gICAgICAgIGlmKCFTdHJpbmdVdGlscy5oYXNWYWx1ZSh2YWwpIHx8IHZhbCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBub25OdWxsRXF1YWxzKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIGlmICghdmFsdWUxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWx1ZTIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUxID09IHZhbHVlMjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUxIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZTIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHN0YXRpYyBlcXVhbHModmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlMSA9PSB2YWx1ZTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBzdGF0aWMgc3RhcnRzV2l0aCh2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICAgaWYgKCF2YWx1ZTEgfHwgIXZhbHVlMikge1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlMS5zdGFydHNXaXRoKHZhbHVlMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMgdGhlIGNvbXByZXNzZWQgU3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIGNvbXByZXNzV2hpdGVzcGFjZSh2YWx1ZSkge1xuICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSh2YWx1ZS5pbmRleE9mKFwiICBcIikgPiAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwiICBcIiwgXCIgXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbGltaXRlciBcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRyaW1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNvbXByZXNzV2hpdGVzcGFjZVxuICAgICAqIEByZXR1cm5zIHRoZSBhcnJheVxuICAgICAqL1xuICAgIHN0YXRpYyB0b0FycmF5KHZhbHVlLCBkZWxpbWl0ZXIsIHRyaW0gPSB0cnVlLCBjb21wcmVzc1doaXRlc3BhY2UgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0cmltKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFN0cmluZ1V0aWxzLnRyaW0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wcmVzc1doaXRlc3BhY2UpIHtcbiAgICAgICAgICAgIHZhbHVlID0gU3RyaW5nVXRpbHMuY29tcHJlc3NXaGl0ZXNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNCbGFuayhkZWxpbWl0ZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihkZWxpbWl0ZXIpID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUuc3BsaXQoZGVsaW1pdGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gICAgICogQHJldHVybnMgdGhlIHRyaW1tZWQgU3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIHRyaW0odmFsdWUpIHtcbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnRyaW0oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGVmdFBhZCh2YWx1ZSwgdGFyZ2V0TGVuZ3RoLCBwYWRDaGFyKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgd2hpbGUgKHJlc3VsdC5sZW5ndGggPCB0YXJnZXRMZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHBhZENoYXIgKyByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmVlZGxlIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoYXlzdGFjayBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgY29udGFpbnMobmVlZGxlLCBoYXlzdGFjaykge1xuICAgICAgICBpZiAoIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKG5lZWRsZSkgfHwgIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKGhheXN0YWNrKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXlzdGFjay5pbmRleE9mKG5lZWRsZSkgPiAtMTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdHJpbmdVdGlscyB9IGZyb20gXCIuL3N0cmluZ1V0aWxzLmpzXCJcblxuZXhwb3J0IGNsYXNzIEFycmF5VXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRlbGltaXRlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9TdHJpbmcoYXJyYXksIGRlbGltaXRlcikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmICFTdHJpbmdVdGlscy5pc0JsYW5rKGRlbGltaXRlcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBkZWxpbWl0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUudG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgbXVsdGlwbGUgYXJyYXlzIGludG8gb25lXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheTxhbnk+Pn0gc291cmNlQXJyYXlBcnJheVxuICAgICAqIEByZXR1cm4ge0FycmF5PGFueT59XG4gICAgICovXG4gICAgc3RhdGljIG1lcmdlKHNvdXJjZUFycmF5QXJyYXkpIHtcbiAgICAgICAgaWYgKCFzb3VyY2VBcnJheUFycmF5IHx8IHNvdXJjZUFycmF5QXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVzdWx0QXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgc291cmNlQXJyYXlBcnJheS5mb3JFYWNoKChzb3VyY2VBcnJheSkgPT4ge1xuICAgICAgICAgICAgc291cmNlQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdEFycmF5LmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRBcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgaWYgbm90IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyYXkgXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGQoYXJyYXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FycmF5LnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBwcm92aWRlZCBhcnJheSBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMuIFRoZSBsaXN0ZW5lciBtdXN0XG4gICAgICogaXRzZWxmIHJldHVybiBhIHByb21pc2Ugd2hpY2ggd2hlbiByZXNvbHZlZCB3aWxsIGNvbnRpbnVlIHRoZSBjaGFpblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyYXlcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICovXG4gICAgc3RhdGljIHByb21pc2VDaGFpbihhcnJheSwgbGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpID0+IHtcbiAgICAgICAgICAgIEFycmF5VXRpbHMucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgYXJyYXksIDAsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0FycmF5PFQ+fSB2YWx1ZUFycmF5IFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgbGlzdGVuZXIodmFsdWVBcnJheVtpbmRleF0pO1xuICAgICAgICAgICAgQXJyYXlVdGlscy5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB2YWx1ZUFycmF5LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29tcGxldGVkUmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGFycmF5IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBjb250YWlucyh2YWx1ZSwgYXJyYXkpIHtcbiAgICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIEJvb2xlYW5VdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgYm9vbGVhbiB0eXBlXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNCb29sZWFuKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBoYXMgdmFsdWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlzIGJvb2xlYW4gaXMgdHJ1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc1RydWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGJvb2xlYW4gaXMgZmFsc2VcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGYWxzZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQ2FzdFV0aWxzIHtcbiAgICBcbiAgICBzdGF0aWMgY2FzdFRvKGNsYXNzUmVmZXJlbmNlLG9iamVjdCl7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBjbGFzc1JlZmVyZW5jZSgpLG9iamVjdCk7XG4gICAgfVxufSIsIi8qKlxuICogR2VuZXJpYyBMaXN0IGNsYXNzXG4gKiBAdGVtcGxhdGUgVFxuICovXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmcm9tRnVuY3Rpb24gZnJvbSBtZXRob2Qgb2YgZW50cnkgdHlwZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShhcnJheSwgZnJvbUZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZyb21GdW5jdGlvbiA/IGZyb21GdW5jdGlvbihhcnJheVtrZXldKSA6IGFycmF5W2tleV07XG4gICAgICAgICAgICBsaXN0LmFkZChmcm9tRnVuY3Rpb24odmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QgYW5kIG9wdGlvbmFsbHkgYXNzaWduIGV4aXN0aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheTxUPn0gdmFsdWVzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlcykge1xuICAgICAgICAvKiogQHR5cGUge2FycmF5fSAqL1xuICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xuICAgICAgICBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB2YWx1ZXM7XG4gICAgICAgIH1lbHNlIGlmKHZhbHVlcyAhPT0gdW5kZWZpbmVkICYmIHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW3ZhbHVlc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3QgTGlzdGVuZXJcbiAgICAgKiBcbiAgICAgKiBAdHlwZWRlZiB7ZnVuY3Rpb24oVCwgT2JqZWN0KX0gTGlzdExpc3RlbmVyXG4gICAgICogQGNhbGxiYWNrIExpc3RMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAgICovXG5cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBwb3NpdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcmV0dXJuIHtUfVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXQoaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgdGhpcy5saXN0W2luZGV4XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgbGFzdCBlbnRyeVxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge1R9XG4gICAgICovXG4gICAgZ2V0TGFzdCgpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aC0xXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldExhc3QodmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdmFsdWUgdG8gZW5kIG9mIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3QucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBlbGVtZW50IGZyb20gbGlzdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgcmVtb3ZlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5maWx0ZXIoZnVuY3Rpb24oZW50cnkpe1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICE9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzaXplIG9mIHRoZSBsaXN0XG4gICAgICogXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBvbiBpbmRleCBpcyBlcXVhbCB0byBwYXJhbXRlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZUF0RXF1YWxzKGluZGV4LHZhbCkge1xuICAgICAgICBpZih0aGlzLmdldChpbmRleCkgIT09IG51bGwgJiYgdGhpcy5nZXQoaW5kZXgpICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KSA9PT0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgZXhpc3RzXG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXkoKS5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZpcnN0VmFsdWVFcXVhbHModmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlQXRFcXVhbHMoMCx2YWwpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIGxpc3QgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBub3QgeWV0IGZ1bGx5IGl0ZXJhdGVkXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvckVhY2gobGlzdGVuZXIsIHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IHZhbCBvZiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcih2YWwscGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIGxpc3QgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzLiBUaGUgbGlzdGVuZXIgbXVzdFxuICAgICAqIGl0c2VsZiByZXR1cm4gYSBwcm9taXNlIHdoaWNoIHdoZW4gcmVzb2x2ZWQgd2lsbCBjb250aW51ZSB0aGUgY2hhaW5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICovXG4gICAgcHJvbWlzZUNoYWluKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkgPT4ge1xuICAgICAgICAgICAgTGlzdC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB0aGlzLmxpc3QsIHBhcmVudCwgMCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8VD59IHZhbHVlQXJyYXkgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkge1xuICAgICAgICBpZiAoaW5kZXggPj0gdmFsdWVBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlc29sdmUoKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBsaXN0ZW5lcih2YWx1ZUFycmF5W2luZGV4XSwgcGFyZW50KTtcbiAgICAgICAgICAgIExpc3QucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29tcGxldGVkUmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGVudHJpZXMgZnJvbSBwcm92aWRlZCBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0PFQ+fSBzb3VyY2VMaXN0IFxuICAgICAqL1xuICAgIGFkZEFsbChzb3VyY2VMaXN0KXtcbiAgICAgICAgc291cmNlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdW5kZXJseWluZyBhcnJheVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcnJheTxUPn1cbiAgICAgKi9cbiAgICBnZXRBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaWx0ZXJGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBmaWx0ZXIoZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0KHRoaXMubGlzdC5maWx0ZXIoZmlsdGVyRnVuY3Rpb24pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vbGlzdC5qc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdFV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdH0gbGlzdCBcbiAgICAgKi9cbiAgICBzdGF0aWMgcmV2ZXJzZShsaXN0KSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IG5ldyBMaXN0KCk7XG4gICAgICAgIGZvcih2YXIgaSA9IGxpc3Quc2l6ZSgpLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICByZXZlcnNlZC5hZGQobGlzdC5nZXQoaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXZlcnNlZDtcbiAgICB9XG5cbn0iLCIvKipcbiAqIFdyYXBwZXIgZm9yIGFuIG9iamVjdCBhbmQgYSBmdW5jdGlvbiB3aXRoaW4gdGhhdCBvYmplY3QuXG4gKiBBbGxvd3MgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBvYmplY3QgYXMgaXQncyBmaXJzdCBwYXJhbXRlclxuICogXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIEZcbiAqL1xuZXhwb3J0IGNsYXNzIE1ldGhvZHtcblxuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z9IHRoZUZ1bmN0aW9uIFxuICAgICAqIEBwYXJhbSB7VH0gdGhlT2JqZWN0IFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRoZUZ1bmN0aW9uLCB0aGVPYmplY3QgPSBudWxsKXtcblxuICAgICAgICAvKiogQHR5cGUge1R9ICovXG4gICAgICAgIHRoaXMub2JqZWN0ID0gdGhlT2JqZWN0O1xuXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb259ICovXG4gICAgICAgIHRoaXMuZnVuY3Rpb24gPSB0aGVGdW5jdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuZnVuY3Rpb24gPT09IG51bGwgfHwgdGhpcy5mdW5jdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0aGlzLmZ1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2QgZnVuY3Rpb24gbWlzc2luZ1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBmdW5jdGlvbiBhbmQgcGFzc2VkIHRoZSBvYmplY3QgYXMgZmlyc3QgcGFyYW1ldGVyLCAgYW5kIHRoZSBwcm92aWRlZCBwYXJhbXRlciBhcyB0aGUgc2Vjb25kIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtXG4gICAgICovXG4gICAgY2FsbChwYXJhbSl7XG4gICAgICAgIGNvbnN0IHRhcmdldE9iamVjdCA9IHRoaXMub2JqZWN0ID8gdGhpcy5vYmplY3QgOiB0aGlzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uLmNhbGwodGFyZ2V0T2JqZWN0LCAuLi5wYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb24uY2FsbCh0YXJnZXRPYmplY3QsIHBhcmFtKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCIuL21ldGhvZC5qc1wiO1xuXG5cbmxldCBsb2dMZXZlbCA9IG51bGw7XG5cbi8qKiBAdHlwZSB7TWV0aG9kfSAqL1xubGV0IGxvZ0xpc3RlbmVyID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIExvZ2dlcntcblxuICAgIHN0YXRpYyBnZXQgRkFUQUwoKSB7IHJldHVybiAxOyB9O1xuICAgIHN0YXRpYyBnZXQgRVJST1IoKSB7IHJldHVybiAyOyB9O1xuICAgIHN0YXRpYyBnZXQgV0FSTigpIHsgcmV0dXJuIDM7IH07O1xuICAgIHN0YXRpYyBnZXQgSU5GTygpIHsgcmV0dXJuIDQ7IH07XG4gICAgc3RhdGljIGdldCBERUJVRygpIHsgcmV0dXJuIDU7IH07XG4gICAgXG4gICAgc3RhdGljIGdldCBGQVRBTF9MQUJFTCgpIHsgcmV0dXJuIFwiRkFUQUxcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IEVSUk9SX0xBQkVMKCkgeyByZXR1cm4gXCJFUlJPUlwiOyB9O1xuICAgIHN0YXRpYyBnZXQgV0FSTl9MQUJFTCgpIHsgcmV0dXJuIFwiV0FSTiBcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IElORk9fTEFCRUwoKSB7IHJldHVybiBcIklORk8gXCI7IH07XG4gICAgc3RhdGljIGdldCBERUJVR19MQUJFTCgpIHsgcmV0dXJuIFwiREVCVUdcIjsgfTtcblxuICAgIGNvbnN0cnVjdG9yKGxvZ05hbWUpIHtcbiAgICAgICAgdGhpcy5sb2dOYW1lID0gbG9nTmFtZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IGxldmVsKGxldmVsKSB7XG4gICAgICAgIGxvZ0xldmVsID0gbGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGxpc3RlbmVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQgbGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgbG9nTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJMaXN0ZW5lcigpIHtcbiAgICAgICAgbG9nTGlzdGVuZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbGV2ZWwoKSB7XG4gICAgICAgIGlmIChsb2dMZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ0xldmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMb2dnZXIuSU5GTztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB2YWx1ZSB0byBjb25zb2xlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGluZm8odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLklORk8sIExvZ2dlci5JTkZPX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuaW5mbyh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGEgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICB3YXJuKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5XQVJOLCBMb2dnZXIuV0FSTl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLndhcm4odmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZGVidWdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZGVidWcodmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkRFQlVHLCBMb2dnZXIuREVCVUdfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5kZWJ1Zyh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBlcnJvcih2YWx1ZSwgaW5kZW50YXRpb24gPSAwKSB7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkVSUk9SLCBMb2dnZXIuRVJST1JfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5lcnJvcih2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGZhdGFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGZhdGFsKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuRkFUQUwsIExvZ2dlci5GQVRBTF9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmZhdGFsKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2codmFsdWUsIGxvZ05hbWUsIGxldmVsLCBsZXZlbExhYmVsLCBmdW5jLCBpbmRlbnRhdGlvbikge1xuICAgICAgICBpZihMb2dnZXIubGV2ZWwgPCBsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGVUaW1lPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCI6XCIpO1xuICAgICAgICAgICAgZnVuYyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCIgXCIgKyBMb2dnZXIuaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFt2YWx1ZS5zdGFjaywgbGV2ZWxdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFtKU09OLnN0cmluZ2lmeSh2YWx1ZSxudWxsLDIpLCBsZXZlbF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW1widW5kZWZpbmVkXCIsIGxldmVsXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFt2YWx1ZSwgbGV2ZWxdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGVudCB0aGUgbG9nIGVudHJ5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSl7XG4gICAgICAgIGlmKGluZGVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmUgPSAnJztcbiAgICAgICAgbGluZSA9IGxpbmUgKyBpbmRlbnRhdGlvbjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBpbmRlbnRhdGlvbiA7IGkrKyl7XG4gICAgICAgICAgICBsaW5lID0gbGluZSArICcgJztcbiAgICAgICAgfVxuICAgICAgICBsaW5lID0gbGluZSArIHZhbHVlO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByaW50cyBhIG1hcmtlciAnKycgaW4gYWJvdmUgdGhlIGdpdmVuIHBvc2l0aW9uIG9mIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24gXG4gICAgICovXG4gICAgc2hvd1Bvcyh2YWx1ZSxwb3NpdGlvbil7XG4gICAgICAgIGlmKGxvZ0xldmVsIDwgTG9nZ2VyLkRFQlVHKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3Vyc29yTGluZSA9ICcnO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHZhbHVlLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PSBwb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnKyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcblxuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIE1hY1V0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYWMgXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgdG9NYWNBZGRyZXNzKG1hYykge1xuICAgICAgICBsZXQgaGV4ID0gbWFjLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnBhZFN0YXJ0KDEyLCAnMCcpO1xuICAgICAgICByZXR1cm4gaGV4Lm1hdGNoKC8uezEsMn0vZykucmV2ZXJzZSgpLmpvaW4oXCI6XCIpO1xuICAgIH1cbn0iLCIvKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXAge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFwID0ge307XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZnJvbShtYXApIHtcbiAgICAgICAgY29uc3QgbmV3TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAobWFwIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICBuZXdNYXAubWFwID0gbWFwLm1hcDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXAubWFwKSB7XG4gICAgICAgICAgICBuZXdNYXAubWFwID0gbWFwLm1hcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld01hcC5tYXAgPSBtYXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld01hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXAgTGlzdGVuZXJcbiAgICAgKiBcbiAgICAgKiBAdHlwZWRlZiB7ZnVuY3Rpb24oU3RyaW5nLCBULCBPYmplY3QpfSBNYXBMaXN0ZW5lclxuICAgICAqIEBjYWxsYmFjayBNYXBMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqL1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzaXplIG9mIHRoZSBtYXBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1hcCkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9iamVjdCBhdCBnaXZlbiBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBnZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBhdCBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXBba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZW50cnkgZnJvbSBtYXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqL1xuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMubWFwW2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5leGlzdHMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYga2V5IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhpc3RzKGtleSl7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIG1hcCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycyB3aGlsZSB0aGVcbiAgICAgKiBjYWxsZWQgZnVuY3Rpb24gcmV0dXJucyB0cnVlIG9yIHRoZSBsaXN0IGlzIGZ1bGx5IGl0ZXJhdGVkXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXBMaXN0ZW5lcn0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudCBcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYoIWxpc3RlbmVyKGtleSx0aGlzLm1hcFtrZXldLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBtYXAgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMuIFRoZSBsaXN0ZW5lclxuICAgICAqIG11c3QgaXRzZWxmIHJldHVybiBhIHByb21pc2Ugd2hpY2ggd2hlbiByZXNvbHZlZCB3aWxsIGNvbnRpbnVlIHRoZSBjaGFpblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqL1xuICAgIHByb21pc2VDaGFpbihsaXN0ZW5lciwgcGFyZW50KSB7XG4gICAgICAgIGxldCBrZXlBcnJheSA9IFtdO1xuICAgICAgICBsZXQgdmFsdWVBcnJheSA9IFtdO1xuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAga2V5QXJyYXkucHVzaChrZXkpO1xuICAgICAgICAgICAgdmFsdWVBcnJheS5wdXNoKHRoaXMubWFwW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBNYXAucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwga2V5QXJyYXksIHZhbHVlQXJyYXksIHBhcmVudCwgMCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXBMaXN0ZW5lcn0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHtBcnJheX0ga2V5QXJyYXkgXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVBcnJheSBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlc29sdmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZWplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgcHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwga2V5QXJyYXksIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkge1xuICAgICAgICBpZiAoaW5kZXggPj0gdmFsdWVBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlc29sdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcihrZXlBcnJheVtpbmRleF0sIHZhbHVlQXJyYXlbaW5kZXhdLCBwYXJlbnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTWFwLnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGtleUFycmF5LCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4KzEsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29tcGxldGVkUmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBlbnRyaWVzIGZyb20gcHJvdmlkZWQgbWFwXG4gICAgICogQHBhcmFtIHtNYXA8VD59IHNvdXJjZU1hcCBcbiAgICAgKi9cbiAgICBhZGRBbGwoc291cmNlTWFwKXtcbiAgICAgICAgc291cmNlTWFwLmZvckVhY2goZnVuY3Rpb24oa2V5LHZhbHVlLHBhcmVudCkge1xuICAgICAgICAgICAgcGFyZW50LnNldChrZXksdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBNYXAgfSBmcm9tIFwiLi9tYXAuanNcIjtcblxuZXhwb3J0IGNsYXNzIE1hcFV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwfSBtYXAgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVZhbHVlRGVsaW1pdGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeURlbGltaXRlciBcbiAgICAgKi9cbiAgICAgc3RhdGljIHRvU3RyaW5nKG1hcCwga2V5VmFsdWVEZWxpbWl0ZXIgPSBcIj1cIiwgZW50cnlEZWxpbWl0ZXIgPSBcIiZcIikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgbWFwLmZvckVhY2goKGtleSwgdmFsdWUsIHBhcmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIGVudHJ5RGVsaW1pdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcblxuICAgICAgICAgICAgbGV0IHJlc29sdmVkS2V5ID0ga2V5O1xuICAgICAgICAgICAgaWYgKHJlc29sdmVkS2V5LnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRLZXkgPSByZXNvbHZlZEtleS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcmVzb2x2ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHJlc29sdmVkVmFsdWUudG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZFZhbHVlID0gcmVzb2x2ZWRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyByZXNvbHZlZEtleSArIGtleVZhbHVlRGVsaW1pdGVyICsgcmVzb2x2ZWRWYWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8TWFwPGFueSxhbnk+Pn0gc291cmNlTWFwQXJyYXlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG92ZXJ3cml0ZVxuICAgICAqIEByZXR1cm4ge01hcDxhbnksYW55Pn1cbiAgICAgKi9cbiAgICBzdGF0aWMgbWVyZ2Uoc291cmNlTWFwQXJyYXksIG92ZXJ3cml0ZSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAoIXNvdXJjZU1hcEFycmF5IHx8IHNvdXJjZU1hcEFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBzb3VyY2VNYXBBcnJheS5mb3JFYWNoKChzb3VyY2VNYXApID0+IHtcbiAgICAgICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSB8fCAhcmVzdWx0TWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdE1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0TWFwO1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBOdW1iZXJVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgaXMgYSBudW1iZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsIFxuICAgICAqL1xuICAgIHN0YXRpYyBpc051bWJlcih2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHBhcmFtZXRlciBjb250YWlucyB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdC5qcydcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyLmpzJztcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIk9iamVjdE1hcHBlclwiKTtcblxuLyoqXG4gKiBNYXBzIGZpZWxkcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlclxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0TWFwcGVyIHtcblxuXG4gICAgLyoqXG4gICAgICogTWFwcyBmaWVsZHMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcbiAgICAgKiBcbiAgICAgKiBAdGVtcGxhdGUgVFtdXG4gICAgICogQHBhcmFtIHthcnJheX0gc291cmNlIFxuICAgICAqIEBwYXJhbSB7VH0gZGVzdGluYXRpb24gXG4gICAgICogQHJldHVybnMgVFtdXG4gICAgICovXG4gICAgc3RhdGljIG1hcEFsbChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IFtdO1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnB1c2godGhpcy5tYXAoZWxlbWVudCwgbmV3IGRlc3RpbmF0aW9uKCkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGZpZWxkcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlclxuICAgICAqIFxuICAgICAqIEB0ZW1wbGF0ZSBUXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNvdXJjZSBcbiAgICAgKiBAcGFyYW0ge1R9IGRlc3RpbmF0aW9uIFxuICAgICAqIEByZXR1cm5zIFRcbiAgICAgKi9cbiAgICBzdGF0aWMgbWFwKHNvdXJjZSwgZGVzdGluYXRpb24pIHtcbiAgICAgICAgaWYoc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIExPRy5lcnJvcihcIk5vIHNvdXJjZSBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgTE9HLmVycm9yKFwiTm8gZGVzdGluYXRpb24gb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzb3VyY2VLZXlzID0gbmV3IExpc3QoT2JqZWN0LmtleXMoc291cmNlKSk7XG5cbiAgICAgICAgc291cmNlS2V5cy5mb3JFYWNoKFxuICAgICAgICAgICAgKHNvdXJjZUtleSkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VLZXkuc3RhcnRzV2l0aChcIl9fXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0ZWNobmljYWwgZmllbGRzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGRlc3RpbmF0aW9uW3NvdXJjZUtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJVbmFibGUgdG8gbWFwIFwiICsgc291cmNlS2V5ICsgXCIgZnJvbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihcInRvXCIpO1xuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIlVuYWJsZSB0byBtYXAgb2JqZWN0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW3NvdXJjZUtleV0gPSBzb3VyY2Vbc291cmNlS2V5XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sdGhpc1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcblxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBPYmplY3RVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYW4gb2JqZWN0IGludG8gYSBodW1hbi1yZWFkYWJsZSBmb3JtYXQuXG4gICAgICogQHBhcmFtIHthbnl9IG9iamVjdCBcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VIdW1hblJlYWRhYmxlKG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICB9IGVsc2UgaWYgKG9iamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygb2JqZWN0ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFske29iamVjdC5tYXAoaXRlbSA9PiB0aGlzLnBhcnNlSHVtYW5SZWFkYWJsZShpdGVtKSkuam9pbihcIlwiKX1dYDtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGxldCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob2JqZWN0KS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBocktleSA9IHRoaXMuY2FtZWxDYXNlVG9IdW1hblJlYWRhYmxlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2hyS2V5fTogJHt0aGlzLnBhcnNlSHVtYW5SZWFkYWJsZSh2YWx1ZSl9XFxuYDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGVudHJpZXMuam9pbihcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjYW1lbENhc2VUb0h1bWFuUmVhZGFibGUodGV4dCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0ZXh0LnJlcGxhY2UoLyhbQS1aXSkvZywgXCIgJDFcIik7XG4gICAgICAgIHJldHVybiByZXN1bHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZXN1bHQuc2xpY2UoMSk7XG4gICAgfVxuXG5cbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUFjY2Vzc29ye1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICovXG4gICAgc3RhdGljIGdldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmKGkgPT0gbi0xKXtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIGRlc3RpbmF0aW9uKSB8fCBkZXN0aW5hdGlvbltrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJleHBvcnQgY2xhc3MgUmFkaXhVdGlscyB7XG5cbiAgICBzdGF0aWMgQ1VTVE9NX0NIQVJBQ1RFUlMgPSBcIjAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmFkaXhTdHJpbmcgXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzVmFsaWRSYWRpeFN0cmluZyhyYWRpeFN0cmluZykge1xuICAgICAgICBpZiAocmFkaXhTdHJpbmcgPT0gbnVsbCB8fCByYWRpeFN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXN0b21EaWdpdHMgPSBSYWRpeFV0aWxzLkNVU1RPTV9DSEFSQUNURVJTLnNwbGl0KCcnKTtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHJhZGl4U3RyaW5nLnNwbGl0KCcnKSkge1xuICAgICAgICAgICAgbGV0IGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGlnaXQgb2YgY3VzdG9tRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IGRpZ2l0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG51bWJlciBcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b1JhZGl4U3RyaW5nKG51bWJlcikge1xuICAgICAgICBjb25zdCBjdXN0b21EaWdpdHMgPSBSYWRpeFV0aWxzLkNVU1RPTV9DSEFSQUNURVJTLnNwbGl0KCcnKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIHdoaWxlIChudW1iZXIgPiAwKSB7XG4gICAgICAgICAgICBsZXQgcmVtYWluZGVyID0gTWF0aC5mbG9vcihudW1iZXIgJSBjdXN0b21EaWdpdHMubGVuZ3RoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGN1c3RvbURpZ2l0c1tyZW1haW5kZXJdICsgcmVzdWx0O1xuICAgICAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihudW1iZXIgLyBjdXN0b21EaWdpdHMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByYWRpeFN0cmluZyBcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUmFkaXhTdHJpbmcocmFkaXhTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tRGlnaXRzID0gUmFkaXhVdGlscy5DVVNUT01fQ0hBUkFDVEVSUy5zcGxpdCgnJyk7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGl4U3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gcmFkaXhTdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjdXN0b21EaWdpdHMuaW5kZXhPZihjKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBjaGFyYWN0ZXIgaW4gcmFkaXggc3RyaW5nOiBcIiArIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICogY3VzdG9tRGlnaXRzLmxlbmd0aCArIGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFN0cmluZ1RlbXBsYXRlIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVTdHJpbmcgXG4gICAgICogQHJldHVybnMge1N0cmluZ1RlbXBsYXRlfVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tKHRoZVN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFN0cmluZ1RlbXBsYXRlKHRoZVN0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZVN0cmluZyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aGVTdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aGVTdHJpbmcgPSB0aGVTdHJpbmc7XG4gICAgfVxuXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy50aGVTdHJpbmcgPSB0aGlzLnRoZVN0cmluZy5yZXBsYWNlKFwie1wiICsga2V5ICsgXCJ9XCIsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRoZVN0cmluZztcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgVGltZVByb21pc2Uge1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHByb21pc2Ugd2hpY2ggZXhlY3V0ZXMgdGhlIHByb21pc2VGdW5jdGlvbiB3aXRoaW4gZ2l2ZW4gdGltZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByb21pc2VGdW5jdGlvbiBcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGF0aWMgYXNQcm9taXNlKHRpbWUsIHByb21pc2VGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZUZ1bmN0aW9uLmNhbGwoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlLmNhbGwoKTtcbiAgICAgICAgICAgIH0sIHRpbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNPLE1BQU0sV0FBVztBQUN4QjtBQUNBLElBQUksT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFO0FBQzdCLFFBQVEsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtBQUNoRSxZQUFZLE9BQU8sSUFBSSxDQUFDO0FBQ3hCLFNBQVM7QUFDVCxRQUFRLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUc7QUFDbkUsWUFBWSxPQUFPLElBQUksQ0FBQztBQUN4QixTQUFTO0FBQ1QsUUFBUSxLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHO0FBQ2xFLFlBQVksT0FBTyxJQUFJLENBQUM7QUFDeEIsU0FBUztBQUNULFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSztBQUNMO0FBQ0EsSUFBSSxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUU7QUFDekIsUUFBUSxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztBQUN2QyxLQUFLO0FBQ0w7QUFD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
