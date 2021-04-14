const convert = require('./convert');

// Reset pressure format as in settings
function pressureFormat(millimeters, useInHg) {
  if (useInHg === true) {
    return convert.millimetersToinches(millimeters);
  }
  return millimeters;
}

exports.formatting = pressureFormat;
