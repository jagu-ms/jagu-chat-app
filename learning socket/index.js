const app = require('express')();
// Http server
const http = require('http').Server(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/* 
* If websocket is available, Socket.IO will upgrade from http to it.
*/
const io = require('socket.io')(http);
io.on('connection', socket => {
    console.log('New client connected');
    socket.on('message'/* the specific name is optional */, data => socket.emit('echo', data));
    
    /* 
    * We sent clients num with (io) because it will be sent to all users. Instead of (socket)
    * that can help us to send individually
    */ 
    socket.on('disconnect', () => io.emit('clients', io.engine.clientsCount));
    
    // Sending clients num when each new client connection
    io.emit('clients', io.engine.clientsCount);
});

http.listen(3000);

console.log('Listening to port 3000');