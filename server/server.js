const io = require('socket.io')(5000)

io.on('connection', socket =>{
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipients, text}) =>{
        recipients.forEach(recipient=>{
            const newRecipients = recipients.filter(r => r!== recipient)
        })
    })
})