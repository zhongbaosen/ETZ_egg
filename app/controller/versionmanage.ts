import { Controller } from 'egg';

export default class versionmanageController extends Controller {
	t: any;
	//版本更新
	public async versionCheck1(){
	    const { ctx } = this
	    const result = await ctx.service.versionManage.versionCheck();
	    ctx.body = {
	      ...result
	    }
	    ctx.status = 200
	    return
	}

	// public async getTokenlist(){
	//     const { ctx } = this
	  
	//     const result = await ctx.service.etz.getTokenJson();
	//     ctx.body = {
	//       ...result
	//     }
	//     ctx.status = 200
	//     return
	// }
}