const jwt = require('jsonwebtoken')
const { SECRET } = process.env

function login (req, res) {
  const { _id: id, username, path } = req.user
  const token = jwt.sign({ id, username }, SECRET)
  res.json({success: true, token, path})
}

module.exports = login
