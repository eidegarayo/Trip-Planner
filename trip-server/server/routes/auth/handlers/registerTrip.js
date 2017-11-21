const Trip = require('../../../models/tripPlanner')

function registerTrip (req, res) {
  const { tripName, tripPathName, tripDays, tripPassword } = req.body
  const password = tripPassword
  const newTrip = new Trip({
    username: tripPathName,
    title: tripName,
    path: tripPathName,
    days: +tripDays
  })

  Trip.register(newTrip, password, err => {
    if (err) {
      return res.json({ success: false, msg: 'Sorry. Username already exists.' })
    }
    res.json({success: true, msg: 'New user created correctly'})
  })
}

module.exports = registerTrip
