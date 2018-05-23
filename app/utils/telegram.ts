

async function Telegram(app) {
  const telbot = await app.startbot();
  app.logger.info("已加载电报群");
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
  telbot.command(`//i`, (ctx) => {
    console.log("xx",ctx.message);
    ctx.reply('你好啊')
  })

  telbot.on('message', (ctx) => {
    console.log("xx",ctx.message);
    console.log("有消息进来了")
    return ctx.reply('Hello')
  })

  await telbot.startPolling()
}



export default Telegram;