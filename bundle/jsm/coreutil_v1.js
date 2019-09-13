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

const FATAL = 1;
const ERROR = 2;
const WARN = 3;
const INFO = 4;
const DEBUG = 5;

const FATAL_LABEL = "FATAL";
const ERROR_LABEL = "ERROR";
const WARN_LABEL  = "WARN ";
const INFO_LABEL =  "INFO ";
const DEBUG_LABEL = "DEBUG";

let logLevel = INFO;

class Logger{

    constructor(logName) {
        this.logName = logName;
    }

    /**
     * Disables debugging
     */
    static setLevel(level) {
        logLevel = level;
    }

    /**
     * Logs the value to console
     * @param {string} value 
     */
    info(value, indentation = 0){
        Logger.log(value, this.logName, INFO, INFO_LABEL, (val) => { console.info(val); }, indentation);
    }

    /**
     * Logs a warning
     * @param {string} value 
     */
    warn(value, indentation = 0){
        Logger.log(value, this.logName, WARN, WARN_LABEL, (val) => { console.warn(val); }, indentation);
    }

    /**
     * Logs the debug
     * @param {string} value 
     */
    debug(value, indentation = 0){
        Logger.log(value, this.logName, DEBUG, DEBUG_LABEL, (val) => { console.debug(val); }, indentation);
    }

    /**
     * Logs the error
     * @param {string} value 
     */
    error(value, indentation = 0) {
        Logger.log(value, this.logName, ERROR, ERROR_LABEL, (val) => { console.error(val); }, indentation);
    }

    /**
     * Logs the fatal
     * @param {string} value 
     */
    fatal(value, indentation = 0) {
        Logger.log(value, this.logName, FATAL, FATAL_LABEL, (val) => { console.fatal(val); }, indentation);
    }

    static log(value, logName, level, levelLabel, func, indentation) {
        if(logLevel < level) {
            return;
        }
        let dateTime= new Date().toISOString();
        func(levelLabel + " " + dateTime + " " + logName + " " + Logger.indent(indentation, value));
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
        if(logLevel < DEBUG){
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

const LOG = new Logger("ObjectMapper");

class ObjectMapper {

    /**
     * 
     * @param {object} source 
     * @param {object} destination 
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

export { BooleanUtils, CastUtils, List, Logger, Map, NumberUtils, ObjectFunction, ObjectMapper, PropertyAccessor, StringUtils };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9ib29sZWFuVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvY2FzdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xpc3QuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbG9nZ2VyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL21hcC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9udW1iZXJVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RGdW5jdGlvbi5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RNYXBwZXIuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvcHJvcGVydHlBY2Nlc3Nvci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9vbGVhblV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciBib29sZWFuIHR5cGVcclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBib29sZWFuIGhhcyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaXMgYm9vbGVhbiBpcyB0cnVlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNUcnVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBpcyBmYWxzZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzRmFsc2UodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENhc3RVdGlscyB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBjYXN0VG8oY2xhc3NSZWZlcmVuY2Usb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgY2xhc3NSZWZlcmVuY2UoKSxvYmplY3QpO1xyXG4gICAgfVxyXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG4vKipcbiAqIEdlbmVyaWMgTGlzdCBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheSBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmcm9tRnVuY3Rpb24gZnJvbSBtZXRob2Qgb2YgZW50cnkgdHlwZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShhcnJheSwgZnJvbUZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZyb21GdW5jdGlvbiA/IGZyb21GdW5jdGlvbihhcnJheVtrZXldKSA6IGFycmF5W2tleV07XG4gICAgICAgICAgICBsaXN0LmFkZChmcm9tRnVuY3Rpb24odmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QgYW5kIG9wdGlvbmFsbHkgYXNzaWduIGV4aXN0aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlcykge1xuICAgICAgICBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB2YWx1ZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChpbmRleCx2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3RbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBsYXN0IGVudHJ5XG4gICAgICogXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldExhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldExhc3QodmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdmFsdWUgdG8gZW5kIG9mIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgXG4gICAgICovXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNpemUgb2YgdGhlIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIG9uIGluZGV4IGlzIGVxdWFsIHRvIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWVBdEVxdWFscyhpbmRleCx2YWwpIHtcbiAgICAgICAgaWYodGhpcy5nZXQoaW5kZXgpICE9PSBudWxsICYmIHRoaXMuZ2V0KGluZGV4KSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCkgPT09IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZmlyc3RWYWx1ZUVxdWFscyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBdEVxdWFscygwLHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IHZhbCBvZiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcih2YWwscGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBlbnRyaWVzIGZyb20gcHJvdmlkZWQgbGlzdFxuICAgICAqIEBwYXJhbSB7TGlzdH0gc291cmNlTGlzdCBcbiAgICAgKi9cbiAgICBhZGRBbGwoc291cmNlTGlzdCl7XG4gICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG59XG4iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmNvbnN0IEZBVEFMID0gMTtcbmNvbnN0IEVSUk9SID0gMjtcbmNvbnN0IFdBUk4gPSAzO1xuY29uc3QgSU5GTyA9IDQ7XG5jb25zdCBERUJVRyA9IDU7XG5cbmNvbnN0IEZBVEFMX0xBQkVMID0gXCJGQVRBTFwiO1xuY29uc3QgRVJST1JfTEFCRUwgPSBcIkVSUk9SXCI7XG5jb25zdCBXQVJOX0xBQkVMICA9IFwiV0FSTiBcIjtcbmNvbnN0IElORk9fTEFCRUwgPSAgXCJJTkZPIFwiO1xuY29uc3QgREVCVUdfTEFCRUwgPSBcIkRFQlVHXCI7XG5cbmxldCBsb2dMZXZlbCA9IElORk87XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXJ7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2dOYW1lKSB7XG4gICAgICAgIHRoaXMubG9nTmFtZSA9IGxvZ05hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgZGVidWdnaW5nXG4gICAgICovXG4gICAgc3RhdGljIHNldExldmVsKGxldmVsKSB7XG4gICAgICAgIGxvZ0xldmVsID0gbGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgdmFsdWUgdG8gY29uc29sZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBpbmZvKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIElORk8sIElORk9fTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5pbmZvKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHdhcm4odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgV0FSTiwgV0FSTl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLndhcm4odmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZGVidWdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZGVidWcodmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgREVCVUcsIERFQlVHX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuZGVidWcodmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZXJyb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZXJyb3IodmFsdWUsIGluZGVudGF0aW9uID0gMCkge1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIEVSUk9SLCBFUlJPUl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmVycm9yKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGZhdGFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGZhdGFsKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBGQVRBTCwgRkFUQUxfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5mYXRhbCh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKHZhbHVlLCBsb2dOYW1lLCBsZXZlbCwgbGV2ZWxMYWJlbCwgZnVuYywgaW5kZW50YXRpb24pIHtcbiAgICAgICAgaWYobG9nTGV2ZWwgPCBsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRlVGltZT0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCIgXCIgKyBMb2dnZXIuaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGVudCB0aGUgbG9nIGVudHJ5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZW50KGluZGVudGF0aW9uLCB2YWx1ZSl7XG4gICAgICAgIGlmKGluZGVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmUgPSAnJztcbiAgICAgICAgbGluZSA9IGxpbmUgKyBpbmRlbnRhdGlvbjtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBpbmRlbnRhdGlvbiA7IGkrKyl7XG4gICAgICAgICAgICBsaW5lID0gbGluZSArICcgJztcbiAgICAgICAgfVxuICAgICAgICBsaW5lID0gbGluZSArIHZhbHVlO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByaW50cyBhIG1hcmtlciAnKycgaW4gYWJvdmUgdGhlIGdpdmVuIHBvc2l0aW9uIG9mIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb24gXG4gICAgICovXG4gICAgc2hvd1Bvcyh2YWx1ZSxwb3NpdGlvbil7XG4gICAgICAgIGlmKGxvZ0xldmVsIDwgREVCVUcpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJzb3JMaW5lID0gJyc7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdmFsdWUubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpID09IHBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcrJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGN1cnNvckxpbmUgPSBjdXJzb3JMaW5lICsgJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnNvckxpbmUpO1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnNvckxpbmUpO1xuXG4gICAgfVxuXG59XG4iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmV4cG9ydCBjbGFzcyBNYXAge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFwID0ge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2l6ZSBvZiB0aGUgbWFwXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXApLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvYmplY3QgYXQgZ2l2ZW4ga2V5XG4gICAgICogQHBhcmFtIHthbnl9IG5hbWUgXG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwW25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgYXQga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgXG4gICAgICovXG4gICAgc2V0KGtleSx2YWx1ZSkge1xuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBrZXkgZXhpc3RzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjb250YWlucyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhpc3RzKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGV4aXN0cyhrZXkpe1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMubWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBtYXAgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgICAqIHdpdGggdGhlIGtleSwgdmFsdWUgYW5kIHBhcmVudCBhcyBjYWxsYmFjayBwYXJhbXRlcnMgd2hpbGUgdGhlXG4gICAgICogY2FsbGVkIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvciB0aGUgbGlzdCBpcyBmdWxseSBpdGVyYXRlZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnQgXG4gICAgICovXG4gICAgZm9yRWFjaChsaXN0ZW5lcixwYXJlbnQpIHtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcihrZXksdGhpcy5tYXBba2V5XSxwYXJlbnQpKXtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGVudHJpZXMgZnJvbSBwcm92aWRlZCBtYXBcbiAgICAgKiBAcGFyYW0ge01hcH0gc291cmNlTWFwIFxuICAgICAqL1xuICAgIGFkZEFsbChzb3VyY2VNYXApe1xuICAgICAgICBzb3VyY2VNYXAuZm9yRWFjaChmdW5jdGlvbihrZXksdmFsdWUscGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuc2V0KGtleSx2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBOdW1iZXJVdGlscyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdmFsdWUgaXMgYSBudW1iZXJcclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc051bWJlcih2YWwpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBwYXJhbWV0ZXIgY29udGFpbnMgdmFsdWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG4vKipcbiAqIFdyYXBwZXIgZm9yIGFuIG9iamVjdCBhbmQgYSBmdW5jdGlvbiB3aXRoaW4gdGhhdCBvYmplY3QuXG4gKiBBbGxvd3MgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBvYmplY3QgYXMgaXQncyBmaXJzdCBwYXJhbXRlclxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0RnVuY3Rpb257XG5cbiAgICAvKipcbiAgICAgKiBDb250cnVjdG9yXG4gICAgICogQHBhcmFtIHthbnl9IHRoZU9iamVjdCBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0aGVGdW5jdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0aGVPYmplY3QsdGhlRnVuY3Rpb24pe1xuICAgICAgICB0aGlzLm9iamVjdCA9IHRoZU9iamVjdDtcbiAgICAgICAgdGhpcy5mdW5jdGlvbiA9IHRoZUZ1bmN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBnZXRPYmplY3QoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgZ2V0RnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIGZ1bmN0aW9uIGFuZCBwYXNzZWQgdGhlIG9iamVjdCBhcyBmaXJzdCBwYXJhbWV0ZXIsIGFuZCB0aGUgcHJvdmlkZWQgcGFyYW10ZXIgYXMgdGhlIHNlY29uZCBwYXJhbXRlclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbXMgXG4gICAgICovXG4gICAgY2FsbChwYXJhbXMpe1xuICAgICAgICB0aGlzLmZ1bmN0aW9uLmNhbGwodGhpcy5vYmplY3QscGFyYW1zKTtcbiAgICB9XG5cbn1cbiIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuXHJcbi8qKlxyXG4gKiBNYXBzIGZpZWxkcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlclxyXG4gKi9cclxuXHJcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QuanMnXHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyLmpzJztcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJPYmplY3RNYXBwZXJcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0TWFwcGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNvdXJjZSBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0aW5hdGlvbiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG1hcChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgaWYoc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgTE9HLmVycm9yKFwiTm8gc291cmNlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBkZXN0aW5hdGlvbiBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzb3VyY2VLZXlzID0gbmV3IExpc3QoT2JqZWN0LmtleXMoc291cmNlKSk7XHJcblxyXG4gICAgICAgIHNvdXJjZUtleXMuZm9yRWFjaChcclxuICAgICAgICAgICAgKHNvdXJjZUtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihkZXN0aW5hdGlvbltzb3VyY2VLZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJVbmFibGUgdG8gbWFwIFwiICsgc291cmNlS2V5ICsgXCIgZnJvbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3Ioc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoXCJ0b1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBMT0cuZXJyb3IoZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiVW5hYmxlIHRvIG1hcCBvYmplY3RcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW3NvdXJjZUtleV0gPSBzb3VyY2Vbc291cmNlS2V5XTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LHRoaXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XHJcblxyXG4gICAgfVxyXG5cclxufSIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5QWNjZXNzb3J7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VmFsdWUoZGVzdGluYXRpb24sIG5hbWUpIHtcbiAgICAgICAgdmFyIHBhdGhBcnJheSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYXRoQXJyYXkubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKGtleSBpbiBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25ba2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRWYWx1ZShkZXN0aW5hdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHBhdGhBcnJheSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwYXRoQXJyYXkubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W2ldO1xuICAgICAgICAgICAgaWYoaSA9PSBuLTEpe1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gZGVzdGluYXRpb24pIHx8IGRlc3RpbmF0aW9uW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxuZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxze1xuXG4gICAgc3RhdGljIGlzSW5BbHBoYWJldCh2YWwpIHtcbiAgICAgICAgaWYgKHZhbC5jaGFyQ29kZUF0KDApID49IDY1ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDkwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbC5jaGFyQ29kZUF0KDApID49IDk3ICYmIHZhbC5jaGFyQ29kZUF0KDApIDw9IDEyMiApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gNDggJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gNTcgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzU3RyaW5nKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNCbGFuayh2YWwpIHtcbiAgICAgICAgaWYoIVN0cmluZ1V0aWxzLmhhc1ZhbHVlKHZhbCkgfHwgdmFsID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xuICAgICAgICBpZih2YWwgPT0hIG51bGwgJiYgdmFsID09ISB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQU8sTUFBTSxZQUFZLENBQUM7Ozs7Ozs7SUFPdEIsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDO0tBQ25DOzs7Ozs7O0lBT0QsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFO1FBQ2pCLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJ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
