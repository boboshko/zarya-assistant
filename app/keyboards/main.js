const { Extra, Markup } = require('telegraf');
const locales = require('../locales/keyboards/main');

// Standart keyboard template
const keyboardTemplateMain = (arr) => Markup
  .keyboard(arr)
  .resize()
  .extra();

//  Location sharing keyboard template
const keyboardTemplateLocation = (arr) => Extra.markup((markup) => markup.resize()
  .keyboard([
    markup.locationRequestButton(arr[0]),
  ]));

// Create object with keyboard
const keyboards = {
  main: (i18n) => keyboardTemplateMain(locales.main[i18n]),
  settings: (i18n) => keyboardTemplateMain(locales.settings[i18n]),
  location: (i18n) => keyboardTemplateLocation(locales.location[i18n]),
};

// Export object with keyboard
module.exports = keyboards;
