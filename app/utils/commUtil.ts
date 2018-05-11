
let commUtil : any = {};

/**
 * 获取范围内的随机数
 * @param min 最小范围值
 * @param max 最大范围值
 */
commUtil.randomnum = (min:number,max:number):string =>{
    var num=Math.floor(min+Math.random()*(max-min));
    return String(num);
}

export default commUtil;