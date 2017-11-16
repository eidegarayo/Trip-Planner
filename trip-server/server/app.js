const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routesPrivate = require('./routes/private')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(routesPrivate)

module.exports = app
