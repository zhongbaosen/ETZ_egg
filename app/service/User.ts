import { Service } from 'egg';
import { Status, CommUtil, StatusCode, SMSClient, Moment } from '../utils';
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
    console.log('res1', resB);
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
    console.log("插入结果:", res);
    return {
      ...Status(200, '')
    }
  }

  public async showinfo() {
    const { ctx } = this;
    const { address } = this.body;
    const res = await ctx.model.User.findinfo({
      address: address
    })
    if (res.sqlstatus == 'Failed') {
      return {
        ...Status(404, res.failure_reason),
        fields: []  //没查到值就返回空数组
      }
    }
    console.log("查询结果:", res);
    return {
      ...Status(200, ''),
      fields: [res]
    }
  }

  public async sms() {
    const { ctx } = this;
    const { phonenum, country_code } = this.body;
    this.logger.info('config', this.config.alisms);
    const smsnum = 60;  //每个手机号的间隔时间
    const conf = this.config.alisms;
    let error: any;
    let smsClient = new SMSClient({  //初始化sms_client
      accessKeyId: conf.AccessKeyID,
      secretAccessKey: conf.AccessKeySecret
    })
    const randomCode = CommUtil.randomnum(100000, 999999);
    const resA = await ctx.model.Sms.check({
      phonenum: phonenum,
      country_code: country_code,
      status: '发送短信成功'
    })
    if (resA.sqlstatus == 'Success') {
      var differ = await CommUtil.timeSecond(Moment().format('YYYY-MM-DD HH:mm:ss'), resA.fields.enter_time);
      console.log("相差秒数:", differ);
      if (differ < smsnum) {
        const leavenum = smsnum - differ;
        return {
          ...Status(404, `${StatusCode.SMS_IS_OFTEN},请${leavenum}秒后重试`)
        }
      }
    }
    try {
      var res = await smsClient.sendSMS({   //发送短信
        PhoneNumbers: `00${country_code}${phonenum}`,
        SignName: conf.SignName,
        TemplateCode: conf.TemplateCode.GET_SMS_CODE[0],
        TemplateParam: `{"code":${randomCode}}`
      })
    } catch (err) {
      console.log("捕获错误", err.data.Message);
      error = err;
      res = null;
    }



    //成功发送成功后插入一条记录
    if (res && res.Code == 'OK') {
      const resC = await ctx.model.Sms.insert({
        phonenum: phonenum,
        country_code: country_code,
        random: randomCode,
        type: conf.TemplateCode.GET_SMS_CODE[1],
        status: '发送短信成功',
        bizid: res.BizId,
        remark: JSON.stringify(res)
      })
      console.log("发送短信成功插入返回结果", resC);


      return {
        ...Status(200, '')
      }
    }

    if (!res) {
      try{
        const resB = await ctx.model.Sms.insert({
          phonenum: phonenum,
          country_code: country_code,
          random: randomCode,
          status: '发送短信失败',
          remark: error.data
        })
        console.log(resB);
      }catch(err){
        // let reserr = (err.message).replace(/Invalid value /g, "").split(" ").join("");
        // this.logger.warn('YOY',reserr.Message);
        // this.logger.warn('SOS',err.message);
        return {
          ...Status(404, error.data.Message)
        };
      }

     // console.log("发送短信失败插入返回结果", resB);
      return {
        ...Status(404, error.data.Message)
      };

    }
  }
}

