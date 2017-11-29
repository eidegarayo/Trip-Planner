/* global __BASE */
const UserTrip = require(`${__BASE}/models/UserTrip`)

function registerUserTrip (req, res) {
  const { username, password, tripName, tripDays, tripUrl } = req.body

  const newUserTrip = new UserTrip({
    username,
    title: tripName,
    path: tripUrl,
    days: +tripDays
  })

  UserTrip.register(newUserTrip, password, err => {
    if (err) {
      return res.status(400).json({ success: false, msg: 'Sorry. Username already exists.' })
    }
    res.json({success: true, msg: 'New user created correctly'})
  })
}

module.exports = registerUserTrip
