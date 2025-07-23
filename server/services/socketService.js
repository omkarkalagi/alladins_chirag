// socketService.js
// Utility to emit events to all connected WebSocket clients

let wss = null;

function setWebSocketServer(server) {
  wss = server;
}

function broadcast(event, data) {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ event, data }));
    }
  });
}

module.exports = { setWebSocketServer, broadcast }; 