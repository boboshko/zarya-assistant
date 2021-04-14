const geoTz = require('geo-tz');
const { utcToZonedTime, format } = require('date-fns-tz');

// Get time zone
function getTimezone(timestamp, lat, long, pattern) {
  const date = new Date(timestamp * 1000);
  const timeZone = geoTz(lat, long)[0];
  const zonedDate = utcToZonedTime(date, timeZone);
  const output = format(zonedDate, pattern, { timeZone });
  return output;
}

exports.getTimezone = getTimezone;
