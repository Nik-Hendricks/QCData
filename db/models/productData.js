let mongoose = require('mongoose')

let productDataSchema = new mongoose.Schema({
    partName:String,
    partRevision:Number,
    jobNumber:Number,
    firstApproval:String,
    checFreq:Number,
    vis_attr_description1:String,
    vis_attr_description2:String,
    vis_attr_description3:String,
    vis_attr_description4:String,
    vis_attr_description5:String,
    vis_attr_description6:String,
    vis_attr_description7:String,
    vis_attr_description8:String,
    vis_attr_description9:String,
    vis_attr_description10:String,
    //mes-attr-description
    mes_attr_description1:String,
    mes_attr_description2:String,
    mes_attr_description3:String,
    mes_attr_description4:String,
    mes_attr_description5:String,
    mes_attr_description6:String,
    mes_attr_description7:String,
    mes_attr_description8:String,
    mes_attr_description9:String,
    mes_attr_description10:String,
    //mes-min
    mes_min1:Number,
    mes_min2:Number,
    mes_min3:Number,
    mes_min4:Number,
    mes_min5:Number,
    mes_min6:Number,
    mes_min7:Number,
    mes_min8:Number,
    mes_min9:Number,
    mes_min10:Number,
    //mes-max
    mes_max2:Number,
    mes_max1:Number,
    mes_max3:Number,
    mes_max4:Number,
    mes_max5:Number,
    mes_max6:Number,
    mes_max7:Number,
    mes_max8:Number,
    mes_max9:Number,
    mes_max10:Number,
    //vis-min
    vis_min1:Number,
    vis_min2:Number,
    vis_min3:Number,
    vis_min4:Number,
    vis_min5:Number,
    vis_min6:Number,
    vis_min7:Number,
    vis_min8:Number,
    vis_min9:Number,
    vis_min10:Number,
    //vis-mes
    vis_mes1:Number,
    vis_mes2:Number,
    vis_mes3:Number,
    vis_mes4:Number,
    vis_mes5:Number,
    vis_mes6:Number,
    vis_mes7:Number,
    vis_mes8:Number,
    vis_mes9:Number,
    vis_mes10:Number,
    //vis-max
    vis_max1:Number,
    vis_max2:Number,
    vis_max3:Number,
    vis_max4:Number,
    vis_max5:Number,
    vis_max6:Number,
    vis_max7:Number,
    vis_max8:Number,
    vis_max9:Number,
    vis_max10:Number,
})

module.exports = mongoose.model('productData', productDataSchema)