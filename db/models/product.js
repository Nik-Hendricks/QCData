let mongoose = require('mongoose')
const productDataModel = require('./productData.js')
let productSchema = new mongoose.Schema({
  name: String,
  partRev: Number,
  partNumber:Number,
  jobNumber:Number,
  checkFrequency: Number,
  measurableAttributes: Array,
  visualAttributes: Array,
  productData: {type: mongoose.Schema.Types.ObjectId, ref: productDataModel}
})

module.exports = mongoose.model('product', productSchema)