export class ArrayUtils {
    static removeChild<T>(array: Array<T>, child:T) {
        const index = array.indexOf(child);
        array.splice(index, 1);
    }
}

