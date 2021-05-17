const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');

http.listen(80, () => {
  console.log("listening on 80")
})

//app.listen(81)

app.get("/js/:file",function(req, res){
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/javascript',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/js/' + file)
    });
    res.sendFile(__dirname + '/public/js/' + file)
})

app.get("/css/:file",function(req, res){
    var file = req.param('file');
    res.header({
      'Content-Type': 'text/css',
      'Content-Size': getFilesizeInBytes(__dirname + '/public/css/' + file)
    });
    res.sendFile(__dirname + '/public/css/' + file)
})


app.get("/img/:file",function(req, res){
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