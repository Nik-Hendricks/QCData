let mongoose = require('mongoose') , Schema = mongoose.Schema
let client = require('./client.js')

let jobSchema = new mongoose.Schema({
  jobName: String,
  jobId: String,
  jobClient: [{ type: Schema.ObjectId, ref: client.schema }],
})

module.exports = mongoose.model('job', jobSchema)