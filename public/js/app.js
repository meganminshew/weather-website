//console.log('Client side javascript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('#inputLocation')
const msgLocation = document.querySelector('#txtLocation')
const msgWeather = document.querySelector('#txtWeather')
const msgForecast = document.querySelector('#txtForecast')
const msgWind = document.querySelector('#txtWind')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const loc = search.value
    console.log(loc)
    msgLocation.textContent = 'Geolocating ' + loc
    msgWeather.textContent = ''
    msgForecast.textContent = ''
    msgWind.textContent = ''
    fetch('/weather?location='+loc).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            msgLocation.textContent = data.error
        } else {
            console.log(data)
            msgLocation.textContent = data.location
            msgWeather.textContent = data.weather
            msgForecast.textContent = data.forecast 
            msgWind.textContent = data.wind   
        }
    })
})

})
