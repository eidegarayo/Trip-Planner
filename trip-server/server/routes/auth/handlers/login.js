const jwt = require('jsonwebtoken')
const { SECRET } = process.env

function login (req, res) {
  const { _id: id, username } = req.user
  const token = jwt.sign({ id, username }, SECRET)
  res.json({success: true, token: 'Bearer ' + token, path: username})
}

module.exports = login
