import { Service } from 'egg';
import { Status, CommUtil } from '../utils';
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
    console.log('ctx', ctx.request.body)
    const res = await ctx.model.Country.findCode(country_code);
    console.log('res', res);
    if (res.length == 0) {
      return {
        ...Status(404)
      }
    }
    this.body.random = CommUtil.randomnum(0, 8);
    this.body.country = res[0].country;
    return this.insert();
  }

  public async insert() {
    const { ctx } = this;
    const {
      phonenum,
      receiveaddress,
      random,
      country,
      country_code
    } = this.body;
    const res1 = await ctx.model.User.insert({
      phonenum: phonenum,
      receiveaddress: receiveaddress,
      random:random,
      country:country,
      countrycode:country_code
    })
    console.log("插入结果:"+res1);
    return {
      ...Status(200)
    }
  }
}

