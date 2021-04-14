const timezone = require('./timezone');

// Time format templates settings
const get12HourFormat = 'hh:mm a';
const get24HourFormat = 'HH:mm';

// Return time format according to the settings
function timeFormatting(timestamp, lat, long, use12HourFormat) {
  if (use12HourFormat === true) {
    return timezone.getTimezone(timestamp, lat, long, get12HourFormat);
  }
  return timezone.getTimezone(timestamp, lat, long, get24HourFormat);
}

exports.formatting = timeFormatting;
