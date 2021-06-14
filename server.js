const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
if(typeof require !== 'undefined') XLSX = require('xlsx');
const ObjectID = require('mongodb').ObjectID;
const database = require('./db/database');
const robotModel = require('./db/models/robot.js');
const clientModel = require('./db/models/client.js');
const jobModel = require('./db/models/job.js');
const machineModel = require('./db/models/machine.js');
const setupModel = require('./db/models/setup.js');
const moldModel = require('./db/models/mold.js');
const productModel = require('./db/models/product.js');
const productDataModel = require('./db/models/productData.js')

const EXCEL_SHEETS = require('./db/models/EXCEL_SHEETS.js')

const sheet_map = {
  "PreProduction":{
    "Setup":{
      filename:'Set-up.xlsx',
    },
    "QCDocumentation":{
      filename:'QC Documentation.xlsx',
    },
    "ProductionDocumentation":{
      filename:'Production Documentation.xlsx',
    },
    "Processing":{
      filename:'Processing.xlsx',
    }
  },

  "PostProduction":{

  },

  "InProduction":{
    "QualityDocumentation":{
      filename: "Quality Documentation.xlsx"
    },
    "ProductionDocumentation":{
      filename: "Production Documentation.xlsx"
    },
  }
}



const modelMap = {
  "robotModel": robotModel,
  "clientModel": clientModel,
  "jobModel": jobModel,
  "setupModel": setupModel,
  "machineModel" : machineModel,
  "moldModel": moldModel,
  "productModel": productModel,
  "productDataModel": productDataModel
}
app.use(
  express.urlencoded({
    extended: true
  }))
app.use(express.json());


http.listen(80, () => {
  console.log("listening on 80")
})

app.post('/db/product/data/:product_uid',(req, res) => {
  var product_uid = req.param('product_uid');
  var model = modelMap['productDataModel']
  console.log(req.body)
  //get proddata id from product
  getProdDataIdFromProduct(product_uid).then(prod_data_uid => {

    model.update({ _id:  prod_data_uid}, req.body,{upsert: true}, (err, doc) => {
      if(err){
        console.log(err)
        res.json({"error": err})
      }else{
        console.log('we good')
        console.log(doc)
        res.json({"uid": doc._id})
      }
    })

  })
})

function getProdDataIdFromProduct(prod_id){
  return new Promise(resolve => {
    getRowByID(modelMap["productModel"], prod_id).then(res => {
      resolve(res.productData._id)
    })
  })
}

app.get('/db/product/data/:product_uid', (req, res) => {
  var product_uid = req.param('product_uid');
  getRowByID(modelMap['productModel'], product_uid).then(resd => {
    console.log(resd.productData)
    res.json(resd.productData)
  })
})


app.get('/xlsx/:ppap/:sheet_name', (req, res) => {
  var _ppap = req.param("ppap");
  var sheet_name = req.param('sheet_name')
  res.sendFile(`${__dirname}/public/excel/${_ppap}/${sheet_name}`)
})

app.post("/db/:model/insert", (req, res) => {
  var model = req.param('model');
  console.log(model)
  var model = new modelMap[model](req.body.data)
  
  model.save((err, doc) => {
    var _json;
    if(err){
      res.json({"error": err})
    }else{
      res.json({"uid": doc._id})
    }
  }); 
})

app.get(`/db/schema/:schema`, (req, res) => {
  var schema = req.param('schema');
  var model = modelMap[schema].schema

  console.log(model)
  res.json(model)
})

app.get("/db/:document/model", (req, res) => {
  var model = req.param('document');
  var queryModel = modelMap[model];
  var sendDoc = []

  if(queryModel){
    queryModel.find((err, docs) => {
      for(var key in docs){
        sendDoc.push(docs[key])
      }
      res.json({"data": sendDoc})
    })
  }


})

app.get('/db/:document/row/:_id', (req, res) => {
  var db = req.param('document');
  var id = req.param('_id');
  console.log(db)
  if(modelMap[db]){
    getRowByID(modelMap[db], id).then(resd => {
      res.json(resd)
    })
  }else{
    res.json({error: "db does not exist"})
  }
})

app.post('/db/:document/:_id', (req, res) => {
  var model = req.param('model');
  console.log(req.body)
  var model = new modelMap[model](req.body.data)

  
  model.save((err, doc) => {
    var _json;
    if(err){
      res.json({"error": err})
    }else{
      res.json({"uid": doc._id})
    }
  });
})



app.get("/modelFeilds/:model", (req, res) => {
  var model = req.param('model');

  res.json(modelMap[model].schema.paths)
})

app.get("/view/:file",(req, res) => {
    var file = req.param('file');

    res.header({
      'Content-Type': 'text/html',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/views/' + file)
    });
    res.sendFile(__dirname + '/public/views/'+file)
})

app.get("/component/:file",(req, res) => {
    var file = req.param('file');

    res.header({
      'Content-Type': 'text/html',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/components/' + file)
    });
    res.sendFile(__dirname + '/public/components/'+file)
})

app.get("/form/:file",(req, res) => {
  var file = req.param('file');

  res.header({
    'Content-Type': 'text/html',
    'Content-Size': getFilesizeInBytes(__dirname + '/public/forms/' + file)
  });
  res.sendFile(__dirname + '/public/forms/'+file)
})

app.get("/js/:file",(req, res) => {
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/js/' + file)
    });
    res.sendFile(__dirname + '/public/js/' + file)
})

app.get("/css/:file",(req, res) => {
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/css',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/css/' + file)
    });
    res.sendFile(__dirname + '/public/css/' + file)
})


app.get("/img/:file",(req, res) => {
    var file = req.param('file')
    res.header({
      'Content-Type': 'image/png',
      'Content-Length': getFilesizeInBytes(__dirname + '/public/img/' + file)
    });
    res.sendFile(__dirname + '/public/img/'+file)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

function getRowByID(db, id){
  return new Promise(resolve => {
    db.findById(id).populate('productData').exec((err, post) => {
      resolve(post)
    })
  })
}

function insertExcelByID(UID, partUID, data){
var excel_sheet = {
  name: test,
  sheetUID: UID,
  ownerUID: partUID,
  data: data
};

database.insert(user)
}


function populatePartWithSheets(){
  //iterate through sheet map
  //creating a new sheet for each sheet in the map
  //giveing each new created sheet a appropriate uniqid
  //possible attribute being sheettypeuid or something of the sorts
}







function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
  }