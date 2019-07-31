const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup public directory to serve [load css, for example]
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'John Johnson'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'John Johnson',
    age: 33
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: 'Some Help text here',
    name: 'John Johnson'
  })
})

// app.get('/weather', (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: 'You must provide an address!'
//     })
//   }

//   geocode(
//     req.query.address,
//     (error, { latitude, longitude, location } = {}) => {
//       if (error) {
//         return res.send({ error })
//       }

//       forecast(latitude, longitude, (error, forecastData) => {
//         if (error) {
//           return res.send({ error })
//         }

//         res.send({
//           forecast: forecastData,
//           location,
//           address: req.query.address
//         })
//       })
//     }
//   )
// })
app.get('/weather', (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send('Please, enter location as command line argument')
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        res.send({
          forecast: forecastData,
          location,
          address: address
        })
      })
    })
  }

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Such help article note found',
    name: 'John Johnson'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Error 404',
    name: 'John Johnson'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
