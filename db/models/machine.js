let mongoose = require('mongoose')

let machineSchema = new mongoose.Schema({
    name: String,
    currentJobs: Array,
})

module.exports = mongoose.model('machine', machineSchema)