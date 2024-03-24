const express = require('express');
const app = express();
const http = require('http'); // Import the http module

const server = http.createServer(app); // Create HTTP server instance

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const connectedClients = {};

app.get('/', (req, res) => {
  res.send('Hello, world! This is the root route.');
});

io.on('connection', socket => {
  const id = socket.handshake.query.id;
  socket.join(id);
  connectedClients[id] = socket;

  console.log("Client connected:", id);
  socket.on('send-message', ({ recipients, text }) => {
    console.log("recipients", recipients)
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', { recipients: newRecipients, sender: id, text });
      console.log(newRecipients, recipient);
    });
  });
});

server.listen(5000, () => {
  console.log("Express server started on port 5000 (HTTP)");
});
