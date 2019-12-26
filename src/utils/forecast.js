const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url_weather = `https://api.darksky.net/forecast/93177e8a72e0dae1fab7c8b54a6c6589/${latitude},${longitude}?units=us&lang=en`

    request({url:url_weather, json:true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            const data = {
                todays : body.daily.data[0].summary,
                temp_now : body.currently.temperature,
                rain_pct : body.currently.precipProbability,
            }
            const { todays, temp_now, rain_pct} = data
            callback(undefined, data)
        }
    })
}

module.exports = forecast

