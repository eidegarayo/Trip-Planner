const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'trips'

const TripSchema = new Schema({
  title: String,
  path: String,
  days: Number,
  password: String,
  itinerary: {type: Schema.Types.Mixed, default: {}}
}, {collection, minimize: false})

module.exports = mongoose.model('Trip', TripSchema)
