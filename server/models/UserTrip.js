const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema
const collection = 'trips'

const UserTripSchema = new Schema({
  title: String,
  path: String,
  days: Number,
  itinerary: { type: Schema.Types.Mixed, default: {} }
}, { collection, minimize: false })

UserTripSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('UserTrip', UserTripSchema)
