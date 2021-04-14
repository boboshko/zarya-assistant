const requests = require('../requests/lastDoc');
const time = require('../time/format');
const sensorTemperature = require('../sensors/temperature/format');
const sensorPressure = require('../sensors/pressure/format');
const main = require('../keyboards/main');
const inline = require('../keyboards/inline');

const keyboards = {
  main,
  inline,
};

// ‘Language’ command handler
const language = ({ i18n, replyWithHTML }) => replyWithHTML(
  i18n.t('language.choice'),
  keyboards.inline.language(i18n.languageCode),
);

const languageCallback = (async (ctx, next, keyboard) => {
  ctx.answerCbQuery();

  if (ctx.update.callback_query.data === 'english') {
    ctx.i18n.locale('en');
    await ctx.deleteMessage();
    const keyboardReturn = keyboard === false ? null : keyboards.main.main(ctx.i18n.languageCode);
    return ctx.replyWithHTML(ctx.i18n.t('language.confirmed'), keyboardReturn);
  } if (ctx.update.callback_query.data === 'russian') {
    ctx.i18n.locale('ru');
    await ctx.deleteMessage();
    const keyboardReturn = keyboard === false ? null : keyboards.main.main(ctx.i18n.languageCode);
    return ctx.replyWithHTML(ctx.i18n.t('language.confirmed'), keyboardReturn);
  }
  return next();
});

// Define temperature scale
function celsiusOrFahrenheit(ctx) {
  if (ctx.session.userData.useFahrenheit === true) {
    return ctx.editMessageText(ctx.i18n.t('degrees.fahrenheit'), { parse_mode: 'html' });
  }

  return ctx.editMessageText(ctx.i18n.t('degrees.celsius'), { parse_mode: 'html' });
}

// ‘Degrees’ command handler
const degrees = ({ i18n, replyWithHTML }) => replyWithHTML(
  i18n.t('settings.degrees'),
  keyboards.inline.degrees(i18n.languageCode),
);

const degreesCallback = (async (ctx, next) => {
  await ctx.answerCbQuery();

  if (ctx.update.callback_query.data === 'fahrenheit') {
    ctx.session.userData.useFahrenheit = true;
    return celsiusOrFahrenheit(ctx);
  } if (ctx.update.callback_query.data === 'celsius') {
    ctx.session.userData.useFahrenheit = false;
    return celsiusOrFahrenheit(ctx);
  }
  return next();
});

// Define pressure format
function millimetersOrInches(ctx) {
  if (ctx.session.userData.useInHg === true) {
    return ctx.editMessageText(ctx.i18n.t('pressure.inches'), { parse_mode: 'html' });
  }

  return ctx.editMessageText(ctx.i18n.t('pressure.millimeters'), { parse_mode: 'html' });
}

// ‘Pressure’ command handler
const pressure = ({ i18n, replyWithHTML }) => replyWithHTML(
  i18n.t('settings.pressure'),
  keyboards.inline.pressure(i18n.languageCode),
);

const pressureCallback = (async (ctx, next) => {
  await ctx.answerCbQuery();

  if (ctx.update.callback_query.data === 'inches') {
    ctx.session.userData.useInHg = true;
    return millimetersOrInches(ctx);
  } if (ctx.update.callback_query.data === 'millimeters') {
    ctx.session.userData.useInHg = false;
    return millimetersOrInches(ctx);
  }
  return next();
});

// Define pressure (inches or millimeters)
function pressureFormat(ctx) {
  if (ctx.session.userData.useInHg === true) {
    return ctx.i18n.t('pressure.format.inches');
  }

  return ctx.i18n.t('pressure.format.millimeters');
}

// Define time format
function twelveOrTwentyFourHours(ctx) {
  if (ctx.session.userData.use12HourFormat === true) {
    return ctx.editMessageText(ctx.i18n.t('time.12hour'), { parse_mode: 'html' });
  }

  return ctx.editMessageText(ctx.i18n.t('time.24hour'), { parse_mode: 'html' });
}

// ‘Time’ command handler
const timeFormat = ({ i18n, replyWithHTML }) => replyWithHTML(
  i18n.t('settings.time'),
  keyboards.inline.time(i18n.languageCode),
);

const timeFormatCallback = (async (ctx, next) => {
  await ctx.answerCbQuery();

  if (ctx.update.callback_query.data === '12hour') {
    ctx.session.userData.use12HourFormat = true;
    return twelveOrTwentyFourHours(ctx);
  } if (ctx.update.callback_query.data === '24hour') {
    ctx.session.userData.use12HourFormat = false;
    return twelveOrTwentyFourHours(ctx);
  }
  return next();
});

// ‘Share the location’ command handler
const timezone = ({ i18n, replyWithHTML }) => replyWithHTML(
  i18n.t('settings.timezone'),
  keyboards.main.location(i18n.languageCode),
);

const timezoneCallback = ((ctx, keyboard) => {
  ctx.session.userData.lat = ctx.message.location.latitude;
  ctx.session.userData.long = ctx.message.location.longitude;
  const keyboardReturn = keyboard === false ? null : keyboards.main.settings(ctx.i18n.languageCode);
  return ctx.reply(ctx.i18n.t('settings.confirmed'), keyboardReturn);
});

// ‘Weather’ command handler
const weather = async (ctx) => {
  const res = await requests.lastDoc('last');
  const { i18n, replyWithHTML, session } = ctx;
  replyWithHTML(i18n.t('lastDoc', {
    doc_id: res._id,
    date_count: time.formatting(
      res.date_count,
      session.userData.lat,
      session.userData.long,
      session.userData.use12HourFormat,
    ),
    temperature: sensorTemperature.formatting(res.temperature, session.userData.useFahrenheit),
    pressure: sensorPressure.formatting(res.pressure, session.userData.useInHg),
    pressureFormat: pressureFormat(ctx),
    delivery_speed: res.date_count - res.created_at,
  }));
};

module.exports = {
  language,
  languageCallback,
  degrees,
  degreesCallback,
  pressure,
  pressureCallback,
  timeFormat,
  timeFormatCallback,
  timezone,
  timezoneCallback,
  pressureFormat,
  weather,
};
