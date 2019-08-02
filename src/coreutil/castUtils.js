export class CastUtils {
    
    static castTo(classReference,object){
        return Object.assign(new classReference(),object);
    }
}