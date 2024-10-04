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
     * @param {T[]} destination 
     * @returns T[]
     */
    static mapAll(source, destination) {
        let response = [];
        source.forEach(element => {
            response.push(this.map(element, destination));
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