const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const passport = require('./config/passport')

const routesAuth = require('./routes/auth')
const routesTripPlanner = require('./routes/trip-planner')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pathReactClient = path.join(__dirname, '../client/build')
app.use(express.static(pathReactClient))

app.use(passport.initialize())

app.use('/', routesAuth)
app.use('/api/trip-planner', routesTripPlanner)

module.exports = app
