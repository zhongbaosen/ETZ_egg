import { Service } from 'egg';

export default class VersionManage extends Service {
	public async versionCheck(){
			let result = await this.ctx.model.Version.getLatestVersion();
			return {
		   status: "1",
		   message: "OK",
		   result
		 }
	}
}
