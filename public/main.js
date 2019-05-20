const socket = io();
const form = document.getElementById("form");
const chat = document.getElementById("messages");
form.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById("m");
    const text = input.value;
    socket.emit('chat message', text);
    input.value = '';
    return false;
};
socket.on('chat message', (msg) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    chat.appendChild(li);
});
//# sourceMappingURL=main.js.map