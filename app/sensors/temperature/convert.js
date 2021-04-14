// Convert degrees in Celsius to degrees in Fahrenheit
function celsiusToFahrenheit(celsius) {
  const result = (celsius * 9) / 5 + 32;
  return result;
}

exports.celsiusToFahrenheit = celsiusToFahrenheit;
