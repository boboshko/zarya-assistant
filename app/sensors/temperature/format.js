const convert = require('./convert');

// Reset degree format as in settings
function temperatureFormat(celsius, useFahrenheit) {
  if (useFahrenheit === true) {
    return convert.celsiusToFahrenheit(celsius);
  }
  return celsius;
}

exports.formatting = temperatureFormat;
