const passport = require('passport')

const Trip = require('./../../models/tripPlanner')
const LocalStrategy = require('passport-local').Strategy
const strategy = require('./strategies/jwt')

passport.use(new LocalStrategy(Trip.authenticate()))
passport.use(strategy)

module.exports = passport
