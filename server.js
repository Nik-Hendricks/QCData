const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');
var Nedb = require('nedb');

//configure db
jobs_db    =    new Nedb({ filename: 'db/jobs_db.db', autoload: true, timestampData: true });
product_db =    new Nedb({filename: 'db/products_db.db', autoload:true, timestampData: true});
machine_db =    new Nedb({ filename: 'db/machines_db.db', autoload: true , timestampData: true});
sheet_db   =    new Nedb({filename: 'db/sheet_db.db', autoload: true, timestampData: true});   
robot_db   =    new Nedb({filename: 'db/robots_db.db', autoload:true, timestampData: true})



http.listen(80, () => {
  console.log("listening on 80")
})

//app.listen(81)

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