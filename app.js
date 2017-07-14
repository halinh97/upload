var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

io.on('connection', (socket) => {
    console.log('Socket connected.');
    socket.on('message', function(msg){
      console.log(msg);
      socket.emit('chat',msg);
    });
    app.post('/', function(req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/uploads');
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function() {
          l
            res.end('success');
        });

        form.parse(req);

    });
});
