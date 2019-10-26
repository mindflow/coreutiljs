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
        /** @type {array} */
        this.list = null;
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
     * Remove element from list
     * 
     * @param {object} value 
     */
    remove(value) {
        this.list = this.list.filter(function(entry){
            return entry != value;
        });
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
     * Checks if value exists
     * @param {any} val 
     * @returns {boolean}
     */
    contains(value) {
        return this.getArray().includes(value);
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

    /**
     * Gets the underlying array
     * 
     * @returns {array}
     */
    getArray() {
        return this.list;
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

        if(typeof value === "object") {
            func(levelLabel + " " + dateTime + " " + logName + ":");
            func(value);
            return;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXV0aWxfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JldXRpbC9ib29sZWFuVXRpbHMuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvY2FzdFV0aWxzLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL2xpc3QuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvbG9nZ2VyLmpzIiwiLi4vLi4vc3JjL2NvcmV1dGlsL21hcC5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9udW1iZXJVdGlscy5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RGdW5jdGlvbi5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9vYmplY3RNYXBwZXIuanMiLCIuLi8uLi9zcmMvY29yZXV0aWwvcHJvcGVydHlBY2Nlc3Nvci5qcyIsIi4uLy4uL3NyYy9jb3JldXRpbC9zdHJpbmdVdGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9vbGVhblV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciBib29sZWFuIHR5cGVcclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQm9vbGVhbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBib29sZWFuIGhhcyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhhc1ZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaXMgYm9vbGVhbiBpcyB0cnVlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNUcnVlKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgYm9vbGVhbiBpcyBmYWxzZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzRmFsc2UodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENhc3RVdGlscyB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBjYXN0VG8oY2xhc3NSZWZlcmVuY2Usb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgY2xhc3NSZWZlcmVuY2UoKSxvYmplY3QpO1xyXG4gICAgfVxyXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG4vKipcbiAqIEdlbmVyaWMgTGlzdCBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheSBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmcm9tRnVuY3Rpb24gZnJvbSBtZXRob2Qgb2YgZW50cnkgdHlwZSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbShhcnJheSwgZnJvbUZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZyb21GdW5jdGlvbiA/IGZyb21GdW5jdGlvbihhcnJheVtrZXldKSA6IGFycmF5W2tleV07XG4gICAgICAgICAgICBsaXN0LmFkZChmcm9tRnVuY3Rpb24odmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QgYW5kIG9wdGlvbmFsbHkgYXNzaWduIGV4aXN0aW5nIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlcykge1xuICAgICAgICAvKiogQHR5cGUge2FycmF5fSAqL1xuICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xuICAgICAgICBpZih2YWx1ZXMgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB2YWx1ZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWUgb2YgcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W2luZGV4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmFsdWUgb24gcG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChpbmRleCx2YWx1ZSkge1xuICAgICAgICB0aGlzLmxpc3RbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZSBvZiBsYXN0IGVudHJ5XG4gICAgICogXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGdldExhc3QoKSB7XG4gICAgICAgIGlmKHRoaXMubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZhbHVlIG9uIHBvc2l0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldExhc3QodmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdmFsdWUgdG8gZW5kIG9mIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgXG4gICAgICovXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZWxlbWVudCBmcm9tIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWUgXG4gICAgICovXG4gICAgcmVtb3ZlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5maWx0ZXIoZnVuY3Rpb24oZW50cnkpe1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICE9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNpemUgb2YgdGhlIGxpc3RcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIG9uIGluZGV4IGlzIGVxdWFsIHRvIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWVBdEVxdWFscyhpbmRleCx2YWwpIHtcbiAgICAgICAgaWYodGhpcy5nZXQoaW5kZXgpICE9PSBudWxsICYmIHRoaXMuZ2V0KGluZGV4KSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCkgPT09IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHZhbHVlIGV4aXN0c1xuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXkoKS5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpcnN0IHZhbHVlIGlzIGVxdWFsIHRvIHBhcmFtZXRlclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWwgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZmlyc3RWYWx1ZUVxdWFscyh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVBdEVxdWFscygwLHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9vcHMgb3ZlciBhbGwgdmFsdWVzIGluIHRoZSBsaXN0IGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgKiB3aXRoIHRoZSBrZXksIHZhbHVlIGFuZCBwYXJlbnQgYXMgY2FsbGJhY2sgcGFyYW10ZXJzIHdoaWxlIHRoZVxuICAgICAqIGNhbGxlZCBmdW5jdGlvbiByZXR1cm5zIHRydWUgb3IgdGhlIGxpc3QgaXMgZnVsbHkgaXRlcmF0ZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnRcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IHZhbCBvZiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGlmKCFsaXN0ZW5lcih2YWwscGFyZW50KSl7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFsbCBlbnRyaWVzIGZyb20gcHJvdmlkZWQgbGlzdFxuICAgICAqIEBwYXJhbSB7TGlzdH0gc291cmNlTGlzdCBcbiAgICAgKi9cbiAgICBhZGRBbGwoc291cmNlTGlzdCl7XG4gICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdW5kZXJseWluZyBhcnJheVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHthcnJheX1cbiAgICAgKi9cbiAgICBnZXRBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgICB9XG59XG4iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmNvbnN0IEZBVEFMID0gMTtcbmNvbnN0IEVSUk9SID0gMjtcbmNvbnN0IFdBUk4gPSAzO1xuY29uc3QgSU5GTyA9IDQ7XG5jb25zdCBERUJVRyA9IDU7XG5cbmNvbnN0IEZBVEFMX0xBQkVMID0gXCJGQVRBTFwiO1xuY29uc3QgRVJST1JfTEFCRUwgPSBcIkVSUk9SXCI7XG5jb25zdCBXQVJOX0xBQkVMICA9IFwiV0FSTiBcIjtcbmNvbnN0IElORk9fTEFCRUwgPSAgXCJJTkZPIFwiO1xuY29uc3QgREVCVUdfTEFCRUwgPSBcIkRFQlVHXCI7XG5cbmxldCBsb2dMZXZlbCA9IElORk87XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXJ7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2dOYW1lKSB7XG4gICAgICAgIHRoaXMubG9nTmFtZSA9IGxvZ05hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgZGVidWdnaW5nXG4gICAgICovXG4gICAgc3RhdGljIHNldExldmVsKGxldmVsKSB7XG4gICAgICAgIGxvZ0xldmVsID0gbGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgdmFsdWUgdG8gY29uc29sZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBpbmZvKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApe1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIElORk8sIElORk9fTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5pbmZvKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIHdhcm4odmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgV0FSTiwgV0FSTl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLndhcm4odmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZGVidWdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZGVidWcodmFsdWUsIGluZGVudGF0aW9uID0gMCl7XG4gICAgICAgIExvZ2dlci5sb2codmFsdWUsIHRoaXMubG9nTmFtZSwgREVCVUcsIERFQlVHX0xBQkVMLCAodmFsKSA9PiB7IGNvbnNvbGUuZGVidWcodmFsKSB9LCBpbmRlbnRhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgZXJyb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgZXJyb3IodmFsdWUsIGluZGVudGF0aW9uID0gMCkge1xuICAgICAgICBMb2dnZXIubG9nKHZhbHVlLCB0aGlzLmxvZ05hbWUsIEVSUk9SLCBFUlJPUl9MQUJFTCwgKHZhbCkgPT4geyBjb25zb2xlLmVycm9yKHZhbCkgfSwgaW5kZW50YXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIGZhdGFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGZhdGFsKHZhbHVlLCBpbmRlbnRhdGlvbiA9IDApIHtcbiAgICAgICAgTG9nZ2VyLmxvZyh2YWx1ZSwgdGhpcy5sb2dOYW1lLCBGQVRBTCwgRkFUQUxfTEFCRUwsICh2YWwpID0+IHsgY29uc29sZS5mYXRhbCh2YWwpIH0sIGluZGVudGF0aW9uKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKHZhbHVlLCBsb2dOYW1lLCBsZXZlbCwgbGV2ZWxMYWJlbCwgZnVuYywgaW5kZW50YXRpb24pIHtcbiAgICAgICAgaWYobG9nTGV2ZWwgPCBsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGVUaW1lPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBmdW5jKGxldmVsTGFiZWwgKyBcIiBcIiArIGRhdGVUaW1lICsgXCIgXCIgKyBsb2dOYW1lICsgXCI6XCIpO1xuICAgICAgICAgICAgZnVuYyh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuYyhsZXZlbExhYmVsICsgXCIgXCIgKyBkYXRlVGltZSArIFwiIFwiICsgbG9nTmFtZSArIFwiIFwiICsgTG9nZ2VyLmluZGVudChpbmRlbnRhdGlvbiwgdmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRlbnQgdGhlIGxvZyBlbnRyeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIGluZGVudChpbmRlbnRhdGlvbiwgdmFsdWUpe1xuICAgICAgICBpZihpbmRlbnRhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsaW5lID0gJyc7XG4gICAgICAgIGxpbmUgPSBsaW5lICsgaW5kZW50YXRpb247XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgaW5kZW50YXRpb24gOyBpKyspe1xuICAgICAgICAgICAgbGluZSA9IGxpbmUgKyAnICc7XG4gICAgICAgIH1cbiAgICAgICAgbGluZSA9IGxpbmUgKyB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcmludHMgYSBtYXJrZXIgJysnIGluIGFib3ZlIHRoZSBnaXZlbiBwb3NpdGlvbiBvZiB0aGUgdmFsdWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uIFxuICAgICAqL1xuICAgIHNob3dQb3ModmFsdWUscG9zaXRpb24pe1xuICAgICAgICBpZihsb2dMZXZlbCA8IERFQlVHKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3Vyc29yTGluZSA9ICcnO1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHZhbHVlLmxlbmd0aCA7IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PSBwb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGluZSA9IGN1cnNvckxpbmUgKyAnKyc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjdXJzb3JMaW5lID0gY3Vyc29yTGluZSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3JMaW5lKTtcblxuICAgIH1cblxufVxuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgTWFwIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1hcCA9IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNpemUgb2YgdGhlIG1hcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubWFwKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb2JqZWN0IGF0IGdpdmVuIGtleVxuICAgICAqIEBwYXJhbSB7YW55fSBuYW1lIFxuICAgICAqL1xuICAgIGdldChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFtuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIGF0IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIHNldChrZXksdmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXBba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZW50cnkgZnJvbSBtYXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqL1xuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMubWFwW2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGtleSBleGlzdHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5leGlzdHMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYga2V5IGV4aXN0c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhpc3RzKGtleSl7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5tYXApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29wcyBvdmVyIGFsbCB2YWx1ZXMgaW4gdGhlIG1hcCBhbmQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uXG4gICAgICogd2l0aCB0aGUga2V5LCB2YWx1ZSBhbmQgcGFyZW50IGFzIGNhbGxiYWNrIHBhcmFtdGVycyB3aGlsZSB0aGVcbiAgICAgKiBjYWxsZWQgZnVuY3Rpb24gcmV0dXJucyB0cnVlIG9yIHRoZSBsaXN0IGlzIGZ1bGx5IGl0ZXJhdGVkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmVudCBcbiAgICAgKi9cbiAgICBmb3JFYWNoKGxpc3RlbmVyLHBhcmVudCkge1xuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYoIWxpc3RlbmVyKGtleSx0aGlzLm1hcFtrZXldLHBhcmVudCkpe1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbGwgZW50cmllcyBmcm9tIHByb3ZpZGVkIG1hcFxuICAgICAqIEBwYXJhbSB7TWFwfSBzb3VyY2VNYXAgXG4gICAgICovXG4gICAgYWRkQWxsKHNvdXJjZU1hcCl7XG4gICAgICAgIHNvdXJjZU1hcC5mb3JFYWNoKGZ1bmN0aW9uKGtleSx2YWx1ZSxwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXQoa2V5LHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LHRoaXMpO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB2YWx1ZSBpcyBhIG51bWJlclxyXG4gICAgICogQHBhcmFtIHthbnl9IHZhbCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHBhcmFtZXRlciBjb250YWlucyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XHJcbiAgICAgICAgaWYodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbi8qKlxuICogV3JhcHBlciBmb3IgYW4gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHdpdGhpbiB0aGF0IG9iamVjdC5cbiAqIEFsbG93cyB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIG9iamVjdCBhcyBpdCdzIGZpcnN0IHBhcmFtdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RGdW5jdGlvbntcblxuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3JcbiAgICAgKiBAcGFyYW0ge2FueX0gdGhlT2JqZWN0IFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRoZUZ1bmN0aW9uIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRoZU9iamVjdCx0aGVGdW5jdGlvbil7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gdGhlT2JqZWN0O1xuICAgICAgICB0aGlzLmZ1bmN0aW9uID0gdGhlRnVuY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldE9iamVjdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBnZXRGdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5mdW5jdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgZnVuY3Rpb24gYW5kIHBhc3NlZCB0aGUgb2JqZWN0IGFzIGZpcnN0IHBhcmFtZXRlciwgYW5kIHRoZSBwcm92aWRlZCBwYXJhbXRlciBhcyB0aGUgc2Vjb25kIHBhcmFtdGVyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtcyBcbiAgICAgKi9cbiAgICBjYWxsKHBhcmFtcyl7XG4gICAgICAgIHRoaXMuZnVuY3Rpb24uY2FsbCh0aGlzLm9iamVjdCxwYXJhbXMpO1xuICAgIH1cblxufVxuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xyXG5cclxuLyoqXHJcbiAqIE1hcHMgZmllbGRzIGZyb20gb25lIG9iamVjdCB0byBhbm90aGVyXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdC5qcydcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuanMnO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIk9iamVjdE1hcHBlclwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RNYXBwZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc291cmNlIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRlc3RpbmF0aW9uIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbWFwKHNvdXJjZSwgZGVzdGluYXRpb24pIHtcclxuICAgICAgICBpZihzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBMT0cuZXJyb3IoXCJObyBzb3VyY2Ugb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkZXN0aW5hdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIExPRy5lcnJvcihcIk5vIGRlc3RpbmF0aW9uIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNvdXJjZUtleXMgPSBuZXcgTGlzdChPYmplY3Qua2V5cyhzb3VyY2UpKTtcclxuXHJcbiAgICAgICAgc291cmNlS2V5cy5mb3JFYWNoKFxyXG4gICAgICAgICAgICAoc291cmNlS2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGRlc3RpbmF0aW9uW3NvdXJjZUtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihcIlVuYWJsZSB0byBtYXAgXCIgKyBzb3VyY2VLZXkgKyBcIiBmcm9tXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihcInRvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIExPRy5lcnJvcihkZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJVbmFibGUgdG8gbWFwIG9iamVjdFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bc291cmNlS2V5XSA9IHNvdXJjZVtzb3VyY2VLZXldO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0sdGhpc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlBY2Nlc3NvcntcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRWYWx1ZShkZXN0aW5hdGlvbiwgbmFtZSkge1xuICAgICAgICB2YXIgcGF0aEFycmF5ID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhdGhBcnJheS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoa2V5IGluIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbltrZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgXG4gICAgICovXG4gICAgc3RhdGljIHNldFZhbHVlKGRlc3RpbmF0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgcGF0aEFycmF5ID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhdGhBcnJheS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbaV07XG4gICAgICAgICAgICBpZihpID09IG4tMSl7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKGtleSBpbiBkZXN0aW5hdGlvbikgfHwgZGVzdGluYXRpb25ba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nVXRpbHN7XG5cbiAgICBzdGF0aWMgaXNJbkFscGhhYmV0KHZhbCkge1xuICAgICAgICBpZiAodmFsLmNoYXJDb2RlQXQoMCkgPj0gNjUgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gOTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdmFsLmNoYXJDb2RlQXQoMCkgPj0gOTcgJiYgdmFsLmNoYXJDb2RlQXQoMCkgPD0gMTIyICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB2YWwuY2hhckNvZGVBdCgwKSA+PSA0OCAmJiB2YWwuY2hhckNvZGVBdCgwKSA8PSA1NyApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNTdHJpbmcodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0JsYW5rKHZhbCkge1xuICAgICAgICBpZighU3RyaW5nVXRpbHMuaGFzVmFsdWUodmFsKSB8fCB2YWwgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzVmFsdWUodmFsKSB7XG4gICAgICAgIGlmKHZhbCA9PSEgbnVsbCAmJiB2YWwgPT0hIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBTyxNQUFNLFlBQVksQ0FBQzs7Ozs7OztJQU90QixPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDbEIsT0FBTyxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7S0FDbkM7Ozs7Ozs7SUFPRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDakIsR0FBRyxH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
