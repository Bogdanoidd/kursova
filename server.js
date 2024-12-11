const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    const parsedMessage = JSON.parse(message);
    const response = {
      text: parsedMessage.text,
      username: parsedMessage.username,
      id: parsedMessage.id
    };

    ws.send(JSON.stringify(response));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
