export class MacUtils {

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