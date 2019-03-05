const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=esG2AHkG2yujIleFGV9hHscYZNq1ZrOh&location=${encodedAddress}`,
      json: true
    }, (error, response, body) =>{
      if (error) {
        reject("Unable to connect to Google servers.")
      } else if (body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
        reject('Unable to find that address.');
      } else if (body.results[0].locations[0].geocodeQualityCode !== 'A1XAX') {
        resolve({
          Address: body.results[0].providedLocation.location,
          Lat: body.results[0].locations[0].latLng.lat,
          Lng: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
