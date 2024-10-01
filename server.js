const port = process.env.PORT || 8090;
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // or restrict it to your frontend domain
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('place-order', (orderData) => {
    io.emit('new-order', orderData); // Emit the order to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
