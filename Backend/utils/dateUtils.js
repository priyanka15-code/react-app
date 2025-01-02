const moment = require("moment");

// Get current date in YYYY-MM-DD format
exports.getCurrentDate = () => {
  return moment().format("YYYY-MM-DD");
};

// Format date to a custom format
exports.formatDate = (date, format = "YYYY-MM-DD") => {
  return moment(date).format(format);
};

// Get the current day of the week
exports.getCurrentDayOfWeek = () => {
  return moment().format("dddd");
};
