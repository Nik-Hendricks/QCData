let mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
  clientName: String,
  clientId: String,
  clientJobs: Array,
})

module.exports = mongoose.model('client', clientSchema)