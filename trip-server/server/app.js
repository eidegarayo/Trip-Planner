const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const passport = require('./config/passport')
const routesAuth = require('./routes/auth')
const routesPrivate = require('./routes/private')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(passport.initialize())
app.use('/', routesAuth)
app.use(routesPrivate)

module.exports = app
