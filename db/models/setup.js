let mongoose = require('mongoose')

let setupSchema = new mongoose.Schema({
  setupName: String,
  setupId: String,
  setupJob: Array
})

module.exports = mongoose.model('setup', setupSchema)