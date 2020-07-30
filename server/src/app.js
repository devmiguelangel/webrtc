const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Static Files
app.use('/static', express.static(path.join(__dirname, 'public')));

const rooms = {};

// SocketIO Connection
io.on('connection', socket => {
  socket.on('join room', roomID => {
    // Checks if room exists
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }

    const otherUser = rooms[roomID].find(id => id !== socket.id);

    if (otherUser) {
      socket.emit('other user', otherUser);
      socket.to(otherUser).emit('user joined', socket.id);
    }
  });

  // Question
  socket.on('offer', payload => {
    io.to(payload.target).emit('offer', payload);
  });
  // Response
  socket.on('answer', payload => {
    io.to(payload.target).emit('answer', payload);
  });

  socket.on('ice-candidate', incoming => {
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = server;
