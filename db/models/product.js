let mongoose = require('mongoose')
const productDataModel = require('./productData.js')
let productSchema = new mongoose.Schema({
                name:String,
                productData: {type: mongoose.Schema.Types.ObjectId, ref: productDataModel}
})

module.exports = mongoose.model('product', productSchema)