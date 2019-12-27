// run with nodemon src/app.js -e js,hbs
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths for Express and handlebars configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Megan'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Megan'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Megan',
        message: 'What are you looking for help with?'
    })
})

app.get('/weather', (request,response) => {
    if (!request.query.location) {
        return response.send({
            error: 'Please enter a location'
        })
    }
    geocode(request.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return response.send({ error })
        }
        console.log('Checking weather for ' + location)
        forecast(latitude, longitude, (error, {todays, temp_now, rain_pct}) => {
            if (error) {
                return response.send({error: error})
            }
            response.send({
                location: 'Checking weather for ' + location,
                weather: 'Todays weather is ' + todays,
                forecast: 'Current temp is ' + temp_now + ' degrees (F) with a ' + rain_pct + '% chance of rain.'
            })
        }
        )      
    }
    )
})

app.get('/help/*', (request, response) => {
    response.render('error', { message: 'Help article not found'})
})

app.get('*', (request, response) => {
    response.render('error', { message: "Page not found. You're killing me Smalls..."})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//? Can I attach to an existing website?
// localhost:3000 to view
// localhost:3000/help