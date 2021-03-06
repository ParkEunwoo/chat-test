const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const room = [];
io.emit('some event', { for: 'everyone' });
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('leaveRoom', (num, name) => {
        socket.leave(room[num], () => {
            console.log(name + ' leave a ' + room[num]);
            io.to(room[num]).emit('leaveRoom', num, name);
        });
    });
    socket.on('createRoom', (num) => {
        room.push("room" + num);
    });
    socket.on('joinRoom', (num, name) => {
        socket.join(room[num], () => {
            console.log(name + ' join a ' + room[num]);
            io.to(room[num]).emit('joinRoom', num, name);
        });
    });
    socket.on('chat message', (num, name, msg) => {
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
//# sourceMappingURL=index.js.map