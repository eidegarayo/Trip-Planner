const express = require('express')
const router = express.Router()

const getTripInfo = require('./handlers/getTripInfo')
const addTrip = require('./handlers/addTrip')
const updateTrip = require('./handlers/updateTrip')

router.get('/trip-planner/:tripPathName', getTripInfo)
router.post('/trip-planner/:tripPathName', addTrip)
router.put('/trip-planner/:tripPathName', updateTrip)
router.get('/trip-planner/:tripPathName/route', getTripInfo)

module.exports = router
