let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  setupName: String,
  setupId: String,
  setupJob: Array,
})

module.exports = mongoose.model('product', productSchema)