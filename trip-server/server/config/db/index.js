const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('connected', () => console.log('Connected to DB...'))

module.exports = db
