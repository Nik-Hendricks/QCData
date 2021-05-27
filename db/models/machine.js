let mongoose = require('mongoose')

let machineSchema = new mongoose.Schema({
    machineName: String,
    currentJobs: Array,
})

module.exports = mongoose.model('machine', machineSchema)