const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const getTripInfo = require('./handlers/getTripInfo')
const updateTrip = require('./handlers/updateTrip')

router.use(passport.authenticate('jwt', {session: false}))

router.get('/:tripPathName', getTripInfo)
router.put('/:tripPathName', updateTrip)
router.get('/:tripPathName/route', getTripInfo)

module.exports = router
