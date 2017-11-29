const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = mongoose.connection

module.exports = db
