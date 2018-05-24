
const Telegraf = require('telegraf')

module.exports = {
    async startbot(ctx) {
        const body = ctx;
        const telbot = new Telegraf(this.config.teleg.token);
        console.log(ctx.service);
        // const {app} = this;
        //  app.loggers.info("已加载电报群");
        telbot.start((ctx) =>
          ctx.reply('Welcome!')
        )
        telbot.help((ctx) =>
          ctx.reply('Send me a sticker')
        )
        telbot.on('sticker', (ctx) =>
          ctx.reply('👍')
        )
        telbot.hears('hi', (ctx) => {
          console.log("hi", ctx);
          ctx.reply('Hey there')
        })
        telbot.hears(/buy/i, async (ctx) => {
          ctx.reply('Buy-buy')
        })
        telbot.hears(/\d/i, async (ctx) => {
          const result = await body.model.transaction(async t => {
            return await body.service.telegram.entry(ctx,t);
          }) 
          ctx.reply(result)
        })
      
        telbot.on('message', (ctx) => {
          console.log("xx", ctx.message);
          console.log("有消息进来了")
          return ctx.reply('Hello')
        })
      
        await telbot.startPolling()

    }
}
