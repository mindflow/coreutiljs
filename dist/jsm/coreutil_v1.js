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

export { ArrayUtils, BooleanUtils, CastUtils, List, ListUtils, Logger, Map, MapUtils, Method, NumberUtils, ObjectMapper, PropertyAccessor, StringTemplate, StringUtils, TimePromise };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9hcnJheVV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2Jvb2xlYW5VdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9jYXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbGlzdC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9saXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWV0aG9kLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xvZ2dlci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYXAuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWFwVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbnVtYmVyVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvb2JqZWN0TWFwcGVyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL3Byb3BlcnR5QWNjZXNzb3IuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvc3RyaW5nVGVtcGxhdGUuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvdGltZVByb21pc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbHN7XG5cbiAgICBzdGF0aWMgaXNJbkFscGhhYmV0KHZhbCkge1xuICAgICAgICBpZiAodmFsLmNoYXJDb2RlQXQoMCkgPj0gNjUgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gOTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gOTcgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gMTIyICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA0OCAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA1NyApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNTdHJpbmcodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0JsYW5rKHZhbCkge1xuICAgICAgICBpZighU3RyaW5nVXRpbHMuaGFzVmFsdWUodmFsKSB8fCB2YWwgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZTEgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgbm9uTnVsbEVxdWFscyh2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICBpZiAoIXZhbHVlMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlMSA9PSB2YWx1ZTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBzdGF0aWMgZXF1YWxzKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTEgPT0gdmFsdWUyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZTEgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgc3RhdGljIHN0YXJ0c1dpdGgodmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgICAgIGlmICghdmFsdWUxIHx8ICF2YWx1ZTIpIHtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTEuc3RhcnRzV2l0aCh2YWx1ZTIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHRoZSBjb21wcmVzc2VkIFN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBjb21wcmVzc1doaXRlc3BhY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUodmFsdWUuaW5kZXhPZihcIiAgXCIpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcIiAgXCIsIFwiIFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWxpbWl0ZXIgXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB0cmltXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjb21wcmVzc1doaXRlc3BhY2VcbiAgICAgKiBAcmV0dXJucyB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BcnJheSh2YWx1ZSwgZGVsaW1pdGVyLCB0cmltID0gdHJ1ZSwgY29tcHJlc3NXaGl0ZXNwYWNlID0gdHJ1ZSkge1xuICAgICAgICBpZiAodHJpbSkge1xuICAgICAgICAgICAgdmFsdWUgPSBTdHJpbmdVdGlscy50cmltKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcHJlc3NXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFN0cmluZ1V0aWxzLmNvbXByZXNzV2hpdGVzcGFjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsoZGVsaW1pdGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoZGVsaW1pdGVyKSA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnNwbGl0KGRlbGltaXRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqIEByZXR1cm5zIHRoZSB0cmltbWVkIFN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmltKHZhbHVlKSB7XG4gICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS50cmltKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3RyaW5nVXRpbHMgfSBmcm9tIFwiLi9zdHJpbmdVdGlscy5qc1wiXG5cbmV4cG9ydCBjbGFzcyBBcnJheVV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWxpbWl0ZXIgXG4gICAgICovXG4gICAgc3RhdGljIHRvU3RyaW5nKGFycmF5LCBkZWxpbWl0ZXIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gMCAmJiAhU3RyaW5nVXRpbHMuaXNCbGFuayhkZWxpbWl0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgZGVsaW1pdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIG11bHRpcGxlIGFycmF5cyBpbnRvIG9uZVxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8YW55Pj59IHNvdXJjZUFycmF5QXJyYXlcbiAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fVxuICAgICAqL1xuICAgIHN0YXRpYyBtZXJnZShzb3VyY2VBcnJheUFycmF5KSB7XG4gICAgICAgIGlmICghc291cmNlQXJyYXlBcnJheSB8fCBzb3VyY2VBcnJheUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlc3VsdEFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHNvdXJjZUFycmF5QXJyYXkuZm9yRWFjaCgoc291cmNlQXJyYXkpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZUFycmF5LmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRBcnJheS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0QXJyYXkucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0QXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGlmIG5vdCBleGlzdHNcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGFycmF5IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkKGFycmF5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBuZXdBcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgcHJvdmlkZWQgYXJyYXkgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzLiBUaGUgbGlzdGVuZXIgbXVzdFxuICAgICAqIGl0c2VsZiByZXR1cm4gYSBwcm9taXNlIHdoaWNoIHdoZW4gcmVzb2x2ZWQgd2lsbCBjb250aW51ZSB0aGUgY2hhaW5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGFycmF5XG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9taXNlQ2hhaW4oYXJyYXksIGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBBcnJheVV0aWxzLnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGFycmF5LCAwLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHtBcnJheTxUPn0gdmFsdWVBcnJheSBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVzb2x2ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBwcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB2YWx1ZUFycmF5LCBpbmRleCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSB7XG4gICAgICAgIGlmIChpbmRleCA+PSB2YWx1ZUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29tcGxldGVkUmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGxpc3RlbmVyKHZhbHVlQXJyYXlbaW5kZXhdKTtcbiAgICAgICAgICAgIEFycmF5VXRpbHMucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdmFsdWVBcnJheSwgaW5kZXgrMSwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgQm9vbGVhblV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBib29sZWFuIHR5cGVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0Jvb2xlYW4odmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBib29sZWFuIGhhcyB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09ISBudWxsICYmIHZhbCA9PSEgdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaXMgYm9vbGVhbiBpcyB0cnVlXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBpcyBmYWxzZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0ZhbHNlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBDYXN0VXRpbHMge1xuICAgIFxuICAgIHN0YXRpYyBjYXN0VG8oY2xhc3NSZWZlcmVuY2Usb2JqZWN0KXtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IGNsYXNzUmVmZXJlbmNlKCksb2JqZWN0KTtcbiAgICB9XG59IiwiLyoqXG4gKiBHZW5lcmljIExpc3QgY2xhc3NcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0IHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZyb21GdW5jdGlvbiBmcm9tIG1ldGhvZCBvZiBlbnRyeSB0eXBlIFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tKGFycmF5LCBmcm9tRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgTGlzdCgpO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBhcnJheSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gZnJvbUZ1bmN0aW9uID8gZnJvbUZ1bmN0aW9uKGFycmF5W2tleV0pIDogYXJyYXlba2V5XTtcbiAgICAgICAgICAgIGxpc3QuYWRkKGZyb21GdW5jdGlvbih2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgbGlzdCBhbmQgb3B0aW9uYWxseSBhc3NpZ24gZXhpc3RpbmcgYXJyYXlcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5PFQ+fSB2YWx1ZXMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodmFsdWVzKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7YXJyYXl9ICovXG4gICAgICAgIHRoaXMubGlzdCA9IG51bGw7XG4gICAgICAgIGlmKHZhbHVlcyAhPT0gdW5kZWZpbmVkICYmIHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHZhbHVlcztcbiAgICAgICAgfWVsc2UgaWYodmFsdWVzICE9PSB1bmRlZmluZWQgJiYgdmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBbdmFsdWVzXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdCBMaXN0ZW5lclxuICAgICAqIFxuICAgICAqIEB0eXBlZGVmIHtmdW5jdGlvbihULCBPYmplY3QpfSBMaXN0TGlzdGVuZXJcbiAgICAgKiBAY2FsbGJhY2sgTGlzdExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIG9mIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEByZXR1cm4ge1R9XG4gICAgICovXG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RbaW5kZXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB2YWx1ZSBvbiBwb3NpdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChpbmRleCx2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3RbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBsYXN0IGVudHJ5XG4gICAgICogXG4gICAgICogQHJldHVybiB7VH1cbiAgICAgKi9cbiAgICBnZXRMYXN0KCkge1xuICAgICAgICBpZih0aGlzLmxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB2YWx1ZSBvbiBwb3NpdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgc2V0TGFzdCh2YWx1ZSkge1xuICAgICAgICBpZih0aGlzLmxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB2YWx1ZSB0byBlbmQgb2YgbGlzdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGVsZW1lbnQgZnJvbSBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICByZW1vdmUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5saXN0LmZpbHRlcihmdW5jdGlvbihlbnRyeSl7XG4gICAgICAgICAgICByZXR1cm4gZW50cnkgIT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNpemUgb2YgdGhlIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIG9uIGluZGV4IGlzIGVxdWFsIHRvIHBhcmFtdGVyXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7VH0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhbHVlQXRFcXVhbHMoaW5kZXgsdmFsKSB7XG4gICAgICAgIGlmKHRoaXMuZ2V0KGluZGV4KSAhPT0gbnVsbCAmJiB0aGlzLmdldChpbmRleCkgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpID09PSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBleGlzdHNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcnJheSgpLmluY2x1ZGVzKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgZmlyc3QgdmFsdWUgaXMgZXF1YWwgdG8gcGFyYW1ldGVyXG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZmlyc3RWYWx1ZUVxdWFscyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBdEVxdWFscygwLHZhbCk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgbGlzdCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycyB3aGlsZSB0aGVcbiAgICAgKiBjYWxsZWQgZnVuY3Rpb24gcmV0dXJucyB0cnVlIG9yIHRoZSBsaXN0IGlzIG5vdCB5ZXQgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyZW50XG4gICAgICogXG4gICAgICovXG4gICAgZm9yRWFjaChsaXN0ZW5lciwgcGFyZW50KSB7XG4gICAgICAgIGZvcihsZXQgdmFsIG9mIHRoaXMubGlzdCkge1xuICAgICAgICAgICAgaWYoIWxpc3RlbmVyKHZhbCxwYXJlbnQpKXtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgbGlzdCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMuIFRoZSBsaXN0ZW5lciBtdXN0XG4gICAgICogaXRzZWxmIHJldHVybiBhIHByb21pc2Ugd2hpY2ggd2hlbiByZXNvbHZlZCB3aWxsIGNvbnRpbnVlIHRoZSBjaGFpblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBwcm9taXNlQ2hhaW4obGlzdGVuZXIscGFyZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBMaXN0LnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHRoaXMubGlzdCwgcGFyZW50LCAwLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3RMaXN0ZW5lcn0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHtBcnJheTxUPn0gdmFsdWVBcnJheSBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlc29sdmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZWplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgcHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KSB7XG4gICAgICAgIGlmIChpbmRleCA+PSB2YWx1ZUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29tcGxldGVkUmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGxpc3RlbmVyKHZhbHVlQXJyYXlbaW5kZXhdLCBwYXJlbnQpO1xuICAgICAgICAgICAgTGlzdC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4KzEsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3Q8VD59IHNvdXJjZUxpc3QgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZUxpc3Qpe1xuICAgICAgICBzb3VyY2VMaXN0LmZvckVhY2goZnVuY3Rpb24odmFsdWUscGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1bmRlcmx5aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHJldHVybnMge0FycmF5PFQ+fVxuICAgICAqL1xuICAgIGdldEFycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlckZ1bmN0aW9uIFxuICAgICAqL1xuICAgIGZpbHRlcihmaWx0ZXJGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IExpc3QodGhpcy5saXN0LmZpbHRlcihmaWx0ZXJGdW5jdGlvbikpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9saXN0LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0VXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0fSBsaXN0IFxuICAgICAqL1xuICAgIHN0YXRpYyByZXZlcnNlKGxpc3QpIHtcbiAgICAgICAgdmFyIHJldmVyc2VkID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBpID0gbGlzdC5zaXplKCktMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHJldmVyc2VkLmFkZChsaXN0LmdldChpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldmVyc2VkO1xuICAgIH1cblxufSIsIi8qKlxuICogV3JhcHBlciBmb3IgYW4gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHdpdGhpbiB0aGF0IG9iamVjdC5cbiAqIEFsbG93cyB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIG9iamVjdCBhcyBpdCdzIGZpcnN0IHBhcmFtdGVyXG4gKiBcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAdGVtcGxhdGUgRlxuICovXG5leHBvcnQgY2xhc3MgTWV0aG9ke1xuXG4gICAgLyoqXG4gICAgICogQ29udHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7VH0gdGhlT2JqZWN0IFxuICAgICAqIEBwYXJhbSB7Rn0gdGhlRnVuY3Rpb24gXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGhlT2JqZWN0LCB0aGVGdW5jdGlvbil7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtUfSAqL1xuICAgICAgICB0aGlzLm9iamVjdCA9IHRoZU9iamVjdDtcblxuICAgICAgICAvKiogQHR5cGUge0Z9ICovXG4gICAgICAgIHRoaXMuZnVuY3Rpb24gPSB0aGVGdW5jdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgZnVuY3Rpb24gYW5kIHBhc3NlZCB0aGUgb2JqZWN0IGFzIGZpcnN0IHBhcmFtZXRlciwgYW5kIHRoZSBwcm92aWRlZCBwYXJhbXRlciBhcyB0aGUgc2Vjb25kIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtXG4gICAgICovXG4gICAgY2FsbChwYXJhbSl7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb24uY2FsbCh0aGlzLm9iamVjdCwgLi4ucGFyYW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uLmNhbGwodGhpcy5vYmplY3QsIHBhcmFtKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCIuL21ldGhvZC5qc1wiO1xuXG5cbmxldCBsb2dMZXZlbCA9IG51bGw7XG5cbi8qKiBAdHlwZSB7TWV0aG9kfSAqL1xubGV0IGxvZ0xpc3RlbmVyID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIExvZ2dlcntcblxuICAgIHN0YXRpYyBnZXQgRkFUQUwoKSB7IHJldHVybiAxOyB9O1xuICAgIHN0YXRpYyBnZXQgRVJST1IoKSB7IHJldHVybiAyOyB9O1xuICAgIHN0YXRpYyBnZXQgV0FSTigpIHsgcmV0dXJuIDM7IH07O1xuICAgIHN0YXRpYyBnZXQgSU5GTygpIHsgcmV0dXJuIDQ7IH07XG4gICAgc3RhdGljIGdldCBERUJVRygpIHsgcmV0dXJuIDU7IH07XG4gICAgXG4gICAgc3RhdGljIGdldCBGQVRBTF9MQUJFTCgpIHsgcmV0dXJuIFwiRkFUQUxcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IEVSUk9SX0xBQkVMKCkgeyByZXR1cm4gXCJFUlJPUlwiOyB9O1xuICAgIHN0YXRpYyBnZXQgV0FSTl9MQUJFTCgpIHsgcmV0dXJuIFwiV0FSTiBcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IElORk9fTEFCRUwoKSB7IHJldHVybiBcIklORk8gXCI7IH07XG4gICAgc3RhdGljIGdldCBERUJVR19MQUJFTCgpIHsgcmV0dXJuIFwiREVCVUdcIjsgfTtcblxuICAgIGNvbnN0cnVjdG9yKGxvZ05hbWUpIHtcbiAgICAgICAgdGhpcy5sb2dOYW1lID0gbG9nTmFtZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IGxldmVsKGxldmVsKSB7XG4gICAgICAgIGxvZ0xldmVsID0gbGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGxpc3RlbmVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQgbGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgbG9nTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJMaXN0ZW5lcigpIHtcbiAgICAgICAgbG9nTGlzdGVuZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbGV2ZWwoKSB7XG4gICAgICAgIGlmIChsb2dMZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ0xldmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMb2dnZXIuSU5GTztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB2YWx1ZSB0byBjb25zb2xlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGluZm8odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLklORk8sIExvZ2dlci5JTkZPX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuaW5mbyh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGEgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICB3YXJuKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIExvZ2dlci5XQVJOLCBMb2dnZXIuV0FSTl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLndhcm4odmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZGVidWdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZGVidWcodmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkRFQlVHLCBMb2dnZXIuREVCVUdfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5kZWJ1Zyh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBlcnJvcih2YWx1ZSwgaW5kZW50YXRpb24gPSAwKSB7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLkVSUk9SLCBMb2dnZXIuRVJST1JfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5lcnJvcih2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGZhdGFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGZhdGFsKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuRkFUQUwsIExvZ2dlci5GQVRBTF9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmZhdGFsKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2codmFsdWUsIGxvZ05hbWUsIGxldmVsLCBsZXZlbExhYmVsLCBmdW5jLCBpbmRlbnRhdGlvbikge1xuICAgICAgICBpZihMb2dnZXIubGV2ZWwgPCBsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGVUaW1lPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCI6XCIpO1xuICAgICAgICAgICAgZnVuYyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCIgXCIgKyBMb2dnZXIuaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFt2YWx1ZS5zdGFjaywgbGV2ZWxdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFtKU09OLnN0cmluZ2lmeSh2YWx1ZSxudWxsLDIpLCBsZXZlbF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW1widW5kZWZpbmVkXCIsIGxldmVsXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFt2YWx1ZSwgbGV2ZWxdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGVudCB0aGUgbG9nIGVudHJ5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSl7XG4gICAgICAgIGlmKGluZGVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmUgPSAnJztcbiAgICAgICAgbGluZSA9IGxpbmUgKyBpbmRlbnRhdGlvbjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBpbmRlbnRhdGlvbiA7IGkrKyl7XG4gICAgICAgICAgICBsaW5lID0gbGluZSArICcgJztcbiAgICAgICAgfVxuICAgICAgICBsaW5lID0gbGluZSArIHZhbHVlO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByaW50cyBhIG1hcmtlciAnKycgaW4gYWJvdmUgdGhlIGdpdmVuIHBvc2l0aW9uIG9mIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24gXG4gICAgICovXG4gICAgc2hvd1Bvcyh2YWx1ZSxwb3NpdGlvbil7XG4gICAgICAgIGlmKGxvZ0xldmVsIDwgTG9nZ2VyLkRFQlVHKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3Vyc29yTGluZSA9ICcnO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHZhbHVlLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PSBwb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnKyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBAdGVtcGxhdGUgVFxuICovXG5leHBvcnQgY2xhc3MgTWFwIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1hcCA9IHt9O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20obWFwKSB7XG4gICAgICAgIGNvbnN0IG5ld01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKG1hcCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgbmV3TWFwLm1hcCA9IG1hcC5tYXA7XG4gICAgICAgIH0gZWxzZSBpZiAobWFwLm1hcCkge1xuICAgICAgICAgICAgbmV3TWFwLm1hcCA9IG1hcC5tYXA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdNYXAubWFwID0gbWFwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdNYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwIExpc3RlbmVyXG4gICAgICogXG4gICAgICogQHR5cGVkZWYge2Z1bmN0aW9uKFN0cmluZywgVCwgT2JqZWN0KX0gTWFwTGlzdGVuZXJcbiAgICAgKiBAY2FsbGJhY2sgTWFwTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2l6ZSBvZiB0aGUgbWFwXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXApLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXQgZ2l2ZW4ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwW25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgYXQga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGVudHJ5IGZyb20gbWFwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBrZXkgZXhpc3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhpc3RzKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGV4aXN0cyhrZXkpe1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBtYXAgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBmdWxseSBpdGVyYXRlZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwTGlzdGVuZXJ9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnQgXG4gICAgICogXG4gICAgICovXG4gICAgZm9yRWFjaChsaXN0ZW5lcixwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcihrZXksdGhpcy5tYXBba2V5XSxwYXJlbnQpKXtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgbWFwIGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzLiBUaGUgbGlzdGVuZXJcbiAgICAgKiBtdXN0IGl0c2VsZiByZXR1cm4gYSBwcm9taXNlIHdoaWNoIHdoZW4gcmVzb2x2ZWQgd2lsbCBjb250aW51ZSB0aGUgY2hhaW5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcExpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBwcm9taXNlQ2hhaW4obGlzdGVuZXIsIHBhcmVudCkge1xuICAgICAgICBsZXQga2V5QXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IHZhbHVlQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIGtleUFycmF5LnB1c2goa2V5KTtcbiAgICAgICAgICAgIHZhbHVlQXJyYXkucHVzaCh0aGlzLm1hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkgPT4ge1xuICAgICAgICAgICAgTWFwLnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGtleUFycmF5LCB2YWx1ZUFycmF5LCBwYXJlbnQsIDAsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwTGlzdGVuZXJ9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleUFycmF5IFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlQXJyYXkgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGtleUFycmF5LCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXIoa2V5QXJyYXlbaW5kZXhdLCB2YWx1ZUFycmF5W2luZGV4XSwgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE1hcC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIG1hcFxuICAgICAqIEBwYXJhbSB7TWFwPFQ+fSBzb3VyY2VNYXAgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZU1hcCl7XG4gICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXQoa2V5LHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTWFwIH0gZnJvbSBcIi4vbWFwLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYXBVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcH0gbWFwIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlWYWx1ZURlbGltaXRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlEZWxpbWl0ZXIgXG4gICAgICovXG4gICAgIHN0YXRpYyB0b1N0cmluZyhtYXAsIGtleVZhbHVlRGVsaW1pdGVyID0gXCI9XCIsIGVudHJ5RGVsaW1pdGVyID0gXCImXCIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGxldCBmaXJzdCA9IHRydWU7XG4gICAgICAgIG1hcC5mb3JFYWNoKChrZXksIHZhbHVlLCBwYXJlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBlbnRyeURlbGltaXRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGxldCByZXNvbHZlZEtleSA9IGtleTtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZEtleS50b1N0cmluZykge1xuICAgICAgICAgICAgICAgIHJlc29sdmVkS2V5ID0gcmVzb2x2ZWRLZXkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHJlc29sdmVkVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZFZhbHVlLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmVkVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgcmVzb2x2ZWRLZXkgKyBrZXlWYWx1ZURlbGltaXRlciArIHJlc29sdmVkVmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1hcDxhbnksYW55Pj59IHNvdXJjZU1hcEFycmF5XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvdmVyd3JpdGVcbiAgICAgKiBAcmV0dXJuIHtNYXA8YW55LGFueT59XG4gICAgICovXG4gICAgc3RhdGljIG1lcmdlKHNvdXJjZU1hcEFycmF5LCBvdmVyd3JpdGUgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKCFzb3VyY2VNYXBBcnJheSB8fCBzb3VyY2VNYXBBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc291cmNlTWFwQXJyYXkuZm9yRWFjaCgoc291cmNlTWFwKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2VNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGUgfHwgIXJlc3VsdE1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRNYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdE1hcDtcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgTnVtYmVyVXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIGlzIGEgbnVtYmVyXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBwYXJhbWV0ZXIgY29udGFpbnMgdmFsdWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QuanMnXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlci5qcyc7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJPYmplY3RNYXBwZXJcIik7XG5cbi8qKlxuICogTWFwcyBmaWVsZHMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdE1hcHBlciB7XG5cblxuICAgIC8qKlxuICAgICAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXG4gICAgICogXG4gICAgICogQHRlbXBsYXRlIFRbXVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHNvdXJjZSBcbiAgICAgKiBAcGFyYW0ge1R9IGRlc3RpbmF0aW9uIFxuICAgICAqIEByZXR1cm5zIFRbXVxuICAgICAqL1xuICAgIHN0YXRpYyBtYXBBbGwoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBbXTtcbiAgICAgICAgc291cmNlLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5wdXNoKHRoaXMubWFwKGVsZW1lbnQsIG5ldyBkZXN0aW5hdGlvbigpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBmaWVsZHMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcbiAgICAgKiBcbiAgICAgKiBAdGVtcGxhdGUgVFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzb3VyY2UgXG4gICAgICogQHBhcmFtIHtUfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcmV0dXJucyBUXG4gICAgICovXG4gICAgc3RhdGljIG1hcChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGlmKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBzb3VyY2Ugb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIExPRy5lcnJvcihcIk5vIGRlc3RpbmF0aW9uIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc291cmNlS2V5cyA9IG5ldyBMaXN0KE9iamVjdC5rZXlzKHNvdXJjZSkpO1xuXG4gICAgICAgIHNvdXJjZUtleXMuZm9yRWFjaChcbiAgICAgICAgICAgIChzb3VyY2VLZXkpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihkZXN0aW5hdGlvbltzb3VyY2VLZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKFwiVW5hYmxlIHRvIG1hcCBcIiArIHNvdXJjZUtleSArIFwiIGZyb21cIik7XG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJ0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJVbmFibGUgdG8gbWFwIG9iamVjdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltzb3VyY2VLZXldID0gc291cmNlW3NvdXJjZUtleV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LHRoaXNcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG5cbiAgICB9XG5cbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUFjY2Vzc29ye1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICovXG4gICAgc3RhdGljIGdldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmKGkgPT0gbi0xKXtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIGRlc3RpbmF0aW9uKSB8fCBkZXN0aW5hdGlvbltrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJleHBvcnQgY2xhc3MgU3RyaW5nVGVtcGxhdGUge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZVN0cmluZyBcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nVGVtcGxhdGV9XG4gICAgICovXG4gICAgc3RhdGljIGZyb20odGhlU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nVGVtcGxhdGUodGhlU3RyaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlU3RyaW5nIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRoZVN0cmluZykge1xuICAgICAgICB0aGlzLnRoZVN0cmluZyA9IHRoZVN0cmluZztcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnRoZVN0cmluZyA9IHRoaXMudGhlU3RyaW5nLnJlcGxhY2UoXCJ7XCIgKyBrZXkgKyBcIn1cIiwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlU3RyaW5nO1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBUaW1lUHJvbWlzZSB7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gcHJvbWlzZSB3aGljaCBleGVjdXRlcyB0aGUgcHJvbWlzZUZ1bmN0aW9uIHdpdGhpbiBnaXZlbiB0aW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvbWlzZUZ1bmN0aW9uIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXRpYyBhc1Byb21pc2UodGltZSwgcHJvbWlzZUZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9taXNlRnVuY3Rpb24uY2FsbCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUuY2FsbCgpO1xuICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ08sTUFBTSxXQUFXO0FBQ3hCO0FBQ0EsSUFBSSxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDN0IsUUFBUSxJQUFJLEdBQUcsQ0FBQyxV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
