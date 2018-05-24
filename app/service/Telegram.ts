import { Service } from 'egg';
import { CommUtil, Status, StatusCode } from '../utils';
export default class Telegram extends Service {
  body: any;
  constructor(ctx) {
    super(ctx); //如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
    this.body = ctx.request.body;
  }

  /**
   * 处理telegram的事件
   * @param body 
   */
  public async entry(body, t) {
    const { ctx } = this;
    const text = (body.message.text).replace("/", '');
    let atname = '';
    const { first_name, last_name, username } = body.message.chat;
    first_name ? atname = first_name + " " + last_name : null
    last_name ? atname = first_name + " " + last_name : null
    username ? atname = username : null
    console.log("获取信息:", body);
    const resA = await this.ctx.model.User.checkCode({
      invite_code: text
    })
    if (resA.sqlstatus == 'Failed') {
      return `@${atname} Your code is invalid \n\n 您的邀请码无效`;
    }

    try {
      const resB = await ctx.model.Recommend.updatail({
        code: text,
        type: '推荐奖励',
        status: '已激活',
        tran: t
      })
      console.log(resB);
      if (resB.fields[0] > 0) {
        return `@${atname} Your code:${text} is activated successfully,send shared link to your friend right away to get your bonus. \n\n 你的验证码：${text}，已激活成功！立刻发送分享链接给朋友获得空投奖励！\n\n Your share link （你的分享链接): http://wisdomcoin.pro/?code=${text}`
      }
      else {
        return `@${atname} Your code activation failed,Please try again later \n\n 您的邀请码激活失败,请稍后重试`;
      }
    } catch (err) {
      ctx.logger.error(err);
      return `@${atname} The server is busy,Please try again later \n\n 服务器繁忙，请稍后再试`;
    }



  }

  /**
   * 绑定地址接口
   */
  public async bindWallet(t) {
    const { ctx } = this;
    const { address, code } = this.body;
    const getrandom = CommUtil.randomRange();
    const resA = await ctx.model.User.findinfo({
      address: address,
    })
    console.log("resA", resA);
    if (resA.sqlstatus == 'Success') {
      return {
        ...Status(200, null),
        code: resA.fields.invitecode
      }
    }
    const resB = await ctx.model.User.findcode({
      random: getrandom,
    })
    //console.log("resB",resB);
    if (resB.sqlstatus == 'Success') {
      return {
        ...Status(404, StatusCode.NETWORK_IS_BUSY)
      }
    }

    if (code) {
      const resC = await ctx.model.User.findcode({
        random: code,
      })
      //console.log("resB",resB);
      if (resC.sqlstatus == 'Failed') {
        return {
          ...Status(404, StatusCode.RANDOM_IS_NOTEXISTED)
        }
      }

      const phone_address = resC.fields.address;


      try {
        await ctx.model.User.insert({
          receiveaddress: address,
          random: getrandom,
          tran: t
        })
        await ctx.model.Recommend.insertat({
          phone_address: phone_address,
          phone_coin: '1',
          recommend_address: address,
          recommend_coin: '4',
          code: code,
          type: '推荐奖励',
          status: '未激活',
          tran: t
        })

      } catch (err) {
        ctx.logger.error(err);
        return {
          ...Status(404, StatusCode.NETWORK_IS_BUSY)
        }
      }
      return {
        ...Status(200, null),
        code: getrandom
      }
    }

    return {
      ...Status(404, StatusCode.NETWORK_IS_BUSY)
    }

  }
}