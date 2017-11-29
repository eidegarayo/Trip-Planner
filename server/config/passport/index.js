/* global __BASE */
const passport = require('passport')

const UserTrip = require(`${__BASE}/models/UserTrip`)
const strategy = require('./strategies/jwt')

passport.use(UserTrip.createStrategy())
passport.use(strategy)

module.exports = passport
