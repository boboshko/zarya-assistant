const Scene = require('telegraf/scenes/base');

const master = new Scene('master');
const main = require('../keyboards/main');

const keyboards = {
  main,
};

// ‘Back’ command handler
master.enter((ctx) => ctx.replyWithHTML(ctx.i18n.t('scenes.master'),
  keyboards.main.main(ctx.i18n.languageCode)));

module.exports = {
  master,
};
