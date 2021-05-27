const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;
const database = require('./db/database');
const robotModel = require('./db/models/robot.js');
const clientModel = require('./db/models/client.js');
const jobModel = require('./db/models/job.js');
const machineModel = require('./db/models/machine.js');
const setupModel = require('./db/models/setup.js');
const moldModel = require('./db/models/mold.js');
const productModel = require('./db/models/product.js')

const modelMap = {
  "robotModel": robotModel,
  "clientModel": clientModel,
  "jobModel": jobModel,
  "setupModel": setupModel,
  "machineModel" : machineModel,
  "moldModel": moldModel,
  "productModel": productModel
}
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json());


http.listen(80, () => {
  console.log("listening on 80")

})
 

//app.listen(81)
app.post("/db/:model/insert", (req, res) => {
  var model = req.param('model');

  console.log(req.body.data)

  var model = new modelMap[model](req.body.data)
console.log(model)


  model.save();

  res.json({"data": "success"})

})

app.get("/db/document/:model", (req, res) => {
  var model = req.param('model');
  console.log(model);

  var queryModel = modelMap[model];
  var sendDoc = []

  if(queryModel){
    queryModel.find((err, docs) => {
      for(var key in docs){
        console.log(docs[key])
        sendDoc.push(docs[key])
      }

      res.json({"data": sendDoc})
    })
  }


})

app.get("/modelFeilds/:model", (req, res) => {
  var model = req.param('model');
  console.log(model)
  console.log(modelMap[model])

res.json(modelMap[model].schema.paths)
})

app.get("/view/:file",(req, res) => {
    var file = req.param('file');
    console.log(file)
    res.header({
      'Content-Type': 'text/html',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/views/' + file)
    });
    res.sendFile(__dirname + '/public/views/'+file)
})

app.get("/component/:file",(req, res) => {
    var file = req.param('file');
    console.log(file)
    res.header({
      'Content-Type': 'text/html',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/components/' + file)
    });
    res.sendFile(__dirname + '/public/components/'+file)
})

app.get("/form/:file",(req, res) => {
  var file = req.param('file');
  console.log(file)
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












function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
  }