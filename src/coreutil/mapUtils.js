import { Map } from "./map.js";

export class MapUtils {

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