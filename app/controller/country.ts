import { Controller } from 'egg';

export default class CountryController extends Controller {
  public async getCountry() {
    const { ctx } = this;
    ctx.body = await ctx.service.country.find();
  }
}
