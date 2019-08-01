const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/2dd7479db1e35161d45f177bb2018c86/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (body.error) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      const summary = body.daily.data[0].summary
      const temperature = body.currently.temperature
      const precipProbability = body.currently.precipProbability


      callback(
        undefined,
        `${summary} This is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
      )
    }
  })
}

module.exports = forecast
