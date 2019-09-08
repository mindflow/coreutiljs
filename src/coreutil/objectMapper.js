/* jshint esversion: 6 */

/**
 * Maps fields from one object to another
 */

import { List } from './list.js'
import { Logger } from './logger.js';

export class ObjectMapper {

    /**
     * 
     * @param {object} source 
     * @param {object} destination 
     */
    static map(source, destination) {
        if(source === undefined) {
            Logger.error("No source object");
        }
        if(destination === undefined) {
            Logger.error("No destination object");
        }
        var sourceKeys = new List(Object.keys(source));

        sourceKeys.forEach(
            (sourceKey) => {
                
                if(destination[sourceKey] === undefined) {
                    Logger.error("Unable to map " + sourceKey + " from");
                    Logger.error(source);
                    Logger.error("to");
                    Logger.error(destination);
                    throw "Unable to map object";
                }
                destination[sourceKey] = source[sourceKey];
                return true;
            },this
        );

        return destination;

    }

}