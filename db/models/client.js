let mongoose = require('mongoose'), Schema = mongoose.Schema
let job = require('./job.js');


let clientSchema = new mongoose.Schema({
  clientName: String,
  clientId: String,
  clientJobs: [{ type: Schema.ObjectId, ref: job.schema }],
})

module.exports = mongoose.model('client', clientSchema)