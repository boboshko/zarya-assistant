const Telegraf = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const path = require('path');
const { Markup } = require('telegraf');
const config = require('./config');
const launch = require('./launch');
const handlers = require('./handlers/handlers');
const inline = require('./locales/keyboards/inline');
const onboarding = require('./scenes/onboarding');
const master = require('./scenes/master');
const settings = require('./scenes/settings');

const keyboards = {
  inline,
};

const scenes = {
  onboarding,
  master,
  settings,
};

// Localisation settings
const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  directory: path.resolve(__dirname, 'locales'),
  useSession: true,
});

// Parsing users array
const ALLOWED_USERS = JSON.parse(config.zaryaAllowedUsers);

const app = new Telegraf(config.zaryaToken);

const stage = new Stage([
  scenes.onboarding.step1,
  scenes.onboarding.step2,
  scenes.onboarding.step3,
  scenes.onboarding.step4,
  scenes.onboarding.step5,
  scenes.master.master,
  scenes.settings.settings,
]);

app.use(Telegraf.session());
app.use(i18n.middleware());
app.use(stage.middleware());

// Checking user’s rights
app.use(({ i18n, replyWithHTML, from }, next) => {
  if (!ALLOWED_USERS.includes(from.id)) {
    return replyWithHTML(i18n.t('access'));
  }
  return next();
});

// Creating the empty object for user settings during session
app.on('text', (ctx, next) => {
  if (!ctx.session.userData) {
    ctx.session.userData = {
      useFahrenheit: null,
      useInHg: null,
      use12HourFormat: null,
      lat: null,
      long: null,
    };
  }
  next();
  console.log(ctx.session.userData);
});

// Processing /start command
app.start((ctx) => {
  ctx.reply(ctx.i18n.t('start'), Markup.removeKeyboard().extra())
    .then(() => ctx.scene.enter('step1'));
});

// Processing ‘Language’ command
app.hears(TelegrafI18n.match('buttons.language'), handlers.language);
app.action(keyboards.inline.language.callback, handlers.languageCallback);

// Processing ‘Degrees’ command
app.hears(TelegrafI18n.match('buttons.degrees'), handlers.degrees);
app.action(keyboards.inline.degrees.callback, handlers.degreesCallback);

// Processing ‘Pressure’ command
app.hears(TelegrafI18n.match('buttons.pressure'), handlers.pressure);
app.action(keyboards.inline.pressure.callback, handlers.pressureCallback);

// Processing ‘Time’ command
app.hears(TelegrafI18n.match('buttons.time'), handlers.timeFormat);
app.action(keyboards.inline.time.callback, handlers.timeFormatCallback);

// Processing ‘Share the location’ command
app.hears(TelegrafI18n.match('buttons.timezone'), handlers.timezone);
app.on('location', (ctx) => handlers.timezoneCallback(ctx));

// Processing ‘Settings’ command
app.hears(TelegrafI18n.match('buttons.settings'), (ctx) => ctx.scene.enter('settings'));

// Processing ‘Back’ command
app.hears(TelegrafI18n.match('buttons.back'), (ctx) => ctx.scene.enter('master'));

// Processing ‘Weather’ command
app.hears(TelegrafI18n.match('buttons.weather'), handlers.weather);

// Processing unknown messages
app.on('text', ({ i18n, replyWithHTML }) => replyWithHTML(
  i18n.t('error'),
));

// Starting the application
launch.mode(config.zaryaWebhookUse, app);
