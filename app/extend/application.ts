
const Telegraf = require('telegraf')

module.exports = {
  async startbot(ctx) {
    const body = ctx;
    const telbot = new Telegraf(this.config.teleg.token);
    console.log(ctx.service);
    // const {app} = this;
    //  app.loggers.info("已加载电报群");
    telbot.start((ctx) => {
      const result = `Welcome to Etherzero!\n\n 欢迎来到Etherzero`
      ctx.reply(result)
    })
    telbot.help((ctx) => {
      const result = `If there is any doubt,\n you can visit http://etherzero.org \n\n 如有疑问，\n你可以访问 http://etherzero.org`
      ctx.reply(result)
    })
    // telbot.on('sticker', (ctx) =>
    //   ctx.reply('👍')
    // )
    telbot.hears('hi', (ctx) => {
      // console.log("hi", ctx);
      const result = `Welcome to Etherzero!\n\n 欢迎来到Etherzero`
      ctx.reply(result)
    })
    // telbot.hears(/buy/i, async (ctx) => {
    //   ctx.reply('Buy-buy')
    // })
    telbot.hears(/\//i, async (ctx) => {
      const result = await body.model.transaction(async t => {
        return await body.service.telegram.entry(ctx, t);
      })
      ctx.reply(result)
    })

    // telbot.on('message', (ctx) => {
    //   console.log("xx", ctx.message);
    //   console.log("有消息进来了")
    //   return ctx.reply('Hello')
    // })

    await telbot.startPolling()

  }
}
