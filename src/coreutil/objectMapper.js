import { List } from './list.js'
import { Logger } from './logger.js';

const LOG = new Logger("ObjectMapper");

/**
 * Maps fields from one object to another
 */
export class ObjectMapper {


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
        const sourceKeys = new List(Object.keys(source));

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