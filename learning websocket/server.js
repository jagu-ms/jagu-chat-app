const port = 3000;
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port});
console.log('listing to port' + port);

wss.on('connection', (client) => {
    console.log('New client connected');
    wss.broadcast();
    client.onmessage = e => client.send(e.data); 
    client.onclose = e => wss.broadcast();
});

wss.broadcast = () => {
    let count = wss.clients.size;
    //connected clients
    wss.clients.forEach(client => client.send(count));
}