const Scene = require('telegraf/scenes/base');
const handlers = require('../handlers/handlers');
const keyboard = require('../locales/keyboards/inline');

const step1 = new Scene('step1');
const step2 = new Scene('step2');
const step3 = new Scene('step3');
const step4 = new Scene('step4');
const step5 = new Scene('step5');

// Step 1 (Choose language)
step1.enter((ctx) => handlers.language(ctx));

step1.action(keyboard.language.callback, async (ctx, next) => {
  await handlers.languageCallback(ctx, next, false);
  return ctx.scene.enter('step2');
});

// Step 2 (Choose temperature scale)
step2.enter((ctx) => handlers.degrees(ctx));

step2.action(keyboard.degrees.callback, async (ctx, next) => {
  await handlers.degreesCallback(ctx, next);
  return ctx.scene.enter('step3');
});

// Step 3 (Choose pressure format)
step3.enter((ctx) => handlers.pressure(ctx));

step3.action(keyboard.pressure.callback, async (ctx, next) => {
  await handlers.pressureCallback(ctx, next);
  return ctx.scene.enter('step4');
});

// Step 4 (Choose time format)
step4.enter((ctx) => handlers.timeFormat(ctx));

step4.action(keyboard.time.callback, async (ctx, next) => {
  await handlers.timeFormatCallback(ctx, next);
  return ctx.scene.enter('step5');
});

// Step 5 (Location sharing)
step5.enter((ctx) => handlers.timezone(ctx));

step5.on('location', async (ctx) => {
  await handlers.timezoneCallback(ctx, false);
  return ctx.scene.enter('master');
});

module.exports = {
  step1, step2, step3, step4, step5,
};
