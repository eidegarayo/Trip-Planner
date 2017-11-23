const UserTrip = require(`${__BASE}/models/UserTrip`)

function updateTrip (req, res) {
  const { tripPath, tripRoute } = req.body
  UserTrip.updateOne(
    {"path": tripPath},
    {
      $set: {"itinerary": tripRoute}
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
