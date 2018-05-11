
let commUtil : any = {};

/**
 * 获取随机数
 * @param min 最小位数
 * @param max 最大位数
 */
commUtil.randomnum = (min:number,max:number):string =>{
    var num=Math.floor(min+Math.random()*(max-min));
    return String(num);
}

export default commUtil;