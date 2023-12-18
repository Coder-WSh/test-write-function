//用于深拷贝的函数，并附带注释
// 函数deepCopy，用于深拷贝对象
function deepCopy(obj: any): any {
    // 如果传入的参数为null或者不是对象，则直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // 如果传入的参数是日期，则返回新的日期对象
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    // 如果传入的参数是正则表达式，则返回新的正则表达式对象
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    // 如果传入的参数是数组，则遍历数组，对每一项进行深拷贝，返回新的数组
    if (obj instanceof Array) {
        let copy: any[] = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }
    // 如果传入的参数是对象，则遍历对象，对每一项进行深拷贝，返回新的对象
    if (obj instanceof Object) {
        let copy: any = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(obj[attr]);
            }
        }
        return copy;
    }
    // 如果传入的参数不是日期、正则表达式、数组、对象，则抛出错误
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
