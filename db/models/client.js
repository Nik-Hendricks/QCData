let mongoose = require('mongoose'), Schema = mongoose.Schema
let job = require('./job.js');
let uniqid = require('uniqid')


let clientSchema = new mongoose.Schema({
  name: String,
  clientPhoneNumber: Number,
  clientAdress: String,
  clientJobs: [{ type: Schema.ObjectId, ref: job.schema }],
})

console.log(clientSchema)
module.exports = mongoose.model('client', clientSchema);