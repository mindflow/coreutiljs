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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9hcnJheVV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2Jvb2xlYW5VdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9jYXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbGlzdC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9saXN0VXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWV0aG9kLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xvZ2dlci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9tYXAuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbWFwVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbnVtYmVyVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvb2JqZWN0TWFwcGVyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL3Byb3BlcnR5QWNjZXNzb3IuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvc3RyaW5nVGVtcGxhdGUuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvdGltZVByb21pc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbHN7XG5cbiAgICBzdGF0aWMgaXNJbkFscGhhYmV0KHZhbCkge1xuICAgICAgICBpZiAodmFsLmNoYXJDb2RlQXQoMCkgPj0gNjUgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gOTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gOTcgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gMTIyICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA0OCAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA1NyApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNTdHJpbmcodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0JsYW5rKHZhbCkge1xuICAgICAgICBpZighU3RyaW5nVXRpbHMuaGFzVmFsdWUodmFsKSB8fCB2YWwgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZTEgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgbm9uTnVsbEVxdWFscyh2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICBpZiAoIXZhbHVlMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlMSA9PSB2YWx1ZTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBzdGF0aWMgZXF1YWxzKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTEgPT0gdmFsdWUyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZTEgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlMiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgc3RhdGljIHN0YXJ0c1dpdGgodmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgICAgIGlmICghdmFsdWUxIHx8ICF2YWx1ZTIpIHtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTEuc3RhcnRzV2l0aCh2YWx1ZTIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHRoZSBjb21wcmVzc2VkIFN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBjb21wcmVzc1doaXRlc3BhY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUodmFsdWUuaW5kZXhPZihcIiAgXCIpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcIiAgXCIsIFwiIFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWxpbWl0ZXIgXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB0cmltXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjb21wcmVzc1doaXRlc3BhY2VcbiAgICAgKiBAcmV0dXJucyB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BcnJheSh2YWx1ZSwgZGVsaW1pdGVyLCB0cmltID0gdHJ1ZSwgY29tcHJlc3NXaGl0ZXNwYWNlID0gdHJ1ZSkge1xuICAgICAgICBpZiAodHJpbSkge1xuICAgICAgICAgICAgdmFsdWUgPSBTdHJpbmdVdGlscy50cmltKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcHJlc3NXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFN0cmluZ1V0aWxzLmNvbXByZXNzV2hpdGVzcGFjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzQmxhbmsoZGVsaW1pdGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoZGVsaW1pdGVyKSA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnNwbGl0KGRlbGltaXRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqIEByZXR1cm5zIHRoZSB0cmltbWVkIFN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmltKHZhbHVlKSB7XG4gICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS50cmltKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3RyaW5nVXRpbHMgfSBmcm9tIFwiLi9zdHJpbmdVdGlscy5qc1wiXG5cbmV4cG9ydCBjbGFzcyBBcnJheVV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZWxpbWl0ZXIgXG4gICAgICovXG4gICAgc3RhdGljIHRvU3RyaW5nKGFycmF5LCBkZWxpbWl0ZXIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gMCAmJiAhU3RyaW5nVXRpbHMuaXNCbGFuayhkZWxpbWl0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgZGVsaW1pdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBCb29sZWFuVXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIGJvb2xlYW4gdHlwZVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGJvb2xlYW4gaGFzIHZhbHVlXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT0hIG51bGwgJiYgdmFsID09ISB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpcyBib29sZWFuIGlzIHRydWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNUcnVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBib29sZWFuIGlzIGZhbHNlXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIGlzRmFsc2UodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIENhc3RVdGlscyB7XG4gICAgXG4gICAgc3RhdGljIGNhc3RUbyhjbGFzc1JlZmVyZW5jZSxvYmplY3Qpe1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgY2xhc3NSZWZlcmVuY2UoKSxvYmplY3QpO1xuICAgIH1cbn0iLCIvKipcbiAqIEdlbmVyaWMgTGlzdCBjbGFzc1xuICogQHRlbXBsYXRlIFRcbiAqL1xuZXhwb3J0IGNsYXNzIExpc3Qge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnJvbUZ1bmN0aW9uIGZyb20gbWV0aG9kIG9mIGVudHJ5IHR5cGUgXG4gICAgICovXG4gICAgc3RhdGljIGZyb20oYXJyYXksIGZyb21GdW5jdGlvbikge1xuICAgICAgICBsZXQgbGlzdCA9IG5ldyBMaXN0KCk7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGFycmF5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBmcm9tRnVuY3Rpb24gPyBmcm9tRnVuY3Rpb24oYXJyYXlba2V5XSkgOiBhcnJheVtrZXldO1xuICAgICAgICAgICAgbGlzdC5hZGQoZnJvbUZ1bmN0aW9uKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBsaXN0IGFuZCBvcHRpb25hbGx5IGFzc2lnbiBleGlzdGluZyBhcnJheVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8VD59IHZhbHVlcyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZXMpIHtcbiAgICAgICAgLyoqIEB0eXBlIHthcnJheX0gKi9cbiAgICAgICAgdGhpcy5saXN0ID0gbnVsbDtcbiAgICAgICAgaWYodmFsdWVzICE9PSB1bmRlZmluZWQgJiYgdmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gdmFsdWVzO1xuICAgICAgICB9ZWxzZSBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IFt2YWx1ZXNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IExpc3RlbmVyXG4gICAgICogXG4gICAgICogQHR5cGVkZWYge2Z1bmN0aW9uKFQsIE9iamVjdCl9IExpc3RMaXN0ZW5lclxuICAgICAqIEBjYWxsYmFjayBMaXN0TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqL1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHJldHVybiB7VH1cbiAgICAgKi9cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdFtpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7VH0gdmFsdWUgXG4gICAgICovXG4gICAgc2V0KGluZGV4LHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdFtpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlIG9mIGxhc3QgZW50cnlcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtUfVxuICAgICAqL1xuICAgIGdldExhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXRMYXN0KHZhbHVlKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aC0xXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHZhbHVlIHRvIGVuZCBvZiBsaXN0XG4gICAgICogXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBhZGQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5saXN0LnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZWxlbWVudCBmcm9tIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHJlbW92ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuZmlsdGVyKGZ1bmN0aW9uKGVudHJ5KXtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAhPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2l6ZSBvZiB0aGUgbGlzdFxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgb24gaW5kZXggaXMgZXF1YWwgdG8gcGFyYW10ZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtUfSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWVBdEVxdWFscyhpbmRleCx2YWwpIHtcbiAgICAgICAgaWYodGhpcy5nZXQoaW5kZXgpICE9PSBudWxsICYmIHRoaXMuZ2V0KGluZGV4KSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCkgPT09IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIGV4aXN0c1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFycmF5KCkuaW5jbHVkZXModmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBmaXJzdCB2YWx1ZSBpcyBlcXVhbCB0byBwYXJhbWV0ZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbCBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmaXJzdFZhbHVlRXF1YWxzKHZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZUF0RXF1YWxzKDAsdmFsKTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgbm90IHlldCBmdWxseSBpdGVyYXRlZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCB2YWwgb2YgdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZighbGlzdGVuZXIodmFsLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycy4gVGhlIGxpc3RlbmVyIG11c3RcbiAgICAgKiBpdHNlbGYgcmV0dXJuIGEgcHJvbWlzZSB3aGljaCB3aGVuIHJlc29sdmVkIHdpbGwgY29udGludWUgdGhlIGNoYWluXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMaXN0TGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudFxuICAgICAqL1xuICAgIHByb21pc2VDaGFpbihsaXN0ZW5lcixwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpID0+IHtcbiAgICAgICAgICAgIExpc3QucHJvbWlzZUNoYWluU3RlcChsaXN0ZW5lciwgdGhpcy5saXN0LCBwYXJlbnQsIDAsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdExpc3RlbmVyfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0FycmF5PFQ+fSB2YWx1ZUFycmF5IFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVzb2x2ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlZFJlamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBwcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgbGlzdGVuZXIodmFsdWVBcnJheVtpbmRleF0sIHBhcmVudCk7XG4gICAgICAgICAgICBMaXN0LnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIHZhbHVlQXJyYXksIHBhcmVudCwgaW5kZXgrMSwgY29tcGxldGVkUmVzb2x2ZSwgY29tcGxldGVkUmVqZWN0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBlbnRyaWVzIGZyb20gcHJvdmlkZWQgbGlzdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGlzdDxUPn0gc291cmNlTGlzdCBcbiAgICAgKi9cbiAgICBhZGRBbGwoc291cmNlTGlzdCl7XG4gICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHVuZGVybHlpbmcgYXJyYXlcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8VD59XG4gICAgICovXG4gICAgZ2V0QXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyRnVuY3Rpb24gXG4gICAgICovXG4gICAgZmlsdGVyKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdCh0aGlzLmxpc3QuZmlsdGVyKGZpbHRlckZ1bmN0aW9uKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3QuanNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3RVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0xpc3R9IGxpc3QgXG4gICAgICovXG4gICAgc3RhdGljIHJldmVyc2UobGlzdCkge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSBuZXcgTGlzdCgpO1xuICAgICAgICBmb3IodmFyIGkgPSBsaXN0LnNpemUoKS0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgcmV2ZXJzZWQuYWRkKGxpc3QuZ2V0KGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV2ZXJzZWQ7XG4gICAgfVxuXG59IiwiLyoqXG4gKiBXcmFwcGVyIGZvciBhbiBvYmplY3QgYW5kIGEgZnVuY3Rpb24gd2l0aGluIHRoYXQgb2JqZWN0LlxuICogQWxsb3dzIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2l0aCB0aGUgb2JqZWN0IGFzIGl0J3MgZmlyc3QgcGFyYW10ZXJcbiAqIFxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXRob2R7XG5cbiAgICAvKipcbiAgICAgKiBDb250cnVjdG9yXG4gICAgICogQHBhcmFtIHtUfSB0aGVPYmplY3QgXG4gICAgICogQHBhcmFtIHtGfSB0aGVGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aGVPYmplY3QsIHRoZUZ1bmN0aW9uKXtcblxuICAgICAgICAvKiogQHR5cGUge1R9ICovXG4gICAgICAgIHRoaXMub2JqZWN0ID0gdGhlT2JqZWN0O1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Rn0gKi9cbiAgICAgICAgdGhpcy5mdW5jdGlvbiA9IHRoZUZ1bmN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBmdW5jdGlvbiBhbmQgcGFzc2VkIHRoZSBvYmplY3QgYXMgZmlyc3QgcGFyYW1ldGVyLCBhbmQgdGhlIHByb3ZpZGVkIHBhcmFtdGVyIGFzIHRoZSBzZWNvbmQgcGFyYW10ZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW1cbiAgICAgKi9cbiAgICBjYWxsKHBhcmFtKXtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mdW5jdGlvbi5jYWxsKHRoaXMub2JqZWN0LCAuLi5wYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb24uY2FsbCh0aGlzLm9iamVjdCwgcGFyYW0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSBcIi4vbWV0aG9kLmpzXCI7XG5cblxubGV0IGxvZ0xldmVsID0gbnVsbDtcblxuLyoqIEB0eXBlIHtNZXRob2R9ICovXG5sZXQgbG9nTGlzdGVuZXIgPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xuXG4gICAgc3RhdGljIGdldCBGQVRBTCgpIHsgcmV0dXJuIDE7IH07XG4gICAgc3RhdGljIGdldCBFUlJPUigpIHsgcmV0dXJuIDI7IH07XG4gICAgc3RhdGljIGdldCBXQVJOKCkgeyByZXR1cm4gMzsgfTs7XG4gICAgc3RhdGljIGdldCBJTkZPKCkgeyByZXR1cm4gNDsgfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHKCkgeyByZXR1cm4gNTsgfTtcbiAgICBcbiAgICBzdGF0aWMgZ2V0IEZBVEFMX0xBQkVMKCkgeyByZXR1cm4gXCJGQVRBTFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgRVJST1JfTEFCRUwoKSB7IHJldHVybiBcIkVSUk9SXCI7IH07XG4gICAgc3RhdGljIGdldCBXQVJOX0xBQkVMKCkgeyByZXR1cm4gXCJXQVJOIFwiOyB9O1xuICAgIHN0YXRpYyBnZXQgSU5GT19MQUJFTCgpIHsgcmV0dXJuIFwiSU5GTyBcIjsgfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHX0xBQkVMKCkgeyByZXR1cm4gXCJERUJVR1wiOyB9O1xuXG4gICAgY29uc3RydWN0b3IobG9nTmFtZSkge1xuICAgICAgICB0aGlzLmxvZ05hbWUgPSBsb2dOYW1lO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgbGV2ZWwobGV2ZWwpIHtcbiAgICAgICAgbG9nTGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbGlzdGVuZXIgXG4gICAgICovXG4gICAgc3RhdGljIHNldCBsaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICBsb2dMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhckxpc3RlbmVyKCkge1xuICAgICAgICBsb2dMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsZXZlbCgpIHtcbiAgICAgICAgaWYgKGxvZ0xldmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExvZ2dlci5JTkZPO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHZhbHVlIHRvIGNvbnNvbGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgaW5mbyh2YWx1ZSwgaW5kZW50YXRpb24gPSAwKXtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuSU5GTywgTG9nZ2VyLklORk9fTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5pbmZvKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHdhcm4odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgTG9nZ2VyLldBUk4sIExvZ2dlci5XQVJOX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUud2Fybih2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBkZWJ1Z1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBkZWJ1Zyh2YWx1ZSwgaW5kZW50YXRpb24gPSAwKXtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuREVCVUcsIExvZ2dlci5ERUJVR19MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmRlYnVnKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGVycm9yKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuRVJST1IsIExvZ2dlci5FUlJPUl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmVycm9yKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGZhdGFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGZhdGFsKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBMb2dnZXIuRkFUQUwsIExvZ2dlci5GQVRBTF9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmZhdGFsKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2codmFsdWUsIGxvZ05hbWUsIGxldmVsLCBsZXZlbExhYmVsLCBmdW5jLCBpbmRlbnRhdGlvbikge1xuICAgICAgICBpZihMb2dnZXIubGV2ZWwgPCBsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGVUaW1lPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCI6XCIpO1xuICAgICAgICAgICAgZnVuYyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCIgXCIgKyBMb2dnZXIuaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFt2YWx1ZS5zdGFjaywgbGV2ZWxdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFtKU09OLnN0cmluZ2lmeSh2YWx1ZSxudWxsLDIpLCBsZXZlbF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxvZ0xpc3RlbmVyLmNhbGwoW1widW5kZWZpbmVkXCIsIGxldmVsXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2dMaXN0ZW5lci5jYWxsKFt2YWx1ZSwgbGV2ZWxdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGVudCB0aGUgbG9nIGVudHJ5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSl7XG4gICAgICAgIGlmKGluZGVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmUgPSAnJztcbiAgICAgICAgbGluZSA9IGxpbmUgKyBpbmRlbnRhdGlvbjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBpbmRlbnRhdGlvbiA7IGkrKyl7XG4gICAgICAgICAgICBsaW5lID0gbGluZSArICcgJztcbiAgICAgICAgfVxuICAgICAgICBsaW5lID0gbGluZSArIHZhbHVlO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByaW50cyBhIG1hcmtlciAnKycgaW4gYWJvdmUgdGhlIGdpdmVuIHBvc2l0aW9uIG9mIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24gXG4gICAgICovXG4gICAgc2hvd1Bvcyh2YWx1ZSxwb3NpdGlvbil7XG4gICAgICAgIGlmKGxvZ0xldmVsIDwgTG9nZ2VyLkRFQlVHKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3Vyc29yTGluZSA9ICcnO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHZhbHVlLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PSBwb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnKyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcblxuICAgIH1cblxufVxuIiwiLyoqXG4gKiBAdGVtcGxhdGUgVFxuICovXG5leHBvcnQgY2xhc3MgTWFwIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1hcCA9IHt9O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGZyb20obWFwKSB7XG4gICAgICAgIGNvbnN0IG5ld01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKG1hcCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgbmV3TWFwLm1hcCA9IG1hcC5tYXA7XG4gICAgICAgIH0gZWxzZSBpZiAobWFwLm1hcCkge1xuICAgICAgICAgICAgbmV3TWFwLm1hcCA9IG1hcC5tYXA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdNYXAubWFwID0gbWFwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdNYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwIExpc3RlbmVyXG4gICAgICogXG4gICAgICogQHR5cGVkZWYge2Z1bmN0aW9uKFN0cmluZywgVCwgT2JqZWN0KX0gTWFwTGlzdGVuZXJcbiAgICAgKiBAY2FsbGJhY2sgTWFwTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2l6ZSBvZiB0aGUgbWFwXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXApLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXQgZ2l2ZW4ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwW25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgYXQga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcGFyYW0ge1R9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGVudHJ5IGZyb20gbWFwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBrZXkgZXhpc3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhpc3RzKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGV4aXN0cyhrZXkpe1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBtYXAgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBmdWxseSBpdGVyYXRlZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwTGlzdGVuZXJ9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnQgXG4gICAgICogXG4gICAgICovXG4gICAgZm9yRWFjaChsaXN0ZW5lcixwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcihrZXksdGhpcy5tYXBba2V5XSxwYXJlbnQpKXtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3BzIG92ZXIgYWxsIHZhbHVlcyBpbiB0aGUgbWFwIGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzLiBUaGUgbGlzdGVuZXJcbiAgICAgKiBtdXN0IGl0c2VsZiByZXR1cm4gYSBwcm9taXNlIHdoaWNoIHdoZW4gcmVzb2x2ZWQgd2lsbCBjb250aW51ZSB0aGUgY2hhaW5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcExpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBwcm9taXNlQ2hhaW4obGlzdGVuZXIsIHBhcmVudCkge1xuICAgICAgICBsZXQga2V5QXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IHZhbHVlQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIGtleUFycmF5LnB1c2goa2V5KTtcbiAgICAgICAgICAgIHZhbHVlQXJyYXkucHVzaCh0aGlzLm1hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCkgPT4ge1xuICAgICAgICAgICAgTWFwLnByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGtleUFycmF5LCB2YWx1ZUFycmF5LCBwYXJlbnQsIDAsIGNvbXBsZXRlZFJlc29sdmUsIGNvbXBsZXRlZFJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwTGlzdGVuZXJ9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleUFycmF5IFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlQXJyYXkgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZWRSZXNvbHZlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVkUmVqZWN0XG4gICAgICovXG4gICAgc3RhdGljIHByb21pc2VDaGFpblN0ZXAobGlzdGVuZXIsIGtleUFycmF5LCB2YWx1ZUFycmF5LCBwYXJlbnQsIGluZGV4LCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWRSZXNvbHZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXIoa2V5QXJyYXlbaW5kZXhdLCB2YWx1ZUFycmF5W2luZGV4XSwgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE1hcC5wcm9taXNlQ2hhaW5TdGVwKGxpc3RlbmVyLCBrZXlBcnJheSwgdmFsdWVBcnJheSwgcGFyZW50LCBpbmRleCsxLCBjb21wbGV0ZWRSZXNvbHZlLCBjb21wbGV0ZWRSZWplY3QpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZFJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIG1hcFxuICAgICAqIEBwYXJhbSB7TWFwPFQ+fSBzb3VyY2VNYXAgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZU1hcCl7XG4gICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXQoa2V5LHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTWFwIH0gZnJvbSBcIi4vbWFwLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYXBVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcH0gbWFwIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlWYWx1ZURlbGltaXRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlEZWxpbWl0ZXIgXG4gICAgICovXG4gICAgIHN0YXRpYyB0b1N0cmluZyhtYXAsIGtleVZhbHVlRGVsaW1pdGVyID0gXCI9XCIsIGVudHJ5RGVsaW1pdGVyID0gXCImXCIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGxldCBmaXJzdCA9IHRydWU7XG4gICAgICAgIG1hcC5mb3JFYWNoKChrZXksIHZhbHVlLCBwYXJlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBlbnRyeURlbGltaXRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGxldCByZXNvbHZlZEtleSA9IGtleTtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZEtleS50b1N0cmluZykge1xuICAgICAgICAgICAgICAgIHJlc29sdmVkS2V5ID0gcmVzb2x2ZWRLZXkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHJlc29sdmVkVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZFZhbHVlLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmVkVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgcmVzb2x2ZWRLZXkgKyBrZXlWYWx1ZURlbGltaXRlciArIHJlc29sdmVkVmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgTnVtYmVyVXRpbHMge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIGlzIGEgbnVtYmVyXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBwYXJhbWV0ZXIgY29udGFpbnMgdmFsdWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBoYXNWYWx1ZSh2YWwpIHtcbiAgICAgICAgaWYodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QuanMnXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlci5qcyc7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJPYmplY3RNYXBwZXJcIik7XG5cbi8qKlxuICogTWFwcyBmaWVsZHMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdE1hcHBlciB7XG5cblxuICAgIC8qKlxuICAgICAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXG4gICAgICogXG4gICAgICogQHRlbXBsYXRlIFRbXVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHNvdXJjZSBcbiAgICAgKiBAcGFyYW0ge1R9IGRlc3RpbmF0aW9uIFxuICAgICAqIEByZXR1cm5zIFRbXVxuICAgICAqL1xuICAgIHN0YXRpYyBtYXBBbGwoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBbXTtcbiAgICAgICAgc291cmNlLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5wdXNoKHRoaXMubWFwKGVsZW1lbnQsIG5ldyBkZXN0aW5hdGlvbigpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBmaWVsZHMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXJcbiAgICAgKiBcbiAgICAgKiBAdGVtcGxhdGUgVFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzb3VyY2UgXG4gICAgICogQHBhcmFtIHtUfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcmV0dXJucyBUXG4gICAgICovXG4gICAgc3RhdGljIG1hcChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGlmKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBzb3VyY2Ugb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIExPRy5lcnJvcihcIk5vIGRlc3RpbmF0aW9uIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc291cmNlS2V5cyA9IG5ldyBMaXN0KE9iamVjdC5rZXlzKHNvdXJjZSkpO1xuXG4gICAgICAgIHNvdXJjZUtleXMuZm9yRWFjaChcbiAgICAgICAgICAgIChzb3VyY2VLZXkpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihkZXN0aW5hdGlvbltzb3VyY2VLZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKFwiVW5hYmxlIHRvIG1hcCBcIiArIHNvdXJjZUtleSArIFwiIGZyb21cIik7XG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJ0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgTE9HLmVycm9yKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJVbmFibGUgdG8gbWFwIG9iamVjdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltzb3VyY2VLZXldID0gc291cmNlW3NvdXJjZUtleV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LHRoaXNcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG5cbiAgICB9XG5cbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUFjY2Vzc29ye1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICovXG4gICAgc3RhdGljIGdldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXRoQXJyYXkgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcGF0aEFycmF5Lmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgICAgIGlmKGkgPT0gbi0xKXtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIGRlc3RpbmF0aW9uKSB8fCBkZXN0aW5hdGlvbltrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJleHBvcnQgY2xhc3MgU3RyaW5nVGVtcGxhdGUge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZVN0cmluZyBcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nVGVtcGxhdGV9XG4gICAgICovXG4gICAgc3RhdGljIGZyb20odGhlU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nVGVtcGxhdGUodGhlU3RyaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlU3RyaW5nIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRoZVN0cmluZykge1xuICAgICAgICB0aGlzLnRoZVN0cmluZyA9IHRoZVN0cmluZztcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnRoZVN0cmluZyA9IHRoaXMudGhlU3RyaW5nLnJlcGxhY2UoXCJ7XCIgKyBrZXkgKyBcIn1cIiwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlU3RyaW5nO1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBUaW1lUHJvbWlzZSB7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gcHJvbWlzZSB3aGljaCBleGVjdXRlcyB0aGUgcHJvbWlzZUZ1bmN0aW9uIHdpdGhpbiBnaXZlbiB0aW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvbWlzZUZ1bmN0aW9uIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXRpYyBhc1Byb21pc2UodGltZSwgcHJvbWlzZUZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9taXNlRnVuY3Rpb24uY2FsbCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUuY2FsbCgpO1xuICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ08sTUFBTSxXQUFXO0FBQ3hCO0FBQ0EsSUFBSSxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDN0IsUUFBUSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO0FBQ2hFLFlBQVksT0FBTyxJQUFJLENBQUM7QUFDeEIsU0FBUztBQUNULFFBQVEsS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRztBQUNuRSxZQUFZLE9BQU8sSUFBSSxDQUFDO0FBQ3hCLFNBQVM7QUFDVCxRQUFRLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElB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
