let mongoose = require('mongoose')

let setupSchema = new mongoose.Schema({
  name: String,
  setupJob: Array
})

module.exports = mongoose.model('setup', setupSchema)