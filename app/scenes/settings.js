const Scene = require('telegraf/scenes/base');

const settings = new Scene('settings');
const main = require('../keyboards/main');

const keyboards = {
  main,
};

// ‘Settings’ command handler
settings.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('scenes.settings'),
  keyboards.main.settings(ctx.i18n.languageCode)));

module.exports = {
  settings,
};
