export class ObjectUtils {

    /**
     * Parses an object into a human-readable format.
     * @param {any} object 
     */
    static parseHumanReadable(object) {
        if (object === null) {
            return "";

        } else if (object === undefined) {
            return "";

        } else if (typeof object === "string" || typeof object === "number" || typeof object === "boolean") {
            return object.toString();

        } else if (Array.isArray(object)) {
            return `[${object.map(item => this.parseHumanReadable(item)).join("")}]`;

        } else if (typeof object === "object") {
            let entries = Object.entries(object).map(([key, value]) => {
                let hrKey = this.camelCaseToHumanReadable(key);
                return `${hrKey}: ${this.parseHumanReadable(value)}\n`;
            });
            return entries.join("");
        } else {
            return object.toString();
        }
    }

    static camelCaseToHumanReadable(text) {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }


}