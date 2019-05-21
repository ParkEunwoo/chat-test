const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const room = ['room1', 'room2'];

io.emit('some event', { for: 'everyone' });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('leaveRoom', (num: number, name: string) => {
        socket.leave(room[num], () => {
          console.log(name + ' leave a ' + room[num]);
          io.to(room[num]).emit('leaveRoom', num, name);
        });
      });
    
    
      socket.on('joinRoom', (num: number, name: string) => {
        socket.join(room[num], () => {
          console.log(name + ' join a ' + room[num]);
          io.to(room[num]).emit('joinRoom', num, name);
        });
      });
    
    
    socket.on('chat message', (num: number, name: string, msg: string) => {
        console.log(name, 'message: ' + msg);
        io.to(room[num]).emit('chat message', name, msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.broadcast.emit('hi');
});

http.listen(3000, () => {
    console.log("listening on port 3000");
});