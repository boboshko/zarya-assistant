// Convert millimeters of mercury to inches of mercury
function millimetersToinches(millimeters) {
  const result = (millimeters / 25.4).toFixed(1);
  return result;
}

exports.millimetersToinches = millimetersToinches;
