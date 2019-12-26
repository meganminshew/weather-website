const request = require('request')

const geocode = (address, callback) => {
    const url_geo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address.trim())}}.json?access_token=pk.eyJ1IjoibWVnYW5taW5zaGV3IiwiYSI6ImNrNDkxcnM2bTAwcnYzbGt5aGpjdTVlbXQifQ.IL3CsfNkwykH5IzxcIKidA&limit=1`

    request({url:url_geo, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode

