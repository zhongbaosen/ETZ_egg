import { Controller } from 'egg';

/**
 * 定义创建接口的请求参数规则
 */
const createRule = {
    phonenum: 'string',
    country_code: 'string',
    random: 'string',
    receiveaddress:'string'
  };

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule);
    // const count = await ctx.service.user.find(ctx.request.body);
    const result = await ctx.service.user.entry();
    ctx.body = {
      ...result
    }
    ctx.status = 200;
  }
}
