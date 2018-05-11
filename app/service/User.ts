import { Service } from 'egg';
import { Status, CommUtil, StatusCode } from '../utils';
/**
 * Country Service
 */
export default class User extends Service {
  body: any;
  //默认不需要提供构造函数。
  constructor(ctx) {
    super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
    this.body = ctx.request.body;
  }

  public async entry() {
    const { ctx } = this;
    const { country_code } = this.body;
    //return this.ctx.model.post.findAndCountAll();
    const resA = await ctx.model.Country.findCode({
      country_code: country_code
    });
    if (resA.length == 0) {
      return {
        ...Status(404, StatusCode.NO_DATE_IS_QUERY)
      }
    }
    this.body.random = CommUtil.randomnum(10000000, 99999999);
    this.body.country = resA[0].country;
    const resB = await this.check();
    console.log('res1',resB);
    if (resB.sqlstatus == 'Failed') {
      return {
        ...Status(404, resB.failure_reason)
      }
    }
    return this.insert();
  }

  public async check() {
    const { phonenum, receiveaddress, random, } = this.body;
    const res = await this.ctx.model.User.check({
      phonenum: phonenum,
      receiveaddress: receiveaddress,
      random: random
    });
    return res;
  }

  public async insert() {
    const { ctx } = this;
    const { phonenum, receiveaddress, random, country, country_code } = this.body;
    const res = await ctx.model.User.insert({
      phonenum: phonenum,
      receiveaddress: receiveaddress,
      random: random,
      country: country,
      countrycode: country_code
    })
    console.log("插入结果:",res);
    return {
      ...Status(200, '')
    }
  }

  public async showinfo(){
    const { ctx } = this;
    const { address } = this.body;
    const res =  await ctx.model.User.findinfo({
      address:address
    })
    if(res.sqlstatus == 'Failed'){
      return {
        ...Status(404,res.failure_reason),
        fields:[]  //没查到值就返回空数组
      }
    }
    console.log("查询结果:",res);
    return {
      ...Status(200, ''),
      fields:[res]
    }
  }

  public async sms(){
    //const { ctx } = this;
    // const { country_code,phonenum } = this.body;
    // const res =  await ctx.model.Sms.findinfo({
    //   address:address
    // })
    // if(res.sqlstatus == 'Failed'){
    //   return {
    //     ...Status(404,res.failure_reason),
    //     fields:[]  //没查到值就返回空数组
    //   }
    // }
    this.logger.warn("发送短信业务正在维护...");
    return {
      ...Status(200, '')
    }
  }
}

