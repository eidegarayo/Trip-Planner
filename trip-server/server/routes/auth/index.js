const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

const registerTrip = require('./handlers/registerTrip')
const login = require('./handlers/login')

router.post('/register', registerTrip)
router.post('/login', passport.authenticate('local', { session: false }), login)

module.exports = router
