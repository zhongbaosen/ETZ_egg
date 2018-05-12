
let commUtil: any = {};

/**
 * 获取范围内的随机数
 * @param min 最小范围值
 * @param max 最大范围值
 */
commUtil.randomnum = (min: number, max: number): string => {
    var num = Math.floor(min + Math.random() * (max - min));
    return String(num);
}

/**
 * 取两数相差秒数
 * @param time2
 * @param time1
 */
commUtil.timeSecond = (time2 :string, time1:string) => {
    let date1:any = new Date(time1);
    let date2:any = new Date(time2);
    var time = (date2 - date1) / 1000;
    return time;
}

export default commUtil;