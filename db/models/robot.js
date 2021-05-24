let mongoose = require('mongoose')

let robotSchema = new mongoose.Schema({
  robotName: String,
  robotId: String,
})

module.exports = mongoose.model('robot', robotSchema)