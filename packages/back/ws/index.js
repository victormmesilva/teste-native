const http = require('http');
const webSocketServer = require('websocket').server;

const clients = [];
const port = process.env.WS_PORT;
const server = http.createServer();
server.listen(port);
console.log(`WebSocket listening on port ${port}`);

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