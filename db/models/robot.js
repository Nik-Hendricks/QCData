let mongoose = require('mongoose')

let robotSchema = new mongoose.Schema({
  name: String,
  currentJobs: String,
})

module.exports = mongoose.model('robot', robotSchema)