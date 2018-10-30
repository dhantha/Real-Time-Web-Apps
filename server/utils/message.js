var moment = require('moment');

var generateMesseges = (from, text) => {
  return {
    from,
    text,
    createdAt : moment().valueOf()
  };
};

var generateLocationMessages = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps/q?${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {generateMesseges,generateLocationMessages}
