export class MacUtils {

    /**
     * 
     * @param {Number} mac 
     * @returns {String}
     */
    static toMacAddress(mac) {
        let macAddress = "";
        for (let i = 5; i >= 0; i--) {
            const byte = (mac >> (i * 8)) & 0xFF;
            macAddress += (i < 5 ? ":" : "") + ("0" + byte.toString(16)).slice(-2);
        }
        return macAddress;
    }
}