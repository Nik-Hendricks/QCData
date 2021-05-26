let mongoose = require('mongoose')

let jobSchema = new mongoose.Schema({
  jobName: String,
  jobId: String,
  jobClient: String,
})

module.exports = mongoose.model('job', jobSchema)