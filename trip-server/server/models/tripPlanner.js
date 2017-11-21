const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema
const collection = 'trips'

const TripSchema = new Schema({
  username: String,
  password: String,
  title: String,
  path: String,
  days: Number,
  itinerary: {type: Schema.Types.Mixed, default: {}}
}, {collection, minimize: false})

TripSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Trip', TripSchema)
