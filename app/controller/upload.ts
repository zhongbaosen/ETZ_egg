import { Controller } from 'egg';
import sendToWormhole from 'stream-wormhole';
import * as path from 'path';
const fs = require('fs');
import {write as awaitWriteStream} from 'await-stream-ready';
// const sendToWormhole = require('stream-wormhole');

export default class UploadAjaxController extends Controller {
    async show() {
      await this.ctx.render('page/ajax.html');
    }
  
    async upload() {
      const stream = await this.ctx.getFileStream();
      const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
      const target = path.join(this.config.baseDir, 'app/public', filename);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
  
      this.ctx.body = { url: '/public/' + filename };
    }

    readdir(url){
        return new Promise((resolve,reject)=>{
            fs.readdir(url,'utf8',function (err,data) {
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        });
    }
  }
  