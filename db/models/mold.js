let mongoose = require('mongoose')

let moldSchema = new mongoose.Schema({
  moldDescription: String,
  arrivalDate: Date,
  receivedFrom: String,
  moldOpened: Boolean,
  edgeInspection: Boolean,
  moldDamaged: Boolean,
  pinchOffs: Boolean,
  leaderPins: Boolean,
  bushings: Boolean,
  waterAirFittings: Boolean,
  ready: Boolean,
  moldNumber: Number,
  moldLocation: String,
})

module.exports = mongoose.model('mold', moldSchema)