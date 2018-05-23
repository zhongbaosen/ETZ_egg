import { TeleGram } from './app/utils'

module.exports = app => {
  TeleGram(app);   //加载 Telegram电报群

  if (app.config.env === 'local') {
    app.beforeStart(async () => {
      await app.model.sync({ force: false });
    });
  }
};