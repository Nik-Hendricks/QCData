const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');
const database = require('./db/database');
const robotModel = require('./db/models/robot.js');
const clientModel = require('./db/models/client.js');

const modelMap = {
  "robotModel": robotModel,
  "clientModel": clientModel
}

console.log(robotModel.schema.paths)


http.listen(80, () => {
  console.log("listening on 80")
  let robot1 = new robotModel({
    robotName: "robot1",
    robotId: "1"
  })

  robot1.save().then(doc => {
    console.log(doc)
  })
})
 

//app.listen(81)

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