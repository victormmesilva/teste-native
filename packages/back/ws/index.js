const http = require('http');
const webSocketServer = require('websocket').server;

const clients = [];
const webSocketsServerPort = 8000;
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('WebSocket listening on port 8000');

const ws = new webSocketServer({
  httpServer: server,
});

ws.on('request', (request) => {
  const id = clients.length + 1;
  const connection = request.accept(null, request.origin);
  clients.push({ id, connection });
});

const sendUpdate = () => clients.forEach(({ connection }) => {
  connection.sendUTF('update');
});

module.exports = {
  sendUpdate,
};