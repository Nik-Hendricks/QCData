let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name: String,
  partRev: Number,
  partNumber:Number,
  jobNumber:Number,
  checkFrequency: Number,
  measurableAttributes: Array,
  visualAttributes: Array,
  partData: Object
})

module.exports = mongoose.model('product', productSchema)