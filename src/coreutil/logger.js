/* jshint esversion: 6 */

export class Logger{

    /**
     * Disables debugging
     */
    static disableDebug() {
        Logger.debugEnabled = false;
    }

    /**
     * Enables debugging
     */
    static enableDebug() {
        Logger.debugEnabled = true;
    }

    /**
     * Logs the value to console
     * @param {string} value 
     */
    static log(value){
        console.log(value);
    }

    /**
     * Logs the value with indendentation
     * @param {number} depth 
     * @param {string} value 
     */
    static debug(depth, value){
        if(!Logger.debugEnabled){
            return;
        }
        let line = '';
        line = line + depth;
        for(let i = 0 ; i < depth ; i++){
            line = line + ' ';
        }
        line = line + value;
        console.log(line);
    }

    /**
     * Logs a warning to the console
     * @param {string} value 
     */
    static warn(value){
        console.warn(value);
    }

    /**
     * Logs the error to the console
     * @param {string} value 
     */
    static error(value){
        console.error(value);
    }

    /**
     * Prints a marker '+' in above the given position of the value
     * @param {string} value 
     * @param {number} position 
     */
    static showPos(value,position){
        if(!Logger.debugEnabled){
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
Logger.debugEanbled = false;
