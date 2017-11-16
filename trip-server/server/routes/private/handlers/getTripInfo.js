const Trip = require('../../../models/tripPlanner')

function getTripInfo (req, res) {
  const { tripPathName } = req.params
  const filter = { path: tripPathName }
  Trip.find(filter)
    .then(trip => res.json(trip))
    .catch(err => console.log(err))
}

module.exports = getTripInfo
