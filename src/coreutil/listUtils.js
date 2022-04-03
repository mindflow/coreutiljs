import { List } from "./list.js";

export class ListUtils {

    /**
     * 
     * @param {List} list 
     */
    static reverse(list) {
        var reversed = new List();
        for(var i = list.size()-1; i >= 0; i--) {
            reversed.add(list.get(i));
        }
        return reversed;
    }

}