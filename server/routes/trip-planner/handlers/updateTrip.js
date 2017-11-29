/* global __BASE */
const UserTrip = require(`${__BASE}/models/UserTrip`)

function updateTrip (req, res) {
  const { tripPath, tripRoute, tripAgenda } = req.body
  UserTrip.updateOne(
    {'path': tripPath},
    {
      $set: {
        'itinerary': tripRoute,
        'agenda': tripAgenda
      }
    }
  )
  .then(response =>
    res.status(200).json({msg: `Trip ${tripPath} updated properly`})
    )
  .catch(error =>
    res.statur(500).json({msg: error})
  )
}

module.exports = updateTrip
