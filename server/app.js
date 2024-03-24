const express = require('express');
const app = express();
const https = require('https'); // Import the https module
const fs = require('fs'); // For file system access
// Read the PEM file containing certificate and key (replace with your path)
const httpsOptions = {
  cert: fs.readFileSync('./server.crt'),
  key: fs.readFileSync('./server.key')
};

const httpsServer = https.createServer(httpsOptions, app); // Create HTTPS server instance

const io = require('socket.io')(httpsServer, {
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

httpsServer.listen(5000, () => {
  console.log("Express server started on port 5000 (HTTPS)");
});
