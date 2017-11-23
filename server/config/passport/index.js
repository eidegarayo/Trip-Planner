const passport = require('passport')

const UserTrip = require(`${__BASE}/models/UserTrip`)
const LocalStrategy = require('passport-local').Strategy
const strategy = require('./strategies/jwt')

// passport.use(new LocalStrategy(Trip.authenticate()))

passport.use( UserTrip.createStrategy() )
passport.use(strategy)

module.exports = passport
