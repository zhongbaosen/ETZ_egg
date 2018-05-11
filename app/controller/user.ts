import { Controller } from 'egg';
import { ValRule, Status } from '../utils'

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    try {
      ctx.validate(ValRule.CREATE_RULE);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        ...Status(404, err.errors)
      }
      return;
    }
    // const count = await ctx.service.user.find(ctx.request.body);
    const result = await ctx.service.user.entry();
    ctx.body = {
      ...result
    }
    ctx.status = 200;
    return;
  }

  public async isShow() {
    const { ctx } = this;
    try {
      ctx.validate(ValRule.ISSHOW_RULE);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        ...Status(404, err.errors)
      }
      return;
    }

    const result = await ctx.service.user.showinfo();
    ctx.body = {
      ...result
    }
    ctx.status = 200;
    return;
  }

  public async sendSms() {
    const { ctx } = this;
    try {
      ctx.validate(ValRule.SENDSMS_RULE);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        ...Status(404, err.errors)
      }
      return;
    }

    const result = await ctx.service.user.sms();
    ctx.body = {
      ...result
    }
    ctx.status = 200;
    return;
  }
}
