const request = require('request');

var getWeather = (Lat, Lng, callback) => {
  request({
      url:
        `https://api.darksky.net/forecast/64de925d5e60158ef0763133857f1ca7/${Lat},${Lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
        });
      } else {
        callback('Unable to fetch weather');
      }
    }
  );
};

module.exports.getWeather = getWeather;
