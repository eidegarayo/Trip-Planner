const UserTrip = require(`${__BASE}/models/UserTrip`)

function getTripInfo (req, res) {
  const { tripPathName } = req.params
  const filter = { path: tripPathName }
  UserTrip.find(filter)
    .then(trip => res.json(trip))
    .catch(err => console.log(err))
}

module.exports = getTripInfo
