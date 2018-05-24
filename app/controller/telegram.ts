import { Controller } from 'egg';
import { ValRule, Status,ethUtil,StatusCode } from '../utils'

export default class CountryController extends Controller {
  /**
   * 电报群功能
   */
  public async res() {
    const { ctx } = this;
    console.log(ethUtil.isValidAddress(ctx.request.body.address));
    if(!ethUtil.isValidAddress(ctx.request.body.address)){
      ctx.body = {
        ...Status(404,StatusCode.ADDRESS_IS_INVALID)
      }
      return;
    }
    try {
      ctx.validate(ValRule.BIND_ADDRESS_RULE);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        ...Status(404, err.errors)
      }
      return;
    }
    return ctx.model.transaction(async t => {
      ctx.body = await ctx.service.telegram.bindWallet(t);
    });
  }
}
