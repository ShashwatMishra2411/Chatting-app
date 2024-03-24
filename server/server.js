const io = require('socket.io')(5000, {
    cors: {
      origin: '*',
    }
  });
  
  const connectedClients = {};

  console.log("Server started on port 5000");
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
  