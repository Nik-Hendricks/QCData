let mongoose = require('mongoose'), Schema = mongoose.Schema
let uniqid = require('uniqid')


let excelSheetSchema = new mongoose.Schema({
  name: String,
  sheetUID: String,
  ownerUID: String,
  data: Object

})


module.exports = mongoose.model('excelSheet', excelSheetSchema);