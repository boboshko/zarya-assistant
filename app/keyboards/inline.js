const { Markup } = require('telegraf');
const locales = require('../locales/keyboards/inline');

// Standart inline-keyboard template
const inlineKeyboardTemplate = (text, callback) => Markup.inlineKeyboard([
  Markup.callbackButton(text[0], callback[0]),
  Markup.callbackButton(text[1], callback[1]),
], { columns: 2 }).resize().extra();

// Create object with keyboard
const keyboards = {
  language: (i18n) => inlineKeyboardTemplate(locales.language[i18n], locales.language.callback),
  degrees: (i18n) => inlineKeyboardTemplate(locales.degrees[i18n], locales.degrees.callback),
  pressure: (i18n) => inlineKeyboardTemplate(locales.pressure[i18n], locales.pressure.callback),
  time: (i18n) => inlineKeyboardTemplate(locales.time[i18n], locales.time.callback),
};

// Export object with keyboard
module.exports = keyboards;
